class Tower{
    constructor(_x, _y, _type){
        this.pos = createVector(_x, _y);
        this.type = _type;
    }

    display(){
        stroke(255);
        strokeWeight(50);
        point(this.pos);
    }

    shoot(_ex, _ey){
        if(dist(this.pos.x, this.pos.y, _ex, _ey) < type[this.type]){
            bullets.push(new Bullet(this.pos.x, this.pos.y));
        }
    }

}