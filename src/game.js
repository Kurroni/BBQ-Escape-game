'use strict'

function Game() {
    this.canvas = null;
    this.ctx = null;
    this.enemies = [];
    this.player = null;
    this.gameIsOver = false;
    this.gameScreen = null;
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

    this.player = new Player(this.canvas, 3); //	<-- UPDATE


    // Event listener callback function
    this.handleKeyDown = function (event) {

        if (event.key === 'ArrowLeft') {
            console.log('LEFT');
            this.player.setDirection('left');
        } else if (event.key === 'ArrowRight') {
            console.log('RIGHT');
            this.player.setDirection('right');
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
        console.log('in loop');

        if (!this.gameIsOver) {
            window.requestAnimationFrame(loop);
        }
    }.bind(this);

    window.requestAnimationFrame(loop);
};

Game.prototype.checkCollisions = function () {};

Game.prototype.updateGameStats = function () {};

Game.prototype.passGameOverCallback = function (callback) {};

Game.prototype.gameOver = function () {};

Game.prototype.removeGameScreen = function () {};