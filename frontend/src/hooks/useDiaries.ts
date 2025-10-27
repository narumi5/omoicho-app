import { useState, useEffect } from 'react';
import { Diary } from '@/types';

export function useDiaries(coupleId?: string) {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coupleId) return;

    const fetchDiaries = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/diaries?coupleId=${coupleId}`);
        if (!res.ok) throw new Error('Failed to fetch diaries');
        const data = await res.json();
        setDiaries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, [coupleId]);

  return { diaries, loading, error };
}
