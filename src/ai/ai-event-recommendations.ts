// This is a server-side file that should not be exposed to the client.
'use server';

/**
 * @fileOverview Provides AI-powered event recommendations based on user location and interests.
 *
 * @exports getEventRecommendations - Function to retrieve AI-powered event recommendations.
 * @exports EventRecommendationsInput - The input type for the getEventRecommendations function.
 * @exports EventRecommendationsOutput - The output type for the getEventRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EventRecommendationsInputSchema = z.object({
  location: z.string().describe('The location for which to find events.'),
  interests: z.string().describe('The user\u2019s interests, comma separated.'),
});
export type EventRecommendationsInput = z.infer<typeof EventRecommendationsInputSchema>;

const EventRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of event recommendations based on the user\u2019s location and interests.'),
});
export type EventRecommendationsOutput = z.infer<typeof EventRecommendationsOutputSchema>;

export async function getEventRecommendations(input: EventRecommendationsInput): Promise<EventRecommendationsOutput> {
  return eventRecommendationsFlow(input);
}

const eventRecommendationsPrompt = ai.definePrompt({
  name: 'eventRecommendationsPrompt',
  input: {schema: EventRecommendationsInputSchema},
  output: {schema: EventRecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides event recommendations based on a user's location and interests.

  Location: {{{location}}}
  Interests: {{{interests}}}

  Provide a list of event recommendations that are relevant to the user's location and interests.  The events should be tailored for young people and students.
  Return only the names of the events in an array.`,
});

const eventRecommendationsFlow = ai.defineFlow(
  {
    name: 'eventRecommendationsFlow',
    inputSchema: EventRecommendationsInputSchema,
    outputSchema: EventRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await eventRecommendationsPrompt(input);
    return output!;
  }
);
