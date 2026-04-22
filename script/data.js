// data.js
export const textsForlocations = [
    {
        id: 1,
        text: "החתלתול הקטן הלך לאיבוד. עזרו לנו למצוא אותו!",
        src:'../images/garden.png',
        buttensSrc: ["../images/r1.png","../images/r2.png"],
        missionItems: [
    {
        question: "כמה חיפושיות יש בגינה?",
        correctAnswer: "5",
    },
    {
        question: "כמה פטריות יש בגינה?",
        correctAnswer: "4",
    },
    {
        question: "כמה חלונות יש לבית?",
        correctAnswer: "6",
    },
    {
        question: "כמה חמניות יש בגינה?",
        correctAnswer: "2",
    }
]
    },
    {
        id: 2,
        text: "בצעו את המשימה והיכנסו לחדר הבא",
        src:'../images/livingRoom.png',
        buttensSrc: [],
        missionItems:[]
    },
    {
        id: 3,
        text: "הקשב!!! יש יללות חתול! המשימה עכשיו למצוא את החתלתול!",
        src:'../images/kitchen.png',
        buttensSrc: [],
        missionItems:[]
    }
];

let timer;
let loc =1;
/*פונקצייה שמקבלת מיקום דף מציגה את מראה הדף ומקלידה את הטקסט של הדף בזמן אמת ע"י פונקציית טייפ פנימית */
export function showLocation(currentId) {
 
    const room = document.getElementById('room');
    // ניקוי החדר לפני הוספת תוכן חדש
    room.replaceChildren();
    const image = document.createElement('img');
    image.className = 'mainImg';
    image.src = textsForlocations[currentId-1].src;
    room.appendChild(image);

    let firstText = document.createElement('p');
    room.appendChild(firstText);
    
    let fullText = textsForlocations[currentId - 1].text;
    let i = 0;

    const type = () => {
        if (i < fullText.length) {
            firstText.innerText += fullText[i];
            i++;
            timer = setTimeout(type, 70);
        } else {
                firstText.remove();
                showOptions();          
        }
    };

    clearTimeout(timer);
    type();
}


function  showOptions()
{   const options = document.getElementById('options');
    options.replaceChildren(); // ניקוי כפתורים קודמים

    const currentData = textsForlocations[loc-1];
    
    // בדיקה אם קיימים כפתורים להצגה 
    const sources = currentData.buttensSrc || [];
    //הוספת כפתורי רמזים והסברים
   sources.forEach((src, i) => {
        let btnImg = document.createElement('img');
        btnImg.src = '../images/dest.png'; // התמונה הקטנה שעליה לוחצים
        btnImg.id = `btn_${loc-1}_${i+1}`;
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
      overlay.onclick=()=> overlay.remove();

};
    });
taskManagement();
} 

function taskManagement()
 {
    switch(loc-1)
    {
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
            mission3_drag();
            break;
    }
 }

