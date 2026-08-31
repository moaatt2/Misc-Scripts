
/*
 *  Very basic loop script that buys the target every second.
 */

while (true) {

    // 1 second timer to run loop every second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Click selected item if it is not null
    selectItem()?.click();
}
