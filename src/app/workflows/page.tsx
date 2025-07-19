import { getWorkflows } from '@/lib/github';
import type { N8NWorkflow } from '@/lib/types';
import { WorkflowCarousel } from '@/components/workflow-carousel';

export const revalidate = 3600; // Revalidate every hour

const complexityLevels = ['Beginner', 'Intermediate', 'Advanced'];
const useCaseCategories = [
    'AI',
    'CRM',
    'Marketing',
    'DevOps',
    'Data Sync & ETL',
    'Utility',
    'Social Media',
    'Web Scraping',
    'Other'
];

export default async function WorkflowsPage() {
  const allWorkflows = await getWorkflows();

  const workflowsByComplexity = complexityLevels.map(level => ({
    title: `${level} Workflows`,
    workflows: allWorkflows.filter(wf => wf.complexity === level),
  }));

  const workflowsByCategory = useCaseCategories.map(category => ({
    title: category === 'Data Sync & ETL' ? category : `${category} Workflows`,
    workflows: allWorkflows.filter(wf => wf.category === category),
  }));

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="font-headline text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-white drop-shadow-[0_2px_4px_rgba(255,140,0,0.4)] sm:text-7xl">
          Workflow Directory
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
          Explore our collection of n8n workflows. Click to view details, test, and enhance with AI.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {workflowsByComplexity.map(({ title, workflows }) => 
            workflows.length > 0 && <WorkflowCarousel key={title} title={title} workflows={workflows} />
        )}
        {workflowsByCategory.map(({ title, workflows }) => 
            workflows.length > 0 && <WorkflowCarousel key={title} title={title} workflows={workflows} />
        )}
      </div>

      {allWorkflows.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No workflows found.</p>
        </div>
      )}
    </div>
  );
}
