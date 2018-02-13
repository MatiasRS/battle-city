var tank = require ('tank');


var enemyTankNormal = function(tankType, location, gameLevel, tankGroup, sprite)
{
    console.log("%cCreating new enemyTankNormal...", "color:white; background:red");
    
    this.type = tankType;
    this.location = location; 
    this.gameLevel = gameLevel;
    this.tankGroup = tankGroup;
    this.sprite = sprite;

    this.reward = 100;
    this.directionChangeFrequency = 500;

    //console.log(tankGroup);
    tank.call(this, tankType, location, gameLevel, tankGroup, sprite);
}
enemyTankNormal.prototype = Object.create( tank);//new tank()); 
enemyTankNormal.prototype.constructor = enemyTankNormal;

enemyTankNormal.prototype.create = function()
{
    
}
    



module.exports = enemyTankNormal;