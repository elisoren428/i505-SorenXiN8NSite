// This file is used to automatically fix a step in a workflow using AI-generated suggestions.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * @fileOverview An AI agent for automatically fixing workflow steps.
 *
 * - autoFixWorkflowStep - A function that handles the auto-fixing process.
 * - AutoFixWorkflowStepInput - The input type for the autoFixWorkflowStep function.
 * - AutoFixWorkflowStepOutput - The return type for the autoFixWorkflowStep function.
 */

const AutoFixWorkflowStepInputSchema = z.object({
  workflowJson: z.string().describe('The JSON representation of the n8n workflow.'),
  stepName: z.string().describe('The name of the workflow step to fix.'),
});
export type AutoFixWorkflowStepInput = z.infer<typeof AutoFixWorkflowStepInputSchema>;

const AutoFixWorkflowStepOutputSchema = z.object({
  fixedWorkflowJson: z.string().describe('The JSON representation of the workflow with the specified step automatically fixed.'),
});
export type AutoFixWorkflowStepOutput = z.infer<typeof AutoFixWorkflowStepOutputSchema>;

export async function autoFixWorkflowStep(input: AutoFixWorkflowStepInput): Promise<AutoFixWorkflowStepOutput> {
  return autoFixWorkflowStepFlow(input);
}

const autoFixWorkflowStepPrompt = ai.definePrompt({
  name: 'autoFixWorkflowStepPrompt',
  input: {schema: AutoFixWorkflowStepInputSchema},
  output: {schema: AutoFixWorkflowStepOutputSchema},
  prompt: `You are an AI expert in n8n workflows.  Given the workflow JSON and the name of a step, you will automatically fix and improve the step in the workflow.  Return the entire updated workflow JSON.

Workflow JSON: {{{workflowJson}}}

Step Name: {{{stepName}}}

Return the entire, updated workflow JSON:
`,
});

const autoFixWorkflowStepFlow = ai.defineFlow(
  {
    name: 'autoFixWorkflowStepFlow',
    inputSchema: AutoFixWorkflowStepInputSchema,
    outputSchema: AutoFixWorkflowStepOutputSchema,
  },
  async input => {
    const {output} = await autoFixWorkflowStepPrompt(input);
    return output!;
  }
);
