/**
 * アプリケーション全体で使用する定数
 */

// バリデーション関連
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  DIARY_MAX_LENGTH: 1000,
  IMAGE_MAX_COUNT: 3,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// 認証関連
export const AUTH = {
  TOKEN_NAME: 'auth_token',
  COOKIE_MAX_AGE: 60 * 60 * 24 * 7, // 7日間（秒）
  JWT_EXPIRES_IN: '7d',
} as const;

// トースト関連
export const TOAST = {
  DURATION: {
    ERROR: 5000,
    SUCCESS: 3000,
    INFO: 4000,
  },
  ANIMATION_DURATION: 400, // ミリ秒
} as const;

// エラーメッセージ
export const ERROR_MESSAGES = {
  UNAUTHORIZED: '認証が必要です',
  INVALID_TOKEN: '無効なトークンです',
  INTERNAL_SERVER_ERROR: 'サーバーエラーが発生しました',
  INVALID_EMAIL_OR_PASSWORD: 'メールアドレスまたはパスワードが正しくありません',
  USER_NOT_FOUND: 'ユーザーが見つかりません',
  EMAIL_ALREADY_EXISTS: 'このメールアドレスは既に使用されています',
  COUPLE_NOT_FOUND: 'カップルが見つかりません',
  INVALID_INVITE_CODE: '無効な招待コードです',
  ALREADY_IN_COUPLE: '既にカップルに所属しています',
  COUPLE_FULL: 'このカップルは既に2人です',
  DIARY_NOT_FOUND: '日記が見つかりません',
  FORBIDDEN: 'アクセス権限がありません',
} as const;

// 成功メッセージ
export const SUCCESS_MESSAGES = {
  SIGNUP_SUCCESS: 'アカウントを作成しました！',
  LOGIN_SUCCESS: 'ログインしました',
  LOGOUT_SUCCESS: 'ログアウトしました',
  COUPLE_CREATED: '招待コードを発行しました！',
  COUPLE_JOINED: 'カップルに参加しました！',
  CODE_COPIED: '招待コードをコピーしました！',
  DIARY_CREATED: '日記を作成しました！',
  DIARY_UPDATED: '日記を更新しました！',
  DIARY_DELETED: '日記を削除しました！',
} as const;
