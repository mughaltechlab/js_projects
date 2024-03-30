const openModalBtn = document.querySelector('.openModal');
const modalBg = document.querySelector('.modalBg');
const closeIcon = document.querySelector('.closeIcon');
const closeBtn = document.querySelector('.close');



openModalBtn.addEventListener('click',()=>{
    modalBg.style.display = 'block';
})




closeIcon.addEventListener('click',()=>{
    modalBg.style.display = 'none';
})

closeBtn.addEventListener('click',()=>{
    modalBg.style.display = 'none';
})

window.addEventListener('click',(e)=>{
    const check = e.target.classList;
    console.log(check);
    if (check.contains('modalBg')) {
        modalBg.style.display = 'none';
    }
})