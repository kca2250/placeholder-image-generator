import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "空画像ジェネレーター",
  description: "手軽に空画像を生成できる日本語対応の無料ジェネレーター",
  openGraph: {
    type: "website",
    siteName: "空画像ジェネレーター",
    title: "空画像ジェネレーター",
    description: "手軽に空画像を生成できる日本語対応の無料ジェネレーター",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "空画像ジェネレーター",
    description: "手軽に空画像を生成できる日本語対応の無料ジェネレーター",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(p,r,o,j,e,c,t,g){
              p['_'+t]={};
              g=r.createElement('script');
              g.src='https://www.googletagmanager.com/gtm.js?id=GTM-'+t;
              r[o].prepend(g);
              g=r.createElement('style');
              g.innerText='.'+e+t+'{visibility:hidden!important}';
              r[o].prepend(g);
              r[o][j].add(e+t);
              setTimeout(function(){
                if(r[o][j].contains(e+t)){
                  r[o][j].remove(e+t);
                  p['_'+t]=0;
                }
              },c);
            })(window,document,'documentElement','classList','loading',2000,'597TPF5W');`
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

