import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';

// Settings
const only_failures = false;

// Find and record current directory
const filename: string = fileURLToPath(import.meta.url);
const dir: string = dirname(filename);

// Create path to enemy folder
const enemy_folder = path.join(dir, '..', 'artifacts', 'enemies');

// Get array of names of enemy files
const enemies = fs.readdirSync(enemy_folder);

// Itterate over each enemy and print number of columns
enemies.forEach(enemy => {
    // Get first line of file content
    let enemy_path = path.join(enemy_folder, enemy);
    let file_content = fs.readFileSync(enemy_path).toString();
    let first_line = file_content.split('\n')[0] ?? '';

    // Create variables to record number of variables
    let num_cols;
    let method_text = '';

    // Try to parse the first line as csv
    try {
        let data = parse(first_line, {
            delimiter: ",",
            skipEmptyLines: true,
        });

        // Get number of columns in the header
        num_cols = data[0].length;

        // Print information to console
        // console.log(`${enemy} - ${num_cols} cols`);

    // If that fails count the number of commas as a backup
    } catch (err) {
        let num_cols = first_line.split(',').length;
        method_text = " comma fallback used -"
        // console.log(`${enemy} - ${comma_count} columns - Using Split by ',' fallback`);
    }

    // Log file to console based on settings
    if (only_failures && (num_cols != 6)) {
        console.log(`${num_cols} columns -${method_text} ${enemy}`);
    } else if (only_failures && (num_cols == 6)) {
        // Do nothing in this case
    } else {
        console.log(`${num_cols} columns -${method_text} ${enemy}`);
    }
});

