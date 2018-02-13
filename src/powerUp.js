var powerUp = function(powerUpType, location, gameLevel, powerUpGroup, sprite, game)
{
    this.lifespan = 5000;
    this.blinkTime = 2000;
    this.type = powerUpType;
    this.location = location; 
    this.gameLevel = gameLevel;
    this.tankGroup = powerUpGroup;
    this.powerUpSprite = powerUpGroup.create(location.world.x + this.gameLevel.spriteSize, location.world.y + this.gameLevel.spriteSize, sprite); ;

    this.powerUpSprite.width = this.gameLevel.spriteSize * 2 - 10;
    this.powerUpSprite.height = this.gameLevel.spriteSize * 2 - 10;
    this.powerUpSprite.anchor.setTo(0.5, 0.5);
    
    this.blinking = game.add.tween(this.powerUpSprite).to( { alpha: 100 }, 100, Phaser.Easing.Linear.None, false, 0, 1000, true)

}

powerUp.prototype.create = function()
{
    
}

module.exports = powerUp;