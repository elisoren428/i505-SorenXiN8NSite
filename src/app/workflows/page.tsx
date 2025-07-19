import { getWorkflows } from '@/lib/github';
import { WorkflowsClient } from '@/components/workflows-client';

export const revalidate = 3600; // Revalidate the page every hour

export default async function WorkflowsPage() {
  const workflows = await getWorkflows();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 
          className="font-sans text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 drop-shadow-[0_2px_4px_rgba(168,85,247,0.4)] sm:text-7xl"
          style={{
            color: '#804A65',
            textShadow: '0 0 2px #F67717, 0 0 2px #F67717, 0 0 2px #F67717, 0 0 2px #F67717, 0 0 2px #F67717, 0 0 3px #F67717, 0 0 4px #F67717, 0 0 5px #F67717, 0 0 6px #F67717, 0 0 8px #F67717',
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
