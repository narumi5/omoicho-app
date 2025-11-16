import axios from 'axios';

// axiosのデフォルトインスタンス
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Cookieを送信
});

// レスポンスインターセプター（エラーハンドリング）
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401エラーの場合、認証が必要なページのみリダイレクト
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        const pathname = window.location.pathname;
        // 公開ページ（/, /login, /signup）以外でリダイレクト
        const publicPaths = ['/', '/login', '/signup'];
        const isPublicPath = publicPaths.some((path) => pathname === path);

        if (!isPublicPath) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
