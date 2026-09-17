
// Variables

const spr          = 20; // Seconds per ring
const hatSize      = 24; // Head circumference
const coifHeight   = 10; // height of cylinder
const mantleLength =  4; // Length of mantle
const closedFrac   = 5/6; // How much of the cylinder & mantle will be full
const cph          = 25; // How much I want to make per hour

// All materials and their values
const materials = [
    {
        "name": 'Bright Aluminum Machine Cut 16 SWG 1/4" ID',
        "rsf": 3097,
        "cpr": 101.16/9000,
    },
    {
        "name": 'Bright Aluminum Machine Cut 16 SWG 5/16" ID',
        "rsf": 1824,
        "cpr": 90.82/9000,
    },
    {
        "name": 'Bright Aluminum Machine Cut 16 SWG 3/8" ID',
        "rsf": 1222,
        "cpr": 101.16/9000,
    },
    {
        "name": 'Bright Aluminum Machine Cut 16 SWG 7/16" ID',
        "rsf": 900, // Regression estimate
        "cpr": 11.80/750,
    },    
    {
        "name": 'Bright Aluminum Saw Cut 16 SWG 1/4" ID',
        "rsf": 3097,
        "cpr": 2.84/231,
    },
    {
    "name": 'Bright Aluminum Saw Cut 16 SWG 5/16" ID',
        "rsf": 1824,
        "cpr":  2.84/191,
    },
    {
    "name": 'Bright Aluminum Saw Cut 16 SWG 3/8" ID',
        "rsf": 1222,
        "cpr": 2.26/150,
    },
    {
        "name": 'Bright Aluminum Saw Cut 16 SWG 7/16" ID',
        "rsf": 900, // Regression estimate
        "cpr": 2.26/137,
    },
    {
        "name": 'Bright Aluminum Saw Cut 16 SWG 1/2" ID',
        "rsf": 700, // Regression estimate
        "cpr": 2.34/116,
    },
    {
        "name": 'Bright Aluminum Saw Cut 16 SWG 5/8" ID',
        "rsf": 450, // Regression estimate
        "cpr": 2.44/90,
    },
]


// Size Estimation
let topArea = (hatSize ** 2) / (4 * Math.PI);

let cylinderArea = coifHeight * hatSize * closedFrac;

let hatRadius = hatSize / (2 * Math.PI)
let mantleArea = closedFrac * (Math.PI * ((hatRadius + mantleLength)**2) - ((hatSize**2)/(4*Math.PI)))

let totalArea = (topArea + cylinderArea + mantleArea)/144;

console.log(`Total Area: ${totalArea.toFixed(2)} square feet`)

// Time/Cost Estimation

// Itterate over all materials
for (let material of materials) {

    // Calculate values of interest
    let r = Math.ceil(totalArea * material.rsf);
    let t = (r * spr) / 3600;
    let tc = t * cph;
    let rc = material.cpr * r;
    let c = tc + rc;

    // Print material breakdown
    console.log(`${material.name}:`);
    console.log(`\tRings: ${r}`);
    console.log(`\tRing Cost: $${rc.toFixed(2)}`);
    console.log(`\tTime: ${t.toFixed(2)} hours`);
    console.log(`\tTime Cost: $${tc.toFixed(2)}`);
    console.log(`\tTotal Cost: $${c.toFixed(2)}`);
}



