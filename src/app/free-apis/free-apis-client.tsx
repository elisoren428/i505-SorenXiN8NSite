
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Lightbulb, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export interface ApiData {
  title: string;
  url: string;
  imageUrl: string;
  imageHint: string;
  steps: string[];
  notes: string;
  quotas?: string[];
}

const ApiCard = ({ api }: { api: ApiData }) => (
  <Card className="bg-card/50 backdrop-blur-sm border-white/10 h-full flex flex-col group">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <CardTitle className="font-headline text-3xl tracking-wide">{api.title}</CardTitle>
        </div>
        <div className="relative w-16 h-16 ml-4 overflow-hidden rounded-lg border-2 border-white/10">
            <Image
                src={api.imageUrl}
                alt={`${api.title} logo`}
                fill
                data-ai-hint={api.imageHint}
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-3"
                unoptimized
            />
        </div>
      </div>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col">
      <div className="space-y-2">
        <h4 className="font-semibold text-lg text-primary">Access Steps:</h4>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          {api.steps.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
        {api.quotas && (
          <>
            <h4 className="font-semibold text-lg text-primary pt-2">Daily Quotas:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {api.quotas.map((quota: string, index: number) => (
                <li key={index}>{quota}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="mt-auto pt-4 flex justify-between items-end">
        <Badge variant="secondary" className="whitespace-normal text-left py-2 px-3 max-w-[calc(100%-4rem)]">
          <Lightbulb className="h-4 w-4 mr-2 shrink-0"/>
          {api.notes}
        </Badge>
         <Button variant="ghost" size="icon" asChild>
          <Link href={api.url} target="_blank">
            <ExternalLink className="h-5 w-5 text-accent" />
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export function FreeApisClient({ apiData }: { apiData: ApiData[] }) {
  return (
    <div className="space-y-12">
      <div className="text-center pt-16 pb-8">
        <h1 
          className="font-headline text-5xl font-bold tracking-tight sm:text-7xl"
          style={{
            textShadow: '0 0 5px hsl(var(--accent)), 0 0 10px hsl(var(--accent)), 0 0 15px hsl(var(--accent))',
          }}
          >
          Free API Access Guide
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300">
          A step-by-step guide to claiming free AI keys from top platforms, verified and updated based on the latest info.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apiData.map(api => (
          <ApiCard key={api.title} api={api} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-3xl tracking-wide">
                    <CheckCircle className="h-8 w-8 text-primary"/>
                    DeepSeek Access
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">DeepSeek shows up on <span className="font-bold text-primary">multiple platforms</span>. Here's the best way to get it:</p>
                <div className="p-4 rounded-md border border-secondary bg-black/20">
                    <h4 className="font-bold text-xl text-white">Together AI</h4>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Offers <span className="font-semibold">DeepSeek R1</span> and other variants.</li>
                        <li><span className="font-semibold text-green-400">Unlimited free access</span> on this platform.</li>
                        <li>Works well for: chat, code generation, and vision tasks.</li>
                    </ul>
                    <Button size="sm" asChild className="mt-4">
                        <Link href="https://platform.together.xyz" target="_blank">Go to Together AI <ExternalLink /></Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-accent/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-3xl tracking-wide">
                    <Lightbulb className="h-8 w-8 text-accent"/>
                    Eli’s Notes
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-lg">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Start with <span className="font-semibold text-white">Together AI</span> or <span className="font-semibold text-white">Cloudflare</span> if you need volume.</li>
                    <li>Use <span className="font-semibold text-white">Pollinations</span> or <span className="font-semibold text-white">OpenRouter</span> for instant prototyping.</li>
                    <li>Don’t sleep on <span className="font-semibold text-white">Cerebras</span> — fastest response of the bunch.</li>
                    <li>For DeepSeek: <span className="font-semibold text-white">Together AI</span> gives the best experience. <span className="font-semibold text-white">OpenRouter</span> is a good backup.</li>
                </ul>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
