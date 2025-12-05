// src/ai/flows/ai-mentor-guidance.ts
'use server';

/**
 * @fileOverview Provides AI mentorship for students on career paths and project ideas.
 *
 * - getAIMentorGuidance - A function that provides career and project guidance to students.
 * - AIMentorGuidanceInput - The input type for the getAIMentorGuidance function.
 * - AIMentorGuidanceOutput - The return type for the getAIMentorGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIMentorGuidanceInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The chat history between the user and the assistant.'),
  query: z
    .string()
    .describe(
      'The question or request from the student seeking career path or project guidance.'
    ),
});
export type AIMentorGuidanceInput = z.infer<typeof AIMentorGuidanceInputSchema>;

const AIMentorGuidanceOutputSchema = z.object({
  guidance: z.string().describe('The AI mentor bot response to the student.'),
});
export type AIMentorGuidanceOutput = z.infer<typeof AIMentorGuidanceOutputSchema>;

export async function getAIMentorGuidance(input: AIMentorGuidanceInput): Promise<AIMentorGuidanceOutput> {
  if (!process.env.GOOGLE_GENAI_API_KEY) {
    throw new Error('Google AI API key is not configured. Please set GOOGLE_GENAI_API_KEY in your environment variables.');
  }
  return aiMentorGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMentorGuidancePrompt',
  input: {schema: AIMentorGuidanceInputSchema},
  output: {schema: AIMentorGuidanceOutputSchema},
  prompt: `You are an AI mentor bot providing career path and project guidance to students. Your persona should be encouraging, supportive, and knowledgeable.
  
  {{#if history}}
  This is the conversation history so far:
  {{#each history}}
  {{role}}: {{content}}
  {{/each}}
  {{/if}}

  The student's latest message is:
  "{{{query}}}"

  Based on the entire conversation, provide a helpful and personalized response. Be concise but thorough.
  `,
});

const aiMentorGuidanceFlow = ai.defineFlow(
  {
    name: 'aiMentorGuidanceFlow',
    inputSchema: AIMentorGuidanceInputSchema,
    outputSchema: AIMentorGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
