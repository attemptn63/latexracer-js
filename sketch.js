let en1k,en10k,en25k,en450k,correct,wrong;
function preload(){
  en1k = loadJSON("scripts/english_1k.json")
  en10k = loadJSON("scripts/english_10k.json")
  en25k = loadJSON("scripts/english_25k.json")
  en450k = loadJSON("scripts/english_450k.json")
  latex = loadJSON("scripts/code_latex.json")
  correct = color("#d1d0c5")
  wrong = color("#ca4754")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#323437"); 
  write(120)
}
function write(wordcnt = 50){
  let words = random(latex.words)
  for(let i = 0; i < wordcnt ; i++){
    words = words + " " + random(latex.words)
  }
  textSize(width/height * 11); 
  fill("#646669");
  textFont("Inconsolata")
  text(words, width/4 , height/(wordcnt * wordcnt * -0.000285714 + wordcnt * 0.112857 -1.42857), width/2)
}
function draw() {

}