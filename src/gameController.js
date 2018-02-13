var level = require ('level');
var tankFactory = require ('tankFactory');
var powerUpFactory = require ('powerUpFactory');
var player = require ('player');

var gameController = function(game)
{
    //Constants
    var BULLET_SPEED = 650;
    var ENEMY_SPAWN_DELAY = 2000;
    var ENEMY_SPAWNING_FREQUENCY = 7000; //How often a new enemy tank is spawned
    var POWER_UP_SPAWNING_FREQUENCY = 15000; //How often a new power up is spawned

    var self = this;
    var lives;
    var tanks;
    var powerUps;
    var tankers;
    var powerUpObjects;
    var bullets;
    var gameLevel;
    var factory;
    var factoryPowerUp;
    var playerTank;
    var cursors;
    var shootKey;
    var bulletSpeed;   
    var tankTypes;
    var powerUpTypes;
    var playerIndex;   
    var nextSpawn;
    var nextPlayerSpawn;
    var nextPowerUpSpawn = 10000;
    var playerSpawnCooldown;
    var enemiesSpawned;
    var gameFinished;
    var timeToScoreScreen;
    var nextScoreScreen;
    var score;
    var firedPlayerBullets;
    var playerKilled;
    var killedEnemies;
    var tankBlinking;
    var isTimeFrozen;
    
    self.create = function()
    {
        gameLevel = new level(game);
        gameLevel.create();

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        factory = new tankFactory();
        factoryPowerUp = new powerUpFactory();

        tanks = game.add.group();
        tanks.enableBody = true;

        powerUps = game.add.group();
        powerUps.enableBody = true;

        explosions = game.add.group();

        tankers = [];
        powerUpObjects = [];
        lives = 3;
        gameFinished = false;
        isTimeFrozen = false;
        tankTypes = ["NormalEnemy", "FastEnemy", "BigEnemy"]; //Types of enemy tanks. Increase this list as new tank classes are added.
        powerUpTypes = ["Invincible", "FreezeTime"]; //Types of power ups. Increase this list as new power up classes are added.
        bulletSpeed = BULLET_SPEED;
        nextSpawn = 0;
        nextPlayerSpawn = 0;
        nextPowerUpSpawn = 10000;
        playerSpawnCooldown = 2000;
        enemiesSpawned = 0;
        timeToScoreScreen = 2000;
        nextScoreScreen = 0;
        score = 0;
        firedPlayerBullets = [];
        killedEnemies = [["NormalEnemy",0,100],["FastEnemy",0,200],["BigEnemy",0,150]];

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        //  Our controls.
        shootKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        cursors = game.input.keyboard.createCursorKeys();
        
        
    }

    self.update = function()
    {
        spawnPlayer();
        spawnEnemy();
        spawnPowerUp();

        checkCollisions();
        moveTanks();
        shootTanks();
    }

    //Function that checks all collisions and overlaps happening in the game
    checkCollisions = function()
    {
        game.physics.arcade.collide(tanks, gameLevel.brickWalls);
        
        game.physics.arcade.collide(tanks, gameLevel.eagles);
        
        
        tankers.forEach(tank => 
        {
            //Enemy tanks automatically change direction when colliding against a steel wall
            if(tank.type != "Player")
            {
                if(game.physics.arcade.collide(tank.tankSprite, gameLevel.steelWalls) == true)
                {
                    changeTankDirection(tank);
                }
            }
            else
            {
                game.physics.arcade.collide(tank.tankSprite, gameLevel.steelWalls);
            }
            //Enemy tanks collide with each other, but not the playerTank
            if(tank.type != "Player")
            {
                tankers.forEach(tank2 => 
                {
                    if(tank2.type != "Player")
                    {
                        game.physics.arcade.collide(tank.tankSprite, tank2.tankSprite);
                    } 
                });
            }
            //Enemy tanks are only damaged by bullets fired by the playerTank. PlayerTank is damaged by bullets fired by the enemies.
            bullets.forEach(bullet => 
            {
                if(game.physics.arcade.overlap(tank.tankSprite, bullet, containBullets, null, this) == true)
                {
                    if(tank.type == "Player" && playerKilled == false && tank.invincibility == false)
                    {
                        dealDamage(tank);
                        destroyPlayerBullet(bullet);
                        playerKilled = true;
                    }
                    else if(firedPlayerBullets.includes(bullet))
                    {
                        dealDamage(tank);
                        destroyPlayerBullet(bullet);
                    }          
                }
            }); 
            //The playerTank is killed by overlaping with the enemies. 
            if(game.physics.arcade.overlap(tank.tankSprite, tanks, null, null, this) == true)
            {
                if(tank.type == "Player" && playerKilled == false && tank.invincibility == false)
                {
                    dealDamage(tank);
                    playerKilled = true;
                }   
            }
            //Only the playerTank can activate the powerUps
            if(tank.type == "Player" && playerKilled == false)
            {
                powerUpObjects.forEach(powerUp => 
                {
                    if(game.physics.arcade.overlap(tank.tankSprite, powerUp.powerUpSprite, null, null, this) == true)
                    {
                        if(powerUp.type == "FreezeTime") //If the powerUp is freezeTime, activate it
                        {
                            freezeTime(powerUp);
                            destroyPowerUp(powerUp);
                        }
                        else if(powerUp.type == "Invincible") //If the powerUp is invincible, activate it
                        {
                            setInvincible(tank, powerUp);
                            destroyPowerUp(powerUp);
                        }    
                    }   
                });
            }
            
        }); //End foreach

        //Simple overlap events that destroy sprites
        game.physics.arcade.overlap(gameLevel.brickWalls, bullets, destroyElement, null, this);
        game.physics.arcade.overlap(gameLevel.steelWalls, bullets, containBulletsSteel, null, this);
        game.physics.arcade.overlap(bullets, bullets, destroyElement, null, this);
        game.physics.arcade.overlap(gameLevel.eagles, bullets, destroyElement, null, this);
    }

    //Function that spawns a new tankPlayer as long as the current one is no alive. The spawners blink shortly before spawning it
    spawnPlayer = function()
    {
        if((!tankers.length > 0 || tankers[0].type != "Player") && gameFinished == false && game.time.now > nextPlayerSpawn)
        {
            nextPlayerSpawn = game.time.now + playerSpawnCooldown;
            //A random spawn point is selected
            var randomSpawn = Math.floor(Math.random() * gameLevel.playerSpawnPoints.length);
            var spawn = gameLevel.playerSpawnPoints.getAt(randomSpawn);

            //The spawners start blinking before the new tank is created
            if(!gameLevel.PlayerSpawnTweens[randomSpawn].isRunning)
            {
                gameLevel.PlayerSpawnTweens[randomSpawn].start(0);
            }
            else
            {
                gameLevel.PlayerSpawnTweens[randomSpawn].resume(0);
            }

            game.time.events.add(ENEMY_SPAWN_DELAY, blinkSpawnPointPlayer, this, spawn, randomSpawn); 
        }
    }

    //Function that spawns a new enemy as long as the max amount of enemies hasn't been reached. The spawners blink shortly before spawning it
    spawnEnemy = function()
    {
        if(game.time.now > nextSpawn && enemiesSpawned < gameLevel.maxEnemies && gameFinished == false && isTimeFrozen == false)
        {
            nextSpawn = game.time.now + ENEMY_SPAWNING_FREQUENCY; //The time of the next spawn is determined here
            //A random spawn point is selected
            var randomSpawn = Math.floor(Math.random() * gameLevel.enemySpawnPoints.length);
            var spawn = gameLevel.enemySpawnPoints.getAt(randomSpawn);

            //The spawners start blinking before the new tank is created
            if(!gameLevel.EnemySpawnTweens[randomSpawn].isRunning)
            {
                gameLevel.EnemySpawnTweens[randomSpawn].start(0);
            }
            else
            {
                gameLevel.EnemySpawnTweens[randomSpawn].resume(0);
            }

            game.time.events.add(ENEMY_SPAWN_DELAY, blinkSpawnPointEnemies, this, spawn, randomSpawn); 
        }
        
    }

    //Function that creates a new player tank using the factory. The player is invincible for a while
    blinkSpawnPointPlayer = function(spawn, randomSpawn) 
    {        
        playerTank = factory.create("Player", spawn, gameLevel, tanks, game);
        playerIndex = tanks.getChildIndex(playerTank.tankSprite);
        tankers.unshift(playerTank);
        playerKilled = false;
        
        console.log("Invincibility: " + playerTank.invincibility);

        playerTank.tankSprite.addChild(playerTank.invincibilityStar);

        game.time.events.add(playerTank.invincibilityDuration, disableInvincibility, this, playerTank, playerTank.invincibilityStar); 
        

        gameLevel.PlayerSpawnTweens[randomSpawn].alpha = 0;
        gameLevel.PlayerSpawnTweens[randomSpawn].pause(0);
        
    }

    //Function that creates a new enemy tank using the factory.
    blinkSpawnPointEnemies = function(spawn, randomSpawn) 
    {        
        var enemyType = tankTypes[Math.floor(Math.random() * tankTypes.length)];
        var enemyTank = factory.create(enemyType, spawn, gameLevel, tanks, game);
        tankers.push(enemyTank);
        enemiesSpawned++;

        gameLevel.EnemySpawnTweens[randomSpawn].visible = false;
        gameLevel.EnemySpawnTweens[randomSpawn].pause(0);
        
    }

    //Function that disables invincibility for the player
    disableInvincibility = function(tank, invincibility) 
    {
        tank.invincibility = false;

        invincibility.kill();
        console.log("Invincibility: " + tank.invincibility);
    }

    //Function that creates a new power up using the factory.
    spawnPowerUp = function() 
    {
        if(game.time.now > nextPowerUpSpawn && gameFinished == false && isTimeFrozen == false && playerTank != null)
        {
            nextPowerUpSpawn = game.time.now + POWER_UP_SPAWNING_FREQUENCY;
            //The powerUp spawns on top of any brickWall, as long as said brickWall is not in the close vicinity of the player tank
            var spawn = gameLevel.brickWalls.getRandom();
            while(spawn.world.x < playerTank.tankSprite.world.x + 64 && spawn.world.x > playerTank.tankSprite.world.x - 64 && spawn.world.y < playerTank.tankSprite.world.y + 64 && spawn.world.y > playerTank.tankSprite.world.y - 64)
            {
                spawn = gameLevel.brickWalls.getRandom();
            }

            //The spawned power up is random
            var powerUpType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];

            var powerUp = factoryPowerUp.create(powerUpType, spawn, gameLevel, powerUps, game);
            powerUpObjects.push(powerUp);

            //The death of the power up is queued
            game.time.events.add(powerUp.lifespan, blinkPowerUp, this, powerUp); 
        }
    }

    //Intermediate function that makes the power up blink before it's destroyed
    blinkPowerUp = function(powerUp) 
    {
        console.log("Blinking... ");
        powerUp.blinking.start(0);
        game.time.events.add(powerUp.blinkTime, destroyPowerUp, this, powerUp); 
    }

    //Function that destroys a powerUp
    destroyPowerUp = function(powerUp) 
    {
        powerUp.powerUpSprite.kill();
        removeElement(powerUpObjects, powerUp);
    }

    //Function that moves the tanks every frame
    moveTanks = function()
    {
        tankers.forEach(function(tank)
        { 
            //Check player inputs
            if(tank.type == "Player")
            {
                checkPlayerInputs(tank);
            }
            else //Enemy AI
            {
                checkEnemyAI(tank);
            }
        });
    }

    //Function that checks the player inputs, moving the playerTank accordingly
    checkPlayerInputs = function(tank)
    {
        //  Reset the players velocity (movement)
        tank.tankSprite.body.velocity.x = 0;
        tank.tankSprite.body.velocity.y = 0;

        if(gameFinished == false)
        {
            if (cursors.left.isDown)
            {
                moveLeft(tank);
            }
            else if (cursors.right.isDown)
            {
                moveRight(tank);
            }
            else if (cursors.up.isDown)
            {
                moveUp(tank);
            }
            else if (cursors.down.isDown)
            {
                moveDown(tank);
            }
            else
            {
                //  Stand still
                tank.tankSprite.animations.stop();
            }
        }
        
    }

    checkEnemyAI = function(tank)
    {
        
        var randomValidDirection;

        //Only change direction every directionChangeFrequency frames
        if(game.time.now > tank.nextDirectionChange)
        {
            //Resets the tank's velocity
            tank.tankSprite.body.velocity.x = 0;
            tank.tankSprite.body.velocity.y = 0;

            tank.nextDirectionChange = game.time.now + tank.directionChangeFrequency;

            //Get all valid directions (left, right, top or down
            var validDirections = getValidDirections(tank);

            if(validDirections.length > 0)
            {
                //Choose a random valid direction
                randomValidDirection = validDirections[Math.floor(Math.random() * (validDirections.length + 1))];
            }
            
        }
        //Move the tank according the chosen direction
        if (randomValidDirection == "left" && isTimeFrozen == false)
        {
            moveLeft(tank);
        }
        else if (randomValidDirection == "right" && isTimeFrozen == false)
        {
            moveRight(tank);
        }
        else if (randomValidDirection == "up" && isTimeFrozen == false)
        {
            moveUp(tank);
        }
        else if (randomValidDirection == "down" && isTimeFrozen == false)
        {
            moveDown(tank);
        }
        else
        {
            //  Stand still
            tank.tankSprite.animations.stop();
        }

    }

    //Function that removes possible directions from the validDirections array depending on how the tank collided with the environment
    getValidDirections = function(tank)
    {
        //TODO: check offset collisions
        var offsetCollisions = 10;

        var validDirections = ["left", "right", "up", "down"];

        if(tank.tankSprite.body.touching.left == true)
        {
            removeElement(validDirections, "left");
        }
        if(tank.tankSprite.body.touching.right == true)
        {
            removeElement(validDirections, "right");
        }
        if(tank.tankSprite.body.touching.up == true)
        {
            removeElement(validDirections, "up");
        }
        if(tank.tankSprite.body.touching.down == true)
        {
            removeElement(validDirections, "down");
        }

        return validDirections;
    }

    //Function that forcibly changes the direction of a tank if this one collided with a steel wall
    changeTankDirection = function(tank)
    {
        tank.nextDirectionChange = 0;
    }

    //Function that removes the element from an array
    removeElement = function(array, element)
    {
        var index = array.indexOf(element);
        if (index > -1) 
        {
            array.splice(index, 1);
        }
    }

    moveLeft = function(tank)
    {
        //  Move to the left
        tank.tankSprite.body.velocity.x = -tank.speed;
        tank.tankSprite.angle = 270;
        tank.tankSprite.animations.play('move');
    }

    moveRight = function(tank)
    {
        //  Move to the right
        tank.tankSprite.body.velocity.x = tank.speed;
        tank.tankSprite.angle = 90;
        tank.tankSprite.animations.play('move');
    }

    moveUp = function(tank)
    {
        //  Move up
        tank.tankSprite.body.velocity.y = -tank.speed;
        tank.tankSprite.angle = 0;
        tank.tankSprite.animations.play('move');
    }

    moveDown = function(tank)
    {
        //  Move down
        tank.tankSprite.body.velocity.y = tank.speed;
        tank.tankSprite.angle = 180;
        tank.tankSprite.animations.play('move');
    }

    //Function that checks each frame is a tank has shot a bullet
    shootTanks = function(tank)
    {
        tankers.forEach(function(tank)
        {
            //Check player inputs
            if(tank.type == "Player")
            {
                checkPlayerFire(tank);
            }
            else //Enemy AI
            {
                checkEnemyFire(tank);
            }
        });

        
    }

    //Function that regulates the fire rate of the player tanks
    checkPlayerFire = function(tank)
    {
        if(shootKey.isDown && game.time.now > tank.nextFire && gameFinished == false)
        {
            fire(tank);
        }
    }

    //Function that regulates the fire rate of enemy tanks
    checkEnemyFire = function(tank)
    {
        if(game.time.now > tank.nextFire && isTimeFrozen == false)
        {
            fire(tank);
        }
    }

    //Function that determines the angle and offset of the new bullet to be fired
    fire = function(tank)
    {
        tank.nextFire = game.time.now + tank.fireRate;
            
        var bullet;
        var bulletShotOffset = 40;
        
        switch(tank.tankSprite.angle)
        {
            
            case 0:
                bullet = spawnBullet(tank, 0, -bulletShotOffset, 0, -bulletSpeed);
                break;
            case 90:
                bullet = spawnBullet(tank, bulletShotOffset, 0, bulletSpeed, 0);
                break;
            case -180:
                bullet = spawnBullet(tank, 0, bulletShotOffset, 0, bulletSpeed);
                break;
            case -90:
                bullet = spawnBullet(tank, -bulletShotOffset, 0, -bulletSpeed, 0);
                break;
            default:
        }  
        bullet.angle = tank.tankSprite.angle;

        if(tank.type == "Player")
        {
            firedPlayerBullets.push(bullet);
            //console.log("FiredBullets: " + firedPlayerBullets.length);
        }
    }

    //Function that creates a new moving bullet with the position of a tank
    spawnBullet = function(tank, offsetX, offsetY, velocityX, velocityY)
    {
        var bullet = bullets.create(tank.tankSprite.world.x + offsetX, tank.tankSprite.world.y + offsetY, 'bullet'); 
        bullet.scale.setTo(0.25, 0.25);
        bullet.anchor.setTo(0.5, 0.5);
        //bullet.lifespan = 1000;
        bullet.body.velocity.x = velocityX;
        bullet.body.velocity.y = velocityY;
        return bullet;
    }

    //Function called by the overlap condition that deals 1 point of damage to the tank. It then checks if the tank is destroyed 
    dealDamage = function(tank, bullet)
    {   
        tank.hitpoints--;
        console.log("Tank hit! Hitpoints: " + tank.hitpoints);
        destroyTank(tank);
    }

    //Function called by the overlap condition that kills a bullet and the obstacle.
    destroyElement = function(element, bullet)
    {
        element.kill();
        if(element.parent == gameLevel.eagles) //If the obstacle is the eagle sign, the game is lost
        {
            spawnExplosion(element);
            gameOver();
            
        }

        bullet.kill();
        
        //game.time.events.add(100, destroyPlayerBullet, bullet, this);
        destroyPlayerBullet(bullet);
    }

    //Function called by the overlap condition that kills a bullet, but not the obstacle.
    containBullets = function(steel, bullet)
    {
        bullet.kill();
    }

    //Function called by the overlap condition that kills a bullet, but not the obstacle. It then attempts to remove the bulled from the firedPlayerBullets array
    containBulletsSteel = function(steel, bullet)
    {
        bullet.kill();
        
        //game.time.events.add(100, destroyPlayerBullet, bullet, this);
        destroyPlayerBullet(bullet);
    }

    //Function that removes a bullet from the firedPlayerBullets array
    destroyPlayerBullet = function(bullet)
    {
        //Removes de bullet from the bullet array if it is contained by said array
        if(firedPlayerBullets.includes(bullet))
        {
            removeElement(firedPlayerBullets, bullet);
        }
    }
    //Function that checks the hitmpoints of a tank, killing the sprite, spawning an explosion, removing it from the tankers array and checking the victory conditions if it is destroyed
    destroyTank = function(tank)
    {
        if(tank.hitpoints <= 0)
        {
            tank.tankSprite.kill();
            spawnExplosion(tank.tankSprite);

            removeElement(tankers, tank);

            if(tank.type != "Player")
            {
                gameLevel.updateEnemyMarker(); 
                updateKillCount(tank); //We update the number of enemies killed
                score += tank.reward;
                //If the amount of enemies remaining is 0, the game is won
                if(gameLevel.remainingEnemies <= 0)
                {
                    gameWon();
                }

            }
            else
            {
                gameLevel.updateLives(); 
                if(gameLevel.lives <= 0) //If the player is out of lives, the game is lost
                {
                    gameOver();
                }
                else //Otherwise, a new player spawn is queued
                {
                    nextPlayerSpawn = game.time.now + playerSpawnCooldown;
                }
            }
        }
        
    }
    //Function used by the scoreBoard class. The amount of enemy tanks killed along their names and rewards are updated
    updateKillCount = function(tank)
    {
        switch(tank.type)
        {    
            case "NormalEnemy":
                killedEnemies[0][0] = tank.type;
                killedEnemies[0][1]++;
                killedEnemies[0][2] = tank.reward;
                break;
            case "FastEnemy":
                killedEnemies[1][0] = tank.type;
                killedEnemies[1][1]++;
                killedEnemies[1][2] = tank.reward;
                break;
            case "BigEnemy":
                killedEnemies[2][0] = tank.type;
                killedEnemies[2][1]++;
                killedEnemies[2][2] = tank.reward;
                break;
            default:
        }  
        
    }

    //Function that finishes the game when the player loses
    gameOver = function()
    {
        gameFinished = true;
        gameLevel.updateGameOver();
        game.time.events.add(timeToScoreScreen, goToScoreBoard, this);
    }

    //Function that finishes the game when the player wins
    gameWon = function()
    {
        gameFinished = true;
        gameLevel.updateGameWon();
        game.time.events.add(timeToScoreScreen, goToScoreBoard, this);
    }

    //Intermediate function called by gameWon or gameOver to go to the scoreBoard state
    goToScoreBoard = function()
    {
        game.state.start("ScoreBoard",true,false,score, killedEnemies);
    }

    //Function that spawns an explosion, only to then destroy it
    spawnExplosion = function(element)
    {
        var explosion = explosions.create(element.world.x, element.world.y, 'explosion');
        var animation = explosion.animations.add('explode', [0, 1, 2, 0], 20, false);
        explosion.anchor.setTo(0.5, 0.5);
        animation.killOnComplete = true;
        animation.play('explode');
    }

    //Function that freezes enemy tanks by disabling their move and shoot functions. This also keeps the gameController from spawning more powerUps and enemies
    freezeTime = function(powerUp)
    {
        isTimeFrozen = true;
        gameLevel.updateFrozenText();
        console.log("Freeze time activated!");
        game.time.events.add(powerUp.freezeDuration, resumeTime, this); 
    }

    //Function called by freezeTime to resume the movement of the enemies.
    resumeTime = function()
    {
        isTimeFrozen = false;
        gameLevel.updateFrozenText();
    }

    setInvincible = function(tank, powerUp)
    {
        tank.invincibility = true;

        tank.invincibilityStar.revive();
        tank.invincibilityStarTween.start();
        console.log("Invincible activated!");
        game.time.events.add(powerUp.invincibilityDuration, disableInvincibility, this, playerTank, playerTank.invincibilityStar); 
    }

    return self;
}
 
module.exports = gameController;