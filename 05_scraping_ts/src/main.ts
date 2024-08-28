import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';
import path from 'path';
import fs from 'fs';


// Find and record current directory
const filename: string = fileURLToPath(import.meta.url);
const dir: string = dirname(filename);

// Create a file name for local caching
const filepath: string = path.join(dir, '..', 'artifacts', 'page.html');

// Set the target page to scrape from
const target: string = "https://fraxyhq.net/uploader/index.php#body";


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


// View target page in console
let content = await getPage();
console.log(content);

