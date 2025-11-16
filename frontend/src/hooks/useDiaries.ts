import { useState, useEffect } from 'react';
import { Diary } from '@/types';

interface UseDiariesOptions {
  page?: number;
  limit?: number;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useDiaries(coupleId?: string, options: UseDiariesOptions = {}) {
  const { page = 1, limit = 10 } = options;
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  useEffect(() => {
    if (!coupleId) return;

    const fetchDiaries = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/diaries?coupleId=${coupleId}&page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error('Failed to fetch diaries');
        const data = await res.json();
        setDiaries(data.data);
        setPagination(data.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, [coupleId, page, limit]);

  return { diaries, loading, error, pagination };
}
