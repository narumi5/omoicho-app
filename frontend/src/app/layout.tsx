import type { Metadata } from 'next';
import { Kosugi_Maru } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { Toaster } from '@/components/ui/Toaster';

const kosugiMaru = Kosugi_Maru({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Couple Diary - カップル日記アプリ',
  description: 'カップルで共有する日記アプリ。2人だけの特別な思い出を毎日記録しよう。',
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${kosugiMaru.className} bg-gradient-pink`}>
        <ToastProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
