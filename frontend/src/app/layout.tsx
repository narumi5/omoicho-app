import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Couple Diary - カップル日記アプリ",
  description: "カップルで共有する日記アプリ。2人だけの特別な思い出を毎日記録しよう。",
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
      <body>{children}</body>
    </html>
  );
}
