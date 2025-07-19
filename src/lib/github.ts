import 'server-only';
import { N8NWorkflow, GithubContent } from './types';

const GITHUB_TOKEN = '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';
const REPO_OWNER = 'elisoren428';
const REPO_NAME = 'n8n-WorkFlow-Directory';
const WORKFLOWS_PATH = 'workflows';

const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${WORKFLOWS_PATH}`;

export interface WorkflowStats {
  workflowCount: number;
  nodeCount: number;
  integrationCount: number;
}

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
    if (!Array.isArray(data)) {
        console.error('Invalid data received from GitHub API, expected an array.');
        return [];
    }
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
                Accept: 'application/vnd.github.raw',
            },
            next: {
                revalidate: 3600,
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch workflow ${safeFileName} from GitHub:`, response.statusText);
            return null;
        }

        const fileContent = await response.text();
        const workflowData: N8NWorkflow = JSON.parse(fileContent);
        
        if (!workflowData.id) {
            workflowData.id = fileName.replace('.json', '');
        }

        return workflowData;

    } catch (error) {
        console.error(`Error fetching or parsing workflow ${safeFileName}:`, error);
        return null;
    }
}

export async function getWorkflowStats(): Promise<WorkflowStats> {
  const workflowFiles = await getWorkflows();
  const workflowCount = workflowFiles.length;

  if (workflowCount === 0) {
    return { workflowCount: 0, nodeCount: 0, integrationCount: 0 };
  }

  const workflowPromises = workflowFiles.map(file => getWorkflow(file.name));
  const workflows = (await Promise.all(workflowPromises)).filter(Boolean) as N8NWorkflow[];

  let nodeCount = 0;
  const integrationTypes = new Set<string>();

  workflows.forEach(workflow => {
    if (workflow && Array.isArray(workflow.nodes)) {
      nodeCount += workflow.nodes.length;
      workflow.nodes.forEach(node => {
        // Assuming 'n8n-nodes-base' contains core nodes that aren't "integrations"
        if (node.type.startsWith('n8n-nodes-base.')) return;
        
        // Extract the base integration name (e.g., 'n8n-nodes-dall-e-image-generation' -> 'dall-e')
        const integrationName = node.type.replace(/^n8n-nodes-/, '').split('.')[0];
        integrationTypes.add(integrationName);
      });
    }
  });

  return {
    workflowCount,
    nodeCount,
    integrationCount: integrationTypes.size,
  };
}
