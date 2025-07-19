'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

export interface FilterState {
  search: string;
  category: string;
  complexity: string;
  sortBy: string;
}

interface WorkflowFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
}

export function WorkflowFilters({ onFilterChange, categories }: WorkflowFiltersProps) {
  const [internalFilters, setInternalFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    complexity: 'all',
    sortBy: 'recent',
  });
  const debouncedSearch = useDebounce(internalFilters.search, 300);

  useEffect(() => {
    onFilterChange({...internalFilters, search: debouncedSearch});
  }, [debouncedSearch, internalFilters.category, internalFilters.complexity, internalFilters.sortBy, onFilterChange]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleSelectChange = (field: keyof FilterState) => (value: string) => {
    setInternalFilters(prev => ({ ...prev, [field]: value }));
  };
  
  const resetFilters = () => {
    const freshFilters = {
        search: '',
        category: 'all',
        complexity: 'all',
        sortBy: 'recent',
    };
    setInternalFilters(freshFilters);
    onFilterChange(freshFilters);
  };

  return (
    <div className="sticky top-24 z-30 p-4 rounded-lg bg-card/50 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/50 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
      <div className="relative md:flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search workflows by name or tag..."
          className="pl-10 w-full"
          value={internalFilters.search}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-2 md:flex md:items-center gap-4">
        <Select value={internalFilters.category} onValueChange={handleSelectChange('category')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={internalFilters.complexity} onValueChange={handleSelectChange('complexity')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Complexity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Complexities</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>

        <Select value={internalFilters.sortBy} onValueChange={handleSelectChange('sortBy')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
            <SelectItem value="complexity">Complexity</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="ghost" onClick={resetFilters} className="w-full md:w-auto">
            <X className="mr-2 h-4 w-4" />
            Reset
        </Button>
      </div>
    </div>
  );
}
