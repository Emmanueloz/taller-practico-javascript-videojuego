const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecords = document.querySelector("#records");
const menuGame = document.querySelector("#menu-messages");
const menuTitle = document.querySelector("#menu-title");
const menuMessage = document.querySelector("#menu-message");

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeInit;
let timePlayer;
let timeInterval;
let timeNow;
let timeRestart;

let visibleMenu = false;

let recordBefore = localStorage.getItem("record");

if (recordBefore == null) {
  recordBefore = localStorage.setItem("record", 10000000);
}

if (recordBefore) {
  spanRecords.innerHTML = recordBefore;
}

const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let enemyPositions = [];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  canvasSize = Number(canvasSize.toFixed(0))

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;
  playerPosition.x = undefined;
  playerPosition.y = undefined;

  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[level];
  //console.log("Nivel ", level); //Mapa seleccionado
  if (!map) {
    gameWin();
    return;
  }
  const mapRows = map.trim().split("\n"); //Filas del Mapa
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

  showLives();

  if (!timeInit) {
    timeInit = Date.now();
    timeInterval = setInterval(showTime, 100);
  }
  //Mostrar vidas en pantalla
  //Array de arrays fila, elemento de la fila
  /* .trim es una función que funciona en stings para
  quitar espacios, split es para crear un array a partir de 
  un string dividiendo por algún carácter en este casa 
  el "\n" que es un salto de linea */
  //console.log(mapRows, mapRowCols);

  enemyPositions = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          //console.log(playerPosition, elementsSize);
        }
      } else if (col == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == "X") {
        enemyPositions.push({
          x: posX,
          y: posY,
        });
      }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer() {
  const giftCollisionX =
    playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY =
    playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  if (giftCollision) {
    levelWin();
  }

  const enemyCollision = enemyPositions.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    gameOver();
  } else if (giftCollision && !maps[level]) {
    //console.log("Funciona");
  } else {
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
  //console.log("Subiste de nivel");
  level++;
  startGame();
}

function showRestart() {
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  timeRestart = Date.now();
  if (lives > 0) {
    timeInit = timeInit + (timeRestart - timeNow);
    timeInterval = setInterval(showTime, 100);
    //console.log("Sigues vivos");
  }
  showMenu();
  startGame();
}

function gameWin() {
  //console.log("Terminaste el juego");
  game.fillText(emojis["WIN"], playerPosition.x, playerPosition.y);
  showMenu();
  clearInterval(timeInterval);
  timeInit = undefined;
  showRecords();
  menuTitle.innerHTML = "Ganaste el juego";
  menuMessage.innerHTML = `Tu tiempo fue ${timePlayer}, te quedaron ${lives} vidas ❤️`;
  level = 0;
  lives = 3;
}

function gameOver() {
  lives--;
  //console.log("Moriste :(");
  //clearInterval(timeInterval);
  game.fillText(emojis["BOMB_COLLISION"], playerPosition.x, playerPosition.y);
  if (lives == 0) {
    timeInit = Date.now();
    level = 0;
    lives = 3;
    menuTitle.innerHTML = "GameOver";
    menuMessage.innerHTML = "Perdiste, toca reiniciar para volver a intentar";
    clearInterval(timeInterval);
  } else {
    menuTitle.innerHTML = "Moriste";
    menuMessage.innerHTML = `Te queda ${lives} vidas, presiona Reiniciar para seguir intentando`;
    //console.log(timeInit, timePlayer);
    clearInterval(timeInterval);
  }
  showMenu();
}

function showLives() {
  spanLives.innerHTML = emojis["HEART"].repeat(lives);
}

function showTime() {
  timeNow = Date.now();
  timePlayer = timeNow - timeInit;
  spanTime.innerHTML = timePlayer;
}

function showRecords() {
  recordBefore = localStorage.getItem("record");
  //console.log(recordBefore);
  if (timePlayer < recordBefore) {
    localStorage.setItem("record", timePlayer);
    //console.log(localStorage.getItem("record"));
    spanRecords.innerHTML = timePlayer;
  }
}

function showMenu() {
  if (!visibleMenu) {
    menuGame.style.display = "inline-block";
    visibleMenu = true;
  } else {
    menuGame.style.display = "none";
    visibleMenu = false;
  }
}


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
