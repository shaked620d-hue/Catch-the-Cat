const modal = document.getElementById("modal");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

function openModal()
{
modal.classList.add("show");
}

function closeModal()
{
modal.classList.remove("show");
}
//חיבור הפונקציות לכפתורים
openBtn.addEventListener("click",openModal);
closeBtn.addEventListener("click",closeModal);

//חיבור פונקציה למקש Escape
document.addEventListener("keydown",function(event){
    if(event.key=== "Escape"){
        closeModal();
    }
});