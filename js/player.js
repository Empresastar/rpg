class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40; // Tamanho do personagem
        this.speed = 5;  // Velocidade de caminhada
        this.keys = {};

        // Detecta quando uma tecla é pressionada
        window.addEventListener('keydown', e => {
            this.keys[e.key.toLowerCase()] = true;
        });

        // Detecta quando a tecla é solta
        window.addEventListener('keyup', e => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }

    update(world) {
        // Movimentação W, A, S, D ou Setas
        if (this.keys['w'] || this.keys['arrowup']) this.y -= this.speed;
        if (this.keys['s'] || this.keys['arrowdown']) this.y += this.speed;
        if (this.keys['a'] || this.keys['arrowleft']) this.x -= this.speed;
        if (this.keys['d'] || this.keys['arrowright']) this.x += this.speed;

        // Impede o personagem de sair dos limites do mapa (Colisão com bordas)
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x > world.width - this.size) this.x = world.width - this.size;
        if (this.y > world.height - this.size) this.y = world.height - this.size;
    }

    draw(ctx, camera) {
        // Desenha o corpo do personagem (Subtraindo a posição da câmera)
        ctx.fillStyle = "#3498db"; // Azul
        ctx.fillRect(this.x - camera.x, this.y - camera.y, this.size, this.size);
        
        // Desenha os "olhos" para sabermos a direção
        ctx.fillStyle = "white";
        ctx.fillRect(this.x - camera.x + 8, this.y - camera.y + 10, 6, 6);
        ctx.fillRect(this.x - camera.x + 26, this.y - camera.y + 10, 6, 6);
    }
}
