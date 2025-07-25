import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '空画像ジェネレーター',
  description: '手軽に空画像を生成できる日本語対応の無料ジェネレーター',
  openGraph: {
    type: 'website',
    siteName: '空画像ジェネレーター',
    title: '空画像ジェネレーター',
    description: '手軽に空画像を生成できる日本語対応の無料ジェネレーター',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '空画像ジェネレーター',
    description: '手軽に空画像を生成できる日本語対応の無料ジェネレーター',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}