import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { langChainPrompt } from "./langChainPrompt";
import { chatModel, llama3 } from "./chatModel";
import { StringOutputParser } from "@langchain/core/output_parsers";


const messageHistory = new ChatMessageHistory()

export const chainWithHistory = new RunnableWithMessageHistory({
	runnable: langChainPrompt.pipe(chatModel).pipe(new StringOutputParser()),
	inputMessagesKey: 'input',
	historyMessagesKey: 'history',
	getMessageHistory: (_sessionId) => messageHistory,
})
