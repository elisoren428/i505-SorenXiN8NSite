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

const categoryKeywords: { [key: string]: string[] } = {
    'AI': ['ai', 'openai', 'gemini', 'dall-e', 'llm'],
    'CRM': ['crm', 'salesforce', 'hubspot', 'contact'],
    'Marketing': ['marketing', 'seo', 'ad'],
    'DevOps': ['devops', 'git', 'docker', 'deploy'],
    'Data Sync & ETL': ['etl', 'sync', 'database', 'airtable', 'sheets', 'google-sheets'],
    'Utility': ['util', 'tool', 'helper'],
    'Social Media': ['social', 'twitter', 'linkedin', 'facebook', 'instagram', 'telegram'],
    'Web Scraping': ['scrape', 'crawl', 'webhook'],
};

function assignCategory(name: string): string {
    if (!name || typeof name !== 'string') {
        return 'Other';
    }
    const lowerName = name.toLowerCase();
    for (const category in categoryKeywords) {
        if (categoryKeywords[category].some(keyword => lowerName.includes(keyword))) {
            return category;
        }
    }
    return 'Other';
}

function assignComplexity(nodeCount: number): string {
    if (nodeCount <= 5) return 'Beginner';
    if (nodeCount <= 15) return 'Intermediate';
    return 'Advanced';
}


export async function getWorkflows(): Promise<N8NWorkflow[]> {
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

    const contents: GithubContent[] = await response.json();
    if (!Array.isArray(contents)) {
        console.error('Invalid data received from GitHub API, expected an array.');
        return [];
    }

    const workflowFiles = contents.filter(item => item.type === 'file' && item.name.endsWith('.json'));

    const workflowPromises = workflowFiles.map(file => getWorkflow(file.name.replace('.json', '')));
    const workflows = (await Promise.all(workflowPromises)).filter((p): p is N8NWorkflow => p !== null);
    
    return workflows;

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
        
        workflowData.id = fileName.replace('.json', '');
        workflowData.complexity = assignComplexity(workflowData.nodes.length);
        workflowData.category = assignCategory(workflowData.name);
        
        // Simple tag extraction from node types
        workflowData.tags = [...new Set(workflowData.nodes.map(node => node.type.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim().split(' ')[0]))].slice(0,3);


        return workflowData;

    } catch (error) {
        console.error(`Error fetching or parsing workflow ${safeFileName}:`, error);
        return null;
    }
}

export async function getWorkflowStats(): Promise<WorkflowStats> {
  // This function now relies on the enriched getWorkflows()
  const workflows = await getWorkflows();
  const workflowCount = workflows.length;

  if (workflowCount === 0) {
    return { workflowCount: 0, nodeCount: 0, integrationCount: 0 };
  }
  
  let nodeCount = 0;
  const integrationTypes = new Set<string>();

  workflows.forEach(workflow => {
    if (workflow && Array.isArray(workflow.nodes)) {
      nodeCount += workflow.nodes.length;
      workflow.nodes.forEach(node => {
        if (node.type.startsWith('n8n-nodes-base.')) return;
        
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
