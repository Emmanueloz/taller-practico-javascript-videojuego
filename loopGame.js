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
