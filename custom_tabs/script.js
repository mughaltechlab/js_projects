const tabContainer = document.querySelector('.container');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.content');


tabContainer.addEventListener('click', (e)=>{
    const currentId = e.target.dataset.id;

    if (currentId) {
         tabBtns.forEach(btn=>{
            btn.classList.remove('active');
         })

         e.target.classList.add('active');

         tabContents.forEach(content=>{
            // content.style.display = 'none';
            content.classList.remove('active');
         })
         //  document.getElementById(currentId).style.display = 'block';
         document.getElementById(currentId).classList.add('active');
        
    }
    
    
    console.log(currentId);
});