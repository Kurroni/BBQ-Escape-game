'use strict';

function Dog(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 80;
    this.height = 70;
    this.x = x;
    this.y = 0 - this.height;
    this.speed = speed;
    this.image = new Image();
}

Dog.prototype.draw = function () {
    this.image.src = './img/bull terrier.png';
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};


Dog.prototype.updatePosition = function () {
    this.y = this.y + this.speed;
};

Dog.prototype.isInsideScreen = function () {
    return this.y - this.height / 2 < this.canvas.height;
};