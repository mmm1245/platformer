var pl;

var platforms;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pl = new Player(55, -100);
  platforms = [];
  platforms.push(new Platform(100, 500, 200, 30, loadImage('assets/platform1.png'), pl, 0));
  platforms.push(new Platform(200, 400, 200, 30, loadImage('assets/platform1.png'), pl, 0));
}

function draw() {
  background(220);
  pl.draw();
  pl.onGround = false;
  platforms.forEach(element => {
    element.render();
    if(element.platformmode == -1){
      //lose
    }
    if(element.platformmode == 1){
      //win
    }
    if(element.collideTop(pl)){
      pl.velY = 0;
      pl.onGround = true;
    }
    if(element.collideBottom(pl)){
      pl.velY = -1;
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}