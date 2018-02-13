var gameTitle = require ('gameTitle');

//Function that preloads all game assets
var preload = function(game)
{
    console.log("%cLoading images.", "color:white; background:red");
}
 
preload.prototype = {
	preload: function()
	{ 
        var loadingBar = this.add.sprite(160,240,"loadingBar");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
		this.game.load.spritesheet("playerTank","assets/tank1.png",64,64);
		this.game.load.spritesheet("enemyTankNormal","assets/tank2.png",64,64);
		this.game.load.spritesheet("enemyTankFast","assets/tank3.png",64,64);
		this.game.load.spritesheet("enemyTankBig","assets/tank4.png",64,64);
		this.game.load.spritesheet("explosion","assets/explosion.png",64,64);
		this.game.load.image("brickWall","assets/brickWall.png");
		this.game.load.image("eagle","assets/eagle.png");
		this.game.load.image("steelWall","assets/steelWall.png");
		this.game.load.image("remaining","assets/remaining.png");
		this.game.load.image("gameOver","assets/gameOver.png");
		this.game.load.image("gameWon","assets/youWin.png");
		this.game.load.image("victory","assets/victory.png");
		this.game.load.image("battle-city","assets/battle-city.png");
		this.game.load.image("start","assets/start.jpg");
		this.game.load.image("pSpawn","assets/pSpawn.png");
		this.game.load.image("eSpawn","assets/eSpawn.png");
		this.game.load.image("bullet","assets/bullet.png");
		this.game.load.image("scoreTitle","assets/high_score.jpg");
		this.game.load.image("retry","assets/retry.png");
		this.game.load.image("invincible","assets/invincibleStar.png");
		this.game.load.image("timePower","assets/timePowerUp.png");
	},
	
  	create: function()
  	{
		this.game.state.start("GameTitle");
	}
}

module.exports = preload;