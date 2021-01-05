document.addEventListener("DOMContentLoaded", initTestArea)

let c, ctx, cH, cW
let animations = []
let colors = ["#ff0000", "#00ff00", "#0000ff", "#00ffff", "#ff00ff", "#ffff00"]

function initTestArea() {
    c = document.getElementById("c")
    ctx = c.getContext("2d")

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    document
        .querySelector("#playAlongButton")
        .addEventListener("click", playBackTrack)
}

function evalMidiInput(note) {
    drawParticles(note)
}

function removeAnimation(animation) {
    let index = animations.indexOf(animation)
    if (index > -1) animations.splice(index, 1)
}

function drawParticles(note) {
    let currentColor = colors[note - 1]
    let minRippleSize = 200
    let rippleScale = 0.4
    let rippleSize = Math.min(minRippleSize, cW * rippleScale)

    let particles = []
    let x = anime.random(0, cW)
    let y = anime.random(0, cH)
    let numParticles = 32
    let minRadiusParticle = 24
    let maxRadiusParticle = 48

    for (let i = 0; i < numParticles; i++) {
        let particle = new Circle({
            x: x, //TODO: Random
            y: y, //TODO: Random
            fill: currentColor,
            r: anime.random(minRadiusParticle, maxRadiusParticle),
        })
        particles.push(particle)
    }
    let minAnimationTime = 2500
    let maxAnimationTime = 2500
    let particlesAnimation = anime({
        targets: particles,
        x: function (particle) {
            return particle.x + anime.random(rippleSize, -rippleSize)
        },
        y: function (particle) {
            let rippleHeightScale = 1.15
            return (
                particle.y +
                anime.random(
                    rippleSize * rippleHeightScale,
                    -rippleSize * rippleHeightScale
                )
            )
        },
        r: 0,
        easing: "easeOutExpo",
        duration: anime.random(minAnimationTime, maxAnimationTime),
        complete: removeAnimation,
    })
    animations.push(particlesAnimation)
}

function extend(a, b) {
    for (let key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key]
        }
    }
    return a
}

let Circle = function (opts) {
    extend(this, opts)
}

Circle.prototype.draw = function () {
    ctx.globalAlpha = this.opacity || 1
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
    if (this.stroke) {
        ctx.strokeStyle = this.stroke.color
        ctx.lineWidth = this.stroke.width
        ctx.stroke()
    }
    if (this.fill) {
        ctx.fillStyle = this.fill
        ctx.fill()
    }
    ctx.closePath()
    ctx.globalAlpha = 1
}

let animate = anime({
    duration: Infinity,
    update: function () {
        ctx.clearRect(0, 0, cW, cH)
        animations.forEach(function (anim) {
            anim.animatables.forEach(function (animatable) {
                animatable.target.draw()
            })
        })
    },
})

let resizeCanvas = function () {
    cW = window.innerWidth
    cH = window.innerHeight
    c.width = cW * devicePixelRatio
    c.height = cH * devicePixelRatio
    ctx.scale(devicePixelRatio, devicePixelRatio)
}
