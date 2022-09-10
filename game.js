const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

let canvasSize;
let elementsSize;

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

  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  for (let i = 1; i <= 10; i++) {//Cambia de columna
    console.log(i);
    for (let j = 1; j <= 10; j++) {//Llena la columna
      game.fillText(emojis["X"], elementsSize * i + 5, elementsSize * j);
      console.log(j);
      /*Al ejecutar el primer bucle y seguido el bucle anidado,
      conservamos del primer valor del bucle que la i, 
      para luego ejecutar mas veces el segundo bucle hasta llenar
      la columna y al terminar empieza ejecutar el 
      primer bucle cambiando el valor de i y con ello cambiar la
      columna a llenar  */
    }
  }
}
