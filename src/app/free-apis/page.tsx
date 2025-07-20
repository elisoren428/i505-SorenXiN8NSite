
import { FreeApisClient } from './free-apis-client';
import { freeApisContent } from '@/lib/content-structure';
import type { ApiData } from './free-apis-client';

export default async function FreeApisPage() {
  const apiDataWithIds = freeApisContent.apis.map((api, index) => {
    return {
      ...api,
      id: `free-api-${index}`,
      imageUrl: api.imageUrl || `https://placehold.co/100x100/222222/FFFFFF.png?text=${api.title.charAt(0)}`,
    };
  });

  const pageData = {
    ...freeApisContent,
    apis: apiDataWithIds,
  };

  return <FreeApisClient apiPageData={pageData} />;
}
