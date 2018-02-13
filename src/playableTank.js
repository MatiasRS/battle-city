var tank = require ('tank');


var playableTank = function(tankType, location, gameLevel, tankGroup, sprite, game)
{
    console.log("%cCreating new playable tank...", "color:white; background:red");
    
    this.invincibility = true;
    this.invincibilityDuration = 2000;
    this.fireRate = 350;
    this.type = tankType;
    this.location = location; 
    this.gameLevel = gameLevel;
    this.tankGroup = tankGroup;
    this.sprite = sprite;

    this.invincibilityStar = game.make.sprite(0, 0, "invincible");
    //tank.tankSprite.addChild(invincibilityStar);
    this.invincibilityStar.anchor.setTo(0.5,0.5);
    this.invincibilityStar.width = gameLevel.spriteSize * 3;
    this.invincibilityStar.height = gameLevel.spriteSize * 3;
    this.invincibilityStarTween = game.add.tween(this.invincibilityStar).to( { angle: 360 }, this.invincibilityDuration, Phaser.Easing.Linear.None, true, true);

    //console.log(tankGroup);
    tank.call(this, tankType, location, gameLevel, tankGroup, sprite);
}
playableTank.prototype = Object.create( tank);//new tank()); 
playableTank.prototype.constructor = playableTank;

playableTank.prototype.create = function()
{
    
}
    



module.exports = playableTank;