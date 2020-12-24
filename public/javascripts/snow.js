// const {Application, Graphics} = PIXI

console.log(PIXI);
class SnowParticles {

  constructor (app){
    this.app = app;
    this.scale = app.customScale;
    this.amount = 700*this.scale;
    this.maxSize = 15 * this.scale;
    this.minSize = 10 * this.scale;
    this.maxSpeedX = 2;
    this.minSpeedX = -2;
    this.maxSpeedY = 6;
    this.minSpeedY = 2;

    this.particles = this.generateParticles();
    console.log(this.particles);
    this.app.animationNodes.push(this)

  }

  rng(max, min = 0){
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  reset(particle){
    particle.x = this.rng(app.renderer.width);
    particle.y = -(size + this.rng(app.renderer.height));
    particle.vy = this.rng(this.maxSpeedY, this.minSpeedY);
  }

  changeHorizontalSpeed(vx){
    return Math.random() > 0.5 ? Math.max(vx - 1, this.minSpeedX) : Math.min(vx + 1, this.maxSpeedX);
  }
  
  generateParticles(){
    let particles = [];
    for(let i = 0; i<this.amount; i++){
      const size = this.rng(this.maxSize, this.minSize);const p = new PIXI.Graphics();
      p.beginFill(0xffffff);
      p.drawCircle(0, 0, 100);
      p.endFill();
      p.size = size;
      p.alpha = Math.random();
      p.vx = this.rng(this.maxSpeedX, this.minSpeedX);
      p.vy = this.rng(this.maxSpeedY, this.minSpeedY);
      p.x = this.rng(app.renderer.width);
      p.y =-(size + this.rng(app.renderer.height));
      p.width = p.height = size;
      particles.push(p);
      this.app.stage.addChild(p)
    }
    return particles;
  }

  animate(time){
    for(let particle of this.particles){
      if(particle.y > 0) particle.x += particle.vx;
      particle.y += particle.vy;
      
      if(Math.random() > 0.9) particle.vx = this.changeHorizontalSpeed(particle.vx);
      if(particle.y > this.app.renderer.height || particle.x < 0 - particle.size || particle.x > this.app.renderer.width)
        this.reset(particle);
      
    }
  }
}
