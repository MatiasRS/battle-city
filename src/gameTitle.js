var player = require ('player');

var gameTitle = function(game)
{
    console.log("%cGame title reached.", "color:white; background:red");
}
 
gameTitle.prototype = {
  	create: function()
  	{
		var gameTitle = this.game.add.sprite(480,360,"battle-city");
		gameTitle.anchor.setTo(0.5,0.5);
		gameTitle.scale.setTo(0.5, 0.5);
		var playButton = this.game.add.button(460,560,"start",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
		playButton.scale.setTo(0.25, 0.25);

		var newPlayer = new player();
	},
	
	playTheGame: function()
	{
		this.game.state.start("GameController");
	}
}

module.exports = gameTitle;