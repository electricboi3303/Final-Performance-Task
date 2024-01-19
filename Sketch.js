let waypoints = [];
let enemies = [];

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
	
	for(let i = 0; i < waypoints.length - 1; i++){ //for loop to show lines from waypoints
		stroke(255);
    strokeWeight(2);
		line(waypoints[i].x, waypoints[i].y, waypoints[i+1].x, waypoints[i+1].y);		
	}
	
  for(let i = enemies.length - 1; i > 0; i--){
      let e = enemies[i];
      e.display();
      e.move();
  }
}

function mousePressed(){
  spawnEnemy();
}
