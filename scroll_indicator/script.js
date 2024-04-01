const progressBar = document.querySelector('.progressBar');

window.addEventListener('scroll',()=>{

    const getScrollFromTop = document.body.scrollTop || document.documentElement.scrollTop ;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight ;
    const scrollingPercentage = (getScrollFromTop/height) * 100;
    const convert = Math.ceil(scrollingPercentage);

    progressBar.style.width = `${convert}%`;
    
});