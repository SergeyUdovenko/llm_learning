import { StringOutputParser } from "@langchain/core/output_parsers";
import { chatModel, llama3 } from "../utils/chatModel";
import { chunkText } from "../utils/chunckTranslation";
import { langChainPrompt, langShortChainPrompt } from "../utils/langChainPrompt";

export const GPTBasedTranslator = async (text: string) => {
	const chunks = await chunkText(text, 5000, 0);
	const translationChunksPromises = chunks.map(async (chunk) => {
		console.log(chunk)
		return await langChainPrompt.pipe(chatModel).pipe(new StringOutputParser()).invoke({
			input: chunk
		})
	})
	const translatedTextChunks = await Promise.all(translationChunksPromises);
	return translatedTextChunks.join("\r\n")
}


export const ollamaBasedTranslator = async (text: string) => {
	const chunks = await chunkText(text, 1000, 0);
	const chapterTranslation = []
	for (let chunk of chunks) {
		const output = await langShortChainPrompt.pipe(llama3).pipe(new StringOutputParser()).invoke({
			input: chunk
		})
		chapterTranslation.push(output)
	}
	return chapterTranslation.join("\r\n")
}