const data = [
    {
        id : '1',
        question: "What is web development?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, autem? Velit error dolor recusandae quo maiores ",
    },
    {
        id : '2',
        question: "What is Frontend web development?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, autem? Velit error dolor recusandae quo maiores ",
    },
    {
        id : '3',
        question: "What is Backend web development?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, autem? Velit error dolor recusandae quo maiores ",
    },
]


const accordionWrapper = document.querySelector('.accordion');


function createAccordionData(){
    accordionWrapper.innerHTML = data
    .map((item)=>
        `<div class="accordionItem">
            <div class="accordionTitle">
                <h3>${item.question}</h3>
                <i class="fa-solid fa-arrow-down"></i>
            </div>
            <div class="accordionContent">
                <p>${item.answer}</p>
            </div>
        </div>          
        `
    )
    .join(" ");
}

createAccordionData();


const getAccTitle = document.querySelectorAll('.accordionTitle');

getAccTitle.forEach(currentItem =>{
    currentItem.addEventListener('click',(e)=>{
        if (currentItem.classList.contains('active')) {
            currentItem.classList.remove('active');
        }
        else{
            let getAllActiveItems = document.querySelectorAll('.active');
            getAllActiveItems.forEach(items=>{
                items.classList.remove('active');
            });
            currentItem.classList.add('active');
        }
    })
});