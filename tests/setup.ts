import '@testing-library/jest-dom';

// 模拟浏览器API
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// 模拟 ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// 模拟 IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// 模拟 getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
  }),
});

// 模拟 scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
});

// 自定义 Jest 匹配器
expect.extend({
  toHaveClass(received: Element | null, className: string) {
    if (!received) {
      return {
        message: () => `expected element to exist but received null`,
        pass: false,
      };
    }
    
    const pass = received.classList.contains(className);
    if (pass) {
      return {
        message: () => `expected element not to have class ${className}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected element to have class ${className}`,
        pass: false,
      };
    }
  },
  toHaveStyle(received: Element, style: string) {
    const pass = received.getAttribute('style')?.includes(style) || false;
    if (pass) {
      return {
        message: () => `expected element not to have style ${style}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected element to have style ${style}`,
        pass: false,
      };
    }
  },
});

// 模拟静态资源
jest.mock('*.css', () => ({}));
jest.mock('*.scss', () => ({}));
jest.mock('*.sass', () => ({}));
jest.mock('*.less', () => ({}));

// 模拟图片文件
jest.mock('*.png', () => 'mocked-png');
jest.mock('*.jpg', () => 'mocked-jpg');
jest.mock('*.jpeg', () => 'mocked-jpeg');
jest.mock('*.gif', () => 'mocked-gif');
jest.mock('*.svg', () => 'mocked-svg');
jest.mock('*.webp', () => 'mocked-webp');

// 模拟字体文件
jest.mock('*.woff', () => 'mocked-woff');
jest.mock('*.woff2', () => 'mocked-woff2');
jest.mock('*.ttf', () => 'mocked-ttf');
jest.mock('*.eot', () => 'mocked-eot');
jest.mock('*.otf', () => 'mocked-otf');

// 模拟音频和视频文件
jest.mock('*.mp3', () => 'mocked-mp3');
jest.mock('*.m4a', () => 'mocked-m4a');
jest.mock('*.aac', () => 'mocked-aac');
jest.mock('*.oga', () => 'mocked-oga');
jest.mock('*.mp4', () => 'mocked-mp4');
jest.mock('*.webm', () => 'mocked-webm');
jest.mock('*.wav', () => 'mocked-wav');

// 设置环境变量
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000/api';
process.env.NEXT_PUBLIC_APP_NAME = 'CyberNuwa Test';

// 全局测试设置
beforeAll(() => {
  // 设置测试环境
  console.log('Setting up test environment...');
});

afterEach(() => {
  // 清理测试
  jest.clearAllMocks();
});

afterAll(() => {
  // 清理测试环境
  console.log('Cleaning up test environment...');
});
