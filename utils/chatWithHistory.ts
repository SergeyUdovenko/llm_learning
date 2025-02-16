import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { chatModel } from "./chatModel";
import { langChainPrompt } from "./langChainPrompt";


const messageHistory = new ChatMessageHistory()

export const chainWithHistory = new RunnableWithMessageHistory({
	runnable: langChainPrompt.pipe(chatModel).pipe(new StringOutputParser()),
	inputMessagesKey: 'input',
	historyMessagesKey: 'history',
	getMessageHistory: (_sessionId) => messageHistory,
})
