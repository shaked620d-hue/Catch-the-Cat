// data.js
export const textsForlocations = [
    {
        id: 1,
        text: "החתלתול הקטן הלך לאיבוד. עזרו לנו למצוא אותו!",
        src:'../images/garden.png'
    },
    {
        id: 2,
        text: "בצעו את המשימה והיכנסו לחדר הבא",
    },
    {
        id: 3,
        text: "הקשב!!! יש יללות חתול! המשימה עכשיו למצוא את החתלתול!"
    }
];

let timer;
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
            // הסרת הטקסט אחרי סיום הכתיבה (לפי הקוד המקורי שלך)
            // firstText.remove(); 
            //showChoices();
        }
    };

    clearTimeout(timer);
    type();
}