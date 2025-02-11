import { TextLoader } from "langchain/document_loaders/fs/text";

export const loadContext = async (filePath: string) => {
	const loader = new TextLoader(filePath);
	const documents = await loader.load();
	const textContentArray = documents.map(document => document.pageContent);
	return textContentArray.join('\n');
}