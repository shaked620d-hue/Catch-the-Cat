
let startBtn = document.getElementById("submit");

startBtn.addEventListener('click',(event)=>{
    event.preventDefault();
        const form = document.querySelector('form');
    if(form.checkValidity()){
        const level=document.getElementById('difficulty').value;
        const name = document.getElementById('name').value;
        //העלאת הרמה - קל או קשה לוכל סטורג
        localStorage.setItem('gameLevel',level);
        localStorage.setItem('playerName',name);
        window.location.href='../pages/game.html';
    }
    else{
        form.reportValidity();
    }
})