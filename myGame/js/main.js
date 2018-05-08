var game = new Phaser.Game(800, 600, Phaser.AUTO);

// look up phaser keyboard stuff

menu.prototype = {
	preload: function(){
		// load some stuff
	}
	create: function(){
		// do some stuff
		cursors = game.input.keyboard.createCursorKeys();
	}
	update: function(){
		// go on to next state
		if( cursors.spacebar.isDown){
			this.game.start.state('play');
		}
	}
}

var play = function(game){
	var player;
	var dashBar;
};
play.prototype = {
	preload: function(){
		// place your assets
		// load the asset for the dash bar
		// and the player
	}
	create: function(){
		var playerIdleLeft = false;
		var playerIdleRight = false;

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		cursors = game.input.keyboard.createCursorKeys();

		game.physics.enable([player], Phaser.physics.ARCADE);
		player.body.gravity.y = 50;
		player.body.collideWorldBounds = true;

	}
	update: function(){
		// run game loop
		// player does not have an image/sprite attached to it yet
		player.body.velocity.x = 0;
	
		if(cursors.left.isDown){
			player.velocity.x -= 2;
			// players animations left
		} else if (cursors.right.isDown){
			player.velocity.x += 2;
			// player animations right
		}
		if(cursors.up.justPressed(cursors.up) && player.body.touching.down){
			player.velocity.y -= 10;
		}
		/* 
		//	Basic code, not tested yet so it will stay commented out
		if(cursors.spacebar.isDown && dashBar != 0 && playerIdleRight = true){
			player.body.velocity.x += 10;
			dashBar -= 3;
		} else if (cursors.spacebar.isDown && dashBar != 0 && playerIdleLeft = true){
			player.body.velocity.x -= 10;
			dashBar -= 3;
		} else if (cursors.spacebar.isDown && dashBar != 0 && cursor.up.isDown){
			player.body.velocity.y -= 10;
			dashBar -= 3;
		} else if (cursors.spacebar.isDown && dashBar != 0 && cursor.right.isDown){
			player.body.velocity.x += 10;
			dashBar -= 3;
		} else if (cursors.spacebar.isDown && dashBar != 0 && cursor.left.isDown){
			player.body.velocity.x -= 10;
			dashBar -= 3;
		}

		if(player.touching.wall == true && cursors.up.justPressed(cursors.up)){
			player.body.velocity.y -= 5;
		} else {
			// after 2 seconds
			// player.touching.wall = false;
		}

		if (dashBar = 0){
			// player cannot dash
		}*/
	}
}	

gameover.prototype = {
	preload: function(){
		// do something maybe
	}
	create: function(){
		cursors = game.input.keyboard.createCursorKeys():
	}
	update: function(){
		if(cursors.spacebar.isDown){
			game.state.start('menu');
		}
	}
}

game.state.add('menu', menu);
game.state.add('play', play);
game.state.add('gameover', gameover);
game.state.start('menu');