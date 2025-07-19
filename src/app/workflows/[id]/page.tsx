import { getWorkflow } from '@/lib/github';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { WorkflowDetailClient } from '@/components/workflow-detail-client';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default async function WorkflowDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const workflow = await getWorkflow(params.id);

  if (!workflow) {
    notFound();
  }

  return (
    <div className="space-y-8">
       <div>
         <Button variant="ghost" asChild>
          <Link href="/workflows">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workflows
          </Link>
         </Button>
       </div>
      <WorkflowDetailClient workflow={workflow} />
    </div>
  );
}
