class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.speed = 5;
        this.keys = {};

        window.addEventListener('keydown', e => this.keys[e.key.toLowerCase()] = true);
        window.addEventListener('keyup', e => this.keys[e.key.toLowerCase()] = false);
    }

    update(world) {
        if (this.keys['w'] || this.keys['arrowup']) this.y -= this.speed;
        if (this.keys['s'] || this.keys['arrowdown']) this.y += this.speed;
        if (this.keys['a'] || this.keys['arrowleft']) this.x -= this.speed;
        if (this.keys['d'] || this.keys['arrowright']) this.x += this.speed;

        // Colisão com bordas do mapa
        this.x = Math.max(0, Math.min(this.x, world.width - this.size));
        this.y = Math.max(0, Math.min(this.y, world.height - this.size));
    }

    draw(ctx, camera) {
        ctx.fillStyle = "#3498db"; // Azul profissional
        ctx.fillRect(this.x - camera.x, this.y - camera.y, this.size, this.size);
        
        // Detalhe (Olhos ou direção)
        ctx.fillStyle = "white";
        ctx.fillRect(this.x - camera.x + 10, this.y - camera.y + 10, 5, 5);
        ctx.fillRect(this.x - camera.x + 25, this.y - camera.y + 10, 5, 5);
    }
}
