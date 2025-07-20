
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { N8NWorkflow } from '@/lib/types';
import { ArrowRight, Hash } from 'lucide-react';

interface WorkflowCardProps {
  workflow: N8NWorkflow;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const workflowId = workflow.id;

  const sourceTitle = workflow.name || workflow.id || 'Untitled Workflow';
  let cleanTitle = sourceTitle
    .replace(/^\d+_/g, '')
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Foolproof JS-based truncation
  if (cleanTitle.length > 55) {
    cleanTitle = cleanTitle.substring(0, 52) + '...';
  }
  
  const imageUrl = workflow.imageUrl || 'https://placehold.co/300x160/222222/FFFFFF.png?text=SorenXi';

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner':
        return 'bg-green-600/90 text-white';
      case 'Intermediate':
        return 'bg-yellow-500/90 text-white';
      case 'Advanced':
        return 'bg-red-600/90 text-white';
      default:
        return 'bg-gray-500/90 text-white';
    }
  };

  return (
    <div className="group rounded-xl p-0.5 bg-white/10 shadow-lg transition-all duration-300 ease-in-out hover:bg-primary/50 hover:shadow-primary/20 w-full max-w-[300px] hover:scale-105 will-change-transform">
      <Card className="h-full w-full bg-card flex flex-col overflow-hidden">
        <Link href={`/workflows/${workflowId}`} className="block">
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={`${cleanTitle} workflow preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <Badge
              variant="default"
              className={`absolute top-2 right-2 border border-white/20 ${getComplexityColor(
                workflow.complexity || 'Unknown'
              )}`}
            >
              {workflow.complexity}
            </Badge>
          </div>
        </Link>
        <CardContent className="flex flex-grow flex-col bg-card/80 p-4">
          <div className="flex items-start gap-2">
              <Hash className="mt-1 h-5 w-5 shrink-0 text-primary"/>
              <div className="flex-1">
                <h3 className="font-headline text-xl leading-tight text-white min-h-[48px]">
                    {cleanTitle}
                </h3>
                <div className="mt-1 flex gap-2 overflow-hidden">
                  {(workflow.tags || []).slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="truncate text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
          </div>
          
          <div className="mt-auto flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">{workflow.category}</p>
            <Button asChild size="sm" className="shrink-0">
              <Link href={`/workflows/${workflowId}`}>
                View <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
