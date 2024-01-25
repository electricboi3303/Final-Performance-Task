class Shooter{
    constructor(_x, _y, _type){
        this.pos = createVector(_x, _y);
        this.type = _type;
        this.frames = 100;
        this.target
    }

    display(){
        stroke(255);
        strokeWeight(50);
        point(this.pos);
    }

    update(){
        this.frames++;
        if(this.frames % attackspeeds[this.type] == 0 && inrange.length > 0){ //determines attack speed in terms of number of frames, e.g. type 0 tower will shoot once ever 100 frames
            bullets.push(new Bullet(this.pos.x, this.pos.y, this.type, this.target));
        } 
    }

}