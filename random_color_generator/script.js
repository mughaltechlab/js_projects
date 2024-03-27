const hexBtn = document.querySelector('.hex-btn');
const hexContainer = document.querySelector('.hex-container');
const hexValue = document.querySelector('.hex-value');
const hexCopyBtn = document.querySelector('.hex-copy-value');


let charSet = "0123456789ABCDEF";
let hexOutput = "";

console.log(charSet);
hexBtn.addEventListener('click',()=>{

    hexOutput = "";

    for(let i = 0, charSetLength = charSet.length; i < 6; ++i){
        hexOutput += charSet.charAt(Math.floor(Math.random() * charSetLength));
        // console.log(charSet.charAt(11));
    }

    hexContainer.style.background = hexBtn.style.color = hexValue.innerHTML = `#${hexOutput}`;
})

hexCopyBtn.addEventListener('click',copyTocClipboard);



// rgb color generator
const rgbContainer = document.querySelector('.rgb-container');
const rgbValue = document.querySelector('.rgb-value');
const rgbBtn = document.querySelector('.rgb-btn');
const redInp = document.getElementById('red');
const greenInp = document.getElementById('green');
const blueInp = document.getElementById('blue');
const rgbCopyBtn = document.querySelector('.rgb-copy-value');


rgbBtn.addEventListener('click',()=>{
    redVal = redInp.value;
    greenVal = greenInp.value;
    blueVal = blueInp.value;

    rgbValue.textContent = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
    rgbContainer.style.background = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
});

rgbCopyBtn.addEventListener('click',copyTocClipboard);



// function for copy text to clipboard

function copyTocClipboard(e){
    const btn = e.target;
    if (btn.classList.contains('hex-copy-value')) {
        console.log(hexOutput);
        navigator.clipboard.writeText(hexOutput);
        alert("copied to clipboard");
    }else{
        console.log(rgbValue.textContent);
        navigator.clipboard.writeText(rgbValue.textContent);
        alert("copied to clipboard");
    }
}