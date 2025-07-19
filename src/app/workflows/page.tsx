import { getWorkflows } from '@/lib/github';
import { WorkflowCard } from '@/components/workflow-card';
import { PaginationComponent } from '@/components/ui/pagination';
import type { GithubContent } from '@/lib/types';

const ITEMS_PER_PAGE = 8;

export default async function WorkflowsPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const allWorkflows = await getWorkflows();
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = Math.ceil(allWorkflows.length / ITEMS_PER_PAGE);

  const paginatedWorkflows = allWorkflows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="font-headline text-5xl font-bold tracking-tight text-white sm:text-7xl">
          Workflow Directory
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
          Explore our collection of n8n workflows. Click to view details, test, and enhance with AI.
        </p>
      </div>

      {paginatedWorkflows.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedWorkflows.map((workflow: GithubContent) => (
              <WorkflowCard key={workflow.sha} workflow={workflow} />
            ))}
          </div>
          <PaginationComponent totalPages={totalPages} />
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No workflows found.</p>
        </div>
      )}
    </div>
  );
}
