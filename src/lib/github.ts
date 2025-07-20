import type {N8NWorkflow, GithubContent, WorkflowStats} from './types';
import {env} from './env';

const REPO_OWNER = 'elisoren428';
const REPO_NAME = 'n8n-WorkFlow-Directory';
const WORKFLOWS_PATH = 'workflows';
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${WORKFLOWS_PATH}`;

const GITHUB_HEADERS = {
  Authorization: `token ${env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
};

function assignCategory(name: string): string {
  const lowerName = (name || '').toLowerCase();
  const categoryKeywords: {[key: string]: string[]} = {
    AI: ['ai', 'openai', 'gemini', 'dall-e', 'llm', 'anthropic'],
    CRM: ['crm', 'salesforce', 'hubspot', 'contact'],
    Marketing: ['marketing', 'seo', 'ad', 'mailchimp', 'sendgrid'],
    DevOps: ['devops', 'git', 'docker', 'deploy', 'kubernetes', 'github'],
    'Data Sync & ETL': [
      'etl',
      'sync',
      'database',
      'airtable',
      'sheets',
      'google-sheets',
      'postgres',
      'mysql',
    ],
    Utility: ['util', 'tool', 'helper', 'schedule'],
    'Social Media': [
      'social',
      'twitter',
      'linkedin',
      'facebook',
      'instagram',
      'telegram',
      'discord',
    ],
    'Web Scraping': ['scrape', 'crawl', 'webhook', 'http'],
  };
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

function processWorkflow(workflowData: N8NWorkflow, fileName: string): N8NWorkflow {
    workflowData.id = fileName.replace('.json', '');
    workflowData.complexity = assignComplexity(workflowData.nodes.length);
    workflowData.category = assignCategory(workflowData.name);

    const tags = new Set<string>();
    workflowData.nodes.forEach(node => {
        if (node.type.startsWith('n8n-nodes-base.')) return;
        const typeParts = node.type.split('.');
        if (typeParts.length > 0) {
            const tagName = typeParts[0].replace(/([A-Z])/g, ' $1').trim().split(' ')[0];
            tags.add(tagName);
        }
    });
    workflowData.tags = Array.from(tags).slice(0, 3);
    return workflowData;
}


async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { headers: GITHUB_HEADERS });
    if (!response.ok) {
      console.error(`API Error for ${url}: ${response.status} ${response.statusText}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Network error fetching ${url}:`, error);
    return null;
  }
}

export async function getWorkflow(id: string): Promise<N8NWorkflow | null> {
    const fileContent = await fetchJson<GithubContent>(`${API_URL}/${id}.json`);
    if (!fileContent || !fileContent.download_url) {
        return null;
    }
    const workflowData = await fetchJson<N8NWorkflow>(fileContent.download_url);
    if (!workflowData) {
        return null;
    }
    return processWorkflow(workflowData, fileContent.name);
}

export async function getWorkflows(): Promise<N8NWorkflow[]> {
  const allWorkflows: N8NWorkflow[] = [];
  const files = await fetchJson<GithubContent[]>(API_URL);

  if (!files || !Array.isArray(files)) {
    console.error('Failed to fetch workflow directory or directory is not an array.');
    return [];
  }

  const workflowFiles = files.filter(
    item => item.type === 'file' && item.name.endsWith('.json') && item.download_url
  );

  // Process files in batches to avoid overwhelming the server
  const BATCH_SIZE = 10;
  for (let i = 0; i < workflowFiles.length; i += BATCH_SIZE) {
    const batch = workflowFiles.slice(i, i + BATCH_SIZE);
    const batchPromises = batch.map(async (file) => {
        if (!file.download_url) return null;
        try {
            const workflowData = await fetchJson<N8NWorkflow>(file.download_url);
            if (workflowData) {
                return processWorkflow(workflowData, file.name);
            }
            return null;
        } catch (error) {
            console.error(`Failed to process workflow ${file.name}:`, error);
            return null;
        }
    });

    const batchResults = await Promise.all(batchPromises);
    const successfulWorkflows = batchResults.filter((wf): wf is N8NWorkflow => wf !== null);
    allWorkflows.push(...successfulWorkflows);
  }
  
  return allWorkflows;
}


export async function getWorkflowStats(): Promise<WorkflowStats> {
  // This function now depends on getWorkflows completing successfully.
  // We'll keep it simple to reduce points of failure.
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
