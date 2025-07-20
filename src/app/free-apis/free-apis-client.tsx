
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Lightbulb, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { FreeApisContent } from '@/lib/content-structure';
import { useContent } from '@/context/content-context';

export interface ApiData {
  id: string;
  title: string;
  url: string;
  imageUrl?: string;
  steps: string[];
  notes: string;
  quotas?: string[];
}

export interface ApiPageData extends Omit<FreeApisContent, 'apis'> {
  apis: ApiData[];
}

const ApiCard = ({ api, index }: { api: ApiData; index: number }) => (
  <Card className="bg-card/50 backdrop-blur-sm border-white/10 h-full flex flex-col group" data-cms-id={`freeApisContent.apis.${index}`}>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <CardTitle className="font-headline text-3xl tracking-wide" data-cms-id={`freeApisContent.apis.${index}.title`}>{api.title}</CardTitle>
        </div>
        <div className="relative w-16 h-16 ml-4 overflow-hidden rounded-lg border-2 border-white/10" data-cms-id={`freeApisContent.apis.${index}.image`}>
            <Image
                src={api.imageUrl || 'https://placehold.co/100x100'}
                alt={`${api.title} logo`}
                fill
                data-ai-hint={api.title}
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
          {api.steps.map((step: string, stepIndex: number) => (
            <li key={stepIndex} data-cms-id={`freeApisContent.apis.${index}.steps.${stepIndex}`}>{step}</li>
          ))}
        </ul>
        {api.quotas && (
          <>
            <h4 className="font-semibold text-lg text-primary pt-2">Daily Quotas:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {api.quotas.map((quota: string, quotaIndex: number) => (
                <li key={quotaIndex} data-cms-id={`freeApisContent.apis.${index}.quotas.${quotaIndex}`}>{quota}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="mt-auto pt-4 flex justify-between items-end">
        <Badge variant="secondary" className="whitespace-normal text-left py-2 px-3 max-w-[calc(100%-4rem)]">
          <Lightbulb className="h-4 w-4 mr-2 shrink-0"/>
          <span data-cms-id={`freeApisContent.apis.${index}.notes`}>{api.notes}</span>
        </Badge>
         <Button variant="ghost" size="icon" asChild>
          <Link href={api.url} target="_blank" data-cms-id={`freeApisContent.apis.${index}.url`}>
            <ExternalLink className="h-5 w-5 text-accent" />
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export function FreeApisClient({ apiPageData }: { apiPageData: ApiPageData }) {
  const { content } = useContent();
  const pageContent = content.freeApisContent;
  
  return (
    <div className="space-y-12">
      <div className="text-center pt-16 pb-8">
        <h1 
          className="font-headline text-5xl font-bold tracking-tight sm:text-7xl"
          style={{
            textShadow: '0 0 5px hsl(var(--accent)), 0 0 10px hsl(var(--accent)), 0 0 15px hsl(var(--accent))',
          }}
          data-cms-id="freeApisContent.title"
          >
          {pageContent.title}
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300" data-cms-id="freeApisContent.description">
          {pageContent.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apiPageData.apis.map((api, index) => (
          <ApiCard key={api.id} api={api} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/50" data-cms-id="freeApisContent.deepSeek">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-3xl tracking-wide" data-cms-id="freeApisContent.deepSeek.title">
                    <CheckCircle className="h-8 w-8 text-primary"/>
                    {pageContent.deepSeek.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground" data-cms-id="freeApisContent.deepSeek.description">{pageContent.deepSeek.description}</p>
                <div className="p-4 rounded-md border border-secondary bg-black/20" data-cms-id="freeApisContent.deepSeek.platform">
                    <h4 className="font-bold text-xl text-white" data-cms-id="freeApisContent.deepSeek.platform.title">{pageContent.deepSeek.platform.title}</h4>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        {pageContent.deepSeek.platform.features.map((feature, index) => (
                          <li key={index} dangerouslySetInnerHTML={{ __html: feature }} data-cms-id={`freeApisContent.deepSeek.platform.features.${index}`}></li>
                        ))}
                    </ul>
                    <Button size="sm" asChild className="mt-4" data-cms-id="freeApisContent.deepSeek.platform.button">
                        <Link href={pageContent.deepSeek.platform.button.href} target="_blank">
                          <span data-cms-id="freeApisContent.deepSeek.platform.button.text">{pageContent.deepSeek.platform.button.text}</span>
                           <ExternalLink />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-accent/50" data-cms-id="freeApisContent.notes">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-3xl tracking-wide" data-cms-id="freeApisContent.notes.title">
                    <Lightbulb className="h-8 w-8 text-accent"/>
                    {pageContent.notes.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-lg">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {pageContent.notes.points.map((point, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: point }} data-cms-id={`freeApisContent.notes.points.${index}`}></li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
