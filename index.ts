import { chat, chatTranslation, chunkChatTranslation } from "./controller/chat";
import { rl } from "./utils/askQuestion";

chunkChatTranslation().catch((error) => {
	console.error("An error occurred:", error);
}).finally(() => {
	rl.close();
});

