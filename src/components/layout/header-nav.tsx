
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useContent } from '@/context/content-context';

export function HeaderNav() {
  const pathname = usePathname();
  const { content } = useContent();
  const navItems = content.headerContent.navItems;

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-lg font-medium transition-colors hover:text-primary',
            pathname === item.href ? 'text-primary' : 'text-muted-foreground'
          )}
          data-cms-id={`headerContent.navItems.${index}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
