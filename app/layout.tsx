import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'A modern portfolio built with Next.js and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
