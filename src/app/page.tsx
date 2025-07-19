import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const AnimatedOrb = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-transparent overflow-hidden">
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="orb-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: 'rgba(59, 130, 246, 0.8)', stopOpacity: 1 }} />
          <stop offset="70%" style={{ stopColor: 'rgba(37, 99, 235, 0.4)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'rgba(30, 64, 175, 0.1)', stopOpacity: 1 }} />
        </radialGradient>
        <style>
          {`
            @keyframes pulse {
              0%, 100% {
                transform: scale(0.95);
                opacity: 0.9;
              }
              50% {
                transform: scale(1.05);
                opacity: 1;
              }
            }
            .pulsing-orb {
              animation: pulse 6s infinite ease-in-out;
            }
          `}
        </style>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#orb-gradient)" className="pulsing-orb" />
    </svg>
  </div>
);


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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            
            {/* Left Column Text */}
            <div className="text-left lg:col-span-2">
              <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl font-headline">
                Automation Suite
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Powered by N8N <span className="text-primary">With SorenXi AI</span>
              </p>
            </div>

            {/* Right Column Hero Card */}
            <div className="relative rounded-3xl overflow-hidden bg-[radial-gradient(ellipse_80%_70%_at_center,_var(--tw-gradient-stops))] from-blue-600/50 via-blue-800/80 to-blue-900/95 p-1 shadow-2xl shadow-blue-500/20 lg:col-span-3">
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
                  <AnimatedOrb />
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