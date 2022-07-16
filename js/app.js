const dinoStart = document.querySelector('.dino_start');
const dinoRun = document.querySelector('.dino_run');
const dinoRun_1 = document.querySelector('.dino_run_1');
const dinoRun_2 = document.querySelector('.dino_run_2');
const dinoDown = document.querySelector('.dino_down');
const dinoDead = document.querySelector('.dino_dead');
const dino = document.querySelector('.dino');

const counter = document.querySelector('.counter');

const audioJump = document.querySelector('.audio_jump');
const audioDead = document.querySelector('.audio_dead');

const bird = document.querySelector('.bird');

const caktusMany = document.querySelector('.caktus_many');
const caktusOne = document.querySelector('.caktus_one');

const reload = document.querySelector('.reload');
const reloadBtn = document.querySelector('.btn');

const border = document.querySelector('.border');

dinoStart.style.display = 'block';

let dinoHeight = 0;
let dinoSpeed = 4;
let enamySpeed = 4;
let count = 0;
let cactusManyPosition = Math.floor(Math.random() * -1000);
let birdPosition = Math.floor(Math.random() * -1000 - 500);
let cactusOnePosition = Math.floor(Math.random() * -1000);
let borderPosition = 0;
let isJump = false;

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space' || event.code === 'ArrowUp') {
    if (dinoHeight > 0) return;
    dinoRun_1.classList.add('run_1');
    dinoRun_2.classList.add('run_2');
    dinoSpeed = 4;
    isJump = true;
    audioJump.play();
    dinoState('jump');
  }
  if (event.code === 'ArrowDown') {
    dinoSpeed = -8;
    if (dinoHeight === 0) dinoState('down');
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'ArrowDown') {
    dinoSpeed = -4;
    dinoState('run');
  }
});

reloadBtn.addEventListener('click', (event) => {
  window.location.reload();
});

function dinoState(state) {
  switch (state) {
    case 'jump':
      dinoStart.style.display = 'block';
      dinoDown.style.display = 'none';
      dinoRun.style.display = 'none';
      dinoDead.style.display = 'none';
      break;
    case 'run':
      dinoStart.style.display = 'none';
      dinoDown.style.display = 'none';
      dinoRun.style.display = 'block';
      dinoDead.style.display = 'none';

      break;
    case 'down':
      dinoStart.style.display = 'none';
      dinoDown.style.display = 'block';
      dinoRun.style.display = 'none';
      dinoDead.style.display = 'none';
      break;
    case 'dead':
      dinoStart.style.display = 'none';
      dinoDown.style.display = 'none';
      dinoRun.style.display = 'none';
      dinoDead.style.display = 'block';
      break;
  }
}
let flyAnimationFrame = null;

function startCountdown() {
  if (enamySpeed !== 0) {
    count = +counter.textContent + 1;
    counter.textContent = count;
  }
}
let gameOver = setInterval(() => {
  let dinoTop = parseInt(
    window.getComputedStyle(dino).getPropertyValue('bottom'),
  );
  let dinoHeight = dinoDown.style.display === 'block';

  let birdRight = parseInt(
    window.getComputedStyle(bird).getPropertyValue('right'),
  );
  let cactus = parseInt(
    window.getComputedStyle(caktusOne).getPropertyValue('right'),
  );
  let cactuses = parseInt(
    window.getComputedStyle(caktusMany).getPropertyValue('right'),
  );

  function dead() {
    dinoState('dead');
    enamySpeed = 0;
    clearInterval(gameOver);
    reload.style.display = 'block';
    audioDead.play();
    return;
  }

  if (dinoTop < 40 && cactus > 535 && cactus < 580) {
    dead();
  }
  if (dinoTop < 40 && cactuses > 535 && cactuses < 580) {
    dead();
  }

  if (dinoTop < 40 && !dinoHeight && birdRight > 535 && birdRight < 580) {
    dead();
  }
}, 100);

function rander() {
  if (dinoRun_1.classList.contains('run_1')) {
    startCountdown();
    birdPosition += enamySpeed;
    cactusManyPosition += enamySpeed;
    cactusOnePosition += enamySpeed;
    borderPosition += enamySpeed;
  }

  if (isJump) {
    dinoHeight += dinoSpeed;
    dinoHeight = dinoHeight < 0 ? 0 : dinoHeight;
    dino.style.bottom = dinoHeight + 'px';

    if (dinoHeight > 100) {
      dinoSpeed = -4;
    }
    if (dinoHeight <= 0) {
      dinoSpeed = 4;
      dinoState('run');
      isJump = false;
    }
  }
  const containerWidth = bird.parentNode.clientWidth + bird.scrollWidth;
  if (birdPosition > containerWidth) {
    setTimeout(() => {
      birdPosition = Math.floor(Math.random() * -4000);
    }, 0);
  }
  if (cactusManyPosition > containerWidth) {
    setTimeout(() => {
      cactusManyPosition = Math.floor(Math.random() * -1000);
    }, 30);
  }
  if (cactusOnePosition > containerWidth) {
    setTimeout(() => {
      cactusOnePosition = Math.floor(Math.random() * -2000);
    }, 60);
  }
  if (borderPosition > containerWidth) {
    borderPosition = -1;
  }
  bird.style.right = birdPosition + 'px';
  caktusMany.style.right = cactusManyPosition + 'px';
  caktusOne.style.right = cactusOnePosition + 'px';
  border.style.transform = 'translateX(' + borderPosition * -1 + 'px)';

  flyAnimationFrame = requestAnimationFrame(rander);
}
rander();
