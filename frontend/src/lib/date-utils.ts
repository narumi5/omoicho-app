/**
 * 日付ユーティリティ関数
 */

/**
 * 指定した日付の開始時刻（0時0分0秒）を取得
 */
export function getStartOfDay(date: Date | string): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * 指定した日付の終了時刻（23時59分59秒）を取得
 */
export function getEndOfDay(date: Date | string): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * 日付の範囲を取得（開始時刻と終了時刻）
 */
export function getDayRange(date: Date | string): { start: Date; end: Date } {
  return {
    start: getStartOfDay(date),
    end: getEndOfDay(date),
  };
}
