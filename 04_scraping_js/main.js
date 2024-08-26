import { setTimeout } from "timers/promises";
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import { dirname, parse } from 'path';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

// Define necessary filepaths
const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);
const filepath = path.join(dir, 'page.html');

// Define set to record unique file extensions
let extensions = new Set();


// Define the extensions of the files desired
const desiredExtensions = new Set([
    // 'filename',
    'fed',
    // 'jpg',
    // 'png',
    // 'mp3',
    // 'php',
    // 'zip',
    // 'exe',
    // 'rar',
    // 'bmp',
    // 'ogg',
    // 'mid',
    // 'pac',
    // 'css',
    // 'fianl sauser musquily 1',
    // 'txt',
    // 'fkc',
    // 'blade wing',
    // 'cfg',
    // 'flg',
    // 'gif',
    // 'fbg',
    // 'ico',
    // 'axel-lonewolf)(v14)('
]);

// Define default download headers
const download_config = {
    headers: {
        'Referer': 'http://acmlm.kafuka.org/uploader/index.php?act=viewcat&id=25',
    }
}


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
function saveToFile(content, filepath) {
    fs.writeFileSync(filepath, content);
    console.log("Page saved to ", filepath);
};


// Read data from file
function readFromFile(filePath) {
    try {
        const content = fs.readFileSync(filePath);
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


// Function to download enemy file if the file doesn't already exist
async function downloadEnemy(target, destination) {

    if (!fs.existsSync(destination)) {

        console.log("File not found attempting to download");
    
        // Request file and log response
        let response = await axios.get(target, download_config);
        console.log(response.status);
        // console.log(response.data);
    
        // Save data to file
        fs.writeFileSync(destination, response.data);
        console.log("File Downloaded Waiting two seconds to continue");
        await setTimeout(2000);
    
    } else {
        console.log("File already downloaded");
    };

}


// Define function to parse a page
async function parsePage() {
    const html = await getPage();
    const $ = cheerio.load(html);

    let table2 = $('table').eq(1);

    // Itterate over each table row
    for (let i = 0; i < table2.find("tr").length; i++) {
        let element = table2.find("tr").eq(i);
        let row = $(element);

        // Find info about the row
        let name   = row.find('td').eq(1).text().trim();
        let author = row.find('td').eq(3).text().trim();
        let link = row.find('td').eq(1).find('a').first().attr('href');
        let ext = name.split('.').pop().toLowerCase();
        extensions.add(ext);

        // Is the file some thing I want?
        if (desiredExtensions.has(ext)) {
            // Log info about the row to the console
            console.log(`Row ${i +1}: \n\tfilename ${name} \n\tAuthor ${author} \n\tLink ${link} \n\tExtension ${ext}`);

            // Download the enemy file
            await downloadEnemy(`http://acmlm.kafuka.org/uploader/${link}`, path.join(dir, 'enemies', name));
        }
    }
};

// parse the page and print unique extensions
await parsePage();
// console.log(extensions);
