'use strict';

function Player(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.lives = lives;
    this.width = 70;
    this.height = 55;
    this.x = canvas.width / 2;
    this.y = canvas.height - this.height - 30;
    this.direction = 0;
    this.speed = 5;
    this.image = new Image();

}

Player.prototype.setDirection = function (direction) {
    // +1 right  -1 left
    if (direction === 'left') this.direction = -1;
    else if (direction === 'right') this.direction = 1;
    this.x += this.direction * this.speed;
    console.log(this.x, this.y);
};
Player.prototype.moveLeft = function () {
    this.x = this.x - 50;
}
Player.prototype.moveRight = function () {
    this.x = this.x + 50;
}
// Player.prototype.setDirection = function () {
//     this.x += this.direction * this.speed;
//     console.log(this.x, this.y);
// };

Player.prototype.didCollide = function (enemy) {
    var playerLeft = this.x;
    var playerRight = this.x + this.width;
    var playerTop = this.y;
    var playerBottom = this.y + this.height;

    var enemyLeft = enemy.x;
    var enemyRight = enemy.x + enemy.width;
    var enemyTop = enemy.y;
    var enemyBottom = enemy.y + enemy.height * 2;

    // Check if the enemy intersects any of the player's sides
    var crossLeft = enemyLeft <= playerRight && enemyLeft >= playerLeft;
    // var crossLeft = enemyLeft <= playerRight && enemyLeft >= playerLeft;

    var crossRight = enemyRight >= playerLeft && enemyRight <= playerRight;
    // var crossRight = enemyRight >= playerRight && enemyLeft <= playerRight;

    var crossBottom = enemyBottom >= playerTop && enemyBottom <= playerBottom;

    var crossTop = enemyTop <= playerBottom && enemyTop >= playerTop;
    //var crossTop = enemyTop <= playerBottom && enemyBottom >= playerTop;

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
        return true;
    }
    return false;
};
//KETCHUP
Player.prototype.didCollide = function (ketchup) {
    var playerLeft = this.x;
    var playerRight = this.x + this.width;
    var playerTop = this.y;
    var playerBottom = this.y + this.height;

    var ketchupLeft = ketchup.x;
    var ketchupRight = ketchup.x + ketchup.width;
    var ketchupTop = ketchup.y;
    var ketchupBottom = ketchup.y + ketchup.width * 2;

    var crossLeft = ketchupLeft <= playerRight && ketchupLeft >= playerLeft;
    // var crossLeft = ketchupLeft <= playerRight && ketchupLeft >= playerLeft;

    var crossRight = ketchupRight >= playerLeft && ketchupRight <= playerRight;
    // var crossRight = ketchupRight >= playerRight && ketchupLeft <= playerRight;

    var crossBottom = ketchupBottom >= playerTop && ketchupBottom <= playerBottom;

    var crossTop = ketchupTop <= playerBottom && ketchupTop >= playerTop;

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
        return true;
    }
    return false;
};


// Player.prototype.handleScreenCollision = function () {
//     this.x = this.x + this.direction * this.speed;
//     var screenLeft = 0;
//     var screenRight = this.canvas.width;

//     // how to stop the edge of the player exactly with the edge of the screen?
//     if (this.x > (screenRight - this.size)) this.direction = -1;
//     else if (this.x < screenLeft) this.direction = 1;
// };
Player.prototype.handleScreenCollision = function () {
    this.x = this.x + this.direction * this.speed;
    var screenLeft = 0;
    var screenRight = this.canvas.width;

    // how to stop the edge of the player exactly with the edge of the screen?
    if (this.x > (screenRight - this.width)) this.x = screenRight - this.width;
    else if (this.x <= screenLeft) this.x = 0;
};

Player.prototype.removeLife = function () {
    this.lives -= 1;
};
// this is for ketchup
// Player.prototype.addScore = function () {
//     this.score += 2000;
// }

Player.prototype.draw = function () {
    this.image.src = './img/hamburger_cut.png';
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
};