import { StringOutputParser } from "@langchain/core/output_parsers";
import { chapters } from "../context/chapter_array";
import { config } from "../model/config";
import { askQuestion } from "../utils/askQuestion";
import { chatModel, llama3 } from "../utils/chatModel";
import { chainWithHistory } from "../utils/chatWithHistory";
import { chunkText } from "../utils/chunckTranslation";
import { langChainPrompt } from "../utils/langChainPrompt";
import { loadContext } from "../utils/loadContext";
import { saveTextToFile } from "../utils/saveTextToFile";

export const chat = async () => {
	// const userInput = await askQuestion('======You======');
	const context = await loadContext("./context/client.txt");
	const output = await chainWithHistory.invoke({
		input: context
	}, config)
	console.log("======Assistant======", output)
	saveTextToFile(output, "chapter-383.txt")
}


export const chatTranslation = async () => {
	const chaptersPromises = chapters.map(async (text, index) => {
		const output = await chunkTranslationV2(text)
		console.log('chapter', index + 1, "translated")
		return output;
	})
	const chapter_translations = await Promise.all(chaptersPromises)
	chapter_translations.forEach((text) => {
		saveTextToFile(text, "chapters841-860.txt")
	})
}

export const chunkChatTranslation = async () => {
	const chaptersPromises = chapters.map(async (text, index) => {
		const output = await chunkTranslation(text)
		return output;
	})
	const chapter_translations = await Promise.all(chaptersPromises)
	chapter_translations.forEach((text) => {
		saveTextToFile(text, "test.txt")
	})
}

export const chunkTranslation = async (chapter: string) => {
	const chunks = await chunkText(chapter, 100, 0);
	return chunks.reduce((chapter, currentChunk) => {
		langChainPrompt.pipe(llama3).pipe(new StringOutputParser()).invoke({
			input: currentChunk
		}).then(output => {
			console.log(output)
			chapter.concat(output)
		})
		return chapter
	}, '')
}

export const chunkTranslationV2 = async (chapter: string) => {
	const chunks = await chunkText(chapter, 5000, 0);
	const translationChunksPromises = chunks.map(async (chunk) => {
		console.log(chunk)
		return await langChainPrompt.pipe(chatModel).pipe(new StringOutputParser()).invoke({
			input: chunk
		})
	})
	const translatedChapterChunks = await Promise.all(translationChunksPromises);
	return translatedChapterChunks.join("\r\n")
}