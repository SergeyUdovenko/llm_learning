import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

export const getChain = (promptTemplate: ChatPromptTemplate, chatModel: ChatOpenAI) => RunnableSequence.from([
	promptTemplate,
	chatModel,
	new StringOutputParser()
])