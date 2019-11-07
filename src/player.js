'use strict';

function Player(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.lives = lives;
    this.width = 65;
    this.height = 55;
    this.x = canvas.width / 2;
    this.y = canvas.height - this.height - 30;
    this.direction = 0;
    this.speed = 5;
    this.image = new Image();

}

Player.prototype.setDirection = function (direction) {
    if (direction === 'left') this.direction = -1;
    else if (direction === 'right') this.direction = 1;
    this.x += this.direction * this.speed;
    console.log(this.x, this.y);
};
Player.prototype.moveLeft = function () {
    this.x = this.x - 40;
}
Player.prototype.moveRight = function () {
    this.x = this.x + 40;
}

Player.prototype.didCollide = function (enemy) {
    var playerLeft = this.x;
    var playerRight = this.x + this.width;
    var playerTop = this.y;
    var playerBottom = this.y + this.height;

    var enemyLeft = enemy.x;
    var enemyRight = enemy.x + enemy.width;
    var enemyTop = enemy.y;
    var enemyBottom = enemy.y + enemy.height;

    // Check if the enemy intersects any of the player's sides
    var crossLeft = enemyLeft <= playerRight && enemyLeft >= playerLeft;

    var crossRight = enemyRight >= playerLeft && enemyRight <= playerRight;

    var crossBottom = enemyBottom >= playerTop && enemyBottom <= playerBottom;

    var crossTop = enemyTop <= playerBottom && enemyTop >= playerTop;

    var crossInside = enemyLeft <= playerLeft && enemyRight >= playerRight;

    if ((crossInside || crossLeft || crossRight) && (crossTop || crossBottom)) {
        return true;
    }
    return false;
};
// KETCHUP
Player.prototype.didCollide = function (ketchup) {
    var playerLeft = this.x;
    var playerRight = this.x + this.width;
    var playerTop = this.y;
    var playerBottom = this.y + this.height;

    var ketchupLeft = ketchup.x;
    var ketchupRight = ketchup.x + ketchup.width;
    var ketchupTop = ketchup.y;
    var ketchupBottom = ketchup.y + ketchup.height;

    var crossLeft = ketchupLeft <= playerRight && ketchupLeft >= playerLeft;

    var crossRight = ketchupRight >= playerLeft && ketchupRight <= playerRight;

    var crossBottom = ketchupBottom >= playerTop && ketchupBottom <= playerBottom;

    var crossTop = ketchupTop <= playerBottom && ketchupTop >= playerTop;

    if (
        (crossLeft || crossRight) && (crossTop || crossBottom)) {
        return true;
    }
    return false;
};

// DOG
Player.prototype.didCollide = function (dog) {
    var playerLeft = this.x;
    var playerRight = this.x + this.width;
    var playerTop = this.y;
    var playerBottom = this.y + this.height;

    var dogLeft = dog.x;
    var dogRight = dog.x + dog.width;
    var dogTop = dog.y;
    var dogBottom = dog.y + dog.height;

    var crossLeft = dogLeft <= playerRight && dogLeft >= playerLeft;

    var crossRight = dogRight >= playerLeft && dogRight <= playerRight;

    var crossBottom = dogBottom >= playerTop && dogBottom <= playerBottom;

    var crossTop = dogTop <= playerBottom && dogTop >= playerTop;

    var crossInside = dogLeft <= playerLeft && dogRight >= playerRight;

    if ((crossInside || crossLeft || crossRight) && (crossTop || crossBottom)) {
        return true;
    }
    return false;
};

Player.prototype.handleScreenCollision = function () {
    this.x = this.x + this.direction * this.speed;
    var screenLeft = 0;
    var screenRight = this.canvas.width;

    if (this.x + this.width / 2 > screenRight) {
        this.x = (screenLeft - this.width / 2);
    } else if (this.x + this.width / 2 < screenLeft) {
        this.x = screenRight + this.x / 2;
    }
};

Player.prototype.removeLife = function () {
    this.lives -= 1;
};

Player.prototype.draw = function () {
    this.image.src = './img/hamburger_cut.png';
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
};