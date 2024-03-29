const url = "https://api.quotable.io/quotes/random";

const quoteText = document.querySelector('p');
const quoteAuthor = document.querySelector('h2');


async function fetchQuote(){
    const resp = await fetch(url);
    const quote = await resp.json();

    const author = quote[0].author;
    const authorQuote = quote[0].content;

    quoteText.textContent = authorQuote;
    quoteAuthor.textContent = author;
    
}


document.querySelector('button').addEventListener('click',()=>fetchQuote());


fetchQuote();