let waypoints = [];
let enemies = [];
let shooters = [];
let bullets = [];
let inrange = [];

let ranges = [500];
let bulletspeeds = [25];
let attackspeeds = [500];

let targetTime = 0;
let minDistanceBetweenShooters = 50;
let round = 1;
let lives = 10;
let money = 100;
let enemiesspawned = 0;
let menu = 0;

let bulletimage;
let shooterimage;
let bg;
let spawningspeed;
let b1;



function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
  bulletimage = loadImage('bullet.png');
  shooterimage = loadImage('shooter.png');
  bg = loadImage('background.jpg');
	
  b1 = createImg('Play.png', 'Snigdho'); //button to play game
	b1.position(width/2 - 125, height/2 - 57);
	b1.mousePressed(setMenu);

  waypoints.push(createVector(-width/2, 0)); //waypoints for path
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
  menus();
}
function game(){
  noStroke();
	fill(255);
	textSize(25);
  text('Round: ' + round, 10 - width/2, 25 - height/2);
  text('Lives: ' + lives, 10 - width/2, 50 - height/2);
  text('Money: ' + money, 10 - width/2, 75 - height/2);

  levels();

  if(lives < 1){
    menu = 3
  }

  if(Timer(targetTime) == true){ //always spawns first enemy
		spawnEnemy();
		targetTime = millis() + spawningspeed; 
  }

	for(let i = 0; i < waypoints.length - 1; i++){ //for loop to show lines from waypoints
		stroke(100);
    strokeWeight(2);
		line(waypoints[i].x, waypoints[i].y, waypoints[i+1].x, waypoints[i+1].y);		
	}
	
  for(let i = enemies.length - 1; i > 0; i--){
      let e = enemies[i];
      e.display();
      e.move();

    if(dist(e.pos.x, e.pos.y, waypoints[waypoints.length-1].x, waypoints[waypoints.length-1].y) <= 15){
        enemies.splice(i, 1);
        lives--;
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
        money += 5;
      }
    }
  }
}

function levels(){
  if(enemiesspawned < 25){
    round = 1;
    spawningspeed = 500;
  }
  else if(enemiesspawned < 75){
    round = 2;
    spawningspeed = 250;
  }
  else{
    round = 3;
    spawningspeed = 100;
  }

  if(enemiesspawned > 250 && lives > 0){
    menu = 2;
  }
}

function mousePressed(){
  let proposedPosition = createVector(mouseX - width/2, mouseY - height/2);

    if (isPositionOnPath(proposedPosition)) {
      return; //exits from functions and doesn't place tower if shooter is too close to path
    }

    // Check if the position overlaps with other shooters
    for(let shooter of shooters){ //executes loop for values from object class
        if (dist(proposedPosition.x, proposedPosition.y, shooter.center.x, shooter.center.y) < minDistanceBetweenShooters) {
           return; //exits from function and doesn't place tower if shooter is too close to other shooter
        }
    }

    if(money < 50){
      return;
    }

    shooters.push(new Shooter(proposedPosition.x, proposedPosition.y, 0, shooterimage));
    money -= 50; 
  
}

function isPositionOnPath(position) {
  let bufferDistance = 50; // Distance within which you can't place a tower
  for (let i = 0; i < waypoints.length - 1; i++) {
      if (mposToLineDistance(position, waypoints[i], waypoints[i + 1]) < bufferDistance) {
          return true;
      }
  }
  return false;
}

function mposToLineDistance(mpos, lineStart, lineEnd) { //function to calculate the distance between the mouse position and the closest position on the line
  let line = createVector(mpos.x - lineStart.x, mpos.y - lineStart.y); //vector for line waypoints to mouse position
  let lineseg = createVector(lineEnd.x - lineStart.x, lineEnd.y - lineStart.y); //vector for between line waypoints

  let dotprod = line.dot(lineseg); //dot product of line vector and line segments vector
  let len_sq = sq(lineseg.x) + sq(lineseg.y); //squared length of line segments vector
  let projvec = dotprod / len_sq; //calculates vector projection and normalizes, the end of the projected vector is the closest point to the mouse position
  let cpos; //vector for closest position to mouse
  
  cpos = createVector(lineStart.x + projvec * lineseg.x, lineStart.y + projvec * lineseg.y); //multiplying the normalized projected vector value by the line segment vector gives the closest position (end of projected vector)

  return dist(mpos.x, mpos.y, cpos.x, cpos.y);
}

function Timer(_targetTime){ //timer for enemies to spawn
  return millis() >= _targetTime; //returns whether the target time has been reached or not
}

function keyPressed(){
	if(keyCode === 13){ //pauses game if spacebar is pressed
    if(menu == 2 || menu == 3){ //if menu is game win/lose screen, returns to beginning screen and resets everything
      menu = 0;
      b1.show();
  
      enemies = [];
      shooters = [];
      bullets = [];
      inrange = [];
  
      targetTime = 0;
      round = 1;
      lives = 10;
      money = 100;
      enemiesspawned = 0;
    }
	}
}