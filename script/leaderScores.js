// פונקציה שמפעילה את הצגת השיאים מיד עם טעינת הדף
window.addEventListener('DOMContentLoaded', () => {
    displayHighScores();
});


/**
 * מציגה את טבלת השיאים מתוך הנתונים
 * השמורים ב־localStorage.
 * 
 * הפונקציה:
 * - שולפת את רשימת השיאים מהזיכרון המקומי
 * - בודקת אם קיימים נתונים להצגה
 * - יוצרת טבלה דינמית עם כותרות ונתונים
 * - מציגה את הטבלה בתוך המכולה המתאימה בדף
 */
function displayHighScores() {
    const container = document.getElementById('high-scores-container');
    
    // שליפת הנתונים מהזיכרון המקומי
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // בדיקה אם יש נתונים להצגה
    if (highScores.length === 0) {
        return;
    }

    // ניקוי המכולה בצורה בטוחה 
    container.replaceChildren();
    

    // בניית הטבלה
    const table = document.createElement('table');
    table.className = 'high-scores-table';

    // יצירת כותרות הטבלה (thead)
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = ['מקום', 'רמה', 'שם השחקן', 'משך המשחק בדקות'];
    
    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // יצירת גוף הטבלה (tbody) ומילוי הנתונים
    const tbody = document.createElement('tbody');
    
    highScores.forEach((score, index) => {
        const row = document.createElement('tr');

        // יצירת תא עבור כל נתון
        const cellPlace = document.createElement('td');
        cellPlace.textContent = index + 1;

        const cellLevel = document.createElement('td');
        cellLevel.textContent = score.level;

        const cellName = document.createElement('td');
        cellName.textContent = score.name;

        const cellScore = document.createElement('td');
        cellScore.textContent = score.score;

        // הוספת התאים לשורה (אפשר להשתמש ב-append כדי להוסיף כמה יחד)
        row.append(cellPlace, cellLevel, cellName, cellScore);
        
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}