// data.js
export const textsForlocations = [
    {
        id: 1,
        text: "החתלתול הקטן הלך לאיבוד. עזרו לנו למצוא אותו!",
        src:'../images/garden.png',
        buttensSrc: ["../images/r1.png","../images/r2.png"],
        mission: false
    },
    {
        id: 2,
        text: "בצעו את המשימה והיכנסו לחדר הבא",
        buttens: [],
        mission: false
    },
    {
        id: 3,
        text: "הקשב!!! יש יללות חתול! המשימה עכשיו למצוא את החתלתול!",
        buttens: [],
        mission: false
    }
];

let timer;
let loc =0;
/*פונקצייה שמקבלת מיקום דף מציגה את מראה הדף ומקלידה את הטקסט של הדף בזמן אמת ע"י פונקציית טייפ פנימית */
export function showLocation(currentId) {
 
    const room = document.getElementById('room');
    // ניקוי החדר לפני הוספת תוכן חדש

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

    const currentData = textsForlocations[loc];
    
    // בדיקה אם קיימים כפתורים להצגה 
    const sources = currentData.buttensSrc || [];
    //הוספת כפתורי רמזים והסברים
   sources.forEach((src, i) => {
        let btnImg = document.createElement('img');
        btnImg.src = '../images/dest.png'; // התמונה הקטנה שעליה לוחצים
        btnImg.id = `btn_${loc}_${i+1}`;
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

} 

