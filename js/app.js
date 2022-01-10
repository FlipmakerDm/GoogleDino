const dinoStart = document.querySelector('.dino_start');
const dinoRun = document.querySelector('.dino_run');
const dinoDown = document.querySelector('.dino_down');
const dinoDead = document.querySelector('.dino_dead');
dinoStart.style.display = 'block';

let dinoHeight = 0;

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space' || event.code === 'ArrowUp') {
    console.log('Up');
    //if (dinoHeight > 0) return;
    jump();
  }
  if (event.code === 'ArrowDown') {
    console.log('Domn');
  }
});

function jump() {
  let value = 1;

  const jumpTimer = setInterval(() => {
    if (dinoHeight > 70) {
      value = -1;
    }
    if (dinoHeight < 0) {
      clearInterval(jumpTimer);
    }
    dinoHeight += value;
    dinoStart.style.bottom = dinoHeight + 'px';
  }, 5);

  // console.dir(dinoStart);
}
