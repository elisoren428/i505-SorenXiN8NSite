
import { getWorkflows } from '@/lib/github';
import { WorkflowsClient } from '@/components/workflows-client';

export const revalidate = 3600; // Revalidate the page every hour

export default async function WorkflowsPage() {
  const workflows = await getWorkflows();

  return (
    <div className="space-y-8">
      <div className="text-center pt-16 pb-12">
        <h1 
          className="font-headline text-5xl font-bold tracking-tight sm:text-7xl"
          style={{
            textShadow: '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 15px hsl(var(--primary)), 0 0 20px hsl(var(--primary))',
          }}
          >
          Workflow Directory
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
          Explore our collection of n8n workflows. Search, filter, and find the perfect automation.
        </p>
      </div>
      <WorkflowsClient allWorkflows={workflows} />
    </div>
  );
}
