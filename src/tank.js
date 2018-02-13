
var tank = function(tankType, location, gameLevel, tankGroup, sprite)
{
    
    this.hitpoints = 1;
    this.speed = 250;
    this.fireRate = 600;
    this.nextDirectionChange = 0
    this.directionChangeFrequency = 400;
    this.nextFire = 0;
    this.type = tankType;
    this.location = location; 
    this.gameLevel = gameLevel;
    this.tankGroup = tankGroup;
    this.tankSprite = tankGroup.create(location.world.x + this.gameLevel.spriteSize, location.world.y + this.gameLevel.spriteSize, sprite); ;

    this.tankSprite.width = this.gameLevel.spriteSize * 2 - 10;
    this.tankSprite.height = this.gameLevel.spriteSize * 2 - 10;
    this.tankSprite.anchor.setTo(0.5, 0.5);

    this.tankSprite.animations.add('move', [0, 1, 2, 3, 4, 5, 6], 10, true);
    
}

tank.prototype.create = function()
{
    
}	

tank.prototype.getType = function()
{
    return this.type;
}


module.exports = tank;