# BBQ-Escape-game

## Description
BigBaQyard Escape is a game where the player (a burger) has to avoid to touch with the enemy (a hungry farmer). The player gets points for the played time. After touching the bonus (a ketchups' bottle) the player gets extra points. The game has no end. The player has 2 lives. After the 1st touch of the enemy player contine the game, after the 2nd touch the game is over.


## MVP (DOM - CANVAS)
CANVAS, This is a game where the player can move left and rigth and avoid the enemy who moves down the screen.


## Backlog
Score
Speed Level
More enemies
Bonus - extra points
2 lives
moving off the screen's edge on the left side - appearing on the right edge of the screen



## Data structure
### main.js

buildSplashScreen(){
}

buildGameScreen(){
}

buildGameOverScreen(){
}
### game.js

Game(){
  this.canvas;
}

Game.prototype.startLoop(){
}

Game.prototype.clearCanvas = function(){
}

Game.prototype.updateCanvas = function(){
}

Game.prototype.drawCanvas = function(){ 
}

Game.prototype.checkCollisions = function {
}

Game.prototype.setGameOver = function(){
}
### enemy.js

Enemy() {}

Enemy.prototype.draw = function() {}

Enemy.prototype.updatePosition = function() {}

Enemy.prototype.isInsideScreen = function() {}
### player.js

Player() {}

Player.prototype.setDirection = function(direction) {}

Player.prototype.didCollide = function(enemy) {}

Player.prototype.handleScreenCollision = function() {}

## States y States Transitions

- splashScreen()
  - buildSplash()
  - addEventListener(startGame)
  
  
- starGame()
  - create new Game()
  - game.start()
  
  
- gameOver()
  - buildGameOver()
  - addEventListener(startGame) 


## Task
Main - buildDom
Main - buildSplashScreen
Main - addEventListener
Main - buildGameScreen
Main - buildGameOverScreen
Game - buildCanvas
Game - startLoop function
Game - clearCanvas
Game - updateCanvas
Game - drawCanvas
Game - setGameOver
Game - collision
Game - addEventListener
Enemy - create
Enemy - update position
Player - create
Player - set direction
Player - did collide
Player - handle collision
Game - checkOverFlow

## Links


### Trello
[Link url](https://trello.com/b/6pc8tlRk/bbq-escape)


### Git
URls for the project repo and deploy
[Link Repo](#)
[Link Deploy](#)


### Slides
URls for the project presentation (slides)
[Link Slides.com](#)
