const mainWrapper = document.querySelector('.mainWrapper');
const loaderBtn = document.querySelector('.loader');
let count = 1;




loaderBtn.addEventListener('click',()=>{
    fetchRandomImg(count+=6);
});

fetchRandomImg(count);

function fetchRandomImg(getCount){
    for(let i = count; i <= getCount + 5; i++){
        // create element
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = `https://picsum.photos/300?random=${i}`;
        // append elements
        mainWrapper.appendChild(div).appendChild(img);
    }
}

