const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const getDefaultColor = async () => {
    let color = process.env.DEFAULT_COLOR;
    const filePath = process.env.COLOR_CONFIG_PATH;

    if (filePath) {
        try {
            //const fileContent = fs.readFileSync(path.resolve(filePath), 'utf8').trim();
            const fileContent = (await fsPromises.readFile(path.resolve(filePath), 'utf8')).trim();
                if (fileContent) {
                    color = fileContent;
                }
        } catch (err) {
            console.error(`Error reading color from file: ${err}`);
        }
    }
    return color || 'blue';
}

module.exports = { getDefaultColor };