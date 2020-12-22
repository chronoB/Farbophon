document.addEventListener("DOMContentLoaded", initTestArea)
let c;
let ctx;
let cH;
let cW;
let bgColor = "#000000";
let animations = [];
let circles = [];   
let colors = ["#ff0000","#00ff00","#0000ff","#ffff00","#ff00ff","#00ffff"];

function initTestArea(){
    c = document.getElementById("c")
    ctx = c.getContext("2d");

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
}

function evalMidiInput(note){
  drawParticles(note)
}

function removeAnimation(animation) {
  let index = animations.indexOf(animation);
  if (index > -1) animations.splice(index, 1);
}


function drawParticles(colorIdx) {
    let currentColor = colors[colorIdx]
    let rippleSize = Math.min(200, (cW * .4));
    
    let particles = [];
    let x = anime.random(0, cW)
    let y = anime.random(0, cH)
    for (let i=0; i<32; i++) {
      let particle = new Circle({
        x: x, //TODO: Random
        y: y,//TODO: Random
        fill: currentColor,
        r: anime.random(24, 48)
      })
      particles.push(particle);
    }
    let particlesAnimation = anime({
      targets: particles,
      x: function(particle){
        return particle.x + anime.random(rippleSize, -rippleSize);
      },
      y: function(particle){
        return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
      },
      r: 0,
      easing: "easeOutExpo",
      duration: anime.random(1000,1300),
      complete: removeAnimation
    });
    animations.push(particlesAnimation);
}

function extend(a, b){
  for(let key in b) {
    if(b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

let Circle = function(opts) {
  extend(this, opts);
}

Circle.prototype.draw = function() {
  ctx.globalAlpha = this.opacity || 1;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  if (this.stroke) {
    ctx.strokeStyle = this.stroke.color;
    ctx.lineWidth = this.stroke.width;
    ctx.stroke();
  }
  if (this.fill) {
    ctx.fillStyle = this.fill;
    ctx.fill();
  }
  ctx.closePath();
  ctx.globalAlpha = 1;
}

let animate = anime({
  duration: Infinity,
  update: function() {
    ctx.clearRect(0, 0, cW, cH);
    animations.forEach(function(anim) {
      anim.animatables.forEach(function(animatable) {
        animatable.target.draw();
      });
    });
  }
});

let resizeCanvas = function() {
  cW = window.innerWidth;
  cH = window.innerHeight;
  c.width = cW * devicePixelRatio;
  c.height = cH * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
};
