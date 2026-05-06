const counterLevels = localStorage.getItem('finishedLevels') || 0;

const h1 = document.getElementById('h1');

if(counterLevels<4)
    h1.textContent = `נגמר הזמן! עברת ${counterLevels} שלבים`
else{
     h1.textContent = `!!!כל הכבוד סיימתם את המשחק`
     localStorage.removeItem('finishedLevels');
}