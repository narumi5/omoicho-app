import { api } from '../axios';
import { ApiResponse } from '@/types/api';

export interface Diary {
  id: string;
  content: string;
  date: string;
  images: string[];
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateDiaryRequest {
  content: string;
  authorId: string;
  coupleId: string;
}

/**
 * 日記を作成
 */
export async function createDiary(data: CreateDiaryRequest): Promise<ApiResponse<Diary>> {
  const response = await api.post<ApiResponse<Diary>>('/api/diaries', data);
  return response.data;
}

/**
 * 日記詳細を取得
 */
export async function getDiary(id: string): Promise<ApiResponse<Diary>> {
  const response = await api.get<ApiResponse<Diary>>(`/api/diaries/${id}`);
  return response.data;
}

/**
 * 日記を更新
 */
export async function updateDiary(
  id: string,
  data: Partial<CreateDiaryRequest>
): Promise<ApiResponse<Diary>> {
  const response = await api.put<ApiResponse<Diary>>(`/api/diaries/${id}`, data);
  return response.data;
}

/**
 * 日記を削除
 */
export async function deleteDiary(id: string): Promise<ApiResponse<null>> {
  const response = await api.delete<ApiResponse<null>>(`/api/diaries/${id}`);
  return response.data;
}
