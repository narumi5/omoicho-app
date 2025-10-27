import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-pink">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl w-full">
          <div className="mb-8 md:mb-10">
            {/* Logo */}
            <div className="flex justify-center mb-6 md:mb-8">
              <Image
                src="/images/logo.png"
                alt="Couple Diary Logo"
                width={320}
                height={240}
                className="w-64 h-48 md:w-80 md:h-60 object-contain hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight px-2">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                2人の思い出を
              </span>
              <br />
              <span className="text-gray-700">毎日記録しよう</span>
            </h1>

            <div className="inline-block mb-4 md:mb-6 px-4 md:px-6 py-2 bg-accent-pink rounded-full">
              <span className="text-xs md:text-sm font-medium text-accent-pink-soft">
                ✨ カップル専用日記アプリ
              </span>
            </div>
            <p className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed px-4">
              カップル専用の日記で、お互いの日常を共有。
              <br />
              プライベートな日記も書けて、写真も一緒に残せます。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4">
            <Link
              href="/signup"
              className="bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-medium hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              無料ではじめる
            </Link>
            <Link
              href="/login"
              className="bg-white text-primary px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-medium border-2 border-primary-pale hover:bg-surface-pink hover:border-primary transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              ログイン
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20 px-2">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg active:scale-95 md:hover:shadow-xl transition-all md:transform md:hover:-translate-y-2">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-icon rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-3 md:mb-4 mx-auto">
                💕
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-2 md:mb-3">2人で共有</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                カップル専用の日記で、お互いの日常を共有。離れていても心は近くに。
              </p>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg active:scale-95 md:hover:shadow-xl transition-all md:transform md:hover:-translate-y-2">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-icon rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-3 md:mb-4 mx-auto">
                🔒
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-2 md:mb-3">プライベートも</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                自分だけの秘密の日記も書ける。共有と使い分けて自由に記録。
              </p>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg active:scale-95 md:hover:shadow-xl transition-all md:transform md:hover:-translate-y-2">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-icon rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-3 md:mb-4 mx-auto">
                📸
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-2 md:mb-3">写真も投稿</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                最大3枚の写真で思い出を鮮やかに。大切な瞬間を残そう。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 px-4">
        <div className="text-xs md:text-sm text-gray-400 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0">
          <Link href="/diary" className="hover:text-primary transition-colors sm:mx-2">
            日記ページ（デモ）
          </Link>
          <span className="hidden sm:inline text-gray-300">|</span>
          <Link href="/couple" className="hover:text-primary transition-colors sm:mx-2">
            カップル設定（デモ）
          </Link>
        </div>
      </div>
    </main>
  );
}
