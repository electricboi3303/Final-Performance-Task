class Enemy{
    constructor(_x, _y, _s){
        this.pos = createVector(_x, _y);
        this.vel = createVector(0, 0);
        this.waypointIndex = 0;
        this.s = _s;
        this.center = this.pos;

        const width = 1;
        const height = 1;


    }

    display(){
        stroke(255);
		strokeWeight(10);
        point(this.pos);
    }

    move(){
        let waypoint = waypoints[this.waypointIndex];
        let ydist = waypoint.y - this.center.y;
        let xdist = waypoint.x - this.center.x;
        let angle = atan2(ydist, xdist);

        this.vel.x = cos(angle) * this.s;
        this.vel.y = sin(angle) * this.s;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if(dist(this.center.x, this.center.y, waypoints[this.waypointIndex].x, waypoints[this.waypointIndex].y) <= 5){
            this.waypointIndex++;
        }
    }
}

function spawnEnemy(){
    enemies.push(new Enemy(-width/2, 0, 5));
    console.log(enemies);
}
