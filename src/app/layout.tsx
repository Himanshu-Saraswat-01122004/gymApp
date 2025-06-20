import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import './globals.css';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import LayoutWrapper from '@/components/LayoutWrapper';
import Favicon from './favicon';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Royal Fitness - Your Fitness Companion',
  description: 'Track your workouts, set goals, and achieve your fitness dreams with Royal Fitness.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Favicon />
        <SessionProviderWrapper>
          <LayoutWrapper>{children}</LayoutWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
