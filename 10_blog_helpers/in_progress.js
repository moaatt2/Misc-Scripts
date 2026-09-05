
const NUM_STEPS = 29;
const FILE_BASE = `dice_bag_step_`

const BASE  = `src="{{ site.baseurl }}{{ page.image_path }}/${FILE_BASE}`
const STYLE = `style="max-height: min(200px, 95vh)"`

for (let i=1; i<=NUM_STEPS; i++) {

    if (i > 1) {
        console.log(`<br>\n`);
    }

    let tag;
    if (i < 10) {
        tag = `<img ${BASE}0${i}.jpg" ${STYLE}>\n`
    } else {
        tag = `<img ${BASE}${i}.jpg" ${STYLE}>\n`
    }
    console.log(tag);
}
