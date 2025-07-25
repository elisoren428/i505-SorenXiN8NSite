import type {N8NWorkflow, GithubContent, WorkflowStats} from './types';

const REPO_OWNER = 'elisoren428';
const REPO_NAME = 'n8n-WorkFlow-Directory';
const WORKFLOWS_PATH = 'workflows';
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${WORKFLOWS_PATH}`;

// This is NOT a good practice for production, but is used here to bypass environment loading issues.
const GITHUB_TOKEN = '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';

const GITHUB_HEADERS = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
};

// Moved staticImages here to be used on the server
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
    const workflowId = fileName.replace('.json', '');
    workflowData.id = workflowId;
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
    
    // Deterministically assign image URL on the server
    const hash = workflowId.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const index = Math.abs(hash) % staticImages.length;
    workflowData.imageUrl = staticImages[index];

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
