class Platform{
    constructor(x, y, w, h, asset, player, platformmode){
        this.pos = createVector(x, y);
        this.scale = createVector(w, h);
        this.asset = asset;
        this.pl = player;
        this.platformmode = platformmode;
    }

    render(){
        rect(this.pos.x-pl.pos.x+width/2, this.pos.y-pl.pos.y+height/2, this.scale.x, this.scale.y)
        image(this.asset, this.pos.x-pl.pos.x+width/2, this.pos.y-pl.pos.y+height/2, this.scale.x, this.scale.y);
    }

    collideTop(pl){
        return pl.pos.x + 50 > this.pos.x && pl.pos.x < this.pos.x + this.scale.x && pl.pos.y + 50 > this.pos.y && pl.pos.y < this.pos.y + (this.scale.y/2);
    }
    collideBottom(pl){
        return pl.pos.x + 50 > this.pos.x && pl.pos.x < this.pos.x + this.scale.x && pl.pos.y + 50 > this.pos.y + 25 && pl.pos.y-25 < this.pos.y + (this.scale.y/2);
    }
}