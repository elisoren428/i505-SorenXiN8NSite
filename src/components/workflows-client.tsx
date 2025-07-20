
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { N8NWorkflow } from '@/lib/types';
import { WorkflowCard } from '@/components/workflow-card';
import { WorkflowFilters, FilterState } from '@/components/workflow-filters';
import { PaginationComponent } from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

interface WorkflowsClientProps {
    allWorkflows: N8NWorkflow[];
}

export function WorkflowsClient({ allWorkflows }: WorkflowsClientProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = 12;
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    complexity: 'all',
    sortBy: 'recent',
  });

  const filteredAndSortedWorkflows = useMemo(() => {
    let filtered = allWorkflows;

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (wf) =>
          wf.name?.toLowerCase().includes(searchTerm) ||
          (wf.tags && wf.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter((wf) => wf.category === filters.category);
    }

    if (filters.complexity !== 'all') {
      filtered = filtered.filter((wf) => wf.complexity === filters.complexity);
    }

    switch (filters.sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'alphabetical':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'complexity':
        const complexityOrder = { Beginner: 1, Intermediate: 2, Advanced: 3, Unknown: 4 };
        filtered.sort((a, b) => (complexityOrder[a.complexity || 'Unknown'] || 4) - (complexityOrder[b.complexity || 'Unknown'] || 4));
        break;
    }
    
    return filtered;
  }, [allWorkflows, filters]);
  
  useEffect(() => {
    if (allWorkflows && allWorkflows.length > 0) {
      setIsLoading(false);
    }
  }, [allWorkflows]);


  const totalPages = Math.ceil(filteredAndSortedWorkflows.length / itemsPerPage);
  const paginatedWorkflows = filteredAndSortedWorkflows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const allCategories = useMemo(() => {
      const categories = new Set(allWorkflows.map(wf => wf.category || 'Other'));
      return ['all', ...Array.from(categories)];
  }, [allWorkflows]);

  return (
    <>
      <WorkflowFilters 
        onFilterChange={setFilters}
        categories={allCategories}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-full max-w-[300px] mx-auto h-[310px] space-y-2">
                    <Skeleton className="h-40 w-full" />
                    <div className="p-4 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <div className="flex justify-between items-center pt-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-9 w-24" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
      ) : paginatedWorkflows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl font-semibold text-white">No Workflows Found</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {totalPages > 1 && !isLoading && (
        <div className="py-8">
          <PaginationComponent totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
