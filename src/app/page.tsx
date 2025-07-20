
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { homepageContent, type PageContent } from '@/lib/content-structure';

const AnimatedOrb = ({ orbColors }: { orbColors: { stop1: string, stop2: string, stop3: string }}) => (
  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/5 h-[120%] flex items-center justify-center" data-cms-id="homepage.hero.animatedOrb">
    <style jsx>{`
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
      `}</style>
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="orb-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: orbColors.stop1, stopOpacity: 1 }} />
          <stop offset="70%" style={{ stopColor: orbColors.stop2, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: orbColors.stop3, stopOpacity: 1 }} />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#orb-gradient)" className="pulsing-orb" />
    </svg>
  </div>
);

const AutomationGraphic = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-0 w-1/2 h-full">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g opacity="0.15" filter="url(#glow)">
          {/* Main paths */}
          <path d="M-50 100 C 150 50, 200 250, 400 200" stroke="url(#path-gradient)" strokeWidth="2" fill="none" />
          <path d="M-50 300 C 100 350, 250 150, 400 220" stroke="url(#path-gradient)" strokeWidth="1.5" fill="none" />
          <path d="M-20 500 C 200 450, 150 650, 450 600" stroke="url(#path-gradient)" strokeWidth="2.5" fill="none" />
          
          {/* Nodes */}
          <circle cx="150" cy="65" r="5" fill="hsl(var(--primary))" />
          <circle cx="200" cy="245" r="7" fill="hsl(var(--primary))" />
          <circle cx="100" cy="345" r="4" fill="hsl(var(--primary))" />
          <circle cx="250" cy="155" r="6" fill="hsl(var(--primary))" />
          <circle cx="200" cy="480" r="8" fill="hsl(var(--primary))" />

          {/* Icon - Brain/AI */}
          <g transform="translate(300, 350) scale(0.2)">
            <path d="M63.5 13.2C59.2 8.3 53.2 5 46.2 5c-11 0-20 9-20 20 0 7.3 4 13.7 10 17.3.7.4 1.1 1.1 1.1 1.9v10c0 .8-.5 1.5-1.2 1.8-1.5.6-2.5 2-2.5 3.6 0 2.2 1.8 4 4 4h18c2.2 0 4-1.8 4-4 0-1.6-1-3-2.5-3.6-.7-.3-1.2-1-1.2-1.8v-10c0-.8.4-1.5 1.1-1.9 6-3.6 10-10 10-17.3 0-6.7-3-12.8-7.5-17.1zM46.2 57c-.8 0-1.5-.7-1.5-1.5v-10c0-2.2-1.8-4-4-4h-8c-2.2 0-4 1.8-4 4v10c0 .8-.7 1.5-1.5 1.5h-1.6c-.6 0-1.1.6-.9 1.2.6 1.7 2.2 3 4 3h14c1.8 0 3.4-1.3 4-3 .2-.6-.3-1.2-.9-1.2h-1.6zM56.2 40.2c-1.1 0-2-.9-2-2v-10c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1-.9 2-2 2h-8c-1.1 0-2-.9-2-2v-10c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1-.9 2-2 2h-1c-.8 0-1.5-.7-1.5-1.5 0-3.5 2.1-6.6 5.2-7.9.7-.3 1.2-1 1.2-1.8v-10c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v10c0 .8.5 1.5 1.2 1.8 3.1 1.3 5.2 4.4 5.2 7.9 0 .8-.7 1.5-1.5 1.5h-1z" fill="hsl(var(--primary))"/>
          </g>
           {/* Icon - API/Connection Block */}
          <g transform="translate(100, 150) scale(0.8)">
            <rect x="0" y="0" width="20" height="20" rx="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="2"/>
            <circle cx="10" cy="10" r="3" fill="hsl(var(--primary))"/>
            <path d="M20 10 L 30 10" stroke="hsl(var(--primary))" strokeWidth="2" fill="none"/>
            <path d="M-10 10 L 0 10" stroke="hsl(var(--primary))" strokeWidth="2" fill="none"/>
          </g>
        </g>
      </svg>
    </div>
);

export default function Home() {
  const content = homepageContent;

  return (
    <div className="container mx-auto px-4">
       <style jsx>{`
            .text-3d {
              text-shadow:
                0px 1px 0px hsl(var(--foreground) / 0.4),
                0px 2px 0px hsl(var(--foreground) / 0.3),
                0px 3px 0px hsl(var(--foreground) / 0.2),
                0px 4px 0px hsl(var(--foreground) / 0.1),
                2px 4px 8px rgba(0, 0, 0, 0.5);
            }
            @keyframes slide-green {
              0%, 100% { background-color: rgba(255, 255, 255, 0.133); } /* Dim */
              33% { background-color: #22c55e; box-shadow: 0 0 5px #22c55e; } /* Green */
              66% { background-color: rgba(255, 255, 255, 0.133); } /* Dim */
            }
            .anim-led {
              animation: slide-green 5s infinite ease-in-out;
            }
          `}
        </style>
      
      <div
        className="absolute inset-x-0 top-0 -z-10 flex h-full flex-col justify-start overflow-hidden"
        aria-hidden="true"
        data-cms-id="homepage.background.text"
      >
        <div className="flex flex-col" style={{ lineHeight: '0.8' }}>
          {[...Array(4)].map((_, i) => (
            <p key={i} className={`font-headline text-[18rem] font-normal ${i === 1 ? 'text-white/[.15]' : 'text-white/5'}`}>
              {content.backgroundText}
            </p>
          ))}
        </div>
      </div>
      
      <AutomationGraphic />
      
      {/* New Foreground Content */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-full py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            
            {/* Left Column Text */}
            <div className="text-left lg:col-span-2">
               <div className="relative inline-block">
                <h1 className="text-6xl font-bold tracking-tight sm:text-7xl font-headline" data-cms-id="homepage.main.title">
                  <span className="text-primary">{content.main.title.highlight}</span>
                  <span> {content.main.title.rest}</span>
                </h1>
                <div className="absolute w-full text-right mt-1">
                  <p className="text-sm text-gray-300 whitespace-nowrap" data-cms-id="homepage.main.subtitle">
                    {content.main.subtitle.part1} <span className="text-primary">{content.main.subtitle.part2}</span>
                  </p>
                </div>
              </div>
            </div>


            {/* Right Column Hero Card */}
            <div className="relative lg:col-span-3 rounded-3xl overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_25%_25%,_var(--tw-gradient-stops))] from-blue-600/95 via-blue-900/80 to-blue-950/95 p-1 shadow-2xl shadow-blue-500/20 min-h-[400px] border-4 border-blue-950" data-cms-id="homepage.hero.card">
              <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
                 <div className="w-3 h-3 rounded-full bg-white/20 anim-led"></div>
                 <div className="w-3 h-3 rounded-full bg-white/20 anim-led" style={{ animationDelay: '1.67s' }}></div>
                 <div className="w-3 h-3 rounded-full bg-white/20 anim-led" style={{ animationDelay: '3.33s' }}></div>
              </div>

              <div className="relative h-full flex items-center p-8 sm:p-10">
                <div className="lg:w-1/2 z-10">
                  <p className="font-bold text-sm text-white/80 uppercase tracking-widest" data-cms-id="homepage.hero.brandName">{content.hero.brandName}</p>
                  <h2 className="mt-2 font-headline text-7xl sm:text-8xl font-bold text-white text-3d" data-cms-id="homepage.hero.title">{content.hero.title}</h2>
                  <p className="mt-4 text-white/90 text-base max-w-sm" data-cms-id="homepage.hero.description">
                    {content.hero.description}
                  </p>
                  <div className="mt-8">
                     <div className="inline-block rounded-md bg-gradient-to-r from-orange-500 to-orange-800 p-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                        <Button asChild size="lg" className="font-bold bg-orange-700 hover:bg-orange-600 text-white rounded-sm" data-cms-id="homepage.hero.button">
                            <Link href={content.hero.button.href}>
                              {content.hero.button.text}
                              <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                      </div>
                   </div>
                </div>
                
                <AnimatedOrb orbColors={content.hero.animatedOrb.colors} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
