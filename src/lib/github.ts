
import type {N8NWorkflow, GithubContent, WorkflowStats} from './types';
import { fetchJson, processWorkflow, getWorkflows as getWorkflowsFromEnv } from './env';

const API_URL = `https://api.github.com/repos/elisoren428/n8n-WorkFlow-Directory/contents/workflows`;

export async function getWorkflow(id: string): Promise<N8NWorkflow | null> {
    const fileContent = await fetchJson<GithubContent>(`${API_URL}/${id}.json`);
    if (!fileContent || !fileContent.download_url) {
        return null;
    }
    const workflowData = await fetchJson<N8NWorkflow>(fileContent.download_url);
    if (!workflowData) {
        return null;
    }
    return processWorkflow(workflowData, fileContent);
}

export async function getWorkflows(): Promise<N8NWorkflow[]> {
  return getWorkflowsFromEnv();
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
