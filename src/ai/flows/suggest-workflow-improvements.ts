'use server';

/**
 * @fileOverview A flow that suggests improvements to a given n8n workflow JSON.
 *
 * - suggestWorkflowImprovements - A function that takes an n8n workflow JSON as input and returns suggestions for improvements.
 * - SuggestWorkflowImprovementsInput - The input type for the suggestWorkflowImprovements function.
 * - SuggestWorkflowImprovementsOutput - The return type for the suggestWorkflowImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestWorkflowImprovementsInputSchema = z.object({
  workflowJson: z
    .string()
    .describe('The JSON representation of the n8n workflow to improve.'),
});
export type SuggestWorkflowImprovementsInput = z.infer<
  typeof SuggestWorkflowImprovementsInputSchema
>;

const SuggestWorkflowImprovementsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A list of suggestions for improving the n8n workflow.'),
});
export type SuggestWorkflowImprovementsOutput = z.infer<
  typeof SuggestWorkflowImprovementsOutputSchema
>;

export async function suggestWorkflowImprovements(
  input: SuggestWorkflowImprovementsInput
): Promise<SuggestWorkflowImprovementsOutput> {
  return suggestWorkflowImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestWorkflowImprovementsPrompt',
  input: {schema: SuggestWorkflowImprovementsInputSchema},
  output: {schema: SuggestWorkflowImprovementsOutputSchema},
  prompt: `You are an AI expert in optimizing n8n workflows. Analyze the provided n8n workflow JSON and suggest improvements to enhance its efficiency, reliability, and maintainability.

Workflow JSON:
{{{workflowJson}}}

Suggestions:`,
});

const suggestWorkflowImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestWorkflowImprovementsFlow',
    inputSchema: SuggestWorkflowImprovementsInputSchema,
    outputSchema: SuggestWorkflowImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
