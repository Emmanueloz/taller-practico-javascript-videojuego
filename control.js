window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveByKeys(event) {
  console.log(visibleMenu);
  if (event.keyCode == 38 || event.keyCode == 87) moveUp();
  else if (event.keyCode == 37|| event.keyCode == 65) moveLeft();
  else if (event.keyCode == 39|| event.keyCode == 68) moveRight();
  else if (event.keyCode == 40|| event.keyCode == 83) moveDown();
}
function moveUp() {
  if (!visibleMenu) {
    console.log("Me quiero mover hacia arriba");

  if ((playerPosition.y - elementsSize) < elementsSize) {
      //console.log("OUT");
    } else {
      playerPosition.y -= elementsSize;
      startGame();
    }
  }
  }

function moveLeft() {
  if (!visibleMenu) {
    if (playerPosition.x - elementsSize + 1 < elementsSize) {
      //console.log("OUT");
    } else {
      playerPosition.x -= elementsSize;
      startGame();
    }
  }
}

function moveRight() {
  if (!visibleMenu) {
    if (playerPosition.x + elementsSize - 1 > canvasSize) {
      //console.log("OUT");
    } else {
      playerPosition.x += elementsSize;
      startGame();
    }
  }
}

function moveDown() {
  if(!visibleMenu){
    if (playerPosition.y + elementsSize - 1 > canvasSize) {
      //console.log("OUT");
    } else {
      playerPosition.y += elementsSize;
      startGame();
    }
  }
}