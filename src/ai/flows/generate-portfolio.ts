
'use server';

/**
 * @fileOverview A flow for generating portfolios from profile data.
 *
 * - generatePortfolio - A function that generates a portfolio.
 * - AIPortfolioGenerationInput - The input type for the generatePortfolio function.
 * - AIPortfolioGenerationOutput - The return type for the generatePortfolio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPortfolioGenerationInputSchema = z.object({
  profileData: z
    .string()
    .describe('A JSON string representing the student\'s profile data, including skills, projects, and experience.'),
});
export type AIPortfolioGenerationInput = z.infer<typeof AIPortfolioGenerationInputSchema>;

const AIPortfolioGenerationOutputSchema = z.object({
  portfolio: z.string().describe('The generated portfolio as a single HTML file.'),
});
export type AIPortfolioGenerationOutput = z.infer<typeof AIPortfolioGenerationOutputSchema>;

export async function generatePortfolio(
  input: AIPortfolioGenerationInput
): Promise<AIPortfolioGenerationOutput> {
  return generatePortfolioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePortfolioPrompt',
  input: {schema: AIPortfolioGenerationInputSchema},
  output: {schema: AIPortfolioGenerationOutputSchema},
  prompt: `You are an expert web developer specializing in creating professional portfolios for students in the tech industry.

Given the following JSON profile data, create a single-page portfolio as a complete HTML file.
The portfolio should be modern, clean, and visually appealing. It must be a single, self-contained HTML file using a <style> tag with Tailwind CSS classes (you can assume Tailwind is available via CDN). It should showcase their projects and skills effectively.

**Profile Data:**
\`\`\`json
{{{profileData}}}
\`\`\`

**Portfolio HTML Guidelines:**
- Must be a complete, single HTML file with no external CSS files (except Tailwind CDN).
- Use a modern, dark theme design.
- Use semantic HTML5 tags.
- Include a link to the Tailwind CSS CDN in the <head>.
- Include a hero section with the student's name and a headline.
- Create a section for projects, displaying each with its name, description, and an image (use placeholder images from picsum.photos).
- Create a section listing their key skills.
- Include a brief "About Me" section.
- Add a contact section with links.
- The portfolio should be visually engaging and reflect the student's skills.
`,
});

const generatePortfolioFlow = ai.defineFlow(
  {
    name: 'generatePortfolioFlow',
    inputSchema: AIPortfolioGenerationInputSchema,
    outputSchema: AIPortfolioGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
