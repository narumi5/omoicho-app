/**
 * Axiosエラーからエラーメッセージを抽出
 */
export function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as {
      response?: {
        data?: {
          error?: string;
          message?: string;
        };
      };
    };
    return (
      axiosError.response?.data?.error ||
      axiosError.response?.data?.message ||
      'エラーが発生しました'
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'エラーが発生しました';
}

/**
 * エラーをコンソールにログ出力（開発環境のみ）
 */
export function logError(context: string, error: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error);
  }
}

/**
 * エラーハンドリングのヘルパー関数
 */
export function handleError(context: string, error: unknown): string {
  logError(context, error);
  return getErrorMessage(error);
}
