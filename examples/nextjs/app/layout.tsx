import type { Metadata } from 'next';
import 'liquid-glass-kit/css';
import { LiquidGlassProvider } from 'liquid-glass-kit/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Liquid Glass × Next.js',
  description: 'Liquid Glass Kit in the Next.js App Router',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="lg">
        <LiquidGlassProvider>{children}</LiquidGlassProvider>
      </body>
    </html>
  );
}
