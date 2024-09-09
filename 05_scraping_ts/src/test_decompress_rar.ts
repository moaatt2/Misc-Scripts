import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { createExtractorFromFile } from "node-unrar-js";

// Get location of current file
const filename: string = fileURLToPath(import.meta.url);
const dir: string = dirname(filename);

// Test archive to extract
const archive_path = path.join(dir, '..', 'artifacts', 'archives', '[][][][]_-_Eredar-Entry.rar');

// Where to store archive
const destination = path.join(dir, '..', 'artifacts', 'archives', '[][][][]_-_Eredar-Entry');

// Create extractor
const extractor = await createExtractorFromFile({
    filepath: archive_path,
    targetPath: destination
});

// Extract files
[...extractor.extract().files];
