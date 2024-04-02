const cardsList = document.querySelector('.cardsList');
const paginationNumbers = document.querySelector('.paginationNumbers');
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');




// create dummy data
function createDummyData(){
    for(let i = 0; i < 100; i++){
        const li = document.createElement('li');
        li.textContent = `Card ${i}`;
        
        cardsList.append(li);
    }
}

createDummyData();

// pagination variables
let limit = 10;
const cardsLength = cardsList.childElementCount;
let pages = Math.ceil(cardsLength/limit);
let currentPage = 1;

// crate page numbers
function createPageNumber(getCurrentIndex){
    const pageNumber = document.createElement('button');
    pageNumber.classList.add('paginationNumber');
    pageNumber.textContent = getCurrentIndex;
    pageNumber.setAttribute('page-index',`${getCurrentIndex}`);

    paginationNumbers.append(pageNumber);
}
// create pagination numbers
function createPaginationNumbers(){
    for(let i = 1; i <= pages; i++) createPageNumber(i);
}

function handleActiveCurrrentPageNum(){
    document.querySelectorAll('.paginationNumber').forEach(btn=>{
        btn.classList.remove('active-state');
        const getCurrentPageIndex = Number(btn.getAttribute('page-index'));
        if (getCurrentPageIndex === currentPage ) {
            btn.classList.add('active-state');
        }
    });
}

function handleDisableBtn(getBtn){
    getBtn.classList.add('disable');
    getBtn.setAttribute('disabled','true');
}
function handleEnableBtn(getBtn){
    getBtn.classList.remove('disable');
    getBtn.removeAttribute('disabled');
}
function handlePaginationButtonStatus(){
    if (currentPage === 1) {
        handleDisableBtn(prevBtn);
    }else{
        handleEnableBtn(prevBtn);
    }

    if (pages === currentPage) {
        handleDisableBtn(nextBtn);
    }else{
        handleEnableBtn(nextBtn);
    }
}

function handleCurrentPage(getCurrentPageNumber){
    currentPage = getCurrentPageNumber;

    handleActiveCurrrentPageNum();
    handlePaginationButtonStatus();

    const getPrevRange = (getCurrentPageNumber - 1) * limit;
    const getCurrentRange = getCurrentPageNumber * limit;

    // add hide class on li except the current range length;
    Array.from(cardsList.children).forEach((item,index)=>{
        item.classList.add('hide-item');
        if (index >= getPrevRange && index < getCurrentRange) {
            item.classList.remove('hide-item');
        }
    });
}


createPaginationNumbers();
handleCurrentPage(1);

prevBtn.addEventListener('click',()=>{
    handleCurrentPage(currentPage - 1);
});

nextBtn.addEventListener('click',()=>{
    handleCurrentPage(currentPage + 1);
});

document.querySelectorAll('.paginationNumber').forEach((btn,index)=>{
    btn.addEventListener('click',(e)=>{
        document.querySelectorAll('.paginationNumber').forEach(mybtn=>{
            mybtn.classList.remove('active-state');
        })
        btn.classList.add('active-state');
        const pgAttr = e.target.getAttribute('page-index');
        currentPage = pgAttr;
        console.log(pgAttr);
        handleCurrentPage(currentPage);
        
    });
});