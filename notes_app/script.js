const form = document.getElementById('addForm');
const itemList = document.getElementById('items');
const newItem = document.getElementById('itemInp');
const filter = document.getElementById('filter');
const addBtn = document.getElementById('addBtn');


// array for storing tasks values
let listArr = [];
let updateId;
let isUpdate = false;   // work as bool
let setUpdate = null;


// events listener
form.addEventListener('submit',addItem);            // form submit event || add item into list event
itemList.addEventListener('click', removeItem);     // item remove event || list delete event
filter.addEventListener('keyup', filterItem);       // filter item 
// add event on all li.

if (localStorage.getItem('mytodoV2') != null) {
    showTodoTasks();
}



// -------FUNCTIONS------------------

// show todo tasks from local storage
function showTodoTasks(){
    // itemList.innerHTML = localStorage.getItem('mytodoV2');
    // !00000000000000000000000000000000000000000000000000000000000
    listArr = JSON.parse(localStorage.getItem('mytodoV2'));
    listArr.forEach((el,ind)=>{

        let li = document.createElement('li');
        li.classList.add('list-group-item','d-flex','justify-content-between');
        let btnDiv = document.createElement('div');  // div for edit and del btns
        btnDiv.className = 'btnDiv d-flex gap-2';
        // create edit btn
        let editBtn = document.createElement('button');       //del btn
        editBtn.className = 'btn btn-primary btn-sm edit';   // del btn class
        editBtn.appendChild(document.createTextNode('edit'));    // del btn text
        // create del btn
        let deleteBtn = document.createElement('button');       //del btn
        deleteBtn.className = 'btn btn-danger btn-sm delete';   // del btn class
        deleteBtn.appendChild(document.createTextNode('X'));    // del btn text
    
        // append edit and del btn into btnDiv
        btnDiv.append(editBtn);
        btnDiv.append(deleteBtn);
        let span = document.createElement('span');
        let newItemText = el;
        span.id = ind;
        span.className = 'span'+ind;
        span.append(newItemText);
        li.append(span);
        // append btnDiv to li
        li.append(btnDiv);
    
        // APPEND LI INTO UL LIST
        itemList.append(li);
        updateStorage();
    })
    
    // !00000000000000000000000000000000000000000000000000000000000
}

// add item function
function addItem(e){
    e.preventDefault();

    if (newItem.value == '') {
        alert("Enter Task Please");
    }
    else {
        // check that newItem value exists in an array or not
        // !000000000000000000000000000000000000000000000000000000000000000
        if (setUpdate != null) {
            // console.log(listArr.includes(newItem.value));
            console.log(setUpdate.target.parentElement.previousSibling);

            updateId =  setUpdate.target.parentElement.previousSibling.id;
    
            listArr[updateId] = newItem.value;
            document.getElementById(updateId).textContent = listArr[updateId];
            newItem.value = '';
            setUpdate = null;
            updateStorage();
        }
        // !000000000000000000000000000000000000000000000000000000000000000
        else{
    
            // store input value into an listArr
            listArr.push(newItem.value);
            newItem.value = '';
            // id for list item
            // let uniqueId = listArr.length - 1;
        
            let li = document.createElement('li');
            // li.id = uniqueId;
            // create li elment
            li.classList.add('list-group-item','d-flex','justify-content-between');
            // create button element
            let btnDiv = document.createElement('div');  // div for edit and del btns
            btnDiv.className = 'btnDiv d-flex gap-2';
        
            // create edit btn
            let editBtn = document.createElement('button');       //del btn
            editBtn.className = 'btn btn-primary btn-sm edit';   // del btn class
            editBtn.appendChild(document.createTextNode('edit'));    // del btn text
            // create del btn
            let deleteBtn = document.createElement('button');       //del btn
            deleteBtn.className = 'btn btn-danger btn-sm delete';   // del btn class
            deleteBtn.appendChild(document.createTextNode('X'));    // del btn text
        
            // append edit and del btn into btnDiv
            btnDiv.append(editBtn);
            btnDiv.append(deleteBtn);
        
        
        
        
            let span = document.createElement('span');
            let newItemText;
            listArr.forEach((el,i)=>{
                span.id = i;
                span.className = 'span'+i;
                // insert input value into this li
                newItemText = el;
            });
            span.append(newItemText);
            li.append(span);
            // append btnDiv to li
            li.append(btnDiv);
        
            // APPEND LI INTO UL LIST
            itemList.append(li);

            updateStorage();
        }
    }



    // todo edit event------------------------------------
    // !00000000000000000000000000000000000000000000000000000000
    Array.from(itemList.getElementsByTagName('li')).forEach((el)=>{
        el.addEventListener('click',(e)=>{
            // get li text
            let text = el.firstChild.textContent;
            let isEditBtn = e.target.classList;
            if (isEditBtn.contains('edit')) {
                setUpdate = e;
                newItem.value = text;
                newItem.focus();
            }
        });
    });
    // !00000000000000000000000000000000000000000000000000000000
    // todo ----------------------------------------------------
}

// remove function-------------------
function removeItem(e){
    const isBtn = e.target.classList;
    if (isBtn.contains('delete')) {
        if (confirm('Are You Sure')) {
            let li = e.target.parentElement.parentElement;
            let text = li.firstChild.textContent;
            let index = listArr.indexOf(text);
            console.log(text);
            console.log(index);
            listArr.splice(index,1);
            li.remove();
            updateStorage();
        }
    }
}

// filter item-----------------------
function filterItem(e){
    // convert text to lowercase
    let searchText = e.target.value.toLowerCase();
    // get all li from ul(itemList)
    let items = itemList.getElementsByTagName('li');
    // convert HTML collection into an array
    Array.from(items).forEach((el)=>{
        let liText = el.firstChild.textContent;

        if (liText.toLowerCase().indexOf(searchText) != -1) {
            el.style.classList = 'block';
            el.classList.add('d-flex');
        }else {
            el.classList.remove('d-flex');
            el.style.display = 'none';
        }
        
        // console.log(el.firstChild.textContent.toLowerCase());
    });
    
    // console.log(searchText);
}

// store data into localStorage-------
function updateStorage(){
    // localStorage.setItem('mytodoV2', itemList.innerHTML);

    localStorage.setItem('mytodoV2', JSON.stringify(listArr));
}