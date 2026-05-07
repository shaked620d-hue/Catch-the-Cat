
let startBtn = document.getElementById("submit");
/**
 * מאזין ללחיצה על כפתור התחלת המשחק.
 * 
 * הפונקציה:
 * - מונעת שליחה רגילה של הטופס
 * - בודקת תקינות של השדות בטופס
 * - שומרת את שם השחקן ורמת הקושי ב־localStorage
 * - מעבירה את המשתמש לעמוד המשחק עם Query Parameters
 * 
 * @param {MouseEvent} event אובייקט אירוע הלחיצה
 */
startBtn.addEventListener('click',(event)=>{
    event.preventDefault();
        const form = document.querySelector('form');
    if(form.checkValidity()){
        const level=document.getElementById('difficulty').value;
        const name = document.getElementById('name').value;
        //העלאת הרמה - קל או קשה לוכל סטורג
        localStorage.setItem('gameLevel',level);
        localStorage.setItem('playerName',name);
// מעבר דף עם Query Parameters  
        window.location.href = `../pages/game.html?level=${level}&name=${encodeURIComponent(name)}`;    }
    else{
        form.reportValidity();
    }
})