
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Lightbulb, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { FreeApisContent } from '@/lib/content-structure';

export interface ApiData {
  id: string;
  title: string;
  url: string;
  imageHint: string;
  imageUrl: string;
  steps: string[];
  notes: string;
  quotas?: string[];
}

export interface ApiPageData extends Omit<FreeApisContent, 'apis'> {
  apis: ApiData[];
}

const ApiCard = ({ api }: { api: ApiData }) => (
  <Card className="bg-card/50 backdrop-blur-sm border-white/10 h-full flex flex-col group">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <CardTitle className="font-headline text-3xl tracking-wide">{api.title}</CardTitle>
        </div>
        <div className="relative w-16 h-16 ml-4 overflow-hidden rounded-lg border-2 border-white/10" data-cms-id={`apis.image.${api.id}`}>
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

export function FreeApisClient({ apiPageData }: { apiPageData: ApiPageData }) {
  return (
    <div className="space-y-12">
      <div className="text-center pt-16 pb-8">
        <h1 
          className="font-headline text-5xl font-bold tracking-tight sm:text-7xl"
          style={{
            textShadow: '0 0 5px hsl(var(--accent)), 0 0 10px hsl(var(--accent)), 0 0 15px hsl(var(--accent))',
          }}
          data-cms-id="apis.title"
          >
          {apiPageData.title}
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300" data-cms-id="apis.description">
          {apiPageData.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apiPageData.apis.map(api => (
          <ApiCard key={api.title} api={api} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-3xl tracking-wide" data-cms-id="apis.deepseek.title">
                    <CheckCircle className="h-8 w-8 text-primary"/>
                    {apiPageData.deepSeek.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground" data-cms-id="apis.deepseek.description">{apiPageData.deepSeek.description}</p>
                <div className="p-4 rounded-md border border-secondary bg-black/20">
                    <h4 className="font-bold text-xl text-white" data-cms-id="apis.deepseek.platform.title">{apiPageData.deepSeek.platform.title}</h4>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        {apiPageData.deepSeek.platform.features.map((feature, index) => (
                          <li key={index} dangerouslySetInnerHTML={{ __html: feature }}></li>
                        ))}
                    </ul>
                    <Button size="sm" asChild className="mt-4" data-cms-id="apis.deepseek.platform.button">
                        <Link href={apiPageData.deepSeek.platform.button.href} target="_blank">{apiPageData.deepSeek.platform.button.text} <ExternalLink /></Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-accent/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-3xl tracking-wide" data-cms-id="apis.notes.title">
                    <Lightbulb className="h-8 w-8 text-accent"/>
                    {apiPageData.notes.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-lg">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {apiPageData.notes.points.map((point, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: point }}></li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
