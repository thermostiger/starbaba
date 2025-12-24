import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/common/ClientProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "K12书架 - 全球严选K12英语原版资源库",
    template: "%s | K12书架",
  },
  description: "K12书架提供全球严选的K12英语学习资源，包括动画、绘本、儿歌、纪录片等，陪伴孩子快乐成长。",
  keywords: ["K12英语", "英语原版", "儿童英语", "英语启蒙", "英语动画", "分级绘本", "英语儿歌"],
  authors: [{ name: "K12书架" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://www.k12shelf.com",
    siteName: "K12书架",
    title: "K12书架 - 全球严选K12英语原版资源库",
    description: "K12书架提供全球严选的K12英语学习资源，包括动画、绘本、儿歌、纪录片等，陪伴孩子快乐成长。",
  },
  twitter: {
    card: "summary_large_image",
    title: "K12书架 - 全球严选K12英语原版资源库",
    description: "K12书架提供全球严选的K12英语学习资源，包括动画、绘本、儿歌、纪录片等，陪伴孩子快乐成长。",
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
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
