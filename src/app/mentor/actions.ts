"use server";

import { getAIMentorGuidance, AIMentorGuidanceInput } from "@/ai/flows/ai-mentor-guidance";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function getAIMentorResponse(
  prevState: { messages: Message[], error: string | null },
  formData: FormData
) {
  const query = formData.get("query") as string;
  const historyString = formData.get("history") as string;
  let history: Message[] = [];

  try {
    history = historyString ? JSON.parse(historyString) : [];
  } catch(e) {
    console.error("Failed to parse history", e);
    return {
      messages: [],
      error: "Failed to parse conversation history.",
    };
  }

  if (!query) {
    return {
      messages: history,
      error: "Please provide a query.",
    };
  }

  const newHistory: Message[] = [...history, { role: "user", content: query }];

  try {
    // The history for the AI should not include the very first welcome message.
    const aiHistory = history.filter(msg => msg.role !== 'assistant' || msg.content !== "Hello! I'm your personal AI Mentor. How can I help you with your career, projects, or startup ideas today?");

    const input: AIMentorGuidanceInput = { 
      query,
      history: aiHistory.map(m => ({role: m.role, content: m.content})) // Ensure we only pass expected fields
    };
    
    const response = await getAIMentorGuidance(input);
    
    const updatedHistory = [...newHistory, { role: "assistant" as const, content: response.guidance }];

    return {
      messages: updatedHistory,
      error: null,
    };
  } catch (error) {
    console.error(error);
    let errorMessage = "Sorry, I encountered an error. Please try again.";
    
    if (error instanceof Error && error.message.includes('API key')) {
      errorMessage = "AI mentor is not configured. Please contact the administrator to set up the Google AI API key.";
    }
    
    const updatedHistory = [...newHistory, { role: "assistant" as const, content: errorMessage }];
    return {
      messages: updatedHistory,
      error: errorMessage,
    };
  }
}
