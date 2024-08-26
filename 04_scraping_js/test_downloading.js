import { setTimeout } from "timers/promises";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

// Define necessary filepaths
const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);
const filepath = path.join(dir,'enemies', 'HA-01.fed');

// Define headers and url for download
let url = "http://acmlm.kafuka.org/uploader/get.php?id=90";
const download_config = {
    headers: {
        'Referer': 'http://acmlm.kafuka.org/uploader/index.php?act=viewcat&id=25',
    }
};


if (!fs.existsSync(filepath)) {

    console.log("File not found attempting to download");

    // Request file and log response
    let response = await axios.get(url, download_config);
    console.log(response.status);
    // console.log(response.data);

    // Save data to file
    fs.writeFileSync(filepath, response.data);
    console.log("File Downloaded Waiting two seconds to continue");
    await setTimeout(2000);
    console.log("Two seconds waited");

} else {
    console.log("File already downloaded");
};
