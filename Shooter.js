class Shooter{
    constructor(_x, _y, _type, _image){
        let swidth = 100;
        let sheight = 100;

        this.pos = createVector(_x, _y);
        this.center = createVector(_x - 50, _y - 50);
        this.type = _type;
        this.image = _image;
        this.frames = 100;
        this.target
    }

    display(){
        noStroke();
        image(this.image, this.center.x, this.center.y);
    }

    update(){
        this.frames++;
        if(this.frames % attackspeeds[this.type] == 0 && inrange.length > 0){ //determines attack speed in terms of number of frames, e.g. type 0 tower will shoot once ever 100 frames
            bullets.push(new Bullet(this.center.x + 50, this.center.y + 50, this.type, this.target, bulletimage));
        } 
    }

}