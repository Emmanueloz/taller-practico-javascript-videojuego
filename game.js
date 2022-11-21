const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUP = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecords = document.querySelector("#records");
const menuGame = document.querySelector("#menu-messages");

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeInit;
let timePlayer;
let timeInterval;

let visibleMenu = false;

let recordBefore = localStorage.getItem("record");

if (recordBefore == null) {
  recordBefore = localStorage.setItem("record", 10000000);
}

if (recordBefore) {
  spanRecords.innerHTML = recordBefore;
}

console.log(recordBefore);

const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};

let enemyPositions = [];

window.addEventListener("load", setCanvasSize); //cuando termine de cargar
window.addEventListener("resize", setCanvasSize); // nuevo tamaño de pantalla

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;
  // Reset position player
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function startGame() {
  //console.log({ canvasSize, elementsSize });

  game.font = `${elementsSize}px Verdana`; //Tamaño del emoji del tamaño del cuadrado
  game.textAlign = "end"; //Alineación del emoji

  const map = maps[level];
  console.log("Nivel ", level); //Mapa seleccionado
  if (!map) {
    game.fillText(emojis["WIN"], playerPosition.x, playerPosition.y);
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

  //Recorremos el array para dibujarlo en el canvas
  enemyPositions = [];
  game.clearRect(0, 0, canvasSize, canvasSize);
  mapRowCols.forEach((row, rowI) => {
    //primer forEach nos da el array de cada fila
    row.forEach((col, colI) => {
      //El segundo for Each nos da cada elemento dentro de la fila que usamos para guardarla en una variable
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1); //Posición en x
      const posY = elementsSize * (rowI + 1); //Posición en y

      if (playerPosition.x == undefined && col == "O") {
        if (!playerPosition.x == !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log(playerPosition, elementsSize);
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
      //console.log({row, colI, col,rowI});
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
  /* El método .find de los arrays lo que devuelve el elemento que cumpla cierta condición, también
  Podemos devolver un true o false si retornamosEl método .find de los arrays lo que devuelve el elemento que cumpla cierta condición, también
  Podemos devolver un true o false si retornamos una validación una validación */
  const enemyCollision = enemyPositions.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);

    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    gameOver();
  } else if (giftCollision && !maps[level]) {
    console.log("Funciona");
  } else {
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
  }
}

function levelWin() {
  console.log("Subiste de nivel");
  level++;
  startGame();
}

function gameWin() {
  console.log("Terminaste el juego");
  game.fillText(emojis["WIN"], playerPosition.x, playerPosition.y);
  showMenu();
  clearInterval(timeInterval);
  showRecords();
  setTimeout(() => {
    alert("Ganaste el juego, presione  Aceptar para reiniciar");
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    level = 0;
    lives = 3;
    timeInit = undefined;
    showMenu();
    startGame();
  }, 200);
}

function gameOver() {
  lives--;
  console.log("Moriste :(");
  game.fillText(emojis["BOMB_COLLISION"], playerPosition.x, playerPosition.y);
  if (lives == 0) {
    timeInit = Date.now();
  }
  showMenu();
  setTimeout(() => {
    alert(
      "Moriste te quedan " + lives + " vidas. presiona Aceptar para reiniciar"
    );
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    if (lives == 0) {
      level = 0;
      lives = 3;
    }
    console.log("Vidas: ", lives, "Nivel ", level);
    showMenu();
    startGame();
  }, 100);
}

function showLives() {
  spanLives.innerHTML = emojis["HEART"].repeat(lives);
}

function showTime() {
  timePlayer = Date.now() - timeInit;
  spanTime.innerHTML = timePlayer;
}

function showRecords() {
  recordBefore = localStorage.getItem("record");
  console.log(recordBefore);
  if (timePlayer < recordBefore) {
    localStorage.setItem("record", timePlayer);
    console.log(localStorage.getItem("record"));
    spanRecords.innerHTML = timePlayer;
  }
}

function showMenu() {
  if (!visibleMenu) {
    menuGame.style.display = "inline-block";
    return (visibleMenu = true);
  } else {
    menuGame.style.display = "none";
    return (visibleMenu = false);
  }
}

window.addEventListener("keydown", moveByKeys);
btnUP.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}
//Funciones de movimiento
function moveUp() {
  if (playerPosition.y - elementsSize + 1 < elementsSize) {
    console.log("OUT");
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  }
}

function moveLeft() {
  if (playerPosition.x - elementsSize + 1 < elementsSize) {
    console.log("OUT");
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
}

function moveRight() {
  if (playerPosition.x + elementsSize - 1 > canvasSize) {
    console.log("OUT");
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
}

function moveDown() {
  if (playerPosition.y + elementsSize - 1 > canvasSize) {
    console.log("OUT");
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}
