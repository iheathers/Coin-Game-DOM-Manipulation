function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

let score = 0;

const frame = document.body;
const coin = document.querySelector('#coin');
const avatar = document.querySelector('#avatar');
const headingOne = document.querySelector('h3');
headingOne.innerText = 'Score: 0';

frame.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowUp' && extractPosition(avatar.style.top) > 0) {
    moveVertical(avatar, -25);
  } else if (
    e.key === 'ArrowDown' &&
    extractPosition(avatar.style.top) < window.innerHeight
  ) {
    moveVertical(avatar, 25);
  } else if (
    e.key === 'ArrowRight' &&
    extractPosition(avatar.style.left) < window.innerWidth
  ) {
    moveHorizontal(avatar, 25);

    avatar.style.transform = `scale(1, 1)`;
  } else if (e.key === 'ArrowLeft' && extractPosition(avatar.style.left) > 0) {
    moveHorizontal(avatar, -25);
    avatar.style.transform = `scale(-1, 1)`;
  }

  if (isTouching(avatar, coin)) {
    console.log(score);
    score = score + 1;
    headingOne.innerText = `Score: ${score}`;
    coin.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
    coin.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
  }
});

function moveVertical(element, distance) {
  const position = extractPosition(avatar.style.top);
  element.style.top = `${position + distance}px`;
}

function moveHorizontal(element, distance) {
  const position = extractPosition(avatar.style.left);
  element.style.left = `${position + distance}px`;
}

function extractPosition(positionInString) {
  if (positionInString) {
    return parseInt(positionInString.slice(0, -2));
  }
  return 0;
}
