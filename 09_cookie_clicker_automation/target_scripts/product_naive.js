
/*
 *  Returns the cheapest available building, then a random upgrade, then null.
 */


// Helper function to get the price of an item
function getPrice(item) {
    let priceText = item.querySelector(".price").textContent;

    // Remove commas
    pricetext = priceText.replaceAll(",", "");

    return Number(pricetext);
}


// Target Selection function
function selectItem() {

    // Check for available product
    let products = document.querySelectorAll("div.enabled.product");

    // Instantiate variables to record target and lowest price
    let target = null;
    let threshold = Number.POSITIVE_INFINITY;

    // Loop over all products to find the lowest price
    for (let product of products) {
        if (getPrice(product) < threshold) {
            threshold = getPrice(product);
            target = product;
        }
    }

    // Check for available upgrade
    let upgrade = document.querySelector("div.enabled.upgrade");

    // Return the product if available, otherwise return the upgrade
    return target || upgrade;
}
