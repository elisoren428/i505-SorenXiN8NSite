'use server';

import { autoFixWorkflowStep } from '@/ai/flows/auto-fix-workflow-step';
import { suggestWorkflowImprovements } from '@/ai/flows/suggest-workflow-improvements';

export async function handleSuggestImprovements(workflowJson: string) {
  const result = await suggestWorkflowImprovements({ workflowJson });
  return result;
}

export async function handleAutoFix(workflowJson: string, stepName: string) {
  const result = await autoFixWorkflowStep({ workflowJson, stepName });
  return result;
}
