
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { N8NWorkflow } from '@/lib/types';
import { ArrowRight, Hash } from 'lucide-react';

interface WorkflowCardProps {
  workflow: N8NWorkflow;
}

const staticImages = [
    'https://cdn.pixabay.com/photo/2021/07/14/14/00/potato-chips-6466146_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/04/19/14/42/boeing-777-300-3333276_1280.png',
    'https://cdn.pixabay.com/photo/2014/11/25/16/32/drop-545377_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/12/10/00/56/international-4684747_960_720.jpg',
    'https://cdn.pixabay.com/photo/2023/12/09/21/56/ai-generated-8440246_960_720.jpg',
    'https://cdn.pixabay.com/photo/2024/02/05/16/07/gas-8554849_640.jpg',
    'https://cdn.pixabay.com/photo/2024/05/15/20/44/app-8764508_640.jpg',
    'https://cdn.pixabay.com/photo/2023/10/05/11/18/ai-generated-8295617_640.jpg',
    'https://cdn.pixabay.com/photo/2024/05/07/12/26/ai-generated-8745740_640.png',
    'https://cdn.pixabay.com/photo/2023/05/08/08/41/ai-7977960_640.jpg',
    'https://cdn.pixabay.com/photo/2024/03/07/18/23/ai-generated-8619045_640.png',
    'https://cdn.pixabay.com/photo/2023/09/06/18/10/ai-generated-8237711_640.jpg',
    'https://cdn.pixabay.com/photo/2024/02/22/07/27/ai-generated-8589304_640.jpg',
    'https://cdn.pixabay.com/photo/2024/08/04/15/31/ai-generated-8944672_640.jpg',
    'https://cdn.pixabay.com/photo/2024/04/29/15/37/transparency-8728255_640.jpg',
    'https://cdn.pixabay.com/photo/2024/04/09/15/45/ai-generated-8686233_640.jpg',
    'https://cdn.pixabay.com/photo/2024/04/11/10/21/ai-generated-8689627_640.png',
    'https://cdn.pixabay.com/photo/2024/06/12/08/21/eye-8824773_640.png',
    'https://cdn.pixabay.com/photo/2023/12/09/08/53/ai-generated-8438822_640.jpg',
    'https://cdn.pixabay.com/photo/2024/05/23/09/12/ai-generated-8782741_640.jpg',
    'https://cdn.pixabay.com/photo/2024/05/07/20/36/ai-generated-8746746_640.png',
    'https://cdn.pixabay.com/photo/2023/08/20/13/46/ai-generated-8202383_640.jpg',
    'https://cdn.pixabay.com/photo/2023/03/01/17/30/ai-generated-7823617_640.jpg',
    'https://cdn.pixabay.com/photo/2023/01/29/01/47/ai-generated-7752100_640.jpg',
    'https://cdn.pixabay.com/photo/2023/08/30/17/16/ai-generated-8223819_640.jpg',
    'https://cdn.pixabay.com/photo/2024/01/25/00/25/robot-hand-8530780_640.jpg',
    'https://cdn.pixabay.com/photo/2024/03/29/01/19/ai-generated-8661950_640.png',
    'https://cdn.pixabay.com/photo/2024/01/25/05/47/ai-generated-8531013_640.jpg',
    'https://cdn.pixabay.com/photo/2024/06/21/04/17/ai-generated-8843435_640.jpg',
    'https://cdn.pixabay.com/photo/2023/03/11/22/10/ai-generated-7845392_640.jpg',
    'https://cdn.pixabay.com/photo/2023/08/02/16/54/ai-generated-8165671_640.jpg',
    'https://cdn.pixabay.com/photo/2023/07/06/18/38/ai-generated-8111078_640.jpg',
    'https://cdn.pixabay.com/photo/2024/02/08/10/36/ai-generated-8560784_640.jpg',
    'https://cdn.pixabay.com/photo/2023/04/27/13/10/ai-generated-7954598_640.png',
    'https://cdn.pixabay.com/photo/2024/05/30/06/56/art-8797919_640.jpg',
    'https://cdn.pixabay.com/photo/2023/01/19/15/31/ai-generated-7729412_640.jpg',
    'https://cdn.pixabay.com/photo/2024/03/02/06/48/ai-generated-8607669_640.jpg',
    'https://cdn.pixabay.com/photo/2023/05/11/06/20/splash-7985598_640.jpg',
    'https://cdn.pixabay.com/photo/2023/06/17/13/37/ai-generated-8070000_640.jpg',
    'https://cdn.pixabay.com/photo/2023/01/29/01/53/ai-generated-7752177_640.jpg',
    'https://cdn.pixabay.com/photo/2023/01/29/01/52/ai-generated-7752165_640.jpg',
    'https://cdn.pixabay.com/photo/2024/05/01/00/46/eye-8731200_640.png',
    'https://cdn.pixabay.com/photo/2023/03/14/20/21/insect-7853096_640.jpg',
    'https://cdn.pixabay.com/photo/2024/05/18/01/56/ai-generated-8769377_640.jpg',
    'https://cdn.pixabay.com/photo/2024/06/11/07/01/ai-generated-8822146_640.jpg',
    'https://cdn.pixabay.com/photo/2024/05/09/08/32/ai-generated-8750220_640.png',
    'https://cdn.pixabay.com/photo/2024/03/01/10/30/ai-generated-8606186_640.jpg',
    'https://cdn.pixabay.com/photo/2024/04/24/07/24/ai-generated-8716842_640.jpg',
    'https://cdn.pixabay.com/photo/2023/11/09/06/52/ai-generated-8376452_640.jpg',
    'https://cdn.pixabay.com/photo/2024/03/19/13/40/ai-generated-8643329_640.png',
    'https://cdn.pixabay.com/photo/2024/04/27/21/21/ai-generated-8724382_640.jpg',
    'https://cdn.pixabay.com/photo/2023/09/17/10/28/mermaid-8258278_640.jpg',
    'https://cdn.pixabay.com/photo/2024/03/01/20/09/volcano-8607162_640.png',
    'https://cdn.pixabay.com/photo/2023/06/06/15/55/finance-8045002_640.jpg',
    'https://cdn.pixabay.com/photo/2024/03/27/07/14/ai-generated-8658377_640.jpg',
    'https://cdn.pixabay.com/photo/2024/03/29/10/54/ai-generated-8662640_640.jpg',
    'https://cdn.pixabay.com/photo/2023/03/21/18/25/chatgpt-7867916_640.jpg',
    'https://cdn.pixabay.com/photo/2023/04/23/13/20/ai-generated-7945689_640.jpg',
    'https://cdn.pixabay.com/photo/2023/03/01/05/04/snake-7822263_640.jpg',
    'https://cdn.pixabay.com/photo/2023/11/01/19/03/ai-generated-8358818_640.jpg',
    'https://cdn.pixabay.com/photo/2024/04/16/14/14/ai-generated-8700134_640.png',
    'https://cdn.pixabay.com/photo/2024/04/02/18/27/ai-generated-8671475_640.jpg',
    'https://cdn.pixabay.com/photo/2024/06/10/11/24/ai-generated-8820543_640.png',
    'https://cdn.pixabay.com/photo/2024/06/04/12/49/smoke-8808580_640.jpg',
    'https://cdn.pixabay.com/photo/2024/01/20/17/51/ai-generated-8521599_640.jpg',
    'https://cdn.pixabay.com/photo/2023/01/29/01/52/ai-generated-7752175_640.jpg',
    'https://cdn.pixabay.com/photo/2024/01/08/19/11/ai-generated-8496132_640.jpg'
];

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const workflowId = workflow.id;

  const sourceTitle = workflow.name || workflow.id || 'Untitled Workflow';
  const cleanTitle = sourceTitle
    .replace(/^\d+_/g, '')
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Simple hash function to get a consistent image per workflow
  // This logic now runs on both server and client, fixing the hydration mismatch.
  const hash = workflowId.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  const index = Math.abs(hash) % staticImages.length;
  const imageUrl = staticImages[index];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner':
        return 'bg-green-600/90 text-white';
      case 'Intermediate':
        return 'bg-yellow-500/90 text-white';
      case 'Advanced':
        return 'bg-red-600/90 text-white';
      default:
        return 'bg-gray-500/90 text-white';
    }
  };

  return (
    <Card className="group flex flex-col h-full w-full max-w-[300px] mx-auto overflow-hidden rounded-lg bg-card/80 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-primary/20 will-change-transform border-white/10">
      <Link href={`/workflows/${workflowId}`} className="block">
        <div className="relative h-40 w-full">
          <Image
            src={imageUrl}
            alt={`${cleanTitle} workflow preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <Badge
            variant="default"
            className={`absolute top-2 right-2 border border-white/20 ${getComplexityColor(
              workflow.complexity || 'Unknown'
            )}`}
          >
            {workflow.complexity}
          </Badge>
        </div>
      </Link>
      <CardContent className="p-4 flex flex-col flex-grow bg-card/80">
        <div className="flex items-start gap-2">
            <Hash className="h-5 w-5 text-primary mt-1 shrink-0"/>
            <div>
                <h3 className="font-headline text-xl truncate font-bold text-white">
                  {cleanTitle}
                </h3>
                <div className="flex gap-2 overflow-hidden mt-1">
                  {(workflow.tags || []).slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="truncate text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
            </div>
        </div>
        
        <div className="mt-auto pt-4 flex justify-between items-center">
           <p className="text-sm text-muted-foreground">{workflow.category}</p>
           <Button asChild size="sm" className="shrink-0">
            <Link href={`/workflows/${workflowId}`}>
              View <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
