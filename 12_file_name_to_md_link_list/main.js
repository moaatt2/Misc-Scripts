
const LOCAL_IP = "localhost";

var file_names = [
    "2023-01-28-b-3.md",
    "2023-01-28-byzantine.md",
    "2023-01-29-b-3-web.md",
    "2023-01-29-byzantine_diamond_ball.md",
    "2023-02-05-half-persian-3-in-1.md",
    "2023-02-12-european_4_in_1.md",
    "2023-03-05-box-chain-4-in-1.md",
    "2023-03-12-moon42.md",
    "2023-03-19-barrel-weave.md",
    "2023-03-26-triton.md",
    "2023-04-02-mobius-ball.md",
    "2023-04-09-flower.md",
    "2023-04-16-back-to-work.md",
    "2023-04-30-roundmaille.md",
    "2023-05-07-elfweave.md",
    "2023-05-14-spinal-elf.md",
    "2023-05-21-elfsheet.md",
    "2023-05-28-elfin.md",
    "2023-06-04-sweetpea.md",
    "2023-06-11-fieldstone.md",
    "2023-06-18-medo-persian.md",
    "2023-06-25-inverted-round.md",
    "2023-07-02-byzee-beez.md",
    "2023-07-09-byzee-beez-to-butterflies.md",
    "2023-07-16-zymira-chain.md",
    "2023-07-23-wolfweave.md",
    "2023-07-30-wolfsheet.md",
    "2023-08-06-hoodoo.md",
    "2023-08-13-hoodoo-sheet.md",
    "2023-08-20-alure.md",
    "2023-08-27-symmetrical-allure-sheet.md",
    "2023-09-03-2-in-1-chain.md",
    "2023-09-10-shaggy-loops.md",
    "2023-09-24-spiral-4-in-1.md",
    "2023-10-08-jacobs-ladder.md",
    "2023-10-22-trees.md",
    "2023-10-30-beez-stew.md",
    "2023-11-26-treezantine.md",
    "2023-12-24-dolphin.md",
    "2024-01-21-vipera-beerus-sheet.md",
    "2024-03-17-sunburst.md",
    "2024-04-07-archimedes.md",
    "2024-12-29-mercury.md",
    "2025-07-06-half-persian-3-in-1-flip.md",
    "2025-08-17-two-way-spiral.md",
    "2025-09-07-double-step.md",
    "2025-10-12-byzee-wench.md",
]

for (let filename of file_names) {

    let year  = filename.slice(0,4);
    let month = filename.slice(5,7);
    let day   = filename.slice(8,10);
    let post  = filename.slice(11, filename.length-3);
    let url   = `http://${LOCAL_IP}:4000/${year}/${month}/${day}/${post}.html`;
    let name  = post.replaceAll("_"," ").replaceAll("-", " ");

    let nameParts = [];
    for (let part of name.split(" ")) {
        nameParts.push(part.slice(0,1).toUpperCase() + part.slice(1))
    }
    name = nameParts.join(" ");

    console.log(`[${name}](${url})`);
}