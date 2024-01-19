let waypoints = [];
let enemies = [];
let towers = [];
let bullets = [];

let type = [500];

let targetTime = 100;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
  console.log(windowWidth, windowHeight);
	
  waypoints.push(createVector(-width/2, 0));
  waypoints.push(createVector(-width/4, 0));
  waypoints.push(createVector(-width/4, height/4));
  waypoints.push(createVector(0, height/4));
  waypoints.push(createVector(0, -height/3));
  waypoints.push(createVector(width/5, -height/3));
  waypoints.push(createVector(width/5, height/3));
  waypoints.push(createVector(width/3, height/3));
  waypoints.push(createVector(width/3, -height/5));
  waypoints.push(createVector(-width/2, -height/5));
}

function draw() {	
	background(0);
	translate(width/2, height/2);

  if(Timer(targetTime) == true){ //always spawns first enemy
		spawnEnemy();
		targetTime = millis() + 100; 
  }

	for(let i = 0; i < waypoints.length - 1; i++){ //for loop to show lines from waypoints
		stroke(255);
    strokeWeight(2);
		line(waypoints[i].x, waypoints[i].y, waypoints[i+1].x, waypoints[i+1].y);		
	}
	
  for(let i = enemies.length - 1; i > 0; i--){
      let e = enemies[i];
      e.display();
      e.move();

      if(dist(e.pos.x, e.pos.y, waypoints[waypoints.length-1].x, waypoints[waypoints.length-1].y) <= 15){
        enemies.splice(i, 1);
      }
    for(let j = towers.length - 1; j > 0; j--){
        let t = towers[j];
        t.display();
        t.shoot(e.pos.x, e.pos.y);
    
      }
  }



  for(let i = bullets.length - 1; i > 0; i--){
    let b = bullets[i];
    b.display();
    b.move();
  }
}

function mousePressed(){
  towers.push(new Tower(mouseX - width/2, mouseY - height/2, 0));
}

function Timer(_targetTime){ //timer for enemies to spawn
  return millis() >= _targetTime; //returns whether the target time has been reached or not
}