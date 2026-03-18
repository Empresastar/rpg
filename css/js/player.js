class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 32;
        this.speed = 5;
        this.keys = {};

        window.addEventListener('keydown', e => this.keys[e.key.toLowerCase()] = true);
        window.addEventListener('keyup', e => this.keys[e.key.toLowerCase()] = false);
    }

    update(world) {
        // Movimentação com WASD ou Setas
        if (this.keys['arrowup'] || this.keys['w']) this.y -= this.speed;
        if (this.keys['arrowdown'] || this.keys['s']) this.y += this.speed;
        if (this.keys['arrowleft'] || this.keys['a']) this.x -= this.speed;
        if (this.keys['arrowright'] || this.keys['d']) this.x += this.speed;

        // Limites do jogador dentro do mundo
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x > world.width - this.size) this.x = world.width - this.size;
        if (this.y > world.height - this.size) this.y = world.height - this.size;
    }

    draw(ctx, camera) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - camera.x, this.y - camera.y, this.size, this.size);
        
        // Pequeno detalhe para saber para onde está olhando (opcional)
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x - camera.x, this.y - camera.y, this.size, this.size);
    }
}
