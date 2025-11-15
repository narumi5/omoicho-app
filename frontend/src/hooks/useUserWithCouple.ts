import { useState, useEffect } from 'react';
import { getMe } from '@/lib/api/auth';
import { getCoupleInfo } from '@/lib/api/couples';
import { CoupleInfoResponse } from '@/types/api';
import { handleError } from '@/lib/error-handler';

interface UseUserWithCoupleReturn {
  coupleId: string | null;
  coupleData: CoupleInfoResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * ユーザー情報とカップル情報を一度に取得するカスタムフック
 */
export function useUserWithCouple(): UseUserWithCoupleReturn {
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [coupleData, setCoupleData] = useState<CoupleInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const meData = await getMe();
      if (meData.data?.coupleId) {
        setCoupleId(meData.data.coupleId);
        const coupleInfo = await getCoupleInfo(meData.data.coupleId);
        setCoupleData(coupleInfo.data);
      } else {
        setCoupleId(null);
        setCoupleData(null);
      }
    } catch (err) {
      const message = handleError('Fetch user with couple', err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    coupleId,
    coupleData,
    loading,
    error,
    refetch: fetchData,
  };
}
