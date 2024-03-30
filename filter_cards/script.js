const category = ['All', 'Kids', 'Men', 'Women'];
const cardData = [
    {
        id : 'Men',
        title: 'Men Shirt 1',
    },
    {
        id : 'Men',
        title: 'Men Shirt 2',
    },
    {
        id : 'Men',
        title: 'Men Shirt 3',
    },
    {
        id : 'Women',
        title: 'Women Shirt 1',
    },
    {
        id : 'Women',
        title: 'Women Shirt 2',
    },
    {
        id : 'Women',
        title: 'Women Shirt 3',
    },
    {
        id : 'Kids',
        title: 'Kids Shirt 1',
    },
    {
        id : 'Kids',
        title: 'Kids Shirt 2',
    },
    {
        id : 'Kids',
        title: 'Kids Shirt 3',
    },

];

const btnWrapper = document.querySelector('.btn-wrapper');
const contentWrapper = document.querySelector('.content-wrapper');

category.forEach(categ=>{
    const btn = document.createElement('button');
    btn.textContent = categ;
    btn.dataset.filter = categ;

    btnWrapper.append(btn);
});

showData();
function showData(){
    cardData.forEach(data=>{
    
        const content = document.createElement('div');
        content.id = data.id;
        content.className = 'content';
        content.textContent = data.title;
    
        contentWrapper.append(content);    
        
    });
}

Array.from(btnWrapper.children).forEach(btn=>{
    
    btn.addEventListener('click',()=>{
        Array.from(contentWrapper.children).forEach(card=>{
            if (btn.dataset.filter === 'All') {
                card.style.display = 'block';
            }else{
                if (card.id === btn.dataset.filter) {
                    console.log(card);
                    card.style.display = 'block';
                }else{
                    card.style.display = 'none';
                }
            }
        });
    })
})