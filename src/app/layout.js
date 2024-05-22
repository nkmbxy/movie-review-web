'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/navbar';
import { RecoilRoot } from '../store';
import { unstable_noStore as noStore } from 'next/cache';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  noStore();
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          <Navbar />
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}
