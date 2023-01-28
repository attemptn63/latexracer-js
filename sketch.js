let en1k,en10k,en25k,en450k,correct,wrong,button50,button100,button120,words,wordcnt = 50;
function preload(){
  en1k = loadJSON("scripts/english_1k.json")
  en10k = loadJSON("scripts/english_10k.json")
  en25k = loadJSON("scripts/english_25k.json")
  en450k = loadJSON("scripts/english_450k.json")
  latex = loadJSON("scripts/code_latex.json")
  correct = color("#d1d0c5")
  wrong = color("#ca4754")
  button50 = new Clickable();
  button100 = new Clickable();
  button120 = new Clickable();
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#323437"); 
  setwords(wordcnt);
  setbutton(button50, width/16+35, height/8, "50")
  setbutton(button100, width/16+35, height/8 + 52, "100")
  setbutton(button120, width/16+35, height/8 + 104, "120")
}
function setwords(wordcntr){
  words = random(latex.words)
  for(let i = 0; i < wordcntr ; i++){
    words = words + " " + random(latex.words)
  }
}
function write(wordcntr){
  background("#323437");
  fill(correct);
  textSize(width/height * 11);
  text("Length of text: ", width/16, height/8 - 35);
  button50.draw();
  button100.draw();
  button120.draw();
  push();
  textSize(width/height * 11); 
  fill("#646669");
  textFont("Inconsolata")
  text(words, width/4 , height/(wordcntr * wordcntr * -0.000285714 + wordcntr * 0.112857 -1.42857) - 35, width/2)
  pop();
}
function setbutton(button, x, y, text){
  button.locate(x, y);
  button.resize(50, 50);
  button.color = "#323437";
  button.textColor = correct
  button.stroke = "#323437";
  button.text = text;
  button.onPress = function(){
    button50.stroke = "#323437";
    button100.stroke = "#323437";
    button120.stroke = "#323437";
    button.stroke = "#d5ad16";
    wordcnt = int(text);
    setwords(wordcnt);
  }
}
function draw() {
  write(wordcnt);
}