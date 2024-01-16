let waypoints = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	
	waypoints.push(createVector(0, height/2));
  waypoints.push(createVector(0, 0)); 
  waypoints.push(createVector(width/4, 0)); 
  waypoints.push(createVector(width/4, -height/4)); 
  waypoints.push(createVector(-width/4, -height/4)); 
  waypoints.push(createVector(-width/4, height / 2)); 

}

function draw() {	
	
	translate(width/2, height/2);
	
	for(let i = 0; i < waypoints.length - 1; i++){ //for loop to show lines from waypoints
		stroke(255);
		line(waypoints[i].x, waypoints[i].y, waypoints[i+1].x, waypoints[i+1].y);		
	}
	
}