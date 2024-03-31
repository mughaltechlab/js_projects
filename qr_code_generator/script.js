const errMsg = document.querySelector('.errorMsg');
const qrInp = document.querySelector('.qrInp');
const qrBtn = document.querySelector('.qrBtn');
const qrContainer = document.querySelector('.qrContainer');

qrBtn.addEventListener('click',()=>{

    validateQrInp();
})



function validateQrInp(){
    
    if (qrInp.value.trim().length > 0) {
        const inp = qrInp.value.trim();
        generateQrCode(inp);
        
        qrInp.value = '';
    }
    else{

        errMsg.style.display = 'block';
        errMsg.textContent = 'Please enter text or any url for generate QR code';
        setTimeout(()=>{
            errMsg.style.display = 'none';
        }, 1500);
    }
}


function generateQrCode(myInp){
    errMsg.textContent = '';

    qrContainer.innerHTML = '';
    qrContainer.style.display = 'block';

    new QRCode(qrContainer,{
        text : myInp,
        height: 300,
        width: 300,
        colorLight: '#fff',
        colorDark: 'rgb(141, 73, 252)',
    });
    
    console.log(myInp);
}