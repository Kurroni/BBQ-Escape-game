'use strict';

function Enemy(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 80;
    this.height = 170;
    this.x = x;
    this.y = 0 - this.height;
    this.speed = speed;
    this.image = new Image();
}

Enemy.prototype.draw = function () {
    this.image.src = './img/red+fork (1).png';
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};


Enemy.prototype.updatePosition = function () {
    this.y = this.y + this.speed;
};

Enemy.prototype.isInsideScreen = function () {
    return this.y - this.height / 2 < this.canvas.height;
};