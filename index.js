let saveEL = document.getElementById("save-el")
let countEL = document.getElementById("count-el")

let count = 0

/**
 * Updates the increment button (+1) when clicked
 */
function increment() {
    count += 1
    countEL.textContent = count
}

/**
 * Saves entries on click
 */

function save() {
    let countStr = count + " - "
    saveEL.textContent += countStr
    countEL.textContent = 0
    count = 0
}

