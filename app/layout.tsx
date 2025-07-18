import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tsykunomi Quiz',
  description: 'Fantasy quiz with AI selfie results',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}


