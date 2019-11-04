'use strict'

function Game() {
    this.canvas = null;
    this.ctx = null;
    this.enemies = [];
    this.player = null;
    this.ketchups = [];
    this.gameIsOver = false;
    this.gameScreen = null;
    this.score = 0;
}

Game.prototype.start = function () {
    this.canvasContainer = document.querySelector('.canvas-container');
    this.canvas = this.gameScreen.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.livesElement = this.gameScreen.querySelector('.lives .value');
    this.scoreElement = this.gameScreen.querySelector('.score .value');

    this.containerWidth = this.canvasContainer.offsetWidth;
    this.containerHeight = this.canvasContainer.offsetHeight;
    this.canvas.setAttribute('width', this.containerWidth);
    this.canvas.setAttribute('height', this.containerHeight);

    this.player = new Player(this.canvas, 3);



    // Event listener callback function
    this.handleKeyDown = function (event) {

        if (event.key === 'ArrowLeft') {
            console.log('LEFT');
            // this.player.setDirection('left');
            this.player.moveLeft();
        } else if (event.key === 'ArrowRight') {
            console.log('RIGHT');
            this.player.moveRight();
            //this.player.setDirection('right');
        }
    };

    // //add even listener for moving the player
    document.body.addEventListener(
        'keydown',
        this.handleKeyDown.bind(this)
    );

    this.startLoop();
};

Game.prototype.startLoop = function () {
    var loop = function () {

        // 1. Create new enemies randomly
        if (Math.random() > 0.98) {
            var randomX = (this.canvas.width - 100) * Math.random();
            var newEnemy = new Enemy(this.canvas, randomX, 5);
            this.enemies.push(newEnemy);
        }

        //i'm adding ketchup
        if (Math.random() > 0.99) {
            var randomX = this.canvas.width * Math.random();
            var newKetchup = new Ketchup(this.canvas, randomX, 6);
            this.ketchups.push(newKetchup);
        }

        // 2. Check if player had hit any enemy (check all enemies)
        this.checkCollisions();

        // 3. Check if player is going off the screen
        this.player.handleScreenCollision();

        // 4. Move existing enemies
        // 5. Check if any enemy is going of the screen
        this.enemies = this.enemies.filter(function (enemy) {
            enemy.updatePosition();
            return enemy.isInsideScreen();
        });

        //ketchup code
        this.ketchups = this.ketchups.filter(function (ketchup) {
            ketchup.updatePosition();
            return ketchup.isInsideScreen();
        });


        // 2. CLEAR THE CANVAS
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        // 3. UPDATE THE CANVAS
        // Draw the player
        this.player.draw();

        // Draw the enemies
        this.enemies.forEach(function (enemy) {
            enemy.draw();
        });
        this.ketchups.forEach(function (ketchup) {
            ketchup.draw();
        });


        // 4. TERMINATE LOOP IF GAME IS OVER
        if (!this.gameIsOver) {
            window.requestAnimationFrame(loop);
        }
        this.updateGameStats();

    }.bind(this);

    window.requestAnimationFrame(loop);
};



Game.prototype.checkCollisions = function () {

    this.enemies.forEach(function (enemy) {

        if (this.player.didCollide(enemy)) {

            this.player.removeLife();
            console.log('lives', this.player.lives);

            // Move the enemy off screen to the left
            enemy.y = this.canvas.height + enemy.size;

            //after styling game screen - uncomment!!!
            if (this.player.lives === 0) {
                this.gameOver();
            }
        }
    }, this);

    //adding ketchup collision
    this.ketchups.forEach(function (ketchup) {
        if (this.player.didCollide(ketchup)) {
            console.log('Ketchup collision')
            this.score += 2000;

            // Move the ketchup off screen to the bottom
            ketchup.y = this.canvas.height + ketchup.size;
        }
    }, this);

};



Game.prototype.updateGameStats = function () {
    this.score += 1;

    this.livesElement.innerHTML = this.player.lives;
    this.scoreElement.innerHTML = this.score;
};

Game.prototype.passGameOverCallback = function (gameOver) {
    this.onGameOverCallback = gameOver;
};

Game.prototype.gameOver = function () {
    // flag `gameIsOver = true` stops the loop
    this.gameIsOver = true;

    this.onGameOverCallback();
};

Game.prototype.removeGameScreen = function () {
    this.gameScreen.remove(); // remove() is the DOM method which removes the DOM Node  
};