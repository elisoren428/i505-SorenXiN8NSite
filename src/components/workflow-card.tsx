
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
  
  // Foolproof JS-based truncation
  let cleanTitle = sourceTitle
    .replace(/^\d+_/g, '')
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

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
    <>
    <style jsx>{`
      .card-frame {
        position: relative;
        background-color: hsl(var(--card));
        border-radius: 0.8rem; /* Slightly larger than the inner card's radius */
        padding: 2px; /* This controls the border thickness */
        transition: all 0.3s ease-in-out;
      }

      .card-frame::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: inherit;
        background: conic-gradient(from 180deg at 50% 50%, hsl(var(--accent) / 0.7), hsl(var(--primary) / 0.7), hsl(var(--accent) / 0.7));
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        z-index: 0;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      
      .card-frame:hover {
        transform: scale(1.03);
        box-shadow: 0 0 20px hsl(var(--primary) / 0.3);
      }
      
      .card-frame:hover::before {
        opacity: 1;
      }

      .card-frame-inner {
        position: relative;
        z-index: 1;
        background-color: hsl(var(--card)); /* Match the frame's base color */
        border-radius: 0.75rem; /* The actual card's radius */
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
    `}</style>
    <div className="group w-full max-w-[300px] h-full card-frame">
      <div className="card-frame-inner">
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
        <CardContent className="flex flex-grow flex-col p-4">
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
      </div>
    </div>
    </>
  );
}
