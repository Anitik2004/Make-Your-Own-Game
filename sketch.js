var ship;
var aliens = [];
var lasers = [];
var font;
let points = 0;

function preload() {
  alien1a = loadImage('alien1a.png');
  alien1b = loadImage('alien1b.png');
  alien2a = loadImage('alien2a.png');
  alien2b = loadImage('alien2b.png');
  font = loadFont('league-spartan.ttf');
}

function setup() {
  createCanvas(600, 400);
  frameRate(10);
  imageMode(CENTER);
  ship = new Ship();
  
  let startX = 80;
  let startY = 80;
  for (var i = 0; i < 6; i++) {
    aliens[i] = new Alien(i * startX + 80, startY, alien1a, alien1b, 5);
  }

  startY = 40;
  let offset = 0;
  for (var j = 6; j < 12; j++) {
    aliens[j] = new Alien(offset * startX + 80, startY, alien2a, alien2b, 10);
    offset++;
  }
  
}
function draw() {
  background(0);
  ship.show();
  ship.move();

  var edge = false;
  for (var i = 0; i < aliens.length; i++) {
    aliens[i].show();
    aliens[i].move();
    if (aliens[i].x + aliens[i].w / 2 > width || aliens[i].x - aliens[i].w / 2 < 0) {
      edge = true;
    }
  }

  if (edge) {
    for (var k = 0; k < aliens.length; k++) {
      aliens[k].shiftDown();
    }
  }

  for (var las = 0; las < lasers.length; las++) {
    lasers[las].show();
    lasers[las].move();

    for (var j = 0; j < aliens.length; j++) {
      if (lasers[las].hits(aliens[j])) {
        lasers[las].remove();
        points += aliens[j].pts;
        aliens.splice(j, 1);
      }
    }
  }
  
  for (var z = lasers.length - 1; z >= 0; z--) {
    if (lasers[z].toDelete) {
      lasers.splice(z, 1);
    }
  }

  updateHUD();

  if (aliens.length <= 0) {
    gameOver();
  }

}

function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}

function keyPressed() {
  if (key === ' ') {
    var laser = new Laser(ship.x + (ship.width / 2), ship.y);
    lasers.push(laser);
  }

  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}

function updateHUD() {
  fill(255);
  textFont(font);
  text("Score: " + points, 10, 20);
  textFont(font);
  text("Aliens Remaining: " + aliens.length, 120, 20);
}

function gameOver() {
  background(0);
  textSize(72);
  textAlign(CENTER);
  textFont(font);
  text("YOU WIN!!", width / 2, height / 2);
  noLoop();
}