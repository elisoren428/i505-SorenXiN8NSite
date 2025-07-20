import { Zap, Workflow, Puzzle } from 'lucide-react';
import { getWorkflowStats } from '@/lib/github';

export async function HeaderStats() {
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
