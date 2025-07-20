'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { headerContent } from '@/lib/content-structure';

export function HeaderNav() {
  const pathname = usePathname();
  const navItems = headerContent.navItems;

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
          data-cms-id={`header.navItems.${index}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
