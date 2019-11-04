'use strict';

function Ketchup(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 35;
    this.height = 60;
    this.x = x;
    this.y = 0 - this.height;
    this.speed = speed;
    this.image = new Image();
}

Ketchup.prototype.draw = function () {
    this.image.src = './img/ketchup.png';
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

Ketchup.prototype.updatePosition = function () {
    this.y = this.y + this.speed;
};

Ketchup.prototype.isInsideScreen = function () {
    // if x plus half of its size is smaller then 0 return
    return this.y - this.height / 2 < this.canvas.height;
};