import { Suspense } from 'react';
import { Zap, Workflow, Puzzle } from 'lucide-react';
import { getWorkflowStats } from '@/lib/github';
import { Skeleton } from '@/components/ui/skeleton';

async function Stats() {
  const stats = await getWorkflowStats();

  const statItems = [
    {
      icon: <Workflow className="text-accent" />,
      value: `${stats.workflowCount}+`,
      label: 'Workflows',
    },
    {
      icon: <Zap className="text-accent" />,
      value: `${stats.nodeCount}+`,
      label: 'Nodes',
    },
    {
      icon: <Puzzle className="text-accent" />,
      value: `${stats.integrationCount}+`,
      label: 'Integrations',
    },
  ];

  return (
    <div className="flex items-center gap-6">
      {statItems.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          {item.icon}
          <div>
            <p className="text-xl font-bold text-white">{item.value}</p>
            <p className="text-sm text-muted-foreground">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatsSkeleton() {
    return (
        <div className="flex items-center gap-6">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6 rounded-md" />
                    <div>
                        <Skeleton className="h-6 w-16 mb-1" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export function HeaderStats() {
  return (
    <Suspense fallback={<StatsSkeleton />}>
      <Stats />
    </Suspense>
  );
}
