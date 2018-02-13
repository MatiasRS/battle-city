var powerUp = require ('powerUp');


var freezeTime = function(powerUpType, location, gameLevel, powerUpGroup, sprite, game)
{
    console.log("%cCreating new freeze time bomb...", "color:white; background:red");
    
    this.type = powerUpType;
    this.location = location; 
    this.gameLevel = gameLevel;
    this.powerUpGroup = powerUpGroup;
    this.sprite = sprite;
    this.game = game;

    //The freeze bomb freezes the enemies for a set duration
    this.freezeDuration = 3000;

    //console.log(tankGroup);
    powerUp.call(this, powerUpType, location, gameLevel, powerUpGroup, sprite, game);

    
}
freezeTime.prototype = Object.create( powerUp);
freezeTime.prototype.constructor = freezeTime;

freezeTime.prototype.create = function()
{
    
}
    



module.exports = freezeTime;