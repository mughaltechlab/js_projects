const btn = document.querySelector('.rippleEffect');

btn.addEventListener('click',(e)=>{

    const xCord = e.clientX - e.target.offsetLeft ;
    const yCord = e.clientY - e.target.offsetTop ;
    
    const span = document.createElement('span');
    span.style.left = `${xCord}px`;
    span.style.top = `${yCord}px`;


    btn.appendChild(span);
    
    window.setTimeout(()=>{
        span.remove();
    }, 500);
});