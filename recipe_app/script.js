const url = 'https://dummyjson.com/recipes';

const recipeWrapper = document.querySelector('.recipe__wrapper');

// modal variables
const modalBg = document.querySelector('.modal__bg');
const modalTitle = document.querySelector('.modal .title');
const modalImg = document.querySelector('.modal .img img');
const modalIngredients = document.querySelector('.modal .ingredients');
const modalRecipe = document.querySelector('.modal .recipe');
const modalClose = document.querySelector('.modal .icon');

async function fetchRecipeData(){
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data.recipes);

    renderRecipeCards(data.recipes);
}

function renderRecipeCards(recipes){
    recipes.forEach((recipe)=>{
        const recipeId = recipe.id;
        const recipeTitle = recipe.name;
        const recipeImg = recipe.image;
        const recipeCuisine = recipe.cuisine;
        const recipeIngredients = recipe.ingredients;
        const recipeMealType = recipe.mealType;
        const recipeRating = recipe.rating;

        // create card element
        const card = document.createElement('div');
        card.className = 'card';
        // card__body
        const cardBody = document.createElement('div');
        cardBody.className = 'card__body';
        // title
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = recipeTitle;
        // image
        const imgDiv = document.createElement('div');
        imgDiv.className = 'image';
        const img = document.createElement('img');
        img.src = recipeImg;
        imgDiv.append(img);
        // cuisine
        const cuisine = document.createElement('div');
        cuisine.textContent = recipeCuisine;
        // mealType
        const mealType = document.createElement('div');
        mealType.textContent = recipeMealType;
        // rating
        const rating = document.createElement('div');
        rating.textContent = recipeRating;
        // button
        const recipeBtn = document.createElement('Button');
        recipeBtn.className = 'recipe__details';
        recipeBtn.id = recipeId;
        recipeBtn.textContent = 'Recipe Details';

        // append items in card body
        cardBody.append(title);
        cardBody.append(imgDiv);
        cardBody.append(cuisine);
        cardBody.append(mealType);
        cardBody.append(rating);
        cardBody.append(recipeBtn);
        card.append(cardBody);

        recipeWrapper.append(card);
        // console.log(recipeMealType);

    });
    handleRecipeBtn();
}


fetchRecipeData();

function handleRecipeBtn(){   
    // console.log(document.querySelectorAll('.recipe__details'));
    document.querySelectorAll('.recipe__details').forEach(btn=>{
        const currentRecipeCard = btn.getAttribute('id');
        btn.addEventListener('click',async()=>{
            const resp = await fetch(url);
            const data = await resp.json();
            fetchCurrentRecipeBtnData(currentRecipeCard, data.recipes);
        })
    });
}

function fetchCurrentRecipeBtnData(index, recipe){
        const recipeId = recipe[index - 1].id;
        const recipeTitle = recipe[index - 1].name;
        const recipeImg = recipe[index - 1].image;
        const recipeCuisine = recipe[index - 1].cuisine;
        const recipeIngredients = recipe[index - 1].ingredients;
        const recipeMealType = recipe[index - 1].mealType;
        const recipeInstructions = recipe[index - 1].instructions;


        modalBg.style.display = 'block' ;
        modalTitle.textContent = recipeTitle ;
        modalImg.src = recipeImg ;
        modalIngredients.innerHTML = recipeIngredients
        .map(item=>`
        <li>${item}</li>
        `)
        .join(" ") ;
        modalRecipe.innerHTML = recipeInstructions
        .map(item=>`
        <li>${item}</li>
        `)
        .join(" ");

        console.log(recipeId);
}

// close modal
modalClose.addEventListener('click',()=>modalBg.style.display='none');