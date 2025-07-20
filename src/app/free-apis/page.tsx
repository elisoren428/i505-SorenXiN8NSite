
import { generateWorkflowImage } from '@/ai/flows/generate-workflow-image';
import { FreeApisClient } from './free-apis-client';
import { freeApisContent } from '@/lib/content-structure';
import type { ApiData } from './free-apis-client';

export default async function FreeApisPage() {
  const apiDataWithImages = await Promise.all(
    freeApisContent.apis.map(async (api, index) => {
      const imageUrl = await generateWorkflowImage({
        name: api.title,
        category: 'API',
        complexity: 'Beginner', 
      });
      return {
        ...api,
        imageUrl,
        id: `free-api-${index}`
      };
    })
  );

  const pageData = {
    ...freeApisContent,
    apis: apiDataWithImages,
  };

  return <FreeApisClient apiPageData={pageData} />;
}
