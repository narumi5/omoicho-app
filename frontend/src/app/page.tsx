import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="flex min-h-screen items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-4xl text-center">
          <div className="mb-8 md:mb-10">
            {/* Logo */}
            <div className="mb-6 flex justify-center md:mb-8">
              <Image
                src="/images/logo.png"
                alt="Couple Diary Logo"
                width={320}
                height={240}
                className="h-48 w-64 object-contain transition-transform duration-300 hover:scale-105 md:h-60 md:w-80"
                priority
              />
            </div>

            <h1 className="mb-4 px-2 text-4xl font-bold leading-tight md:mb-6 md:text-6xl lg:text-7xl">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                2人の思い出を
              </span>
              <br />
              <span className="text-gray-700">毎日記録しよう</span>
            </h1>

            <div className="mb-4 inline-block rounded-full bg-accent-pink px-4 py-2 md:mb-6 md:px-6">
              <span className="text-xs font-medium text-accent-pink-soft md:text-sm">
                ✨ カップル専用日記アプリ
              </span>
            </div>
            <p className="mx-auto max-w-2xl px-4 text-base leading-relaxed text-gray-500 md:text-xl">
              カップル専用の日記で、お互いの日常を共有。
              <br />
              プライベートな日記も書けて、写真も一緒に残せます。
            </p>
          </div>

          <div className="mb-12 flex flex-col justify-center gap-3 px-4 sm:flex-row md:mb-16 md:gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-primary px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl active:scale-95 md:px-10 md:py-4 md:text-lg"
            >
              無料ではじめる
            </Link>
            <Link
              href="/login"
              className="rounded-full border-2 border-primary-pale bg-white px-8 py-3 text-base font-medium text-primary shadow-md transition-all hover:border-primary hover:bg-surface-pink hover:shadow-lg active:scale-95 md:px-10 md:py-4 md:text-lg"
            >
              ログイン
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 gap-4 px-2 md:mt-20 md:grid-cols-3 md:gap-8">
            <div className="rounded-2xl bg-white p-6 shadow-lg transition-all active:scale-95 md:transform md:rounded-3xl md:p-8 md:hover:-translate-y-2 md:hover:shadow-xl">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-icon text-2xl md:mb-4 md:h-16 md:w-16 md:rounded-2xl md:text-3xl">
                💕
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-700 md:mb-3 md:text-xl">2人で共有</h3>
              <p className="text-sm leading-relaxed text-gray-500 md:text-base">
                カップル専用の日記で、お互いの日常を共有。離れていても心は近くに。
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg transition-all active:scale-95 md:transform md:rounded-3xl md:p-8 md:hover:-translate-y-2 md:hover:shadow-xl">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-icon text-2xl md:mb-4 md:h-16 md:w-16 md:rounded-2xl md:text-3xl">
                🔒
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-700 md:mb-3 md:text-xl">
                プライベートも
              </h3>
              <p className="text-sm leading-relaxed text-gray-500 md:text-base">
                自分だけの秘密の日記も書ける。共有と使い分けて自由に記録。
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg transition-all active:scale-95 md:transform md:rounded-3xl md:p-8 md:hover:-translate-y-2 md:hover:shadow-xl">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-icon text-2xl md:mb-4 md:h-16 md:w-16 md:rounded-2xl md:text-3xl">
                📸
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-700 md:mb-3 md:text-xl">
                写真も投稿
              </h3>
              <p className="text-sm leading-relaxed text-gray-500 md:text-base">
                最大3枚の写真で思い出を鮮やかに。大切な瞬間を残そう。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-8 text-center">
        <div className="flex flex-col items-center justify-center gap-2 text-xs text-gray-400 sm:flex-row sm:gap-0 md:text-sm">
          <Link href="/diary" className="transition-colors hover:text-primary sm:mx-2">
            日記ページ（デモ）
          </Link>
          <span className="hidden text-gray-300 sm:inline">|</span>
          <Link href="/couple" className="transition-colors hover:text-primary sm:mx-2">
            カップル設定（デモ）
          </Link>
        </div>
      </div>
    </main>
  );
}
