var tank = require ('tank');


var enemyTankBig = function(tankType, location, gameLevel, tankGroup, sprite)
{
    console.log("%cCreating new enemyTankBig...", "color:white; background:red");
    
    this.type = tankType;
    this.location = location; 
    this.gameLevel = gameLevel;
    this.tankGroup = tankGroup;
    this.sprite = sprite;

    //console.log(tankGroup);
    tank.call(this, tankType, location, gameLevel, tankGroup, sprite);

    //Bigger and slower
    this.hitpoints = 4;
    this.speed = 100;
    this.fireRate = 800;
    this.reward = 200;
    this.directionChangeFrequency = 600;
}
enemyTankBig.prototype = Object.create( tank);//new tank()); 
enemyTankBig.prototype.constructor = enemyTankBig;

enemyTankBig.prototype.create = function()
{
    
}
    



module.exports = enemyTankBig;