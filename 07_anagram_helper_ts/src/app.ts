import { createInterface } from 'node:readline';
import { factorial } from 'mathjs';

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
}


// Add custom string function for counting the number of a character in a string
String.prototype.count = function (char: string): number {
    return this.split(char).length - 1;
}


// create function to process provided cypher text
function processAnagram(cypherText: string): void {

    // Confirm the user provided text
    console.log(`You provided the following cypher text: ${cypherText}`);

    // Calculate number of possibilities
    // For a string of length n, the number of possible arrangements is n!
    // Ignore spaces as they are in fixed positions
    let possibilities = factorial(cypherText.length - cypherText.count(' '));

    // Inform user of the number of possibilities
    console.log(`The are ${possibilities} possible arrangements of the provided cypher text.`);
}


// Get Scrambled text from user
rl.question(`What is the cipher text: `, (text: string) => {
    processAnagram(text);
    rl.close();
})
