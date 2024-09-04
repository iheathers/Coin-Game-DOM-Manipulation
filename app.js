let score = 0;
let moveInterval; // To store the interval ID

const frame = document.body;
const coin = document.querySelector('#coin');
const avatar = document.querySelector('#avatar');
const headingOne = document.querySelector('h3');
headingOne.innerText = 'Score: 0';

// For desktop (keyboard)
frame.addEventListener('keydown', function (e) {
  if (!moveInterval) {
    moveInterval = setInterval(() => handleMovement(e.key), 50); // Move every 50ms
  }
});

frame.addEventListener('keyup', function () {
  clearInterval(moveInterval);
  moveInterval = null; // Stop movement when key is released
});

// For mobile (touch)
let startX, startY;
frame.addEventListener('touchstart', function (e) {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

frame.addEventListener('touchmove', function (e) {
  const moveX = e.touches[0].clientX - startX;
  const moveY = e.touches[0].clientY - startY;

  const moveSensitivity = 10; // Adjust sensitivity for touch controls

  if (Math.abs(moveX) > Math.abs(moveY)) {
    if (moveX > 0 && extractPosition(avatar.style.left) + avatar.offsetWidth < window.innerWidth) {
      moveHorizontal(avatar, moveSensitivity);
      avatar.style.transform = `scale(1, 1)`;
    } else if (moveX < 0 && extractPosition(avatar.style.left) > 0) {
      moveHorizontal(avatar, -moveSensitivity);
      avatar.style.transform = `scale(-1, 1)`;
    }
  } else {
    if (moveY > 0 && extractPosition(avatar.style.top) + avatar.offsetHeight < window.innerHeight) {
      moveVertical(avatar, moveSensitivity);
    } else if (moveY < 0 && extractPosition(avatar.style.top) > 0) {
      moveVertical(avatar, -moveSensitivity);
    }
  }

  // Check for collision with the coin
  if (isTouching(avatar, coin)) {
    score += 1;
    headingOne.innerText = `Score: ${score}`;
    coin.style.top = `${Math.floor(Math.random() * (window.innerHeight - coin.offsetHeight))}px`;
    coin.style.left = `${Math.floor(Math.random() * (window.innerWidth - coin.offsetWidth))}px`;
  }

  // Update start positions for the next touchmove event
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

function handleMovement(key) {
  const moveSensitivity = 10; // Reduced sensitivity for smoother movement

  if (key === 'ArrowUp' && extractPosition(avatar.style.top) > 0) {
    moveVertical(avatar, -moveSensitivity);
  } else if (key === 'ArrowDown' && extractPosition(avatar.style.top) + avatar.offsetHeight < window.innerHeight) {
    moveVertical(avatar, moveSensitivity);
  } else if (key === 'ArrowRight' && extractPosition(avatar.style.left) + avatar.offsetWidth < window.innerWidth) {
    moveHorizontal(avatar, moveSensitivity);
    avatar.style.transform = `scale(1, 1)`;
  } else if (key === 'ArrowLeft' && extractPosition(avatar.style.left) > 0) {
    moveHorizontal(avatar, -moveSensitivity);
    avatar.style.transform = `scale(-1, 1)`;
  }

  // Check for collision with the coin
  if (isTouching(avatar, coin)) {
    score += 1;
    headingOne.innerText = `Score: ${score}`;
    coin.style.top = `${Math.floor(Math.random() * (window.innerHeight - coin.offsetHeight))}px`;
    coin.style.left = `${Math.floor(Math.random() * (window.innerWidth - coin.offsetWidth))}px`;
  }
}

function moveVertical(element, distance) {
  const position = extractPosition(element.style.top);
  element.style.top = `${position + distance}px`;
}

function moveHorizontal(element, distance) {
  const position = extractPosition(element.style.left);
  element.style.left = `${position + distance}px`;
}

function extractPosition(positionInString) {
  if (positionInString) {
    return parseInt(positionInString.slice(0, -2));
  }
  return 0;
}

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
