'use strict';

function Player(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.lives = lives;
    this.size = 60;
    this.x = canvas.width / 2;
    this.y = canvas.height - this.size - 30;
    this.direction = 0;
    this.speed = 5;

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
    var playerRight = this.x + this.size;
    var playerTop = this.y;
    var playerBottom = this.y + this.size;

    var enemyLeft = enemy.x;
    var enemyRight = enemy.x + enemy.size;
    var enemyTop = enemy.y;
    var enemyBottom = enemy.y + enemy.size * 2;

    // Check if the enemy intersects any of the player's sides
    var crossLeft = enemyLeft <= playerRight && enemyLeft >= playerLeft;

    var crossRight = enemyRight >= playerLeft && enemyRight <= playerRight;

    var crossBottom = enemyBottom >= playerTop && enemyBottom < playerBottom;

    var crossTop = enemyTop <= playerBottom && enemyTop >= playerTop;

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
    if (this.x > (screenRight - this.size)) this.x = screenRight - this.size;
    else if (this.x <= screenLeft) this.x = 0;
};

Player.prototype.removeLife = function () {
    this.lives -= 1;
};

Player.prototype.draw = function () {
    this.ctx.fillStyle = '#66D3FA';
    // fillRect(x, y, width, height)
    this.ctx.fillRect(
        this.x,
        this.y,
        this.size,
        this.size,
    );
};