let en1k,en10k,en25k,en450k;
function preload(){
  en1k = loadJSON("scripts/english_1k.json")
  en10k = loadJSON("scripts/english_10k.json")
  en25k = loadJSON("scripts/english_25k.json")
  en450k = loadJSON("scripts/english_450k.json")
  latex = loadJSON("scripts/code_latex.json")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#1b1b1b"); 
  let words = random(latex.words)
  for(let i = 0; i < 7; i++){
    words = words + " " + random(latex.words)
  }
  textSize(20);
  fill(255);
  text(words, 10, 10, 500)
}

function draw() {

}