class Bullet{
    constructor(_x, _y, _type, _enemy, _image){
        this.pos = createVector(_x, _y);
        this.vel = createVector(0, 0);
        this.type = _type; //type data for bullet
        this.enemy = _enemy; //enemy that bullet targets
        this.image = _image; //bullet image
        this.tpos = createVector(_x, _y); //position of tower it shoots from
        this.frames = 0; //framecount
    }

    display(){
        noStroke();
        image(this.image, this.pos.x, this.pos.y);
    }

    move(){
        let xdist = this.enemy.pos.x - this.pos.x; //distance from enemy position to bullet
        let ydist = this.enemy.pos.y - this.pos.y;
        let angle = atan2(ydist, xdist); //angle for bullet to shoot at

        this.vel.x = cos(angle) * bulletspeeds[this.type]; //velocity for bullet 
        this.vel.y = sin(angle) * bulletspeeds[this.type];

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    update(){
        this.frames++; //counts how many frames
        return this.frames % 25 == 0 //returns true if framecount is 25, used to remove bullets that missed their target and stay on the screen for too long
    }
}
