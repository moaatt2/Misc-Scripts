
// Returns a div of a purchaseable item or null if none are available
function selectItem() {

    // Check for available product
    let product = document.querySelector("div.enabled.product");

    // Check for available upgrade
    let upgrade = document.querySelector("div.enabled.upgrade");

    // Return the product if available, otherwise return the upgrade
    return product || upgrade;
}

// Main loop that runs every second
