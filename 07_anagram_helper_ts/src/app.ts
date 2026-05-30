import { createInterface } from 'node:readline';
import { and, factorial, re } from 'mathjs';

// Create interface for taking user input
const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});


// Tell Typescript that I am adding a custom function to string prototype
declare global {
    interface String {
        count(char: string): number;
    }
    var resultSet: Set<string>;
}


// Add custom string function for counting the number of a character in a string
String.prototype.count = function (char: string): number {
    return this.split(char).length - 1;
}


// Use a recursive function to generate all arrangements
function recursiveAnagram(current: string, remaining: string, spaces: Set<number>): void {

    // Base Case
    if (remaining.length === 0 && !global.resultSet.has(current)) {
        console.log(`Found arrangement: ${current}`);
        global.resultSet.add(current);
        return;
    }

    // Add a space if necessary
    if (spaces.has(current.length)) {
        current += ' ';
    }

    // Main Recursive Case
    for (let i = 0; i < remaining.length; i++) {
        const next = current + remaining[i];
        const nextRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
        recursiveAnagram(next, nextRemaining, spaces);
    }
}


// create function to process provided cypher text
function processAnagram(cypherText: string): void {

    // Create global set to deduplicate results
    global.resultSet = new Set<string>();

    // Confirm the user provided text
    console.log(`You provided the following cypher text: ${cypherText}`);

    // Get array of space indicies
    let indicies: Set<number> = new Set<number>();
    for (let i=0; i < cypherText.length; i++) {
        if (cypherText[i] === ' ') {
            indicies.add(i);
        }
    }

    // Remove spaces from cypher text for processing
    cypherText = cypherText.replace(/ /g, '');

    // Calculate number of possibilities
    // For a string of length n, the number of possible arrangements is n!
    // Ignore spaces as they are in fixed positions
    let possibilities = factorial(cypherText.length);

    // Duplicate Characters reduce the number of possibilities
    //   for each non-space character divide the total possibilities by the factorial of the number of characters
    let uniqueChars: Set<string> = new Set(cypherText);
    uniqueChars.forEach((char: string) => {
        if (cypherText.count(char) > 1) {
            possibilities /= factorial(cypherText.count(char));
        }
    });

    // Inform user of the number of possibilities
    console.log(`The are ${possibilities} possible arrangements of the provided cypher text.`);

    // Start running recursive function to print arrangements
    recursiveAnagram('', cypherText, indicies);
}


// Get Scrambled text from user
rl.question(`What is the cipher text: `, (text: string) => {
    processAnagram(text);
    rl.close();
})
