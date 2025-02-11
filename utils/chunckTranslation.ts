import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const chunkText = async (
	text: string,
	chunkSize: number = 1000,
	chunkOverlap: number = 200
): Promise<string[]> => {
	const splitter = new RecursiveCharacterTextSplitter({
		chunkSize: chunkSize,
		chunkOverlap: chunkOverlap,
		separators: ["。  "]
	});

	// Split the text into chunks
	const chunks = await splitter.splitText(text);

	return chunks;
}

