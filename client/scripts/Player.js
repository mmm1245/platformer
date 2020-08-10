class Player{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.directionRight = true;

        this.asset = loadImage('assets/player1.png');
        this.asset2 = loadImage('assets/player1left.png');

        this.velY = 0;
    }

    draw(){
        textSize(13);
        fill(0, 0, 0);
        text("You", width/2, height/2-10)
        noFill();
        rect(width/2, height/2, 50, 50);
        if(this.directionRight){
            image(this.asset, width/2, height/2, 50, 50);
        } else {
            image(this.asset2, width/2, height/2, 50, 50);
        }
    }

    drawAnother(pl,name){
      textSize(13);
      fill(0, 0, 0);
      text(name, (this.pos.x-pl.pos.x+width/2), (this.pos.y-pl.pos.y+height/2)-10)
      noFill();
      rect(this.pos.x-pl.pos.x+width/2, this.pos.y-pl.pos.y+height/2, 50, 50)
      if(this.directionRight){
            image(this.asset, this.pos.x-pl.pos.x+width/2, this.pos.y-pl.pos.y+height/2, 50, 50);
        } else {
            image(this.asset2, this.pos.x-pl.pos.x+width/2, this.pos.y-pl.pos.y+height/2, 50, 50);
        }
    }

    update(){
      if(keyIsDown(RIGHT_ARROW)){
            this.pos.x += 5;
            this.directionRight = true;
        } 
        if(keyIsDown(LEFT_ARROW)) {
            this.pos.x -= 5;
            this.directionRight = false;
        }
        if(keyIsDown(UP_ARROW)) {
            this.jump();
        }
        this.pos.y -= this.velY;
        this.velY -= 1;
        if(this.velY < -10)
            this.velY = -10;
    }

    jump(){
        if(this.onGround)
            this.velY = 20;
    }
}
