'use server';

/**
 * @fileOverview A flow that generates a preview image for an n8n workflow.
 *
 * - generateWorkflowImage - A function that takes workflow metadata and returns an image.
 * - GenerateWorkflowImageInput - The input type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateWorkflowImageInputSchema = z.object({
  name: z.string().describe('The name of the workflow.'),
  category: z.string().describe('The category of the workflow (e.g., AI, CRM, Marketing).'),
  complexity: z.string().describe('The complexity of the workflow (e.g., Beginner, Intermediate, Advanced).'),
});
export type GenerateWorkflowImageInput = z.infer<typeof GenerateWorkflowImageInputSchema>;


export async function generateWorkflowImage(input: GenerateWorkflowImageInput): Promise<string> {
  try {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a visually appealing 300x160 preview image for an n8n workflow card. The image should be abstract and conceptual, representing the workflow's purpose.

      **Workflow Details:**
      - **Name:** "${input.name}"
      - **Category:** ${input.category}
      - **Complexity:** ${input.complexity}

      **Style Guidelines:**
      - **Background:** Use a charcoal black base (#222222) with soft, radial glowing gradients in orange and purple hues. The overall mood should be dark, modern, and tech-focused.
      - **Main Visual:** Create a central, abstract visual element related to the **Category**.
          - For 'AI', think glowing neural networks or abstract data patterns.
          - For 'Marketing', visualize concepts like funnels, charts, or user engagement icons.
          - For 'DevOps', use imagery related to code, pipelines, or servers.
          - For 'Data Sync & ETL', show abstract data flows, connections, or database symbols.
      - **Complexity Indicator:** Subtly incorporate the **Complexity** level.
          - 'Beginner': Use simpler shapes, clean lines, and a calmer glow (e.g., soft green or blue).
          - 'Intermediate': Introduce more complex patterns and a more vibrant glow (e.g., yellow or orange).
          - 'Advanced': Use intricate, multi-layered visuals with a powerful, intense glow (e.g., deep purple or electric red).
      - **Composition:** The image should be well-balanced, not overly cluttered. It's a background visual for a card, so it shouldn't be too busy. No text.
      `,
      config: {
          responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    
    if (!media?.url) {
      throw new Error("Image generation returned no media.");
    }
    
    return media.url;

  } catch (error) {
    console.warn(`AI image generation failed for workflow "${input.name}". Falling back to placeholder.`);
    // Fallback to a branded placeholder if generation fails
    return `https://placehold.co/300x160/222222/FFFFFF.png?text=SorenXi+Workflow`;
  }
}
