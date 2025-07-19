import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const AnimatedOrb = () => (
  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/5 h-[120%] flex items-center justify-center">
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
                transform: scale(0.9);
                opacity: 0.7;
              }
              50% {
                transform: scale(1.1);
                opacity: 1;
              }
            }
            .pulsing-orb {
              animation: pulse 5s infinite ease-in-out;
            }
            .text-3d {
              text-shadow:
                0px 1px 0px hsl(var(--foreground) / 0.4),
                0px 2px 0px hsl(var(--foreground) / 0.3),
                0px 3px 0px hsl(var(--foreground) / 0.2),
                0px 4px 0px hsl(var(--foreground) / 0.1),
                2px 4px 8px rgba(0, 0, 0, 0.5);
            }
            @keyframes cycle-colors {
              0%, 100% { background-color: rgba(255, 255, 255, 0.133); } /* bg-white/20 */
              25% { background-color: #ef4444; } /* red-500 */
              50% { background-color: #eab308; } /* yellow-500 */
              75% { background-color: #22c55e; } /* green-500 */
            }
            .anim-led {
              animation: cycle-colors 6s infinite ease-in-out;
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
               <div className="relative inline-block">
                <h1 className="text-6xl font-bold tracking-tight sm:text-7xl font-headline">
                  <span className="text-primary">AUTOMATION</span>
                  <span> SUITE</span>
                </h1>
                <div className="absolute w-full text-right mt-1">
                  <p className="text-sm text-gray-300 whitespace-nowrap">
                    Powered by N8N <span className="text-primary">With SorenXi</span>
                  </p>
                </div>
              </div>
            </div>


            {/* Right Column Hero Card */}
            <div className="relative rounded-3xl overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_25%_25%,_var(--tw-gradient-stops))] from-blue-600/95 via-blue-900/80 to-blue-950/95 p-1 shadow-2xl shadow-blue-500/20 lg:col-span-3 min-h-[480px] border-4 border-blue-950">
              <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
                 <div className="w-3 h-3 rounded-full bg-white/20 anim-led"></div>
                 <div className="w-3 h-3 rounded-full bg-white/20 anim-led" style={{ animationDelay: '0.2s' }}></div>
                 <div className="w-3 h-3 rounded-full bg-white/20 anim-led" style={{ animationDelay: '0.4s' }}></div>
              </div>

              <div className="relative h-full flex items-center p-8 sm:p-10">
                <div className="w-1/2 z-10">
                  <p className="font-bold text-sm text-white/80 uppercase tracking-widest">SorenXi</p>
                  <h2 className="mt-2 font-headline text-7xl sm:text-8xl font-bold text-white text-3d">N8N</h2>
                  <p className="mt-4 text-white/90 text-base max-w-sm">
                    n8n work flow directory with hundreds of collected n8n workflows from many developers around the globe. why reinvent the wheel when you can just modify it.
                  </p>
                  <div className="mt-8">
                     <div className="inline-block rounded-md bg-gradient-to-r from-orange-500 to-orange-800 p-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                        <Button asChild size="lg" className="font-bold bg-orange-700 hover:bg-orange-600 text-white rounded-sm">
                            <Link href="/workflows">
                              Explore
                              <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                      </div>
                   </div>
                </div>
                
                <AnimatedOrb />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
