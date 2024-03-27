const url = "https://picsum.photos/v2/list?page=1&limit=5";
const slider = document.querySelector('.slider');
const dotsContainer = document.querySelector('.dots-container');

async function fetchListOfImages() {
    try {

        const resp = await fetch(url);
        const imagesList = await resp.json();
        if(imagesList && imagesList.length > 0 ) displayImages(imagesList);
        
    } catch (error) {
        console.log(error);
    }
}

function displayImages(getImgList){
    slider.innerHTML = getImgList
    .map(item=>`
    <div class='slide'>
        <img src='${item.download_url}' alt=${item.id} />
    </div>
    `)
    .join(" ");

    dotsContainer.innerHTML = getImgList
    .map((item,index)=>`
    <span class="dot ${index===0 ? "active" : ""}" data-slide = ${index}></span>
    `)
    .join(" ");


}

fetchListOfImages();

// slide functionality

setTimeout(() => {

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    function activeDot(slide){
        document.querySelectorAll('.dot').forEach(item=>{item.classList.remove('active')});

        document.querySelector(`.dot[data-slide="${slide}"]`).classList.add('active');
    }

    function changeCurrentSlide(currentSlide){
        slides.forEach((slide,index)=>{
            slide.style.transform = `translateX(${100 * (index - currentSlide) }%)`;
        });
    }

    changeCurrentSlide(currentSlide);

    nextBtn.addEventListener('click',()=>{
        currentSlide++;
        
        if (slides.length - 1 < currentSlide) {
            currentSlide = 0;
        }

        changeCurrentSlide(currentSlide);
        activeDot(currentSlide);
    });

    prevBtn.addEventListener('click',()=>{
        currentSlide--;

        if (0 >= currentSlide) {
            currentSlide = 0;
        }

        changeCurrentSlide(currentSlide);
        activeDot(currentSlide);
    });

    dotsContainer.addEventListener('click',(e)=>{
        if (e.target.classList.contains('dot')) {
            const currentSlide = e.target.dataset.slide;

            changeCurrentSlide(currentSlide);
        }
    });


}, 1000);




