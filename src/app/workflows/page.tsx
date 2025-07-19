'use client';

import { useState, useEffect, useMemo } from 'react';
import type { N8NWorkflow } from '@/lib/types';
import { WorkflowCard } from '@/components/workflow-card';
import { WorkflowFilters, FilterState } from '@/components/workflow-filters';
import { PaginationComponent } from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function WorkflowsPage() {
  const [allWorkflows, setAllWorkflows] = useState<N8NWorkflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = 12;

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    complexity: 'all',
    sortBy: 'recent',
  });

  useEffect(() => {
    async function fetchWorkflows() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/workflows');
        if (!res.ok) {
          throw new Error('Failed to fetch workflows');
        }
        const data = await res.json();
        setAllWorkflows(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWorkflows();
  }, []);

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
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-sans text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-accent to-white drop-shadow-[0_2px_4px_rgba(168,85,247,0.4)] sm:text-7xl">
          Workflow Directory
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
          Explore our collection of n8n workflows. Search, filter, and find the perfect automation.
        </p>
      </div>

      <WorkflowFilters 
        onFilterChange={setFilters}
        categories={allCategories}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-[300px] h-[310px]">
                    <Skeleton className="h-40 w-full" />
                    <div className="p-4 space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
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

      {totalPages > 1 && (
        <div className="py-8">
          <PaginationComponent totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
