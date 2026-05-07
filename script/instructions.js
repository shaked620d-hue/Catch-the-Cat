const modal = document.getElementById("modal");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
/**
 * פותח את חלון המודל
 * על ידי הוספת המחלקה "show".
 */
function openModal()
{
modal.classList.add("show");
}

/**
 * סוגר את חלון המודל
 * על ידי הסרת המחלקה "show".
 */
function closeModal()
{
modal.classList.remove("show");
}
//חיבור הפונקציות לכפתורים
openBtn.addEventListener("click",openModal);
closeBtn.addEventListener("click",closeModal);

/**
 * מאזין ללחיצה על מקשים במקלדת.
 * כאשר נלחץ מקש Escape חלון המודל נסגר.
 * 
 * @param {KeyboardEvent} event אובייקט אירוע המקלדת
 */
document.addEventListener("keydown",function(event){
    if(event.key=== "Escape"){
        closeModal();
    }
});