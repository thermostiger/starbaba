import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "星爸英语 - 专注3-12岁儿童英语启蒙",
    template: "%s | 星爸英语",
  },
  description: "星爸英语提供优质的儿童英语学习资源，包括动画、绘本、儿歌、纪录片等，让孩子在快乐中学习英语。",
  keywords: ["儿童英语", "英语启蒙", "英语动画", "分级绘本", "英语儿歌", "BBC纪录片"],
  authors: [{ name: "StarDad-English" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://www.xingbaenglish.com",
    siteName: "星爸英语",
    title: "星爸英语 - 专注3-12岁儿童英语启蒙",
    description: "星爸英语提供优质的儿童英语学习资源，包括动画、绘本、儿歌、纪录片等，让孩子在快乐中学习英语。",
  },
  twitter: {
    card: "summary_large_image",
    title: "星爸英语 - 专注3-12岁儿童英语启蒙",
    description: "星爸英语提供优质的儿童英语学习资源，包括动画、绘本、儿歌、纪录片等，让孩子在快乐中学习英语。",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
