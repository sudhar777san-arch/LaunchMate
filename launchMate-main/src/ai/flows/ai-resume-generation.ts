
'use server';

/**
 * @fileOverview A flow for generating resumes from profile data.
 *
 * - generateResume - A function that generates a resume.
 * - AIResumeGenerationInput - The input type for the generateResume function.
 * - AIResumeGenerationOutput - The return type for the generateResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIResumeGenerationInputSchema = z.object({
  profileData: z
    .string()
    .describe('A JSON string representing the student\'s profile data, including skills, projects, and experience.'),
});
export type AIResumeGenerationInput = z.infer<typeof AIResumeGenerationInputSchema>;

const AIResumeGenerationOutputSchema = z.object({
  resume: z.string().describe('The generated resume in Markdown format.'),
});
export type AIResumeGenerationOutput = z.infer<typeof AIResumeGenerationOutputSchema>;

export async function generateResume(
  input: AIResumeGenerationInput
): Promise<AIResumeGenerationOutput> {
  return aiResumeGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiResumeGenerationPrompt',
  input: {schema: AIResumeGenerationInputSchema},
  output: {schema: AIResumeGenerationOutputSchema},
  prompt: `You are an expert career coach specializing in creating professional resumes for students in the tech industry.

Given the following JSON profile data, create a professional resume in Markdown format.
The resume should be well-structured, use action verbs, and quantify achievements where possible. It must highlight the student's key skills, projects, and experiences in a way that would appeal to recruiters at top tech companies.

**Profile Data:**
\`\`\`json
{{{profileData}}}
\`\`\`

**Resume Guidelines:**
- Start with the name, contact information (if available), and a link to their portfolio/LinkedIn.
- Include a brief, impactful summary.
- List skills prominently.
- Detail experience and projects using the STAR method (Situation, Task, Action, Result) where possible. Use strong action verbs.
- Format for readability and professionalism.
`,
});

const aiResumeGenerationFlow = ai.defineFlow(
  {
    name: 'aiResumeGenerationFlow',
    inputSchema: AIResumeGenerationInputSchema,
    outputSchema: AIResumeGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
