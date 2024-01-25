class Bullet{
    constructor(_x, _y, _type, _enemy){
        this.pos = createVector(_x, _y);
        this.vel = createVector(0, 0);
        this.type = _type;
        this.enemy = _enemy;
        this.tpos = createVector(_x, _y);
        this.frames = 0;
    }

    display(){
        noStroke();
        image(bulletimage, this.pos.x, this.pos.y);
    }

    move(){
        let xdist = this.enemy.pos.x - this.pos.x;
        let ydist = this.enemy.pos.y - this.pos.y;
        let angle = atan2(ydist, xdist);

        this.vel.x = cos(angle) * bulletspeeds[this.type];
        this.vel.y = sin(angle) * bulletspeeds[this.type];

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    update(){
        this.frames++;
        return this.frames % 25 == 0
    }
}