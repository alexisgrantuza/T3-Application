import OpenAI from "openai";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

const client = new OpenAI({
  baseURL: endpoint,
  apiKey: token,
});

export async function generateFlashcards(text: string): Promise<Flashcard[]> {
  const prompt = `
    Generate flashcards from the following text. Create comprehensive questions and answers that test understanding of the key concepts.
    
    Format the response as a JSON array with objects containing:
    - question: string
    - answer: string  
    - difficulty: "easy" | "medium" | "hard"
    
    Respond with valid JSON in this format:
    {
      "flashcards": [
        {
          "question": "Sample question?",
          "answer": "Sample answer",
          "difficulty": "medium"
        }
      ]
    }
    
    Text: ${text}
  `;

  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that creates educational flashcards. Always respond with valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      top_p: 1.0,
      model: model,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from AI");
    }

    const result = JSON.parse(content) as FlashcardResponse;
    return result.flashcards ?? [];
  } catch (error) {
    console.error("Error generating flashcards:", error);
    throw new Error("Failed to generate flashcards");
  }
}
