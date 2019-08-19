let $start = document.querySelector('#start');
let $game = document.querySelector('#game');

let $timeHeader = document.querySelector('#time-header');
let $resultHeader = document.querySelector('#result-header');
let $result = document.querySelector('#result');

let $time = document.querySelector('#time');
let $gameTime = document.querySelector('#game-time');

let isGameStarted = false;
let score = 0;
let color = ['#CC5034','#5C6BCC','#5CCC9A','#CCAA20','#C3A4CC','#CC1D10','#CC1D10','#CC3208','#20365C','#5C1B19'];
let elColor = 'black';


$start.addEventListener('click',startGame);


function startGame() {
    score = 0;
    setGameTime();

    $gameTime.setAttribute('disabled','true');
    isGameStarted = true;
    $start.classList.add('hide');
    $game.style.backgroundColor = 'white';
    renderBox();


    let  interval = setInterval(function () {
        // console.log('11111',time.textContent);
        let time = parseFloat($time.textContent);

        if (time <= 0 ){
            //end game
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    },100)
}

$gameTime.addEventListener('input',setGameTime);

function setGameTime() {
    let time1 = parseInt($gameTime.value);
    $time.textContent = time1.toFixed(1);
    show( $timeHeader );
    hide( $resultHeader);
}

function show($el) {
    $el.classList.remove('hide');
}
function hide($el) {
    $el.classList.add('hide');
}
function endGame() {
   isGameStarted = false;
    show($start);
    $game.style.backgroundColor = '#CCCCCC';
    $game.innerHTML = '';
    hide($timeHeader);
    show($resultHeader);
    setGameScore();
    $gameTime.removeAttribute('disabled');
}

function setGameScore() {
    $result.textContent = score.toString();
}

function renderBox() {
    let  boxSize = getRandom(30,100);
    $game.innerHTML = '';
    let box = document.createElement('div');
    let  gameSize = $game.getBoundingClientRect();
    // console.log(gameSize);
    let maxTop = gameSize.height - boxSize;
    // console.log(maxTop);
    let maxLeft = gameSize.width - boxSize;
    box.addEventListener('click',handleBoxClick);
    box.style.height = box.style.width = boxSize+'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = elColor;
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left =getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box','true');
    $game.insertAdjacentElement('afterbegin', box);
}
function handleBoxClick(event) {
    // console.log('nnnn');

    if(!isGameStarted){
        return;
    }
    if(event.target.dataset) {
        score ++;
        elColor = color[getRandom(0,color.length)];
        // console.log(score);
        
        renderBox();
    }

}

function getRandom(min,max) {
    return Math.floor(Math.random() * (max - min) + min);

}


