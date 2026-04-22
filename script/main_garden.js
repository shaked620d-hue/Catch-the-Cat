import { textsForlocations,showLocation } from './data.js';

let currentLocationId;
let start = false;

/*פונקציית התחלת המשחק מאפסת את המשתנים וקוראת לפונקציית טעינת מראה המיקום */
 function startGame() {
    currentLocationId = 1;
    start = true;
    showLocation(currentLocationId);
}
window.addEventListener('load', startGame);
