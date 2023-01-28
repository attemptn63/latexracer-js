let en1k, en10k, en25k, en450k, latex;
let correct, wrong;
let button50, button100, button120;
let words, wordcnt = 50, stringsofar = "",errors = "", index = 0, ydivider = 50 * 50 * -0.000285714 + 50 * 0.112857 - 1.42857
let starttime, endtime, hasstarted = false;
let invalidkeys = [9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 46, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 173, 174, 175, 181, 182, 183, 224, 225, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255];
function preload() {
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
  setbutton(button50, width / 16 + 35, height / 8 + 35, "50")
  button50.stroke = "#d5ad16";
  setbutton(button100, width / 16 + 35, height / 8 + 87, "100")
  setbutton(button120, width / 16 + 35, height / 8 + 139, "120")
}
function setwords(wordcntr) {
  words = random(latex.words)
  for (let i = 0; i < wordcntr; i++) {
    words = words + " " + random(latex.words)
  }
}
function write(str, colored) {
  push();
  textSize(width / height * 11);
  fill(colored);
  textFont("Inconsolata")
  text(str, width / 4, height / (ydivider), width / 2)
  pop();
}
function setbutton(button, x, y, text) {
  button.locate(x, y);
  button.resize(50, 50);
  button.color = "#323437";
  button.textColor = correct
  button.stroke = "#323437";
  button.text = text;
  button.onPress = function () {
    button50.stroke = "#323437";
    button100.stroke = "#323437";
    button120.stroke = "#323437";
    button.stroke = "#d5ad16";
    wordcnt = int(text);
    setwords(wordcnt);
    stringsofar = "";
    errors = "";
    index = 0;
    ydivider = wordcnt * wordcnt * -0.000285714 + wordcnt * 0.112857 - 1.42857
  }
}
function draw() {
  background("#323437");
  fill(correct);
  textSize(width / height * 11);
  text("Length of text: ", width / 16, height / 8);
  button50.draw();
  button100.draw();
  button120.draw();
  textWrap(CHAR);
  write(words, color("#646669"));
  write(stringsofar, correct);
  write(errors, wrong);
}
function keyPressed() {
  if (invalidkeys.includes(keyCode)) {
    return;
  }
  if(index > words.length){
    return;
  }
  if(!hasstarted){
    starttime = millis();
    hasstarted = true;
  }
  if(keyCode == BACKSPACE){
    stringsofar = stringsofar.substring(0, stringsofar.length - 1);
    errors = errors.substring(0, errors.length - 1);
    index--;
    return;
  }
  else if (key == words[index]) {
    stringsofar = stringsofar + key;
    errors = errors + "\0";
    index++;
  }
  else {
    if(words[index] == " "){
      errors = errors + "_";
    }
    else errors = errors + words[index];
    stringsofar = stringsofar + "\0";
    index++;
  }
  if(index == words.length){
    endtime = millis();
    hasstarted = false;
    console.log((endtime - starttime)/1000)
    index++
  }
}