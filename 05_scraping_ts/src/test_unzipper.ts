import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import AdmZip from 'adm-zip';

// Get path to archive file
const filename: string = fileURLToPath(import.meta.url);
const dir: string = dirname(filename);

// Test archive to extract
const archive = path.join(dir, '..', 'artifacts', 'archives', '[][][][]_-_Eredar-Aquas.zip');

// Where to store archive
const destination = path.join(dir, '..', 'artifacts', 'archives', '[][][][]_-_Eredar-Aquas');

// Load the zip file
const zip = new AdmZip(archive);

// Extract the files to the path
zip.extractAllTo(destination, true);


// Define a function to get all extensions of files in a folder and its subdirectories
function getAllExtensions(dirPath: string): Set<string> {
    // Create a set to contain extensions
    let extensions = new Set<string>();

    // Get all items in the destination directory and itterate over them
    const items = fs.readdirSync(dirPath, {withFileTypes: true});
    for (const item of items) {

        // If it is a folder run recursively otherwise add the extension to the list of extensions
        if (item.isDirectory()) {
            const subDirExtensions = getAllExtensions(path.join(dirPath, item.name));
            extensions = new Set([...extensions, ...subDirExtensions]);
        } else {
            let extension = item.name.split('.').pop() ?? '';
            extensions.add(extension);
        }
    }

    // return the set of extensions
    return extensions;
}


// Define a function to determine the type of 
function categorizeDirectory(dirPath: string) {

    // Get extensions of files in extracted archive
    let extensions = getAllExtensions(dirPath);

    if (extensions.has('ftd') || extensions.has('ftb')) {
        return 'try';
    } else if (extensions.has('fpl')) {
        return 'ship';
    } else if (extensions.has('fed')) {
        return 'enemy';
    } else {
        return 'unknown';
    }
}


// Determine type of archive
console.log(categorizeDirectory(destination));
