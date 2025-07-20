import type {N8NWorkflow, GithubContent, WorkflowStats} from './types';
import {env} from './env';

const REPO_OWNER = 'elisoren428';
const REPO_NAME = 'n8n-WorkFlow-Directory';
const WORKFLOWS_PATH = 'workflows';
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${WORKFLOWS_PATH}`;

const githubHeaders = {
  Authorization: `token ${env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
};

function assignCategory(name: string): string {
  const categoryKeywords: {[key: string]: string[]} = {
    AI: ['ai', 'openai', 'gemini', 'dall-e', 'llm'],
    CRM: ['crm', 'salesforce', 'hubspot', 'contact'],
    Marketing: ['marketing', 'seo', 'ad'],
    DevOps: ['devops', 'git', 'docker', 'deploy'],
    'Data Sync & ETL': [
      'etl',
      'sync',
      'database',
      'airtable',
      'sheets',
      'google-sheets',
    ],
    Utility: ['util', 'tool', 'helper'],
    'Social Media': [
      'social',
      'twitter',
      'linkedin',
      'facebook',
      'instagram',
      'telegram',
    ],
    'Web Scraping': ['scrape', 'crawl', 'webhook'],
  };
  if (!name || typeof name !== 'string') {
    return 'Other';
  }
  const lowerName = name.toLowerCase();
  for (const category in categoryKeywords) {
    if (
      categoryKeywords[category].some(keyword => lowerName.includes(keyword))
    ) {
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

async function fetchJson<T>(url: string, tags: string[] = []): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: githubHeaders,
      next: {tags},
    });
    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

export async function getWorkflow(id: string): Promise<N8NWorkflow | null> {
  const fileContent = await fetchJson<GithubContent>(`${API_URL}/${id}.json`, [
    `workflow:${id}`,
  ]);

  if (!fileContent || !fileContent.download_url) {
    return null;
  }

  const workflowData = await fetchJson<N8NWorkflow>(fileContent.download_url, [
    `workflow:${id}`,
  ]);

  if (!workflowData) {
    return null;
  }

  workflowData.id = fileContent.name.replace('.json', '');
  workflowData.complexity = assignComplexity(workflowData.nodes.length);
  workflowData.category = assignCategory(workflowData.name);

  const tags = new Set<string>();
  workflowData.nodes.forEach(node => {
    const typeParts = node.type.split('.');
    if (typeParts.length > 1) {
      const tag = typeParts[1].replace(/([A-Z])/g, ' $1').trim().split(' ')[0];
      tags.add(tag);
    }
  });
  workflowData.tags = Array.from(tags).slice(0, 3);

  return workflowData;
}

export async function getWorkflows(): Promise<N8NWorkflow[]> {
  const files = await fetchJson<GithubContent[]>(API_URL, ['workflows']);

  if (!files || !Array.isArray(files)) {
    return [];
  }

  const workflowFiles = files.filter(
    item => item.type === 'file' && item.name.endsWith('.json')
  );

  const workflowPromises = workflowFiles.map(file =>
    getWorkflow(file.name.replace('.json', ''))
  );

  const workflows = (await Promise.all(workflowPromises)).filter(
    (wf): wf is N8NWorkflow => wf !== null
  );

  return workflows;
}

export async function getWorkflowStats(): Promise<WorkflowStats> {
  const workflows = await getWorkflows();
  const workflowCount = workflows.length;

  if (workflowCount === 0) {
    return {workflowCount: 0, nodeCount: 0, integrationCount: 0};
  }

  let nodeCount = 0;
  const integrationTypes = new Set<string>();

  workflows.forEach(workflow => {
    if (workflow && Array.isArray(workflow.nodes)) {
      nodeCount += workflow.nodes.length;
      workflow.nodes.forEach(node => {
        if (node.type.startsWith('n8n-nodes-base.')) return;
        const integrationName = node.type
          .replace(/^n8n-nodes-/, '')
          .split('.')[0];
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
