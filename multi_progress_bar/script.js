const progress = document.querySelector('.progress');
const iconsWrapper = document.querySelectorAll('.icon__wrapper');
const prevbtn = document.querySelector('.prev__btn');
const nextbtn = document.querySelector('.next__btn');

let currentSelectedStep = 1;

nextbtn.addEventListener('click',()=>{
    if (currentSelectedStep < iconsWrapper.length) {
        currentSelectedStep++;
    }

    handleUpdateStep();
});


prevbtn.addEventListener('click',()=>{
    if (currentSelectedStep > 1) {
        currentSelectedStep--;
    }

    handleUpdateStep();
});


function handleUpdateStep(){
    iconsWrapper.forEach((item,ind)=>{
        if (ind < currentSelectedStep) {
            setTimeout(() => {
                item.classList.add('active');
            }, 500);
        }
        else{
            item.classList.remove('active');
        }
        progress.style.width = (currentSelectedStep - 1) / (iconsWrapper.length - 1) * 100 + '%';

        if (currentSelectedStep === 1) {
            prevbtn.disabled = true;
        }
        else if (currentSelectedStep === iconsWrapper.length) {
            nextbtn.disabled = true;
        }
        else{
            prevbtn.disabled = nextbtn.disabled = false;
        }
        
    });
}