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
        correctAnswer: "8",
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
        text: "בצעו את המשימה והיכנסו לחדר הבא",
        src:'../images/livingRoom.png',
        buttensSrc: ["../images/l1.png","../images/l2.png"],
        missionItems:["../images/item1.png","../images/item2.png","../images/item3.png",
            "../images/item4.png","../images/item5.png"],
        counter:0
    },
    {
        id: 3,
        text: "הקשב!!! יש יללות חתול! המשימה עכשיו למצוא את החתלתול!",
        src:'../images/bedRoom.png',
        buttensSrc: [],
        btnSrc: "../images/tail.png",
        missionItems:[]
    },
    {
        id:4,
        text: "כל הכבוד! מצאתם את החתול עכשיו תוכלו להאכיל אותו",
        src: "../images/find.png",
        buttensSrc:[],
        food: ["../images/fish.png"]


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
    firstText.className = 'firstText'
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
            mission3_find();
            break;
        case 3:
             mission4_drag();
             break;
    }
 }

  function mission1_quiz()
 {  
    const opt = document.getElementById('options');
    const missionBtn = document.createElement('button');
    const form = document.createElement('form');
    form.id = 'mission1'

    for(let i =0; i<textsForlocations[loc-1].missionItems.length; i++)
    {
        const label = document.createElement('label');
        label.textContent = textsForlocations[loc-1].missionItems[i].question;
        label.style.display = 'block';
        form.appendChild(label);

        const input = document.createElement('input');
        input.type = 'number';
        input.id = `answer-input_${i+1}`;
        input.placeholder = 'הקש תשובה במספרים...';
        input.required = true;
        form.appendChild(input);
    }

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.id="submit_btn";
    submitBtn.textContent = 'שלח תשובה';
    form.appendChild(submitBtn);

    opt.appendChild(form); 
    form.onsubmit = (e)=> {
        e.preventDefault();
        let correct = true;
        for(let i =0; i<textsForlocations[loc-1].missionItems.length; i++)
        {
            const answer = document.getElementById(`answer-input_${i+1}`);
            if(answer.value !==textsForlocations[loc-1].missionItems[i].correctAnswer)
            {
                correct = false;
                break;
            }
        }
        if(correct)
        {
         nextPlace();
        } 
    }
 }




 function mission2_collect()
 {  const p = document.createElement('p');
        p.id = 'counter_p'
         p.textContent = "פריטים = 0";
        options.appendChild(p);
     const current = textsForlocations[loc-1];
    
    const sources = current.missionItems || [];
    sources.forEach((src, i) => {
        let btnImg = document.createElement('img');
        btnImg.src = `../images/item${i+1}.png`; 
        btnImg.id = `item_${i+1}`;
        btnImg.className = 'item-click'; 
        options.appendChild(btnImg);
        
        btnImg.onclick = ()=> {
            btnImg.remove();
            current.counter++;
            p.textContent = "פריטים = " +  current.counter;
            if(current.counter===5)
            nextPlace();
        }
        
    });
   
    }

          function  mission3_find()
      {
             const opt = document.getElementById('options');
                let btnImg = document.createElement('img');
                btnImg.src=textsForlocations[loc-1].btnSrc;
                btnImg.id = 'tail';
                btnImg.className = 'find-tail'; // קלאס חדש ל-CSS
                opt.appendChild(btnImg);

                btnImg.onclick=()=>{
                    nextPlace();
                }

      }


      function mission4_drag()
      {
         const opt = document.getElementById('options');
         const room = document.getElementById('room');
         const current = textsForlocations[loc-1];
         const items = document.createElement('div');
         items.id = 'items';


         const dragItem = document.createElement('img');
         dragItem.src = current.food[0];
         dragItem.id = 'drag_item';
         dragItem.className = 'draggable';
         dragItem.draggable = true;
         items.appendChild(dragItem);

         if(!room.querySelector('div')){
         const dropArea = document.createElement('div');
         dropArea.id = 'dropArea';
         room.appendChild(dropArea);

         dragItem.ondragstart = (e) => {
            e.dataTransfer.setData("text",e.target.id);
         }

         dropArea.ondragover = (e)=>{
            e.preventDefault();
                e.dataTransfer.dropEffect = "move"; // 👈 זה חשוב!
            dropArea.classList.add('hover');
         }
         dropArea.ondragleave = ()=>{
            dropArea.classList.remove('hover');
         }

         dropArea.ondrop = (e)=>{
            e.preventDefault();
             const data = e.dataTransfer.getData("text");
            const draggedElement = document.getElementById(data);
            draggedElement.remove();
        
        dropArea.replaceChildren();
        dropArea.classList.remove('hover');

        if (document.querySelectorAll('.draggable').length === 0) {
        setTimeout(() => {
            window.location.href = "finish.html"; // 👈 מעבר דף
        }, 500);
    }
    };}
    room.appendChild(items);

}

function nextPlace()
 {
     const opt = document.getElementById('options');
     opt.replaceChildren();

     disableAndClearCircles();
     if(loc!==3){
          const nextPlace = document.createElement('button');
          nextPlace.id = 'nextPlace';
          nextPlace.textContent = 'משימה הושלמה!! לחצו שלב הבא!'
          nextPlace.className = 'mission-btn';

          nextPlace.onclick = () => {
            
             loc++;
             nextPlace.remove();
             showLocation(loc);
             };
          opt.appendChild(nextPlace);
            }
    else{
         loc++;
         showLocation(loc);
        }
 }

