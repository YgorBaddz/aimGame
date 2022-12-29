const startBtn = document.querySelector('#start'),
screens = document.querySelectorAll('.screen'),
timeList = document.querySelector('#time-list'),
timeEl = document.querySelector('#time'),
board = document.querySelector('#board'),
reloadBtn = document.querySelector('#reloadBtn');

let time = 0, score = 0;
const circle = document.createElement('div');

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        randColorsForCircle();
        startGame();
    }
});

reloadBtn.addEventListener('click', (event) => {
    location.reload();
});

board.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
        event.target.classList.background = randColorsForCircle();
    }
});

function startGame() {
    reloadBtn.style.display = 'none';
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
};

function decreaseTime() {
    if(time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
};

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
};

function createRandomCircle() {
    // const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);
};

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

function finishGame(params) {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Score:<span class="primary"> ${score}</span></h1>`;
    reloadBtn.classList.add('reload');
    reloadBtn.style.fontSize = '20px';
    reloadBtn.style.display = 'block';
    board.append(reloadBtn);
};

function randColorsForCircle() {
    const red = Math.floor(Math.random() * 256);
	const green = Math.floor(Math.random() * 256);
	const blue = Math.floor(Math.random() * 256);

    circle.style.background = `rgb(${red}, ${green}, ${blue})`;
};