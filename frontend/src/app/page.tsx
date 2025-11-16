import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="flex min-h-screen items-center justify-center px-4 py-8 md:py-20">
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
                カップル専用日記アプリ
              </span>
            </div>
            <p className="mx-auto max-w-2xl px-4 text-base leading-relaxed text-gray-500 md:text-xl">
              カップル専用の日記で、お互いの好きや日々の感謝を共有。
              <br />
              ポジティブなことを書いて、お互いをより好きになりましょう！
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
        </div>
      </div>
    </main>
  );
}
