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
  
  // Create a simple description from the filename
  const description = workflow.name
    .replace('.json', '')
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Card className="flex flex-col bg-card/50 backdrop-blur-sm border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 ease-in-out hover:border-primary/50 hover:scale-[1.02] group">
      <CardHeader>
        <div className="flex items-center gap-3">
            <BotMessageSquare className="h-8 w-8 text-accent" />
            <CardTitle className="font-headline text-2xl tracking-wide">{workflowId}</CardTitle>
        </div>
        <CardDescription className="pt-2 h-12 overflow-hidden">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-1">
            <Button variant="ghost" size="icon" disabled>
                <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" disabled>
                <Copy className="h-4 w-4" />
            </Button>
        </div>
        <Button asChild variant="link" className="text-accent">
          <Link href={`/workflows/${workflowId}`}>
            Open <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
