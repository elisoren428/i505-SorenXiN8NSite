import Link from 'next/link';
import { BotMessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex items-center gap-4">
            <BotMessageSquare className="h-10 w-10 text-primary" />
            <div className="flex flex-col">
              <h1 className="font-body text-3xl font-bold tracking-wide text-white">
                SORENXI N8N DIRECTORY
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
