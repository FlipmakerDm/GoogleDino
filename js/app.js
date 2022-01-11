const dinoStart = document.querySelector('.dino_start');
const dinoRun = document.querySelector('.dino_run');
const dinoDown = document.querySelector('.dino_down');
const dinoDead = document.querySelector('.dino_dead');
const dino = document.querySelector('.dino');
dinoStart.style.display = 'block';

let dinoHeight = 0;
let dinoSpeed = 2;

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space' || event.code === 'ArrowUp') {
    if (dinoHeight > 0) return;
    dinoSpeed = 2;
    jump();
    dinoState('jump');
  }
  if (event.code === 'ArrowDown') {
    dinoSpeed = -4;
    if (dinoHeight == 0) dinoState('down');
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'ArrowDown') {
    dinoSpeed = -4;
    dinoState('run');
  }
});

let jumpAnimationFrame = null;

function jump() {
  dinoHeight += dinoSpeed;
  dinoHeight = dinoHeight < 0 ? 0 : dinoHeight;
  dino.style.bottom = dinoHeight + 'px';

  if (dinoHeight > 70) {
    dinoSpeed = -1;
  }
  if (dinoHeight <= 0) {
    cancelAnimationFrame(jumpAnimationFrame);
    dinoSpeed = 2;
    dinoState('run');
    return;
  }
  jumpAnimationFrame = requestAnimationFrame(jump);
}

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
