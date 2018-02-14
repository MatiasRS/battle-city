var powerUp = require ('powerUp');


var invincible = function(powerUpType, location, gameLevel, powerUpGroup, sprite, game)
{
    console.log("%cCreating new freeze time bomb...", "color:white; background:red");
    
    this.type = powerUpType;
    this.location = location; 
    this.gameLevel = gameLevel;
    this.powerUpGroup = powerUpGroup;
    this.sprite = sprite;
    this.game = game;

    //The invincible power up makes the player tank invincible for a set duration
    this.invincibilityDuration = 3600;

    //console.log(tankGroup);
    powerUp.call(this, powerUpType, location, gameLevel, powerUpGroup, sprite, game);

    
}
invincible.prototype = Object.create( powerUp);
invincible.prototype.constructor = invincible;

invincible.prototype.create = function()
{
    
}
    



module.exports = invincible;