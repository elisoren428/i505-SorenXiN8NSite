
import Link from 'next/link';
import { BotMessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { HeaderStats } from './header-stats';
import { HeaderNav } from './header-nav';
import { HeaderMobileNav } from './header-mobile-nav';
import { headerContent } from '@/lib/content-structure';
import { Button } from '@/components/ui/button';

export function Header() {
  const content = headerContent;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-4">
            <BotMessageSquare className="h-8 w-8 text-primary" />
            <h1 className="font-sans text-xl font-bold tracking-wide text-white" data-cms-id="header.title">
              {content.title}
            </h1>
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            <Separator orientation="vertical" className="h-8" />
            <HeaderStats />
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <HeaderNav />
          <div className="flex items-center gap-4">
            <Button variant="ghost" data-cms-id="header.buttons.signIn">{content.buttons.signIn}</Button>
            <Button data-cms-id="header.buttons.signUp">{content.buttons.signUp}</Button>
          </div>
        </div>

        <div className="md:hidden">
          <HeaderMobileNav />
        </div>
      </div>
    </header>
  );
}
