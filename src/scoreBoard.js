
//Function that preloads all game assets
var scoreBoard = function(game)
{
    //console.log("%cLoading images.", "color:white; background:red");
}
 
scoreBoard.prototype.preload = function()
{ 
    
}

scoreBoard.prototype.init = function(score, killedEnemies)
{
    //alert("You scored: " + score);
    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    var total = 0;
    var scoreString = "Enemies killed: \n\n";

    for (var i = 0; i < killedEnemies[0].length; i++)
    {
        //Name of enemies: Number of enemies killed x Score per enemy = score
        scoreString += killedEnemies[i][0] + ": " + killedEnemies[i][1] + " x " + killedEnemies[i][2] + " = " + killedEnemies[i][1] * killedEnemies[i][2] + "\n\n";
        total += killedEnemies[i][1] * killedEnemies[i][2];
    }
    scoreString += "        Total: " + total;

    var scoreText = this.game.add.text(320, 320, scoreString, style);
}
	
scoreBoard.prototype.create = function()
{
    var gameTitle = this.game.add.sprite(460,160,"scoreTitle");
    gameTitle.anchor.setTo(0.5,0.5);
    gameTitle.scale.setTo(0.5, 0.5);
    var retryButton = this.game.add.button(460,760,"retry",this.restartGame,this);
    retryButton.anchor.setTo(0.5,0.5);
    retryButton.scale.setTo(0.5, 0.5);
    
}

scoreBoard.prototype.restartGame = function()
{
    this.game.state.start("GameController");
}


module.exports = scoreBoard;