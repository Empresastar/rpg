class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 32;
        this.speed = 4;
        this.keys = {};

        // Escuta as teclas pressionadas
        window.addEventListener('keydown', e => this.keys[e.key] = true);
        window.addEventListener('keyup', e => this.keys[e.key] = false);
    }

    update() {
        if (this.keys['ArrowUp'] || this.keys['w']) this.y -= this.speed;
        if (this.keys['ArrowDown'] || this.keys['s']) this.y += this.speed;
        if (this.keys['ArrowLeft'] || this.keys['a']) this.x -= this.speed;
        if (this.keys['ArrowRight'] || this.keys['d']) this.x += this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = 'red'; // Por enquanto um quadrado vermelho
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}
