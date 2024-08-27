import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';

// Find directory of current file
const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);

// Find all enemy files
let filenames = fs.readdirSync(path.join(dir, 'enemies'));

// For each enemy file print out the first line if it is likely invalid
filenames.forEach(file => {
    let content = fs.readFileSync(path.join(dir, 'enemies', file)).toString();
    let first_line = content.split('\n')[0];
    let comma_count = first_line.split(',').length - 1;

    if (comma_count != 5) {
        console.log(`${file} - ${comma_count}`);

        console.log(first_line);

        console.log();

    }

});
