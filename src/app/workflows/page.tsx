import { getWorkflows } from '@/lib/github';
import { WorkflowCard } from '@/components/workflow-card';
import { PaginationComponent } from '@/components/ui/pagination';
import type { GithubContent } from '@/lib/types';

const ITEMS_PER_PAGE_LG = 4;
const ITEMS_PER_PAGE_SM = 6;


export default async function WorkflowsPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    show?:string;
  };
}) {
  const allWorkflows = await getWorkflows();
  const currentPage = Number(searchParams?.page) || 1;
  // This logic is a bit flawed as it doesn't know the screen size on the server.
  // For a truly responsive item count, a client-side solution would be better,
  // but for this project we'll use a single value.
  const itemsPerPage = Number(searchParams?.show) || ITEMS_PER_PAGE_LG;
  const totalPages = Math.ceil(allWorkflows.length / itemsPerPage);

  const paginatedWorkflows = allWorkflows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
