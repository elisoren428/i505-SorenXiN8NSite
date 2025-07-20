'use client';

import { useState } from 'react';
import type { N8NWorkflow, N8NNode } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Wand2, Loader2, ClipboardCopy } from 'lucide-react';
import { handleSuggestImprovements, handleAutoFix } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface WorkflowDetailClientProps {
  workflow: N8NWorkflow;
}

export function WorkflowDetailClient({ workflow: initialWorkflow }: WorkflowDetailClientProps) {
  const [workflow, setWorkflow] = useState<N8NWorkflow>(initialWorkflow);
  const [suggestions, setSuggestions] = useState<string>('');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isFixing, setIsFixing] = useState<string | null>(null);
  const { toast } = useToast();

  const onSuggestImprovements = async () => {
    setIsSuggesting(true);
    setSuggestions('');
    try {
      const result = await handleSuggestImprovements(JSON.stringify(workflow));
      if (result.suggestions) {
        setSuggestions(result.suggestions);
      } else {
        toast({
          title: 'Error',
          description: 'Could not get suggestions from AI.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
    setIsSuggesting(false);
  };

  const onAutoFix = async (stepName: string) => {
    setIsFixing(stepName);
    try {
      const result = await handleAutoFix(JSON.stringify(workflow), stepName);
      if (result.fixedWorkflowJson) {
        setWorkflow(JSON.parse(result.fixedWorkflowJson));
        toast({
          title: 'Success!',
          description: `Step "${stepName}" has been fixed by AI.`,
        });
      } else {
        toast({
          title: 'Error',
          description: `Could not fix step "${stepName}".`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred while fixing the step.',
        variant: 'destructive',
      });
    }
    setIsFixing(null);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Workflow JSON copied to clipboard.',
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="font-headline text-5xl tracking-wide">{workflow.name}</CardTitle>
            <CardDescription>Created: {new Date(workflow.createdAt).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="relative group">
                <pre className="p-4 rounded-lg bg-black/50 text-sm overflow-x-auto max-h-[500px]">
                    <code>{JSON.stringify(workflow, null, 2)}</code>
                </pre>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(JSON.stringify(workflow, null, 2))}
                >
                    <ClipboardCopy className="h-4 w-4" />
                </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
                <CardTitle>Workflow Steps</CardTitle>
                <CardDescription>Details of each node in the workflow.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Accordion type="single" collapsible className="w-full">
                    {workflow.nodes.map((node: N8NNode) => (
                        <AccordionItem value={node.id} key={`${node.id}-${node.name}`}>
                            <AccordionTrigger>{node.name} ({node.type})</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <pre className="p-4 rounded-lg bg-black/50 text-xs overflow-x-auto">
                                        <code>{JSON.stringify(node.parameters, null, 2)}</code>
                                    </pre>
                                     <Button 
                                        onClick={() => onAutoFix(node.name)} 
                                        disabled={!!isFixing}
                                        size="sm"
                                    >
                                        {isFixing === node.name ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <Wand2 className="mr-2 h-4 w-4" />
                                        )}
                                        {isFixing === node.name ? 'Fixing...' : 'Fix with AI'}
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24 bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>AI Enhancements</CardTitle>
            <CardDescription>Let AI analyze and improve your workflow.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={onSuggestImprovements} disabled={isSuggesting} className="w-full">
              {isSuggesting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              {isSuggesting ? 'Analyzing...' : 'Suggest Improvements'}
            </Button>
            {suggestions && (
              <div className="mt-4 p-4 rounded-lg bg-black/50 text-sm whitespace-pre-wrap font-mono">
                {suggestions}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
