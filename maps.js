/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
 */

const emojis = {
  "-": " ", //Espacios en blanco
  O: "๐ช", //Puertas a mas niveles
  X: "๐ฃ", //Bombas, Obstรกculos
  I: "๐", //Premios
  PLAYER: "๐",
  BOMB_COLLISION: "๐ฅ",
  GAME_OVER: "๐",
  WIN: "๐",
  HEART: "โค๏ธ",
};

const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
/* maps.push(`
  O---XXXXXX
  XX-XX--XXX
  XX--XX-XXX
  XX-XXX-XXX
  -------XXX
  -XXX--XXXX
  -X-----XXX
  XX-XXXXXXX
  XX----XXXX
  XXXXX----I
`); */
