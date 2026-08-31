
/*
 *  Very basic target script that selects a random purchaseable building, then upgrade, then null.
 */

function selectItem() {

    // Check for available product
    let product = document.querySelector("div.enabled.product");

    // Check for available upgrade
    let upgrade = document.querySelector("div.enabled.upgrade");

    // Return the product if available, otherwise return the upgrade
    return product || upgrade;
}
