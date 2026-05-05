
let startBtn = document.getElementById("submit");

startBtn.addEventListener('click',(event)=>{
    event.preventDefault();
        const form = document.querySelector('form');
    if(form.checkValidity())
    window.location.href='../pages/game.html';
    else{
        form.reportValidity();
    }
})