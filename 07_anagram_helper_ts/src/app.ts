import { createInterface } from 'node:readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question(`What's your name?`, (name: string) => {
    console.log(`Hello, ${name}!`);
    rl.close();
})
