const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUP = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

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
  playerPosition.x = undefined
  playerPosition.y = undefined
  startGame();
}

function startGame() {
  //console.log({ canvasSize, elementsSize });

  game.font = `${elementsSize}px Verdana`; //Tamaño del emoji del tamaño del cuadrado
  game.textAlign = "end"; //Alineación del emoji

  const map = maps[0]; //Mapa seleccionado
  const mapRows = map.trim().split("\n"); //Filas del Mapa
  const mapRowCols = mapRows.map((row) => row.trim().split("")); //Array de arrays fila, elemento de la fila
  /* .trim es una función que funciona en stings para 
  quitar espacios, split es para crear un array a partir de 
  un string dividiendo por algún carácter en este casa 
  el "\n" que es un salto de linea */
  //console.log(mapRows, mapRowCols);

  //Recorremos el array para dibujarlo en el canvas
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
      }

      game.fillText(emoji, posX, posY);
      //console.log({row, colI, col,rowI});
    });
  });

  movePlayer();
}

function movePlayer() {
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
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

function moveUp() {
  if (playerPosition.y <= elementsSize + 1) {
    console.log("no se mueve", playerPosition.y, elementsSize);
  } else {
    console.log("se mueve", playerPosition.y, elementsSize);
    playerPosition.y -= elementsSize;
    startGame();
  }
  console.log("Arriba");
}

function moveLeft() {
  if (playerPosition.x <= elementsSize + 1) {
    console.log("no se mueve",);
  } else{
    console.log("se mueve");
    playerPosition.x -= elementsSize;
    startGame();
  }
  console.log("Izquierda", playerPosition.x, elementsSize, canvasSize);
}

function moveRight() {
  if (playerPosition.x >= canvasSize) {
    console.log("no se mueve");
  } else {
    console.log("se mueve");
    playerPosition.x += elementsSize;
    startGame();
  }

  console.log("Derecha",playerPosition.x,elementsSize, canvasSize);
}

function moveDown() {
  if (playerPosition.y >= canvasSize) {
    console.log("no se mueve", playerPosition.y, canvasSize);
  } else {
    console.log("se mueve", playerPosition.y, canvasSize);
    playerPosition.y += elementsSize;
    startGame();
  }
  console.log("Abajo");
}
