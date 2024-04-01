const card = document.querySelector('.card');
const searchbtn = document.querySelector('.searchbtn');
const searchInp = document.querySelector('.searchInp');

searchbtn.addEventListener('click',()=>{
    fetchGithubUser();
});


async function fetchGithubUser(){
    const query = searchInp.value;
    const url = `https://api.github.com/users/${query}`;
    const resp = await fetch(url);
    const user = await resp.json();

    card.style.display = 'flex';

    if (resp.ok) {
        card.innerHTML = `<img src="${user.avatar_url}" alt="user's rofile image">
        <div class="detail">
        
        <h1>${user.name}</h1>
        
        <p>Created at: ${user.created_at}</p>
        <p>Followers: ${user.followers}</p>
        <p>Following: ${user.following}</p>
        <!-- repos -->
        <p>Repo: ${user.public_repos}</p>
        <!-- profile url -->
        <p class="profBtn"><a href="${user.html_url}">Go to Profile</a></p>
        </div>`;
    }
    else{
        card.innerHTML = 'Please enter a correct repo username';
    }
        console.log(resp.ok);
}