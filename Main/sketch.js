
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
- fragment collection to leave maze (if time allows)
- obsticles + enemies 
*/

let player;
let state = "room1";
let tiles;
let tileSize = 20;
let fragments; 
let fragmentSprites;
let fragmentsCollected = 0;
let playerStatic;
let wallSprite;
let doorSprite;
let playerUp;
let playerDown;

function preload () {

	playerStatic = loadImage('characterSprites/Illustration11.png');

	fragmentSprites = loadAnimation('characterSprites/fragmentAnimation.png', {frameSize: [32,32], frames: 5});

	wallSprite = loadImage ('characterSprites/rockWalls.png')

	doorSprite = loadImage ('characterSprites/doors.png')

	playerUp = loadAnimation('characterSprites/playerBack.png', {frameSize: [32,32], frames: 5});
	
	playerDown = loadAnimation('characterSprites/playerDown.png', {frameSize: [32,32], frames: 5});
}

function setup() {
	new Canvas(600, 600);
	
	displayMode(CENTER, PIXELATED, 8);

	world.gravity.y = 0;

	//allSprites.debug = true

	tiles = new Group();
	tiles.collider = 'static';
	tiles.layer = 5;

	player = new Sprite(130, 40, 8, 15);
	player.img = playerStatic;
	player.layer = 7;
	player.rotationLock = true;

	// Fragment setup
	fragments = new Group();
	fragments.collider = 'kinematic';
	fragments.layer = 6;

	level1();
	level2();
	level3();
	level4();

	hideRoom("room2");
	hideRoom("room3");
	hideRoom("room4");
}

function draw() {
	update();
	
}

function update() {

	// Room backgrounds
	//room states to switch between rooms
	if (state === "room1") {
		background(255);
	}
	if (state === "room2") {
		background(200);
	}
	if (state === "room3") {
		background(100);
	}
	if (state === "room4") {
		background(0);
	}

	//check room change 
	checkTransition();

	//player movement keyboard
	playerMovements();

	//fragment collection
	collectFragments();


	cameraS();
	//fragmentCountDisplay ()
}

// Room 1
function level1() {

	let layout = [
		"==============",
		"=............=",
		"=............=",
		"=............=",
		"=............=",
		"=............=",
		"=............=",
		"======EE======"
	];

	createTilesFromLayout(layout, "room1", "#882222");
}

function level2() {

	let layout = [
		"=====EE===",
		"===......=",
		"===......=",
		"===......=",
		"===......=",
		"====....==",
		"====....==",
		"====....==",
		"====*...==",
		"=====..===",
		"=====..===",
		"=====..===",
		"=====..===",
		"=====..===",
		"=====EE==="
	];

	createTilesFromLayout(layout, "room2", "#663333");
}

function level3() {

	let layout = [
		"================",
		"=..............=",
		"=.............==",
		"=.==========..==",
		"=.=............=",
		"=.=..........=.=",
		"=.=..=====...=.=",
		"=.=..=.*.=...=.=",
		"=.=..=...=...=.=",
		"=.=..=...=====.=",
		"=.=..=.........=",
		"=.=..=====..==.=",
		"=..............=",
		"=..............=",
		"=======EEE====="
	];

	createTilesFromLayout(layout, "room3", "#445544");
}

function level4() {

	let layout = [
		"===============",
		"=.............=",
		"=.............=",
		"====..===..====",
		"=.....=.......=",
		"=.....=.......=",
		"=.....=.......=",
		"=======..======",
		"=.............=",
		"=.............=",
		"====..======..=",
		"=.....=.......=",
		"=..=......==..=",
		"=*.=..........=",
		"==============="
	];

	createTilesFromLayout(layout, "room4", "#222222");
}

function createTilesFromLayout(layout, roomName, wallColor) {
	for (let row = 0; row < layout.length; row++) { // top to bottom 

		for (let col = 0; col < layout[row].length; col++) { //left to right 

			let char = layout[row][col]; //get tile at this row and this column 
			
			if (char === '=') { //wall tiles 
				let x = col * tileSize + tileSize/2;
				let y = row * tileSize + tileSize/2;
				
				let tile = new tiles.Sprite(x, y, tileSize, tileSize, 's');
				tile.image = wallSprite;
				tile.room = roomName;
			}
			else if (char === 'E') { //door tiles 
				
				let x = col * tileSize + tileSize / 2;
				let y = row * tileSize + tileSize / 2;
				
				let exitTile = new tiles.Sprite(x, y, tileSize, tileSize, 's');
				//exitTile.color = "#00FF00";
				exitTile.image = doorSprite;
				exitTile.collider = "none";
				exitTile.room = roomName;
			}
			else if (char === '*') { //fragment tiles

				let x = col * tileSize + tileSize / 2;
				let y = row * tileSize + tileSize / 2;
				
				let fragment = new fragments.Sprite(x, y, 15, 15);
				fragment.ani = fragmentSprites;
				fragment.room = roomName;
			}
		}
	}
}

function checkTransition () {
	// Room 1 to room 2
	if (state === "room1" && player.y > 130 && player.x > 120 && player.x < 190) {
		if (countFragmentsInRoom("room1") === 0) { //only transitions room if all room fragments are collected 

			hideRoom("room1");
			showRoom("room2");
			state = "room2";
			player.y = 30; //move player to the top of new room
		}
	}

	// Room 2 to room 3
	if (state === "room2" && player.y > 260 && player.x > 103 && player.x < 264) {
		if (countFragmentsInRoom("room2") === 0) { 

			hideRoom("room2");
			showRoom("room3");
			state = "room3";
			player.y = 30;
		}
	}

	// Room 3 to room 4
	if (state === "room3" && player.y > 264 && player.x > 144 && player.x < 194) {
		if (countFragmentsInRoom("room3") === 0) {

			hideRoom("room3");
			showRoom("room4");
			state = "room4";
			player.y = 30; 
		}
	}
}

// Count remaining fragments in a specific room
function countFragmentsInRoom(roomName) {

	let count = 0; //counter start

	for (let i = 0; i < fragments.length; i++) { // loop through all fragments

		if (fragments[i].room === roomName) { //check if fragment belongs to room
			count++; //add 1 to counter 
		}
	}

	return count;
}

// show/hide rooms fuction + room fragment check
function showRoom(roomName) {

	for (let i = 0; i < tiles.length; i++) { //loop through all tiles 

		let wall = tiles[i]; //get current tile

		if (wall.room === roomName) { //check if tile belongs to room 

			wall.collider = "static"; //physics so player can't walk through walls 
			wall.visible = true; // tiles are visible
		}
	}

	for (let i = 0; i < fragments.length; i++) { //loop through fragments 

		let fragment = fragments[i]; //get current fragment 

		if (fragment.room === roomName) { //check if fragment belongs to room

			fragment.visible = true; //make visible 
		}
	}
}

function hideRoom(roomName) {
	for (let i = 0; i < tiles.length; i++) {

		let wall = tiles[i];

		if (wall.room === roomName) {

			wall.collider = "none";
			wall.visible = false;
		}
	}

	for (let i = 0; i < fragments.length; i++) {

		let fragment = fragments[i];

		if (fragment.room === roomName) {

			fragment.visible = false;
		}
	}
}

// camera function
function cameraS() {

	camera.x = player.x;
	camera.y = player.y;
	camera.zoom = 5;
}

//player movements + animations (need work)
function playerMovements () {
	player.speed = 2;

	if (kb.pressing('up')) {

		player.direction = -90;
		player.ani = playerUp;

	} else if (kb.pressing('down')) {

		player.direction = 90;
		player.ani = playerDown;

	} else if (kb.pressing('left')) {

		player.direction = 180;
		player.scale.x = 1;

	} else if (kb.pressing('right')) {

		player.direction = 0;
		player.scale.x = -1;

	} else {

		player.speed = 0;
		player.image = playerStatic;
	}
}


//fragment collecting functionality
function collectFragments() {

	// Check if player overlaps with any fragments
	for (let i = fragments.length - 1; i >= 0; i--) {

		let fragment = fragments[i];

		if (fragment.visible && player.overlaps(fragment)) {

			fragment.remove();
			fragmentsCollected++;
			console.log('Fragments collected:', fragmentsCollected);
		}
	}
}

//fragment count on screen (needs work keeps bugging out camera?)
/*
function fragmentCountDisplay () {
	push();

	let screenX = camera.x - width / (2 * camera.zoom) + 20;
	let screenY = camera.y - height / (2 * camera.zoom) + 20;

	fill(255, 255, 0); // Yellow color
	textSize(8);
	textAlign(LEFT, TOP);

	text ("fragments left:" + fragmentsLeft, screenX, screenY); 

	pop(); 
}
*/

//minimap (if time allows)