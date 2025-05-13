// app/layout.tsx
import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaHome } from 'react-icons/fa'; 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">
        <header className="w-full p-4 flex justify-center border-b border-gray-200 mb-8">
          <Link href="/" className="text-green-600 hover:text-green-800 text-4xl">
            <FaHome title="Go to Home" />
          </Link>
        </header>
        <main className="max-w-4xl mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
