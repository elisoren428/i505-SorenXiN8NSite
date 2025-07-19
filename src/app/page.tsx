import { Button } from '@/components/ui/button';
import { ArrowRight, BotMessageSquare, Github, Globe, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* This is the perfected background element. It will not be changed. */}
      <div
        className="absolute inset-x-0 top-0 -z-10 flex h-full flex-col justify-start overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex flex-col" style={{ lineHeight: '0.8' }}>
          <p className="font-headline text-[18rem] font-normal text-white/5">
            SORENXI
          </p>
          <p className="font-headline text-[18rem] font-normal text-white/[.15]">
            SORENXI
          </p>
          <p className="font-headline text-[18rem] font-normal text-white/5">
            SORENXI
          </p>
          <p className="font-headline text-[18rem] font-normal text-white/5">
            SORENXI
          </p>
        </div>
      </div>
      
      {/* New Foreground Content */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-full py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column Text */}
            <div className="text-left">
              <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl font-headline">
                Automation Suite
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Powered by N8N <span className="text-primary">With SorenXi AI</span>
              </p>
            </div>

            {/* Right Column Hero Card */}
            <div className="relative rounded-3xl overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/80 via-blue-800/90 to-blue-900/95 p-1 shadow-2xl shadow-blue-500/20">
               <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
                 <div className="w-3 h-3 rounded-full bg-white/20"></div>
                 <div className="w-3 h-3 rounded-full bg-white/20"></div>
                 <div className="w-3 h-3 rounded-full bg-white/20"></div>
               </div>

              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-sm text-white/80 uppercase tracking-widest">SorenXi</p>
                    <h2 className="mt-2 font-headline text-7xl sm:text-8xl font-bold text-white">N8N</h2>
                    <p className="mt-4 text-white/90 text-base">
                      n8n work flow directory with hundreds of collected n8n workflows from many developers around the globe. why reinvent the wheel when you can just modify it.
                    </p>
                  </div>
                   <div className="mt-8">
                     <Button asChild size="lg" variant="secondary" className="font-bold bg-white/10 hover:bg-white/20 text-white">
                        <Link href="/workflows">
                          Explore
                          <ArrowRight className="ml-2" />
                        </Link>
                      </Button>
                   </div>
                </div>
                <div className="relative min-h-[400px]">
                  <Image
                    src="https://placehold.co/600x800.png"
                    alt="AI Robot Head"
                    data-ai-hint="robot head"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-800/60 to-transparent"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}