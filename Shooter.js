class Tower{
    constructor(_x, _y, _type){
        this.pos = createVector(_x, _y);
        this.type = _type;
        this.frames = 0;
        this.target
    }

    display(){
        stroke(255);
        strokeWeight(50);
        point(this.pos);
    }

    shoot(_ex, _ey){
        bullets.push(new Bullet(this.pos.x, this.pos.y, this.type, this.target));
    }

    update(){
        this.frames++;
        return this.frames % attackspeeds[this.type] == 0; //determines attack speed in terms of number of frames, e.g. type 0 tower will shoot once ever 100 frames
    }

}