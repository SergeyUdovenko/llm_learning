import readline from 'readline/promises'

export const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

export const askQuestion = async (question: string) => {
	return await rl.question(question)
}