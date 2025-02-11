import { chatModel } from "./chatModel";
import { getChain } from "./getChain"
import { langChainPrompt } from "./langChainPrompt";

export const getAIResponse = async (input: string, context?: string) => {
	const chain = getChain(langChainPrompt, chatModel);
	const inputData = { input, context }
	const response = await chain.invoke(inputData);
	console.log("Response with context:", response);
}