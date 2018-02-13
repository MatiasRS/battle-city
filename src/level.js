var level = function(game)
{
	var self = this;
	console.log("%cBuilding level...", "color:white; background:red");
	
    self.spriteSize = 32;
    self.maxEnemies = 8;
    self.lives = 3;
    self.remainingEnemies = self.maxEnemies;
    self.remainingArray = [];
                           //1       //2      //3        //4       //5      //6       //7        //8       //9      //10      //11      //12      //13      //14
    var levelMatrix = [['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
                /*1*/   ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
                        ['S', 'S', 'E', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'W', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S', 'S'],
                /*2*/   ['S', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'W', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S', 'S'],
                        ['S', 'S', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', '0', '0', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'S', 'S'],
                /*3*/   ['S', 'S', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', '0', '0', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'S', 'S'],
                        ['S', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'W', 'W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S', 'S'],
                /*4*/   ['S', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'W', 'W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S', 'S'],
                        ['S', 'S', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'W', 'W', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'S', 'S'],
                /*5*/   ['S', 'S', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'W', 'W', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'S', 'S'],
                        ['S', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S', 'S'],
                /*6*/   ['S', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'P', '0', 'S', 'S'],
                        ['S', 'S', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'W', 'W', '0', '0', 'W', 'W', 'W', 'W', 'W', '0', '0', '0', '0', '0', 'S', 'S'],
                /*7*/   ['S', 'S', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'W', 'W', '0', '0', 'W', 'W', 'W', 'W', 'W', '0', '0', 'W', 'W', 'W', 'S', 'S'],
                        ['S', 'S', 'E', '0', '0', '0', '0', 'S', 'S', '0', '0', '0', '0', '0', '0', '0', '0', 'W', 'W', '0', '0', '0', '0', 'W', 'A', '0', 'S', 'S'],
                /*8*/   ['S', 'S', '0', '0', '0', '0', '0', 'S', 'S', '0', '0', '0', '0', '0', '0', '0', '0', 'W', 'W', '0', '0', '0', '0', 'W', '0', '0', 'S', 'S'],
                        ['S', 'S', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'W', 'W', '0', '0', 'W', 'W', 'W', 'W', 'W', '0', '0', 'W', 'W', 'W', 'S', 'S'],
                /*9*/   ['S', 'S', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'W', 'W', '0', '0', 'W', 'W', 'W', 'W', 'W', '0', '0', '0', 'P', '0', 'S', 'S'],
                        ['S', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S', 'S'],
                /*10*/  ['S', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S', 'S'],
                        ['S', 'S', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'W', 'W', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'S', 'S'],
                /*11*/  ['S', 'S', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'W', 'W', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'S', 'S'],
                        ['S', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'W', 'W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S', 'S'],
                /*12*/  ['S', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'W', 'W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S', 'S'],
                        ['S', 'S', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', '0', '0', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'S', 'S'],
                /*13*/  ['S', 'S', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', '0', '0', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'S', 'S'],
                        ['S', 'S', 'E', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'W', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S', 'S'],
                /*14*/  ['S', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'W', 'S', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'S', 'S'],
                        ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
                /*15*/  ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
                        ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
                /*16*/  ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']
                    ]; 
    
    self.brickWalls;
    self.steelWalls;
    self.enemySpawnPoints;
    self.playerSpawnPoints;
    self.eagles;
    self.gameOverText;
    self.gameWonText;
    self.powerUpText;
    self.EnemySpawnTweens = [];
    self.PlayerSpawnTweens = [];
    self.PlayerSpawnTween;
    var livesText;
    var remainingEnemiesGroup;
    
    self.create = function()
    {
        initializeElements();
        buildLevel(levelMatrix);
        var placementX = (levelMatrix.length - 3) * self.spriteSize;
        var placementY = (levelMatrix.length - 10) * self.spriteSize;
        placeGUI(placementX, 2 * self.spriteSize, placementX, placementY);
    }

    //Function that displays the amount of remaining enemies
    self.updateEnemyMarker = function()
    {
        var lastMarker = remainingEnemiesGroup.getTop();
        remainingEnemiesGroup.removeChild(lastMarker);
        self.remainingEnemies--;
    }

    //Function that displays the lives remaining
    self.updateLives = function()
    {
        self.lives--;
        livesText.text = "IP: " + self.lives;
    }

    //Function that displays the game over text
    self.updateGameOver = function()
    {
        self.gameOverText.alpha = 100;
    }

    //Function that displays the game won text
    self.updateGameWon = function()
    {
        self.gameWonText.alpha = 100;
    }

    //Function that makes the time frozen! text appear or disappear
    self.updatePowerUpText = function(powerUpType)
    {
        if(powerUpType == "FreezeTime")
        {
            self.powerUpText.text = "Freeze time activated!";
        }
        else if(powerUpType == "MachineGun")
        {
            self.powerUpText.text = "Machine gun activated!";
        }
        else if(powerUpType == "Invincibility")
        {
            self.powerUpText.text = "Invincibility activated!";
        }

        if(self.powerUpText.alpha == 0)
        {
            self.powerUpText.alpha = 100;
        }
        else
        {
            self.powerUpText.alpha = 0;
        }
    }
    
    var initializeElements = function()
    {
        self.brickWalls = game.add.group();
        self.brickWalls.enableBody = true;

        self.steelWalls = game.add.group();
        self.steelWalls.enableBody = true;
        
        self.enemySpawnPoints = game.add.group();
        //enemySpawnPoints.enableBody = true;
        
        self.playerSpawnPoints = game.add.group();
        //playerSpawnPoints.enableBody = true;
        
        self.eagles = game.add.group();
        self.eagles.enableBody = true;

        remainingEnemiesGroup = game.add.group();

        
    }
    
    //Function that builds the level by creating sprites of the type and in the layout specified by the levelMatrix
    var buildLevel = function(levelMatrix)
    {
        var levelSprite;
        var spriteCode;
        
        for (var i = 0; i < levelMatrix.length; i++)
        {
            for (var j = 0; j < levelMatrix[i].length; j++)
            {
                switch(levelMatrix[i][j]) 
                {
                    case 'W': //A different sprite is created and added to a gropu depending on the code in the matrix
                        spriteCode = "brickWall";
                        levelSprite = self.brickWalls.create(i * self.spriteSize, j * self.spriteSize, spriteCode);
                        break;
                    case 'S':
                        spriteCode = "steelWall";
                        levelSprite = self.steelWalls.create(i * self.spriteSize, j * self.spriteSize, spriteCode);
                        break;
                    case 'E':
                        spriteCode = "eSpawn";
                        levelSprite = self.enemySpawnPoints.create(i * self.spriteSize, j * self.spriteSize, spriteCode);
                        levelSprite.alpha = 0;
                        self.EnemySpawnTweens.push(game.add.tween(levelSprite).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, false, 0, 1000, true));
                        break;
                    case 'P':
                        spriteCode = "pSpawn"; //Spawners have fade tweens
                        levelSprite = self.playerSpawnPoints.create(i * self.spriteSize, j * self.spriteSize, spriteCode);
                        levelSprite.alpha = 0;
                        self.PlayerSpawnTweens.push(game.add.tween(levelSprite).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, false, 0, 1000, true));
                        break;
                    case 'A':
                        spriteCode = "eagle";
                        levelSprite = self.eagles.create(i * self.spriteSize, j * self.spriteSize, spriteCode);
                        break;
                    default:
                        spriteCode = "path";
                }
                
                if(spriteCode != "path")
                {
                    
                    levelSprite.width = self.spriteSize;
                    levelSprite.height = self.spriteSize;
                    
                    //Spawners don't have bodies
                    if(spriteCode != "eSpawn" && spriteCode != "pSpawn")
                    {
                        levelSprite.body.immovable = true;
                    }
                    //Walls are inflated for collision checks
                    if(spriteCode == "brickWall" || spriteCode == "steelWall")
                    {
                        Phaser.Rectangle.inflate(levelSprite.getBounds(), 5, 5);
                    }
                    
                    //Spawners and the eagle are twice as large as the other blocks
                    if(spriteCode == "eagle" || spriteCode == "eSpawn" || spriteCode == "pSpawn")
                    {
                        levelSprite.width = self.spriteSize * 2;
                        levelSprite.height = self.spriteSize * 2;
                    }
                }
                
            }
        }
        
    }

    //Function that places the texts and markers in the game
    var placeGUI = function(remainingX, remainingY, livesX, livesY)
    {

        for (var i = 0; i < 2; i++)
        {
            for (var j = 0; j < self.remainingEnemies / 2; j++) //Place as many markers as there are max enemmies
            {
                var marker = remainingEnemiesGroup.create(i * self.spriteSize + remainingX, j * self.spriteSize + remainingY, "remaining");
                marker.width = self.spriteSize;
                marker.height = self.spriteSize;
            }
        }
        var style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };

        livesText = game.add.text(livesX, livesY, 'IP: ' + self.lives, style);
        self.gameOverText = game.add.sprite(game.world.centerX - 200, game.world.centerY - 200, "gameOver");
        self.gameOverText.alpha = 0;

        self.gameWonText = game.add.sprite(game.world.centerX - 200, game.world.centerY - 200, "gameWon");
        self.gameWonText.alpha = 0;

        self.powerUpText = game.add.text(game.world.centerX - 50, 20, "Time frozen!", style);
        self.powerUpText.alpha = 0;
    }


return self;
    
}

module.exports = level;