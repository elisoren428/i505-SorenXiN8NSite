import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { N8NWorkflow } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

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
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner':
        return 'bg-green-500 hover:bg-green-600';
      case 'Intermediate':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Advanced':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const imageUrl = `/api/workflow-image/${workflowId}.png?name=${encodeURIComponent(cleanTitle)}&category=${encodeURIComponent(workflow.category || 'Other')}&complexity=${encodeURIComponent(workflow.complexity || 'Unknown')}`;

  return (
    <Card className="group w-[300px] shrink-0 overflow-hidden rounded-lg bg-card/60 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-primary/20 will-change-transform">
        <Link href={`/workflows/${workflowId}`} className="block">
            <div className="relative h-40 w-full">
                <Image
                    src={imageUrl}
                    alt={`${cleanTitle} workflow preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <Badge variant="secondary" className={`absolute top-2 right-2 ${getComplexityColor(workflow.complexity || 'Unknown')}`}>
                    {workflow.complexity}
                </Badge>
            </div>
        </Link>
        <CardContent className="p-4">
            <h3 className="font-headline text-xl truncate font-bold text-white">{cleanTitle}</h3>
            <p className="text-sm text-muted-foreground h-10 overflow-hidden text-ellipsis">
                An n8n workflow for {workflow.category}.
            </p>
            <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-2">
                    {(workflow.tags || []).slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                </div>
                <Button asChild size="sm">
                    <Link href={`/workflows/${workflowId}`}>
                        View <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </CardContent>
    </Card>
  );
}
