class Player{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.directionRight = true;

        this.asset = loadImage('assets/player1.png');
        this.asset2 = loadImage('assets/player1left.png');

        this.velY = 0;
    }

    draw(){
        noFill();
        rect(width/2, height/2, 50, 50);
        if(this.directionRight){
            image(this.asset, width/2, height/2, 50, 50);
        } else {
            image(this.asset2, width/2, height/2, 50, 50);
        }

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