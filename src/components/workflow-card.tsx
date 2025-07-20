
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
  const cleanTitle = sourceTitle
    .replace(/^\d+_/g, '')
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
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
    <Card className="group flex flex-col h-full w-full max-w-[300px] mx-auto overflow-hidden rounded-lg bg-card/80 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-primary/20 will-change-transform border-white/10">
      <Link href={`/workflows/${workflowId}`} className="block">
        <div className="relative h-40 w-full">
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
      <CardContent className="p-4 flex flex-col flex-grow bg-card/80">
        <div className="flex items-start gap-2">
            <Hash className="h-5 w-5 text-primary mt-1 shrink-0"/>
            <div>
                <h3 className="font-headline text-xl truncate font-bold text-white">
                  {cleanTitle}
                </h3>
                <div className="flex gap-2 overflow-hidden mt-1">
                  {(workflow.tags || []).slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="truncate text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
            </div>
        </div>
        
        <div className="mt-auto pt-4 flex justify-between items-center">
           <p className="text-sm text-muted-foreground">{workflow.category}</p>
           <Button asChild size="sm" className="shrink-0">
            <Link href={`/workflows/${workflowId}`}>
              View <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
