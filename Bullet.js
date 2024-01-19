class Bullet{
    constructor(_x, _y){
        this.pos = createVector(_x, _y);
        this.vel = createVector(0, 0);
    }

    display(){
        strokeWeight(5);
        stroke(255, 0, 0);
        point(this.pos);
    }

    move(){
        this.pos.add(this.vel);
    }
}