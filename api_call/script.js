const url = "https://jsonplaceholder.typicode.com/posts";
const postContainer = document.querySelector('.data');

async function fetchData(){
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    data.forEach(e=>{
        const id = e.id;
        const postTitle = e.title;
        const postBody = e.body;

        //* create elements
        // post
        const post = document.createElement('div');
        post.className = 'post';
        // post id
        const postId = document.createElement('div');
        postId.className = 'post-id';
        postId.textContent = id;
        // post title
        const postTitleEl = document.createElement('div');
        postTitleEl.className = 'post-title';
        postTitleEl.textContent = postTitle;
        // post body
        const postBodyEl = document.createElement('div');
        postBodyEl.className = 'post-body';
        postBodyEl.textContent = postBody;

        // append elements in post ;
        post.append(postId);
        post.append(postTitleEl);
        post.append(postBodyEl);
        // append post in postContainer
        postContainer.append(post);

        // console.log(postTitle)
    })
}

fetchData();