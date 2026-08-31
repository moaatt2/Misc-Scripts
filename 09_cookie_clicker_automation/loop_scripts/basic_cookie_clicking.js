/*
 *  Basic loop script that tries to buy the target and clicks the cookie every second.
 */

while (true) {

    // 1 second timer to run loop every second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Click selected item if it is not null
    selectItem()?.click();

    // Click the cookie
    document.getElementById("bigCookie").click();
}