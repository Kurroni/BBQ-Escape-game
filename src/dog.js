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
    // this.ctx.fillStyle = '#FF6F27';
    // // fillRect(x, y, width, height)
    // this.ctx.fillRect(
    //     this.x,
    //     this.y,
    //     this.size,
    //     this.size * 2,
    // );
};


Dog.prototype.updatePosition = function () {
    this.y = this.y + this.speed;
};

Dog.prototype.isInsideScreen = function () {
    // if x plus half of its size is smaller then 0 return
    return this.y - this.height / 2 < this.canvas.height;
};