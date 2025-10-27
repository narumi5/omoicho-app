import { useState } from 'react';
import { User } from '@/types';

// 仮実装: 実際はCognitoやNextAuthを使用
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // TODO: 実際のログイン処理
      console.log('Login:', email, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
  };

  return { user, loading, login, logout };
}
