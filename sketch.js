const VIEW_W = 800;
const VIEW_H = 480;

let cam;
let level;

function setup() {
  createCanvas(VIEW_W, VIEW_H);

  cam = new Camera2D(width, height);

  level = new WorldLevel({
    world: { w: 2400, h: 1400 },
  });

  // Start centered on fish
  cam.x = level.fish.x - width / 2;
  cam.y = level.fish.y - height / 2;
  cam.clampToWorld(level.w, level.h);
}

function draw() {
  handleFishMovement();

  // Camera follows fish
  cam.x = level.fish.x - width / 2;
  cam.y = level.fish.y - height / 2;
  cam.clampToWorld(level.w, level.h);

  cam.begin();
  level.drawWorld();
  cam.end();

  fill(255);
  text(
    "You're a fish! Use arrows to swim, you might see a jellyfish...be careful!",
    10,
    20,
  );
}

function handleFishMovement() {
  const speed = 4;

  if (keyIsDown(LEFT_ARROW)) level.fish.x -= speed;
  if (keyIsDown(RIGHT_ARROW)) level.fish.x += speed;
  if (keyIsDown(UP_ARROW)) level.fish.y -= speed;
  if (keyIsDown(DOWN_ARROW)) level.fish.y += speed;

  level.fish.x = constrain(level.fish.x, 0, level.w);
  level.fish.y = constrain(level.fish.y, 0, level.h);
}
