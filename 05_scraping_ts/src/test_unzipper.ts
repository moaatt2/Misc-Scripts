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


