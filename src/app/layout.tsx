
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Background } from '@/components/layout/background';
import { AdminPanel } from '@/components/admin/admin-panel';
import { Suspense } from 'react';
import { ContentProvider } from '@/context/content-context';
import { HeaderStats } from '@/components/layout/header-stats';

export const metadata: Metadata = {
  title: 'SorenXi N8N Directory',
  description: 'A directory of N8N workflows with AI-powered enhancements.',
};

function AdminPanelLoader() {
  return <AdminPanel />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;700&family=Nunito+Sans:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ContentProvider>
          <Background />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Header stats={<HeaderStats />} />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
          <Suspense fallback={null}>
            <AdminPanelLoader />
          </Suspense>
        </ContentProvider>
      </body>
    </html>
  );
}
