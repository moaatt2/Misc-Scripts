# Cookie Clicker Automation

## Overview

The goal of this is to have scripts that can be run in the browser console to automate purhchasing upgrades in cookie clicker.

To allow for flexibility the project is broken into `target_scripts` and `loop_scripts`. Target Scripts represent the logic for selecing what upgrade/building should be bought by implementing a `selectItem` function that returns a clickable tag or nothing. Loop Scripts are basic loops that periodically buy a target item.


## Target Scipts

### Lazy

Clicks a random building when available, otherwise clicks a random upgrade if available.


### Product Naive

Takes the cheapest building, then a random upgrade.


### Naive

Always buys the cheapest buyable.


### Most Cost Effective Upgrade

Saves for the most cost effective upgrade that can be bought.


### Combo

Saves for the most cost effecitve upgrade that can be bought with x seconds of CPS otherwise buys the cheapest item available.


## Loop Scripts

### Basic

Attempts to buy the target item once a second.


### Basic Cookie Clicking

Attempts to buy the target item once a second and also clicks the cookie.


### Cookie Clicking

Clicks the cookie ten times per second and attempts to buy the target item once a second.

