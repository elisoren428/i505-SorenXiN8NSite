'use client';

import { useState, useMemo } from 'react';
import type { N8NWorkflow } from '@/lib/types';
import { WorkflowCard } from '@/components/workflow-card';
import { WorkflowFilters, FilterState } from '@/components/workflow-filters';
import { filterAndSortWorkflows } from '@/lib/workflow-utils';

interface WorkflowsClientProps {
    allWorkflows: N8NWorkflow[];
}

export function WorkflowsClient({ allWorkflows }: WorkflowsClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    complexity: 'all',
    sortBy: 'recent',
  });

  const filteredAndSortedWorkflows = useMemo(() => {
    return filterAndSortWorkflows(allWorkflows, filters);
  }, [allWorkflows, filters]);
  
  const allCategories = useMemo(() => {
      const categories = new Set(allWorkflows.map(wf => wf.category || 'Other'));
      return ['all', ...Array.from(categories).sort()];
  }, [allWorkflows]);

  return (
    <>
      <WorkflowFilters 
        onFilterChange={setFilters}
        categories={allCategories}
      />

      {filteredAndSortedWorkflows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedWorkflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl font-semibold text-white">No Workflows Found</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </>
  );
}
