import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';

// Find and record current directory
const filename: string = fileURLToPath(import.meta.url);
const dir: string = dirname(filename);

// Create path to archive file
const archive_folder = path.join(dir, '..', 'artifacts', 'archives_test');

// Get array of names of items in archive file
const archives = fs.readdirSync(archive_folder);

// Itterate over each item and print out type + name
archives.forEach(archive => {

    // Get info on the item
    let extension = archive.split('.').pop() ?? '';
    let periods = archive.split('.').length - 1;
    let item_path = path.join(archive_folder, archive);
    fs.lstatSync(item_path).isDirectory();

    // Get more detailed type
    let type;
    if (fs.lstatSync(item_path).isDirectory()) {
        type = 'directory'
    } else if (extension == 'zip') {
        type = 'zip archive';
    } else if ((extension == 'rar') && (periods == 2)) {
        type = 'rar multipart archive';
    } else if ((extension == 'rar') && (periods == 1)) {
        type = 'rar archive'
    } else {
        type = 'unexpected file type'
    }

    // Print type of file
    console.log(`${type} - ${archive}`);
});

