let player;

function setup() {
new Canvas ("1:1");

background (100);
player = new Sprite;
//char.diameter = 80;
player.height = 130;
player.width = 90;




}

function update() {
	
	background (100);

	player.speed = 4.5;
	
	//player movement keyboard
	if (kb.pressing('up')) {
		player.direction = -90;

		//play animation

	} else if (kb.pressing('down')) {
		player.direction = 90;
		
		//play animation

	} else if (kb.pressing('left')) {
		player.direction = 180;

		//play animation

	} else if (kb.pressing('right')) {
		player.direction = 0;

		//play animation

	} else {
	  player.speed = 0;
	}
}
