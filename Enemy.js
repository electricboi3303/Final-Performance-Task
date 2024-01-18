class Enemy{
    constructor(_x, _y){
        this.pos = createVector(_x, _y);
        this.vel = createVector(0, 0);
        this.waypointIndex = 0;
        this.width = 50;
        this.height = 50;
        this.center = createVector(this.pos.x + this.width/2, this.pos.y + this.height/2);




    }

    display(){
        fill(255);
        rect(this.pos.x, this.pos.y, this.pos.x + this.width, this.pos.y + this.height);
    }

    move(){
        let waypoint = waypoints[this.waypointIndex];
        let ydist = waypoint.y - this.center.y;
        let xdist = waypoint.x - this.center.x;
        let angle = atan2(ydist, xdist);

        this.vel.x = cos(angle);
        this.vel.y = sin(angle);

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

    }
}

function spawnEnemy(){
    enemies.push(new Enemy(-width/4, height/2 + 50));
    console.log(enemies);
}
