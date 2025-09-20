import { streamText } from 'ai';
import { openai } from '@/echo';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const {
      model,
      messages,
    } = await req.json();

    // Validate required parameters
    if (!model) {
      return new Response(
        JSON.stringify({
          error: 'Bad Request',
          message: 'Model parameter is required',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          error: 'Bad Request',
          message: 'Messages parameter is required and must be an array',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const result = streamText({
      model: openai(model),
      system: 'You are a helpful barkeep and mixologist. Your job is to suggest drink recipes, cocktail alterations, and give advice to aspiring mixologists. You have extensive knowledge of spirits, liqueurs, bitters, garnishes, and classic cocktail techniques. You can help with everything from basic drink recipes to advanced mixology techniques, ingredient substitutions, and pairing suggestions. Always be friendly, knowledgeable, and encouraging to those learning the craft.',
      messages,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to process chat request',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
