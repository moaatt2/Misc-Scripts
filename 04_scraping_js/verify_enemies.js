import { fileURLToPath } from 'url';
import { delimiter, dirname } from 'path';
import path from 'path';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// Find directory of current file
const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);

// Find all enemy files
let filenames = fs.readdirSync(path.join(dir, 'enemies'));

// For each enemy file print out the first line if it is likely invalid
filenames.forEach(file => {
    // Count commas in first line
    let content = fs.readFileSync(path.join(dir, 'enemies', file)).toString();
    let first_line = content.split('\n')[0];
    let comma_count = first_line.split(',').length;

    
    try {
        // parse first line as csv
        let header = parse(first_line, {
            delimiter: ',',
            skip_empty_lines: true,
        });

        let num_cols = header[0].length;

        if (num_cols != 6) {
            // Log file name and number of columns
            console.log(`${file} - ${num_cols}`);

            // Print first line and blank line
            console.log(first_line + '\n');
        }
    } catch (err) {
        // If not 6 columns
        if (comma_count != 6) {
            // Log file name and number of columns
            console.log(`${file} - ${comma_count}`);

            // Print first line and blank line
            console.log(first_line + '\n');
        }
    }

});
