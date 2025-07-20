
'use client';

import Link from 'next/link';
import { BotMessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { HeaderNav } from './header-nav';
import { HeaderMobileNav } from './header-mobile-nav';
import { Button } from '@/components/ui/button';
import { useContent } from '@/context/content-context';
import type { ReactNode } from 'react';

export function Header({ stats }: { stats: ReactNode }) {
  const { content } = useContent();
  const pageContent = content.headerContent;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" aria-label="Admin Dashboard">
              <BotMessageSquare className="h-8 w-8 text-primary" />
            </Link>
            <Link href="/">
              <h1 className="font-sans text-xl font-bold tracking-wide text-white" data-cms-id="headerContent.title">
                {pageContent.title}
              </h1>
            </Link>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <Separator orientation="vertical" className="h-8" />
            {stats}
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <HeaderNav />
          <div className="flex items-center gap-4">
            <Button variant="ghost" data-cms-id="headerContent.buttons.signIn">{pageContent.buttons.signIn}</Button>
            <Button data-cms-id="headerContent.buttons.signUp">{pageContent.buttons.signUp}</Button>
          </div>
        </div>

        <div className="md:hidden">
          <HeaderMobileNav />
        </div>
      </div>
    </header>
  );
}
