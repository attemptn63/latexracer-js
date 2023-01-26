var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require
});
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  text(s, 100,100);
}