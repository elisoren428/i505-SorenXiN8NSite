import { N8NWorkflow, GithubContent } from './types';
import { unstable_cache as cache } from 'next/cache';

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
  AI: ['ai', 'openai', 'gemini', 'dall-e', 'llm'],
  CRM: ['crm', 'salesforce', 'hubspot', 'contact'],
  Marketing: ['marketing', 'seo', 'ad'],
  DevOps: ['devops', 'git', 'docker', 'deploy'],
  'Data Sync & ETL': ['etl', 'sync', 'database', 'airtable', 'sheets', 'google-sheets'],
  Utility: ['util', 'tool', 'helper'],
  'Social Media': ['social', 'twitter', 'linkedin', 'facebook', 'instagram', 'telegram'],
  'Web Scraping': ['scrape', 'crawl', 'webhook'],
};

function assignCategory(name: string): string {
  if (!name || typeof name !== 'string') {
    return 'Other';
  }
  const lowerName = name.toLowerCase();
  for (const category in categoryKeywords) {
    if (categoryKeywords[category].some((keyword) => lowerName.includes(keyword))) {
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

async function fetchAndProcessWorkflow(file: GithubContent): Promise<N8NWorkflow | null> {
  if (!file.download_url) return null;

  try {
    const response = await fetch(file.download_url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.raw',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch workflow content for ${file.name}:`, response.statusText);
      return null;
    }
    
    const workflowData: N8NWorkflow = await response.json();

    workflowData.id = file.name.replace('.json', '');
    workflowData.complexity = assignComplexity(workflowData.nodes.length);
    workflowData.category = assignCategory(workflowData.name);

    const tags = new Set<string>();
    workflowData.nodes.forEach((node) => {
      const typeParts = node.type.split('.');
      if (typeParts.length > 1) {
        const tag = typeParts[1].replace(/([A-Z])/g, ' $1').trim().split(' ')[0];
        tags.add(tag);
      }
    });
    workflowData.tags = Array.from(tags).slice(0, 3);

    return workflowData;

  } catch (error) {
    console.error(`Error processing workflow file ${file.name}:`, error);
    return null;
  }
}

const fetchAllWorkflows = async (): Promise<N8NWorkflow[]> => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch workflows list from GitHub:', response.status, response.statusText);
      const errorBody = await response.text();
      console.error('GitHub API Response:', errorBody);
      return [];
    }

    const contents: GithubContent[] = await response.json();
    if (!Array.isArray(contents)) {
      console.error('Invalid data received from GitHub API, expected an array of files.');
      return [];
    }

    const workflowFiles = contents.filter((item) => item.type === 'file' && item.name.endsWith('.json'));

    const workflowPromises = workflowFiles.map(fetchAndProcessWorkflow);
    const workflows = (await Promise.all(workflowPromises)).filter((wf): wf is N8NWorkflow => wf !== null);

    return workflows;
  } catch (error) {
    console.error('Error fetching workflows from GitHub:', error);
    return [];
  }
};

export const getWorkflows = cache(
    async () => fetchAllWorkflows(),
    ['all-workflows'],
    { revalidate: 3600 }
);

export const getWorkflow = cache(async (id: string): Promise<N8NWorkflow | null> => {
  const workflows = await getWorkflows();
  return workflows.find((wf) => wf.id === id) || null;
}, ['single-workflow'], { revalidate: 3600 });


export const getWorkflowStats = cache(async (): Promise<WorkflowStats> => {
    const workflows = await getWorkflows();
    const workflowCount = workflows.length;

    if (workflowCount === 0) {
        return { workflowCount: 0, nodeCount: 0, integrationCount: 0 };
    }

    let nodeCount = 0;
    const integrationTypes = new Set<string>();

    workflows.forEach((workflow) => {
        if (workflow && Array.isArray(workflow.nodes)) {
        nodeCount += workflow.nodes.length;
        workflow.nodes.forEach((node) => {
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
}, ['workflow-stats'], { revalidate: 3600 });
