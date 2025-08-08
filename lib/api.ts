// API工具函数
const API_BASE_URL = '/api'; // 使用相对路径，通过Next.js代理到后端

export interface Wish {
  id: number;
  content: string;
  user_id: string;
  status: string;
  created_at: string;
}

export interface WishResponse {
  success: boolean;
  message: string;
  data: {
    items: Wish[];
    total: number;
    page: number;
    size: number;
    pages: number;
  };
}

export interface WishCreate {
  content: string;
  user_id?: string;
}

// 获取愿望列表
export async function fetchWishes(page: number = 1, size: number = 10): Promise<WishResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/wishes/list_wishes?page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching wishes:', error);
    throw error;
  }
}

// 提交新愿望
export async function submitWish(wish: WishCreate): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/wishes/submit_wish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wish),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error submitting wish:', error);
    throw error;
  }
}

// 获取单个愿望详情
export async function fetchWish(wishId: number): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/wishes/wish/${wishId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching wish:', error);
    throw error;
  }
} 