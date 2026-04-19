import { locations } from './data.js';

let currentLocationId;
let timer;
let key = false;
let start = false;

export function startGame() {
    currentLocationId = 1;
    state = {};
    start = true;
    showLocation(currentLocationId);
}