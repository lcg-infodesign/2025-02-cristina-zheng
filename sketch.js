let table;

function preload() {
  // put preload code here
  //"csv" -> formato delfile, "header" -> se contiene il nome delle colonne
  table = loadTable("assets/dataset.csv", "csv", "header");
}

function setup() {
  //controllo se ho caricato i dati
  //scrivi sulla console del browser
  console.log(table);

  let outerPadding = 20; //padding laterali, sopra e sotto
  let padding = 10;
  let itemSize = 30;

  //calcolo il numero di colonne
  //floor -> arrotondo per difetto
  let cols = floor((windowWidth - outerPadding * 2) / (itemSize + padding));

  //divido il numero delle righe per il numero delle colonne
  let rows = ceil(table.getRowCount() / cols);

  let totalHeight = outerPadding + rows * itemSize + (rows - 1) * padding;

  //creo il canvas
  createCanvas(windowWidth, totalHeight);

  background('coral');

  let colCount = 0;
  let rowCount = 0;

  //++ -> aumenta di 1
  for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++){
    
    //carico dati della riga
    //table.getRow -> va a recuperare i dati della riga
    //.obj -> recuperare solo l'oggetto js in cui ho dati da rappresentare
    let data = table.getRow(rowNumber).obj;

    //prendo valore per dimensione
    let myValue = data["column0"];

    //calcolo min e max
    let allValues = table.getColumn("column0");
    let minValue = min(allValues);
    let maxValue = max(allValues);

    let scaledValue = map(myValue, minValue, maxValue, 1, itemSize);

    //seconda variabile per il colore
    let value2 = data["column2"];
    let allValues2 = table.getColumn("column2");
    let minValue2 = min(allValues2);
    let maxValue2 = max(allValues2);
    let mappedValue2 = map(value2, minValue2, maxValue2, 0, 1);

    let c1 = color('green');
    let c2 = color('white');

    let mappedColor = lerpColor(c1, c2, mappedValue2);

    fill(mappedColor);

    let xPos = outerPadding + colCount * (itemSize + padding);

    let yPos = outerPadding + rowCount * (itemSize + padding);

    rect(xPos, yPos, scaledValue, scaledValue);

    //aumenta colCount di 1
    colCount++;

    //controllo se sono a fine riga
    //== -> se hanno lo stesso valore
    if(colCount == cols) {
      colCount = 0;
      rowCount++;
    }
  }
}

function draw() {
  // put drawing code here
}
