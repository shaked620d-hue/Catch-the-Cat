import { textsForlocations,showLocation } from './data.js';

let currentLocationId;
let start = false;

//הפעלת מנגינת רקע בעת הפעלת המשחק
window.addEventListener('DOMContentLoaded', (event) => {
    const backgroundMusic = new Audio('../sound/sound.mp3');
    //המנגינה תחזור על עצמה בלופים
    backgroundMusic.loop = true;
    backgroundMusic.play().catch(error => {
        console.log("השמעה אוטומטית נחסמה, ננסה להפעיל בלחיצה ראשונה על המסך");
        // פתרון גיבוי למקרה שהדפדפן חסם:
        document.body.onclick = () => backgroundMusic.play();
    });
});

/*פונקציית התחלת המשחק מאפסת את המשתנים וקוראת לפונקציית טעינת מראה המיקום */
 function startGame() {
    currentLocationId = 1;
    start = true;
    showLocation(currentLocationId);

    
}
window.addEventListener('load', startGame);
