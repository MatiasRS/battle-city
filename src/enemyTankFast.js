var tank = require ('tank');


var enemyTankFast = function(tankType, location, gameLevel, tankGroup, sprite)
{
    console.log("%cCreating new enemyTankFast...", "color:white; background:red");
    
    this.type = tankType;
    this.location = location; 
    this.gameLevel = gameLevel;
    this.tankGroup = tankGroup;
    this.sprite = sprite;

    //console.log(tankGroup);
    tank.call(this, tankType, location, gameLevel, tankGroup, sprite);

     //Faster and nimbler
     this.speed = 350;
     this.fireRate = 300;
     this.reward = 150;
     this.directionChangeFrequency = 300;
}
enemyTankFast.prototype = Object.create( tank);//new tank()); 
enemyTankFast.prototype.constructor = enemyTankFast;

enemyTankFast.prototype.create = function()
{
    
}
    



module.exports = enemyTankFast;