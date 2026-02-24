class WorldLevel {
  constructor(levelJson) {
    this.w = levelJson.world?.w ?? 2400;
    this.h = levelJson.world?.h ?? 1400;

    this.jellies = [];

    for (let i = 0; i < 8; i++) {
      this.jellies.push({
        x: random(200, this.w - 200),
        y: random(200, this.h - 200),
      });
    }

    this.fish = {
      x: this.w / 2,
      y: this.h / 2,
    };
  }

  drawWorld() {
    this.drawGradient();

    this.drawFish();

    this.drawJellies();
  }

  drawGradient() {
    const topC = color(8, 25, 60);
    const botC = color(2, 5, 20);

    push();
    resetMatrix();
    for (let y = 0; y < height; y++) {
      const t = y / height;
      stroke(lerpColor(topC, botC, t));
      line(0, y, width, y);
    }
    pop();
  }

  drawFish() {
    push();
    translate(this.fish.x, this.fish.y);

    fill(20, 80, 120);
    noStroke();
    ellipse(0, 0, 30, 14);
    triangle(-15, 0, -28, -8, -28, 8);

    fill(255);
    circle(8, -3, 4);

    pop();
  }

  drawJellies() {
    for (let j of this.jellies) {
      push();
      translate(j.x, j.y);

      const floatY = sin(frameCount * 0.02 + j.x) * 8;

      fill(255, 0, 0);
      noStroke();
      ellipse(0, floatY, 40, 27);

      stroke(120, 220, 255, 180);
      line(-6, floatY + 12, -6, floatY + 35);
      line(0, floatY + 12, 0, floatY + 38);
      line(6, floatY + 12, 6, floatY + 35);

      pop();
    }
  }
}
