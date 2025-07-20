import type { N8NWorkflow } from './types';

interface FilterState {
  search: string;
  category: string;
  complexity: string;
  sortBy: string;
}

export function filterAndSortWorkflows(
  workflows: N8NWorkflow[],
  filters: FilterState
): N8NWorkflow[] {
  let filtered = [...workflows];

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(
      (wf) =>
        wf.name?.toLowerCase().includes(searchTerm) ||
        (wf.tags && wf.tags.some((tag) => tag.toLowerCase().includes(searchTerm)))
    );
  }

  if (filters.category !== 'all') {
    filtered = filtered.filter((wf) => wf.category === filters.category);
  }

  if (filters.complexity !== 'all') {
    filtered = filtered.filter((wf) => wf.complexity === filters.complexity);
  }

  // Use a stable sort by adding a secondary sort key (id) to prevent hydration errors.
  switch (filters.sortBy) {
    case 'recent':
      filtered.sort((a, b) => {
        const dateA = new Date(b.createdAt).getTime();
        const dateB = new Date(a.createdAt).getTime();
        if (dateA !== dateB) return dateA - dateB;
        return a.id.localeCompare(b.id);
      });
      break;
    case 'alphabetical':
      filtered.sort((a, b) => {
        const nameA = a.name || '';
        const nameB = b.name || '';
        if (nameA !== nameB) return nameA.localeCompare(nameB);
        return a.id.localeCompare(b.id);
      });
      break;
    case 'complexity':
      const complexityOrder: { [key: string]: number } = { Beginner: 1, Intermediate: 2, Advanced: 3, Unknown: 4 };
      filtered.sort((a, b) => {
        const complexityA = complexityOrder[a.complexity || 'Unknown'] || 4;
        const complexityB = complexityOrder[b.complexity || 'Unknown'] || 4;
        if (complexityA !== complexityB) return complexityA - complexityB;
        return a.id.localeCompare(b.id);
      });
      break;
  }

  return filtered;
}
