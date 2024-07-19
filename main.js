(function() {
    const canvas = document.getElementById('solarSystem');
    const ctx = canvas.getContext('2d');
    let width, height;
    let planets = [];
    let time = 0;

    function init() {
        resizeCanvas();
        createPlanets();
        animate();
        window.addEventListener('resize', resizeCanvas, false);
        canvas.addEventListener('click', onClickCanvas, false);
    }

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createPlanets() {
        planets = [
            new Planet(50, 2, '#FF6347', 0.01, []), // Mercury
            new Planet(70, 4, '#FFD700', 0.007, []), // Venus
            new Planet(100, 5, '#00BFFF', 0.005, [new Moon(10, 0.05, '#A9A9A9')]), // Earth
            new Planet(140, 4, '#FF4500', 0.004, []), // Mars
            new Planet(200, 10, '#FFD700', 0.002, [new Moon(15, 0.02, '#A9A9A9'), new Moon(20, 0.03, '#808080')]), // Jupiter
            new Planet(260, 9, '#DAA520', 0.0016, [new Moon(12, 0.01, '#A9A9A9')]), // Saturn
            new Planet(320, 7, '#00FFFF', 0.0012, []), // Uranus
            new Planet(380, 6, '#1E90FF', 0.0008, []) // Neptune
        ];
    }

    function Planet(radius, size, color, speed, moons) {
        this.radius = radius;
        this.size = size;
        this.color = color;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = speed;
        this.moons = moons;
    }

    Planet.prototype.update = function() {
        this.angle += this.speed;
        this.moons.forEach(moon => moon.update(this));
    };

    Planet.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(width / 2 + this.radius * Math.cos(this.angle), height / 2 + this.radius * Math.sin(this.angle), this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        this.drawOrbit();
        this.moons.forEach(moon => moon.draw(this));
    };

    Planet.prototype.drawOrbit = function() {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.stroke();
        ctx.closePath();
    };

    function Moon(radius, speed, color) {
        this.radius = radius;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = speed;
        this.color = color;
    }

    Moon.prototype.update = function(planet) {
        this.angle += this.speed;
    };

    Moon.prototype.draw = function(planet) {
        const x = width / 2 + planet.radius * Math.cos(planet.angle);
        const y = height / 2 + planet.radius * Math.sin(planet.angle);

        ctx.beginPath();
        ctx.arc(x + this.radius * Math.cos(this.angle), y + this.radius * Math.sin(this.angle), 2, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };

    function animate() {
        ctx.clearRect(0, 0, width, height);
        drawSun();
        planets.forEach(planet => {
            planet.update();
            planet.draw();
        });
        time++;
        requestAnimationFrame(animate);
    }

    function drawSun() {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 30, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFFF00';
        ctx.fill();
        ctx.closePath();
    }

    function onClickCanvas(event) {
        const x = event.clientX - canvas.offsetLeft;
        const y = event.clientY - canvas.offsetTop;

        planets.push(new Planet(Math.random() * width / 2, 4, '#FFFFFF', 0.005, []));
    }

    init();
})();
