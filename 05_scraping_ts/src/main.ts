import { setTimeout } from "timers/promises";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
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

// Set subfolder in artifacts to download files
const download_folder = 'enemies';


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


// Function to download file
async function download_file(file_uri: string, save_location: string) {
    // See if file already exists, and download it if it doesn't
    if (!fs.existsSync(save_location)) {
        try {
            console.log("File not found attempting to download");
        
            // Request file and log response
            let response = await axios.get(file_uri);
            console.log(response.status);
            // console.log(response.data);
        
            // Save data to file
            fs.writeFileSync(save_location, response.data);
            console.log("File Downloaded Waiting two seconds to continue");
            await setTimeout(2000);
            console.log("Two seconds waited");
        } catch {
            console.log('There was an issue downloading the file.');
        }
    // If the file exists don't do anything
    } else {
        console.log("File already downloaded");
    };
}


// Define a function to parse the page
async function parsePage() {
    const html = await getPage();
    const $ = cheerio.load(html);

    let table2 = $('table').eq(1);

    // Itterate over each table row
    for (let i = 0; i < table2.find("tr").length; i++) {
        let element = table2.find("tr").eq(i);
        let row = $(element);

        // Get data from the row
        let name   = row.find('td').eq(1).text().trim();
        let author = row.find('td').eq(3).text().trim();
        let link   = row.find('td').eq(4).find('a').eq(0).attr('href');

        // Prepend base  url to link
        link = 'https://fraxyhq.net/uploader/' + link;

        // Get filename from link
        let filename = link.split('/').pop() ?? link;

        // Get extension from filename
        let extension = filename?.split('.').pop() ?? '';
        extensions.add(extension)

        if (desiredExtensions.has(extension)) {
            // print information to console
            console.log(`${i} name: ${name}\n\tauthor: ${author}\n\tlink: ${link}\n\tfilename: ${filename}\n\textension: ${extension}`);

            // Download file
            let enemy_fp = path.join(dir, '..', 'artifacts', download_folder, filename);
            await download_file(link, enemy_fp);
        };
    }

}

// Run script and show all found extensions
await parsePage();
// console.log(extensions);
