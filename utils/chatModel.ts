import { ChatOpenAI } from "@langchain/openai";
import { Ollama } from "@langchain/ollama";

export const chatModel = new ChatOpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	model: "gpt-4o-mini",
	temperature: 0.7,
});

export const llama3 = new Ollama({
	model: "llama3",
	temperature: 0.3,
})
