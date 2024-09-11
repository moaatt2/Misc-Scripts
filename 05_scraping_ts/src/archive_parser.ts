import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import AdmZip from 'adm-zip';
import { createExtractorFromFile } from "node-unrar-js";

// Find and record current directory
const filename: string = fileURLToPath(import.meta.url);
const dir: string = dirname(filename);

// Create path to archive file
const archive_folder = path.join(dir, '..', 'artifacts', 'archives');

// Get array of names of items in archive file
const archives = fs.readdirSync(archive_folder);

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


for (let archive of archives) {

    // Get info on the item
    let extension = archive.split('.').pop() ?? '';
    let periods = archive.split('.').length - 1;
    let archive_name = archive.split('.')[0];
    let item_path = path.join(archive_folder, archive);
    let destination = path.join(archive_folder, archive_name);

    // Get more detailed type
    if (fs.lstatSync(item_path).isDirectory()) {
        console.log(`${archive} - Directory - Passing`);

    } else if (extension == 'zip') {
        console.log(`${archive} - Zip Archive\n\tAttempting Extraction`);

        try {
            // Extracting Archive
            let zip = new AdmZip(item_path);
            zip.extractAllTo(destination, true);
            console.log('\tZip Archive Extracted\n\tDetermining Type');

            // Log archive type to console
            console.log(`\tArchive contains ${categorizeDirectory(destination)}`);
        } catch (err) {
            console.log('\tEncountered Error Process Halting');
        }

    } else if ((extension == 'rar') && (periods == 2)) {
        console.log(`${archive} - Multipart RAR Archive - Passing`);

    } else if ((extension == 'rar') && (periods == 1)) {
        console.log(`${archive} - RAR Archive\n\tAttempting Extraction`);

        try {
            // Extract Archive
            const extractor = await createExtractorFromFile({
                filepath: item_path,
                targetPath: destination
            });
            [...extractor.extract().files];

            // Log archive type to console
            console.log(`\tArchive contains ${categorizeDirectory(destination)}`);
        } catch (err) {
            console.log('\tEncountered Error Process Halting');
        }

    } else {
        console.log(`${archive} - Unknown Type - Passing`);
    }
}
