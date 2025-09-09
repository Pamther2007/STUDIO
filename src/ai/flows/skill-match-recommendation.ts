'use server';

/**
 * @fileOverview An AI agent for recommending skill matches based on user profiles and a desired skill.
 *
 * - skillMatchRecommendation - A function that handles the skill match recommendation process.
 * - SkillMatchRecommendationInput - The input type for the skillMatchRecommendation function.
 * - SkillMatchRecommendationOutput - The return type for the skillMatchRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillMatchRecommendationInputSchema = z.object({
  skill: z.string().describe('The skill the user wants to learn.'),
  communityProfiles: z
    .string()
    .describe('A JSON string of all user profiles in the community.'),
});
export type SkillMatchRecommendationInput = z.infer<
  typeof SkillMatchRecommendationInputSchema
>;

const RecommendedUserSchema = z.object({
  name: z.string().describe('The name of the recommended user.'),
  location: z.string().describe('The location of the recommended user.'),
  skillsOffered: z.array(z.string()).describe('The skills offered by the recommended user.'),
  rationale: z
    .string()
    .describe('The rationale for why this user is a good match.'),
});

const SkillMatchRecommendationOutputSchema = z.object({
  recommendedMatches: z
    .array(RecommendedUserSchema)
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
  prompt: `You are an AI assistant designed to recommend skill matches in a community skill exchange platform.

  A user wants to learn the following skill: '{{skill}}'.

  Based on the list of community user profiles provided below, identify users who offer this skill.

  Community Profiles (JSON):
  {{communityProfiles}}

  Analyze the profiles and provide a list of recommended matches. For each match, include a brief, friendly, and encouraging explanation of why they are a good fit. For example, mention their other related skills or simply state they are a great person to learn from.
  `,
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
