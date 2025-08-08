// 翻译工具类
export class TranslationService {
  private static instance: TranslationService;
  private cache: Map<string, string> = new Map();

  static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  // 使用 Google Translate API 进行翻译
  async translateText(text: string, targetLang: 'zh' | 'en'): Promise<string> {
    const cacheKey = `${text}_${targetLang}`;
    
    // 检查缓存
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      // 使用免费的翻译API（这里使用LibreTranslate作为示例）
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: targetLang === 'zh' ? 'en' : 'zh',
          target: targetLang,
          format: 'text'
        })
      });

      if (!response.ok) {
        throw new Error('翻译服务不可用');
      }

      const result = await response.json();
      const translatedText = result.translatedText;

      // 缓存结果
      this.cache.set(cacheKey, translatedText);
      
      return translatedText;
    } catch (error) {
      console.error('翻译失败:', error);
      return text; // 翻译失败时返回原文
    }
  }

  // 翻译页面内容
  async translatePageContent(targetLang: 'zh' | 'en'): Promise<void> {
    const textNodes = this.getTextNodes(document.body);
    
    for (const node of textNodes) {
      if (node.textContent && node.textContent.trim()) {
        const originalText = node.textContent.trim();
        const translatedText = await this.translateText(originalText, targetLang);
        
        if (translatedText !== originalText) {
          node.textContent = translatedText;
        }
      }
    }
  }

  // 获取页面中的所有文本节点
  private getTextNodes(element: Node): Text[] {
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // 排除脚本和样式标签中的文本
          const parent = node.parentElement;
          if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
            return NodeFilter.FILTER_REJECT;
          }
          // 只接受包含非空白字符的文本节点
          return node.textContent && node.textContent.trim() ? 
            NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );

    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node as Text);
    }

    return textNodes;
  }

  // 翻译表单内容
  async translateFormContent(formData: any, targetLang: 'zh' | 'en'): Promise<any> {
    const translatedData = { ...formData };
    
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === 'string' && value.trim()) {
        translatedData[key] = await this.translateText(value, targetLang);
      }
    }
    
    return translatedData;
  }
}

// 页面自动翻译组件
export class PageTranslator {
  private translationService = TranslationService.getInstance();
  private isTranslating = false;

  // 一键翻译整个页面
  async translatePage(targetLang: 'zh' | 'en'): Promise<void> {
    if (this.isTranslating) {
      console.log('翻译正在进行中...');
      return;
    }

    this.isTranslating = true;
    
    try {
      // 显示翻译进度
      this.showTranslationProgress();
      
      await this.translationService.translatePageContent(targetLang);
      
      // 隐藏进度条
      this.hideTranslationProgress();
      
      console.log(`页面已翻译为${targetLang === 'zh' ? '中文' : 'English'}`);
    } catch (error) {
      console.error('页面翻译失败:', error);
      this.hideTranslationProgress();
    } finally {
      this.isTranslating = false;
    }
  }

  // 显示翻译进度
  private showTranslationProgress(): void {
    const progressDiv = document.createElement('div');
    progressDiv.id = 'translation-progress';
    progressDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px;
        border-radius: 10px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
      ">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        <span>正在翻译页面内容...</span>
      </div>
    `;
    document.body.appendChild(progressDiv);
  }

  // 隐藏翻译进度
  private hideTranslationProgress(): void {
    const progressDiv = document.getElementById('translation-progress');
    if (progressDiv) {
      progressDiv.remove();
    }
  }
}

// 导出单例实例
export const pageTranslator = new PageTranslator();
export const translationService = TranslationService.getInstance(); 