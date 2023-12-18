class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.targetX = x;
    this.targetY = y;
  }

  update() {
    // currentVEctor targetVector 각각 생성
    let currentVector = createVector(this.x, this.y);
    let targetVector = createVector(this.targetX, this.targetY);

    // current입자 위치 > target 위치 벡터 생성
    // current 입자 > 목표 위치로 향하는 벡터 계산, 그 거리 계산
    let fromParticleToTarget = p5.Vector.sub(targetVector, currentVector);
    let distanceToTarget = fromParticleToTarget.mag();

    let totalForce = createVector(0, 0); // 벡터 초기화

    // 마우스 클릭 여부 확인
    if (mouseIsPressed) {
      //마우스와 입자 간의 거리 및 반발력 힘 계산
      let mouseVector = createVector(mouseX, mouseY);
      let fromMouseToParticle = p5.Vector.sub(currentVector, mouseVector);
      let distanceToMouse = fromMouseToParticle.mag();

      //만약 거리가 400보다 작다면, 거리에 따라 반발력 힘을 계산하고 이를 totalForce에 추가
      if (distanceToMouse < 400) {
        let repulsionForce = map(distanceToMouse, 0, 400, MAX_FORCE, MIN_FORCE);
        fromMouseToParticle.setMag(repulsionForce);
        totalForce.add(fromMouseToParticle);
      }
    }

    // 목표 위치로 향한느 인력 힘 계산
    if (distanceToTarget > 0) {
      let attractionForce = map(distanceToTarget, 0, 400, MIN_FORCE, MAX_FORCE);
      fromParticleToTarget.setMag(attractionForce);
      totalForce.add(fromParticleToTarget);
    }

    //입자 위치 업데이트
    this.x += totalForce.x;
    this.y += totalForce.y;
  }

  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, PARTICLE_SIZE);
  }
}
