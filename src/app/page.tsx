import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <p className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 font-headline text-[20rem] font-black text-white/5">
              SORENXI
            </p>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 font-headline text-[25rem] font-black text-white/5">
              SORENXI
            </p>
             <p className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 font-headline text-[22rem] font-black text-white/5">
              SORENXI
            </p>
          </div>
          <div className="text-center">
            <h1 className="font-headline text-6xl font-bold tracking-tight text-white sm:text-8xl">
              SorenXi N8N Directory
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Discover, enhance, and deploy powerful n8n workflows. Leverage AI to optimize your automation and unlock new levels of efficiency.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="font-bold">
                <Link href="/workflows">
                  Browse Workflows
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
