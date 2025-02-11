import * as fs from 'fs';
import * as path from 'path';

export const saveTextToFile = (text: string, filename: string) => {
	const filePath = path.join("chapters", filename);
	try {
		fs.appendFileSync(filePath, `\n\n ${text}`, 'utf-8');
		console.log(text.trim().slice(text.indexOf("Chapter"), text.indexOf(":")), "saved")
	} catch (err) {
		console.error(err)
	}
};