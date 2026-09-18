
// Variables

const spr            = 20; // Seconds per ring
const hatSize        = 24; // Head circumference
const coifHeight     = 10; // height of cylinder
const mantleLength   =  4; // Length of mantle
const closedFrac     = 5/6; // How much of the cylinder & mantle will be full
const cph            = 25; // How much I want to make per hour
const taxRate        = 1.13; // Multiplier for tax cost
const shippingRate   = 1.20; // Multiplier for shipping cost
const ringBufferRate = 1.10; // How many extra rings should be ordered

// All materials and their values
const materials = [
    {
        "name": 'Bright Aluminum Machine Cut 16 SWG 1/4" ID',
        "rsf": 3097,
        "rpb": 9000,
        "cpb": 101.16,
        "cpr": 101.16/9000,
    },
    {
        "name": 'Bright Aluminum Machine Cut 16 SWG 5/16" ID',
        "rsf": 1824,
        "rpb": 9000,
        "cpb": 90.82,
        "cpr": 90.82/9000,
    },
    {
        "name": 'Bright Aluminum Machine Cut 16 SWG 3/8" ID',
        "rsf": 1222,
        "rpb": 9000,
        "cpb": 101.16,
        "cpr": 101.16/9000,
    },
    {
        "name": 'Bright Aluminum Machine Cut 16 SWG 7/16" ID',
        "rsf": 1015, // zlosk estimate
        "rpb": 750,
        "cpb": 11.80,
        "cpr": 11.80/750,
    },    
    {
        "name": 'Bright Aluminum Saw Cut 16 SWG 1/4" ID',
        "rsf": 3097,
        "rpb": 231,
        "cpb": 2.84,
        "cpr": 2.84/231,
    },
    {
    "name": 'Bright Aluminum Saw Cut 16 SWG 5/16" ID',
        "rsf": 1824,
        "rpb": 191,
        "cpb": 2.84,
        "cpr":  2.84/191,
    },
    {
    "name": 'Bright Aluminum Saw Cut 16 SWG 3/8" ID',
        "rsf": 1222,
        "rpb": 150,
        "cpb": 2.26,
        "cpr": 2.26/150,
    },
    {
        "name": 'Bright Aluminum Saw Cut 16 SWG 7/16" ID',
        "rsf": 1015, // zlosk estimate
        "rpb": 137,
        "cpb": 2.26,
        "cpr": 2.26/137,
    },
    {
        "name": 'Bright Aluminum Saw Cut 16 SWG 1/2" ID',
        "rsf": 880, // zlosk estimate
        "rpb": 116,
        "cpb": 2.34,
        "cpr": 2.34/116,
    },
    {
        "name": 'Bright Aluminum Saw Cut 16 SWG 5/8" ID',
        "rsf": 600, // regression estimate
        "rpb": 90,
        "cpb": 2.44,
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
    let rings = Math.ceil(totalArea * material.rsf * ringBufferRate);
    let time = (rings * spr) / 3600;
    let timeCost = time * cph;
    let bags = Math.ceil(rings / material.rpb);
    let extraRings = bags * material.rpb - rings;
    let ringSubtotal = material.cpb * bags;
    let ringCost = ringSubtotal * shippingRate * taxRate;
    let totalCost = timeCost + ringCost;

    // Print material breakdown
    console.log(`${material.name}:`);
    console.log(`\tRings Needed: ${rings}`);
    console.log(`\tBags To Order: ${bags}`);
    console.log(`\tExtra Rings: ${extraRings}`);
    console.log(`\tRing Cost: $${ringCost.toFixed(2)}`);
    console.log(`\tTime: ${time.toFixed(2)} hours`);
    console.log(`\tTime Cost: $${timeCost.toFixed(2)}`);
    console.log(`\tTotal Cost: $${totalCost.toFixed(2)}`);
}



