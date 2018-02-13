var powerUp = require ('powerUp');


var machineGun = function(powerUpType, location, gameLevel, powerUpGroup, sprite, game)
{
    console.log("%cCreating new machine gun...", "color:white; background:red");
    
    this.type = powerUpType;
    this.location = location; 
    this.gameLevel = gameLevel;
    this.powerUpGroup = powerUpGroup;
    this.sprite = sprite;
    this.game = game;

    //The invincible power up makes the player tank invincible for a set duration
    this.machineGunFireRate = 100;

    //console.log(tankGroup);
    powerUp.call(this, powerUpType, location, gameLevel, powerUpGroup, sprite, game);

    
}
machineGun.prototype = Object.create( powerUp);
machineGun.prototype.constructor = machineGun;

machineGun.prototype.create = function()
{
    
}
    



module.exports = machineGun;