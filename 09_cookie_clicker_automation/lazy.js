
// Returns a div of a purchaseable item or null if none are available
function selectItem() {

    // Check for available product
    let product = document.querySelector("div.enabled.product");

    // Check for available upgrade
    let upgrade = document.querySelector("div.enabled.upgrade");

    // Return the product if available, otherwise return the upgrade
    return product || upgrade;
}


// Core infinite loop
while (true) {

    // 1 second timer to run loop every second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Click selected item if it is not null
    selectItem()?.click();
}
