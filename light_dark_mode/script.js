const  btn = document.querySelector('button');
const box = document.querySelector('.container');

btn.addEventListener('click',()=>{
    if (box.classList.contains('light')) {
        box.classList.remove('light');
        box.classList.add('dark');
    }
    else{
        box.classList.remove('dark');
        box.classList.add('light');
    }
})