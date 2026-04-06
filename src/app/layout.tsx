import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Coffee } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "紫砂壺典藏 | Teapot Gallery",
  description: "個人紫砂壺收藏與展示資料庫",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.className} bg-stone-50 text-stone-900 min-h-screen flex flex-col`}>
        <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-800">
              <Coffee className="w-6 h-6 text-amber-700" />
              <h1 className="text-xl font-bold tracking-wider">紫砂典藏</h1>
            </div>
            <nav>
              <a href="/" className="text-sm text-stone-600 hover:text-amber-700 transition">首頁目錄</a>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
          {children}
        </main>
        <footer className="bg-stone-100 border-t border-stone-200 py-6 mt-auto">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-stone-500">
            © {new Date().getFullYear()} 紫砂壺典藏. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
