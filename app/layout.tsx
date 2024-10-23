import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'APTCoins - Token Creation Platform',
  description: 'Create your own Aptos token with ease',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Providers>
            <div className="min-h-screen bg-background">
              <Header />
              <div className="flex flex-1 flex-col md:flex-row">
                <div className="hidden md:block">
                  <Sidebar />
                </div>
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                  {children}
                </main>
              </div>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}