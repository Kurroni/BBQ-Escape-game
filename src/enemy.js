'use strict';

function Enemy(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 90;
    this.height = 180;
    this.x = x;
    this.y = 0 - this.height;
    this.speed = speed;
    this.image = new Image();
}

Enemy.prototype.draw = function () {
    this.image.src = '../img/red+fork.png';
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    // this.ctx.fillStyle = '#FF6F27';
    // // fillRect(x, y, width, height)
    // this.ctx.fillRect(
    //     this.x,
    //     this.y,
    //     this.size,
    //     this.size * 2,
    // );
};


Enemy.prototype.updatePosition = function () {
    this.y = this.y + this.speed;
};

Enemy.prototype.isInsideScreen = function () {
    // if x plus half of its size is smaller then 0 return
    return this.y - this.height / 2 < this.canvas.height;
};