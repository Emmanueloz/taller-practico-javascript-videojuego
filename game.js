const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

let canvasSize;
let elementsSize;

window.addEventListener("load", setCanvasSize);//cuando termine de cargar
window.addEventListener("resize", setCanvasSize);// nuevo tamaño de pantalla

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  for (let i = 1; i <= 10; i++) {
    game.fillText(emojis["X"], elementsSize, elementsSize * i);
  }
}
