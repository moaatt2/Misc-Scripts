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

// Create a set to record desired extensions
const desiredExtensions = new Set([
    // 'undefined',
    'fed',
    // 'zip',
    // 'rar',
    'The Phantom_-_Worst Boss Contest - The Phantom',
    'dracmeister_-_XB42 - Stratobomber ',
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

        // Define attribution record and save it to a file if it has a desired extension
        if (desiredExtensions.has(extension)) {
            let attribution_record = `\t* ${filename} - ${author}\n\t\t* ${link}\n\t\t* ${target}\n`;
            fs.appendFileSync(path.join(dir, '..', 'artifacts', 'attribution.txt'), attribution_record);
        };
    });

    // Inform the user the task is complete
    console.log('Attribution file written.')
}

await parsePage();

// // Log all applicable file extentions to console
// console.log(extensions);
