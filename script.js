const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const timeElem = document.querySelector('#time');
const board = document.querySelector('#board');
const allColor = ['red', 'blue', 'green', 'orange','blueviolet', 'rgb(0, 158, 163)', 'rgb(136, 1, 64)', 'rgb(136, 240, 0)'];
const {width, height} = board.getBoundingClientRect();
console.log(width, height);

let store = 0;
let time = 0;



startBtn.addEventListener('click', (event)=>{
  event.preventDefault();
  screenUp(0)
})
timeList.addEventListener('click', event =>{
  if(event.target.classList.contains('time-btn')){
    time = +(event.target.getAttribute('data-time'));
    screenUp(1);
    startGame();
  }
})

board.addEventListener('click', event =>{
  if(event.target.classList.contains('circle')){
    event.target.remove();
    store++;
    createCircle();
  }
})

function screenUp(index){
screens[index].classList.add('up')
}


function startGame(){
  console.log('ssssss')
  if(timeElem.parentElement.classList.contains('hidden')){
    timeElem.parentElement.classList.remove('hidden');
  }
  countDown(time)
  createCircle()
  
}

function countDown(numbTime){
  console.log(timeElem)
  createTime(numbTime);
 let newSetInterval = setInterval(()=>{
    if(numbTime == 0){
      
      finishGame()
      clearInterval(newSetInterval)
    }
    else{
      numbTime--;
    createTime(numbTime)
  }
  }, 1000)
  
}

function createTime(time){
  if(time < 10){
    timeElem.innerHTML = `00:0${time}`
  }
  else{
  timeElem.innerHTML = `00:${time}`;
  }
}

function createCircle(){
  let sizeCircle = randomNum(7,30)
  const circle = document.createElement('div');
  const positsionX = randomNum(0, (width - sizeCircle));
  const positsionY = randomNum(0, (height - sizeCircle));

  circle.classList.add('circle')
  circle.style.width = `${sizeCircle}px`;
  circle.style.height = `${sizeCircle}px`;
  circle.style.left = `${positsionX}px`
  circle.style.top = `${positsionY}px`
  circle.style.background = (getRandomColor())
  board.append(circle)
}

function randomNum(min, max){
  return Math.round((Math.random()*(max - min) + min))
}

function getRandomColor(){
  let key = Math.floor(Math.random() * allColor.length);
  return allColor[key];
}

function finishGame(){  
  document.querySelector('.circle').remove();
  timeElem.parentElement.classList.add('hidden');

  const alert = document.createElement('div')
  const newGameBtn = document.createElement('button');
  newGameBtn.addEventListener('click', newGame);
  newGameBtn.classList.add('newStart')
  newGameBtn.innerHTML = 'new game';
  alert.classList.add('alert')
  alert.innerHTML = `game over<br> store: ${store}`;
  board.append(alert);
  board.append(newGameBtn)

}

function newGame(){
  board.innerHTML = '';
  screens[1].classList.remove('up')
}