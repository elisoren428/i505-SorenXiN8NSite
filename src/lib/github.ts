import 'server-only';
import { N8NWorkflow, GithubContent } from './types';

const GITHUB_TOKEN = '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';
const REPO_OWNER = 'sorenisanerd';
const REPO_NAME = 'n8n-gallery';
const WORKFLOWS_PATH = 'workflows';

const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${WORKFLOWS_PATH}`;

export async function getWorkflows(): Promise<GithubContent[]> {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: {
        revalidate: 3600, // Revalidate every hour
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch workflows from GitHub:', response.statusText);
      return [];
    }

    const data: GithubContent[] = await response.json();
    return data.filter(item => item.type === 'file' && item.name.endsWith('.json'));
  } catch (error) {
    console.error('Error fetching workflows:', error);
    return [];
  }
}

export async function getWorkflow(fileName: string): Promise<N8NWorkflow | null> {
    const safeFileName = fileName.endsWith('.json') ? fileName : `${fileName}.json`;
    const fileUrl = `${API_URL}/${safeFileName}`;

    try {
        const response = await fetch(fileUrl, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                // Request raw content
                Accept: 'application/vnd.github.raw',
            },
            next: {
                revalidate: 3600, // Revalidate every hour
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch workflow ${safeFileName} from GitHub:`, response.statusText);
            return null;
        }

        const fileContent = await response.text();
        const workflowData: N8NWorkflow = JSON.parse(fileContent);
        
        // The name in the file list might be different from the one inside the JSON.
        // Let's ensure the `name` from inside the JSON is used.
        // We can also add the filename as an id if not present
        if (!workflowData.id) {
            workflowData.id = fileName.replace('.json', '');
        }

        return workflowData;

    } catch (error) {
        console.error(`Error fetching or parsing workflow ${safeFileName}:`, error);
        return null;
    }
}
