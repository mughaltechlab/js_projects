let limit = 12;
let skip = 0;
const productWrapper = document.querySelector('.data');
const loadBtn = document.querySelector('.loadMore');

async function fetchProductList(){
    try {
        const url = `https://dummyjson.com/products?limit=${limit}&skip=${ skip === 0? 0 : skip*12}&select=title,price,thumbnail`;
        const resp = await fetch(url);
        const result = await resp.json();
    
        if (result && result.products) displayProducts(result.products);
    } catch (err) {
        console.error(err);
    }
}


function displayProducts(productsList){

    productsList.forEach(item=>{
        const id = item.id;
        const title = item.title;
        const price = item.price;
        const thumb = item.thumbnail;

        // create elements

        // product div
        const product = document.createElement('div');
        product.className = 'product';
        // product-id
        const productId = document.createElement('div');
        productId.className = 'product-id';
        productId.textContent = id;
        // product-price
        const productPrice = document.createElement('div');
        productPrice.className = 'product-price';
        productPrice.textContent = price;
        // product-title
        const productTitle = document.createElement('div');
        productTitle.className = 'product-title';
        productTitle.textContent = title;
        // product-body
        const productBody = document.createElement('div');
        productBody.className = 'product-body';
        // product-thumb
        const productThumb = document.createElement('img');
        productThumb.className = 'product-img';
        productThumb.src = thumb;

        productBody.append(productThumb);
        
        product.appendChild(productPrice);
        product.appendChild(productTitle);
        product.appendChild(productBody);
        product.appendChild(productId);
        productWrapper.append(product);
    });
    if (productWrapper.children.length === 100) {
        loadBtn.setAttribute('disabled','true');
        loadBtn.style.cursor = 'no-drop';
    }
    
}


loadBtn.addEventListener('click', ()=>{
    skip += 1 ;

    fetchProductList(skip);

    // console.log(`skip: ${skip}`);
    // console.log(`limit: ${limit}`);
});




fetchProductList();