let en1k, en10k, en25k, en450k, latex;
let correct, wrong;
let button10, button25, button50, restartbutton;
let words, wordcnt = 25, stringsofar = "", errors = "", index = 0, ydivider = 25 * 25 * 0.000444444 + 25 * -0.00777778 + 2.77778
let starttime, endtime, hasstarted = false, ended = false, deltatime;
let errorcnt = 0, correctcnt = 0;
let invalidkeys = [9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 46, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 173, 174, 175, 181, 182, 183, 224, 225, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255];
function preload() {
  en1k = loadJSON("scripts/english_1k.json")
  en10k = loadJSON("scripts/english_10k.json")
  en25k = loadJSON("scripts/english_25k.json")
  en450k = loadJSON("scripts/english_450k.json")
  latex = loadJSON("scripts/code_latex.json")
  correct = color("#d1d0c5")
  wrong = color("#ca4754")
  button10 = new Clickable();
  button25 = new Clickable();
  button50 = new Clickable();
  restartbutton = new Clickable();
  restartbutton.image = loadImage("scripts/restart.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#323437");
  setwords(wordcnt);
  setbutton(button10, width / 16 + 35, height / 3.5 + 35, "10")
  setbutton(button25, width / 16 + 35, height / 3.5 + 87, "25")
  setbutton(button50, width / 16 + 35, height / 3.5 + 139, "50")
  button25.stroke = "#d5ad16";
}
function setwords(wordcntr) {
  words = random(latex.words)
  for (let i = 0; i < wordcntr; i++) {
    words = words + " " + random(latex.words)
  }
}
function write(str, colored) {
  push();
  textSize(width / height * 12);
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
  button.textSize = 20;
  button.onPress = function () {
    button10.stroke = "#323437";
    button25.stroke = "#323437";
    button50.stroke = "#323437";
    button.stroke = "#d5ad16";
    wordcnt = int(text);
    setwords(wordcnt);
    stringsofar = "";
    errors = "";
    index = 0;
    hasstarted = false;
    ended = false;
    ydivider = wordcnt * wordcnt * 0.000444444 + wordcnt * -0.00777778 + 2.77778
  }
}
function draw() {
  if (!ended) {
    background("#323437");
    fill(correct);
    textSize(ceil(width / height * 11));
    text("Length of text: ", width / 16, height / 3.5);
    button10.draw();
    button25.draw();
    button50.draw();
    textWrap(CHAR);
    write(words, color("#646669"));
    write(stringsofar, correct);
    write(errors, wrong);
  }
  else {
    text("Time: " + deltatime + "s", width * 5 / 6, height * 5 / 16);
    text("WPM: " + round(wordcnt * 60 / deltatime), width * 5 / 6, height * 6 / 16);
    text("Accuracy: " + round(correctcnt / (correctcnt + errorcnt) * 100) + "%", width * 5 / 6, height * 7 / 16);
    restartbutton.locate(width * 5 / 6, height * 8 / 16);
    restartbutton.resize(50, 50);
    restartbutton.fitImage = true;
    restartbutton.draw();
    restartbutton.text = "";
    restartbutton.cornerRadius = 0;
    restartbutton.imageScale = 2.0;
    restartbutton.onPress = function () {
      errorcnt = 0;
      correctcnt = 0;
      stringsofar = "";
      errors = "";
      index = 0;
      hasstarted = false;
      ended = false;
      setwords(wordcnt);
      ydivider = wordcnt * wordcnt * 0.000444444 + wordcnt * -0.00777778 + 2.77778
    }
  }
}
function keyPressed() {
  if (ended) {
    return;
  }
  if (invalidkeys.includes(keyCode)) {
    return;
  }
  if (!hasstarted) {
    starttime = millis();
    hasstarted = true;
  }
  if (keyCode == BACKSPACE) {
    if(stringsofar.length != 0){
      if(stringsofar.charAt(stringsofar.length - 1) == "‎"){
        stringsofar = stringsofar.substring(0, stringsofar.length - 3);
      }
      else{
        stringsofar = stringsofar.substring(0, stringsofar.length - 1);
      }
      if(errors.charAt(errors.length - 1) == "‎"){
        errors = errors.substring(0, errors.length - 3);
      }
      else{
        errors = errors.substring(0, errors.length - 1);
      }
      index--;
    }
    return;
  }
  else if (key == words[index]) {
    stringsofar = stringsofar + key;
    errors = errors + "‎ ‎";
    index++;
    correctcnt++;
  }
  else {
    if (words[index] == " ") {
      errors = errors + "_";
    }
    else errors = errors + words[index];
    stringsofar = stringsofar + "‎ ‎";
    index++;
    errorcnt++;
  }
  if (index == words.length) {
    background("#323437");
    fill(correct);
    textSize(width / height * 11);
    text("Length of text: ", width / 16, height / 3.5);
    button10.draw();
    button25.draw();
    button50.draw();
    textWrap(CHAR);
    write(words, color("#646669"));
    write(stringsofar, correct);
    write(errors, wrong);
    endtime = millis();
    hasstarted = false;
    ended = true;
    deltatime = round((endtime - starttime) / 100);
    deltatime = deltatime / 10;
    console.log(deltatime);
  }
}