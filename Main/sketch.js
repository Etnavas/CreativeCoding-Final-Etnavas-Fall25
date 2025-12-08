
//figure out states and rooms 
//figure out background and foreground sprites and their properties 
// potential camera movement for maze 
 

/*it time allows things: 
- animations 
- add more details to art/revise visuals plzz

*/

//4 main settings, starting room, amonous hallway, void firts asteroid, maze.
// for the sake of time void & maze will be the primary focus maze being the most complex one

/*
Details for maze: 
- Low visibility 
- Wall/cave mural (showing some context)
- small maze map at the begining
- door that leads to end/exit 
- fragment collection to leave maze (if time allows)\
- obsticles + enemies 
*/



let player;
let state = "room1";
let wallLayer;
//background variables


function setup() {
	new Canvas (300,300);
	displayMode (CENTER, PIXELATED, 2);

	world.gravity.y = 0;

	wallLayer = new Group(); //array of walls 
	wallLayer.layer = 5;

	
	//allSprites.debug = true

	//background (100);
	player = new Sprite(150,150);
	player.image = 'Sharacter Sprites /Illustration11.png';
	player.layer = 7;
	//player = loadAni ('idle',"Files" , 1);
	//player = loadAni ('leftRight',"Files" , #); 
	//player = loadAni ('upp',"Files" , #);
	//player = loadAni ('downn',"Files" , #);

	player.h = 20;
	player.w = 10;
	player.offset.x = 0.3;
	player.offset.y = 3;
	player.rotationLock = true; 

	//rooms functions to reference 
	level1()
	level2()
	level3()
	level4()


 
	hideRoom("room2");
	hideRoom("room3");
	hideRoom("room4");


}

function draw() {
	update();
	//checkTransition ();
  }
  


function update() {
	
	//background (100,23,82);



  //room states to switch between rooms
  if (state === "room1") {
	background (100);
  }

  if (state === "room2") {
	background (255);
  }

  if (state === "room3") {
	background (100);
  }

  if (state === "room4") {
	background (0);
  }

  //check room change 
  checkTransition ();

	
	
  //player movement keyboard
	playerMovements ();
}



// Room 1
function level1() {
	let leftWall = new wallLayer.Sprite(5, 150, 10, 300, 's');
	leftWall.color = "#882222";
	leftWall.room = "room1";
	
	let rightWall = new wallLayer.Sprite(295, 150, 10, 300, 's');
	rightWall.color = "#882222";
	rightWall.room = "room1";
	
	let topWall = new wallLayer.Sprite(150, 5, 300, 10, 's');
	topWall.color = "#882222";
	topWall.room = "room1";
	
	let bottomLeft = new wallLayer.Sprite(60, 295, 120, 10, 's');
	bottomLeft.color = "#882222";
	bottomLeft.room = "room1";
	
	let bottomRight = new wallLayer.Sprite(240, 295, 120, 10, 's');
	bottomRight.color = "#882222";
	bottomRight.room = "room1";
}

// Room 2
function level2() {
	let leftWall = new wallLayer.Sprite(5, 150, 10, 300, 's');
	leftWall.color = "#663333";
	leftWall.room = "room2";
	
	let rightWall = new wallLayer.Sprite(295, 150, 10, 300, 's');
	rightWall.color = "#663333";
	rightWall.room = "room2";
	
	let topWall = new wallLayer.Sprite(150, 5, 300, 10, 's');
	topWall.color = "#663333";
	topWall.room = "room2";
	
	let bottomLeft = new wallLayer.Sprite(60, 295, 120, 10, 's');
	bottomLeft.color = "#663333";
	bottomLeft.room = "room2";
	
	let bottomRight = new wallLayer.Sprite(240, 295, 120, 10, 's');
	bottomRight.color = "#663333";
	bottomRight.room = "room2";
	
	// Maze obstacles
	let maze1 = new wallLayer.Sprite(150, 60, 180, 10, 's');
	maze1.color = "#cc6666";
	maze1.room = "room2";
	
	let maze2 = new wallLayer.Sprite(230, 120, 10, 100, 's');
	maze2.color = "#cc6666";
	maze2.room = "room2";
	
	let maze3 = new wallLayer.Sprite(150, 170, 140, 10, 's');
	maze3.color = "#cc6666";
	maze3.room = "room2";
	
	let maze4 = new wallLayer.Sprite(90, 220, 10, 80, 's');
	maze4.color = "#cc6666";
	maze4.room = "room2";
}

// Room 3 - placeholder
function level3() {
	let leftWall = new wallLayer.Sprite(5, 150, 10, 300, 's');
	leftWall.color = "#445544";
	leftWall.room = "room3";
	
	let rightWall = new wallLayer.Sprite(295, 150, 10, 300, 's');
	rightWall.color = "#445544";
	rightWall.room = "room3";
	
	let topWall = new wallLayer.Sprite(150, 5, 300, 10, 's');
	topWall.color = "#445544";
	topWall.room = "room3";
	
	let bottomLeft = new wallLayer.Sprite(60, 295, 120, 10, 's');
	bottomLeft.color = "#445544";
	bottomLeft.room = "room3";
	
	let bottomRight = new wallLayer.Sprite(240, 295, 120, 10, 's');
	bottomRight.color = "#445544";
	bottomRight.room = "room3";
}

// Room 4 - placeholder
function level4() {
	let leftWall = new wallLayer.Sprite(5, 150, 10, 300, 's');
	leftWall.color = "#222222";
	leftWall.room = "room4";
	
	let rightWall = new wallLayer.Sprite(295, 150, 10, 300, 's');
	rightWall.color = "#222222";
	rightWall.room = "room4";
	
	let topWall = new wallLayer.Sprite(150, 5, 300, 10, 's');
	topWall.color = "#222222";
	topWall.room = "room4";
	
	let bottomWall = new wallLayer.Sprite(150, 295, 300, 10, 's');
	bottomWall.color = "#222222";
	bottomWall.room = "room4";
}



function checkTransition () {

	//room 1 to room 2
	if (state === "room1" && player.y > 290 && player.x > 120 && player.x < 180) {
		hideRoom("room1");
		showRoom ("room2");
		state = "room2";
		player.y = 30;
	}

	//room 2 to room 3
	if (state === "room2" && player.y > 290 && player.x > 120 && player.x < 180) {
		hideRoom("room2");
		showRoom ("room3");
		state = "room3";
		player.y = 30;
	}

	//room 3 to room 4
	if (state === "room3" && player.y > 290 && player.x > 120 && player.x < 180) {
		hideRoom("room3");
		showRoom ("room4");
		state = "room4";
		player.y = 30;
	}
}



//show room 
function showRoom (roomName) { //takes room name as parameter
	for (let i = 0; i < wallLayer.length; i++) { //loops through wallLayer
		let wall = wallLayer [i]; // grabs current wall 
		if (wall.room === roomName) { //checks for room
			wall.collider = "static";//solid
			if (wall.color) {
				wall.visible = true;// appears on screen 
			}
		}
	}
}

//hide room 
function hideRoom (roomName) {
	for (let i = 0; i < wallLayer.length; i++) { 
		let wall = wallLayer [i];
		if (wall.room === roomName) {
			wall.collider = "none";
			if (wall.color) {
				wall.visible = false;
			}
		}
	}
}



//movent function
function playerMovements () {

	player.speed = 1;

	if (kb.pressing('up')) { //arrows
		player.direction = -90;

		//play animation
		//player.changeAni('upp');

	} else if (kb.pressing('down')) {

		player.direction = 90;
		
		//play animation
		//player.changeAni('downn');

	} else if (kb.pressing('left')) {
		player.direction = 180;

		//play animation
		//player.changeAni('leftRight');
		player.scale.x = 1;

	} else if (kb.pressing('right')) {
		player.direction = 0;

		//play animation
		//player.changeAni('leftRight');
		player.scale.x = -1;

	} else {
	  player.speed = 0;
	  //player.changeAni('idle');
	}
}

//fragments + collecting functionality 

