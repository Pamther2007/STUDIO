'use server';

/**
 * @fileOverview An AI agent for recommending skill matches based on user profiles and community demand.
 *
 * - skillMatchRecommendation - A function that handles the skill match recommendation process.
 * - SkillMatchRecommendationInput - The input type for the skillMatchRecommendation function.
 * - SkillMatchRecommendationOutput - The return type for the skillMatchRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillMatchRecommendationInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The user profile including skills offered, skills wanted, location, and points.'),
  communityDemand: z
    .string()
    .describe('Information about the current demand for different skills in the community.'),
});
export type SkillMatchRecommendationInput = z.infer<
  typeof SkillMatchRecommendationInputSchema
>;

const SkillMatchRecommendationOutputSchema = z.object({
  recommendedMatches: z
    .string()
    .describe(
      'A list of recommended skill matches, including the user profiles of potential partners and the rationale for the match.'
    ),
});
export type SkillMatchRecommendationOutput = z.infer<
  typeof SkillMatchRecommendationOutputSchema
>;

export async function skillMatchRecommendation(
  input: SkillMatchRecommendationInput
): Promise<SkillMatchRecommendationOutput> {
  return skillMatchRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillMatchRecommendationPrompt',
  input: {schema: SkillMatchRecommendationInputSchema},
  output: {schema: SkillMatchRecommendationOutputSchema},
  prompt: `You are an AI assistant designed to recommend skill matches between users in a community skill exchange platform.

  Based on the user's profile and the current community demand, identify the most optimal skill exchange partners for the user.

  User Profile:
  {{userProfile}}

  Community Demand:
  {{communityDemand}}

  Provide a list of recommended matches, including the user profiles of potential partners and a brief explanation of why each match is recommended.
  Format the output as a JSON array of objects with 'userProfile' and 'rationale' fields.
  `, // Ensure correct Handlebars syntax
});

const skillMatchRecommendationFlow = ai.defineFlow(
  {
    name: 'skillMatchRecommendationFlow',
    inputSchema: SkillMatchRecommendationInputSchema,
    outputSchema: SkillMatchRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
