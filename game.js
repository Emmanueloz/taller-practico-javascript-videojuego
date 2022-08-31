const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
  /* game.fillRect(0, 50, 100, 100);// crea una figura rectangular los dos primeros datos es el inicio y el segundo es su final (x,y,x,y)
  game.clearRect(50, 50, 50, 50);// Crea un rectángulo como borrador se usa los mismos datos que al crear un rectángulo 
  game.clearRect();
  game.clearRect(0, 0, 50, 50); */
  
  game.font = '25px Verdana'//Estilos de fuentes tipográficas
  game.fillStyle = 'purple'//Estilos que se aplica
  game.textAlign = 'start'//Alineación del texto , se especifica si las coordenadas que se le de se usara donde inicia el texto o donde termina
  game.fillText('David', 25, 25)//Coloca un texto, y se coloca las coordenadas donde se inicia el texto
}