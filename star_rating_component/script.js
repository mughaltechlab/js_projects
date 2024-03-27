const stars = document.querySelectorAll('.fa-star-o');
const selectedRatingVal = document.querySelector('.selected-rating-value');

let currentTotalSelectedStars = -1;

stars.forEach((star,index)=>{
    star.dataset.rating = index + 1;

    star.addEventListener('mouseover', handleMouseOver);
    star.addEventListener('click', handleOnClick);
    star.addEventListener('mouseleave', handleMouseLeave);
});

function handleMouseOver(e){
    // console.log(e.target.dataset.rating);
    const currentRatingValue = e.target.dataset.rating;
    if (!currentRatingValue) return
    else handleUpdateRatingState(currentRatingValue);
}

function handleUpdateRatingState(getCurrentRaatingVal){
    for(let i = 0; i<5; i++){
        if (i < getCurrentRaatingVal) {
            stars[i].classList.replace('fa-star-o','fa-star');
        }
        else{
            stars[i].classList.replace('fa-star','fa-star-o');
        }
    }
}


function handleOnClick(e){
    const currentRatingValue = e.target.dataset.rating;
    currentTotalSelectedStars = currentRatingValue;
    handleUpdateRatingState(currentTotalSelectedStars);
    selectedRatingVal.textContent = currentTotalSelectedStars;
}

function handleMouseLeave(e){
    handleUpdateRatingState(currentTotalSelectedStars);
}

