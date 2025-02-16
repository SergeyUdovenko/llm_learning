import { chapters } from "../context/chapter_array";
import { config } from "../model/config";
import { chainWithHistory } from "../utils/chatWithHistory";
import { loadContext } from "../utils/loadContext";
import { saveTextToFile } from "../utils/saveTextToFile";
import { GPTBasedTranslator, ollamaBasedTranslator } from "./chapterTranslators";

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
		const output = await GPTBasedTranslator(text)
		console.log('chapter', index + 1, "translated")
		return output;
	})
	const chapter_translations = await Promise.all(chaptersPromises)
	chapter_translations.forEach((text) => {
		saveTextToFile(text, "chapters841-860.txt")
	})
}

export const chunkChaptersTranslation = async () => {
	const chaptersPromises = chapters.map(async (text, index) => {
		const output = await ollamaBasedTranslator(text)
		return output;
	})
	const chapter_translations = await Promise.all(chaptersPromises)
	chapter_translations.forEach((text) => {
		saveTextToFile(text, "test.txt")
	})
}
