class Enemy{
    constructor(_x, _y, _s){
        this.pos = createVector(_x, _y); 
        this.vel = createVector(0, 0);
        this.waypointIndex = 0;
        this.s = _s; //speed of enemy
        this.center = this.pos; //center of enemy

    }

    display(){
        stroke(255, 0 , 0);
	strokeWeight(25);
        point(this.pos);
    }

    move(){
        let waypoint = waypoints[this.waypointIndex]; //first waypoint for pathfinding
        let ydist = waypoint.y - this.center.y; //calculates x and y distances from nearest waypoint
        let xdist = waypoint.x - this.center.x;
        let angle = atan2(ydist, xdist); //calculates angle to go towards nearest waypoint

        this.vel.x = cos(angle) * this.s; //velocity to go to nearest waypoint
        this.vel.y = sin(angle) * this.s;

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if(dist(this.center.x, this.center.y, waypoints[this.waypointIndex].x, waypoints[this.waypointIndex].y) <= 10){ //checks if enemy has reached waypoint
            this.waypointIndex++;
        }
    }

    collision(_bx, _by){ //checks if enemy has hit bullet
        return dist(this.pos.x, this.pos.y, _bx, _by) <= 12.5
    }
}

function spawnEnemy(){
    enemies.push(new Enemy(-width/2, 0, 5)); //spawns new enemy at the begining of the track
    enemiesspawned++; //counts how many enemies have been spawned
}
