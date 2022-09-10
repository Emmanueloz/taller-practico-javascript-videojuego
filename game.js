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

  game.font = `${elementsSize}px Verdana`;//Tamaño del emoji del tamaño del cuadrado
  game.textAlign = "end"; //Alineación del emoji

  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  /* .trim es una función que funciona en stings para 
  quitar espacios, split es para crear un array de arrays 
  de un string dividiendo por algún carácter en este casa 
  el "\n" que es un salto de linea */
  console.log(mapRows, mapRowCols);

  for (let row = 1; row <= 10; row++) {
    //Cambia de fila
    for (let col = 1; col <= 10; col++) {
      //Llena la fila
      game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col + 8, elementsSize * row - 8);
      /*Al ejecutar el primer bucle y seguido el bucle anidado,
      conservamos del primer valor del bucle que la row, 
      para luego ejecutar mas veces el segundo bucle hasta llenar
      la columna y al terminar empieza ejecutar el 
      primer bucle cambiando el valor de row y con ello cambiar la
      columna a llenar  */
    }
  }
}
