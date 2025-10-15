let table;

function preload() {
  // put preload code here
  //"csv" -> formato delfile, "header" -> se contiene il nome delle colonne
  table = loadTable("assets/dataset.csv", "csv", "header");
}

function setup() {
  let outerPadding = 30;
  let snowFlakeSize = 80;
  let padding = 20;

  //calcolo il numero di colonne
  let nCol = floor((windowWidth - outerPadding * 2) / (snowFlakeSize + padding));

  //calcolo il numero di righe
  let nRow = ceil((table.getRowCount() / nCol));

  //calcolo l'altezza totale della pagina
  let totHeight = outerPadding * 2 + (nRow - 1) * padding + nRow * snowFlakeSize;

  //creo il canvas
  createCanvas(windowWidth, totHeight);
  background('#000038');

  //calcolo min e max per normalizzare
  let allValues = table.getColumn('column0');
  let minVal = min(allValues);
  let maxVal = max(allValues);

  let actualCol = 0;
  let actualRow = 0;

  //console.log(nCol, nRow);

  for(let rowNumber = 0; rowNumber < table.getRowCount; rowNumber++){
    //carico i dati della riga
    let data = table.getRow(rowNumber).obj;

    //prendo valore per dimensione
    let value = float(data['column0']);

    //normalizzo il valore per dimensioni e dettagli
    let size = map(value, minVal, maxVal, 20, snowFlakeSize - 10);
    let nArms = map(value, minVal, maxVal, 3, 8);

    let xPos = outerPadding + actualCol * (snowFlakeSize + padding) + snowFlakeSize / 2;
    let yPos = outerPadding + actualRow * (snowFlakeSize + padding) + snowFlakeSize / 2;

    drawSnowFlake(x, y, size, arms, value);

    //aumenta actualCol di 1
    actualCol++;

    //se arriva a fine riga va a capo
    if(actualCol >= nCol) {
      actualCol = 0;
      actualRow++;
    }
  }
}

function drawSnowFlake(x, y, size, arms, value) {
  push();
  translate(x, y);

  for(let i = 0; i < arms; i++) {
    let angle = (TWO_PI / arms) * i;

    //braccio principale
    line(0, 0, cos(angle) * size, sin(angle) * size);

    //ramificazioni laterali (più per valori alti)
    let ramLat = floor(map(value, min(table.getColumn('column0')), max(table.getColumn('column0')), 1, 3));

    for(let nArms; nArms <= ramLat; nArms++) {
      let ramPos = nArms * (size / (ramLat + 1));
      let ramLength = size * 0.3;

      //ramificazione destra
      let ramDx = angle + PI / 6;

      line(
        cos(angle) * ramPos,
        sin(angle) * ramPos,
        cos(angle) * ramPos + cos(ramDx) * ramLength,
        sin(angle) * ramPos + sin(ramDx) * ramLength
      );
    }

    //piccoli dettagli all'estremità
    //piccole croci all'estermità
  }

  //cerchio centrale (più grande per valori alti)
  let centerSize = map(value, min(table.getColumn('column0')), max(table.getColumn('column0')), 2, 8);
  fill(blueshade);
  noStroke();
  ellipse(0, 0, centerSize, centerSize);

  pop();
}

function draw() {
  // put drawing code here
}