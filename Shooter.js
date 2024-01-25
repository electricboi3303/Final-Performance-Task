class Shooter{
    constructor(_x, _y, _type, _image){
        let swidth = 100; //width of shooter
        let sheight = 100; //height of shooter

        this.pos = createVector(_x, _y); //top left corner of shooter
        this.center = createVector(_x - swidth / 2, _y - sheight/2); //center of shooter
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
        if(this.frames % attackspeeds[this.type] == 0 && inrange.length > 0){ //determines attack speed in terms of number of frames, e.g. type 0 tower will shoot once every 500 frames
            bullets.push(new Bullet(this.center.x + 50, this.center.y + 50, this.type, this.target, bulletimage));
        } 
    }

}
