"""
翻译API路由
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import logging
import asyncio
from utils.translation_service import translation_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/translation", tags=["translation"])

class TranslationRequest(BaseModel):
    text: str
    target_lang: str
    source_lang: str = "auto"

class BatchTranslationRequest(BaseModel):
    texts: List[str]
    target_lang: str
    source_lang: str = "auto"

class TranslationResponse(BaseModel):
    original_text: str
    translated_text: str
    source_lang: str
    target_lang: str

class BatchTranslationResponse(BaseModel):
    results: List[TranslationResponse]

@router.post("/translate", response_model=TranslationResponse)
async def translate_text(request: TranslationRequest):
    """
    翻译单个文本
    """
    try:
        translated_text = await translation_service.translate_text(
            request.text, 
            request.target_lang, 
            request.source_lang
        )
        
        return TranslationResponse(
            original_text=request.text,
            translated_text=translated_text,
            source_lang=request.source_lang,
            target_lang=request.target_lang
        )
    except Exception as e:
        logger.error(f"翻译失败: {e}")
        raise HTTPException(status_code=500, detail=f"翻译失败: {str(e)}")

@router.post("/translate_batch", response_model=BatchTranslationResponse)
async def translate_batch(request: BatchTranslationRequest):
    """
    批量翻译文本
    """
    try:
        # 去重，避免重复翻译
        unique_texts = list(dict.fromkeys(request.texts))  # 保持顺序的去重
        translated_texts = await translation_service.translate_batch(
            unique_texts,
            request.target_lang,
            request.source_lang
        )
        
        # 创建翻译映射
        translation_map = dict(zip(unique_texts, translated_texts))
        
        results = []
        for original in request.texts:
            translated = translation_map.get(original, original)
            if isinstance(translated, Exception):
                # 如果翻译失败，使用原文
                translated = original
                logger.warning(f"文本翻译失败: {original}")
            
            results.append(TranslationResponse(
                original_text=original,
                translated_text=translated,
                source_lang=request.source_lang,
                target_lang=request.target_lang
            ))
        
        return BatchTranslationResponse(results=results)
    except Exception as e:
        logger.error(f"批量翻译失败: {e}")
        raise HTTPException(status_code=500, detail=f"批量翻译失败: {str(e)}")

class FormTranslationRequest(BaseModel):
    form_data: Dict
    target_lang: str

@router.post("/translate_form")
async def translate_form_data(request: FormTranslationRequest):
    """
    翻译表单数据
    """
    try:
        translated_data = await translation_service.translate_form_data(
            request.form_data, 
            request.target_lang
        )
        return {"translated_data": translated_data}
    except Exception as e:
        logger.error(f"表单翻译失败: {e}")
        raise HTTPException(status_code=500, detail=f"表单翻译失败: {str(e)}")

@router.get("/languages")
async def get_supported_languages():
    """
    获取支持的语言列表
    """
    try:
        languages = translation_service.get_supported_languages()
        return {"languages": languages}
    except Exception as e:
        logger.error(f"获取语言列表失败: {e}")
        raise HTTPException(status_code=500, detail=f"获取语言列表失败: {str(e)}")

class DetectLanguageRequest(BaseModel):
    text: str

@router.post("/detect")
async def detect_language(request: DetectLanguageRequest):
    """
    检测文本语言
    """
    try:
        detected_lang = translation_service.detect_language(request.text)
        return {"detected_language": detected_lang}
    except Exception as e:
        logger.error(f"语言检测失败: {e}")
        raise HTTPException(status_code=500, detail=f"语言检测失败: {str(e)}")

class CardTranslationRequest(BaseModel):
    title: str
    description: str
    target_lang: str
    source_lang: str = "auto"

class CardTranslationResponse(BaseModel):
    original_title: str
    translated_title: str
    original_description: str
    translated_description: str
    source_lang: str
    target_lang: str

@router.post("/translate_card", response_model=CardTranslationResponse)
async def translate_card(request: CardTranslationRequest):
    """
    翻译卡片内容（标题和描述）
    """
    try:
        # 并行翻译标题和描述
        title_task = translation_service.translate_text(
            request.title, 
            request.target_lang, 
            request.source_lang
        )
        description_task = translation_service.translate_text(
            request.description, 
            request.target_lang, 
            request.source_lang
        )
        
        translated_title, translated_description = await asyncio.gather(
            title_task, 
            description_task
        )
        
        return CardTranslationResponse(
            original_title=request.title,
            translated_title=translated_title,
            original_description=request.description,
            translated_description=translated_description,
            source_lang=request.source_lang,
            target_lang=request.target_lang
        )
    except Exception as e:
        logger.error(f"卡片翻译失败: {e}")
        raise HTTPException(status_code=500, detail=f"卡片翻译失败: {str(e)}") 