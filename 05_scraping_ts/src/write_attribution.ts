import { fileURLToPath } from 'url';
import { dirname, extname } from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import path from 'path';
import fs from 'fs';

// Find and record current directory
const filename: string = fileURLToPath(import.meta.url);
const dir: string = dirname(filename);

// Create a file name for local caching
const filepath: string = path.join(dir, '..', 'artifacts', 'page.html');

// Set the target page to scrape from
const target: string = "https://fraxyhq.net/uploader/index.php#body";

// Create an accumulator to store new extensions
let extensions = new Set();

// Initialize text accumulation variables
let enemyText = 'Enemies:\n';
let tryText = 'Scenarios:\n';
let shipText = 'Ships:\n';

// Create sets to record extension categories
const enemyExtensions = new Set([
    // 'undefined',
    'fed',
    // 'zip',
    // 'rar',
    'The Phantom_-_Worst Boss Contest - The Phantom',
    'dracmeister_-_XB42 - Stratobomber ',
]);
const archiveExtensions = new Set([
    // 'undefined',
    // 'fed',
    'zip',
    'rar',
    // 'The Phantom_-_Worst Boss Contest - The Phantom',
    // 'dracmeister_-_XB42 - Stratobomber ',
]);

// Fetch the page
async function fetchPage() {
    try {
        const response = await axios.get(target);
        return response.data;
    } catch (error) {
        console.error('Error fetching the page: ', error);
        throw error;
    }
};


// Save Content to a file
function saveToFile(content: string, filepath: string) {
    fs.writeFileSync(filepath, content);
    console.log("Page saved to ", filepath);
};


// Read data from file
function readFromFile(filePath: string) {
    try {
        const content = fs.readFileSync(filePath).toString();
        console.log('Page loaded from ', filePath);
        return content;
    } catch(error) {
        console.error('Error reading the file: , error');
        throw error;
    }
};


// Function to get page
async function getPage() {
    if (fs.existsSync(filepath)) {
        return readFromFile(filepath);
    } else {
        const pageContent = await fetchPage();
        saveToFile(pageContent, filepath);
        return pageContent;
    }
};

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

// Define a function to parse the page
async function parsePage() {
    const html = await getPage();
    const $ = cheerio.load(html);

    let table2 = $('table').eq(1);

    // Asynchronously itterate over each row
    table2.find('tr').each((i, element) => {
        let row = $(element);

        // Get data from row
        let name   = row.find('td').eq(1).text().trim();
        let author = row.find('td').eq(3).text().trim();
        let link   = row.find('td').eq(4).find('a').eq(0).attr('href');

        // Prepend baseurl to link
        link = 'https://fraxyhq.net/uploader/' + link;

        // Get filename from link
        let filename = link?.split('/').pop() ?? link;

        // Get extension from filename
        let extension = filename?.split('.').pop() ?? '';
        extensions.add(extension);
        
        // Create Attribution record
        let attributionRecord = `\t* ${filename} - ${author}\n\t\t* ${link}\n\t\t* ${target}\n`;

        // If the extension is an enemy extension add the attribution to enemy text
        if (enemyExtensions.has(extension)) {
            enemyText += attributionRecord;
        };

        // Handle archives
        if (archiveExtensions.has(extension)) {
            // Determine if extracted folder exists
            let archiveName = filename.split('.')[0];
            let expectedPath = path.join(dir, '..', 'artifacts', 'archives', archiveName);
            if (fs.existsSync(expectedPath)) {
                switch (categorizeDirectory(expectedPath)) {
                    case 'try':
                        tryText += attributionRecord;
                        break;
                    
                    case 'ship':
                        shipText += attributionRecord;
                        break;
                    
                    case 'enemy':
                        enemyText += attributionRecord;
                        break;
                }
            }
        };
    });

    // Write text to file
    if (enemyText.length > 9) {
        enemyText += '\n';
        fs.appendFileSync(path.join(dir, '..', 'artifacts', 'attribution.txt'), enemyText);
    };
    if (shipText.length > 7) {
        shipText += '\n';
        fs.appendFileSync(path.join(dir, '..', 'artifacts', 'attribution.txt'), shipText);
    };
    if (tryText.length > 11) {
        tryText += '\n';
        fs.appendFileSync(path.join(dir, '..', 'artifacts', 'attribution.txt'), tryText);
    };

    // Inform the user the task is complete
    console.log('Attribution file written.')
}

await parsePage();

// // Log all applicable file extentions to console
// console.log(extensions);
