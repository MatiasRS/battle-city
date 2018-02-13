var player = function()
{
    
    this.lives = 3;
    this.score = 0; 
} 
player.prototype.constructor = player;

player.prototype.create = function()
{
    
}
    
module.exports = player;