import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import AdmZip from 'adm-zip';
import { createExtractorFromFile } from "node-unrar-js";


// Get path to archive file
const filename: string = fileURLToPath(import.meta.url);
const dir: string = dirname(filename);

// Define folder where archives live
const archive_folder = path.join(dir, '..', 'artifacts', 'archives');

// Name of the archive to extract
const archive_file = '[][][][]_-_Eredar-Aquas.zip';

// Split the into name and type
const archive_type = archive_file.split('.').pop() || '';
const archive_name = archive_file.split('.')[0];

// Determine destination
const destination = path.join(archive_folder, archive_name);


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

// Change extract logic based on archive type
if (archive_type == 'zip') {
    console.log('Zip File Detected Extracting');
    
    // Extact archive
    const zip = new AdmZip(path.join(archive_folder, archive_file))
    zip.extractAllTo(destination, true)
    console.log('Zip File Extracted, determining type');

    // Log type of folder to console
    console.log(`Archive contains ${categorizeDirectory(destination)}`);

} else if (archive_type == 'rar') {
    console.log('Rar archive Detected - Extracting');

    // Extract Archive
    const extractor = await createExtractorFromFile({
        filepath: path.join(archive_folder, archive_file),
        targetPath: destination
    });
    [...extractor.extract().files];

    // Log type of folder to console
    console.log(`Archive contains ${categorizeDirectory(destination)}`);

} else {
    console.log('Unknown file type');
}
