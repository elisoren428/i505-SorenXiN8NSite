'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export function AdminPanel() {
  const searchParams = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // We need to check the search params on the client side.
    if (searchParams.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, [searchParams]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-card border rounded-lg shadow-lg p-4">
        <h3 className="font-headline text-lg mb-2">CMS Controls</h3>
        <p className="text-sm text-muted-foreground">Editing mode enabled.</p>
        <Button size="sm" className="mt-2 w-full">
          <Settings className="mr-2 h-4 w-4" />
          Open Editor
        </Button>
      </div>
    </div>
  );
}
