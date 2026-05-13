/**
 * מציג הודעה בהתאם למספר השלבים שהשחקן סיים.
 * אם השחקן עבר פחות מ־4 שלבים תוצג הודעת התקדמות,
 * אחרת תוצג הודעת סיום והמידע יימחק מה־localStorage.
 */
const counterLevels = localStorage.getItem('finishedLevels') || 0;

const h1 = document.getElementById('h1');

if(counterLevels<4)
    h1.textContent = `נגמר הזמן! עברת ${counterLevels} שלבים`
else{
     h1.textContent = `!!!כל הכבוד סיימתם את המשחק`
     localStorage.removeItem('finishedLevels');
}


/**
 * חיבור אירועים לכפתורים
 */

// שחק שוב
document.getElementById('playAgainBtn').addEventListener('click', () => {
    window.location.href = 'catchTheCat.html';
});

document.getElementById('comebake').addEventListener('click', () => {
    window.location.href = '../index.html';
});

// טבלת שיאים
document.getElementById('scoresBtn').addEventListener('click', () => {
    window.location.href = 'LeaderScores.html';
});
