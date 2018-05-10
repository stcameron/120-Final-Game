// look up phaser keyboard stuff
var Inputs = {};

Inputs.menu = function() {};
Inputs.menu.prototype = {
	preload: function(){
	    // load some stuff
	    this.load.path = 'assets/img/';
	    this.load.atlas('atlas', 'PHSpritesheet.png', 'PHsprites.json');
		this.load.atlas('ground', 'ground.png', 'ground.json');
	},
	create: function(){
		// do some stuff
		this.stage.backgroundColor = '#facade';
	},
	update: function(){
		// go on to next state
        if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.state.start('play', true, false);
		}
	}
}

Inputs.play = function(game){
	this.player;
	this.dashBar = null;
	this.cursors = null;
	this.bg = null;
	this.bg2 = null;
	//this.gravity = 10;
	this.plt;
	this.plt2;
	this.wall;
};
Inputs.play.prototype = {
	preload: function(){
		// place your assets
	},
	create: function(){
		//  Enable physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //	Sprites
        this.bg = this.add.sprite(0, 0, 'atlas', 'clouds');
        this.bg = this.add.sprite(0, 250, 'atlas', 'clouds');
        this.player = this.add.sprite(50, 450, 'atlas', 'dude5');
        this.plt = this.add.sprite(0, 490, 'ground', 'platform'); //its called platform on leshy
        this.plt2 = this.add.sprite(400, 490, 'ground', 'platform');
        this.plt3 = this.add.sprite(500, 150, 'ground', 'platform');
        this.plt4 = this.add.sprite(375, 150, 'ground', 'platform');
        this.plt3.anchor.setTo(0.5, 0.5);
        this.plt4.anchor.setTo(0.5, 0.5);
        this.plt3.scale.setTo(0.1, 50);
        this.plt4.scale.setTo(0.1, 15);

		this.playerIdleLeft = false;
		this.playerIdleRight = false;

		//  Add the animation for walking
        //  15 = right hand out, 16 = left hand out. 10 and 11 are the idle right
        this.physics.arcade.enable([this.player, this.plt, this.plt2, this.plt3, this.plt4]);
        this.player.animations.add('walk', [15, 11, 16, 10], 10, true);
        this.player.animations.add('walkD', [15], 10, true);
        this.player.animations.add('walk1', [8, 12, 9, 13], 10, true);
        this.player.animations.add('walk1D', [8, 12, 9, 13], 30, true);
        this.player.animations.add('jump', [11, 10], 10, false);
		this.plt.body.immovable = true;
		this.plt2.body.immovable = true;
		this.plt3.body.immovable = true;
		this.plt4.body.immovable = true;
		this.player.body.gravity.y = 5000;
		//this.plt3.angle = 90;
	},
	update: function(){
		// run game loop
		var hitPlatform = this.physics.arcade.collide(this.player, this.plt);
		var hitPlatform2 = this.physics.arcade.collide(this.player, this.plt2);
		var hitPlatform3 = this.physics.arcade.collide(this.player, this.plt3);
		var hitPlatform4 = this.physics.arcade.collide(this.player, this.plt4);
		// player does not have actual image/sprite attached to it yet
		this.player.body.velocity.x = 0;
		this.player.body.maxVelocity.x = 300;
	
		if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.player.body.touching.down){
			this.player.body.velocity.x = -300;
			this.player.animations.play('walk1');
		} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.player.body.touching.down){
			this.player.body.velocity.x = 300;
			this.player.animations.play('walk');
		} //else if (this.input.keyboard.isDown(Phaser.Keyboard.R)){
			//this.player.body.velocity.x = 1000;
			//this.player.animations.play('walkD');
			//this.player.arcade.disable(this.player);
		//}
		if (this.input.keyboard.justReleased(Phaser.Keyboard.RIGHT)){
			this.player.animations.stop();
		} else if (this.input.keyboard.justReleased(Phaser.Keyboard.LEFT)){
			this.player.animations.stop();
		} else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !this.player.body.touching.down){
			this.player.body.acceleration.x = -300;
		}


		if(this.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.player.body.touching.down){
			this.player.body.velocity.y -= 1700;
		}

		if(this.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && hitPlatform3){
			//this.player.body.gravity.y = 10000;
			this.player.body.velocity.x -= 300;
			this.player.body.velocity.y = -1500;
		}
		if(this.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && hitPlatform4){
			this.player.body.velocity.x += 300;
			this.player.body.velocity.y -= 1500;
		}

		if(this.player.body.x >= game.width){
			this.player.body.x = -10;
		}else if (this.player.body.x <= -10) {
			this.player.body.x = game.width;
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

Inputs.gameover = function(){};
Inputs.gameover.prototype = {
	preload: function(){
		// do something maybe
	},
	create: function(){
		cursors = game.input.keyboard.createCursorKeys();
	},
	update: function(){
		if(cursors.spacebar.isDown){
			game.state.start('menu');
		}
	}
}


var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('menu', Inputs.menu);
game.state.add('play', Inputs.play);
game.state.add('gameover', Inputs.gameover);
game.state.start('menu');