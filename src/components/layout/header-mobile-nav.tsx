
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BotMessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { headerContent } from '@/lib/content-structure';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

export function HeaderMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { title, navItems, buttons } = headerContent;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b pb-4">
             <div className="flex items-center gap-3">
                <Link href="/admin" onClick={() => setIsOpen(false)} aria-label="Admin Dashboard">
                    <BotMessageSquare className="h-8 w-8 text-primary" />
                </Link>
                <Link href="/" onClick={() => setIsOpen(false)}>
                    <span className="font-bold text-lg" data-cms-id="header.title">{title}</span>
                </Link>
            </div>
            <SheetClose asChild>
                <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                </Button>
            </SheetClose>
          </div>
          
          <nav className="flex flex-col gap-4 py-6">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'text-lg font-medium transition-colors hover:text-primary',
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                )}
                data-cms-id={`header.navItems.${index}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Separator />
          
          <div className="mt-auto flex flex-col gap-4 pt-6">
            <Button variant="ghost" asChild>
                <Link href="#" onClick={() => setIsOpen(false)} data-cms-id="header.buttons.signIn">{buttons.signIn}</Link>
            </Button>
            <Button asChild>
                <Link href="#" onClick={() => setIsOpen(false)} data-cms-id="header.buttons.signUp">{buttons.signUp}</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
