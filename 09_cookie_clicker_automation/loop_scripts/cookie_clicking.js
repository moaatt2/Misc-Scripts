/*
 *  Loop script that tries to buy the target second and clicks the cookie every 10th of a second.
 */

let repCounter = 0;
while (true) {

    // 0.1 second timer to run loop every second
    await new Promise(resolve => setTimeout(resolve, 100));

    // Attempt to buy selected item every 10th round
    if (repCounter == 0) {
        selectItem()?.click();
    }

    // Click the cookie
    document.getElementById("bigCookie").click();

    // Itterate repcounter
    repCounter = (repCounter + 1) % 10;
}