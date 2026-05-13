import { showLocation } from './data.js';

let currentLocationId;
let start = false;
/**
 * מפעיל מוזיקת רקע עם טעינת הדף.
 * 
 * המנגינה מופעלת בלולאה אינסופית.
 * אם הדפדפן חוסם השמעה אוטומטית,
 * ההשמעה תופעל בלחיצה הראשונה של המשתמש על המסך.
 */
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

/**
 * מתחיל את המשחק.
 * 
 * הפונקציה:
 * - מאפסת את מזהה המיקום הנוכחי
 * - מעדכנת שהמשחק התחיל
 * - מציגה את המיקום הראשון במשחק
 */
/*פונקציית התחלת המשחק מאפסת את המשתנים וקוראת לפונקציית טעינת מראה המיקום */
 function startGame() {
    currentLocationId = 1;
    start = true;
    showLocation(currentLocationId);

    
}
window.addEventListener('load', startGame);
