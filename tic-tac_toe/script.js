const boxes = document.querySelectorAll('.box');
const gameBoard = document.querySelector('.gameBoard');
const turn = document.querySelector('.turn');
const msg = document.querySelector('.msg');
const resetBtn = document.querySelector('.reset');

const player = ['X','O'];
let currentPlayer = player[0];
const winningPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

for(let i = 0; i < boxes.length; i++){
    boxes[i].addEventListener('click',()=>{
        if (boxes[i].textContent !== '') {
            return;
        }
        
        boxes[i].textContent = currentPlayer;
        if(checkWinner(currentPlayer)){
            msg.textContent = `${currentPlayer} WINS`;
            currentPlayer = '';
            return;
        }
        if (checkTie()) {
            msg.textContent = 'Game Tied..!';
        }
        // logic for changing player
        currentPlayer = currentPlayer === player[0] ? player[1] : player[0];

        if (currentPlayer === player[0]) {
            turn.textContent = player[0];
        }else{
            turn.textContent = player[1];
        }
    });
}



resetBtn.addEventListener('click', resetFucn);


function removeEvent(){
    boxes.forEach(box=>{
        box.removeEventListener('click');
    });
}

function resetFucn(){
    boxes.forEach(box=>{
        box.textContent = '';
    });

    msg.textContent = '';
    currentPlayer = player[0];
    turn.textContent = player[0];
    boxes.forEach(box=>{
        if (box.classList.contains('active')) {
            box.classList.remove('active');            
        }
    })
}


function checkWinner(currentPlayer){
    for(let i = 0; i < winningPattern.length; i++){

        const [a,b,c] = winningPattern[i];

        if (
            boxes[a].textContent === currentPlayer &&
            boxes[b].textContent === currentPlayer &&
            boxes[c].textContent === currentPlayer
        ) {
            const box0 =  boxes[a];
            const box1 =  boxes[b];
            const box2 =  boxes[c];
            box0.classList.add('active');
            box1.classList.add('active');
            box2.classList.add('active');
            return true;
        }
    }
    return false;
}

function checkTie(){
    for(let i = 0; i < boxes.length ; i++){
        if (boxes[i].textContent === '') {
            return false;
        }

    }
    return true;
}