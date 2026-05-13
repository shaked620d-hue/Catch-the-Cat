// data.js
const urlParams = new URLSearchParams(window.location.search);
const currentLevel = urlParams.get('level') || 'easy';
const playerName = urlParams.get('name') || 'שחקן אנונימי';

 const locations = [
    {
        id: 1,
        text: ` ${playerName} החתלתול הקטן הלך לאיבוד. צריך למצוא אותו!`,
        src: '../images/garden.png',
        buttensSrc: ["../images/r1.png", "../images/r2.png"],
        missionItems: [
            {
                question: "כמה חיפושיות יש בגינה?",
                correctAnswer: "6",
            },
            {
                question: "כמה פטריות יש בגינה?",
                correctAnswer: "6",
            },
            {
                question: "כמה עננים בשמים?",
                correctAnswer: "4",
            },
            {
                question: "כמה חלונות יש לבית?",
                correctAnswer: "8",
            },
            {
                question: "כמה חמניות גדולות יש בגינה?",
                correctAnswer: "3",
            }
        ]
    },
    {
        id: 2,
        text: `${playerName} יש ללחוץ על החץ האדום!`,
        src: '../images/livingRoom.png',
        buttensSrc: ["../images/l2.png"],
        missionItems: ["../images/item1.png", "../images/item2.png", "../images/item3.png",
            "../images/item4.png", "../images/item5.png"],
        counter: 0
    },
    {
        id: 3,
        text: `${playerName} זה החדר האחרון!! המשימה עכשיו לתפוס את החתול`,
        src: '../images/bedRoom.png',
        buttensSrc: [],
        btnSrc: "../images/cat.png",
        missionItems: []
    },
    {
        id: 4,
        text:`כל הכבוד ${playerName} ! הצלחת! עכשיו צריך להאכיל את החתול!!`,
        src: "../images/find.jpg",
        buttensSrc: [],
        food: ["../images/fish.png"]


    }
];

let gameTimer; //זמן המשחק
let timeLeft; //זמן שנשאר
let timerWork = false;
if (currentLevel === 'hard') {
    timeLeft = 120;
}
else {
    timeLeft = 240;
}


/**
 * מפעילה את ספירת הזמן לאחור של המשחק.
 * מעדכנת את התצוגה בכל שנייה ומפסיקה את המשחק במידה והזמן נגמר.
 */
function startGameTimer() {
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'game-timer';
    document.body.appendChild(timerDisplay);

    gameTimer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            window.location.href = 'finish.html';
        }
        else {
            timeLeft--;
            // עיצוב הזמן למבנה של דקות:שניות
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `זמן נותר: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000)
}
let counterLevels = 0;
let timer;
let loc = 1;


/**
 * מעדכנת את תצוגת החדר, מריצה את הטקסט הסיפורי ומפעילה את רכיבי המשחק.
 * @param {number} currentId - מזהה המיקום הנוכחי (1 ומעלה).
 * @global {Array} locations - מערך אובייקטים המכיל נתוני src ו-text.
 * @fires showOptions - מציגה את רכיבי המשחק לאחר סיום הטקסט. 
 */
/*פונקצייה שמקבלת מיקום דף מציגה את מראה הדף ומקלידה את הטקסט של הדף בזמן אמת ע"י פונקציית טייפ פנימית */
export function showLocation(currentId) {
    const room = document.getElementById('room');
    // ניקוי החדר לפני הוספת תוכן חדש
    room.replaceChildren();
    const image = document.createElement('img');
    image.className = 'mainImg';
    image.src = locations[currentId - 1].src;
    room.appendChild(image);

    let firstText = document.createElement('p');
    firstText.className = 'firstText'
    room.appendChild(firstText);

    let fullText = locations[currentId - 1].text;
    let i = 0;

    const type = () => {
        if (i < fullText.length) {
            firstText.innerText += fullText[i];
            i++;
            timer = setTimeout(type, 75);
        } else {
            if (!timerWork) {
                startGameTimer();
                timerWork = true;
            }
            firstText.remove();
            showOptions();
        }
    };

    clearTimeout(timer);
    type();

}

/**
 * מציגה את הכפתורים האינטראקטיביים בחדר ומגדירה את מנגנון הצגת הרמזים.
 * 
 * @global {number} loc - מספר המיקום הנוכחי.
 * @global {Array} locations - מערך נתוני החדרים המכיל את buttensSrc.
 * @fires taskManagement - מפעילה את ניהול המשימות לאחר טעינת האפשרויות.
 */
function showOptions() {
    const options = document.getElementById('options');
    options.replaceChildren(); // ניקוי כפתורים קודמים

    const currentData = locations[loc - 1];

    // בדיקה אם קיימים כפתורים להצגה 
    const sources = currentData.buttensSrc || [];
    //הוספת כפתורי רמזים והסברים
    sources.forEach((src, i) => {
        let btnImg = document.createElement('img');
        btnImg.src = '../images/dest.png'; // התמונה הקטנה שעליה לוחצים
        btnImg.id = `btn_${loc - 1}_${i + 1}`;
        btnImg.className = 'btn-click';
        options.appendChild(btnImg);

        //הוספה לכפתור היעד פעולה שבעת לחיצה תפתח תמונה תוך השחרת הרקע מאחור     
        btnImg.onclick = () => {
            const overlay = document.createElement('div');
            overlay.id = 'overlay'
            overlay.style.display = 'flex';

            const clickedImage = document.createElement('img');
            clickedImage.src = src;

            overlay.appendChild(clickedImage);
            document.body.appendChild(overlay);

            //גורם שברגע שילחצו על התמונה שנפתחה היא תיסגר
            overlay.onclick = () => overlay.remove();

        };
    });
    taskManagement();
}

/**
 * מנהלת ומנתבת את הפעלת המשימות בהתאם לחדר הנוכחי בו נמצא השחקן.
 * 
 * @global {number} loc - מספר החדר הנוכחי (מבוסס 1).
 * @requires mission1_quiz - פונקציה לניהול שאלון בחדר 1.
 * @requires mission2_collect - פונקציה לניהול איסוף בחדר 2.
 * @requires mission3_find - פונקציה לניהול חיפוש בחדר 3.
 * @requires mission4_drag - פונקציה לניהול גרירה בחדר 4.
 */
function taskManagement() {
    switch (loc - 1) {
        case 0:
            const opt = document.getElementById('options');

            // יצירת הכפתור שיוצג באופשנס
            const playMission = document.createElement('button');
            playMission.textContent = 'התחל משימת שאלון';
            playMission.className = 'mission1-btn';

            // כשלוחצים על הכפתור - הטופס נוצר
            playMission.onclick = () => {
                playMission.remove();
                mission1_quiz(); // קריאה לפונקציה שבונה את השאלות
            };
            opt.appendChild(playMission);
            break;

        case 1:
            mission2_collect();
            break;
        case 2:
            mission3_find();
            break;
        case 3:
            mission4_drag();
            break;
    }
}


/**
 * יוצרת ומנהלת את משימת השאלון בשלב הראשון.
 * 
 * @global {number} loc - מזהה המיקום הנוכחי.
 * @global {number} counterLevels - מונה השלבים שהושלמו.
 * @requires initMultipleCircles - פונקציה לאתחול אפקטים גרפיים.
 * @requires nextPlace - פונקציה למעבר לשלב הבא.
 */
function mission1_quiz() {

    //קריאה לפונקציה שמאפשרת יצירת עיגולים על המסך סביב מקום הלחיצה
    initMultipleCircles();

    const opt = document.getElementById('options');
    //יצירת כפתור
    const missionBtn = document.createElement('button');
    //יצירת טופס
    const form = document.createElement('form');
    form.id = 'mission1'

 //יצירת האלמנטים של הטופס
    for (let i = 0; i < locations[loc - 1].missionItems.length; i++) {
        //תווית
        const label = document.createElement('label');
        label.textContent = locations[loc - 1].missionItems[i].question;
        label.style.display = 'block';
        form.appendChild(label);
        //תיבת הקלט
        const input = document.createElement('input');
        input.type = 'number';
        input.id = `answer-input_${i + 1}`;
        input.placeholder = 'הקש תשובה במספרים...';
        input.required = true;
        form.appendChild(input);
    }
    //כפתור השליחה
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.id = "submit_btn";
    submitBtn.textContent = 'שלח תשובה';
    form.appendChild(submitBtn);
    opt.appendChild(form);
    //הגדרת פעולה בעת לחיצה על שליחה
    form.onsubmit = (e) => {
        e.preventDefault();
        let correct = true;
        //בדיקת תקינות
        for (let i = 0; i < locations[loc - 1].missionItems.length; i++) {
            const answer = document.getElementById(`answer-input_${i + 1}`);
            if (answer.value !== locations[loc - 1].missionItems[i].correctAnswer) {
                correct = false;
                // הוספת מסגרת אדומה לשדה השגוי
                answer.style.border = '2px solid red';
                break;
            }
            else {
                answer.style.border = '1px solid #ddd'; // החזרה למצב רגיל אם תקין
            }
        }
        //סיום המשימה
        if (correct) {
            counterLevels++;
            localStorage.setItem('finishedLevels', counterLevels); // שמירה
            nextPlace();
        }
    }
}

/**
 * פונקציה המפעילה מאזין ללחיצות על המסך ליצירת/הסרת עיגול רמז
 */
/**
* פונקציה המאפשרת יצירת אינספור עיגולי רמז על המסך.
* לחיצה על המסך = יצירת עיגול.
* לחיצה כפולה על עיגול ספציפי = מחיקתו.
*/
/**
 * מאתחלת את היכולת לסמן עיגולים על גבי הרקע.
 * משתמשת ב-AbortController לניהול זיכרון ומניעת כפילויות.
 * @global {AbortController|null} circleAbortController - בקר לניהול מאזיני האירועים.
 */
// משתנה גלובלי שיאפשר לנו לבטל את פעולת הלחיצות מאוחר יותר
let circleAbortController = null;

function initMultipleCircles() {
    // אם הפונקציה נקראת שוב, נבטל את המאזין הקודם כדי למנוע כפילויות
    if (circleAbortController) circleAbortController.abort();

    circleAbortController = new AbortController();
    const { signal } = circleAbortController;

    const room = document.getElementById('room');

    // הוספת המאזין עם ה-signal שמאפשר ביטול
    room.addEventListener('click', function (e) {
        // בדיקה: האם הלחיצה בוצעה ישירות על תמונת הרקע (שיש לה class בשם mainImg)
        if (e.target.classList.contains('mainImg')) {

            const circle = document.createElement('div');
            circle.className = 'click-circle';

            // הגדרת מיקום העיגול
            circle.style.left = e.pageX + 'px';
            circle.style.top = e.pageY + 'px';

            // מחיקה בלחיצה אחת על העיגול עצמו
            circle.style.pointerEvents = 'auto';
            circle.onclick = (event) => {
                event.stopPropagation(); // מונע יצירת עיגול חדש מתחתיו ברגע המחיקה
                circle.remove();
            };

            document.body.appendChild(circle);
        }
    }, { signal }); // הקישור לסיגנל הביטול
}

/**
 * פונקציה שמנקה את כל העיגולים מהמסך ומבטלת את האפשרות לצייר חדשים
 */
function disableAndClearCircles() {
    // 1. מחיקת כל העיגולים הקיימים מה-DOM
    const existingCircles = document.querySelectorAll('.click-circle');
    existingCircles.forEach(c => c.remove());

    // 2. ביטול המאזין - מהרגע הזה, לחיצות על הרקע לא יצרו יותר עיגולים
    if (circleAbortController) {
        circleAbortController.abort();
        circleAbortController = null;
    }
}

/**
 * מנהלת את משימת איסוף הפריטים בשלב השני.
 * יוצרת פריטים לחיצים ומנהלת מונה התקדמות עד לסיום השלב.
 * 
 * @global {number} loc - מזהה המיקום הנוכחי.
 * @global {number} counterLevels - מונה השלבים הכללי שהושלמו.
 * @requires nextPlace - פונקציה למעבר לשלב הבא במשחק.
 */
function mission2_collect() {
    const p = document.createElement('p');
    p.id = 'counter_p'
    p.textContent = "פריטים = 0";
    options.appendChild(p);
    const current = locations[loc - 1];

    const sources = current.missionItems || [];
    sources.forEach((src, i) => {
        let btnImg = document.createElement('img');
        btnImg.src = `../images/item${i + 1}.png`;
        btnImg.id = `item_${i + 1}`;
        btnImg.className = 'item-click';
        options.appendChild(btnImg);

        btnImg.onclick = () => {
            btnImg.remove();
            current.counter++;
            p.textContent = "פריטים = " + current.counter;
            if (current.counter === 5) {
                counterLevels++;
                localStorage.setItem('finishedLevels', counterLevels); // שמירה
                nextPlace();
            }
        }

    });

}


/**
 * מנהלת את משימת התפיסה בשלב השלישי.
 * יוצרת אובייקט שנע במיקומים אקראיים על המסך בהתאם לרמת הקושי.
 * 
 * @global {number} loc - מזהה המיקום הנוכחי.
 * @global {string} currentLevel - רמת הקושי של המשחק ('hard' או אחר).
 * @global {number} counterLevels - מונה השלבים שהושלמו.
 * @requires nextPlace - פונקציה למעבר לשלב הבא.
 */
function mission3_find() {
    let catchCat = false;
    const opt = document.getElementById('options');
    let btnImg = document.createElement('img');
    btnImg.src = locations[loc - 1].btnSrc;
    btnImg.id = 'cat';
    btnImg.className = 'catch-cat';
    opt.appendChild(btnImg);

    btnImg.onclick = () => {
        catchCat = true;
        console.log('נלחץ')
    }


    let timer1;
    const catching = () => {
        if (!catchCat) {
            //הגרלת מיקומים
            btnImg.style.top = `${Math.floor(Math.random() * 100) + 20}%`
            btnImg.style.left = `${Math.floor(Math.random() * 91) + 10}%`
            if (currentLevel === 'hard')
                timer1 = setTimeout(catching, 900);
            else {
                timer1 = setTimeout(catching, 1500);
            }
        }
        else {
            counterLevels++
            localStorage.setItem('finishedLevels', counterLevels); // שמירה
            nextPlace();
        }
    }

    clearTimeout(timer1);
    catching();


}


/**
 * מנהלת את משימת הגרירה וההשלכה בשלב האחרון.
 * מטפלת באירועי ה-Drag & Drop, עצירת המשחק ושמירת שיאים.
 * 
 * @global {number} loc - מזהה המיקום הנוכחי.
 * @global {number} counterLevels - מונה השלבים שהושלמו.
 * @global {number} gameTimer - מזהה הטיימר של המשחק לצורך עצירה.
 * @global {string} playerName - שם השחקן לצורך שמירת שיא.
 * @requires saveHighScore - פונקציה לשמירת נתוני השחקן והזמן שנותר.
 */
function mission4_drag() {
    const opt = document.getElementById('options');
    const room = document.getElementById('room');
    const current = locations[loc - 1];
    const items = document.createElement('div');
    items.id = 'items';

    const dragItem = document.createElement('img');
    dragItem.src = current.food[0];
    dragItem.id = 'drag_item';
    dragItem.className = 'draggable';
    dragItem.draggable = true;
    items.appendChild(dragItem);

    if (!room.querySelector('div')) {
        const dropArea = document.createElement('div');
        dropArea.id = 'dropArea';
        room.appendChild(dropArea);

        dragItem.ondragstart = (e) => {
            e.dataTransfer.setData("text", e.target.id);
        }

        dropArea.ondragover = (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move"; // 👈 זה חשוב!
            dropArea.classList.add('hover');
        }
        dropArea.ondragleave = () => {
            dropArea.classList.remove('hover');
        }

        dropArea.ondrop = (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData("text");
            const draggedElement = document.getElementById(data);
            draggedElement.remove();

            dropArea.replaceChildren();
            dropArea.classList.remove('hover');

            if (document.querySelectorAll('.draggable').length === 0) {
                setTimeout(() => {
                    clearInterval(gameTimer);
                    counterLevels++;
                    localStorage.setItem('finishedLevels', counterLevels); // שמירה
                    saveHighScore(playerName, timeLeft);
                    window.location.href = "finish.html"; // 👈 מעבר דף
                }, 500);
            }
        };
    }
    room.appendChild(items);

}

/**
 * מחשבת ושומרת את שיא השחקן בלוח התוצאות המקומי.
 * 
 * @param {string} playerName - שם השחקן שהשלים את המשחק.
 * @param {number} timeLeft - כמות השניות שנותרו על השעון ברגע הסיום.
 * 
 * @global {string} currentLevel - רמת הקושי הנוכחית ('hard' או אחר).
 */
// פונקציה לשמירת שיא חדש
function saveHighScore(playerName, timeLeft) {
    // 1. שליפת הטבלה הקיימת מהזיכרון או יצירת מערך ריק אם אין כזה
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    let time = 0;
    if (currentLevel == 'hard')
        time = (120 - timeLeft) / 60;
    else time = (240 - timeLeft) / 60;

    time = Number(time.toFixed(2));    // 2. יצירת אובייקט לתוצאה החדשה
    const newScore = {
        name: playerName,
        score: time,
        level: currentLevel
    };

    // 3. הוספה למערך, מיון מהגבוה לנמוך, וחיתוך ל-5 הטובים ביותר
    highScores.push(newScore);
    highScores.sort((a, b) => {
        // 1. מיון לפי רמה (אלפביתי - "קשה" יופיע לפני "קל")
        if (a.level !== b.level) {
            return b.level.localeCompare(a.level);
        }
        // 2. אם הרמה זהה, מיון לפי הניקוד מהגבוה לנמוך
        return a.score - b.score;
    });
    //פונקצית פילטר
    //שומר רק את ה 7 הראשונים
    const topScores = highScores.filter((score, index) => index < 7);


    // 4. שמירה חזרה ב-localStorage
    localStorage.setItem('highScores', JSON.stringify(topScores));
}


/**
 * מנהלת את תהליך המעבר בין החדרים והמשימות.
 * מנקה את המסך מרכיבי המשימה הקודמת ומציגה את אפשרות המעבר לשלב הבא.
 * 
 * @global {number} loc - מונה המיקום הנוכחי במשחק.
 * @requires disableAndClearCircles - לניקוי מאזיני אירועים ועיגולי סימון.
 * @requires showLocation - לטעינת התוכן והגרפיקה של החדר הבא.
 */
function nextPlace() {
    const opt = document.getElementById('options');
    opt.replaceChildren();

    disableAndClearCircles();
    if (loc !== 3) {
        const nextPlace = document.createElement('button');
        nextPlace.id = 'nextPlace';
        nextPlace.textContent = 'משימה הושלמה!! יש ללחוץ שלב הבא!'
        nextPlace.className = 'mission1-btn';

        nextPlace.onclick = () => {

            loc++;
            nextPlace.remove();
            showLocation(loc);
        };
        opt.appendChild(nextPlace);
    }
    else {
        loc++;
        showLocation(loc);
    }
}

