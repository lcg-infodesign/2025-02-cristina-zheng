let table;

function preload() {
  // put preload code here
  //"csv" -> formato delfile, "header" -> se contiene il nome delle colonne
  table = loadTable("assets/dataset.csv", "csv", "header");
}

function setup() {
  let outerPadding = 40;
  let snowFlakeSize = 80;
  let padding = 40;

  //calcolo il numero di colonne
  let nCol = floor((windowWidth - outerPadding * 2) / (snowFlakeSize + padding));

  //calcolo il numero di righe
  let nRow = ceil((table.getRowCount() / nCol)) * 1.5;

  //calcolo l'altezza totale della pagina
  let totHeight = outerPadding * 2 + (nRow - 1) * padding + nRow * snowFlakeSize;

  //creo il canvas
  createCanvas(windowWidth, totHeight);
  background('#000038');

  //calcolo min e max per normalizzare
  let allValues0 = table.getColumn('column0');
  let allValues1 = table.getColumn('column1');
  let minVal0 = min(allValues0);
  let maxVal0 = max(allValues0);
  let minVal1 = min(allValues1);
  let maxVal1 = max(allValues1);

  let actualCol = 0;
  let actualRow = 0;

  //console.log(nCol, nRow);

  for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++){
    //carico i dati della riga
    let data = table.getRow(rowNumber).obj;

    //prendo valore per dimensione
    let value0 = float(data['column0']);
    let value1 = float(data['column1']);

    //normalizzo il valore per dimensioni e dettagli
    let size = map(value0, minVal0, maxVal0, 20, snowFlakeSize - 10);
    let nArms = map(value0, minVal0, maxVal0, 3, 8);

    //posizione sfalsata
    let offsetX = 0;
    if(actualRow % 2 === 1) {
      offsetX = (snowFlakeSize + padding) / 2;
    }

    let xPos = outerPadding + actualCol * (snowFlakeSize + padding) + offsetX + snowFlakeSize / 2;
    let yPos = outerPadding + actualRow * (snowFlakeSize + padding * 0.8) + snowFlakeSize / 2;

    xPos += snowFlakeSize / 2;
    yPos += snowFlakeSize / 2;

    drawSnowFlake(xPos, yPos, size, floor(nArms), value0, value1, minVal0, maxVal0, minVal1, maxVal1);

    //aumenta actualCol di 1
    actualCol++;

    //se arriva a fine riga va a capo
    if(actualCol >= nCol) {
      actualCol = 0;
      actualRow++;
    }
  }
}

function drawSnowFlake(x, y, size, arms, value0, value1, minVal0, maxVal0, minVal1, maxVal1) {
  push();
  translate(x, y);

  //colore basato su column0
  let blueShade = color(200, 220, 255, map(value0, minVal0, maxVal0, 150, 255));

  //spessore
  stroke(blueShade);
  strokeWeight(2);
  noFill();

  for(let i = 0; i < arms; i++) {
    let angle = (TWO_PI / arms) * i;

    //lunghezza braccio principale basata su column1
    let armLength = map(value1, minVal1, maxVal1, size * 0.3, size);

    //braccio principale
    line(0, 0, cos(angle) * armLength, sin(angle) * armLength);

    //ramificazioni laterali - n basato su column0
    let ramLat = floor(map(value0, minVal0, maxVal0, 1, 3));

    for(let j = 1; j <= ramLat; j++) {
      let ramPos = j * (armLength / (ramLat + 1));

      //lunghezza ramificazioni basata su column1
      let ramLength = map(value1, minVal1, maxVal1, size * 0.2, size * 0.4);

      //ramificazione destra
      let ramDx = angle + PI / 6;

      line(
        cos(angle) * ramPos,
        sin(angle) * ramPos,
        cos(angle) * ramPos + cos(ramDx) * ramLength,
        sin(angle) * ramPos + sin(ramDx) * ramLength
      );

      //ramificazione sinistra
      let ramSx = angle - PI / 6;

      line(
        cos(angle) * ramPos,
        sin(angle) * ramPos,
        cos(angle) * ramPos + cos(ramSx) * ramLength,
        sin(angle) * ramPos + sin(ramSx) * ramLength
      ); 
    }

    //piccoli dettagli all'estremità
    if(value0 > (maxVal0 * 0.7)) {
      let endX = cos(angle) * armLength;
      let endY = sin(angle) * armLength;

      //piccole croci all'estremità
      strokeWeight(1);
      line(endX - 2, endY - 2, endX + 2, endY + 2);
      line(endX + 2, endY - 2, endX - 2, endY + 2);
      strokeWeight(2);
    }
  }

  //cerchio centrale - dimensione basata su column0
  let centerSize = map(value0, minVal0, maxVal0, 2, 8);
  fill(blueShade);
  noStroke();
  ellipse(0, 0, centerSize, centerSize);

  pop();
}

function draw() {
  // put drawing code here
}