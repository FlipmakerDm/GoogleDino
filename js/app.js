const dinoStart = document.querySelector('.dino_start');
const dinoRun = document.querySelector('.dino_run');
const dinoDown = document.querySelector('.dino_down');
const dinoDead = document.querySelector('.dino_dead');
const dino = document.querySelector('.dino');

const bird = document.querySelector('.bird');
const caktusMany = document.querySelector('.caktus_many');
const caktusOne = document.querySelector('.caktus_one');

const border = document.querySelector('.border');

dinoStart.style.display = 'block';

const enamyStartPosition = -50;
let dinoHeight = 0;
let dinoSpeed = 4;
let enamySpeed = 3;
let birdPosition = enamyStartPosition;
let cactusManyPosition = enamyStartPosition + 50;
let cactusOnePosition = enamyStartPosition + 20;
let borderPosition = 0;
let isJump = false;

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space' || event.code === 'ArrowUp') {
    if (dinoHeight > 0) return;
    dinoSpeed = 4;
    isJump = true;
    dinoState('jump');
  }
  if (event.code === 'ArrowDown') {
    dinoSpeed = -8;
    if (dinoHeight == 0) dinoState('down');
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'ArrowDown') {
    dinoSpeed = -4;
    dinoState('run');
  }
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

function rander() {
  birdPosition += enamySpeed;
  cactusManyPosition += enamySpeed;
  cactusOnePosition += enamySpeed;
  borderPosition += enamySpeed;

  if (isJump) {
    dinoHeight += dinoSpeed;
    dinoHeight = dinoHeight < 0 ? 0 : dinoHeight;
    dino.style.bottom = dinoHeight + 'px';

    if (dinoHeight > 90) {
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
    birdPosition = enamyStartPosition;
  }
  if (cactusManyPosition > containerWidth) {
    cactusManyPosition = enamyStartPosition;
  }
  if (cactusOnePosition > containerWidth) {
    cactusOnePosition = enamyStartPosition;
  }
  if (borderPosition > containerWidth) {
    borderPosition = 0;
  }
  bird.style.right = birdPosition + 'px';
  caktusMany.style.right = cactusManyPosition + 'px';
  caktusOne.style.right = cactusOnePosition + 'px';
  border.style.transform = 'translateX(' + borderPosition * -1 + 'px)';

  flyAnimationFrame = requestAnimationFrame(rander);
}
rander();
