let en1k,en10k,en25k,en450k;
function preload(){
  en1k = loadJSON("scripts/english_1k.json")
  en10k = loadJSON("scripts/english_10k.json")
  en25k = loadJSON("scripts/english_25k.json")
  en450k = loadJSON("scripts/english_450k.json")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}