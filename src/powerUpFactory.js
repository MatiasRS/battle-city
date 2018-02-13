var freezeTime = require ('freezeTime');
var invincible = require ('invincible');
var machineGun = require ('machineGun');

var powerUpFactory = function()
{
    
}
 
powerUpFactory.prototype.create = function(powerUpType, location, gameLevel, powerUpGroup, game)
{
    switch(powerUpType)
    {
        case "FreezeTime":
            var newPower = new freezeTime(powerUpType, location, gameLevel, powerUpGroup, "timePower", game);
            break;
        case "Invincible":
            var newPower = new invincible(powerUpType, location, gameLevel, powerUpGroup, "invincible", game);
            break;
        case "MachineGun":
            var newPower = new machineGun(powerUpType, location, gameLevel, powerUpGroup, "bullet", game);
            break;
        default:

    }
    return newPower;
}

module.exports = powerUpFactory;