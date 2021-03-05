class Topping {
  constructor(aImagePath, aX, aY) {
    this.aImagePath = aImagePath;
    this.image = loadImage(aImagePath);
    this.x = aX;
    this.y = aY;
    this.dx = aX;
    this.dy = aY;
  }

  draw() {
    image(this.image, this.x, this.y);
  }

  isHovered() {
    if (
      mouseX < this.x ||
      mouseX > this.x + this.image.width ||
      mouseY < this.y ||
      mouseY > this.y + this.image.height
    ) {
      return false;
    }
    let color = this.image.get(mouseX - this.x, mouseY - this.y);
    return color[3] > 0;
  }

  move(aX, aY) {
    this.x += aX;
    this.y += aY;
  }

  getPath() {
    return this.aImagePath;
  }

  getX() {
    return this.dx;
  }

  getY() {
    return this.dy;
  }

  getDetails() {
    return (
      '{ "path": "' +
      String(this.aImagePath) +
      '","x":"' +
      String(this.x) +
      '","y":"' +
      String(this.y) +
      '"}'
    );
  }
}
