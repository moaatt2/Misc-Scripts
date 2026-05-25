import { createInterface } from 'node:readline';
import { factorial } from 'mathjs';

// Create interface for taking user input
const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});


// create function to process provided cypher text
function processAnagram(cypherText: string): void {

    // Confirm the user provided text
    console.log(`You provided the following cypher text: ${cypherText}`);

    // Calculate number of possibilities
    // For a string of length n, the number of possible arrangements is n!
    let possibilities = factorial(cypherText.length);

    // Inform user of the number of possibilities
    console.log(`The are ${possibilities} possible arrangements of the provided cypher text.`);
}


// Get Scrambled text from user
rl.question(`What is the cipher text: `, (text: string) => {
    processAnagram(text);
    rl.close();
})
