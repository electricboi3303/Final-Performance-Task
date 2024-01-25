let waypoints = [];
let enemies = [];
let shooters = [];
let bullets = [];
let inrange = [];

let ranges = [500];
let bulletspeeds = [25];
let attackspeeds = [100];

let targetTime = 0;

let bulletimage;
let bg;

function setup() {
	createCanvas(1440, 810);
	background(0);
  bulletimage = loadImage('bullet.png');
  bg = loadImage('background.jpg');
	
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
	background(bg);
	translate(width/2, height/2);

  if(Timer(targetTime) == true){ //always spawns first enemy
		spawnEnemy();
		targetTime = millis() + 1000; 
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

    for(let j = shooters.length - 1; j > 0; j--){
      let t = shooters[j];
      if(dist(e.pos.x, e.pos.y, t.pos.x, t.pos.y) < ranges[t.type]){
        inrange.unshift(enemies[i]);
      }
      t.target = inrange[0];
      t.update();
    }
  }

  for(let i = shooters.length - 1; i > 0; i--){ //ensures that towers are displayed constantly  
    let t = shooters[i];
    t.display();
    t.update();
  }

  for(let i = bullets.length - 1; i > 0; i--){
    let b = bullets[i];
    b.display();
    b.move();
    

    if(b.update() == true){
      bullets.splice(i, 1);
    }

    for(let j = enemies.length - 1; j > 0; j--){
      let e = enemies[j];

      if(e.collision(b.pos.x, b.pos.y) == true){
        enemies.splice(j, 1);
        bullets.splice(i, 1);
      }
    }
  }
}



function mousePressed(){
  shooters.push(new Shooter(mouseX - width/2, mouseY - height/2, 0));
}

function Timer(_targetTime){ //timer for enemies to spawn
  return millis() >= _targetTime; //returns whether zthe target time has been reached or not
}
