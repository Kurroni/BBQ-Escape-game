'use strict'

function Game() {
    this.canvas = null;
    this.ctx = null;
    this.enemies = [];
    this.player = null;
    this.ketchups = [];
    this.dogs = [];
    this.gameIsOver = false;
    this.gameScreen = null;
    this.score = 0;
    this.mainMusic = new Audio("../sound/Raul_Cabezali_-_Country.mp3");
    this.dogSound = new Audio("../sound/Dog Bite-SoundBible.com-107030898.mp3");
    this.redneckSound = new Audio("../sound/old man.mp3");
    this.ketchupSound = new Audio("../sound/Slurping 2-SoundBible.com-1269549524.mp3");

}

Game.prototype.start = function () {
    this.canvasContainer = document.querySelector('.canvas-container');
    this.canvas = this.gameScreen.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.mainMusic.play();
    this.mainMusic.loop = true;


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
            this.player.moveLeft();
        } else if (event.key === 'ArrowRight') {

            this.player.moveRight();
        }
    };

    // add even listener for moving the player
    document.body.addEventListener(
        'keydown',
        this.handleKeyDown.bind(this)
    );
    this.startLoop();
};

Game.prototype.startLoop = function () {
    var loop = function () {

        // Create new enemies randomly
        if (Math.random() > 0.985) {
            var randomX = (this.canvas.width - 90) * Math.random();
            var newEnemy = new Enemy(this.canvas, randomX, 3);
            this.enemies.push(newEnemy);
        }

        // adding ketchup
        if (Math.random() > 0.996) {
            var randomX = this.canvas.width * Math.random();
            var newKetchup = new Ketchup(this.canvas, randomX, 5);
            this.ketchups.push(newKetchup);
        }
        // adding dog
        if (Math.random() > 0.998) {
            var randomX = (this.canvas.width - 90) * Math.random();
            var newDog = new Dog(this.canvas, randomX, 4);
            this.dogs.push(newDog);
        }

        // Check if player had hit any enemy (check all enemies)
        this.checkCollisions();

        // Check if player is going off the screen
        this.player.handleScreenCollision();

        // Move existing enemies and check if any enemy is going of the screen
        this.enemies = this.enemies.filter(function (enemy) {
            enemy.updatePosition();
            return enemy.isInsideScreen();
        });

        // ketchup code
        this.ketchups = this.ketchups.filter(function (ketchup) {
            ketchup.updatePosition();
            return ketchup.isInsideScreen();
        });
        this.dogs = this.dogs.filter(function (dog) {
            dog.updatePosition();
            return dog.isInsideScreen();
        });


        // CLEAR THE CANVAS
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        // UPDATE THE CANVAS
        // Draw the player
        this.player.draw();

        // Draw the enemies
        this.enemies.forEach(function (enemy) {
            enemy.draw();
        });
        this.ketchups.forEach(function (ketchup) {
            ketchup.draw();
        });
        this.dogs.forEach(function (dog) {
            dog.draw();
        });

        // TERMINATE LOOP IF GAME IS OVER
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
            this.redneckSound.play();

            // Move the enemy off screen to the left
            enemy.y = this.canvas.height + enemy.offsetHeight;

            if (this.player.lives === 0) {
                this.gameOver();
            }
        }
    }, this);

    // adding ketchup collision
    this.ketchups.forEach(function (ketchup) {
        if (this.player.didCollide(ketchup)) {
            this.score += 2000;
            this.ketchupSound.play();

            // Move the ketchup off screen to the bottom
            ketchup.y = this.canvas.height + ketchup.size;
        }
    }, this);

    this.dogs.forEach(function (dog) {

        if (this.player.didCollide(dog)) {

            this.player.removeLife();
            console.log('lives', this.player.lives);
            this.dogSound.play();

            // Move the dog off screen to the left
            dog.y = this.canvas.height + dog.height;

            if (this.player.lives === 0) {
                this.gameOver();
            }
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
    this.mainMusic.pause();
    this.mainMusic.currentTime = 0;

};

Game.prototype.removeGameScreen = function () {
    this.gameScreen.remove();
};