import Color = require('color');
import colors = require('./colors.json');

const colorRegex = /(?:Known)?Color\s*\.\s*(\s*[a-zA-Z]+\s*)/g;

export async function findColor(text) {
    let match = colorRegex.exec(text);
    let result = [];

    while (match != null) {
        const matchedColor = match[1];
        const start = match.index + (match[0].length - matchedColor.length);
        const end = colorRegex.lastIndex;
        const hex = colors[matchedColor];
        if (hex) {
            try {
                const color = Color(hex).rgb().string();
                result.push({ start, end, color });
            }
            catch { }
        }
        match = colorRegex.exec(text);
    }
    return result;
}
