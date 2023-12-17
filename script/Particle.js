class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.targetX = x;
    this.targetY = y;
  }

  update() {
    let currentVector = createVector(this.x, this.y);
    let targetVector = createVector(this.targetX, this.targetY);

    let fromParticleToTarget = p5.Vector.sub(targetVector, currentVector);
    let distanceToTarget = fromParticleToTarget.mag();

    let totalForce = createVector(0, 0);

    // 마우스 클릭 여부 확인
    if (mouseIsPressed) {
      let mouseVector = createVector(mouseX, mouseY);
      let fromMouseToParticle = p5.Vector.sub(currentVector, mouseVector);
      let distanceToMouse = fromMouseToParticle.mag();

      if (distanceToMouse < 400) {
        let repulsionForce = map(distanceToMouse, 0, 400, MAX_FORCE, MIN_FORCE);
        fromMouseToParticle.setMag(repulsionForce);
        totalForce.add(fromMouseToParticle);
      }
    }

    if (distanceToTarget > 0) {
      let attractionForce = map(distanceToTarget, 0, 400, MIN_FORCE, MAX_FORCE);
      fromParticleToTarget.setMag(attractionForce);
      totalForce.add(fromParticleToTarget);
    }

    this.x += totalForce.x;
    this.y += totalForce.y;
  }

  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, PARTICLE_SIZE);
  }
}
