import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BotMessageSquare, Copy, Pencil } from 'lucide-react';
import type { GithubContent } from '@/lib/types';

interface WorkflowCardProps {
  workflow: GithubContent;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const workflowId = workflow.name.replace('.json', '');
  
  const cleanTitle = workflowId
    .replace(/^\d+_/g, '') 
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const description = `An n8n workflow for automating tasks related to ${cleanTitle.split(' ')[0]}.`;

  return (
    <Card className="flex flex-col bg-card/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 ease-in-out hover:border-primary/30 hover:scale-[1.03] group will-change-transform">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader>
        <div className="flex items-start gap-4">
            <div className="p-2 bg-accent/10 border border-accent/20 rounded-lg">
                <BotMessageSquare className="h-6 w-6 text-accent flex-shrink-0" />
            </div>
            <div className="flex flex-col">
              <CardTitle className="font-headline text-2xl tracking-wide leading-tight text-white">{cleanTitle}</CardTitle>
              <CardDescription className="pt-2 text-gray-400">{description}</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <CardFooter className="flex justify-between items-center bg-black/20 p-4 mt-auto">
        <div className="flex gap-1">
            <Button variant="ghost" size="icon" disabled>
                <Pencil className="h-4 w-4 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon" disabled>
                <Copy className="h-4 w-4 text-gray-500" />
            </Button>
        </div>
        <Button asChild className="font-bold">
          <Link href={`/workflows/${workflowId}`}>
            Open
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
