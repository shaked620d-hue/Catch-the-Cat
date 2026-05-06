// פונקציה שמפעילה את הצגת השיאים מיד עם טעינת הדף
window.addEventListener('DOMContentLoaded', () => {
    displayHighScores();
});

function displayHighScores() {
    const container = document.getElementById('high-scores-container');
    
    // שליפת הנתונים מהזיכרון המקומי
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // ניקוי המכולה

    if (highScores.length === 0) {
        return;
    }

    // בניית הטבלה
    const table = document.createElement('table');
    table.className = 'high-scores-table';


    // כותרות הטבלה
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>מקום</th>
            <th>רמה</th>
            <th>שם השחקן</th>
            <th>משך המשחק בדקות</th>
        </tr>
    `;
    table.appendChild(thead);

    // מילוי הנתונים
    const tbody = document.createElement('tbody');
    highScores.forEach((score, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.level}</td>
            <td>${score.name}</td>
            <td>${score.score}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}