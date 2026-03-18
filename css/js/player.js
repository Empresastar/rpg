class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 32;
        this.speed = 5;
        this.keys = {};

        // Configura os ouvintes de teclado
        window.addEventListener('keydown', e => this.keys[e.key] = true);
        window.addEventListener('keyup', e => this.keys[e.key] = false);
    }

    update() {
        // Movimentação básica
        if (this.keys['ArrowUp'] || this.keys['w']) this.y -= this.speed;
        if (this.keys['ArrowDown'] || this.keys['s']) this.y += this.speed;
        if (this.keys['ArrowLeft'] || this.keys['a']) this.x -= this.speed;
        if (this.keys['ArrowRight'] || this.keys['d']) this.x += this.speed;
    }

    // O método draw agora recebe a 'camera' para saber onde se desenhar na tela
    draw(ctx, camera) {
        ctx.fillStyle = 'red';
        
        // A mágica do mundo aberto: posição real - posição da câmera
        ctx.fillRect(
            this.x - camera.x, 
            this.y - camera.y, 
            this.size, 
            this.size
        );
    }
}
