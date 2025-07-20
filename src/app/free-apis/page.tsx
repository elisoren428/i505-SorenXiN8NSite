
'use client';
import { FreeApisClient } from './free-apis-client';
import { useContent } from '@/context/content-context';
import type { ApiData } from './free-apis-client';

export default function FreeApisPage() {
  const { content } = useContent();

  const apiDataWithIds = content.freeApisContent.apis.map((api, index) => {
    return {
      ...api,
      id: `free-api-${index}`,
      imageUrl: api.imageUrl || `https://placehold.co/100x100/222222/FFFFFF.png?text=${api.title.charAt(0)}`,
    };
  });

  const pageData = {
    ...content.freeApisContent,
    apis: apiDataWithIds,
  };

  return <FreeApisClient apiPageData={pageData} />;
}
