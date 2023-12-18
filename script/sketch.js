const PARTICLE_SIZE = 16; // Particle size
const RESOLUTION = 10;
const MAX_FORCE = 150;
const MIN_FORCE = 0;

// let imgUrl = './assets/redScarf.png';
let img;
let img2;
let particles = [];

function preload() {
  img = loadImage('./assets/redScarf.png');
  img2 = loadImage('./assets/grandma.png');
}

function setup() {
  createCanvas(800, 800);

  // 캔버스를 중앙에 고정시키기 위한
  let canvasElement = document.querySelector('canvas');
  canvasElement.style.display = 'block';
  canvasElement.style.margin = 'auto';

  spawnParticles();
}

function draw() {
  background(img2);
  // image(img, 0, 0, width, height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
}

// pixel particle화 + array
// youtube Web Bae
// link:https://www.youtube.com/watch?v=_gz8FMduwRc&list=LL&index=2&t=1s

function arrayParticles() {
  for (let i = 0; i < width; i += RESOLUTION) {
    for (let j = 0; j < height; j += RESOLUTION) {
      let x = (i / width) * img.width;
      let y = (j / height) * img.height;

      const color = img.get(x, y);
      particles.push(
        new Particle(i + PARTICLE_SIZE / 2, j + PARTICLE_SIZE / 2, color)
      );
    }
  }
}
