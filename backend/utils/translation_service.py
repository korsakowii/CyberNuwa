"""
翻译服务 - 提供自动翻译功能
"""

import httpx
import asyncio
import time
from typing import Dict, List, Optional
import json
import logging

logger = logging.getLogger(__name__)

class TranslationService:
    """翻译服务类"""
    
    def __init__(self):
        self.cache: Dict[str, str] = {}
        # 调整API优先级，将Google Translate放在前面
        self.translation_apis = [
            self._translate_with_google_translate,
            self._translate_with_libretranslate,
            self._translate_with_bing_translate
        ]
        self.last_request_time = 0
        self.request_interval = 0.2  # 减少请求间隔到200ms
        self.semaphore = asyncio.Semaphore(10)  # 限制并发请求数
    
    async def translate_text(self, text: str, target_lang: str, source_lang: str = 'auto') -> str:
        """
        翻译文本
        
        Args:
            text: 要翻译的文本
            target_lang: 目标语言 ('zh', 'en', 'ja', 'ko', etc.)
            source_lang: 源语言 ('auto' 为自动检测)
            
        Returns:
            翻译后的文本
        """
        if not text or not text.strip():
            return text
            
        # 检查缓存
        cache_key = f"{text}_{source_lang}_{target_lang}"
        if cache_key in self.cache:
            return self.cache[cache_key]
        
        async with self.semaphore:  # 限制并发请求
            # 请求频率限制
            current_time = time.time()
            if current_time - self.last_request_time < self.request_interval:
                await asyncio.sleep(self.request_interval - (current_time - self.last_request_time))
            self.last_request_time = time.time()
            
            # 尝试不同的翻译API
            for api_func in self.translation_apis:
                try:
                    translated_text = await api_func(text, target_lang, source_lang)
                    if translated_text and translated_text != text:
                        # 缓存结果
                        self.cache[cache_key] = translated_text
                        return translated_text
                except Exception as e:
                    logger.warning(f"翻译API {api_func.__name__} 失败: {e}")
                    continue
            
            # 所有API都失败时返回原文
            logger.error(f"所有翻译API都失败，返回原文: {text}")
            return text
    
    async def translate_batch(self, texts: List[str], target_lang: str, source_lang: str = 'auto') -> List[str]:
        """
        批量翻译文本
        
        Args:
            texts: 要翻译的文本列表
            target_lang: 目标语言
            source_lang: 源语言
            
        Returns:
            翻译后的文本列表
        """
        tasks = [self.translate_text(text, target_lang, source_lang) for text in texts]
        return await asyncio.gather(*tasks, return_exceptions=True)
    
    async def translate_form_data(self, form_data: Dict, target_lang: str) -> Dict:
        """
        翻译表单数据
        
        Args:
            form_data: 表单数据字典
            target_lang: 目标语言
            
        Returns:
            翻译后的表单数据
        """
        translated_data = {}
        
        for key, value in form_data.items():
            if isinstance(value, str) and value.strip():
                translated_value = await self.translate_text(value, target_lang)
                translated_data[key] = translated_value
            else:
                translated_data[key] = value
        
        return translated_data
    
    async def _translate_with_libretranslate(self, text: str, target_lang: str, source_lang: str = 'auto') -> str:
        """使用 LibreTranslate API"""
        try:
            async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
                response = await client.post(
                    'https://de.libretranslate.com/translate',
                    json={
                        'q': text,
                        'source': source_lang,
                        'target': target_lang,
                        'format': 'text'
                    }
                )
                
                # 检查429错误（请求频率限制）
                if response.status_code == 429:
                    logger.warning("LibreTranslate API 请求频率限制，跳过")
                    raise Exception("Rate limit exceeded")
                
                response.raise_for_status()
                result = response.json()
                translated = result.get('translatedText', text)
                if translated != text:
                    logger.info(f"LibreTranslate 成功: {text} → {translated}")
                return translated
        except Exception as e:
            logger.error(f"LibreTranslate API 错误: {e}")
            raise
    
    async def _translate_with_google_translate(self, text: str, target_lang: str, source_lang: str = 'auto') -> str:
        """使用 Google Translate API (免费版本)"""
        try:
            # 使用 Google Translate 的免费端点
            url = "https://translate.googleapis.com/translate_a/single"
            params = {
                'client': 'gtx',
                'sl': source_lang,
                'tl': target_lang,
                'dt': 't',
                'q': text
            }
            
            async with httpx.AsyncClient(timeout=15.0, follow_redirects=True) as client:
                response = await client.get(url, params=params)
                response.raise_for_status()
                
                # Google Translate 返回的是嵌套数组
                result = response.json()
                if result and result[0]:
                    # 处理多段翻译结果
                    translated_parts = []
                    for segment in result[0]:
                        if segment and segment[0]:
                            translated_parts.append(segment[0])
                    
                    if translated_parts:
                        translated = ''.join(translated_parts)
                        logger.info(f"Google Translate 成功: {text} → {translated}")
                        return translated
                
                logger.warning(f"Google Translate 返回空结果: {text}")
                return text
        except Exception as e:
            logger.error(f"Google Translate API 错误: {e}")
            raise
    
    async def _translate_with_bing_translate(self, text: str, target_lang: str, source_lang: str = 'auto') -> str:
        """使用 Bing Translate API (需要API密钥)"""
        # 这里需要 Bing Translate API 密钥
        # 暂时返回原文，避免错误
        return text
    
    def detect_language(self, text: str) -> str:
        """
        检测文本语言
        
        Args:
            text: 要检测的文本
            
        Returns:
            语言代码 ('zh', 'en', 'ja', etc.)
        """
        # 简单的语言检测逻辑
        chinese_chars = sum(1 for char in text if '\u4e00' <= char <= '\u9fff')
        english_chars = sum(1 for char in text if char.isalpha() and ord(char) < 128)
        
        if chinese_chars > english_chars:
            return 'zh'
        else:
            return 'en'
    
    def get_supported_languages(self) -> Dict[str, str]:
        """获取支持的语言列表"""
        return {
            'zh': '中文',
            'en': 'English',
            'ja': '日本語',
            'ko': '한국어',
            'es': 'Español',
            'fr': 'Français',
            'de': 'Deutsch',
            'ru': 'Русский',
            'ar': 'العربية',
            'hi': 'हिन्दी'
        }

# 创建全局翻译服务实例
translation_service = TranslationService() 