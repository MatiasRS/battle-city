var playableTank = require ('playableTank');
var enemyTankNormal = require ('enemyTankNormal');
var enemyTankFast = require ('enemyTankFast');
var enemyTankBig = require ('enemyTankBig');

var tankFactory = function()
{
    
}
 
tankFactory.prototype.create = function(tankType, location, gameLevel, tankGroup, game)
{
    //console.log(tankGroup);
    switch(tankType)
    {
        case "Player":
            var newTank = new playableTank(tankType, location, gameLevel, tankGroup, "playerTank", game);
            break;
        case "NormalEnemy":
            var newTank = new enemyTankNormal(tankType, location, gameLevel, tankGroup, "enemyTankNormal");
            break;
        case "FastEnemy":
            var newTank = new enemyTankFast(tankType, location, gameLevel, tankGroup, "enemyTankFast");
            break;
        case "BigEnemy":
            var newTank = new enemyTankBig(tankType, location, gameLevel, tankGroup, "enemyTankBig");
            break;
        default:

    }
    return newTank;
}

module.exports = tankFactory;