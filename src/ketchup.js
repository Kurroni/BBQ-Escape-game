'use strict';

function Ketchup(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.size = 15;
    this.x = x;
    this.y = 0 - this.size;
    this.speed = speed;
}

Ketchup.prototype.draw = function () {
    this.ctx.fillStyle = 'red';
    // fillRect(x, y, width, height)
    this.ctx.fillRect(
        this.x,
        this.y,
        this.size,
        this.size * 2,
    );
};

Ketchup.prototype.updatePosition = function () {
    this.y = this.y + this.speed;
};

Ketchup.prototype.isInsideScreen = function () {
    // if x plus half of its size is smaller then 0 return
    return this.y - this.size / 2 < this.canvas.height;
};