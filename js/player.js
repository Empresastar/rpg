class Player {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.size = 40;
        this.speed = 5;
        this.keys = {};
        window.addEventListener('keydown', e => this.keys[e.key.toLowerCase()] = true);
        window.addEventListener('keyup', e => this.keys[e.key.toLowerCase()] = false);
    }

    update(world) {
        if (this.keys['w']) this.y -= this.speed;
        if (this.keys['s']) this.y += this.speed;
        if (this.keys['a']) this.x -= this.speed;
        if (this.keys['d']) this.x += this.speed;
        
        this.x = Math.max(0, Math.min(this.x, world.width - this.size));
        this.y = Math.max(0, Math.min(this.y, world.height - this.size));
    }

    draw(ctx, camera) {
        const dx = this.x - camera.x;
        const dy = this.y - camera.y;

        // 1. Sombra do jogador
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.beginPath();
        ctx.ellipse(dx + 20, dy + 45, 15, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // 2. Corpo/Ombros
        ctx.fillStyle = "#2980b9"; // Cor da roupa
        ctx.beginPath();
        ctx.ellipse(dx + 20, dy + 25, 20, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // 3. Cabeça
        let skinGrad = ctx.createRadialGradient(dx+20, dy+15, 2, dx+20, dy+20, 15);
        skinGrad.addColorStop(0, "#ffdbac"); // Topo da cabeça
        skinGrad.addColorStop(1, "#e0ac69"); // Sombra do pescoço
        ctx.fillStyle = skinGrad;
        ctx.beginPath();
        ctx.arc(dx + 20, dy + 20, 12, 0, Math.PI * 2);
        ctx.fill();

        // 4. Mochila (Detalhe realista)
        ctx.fillStyle = "#34495e";
        ctx.fillRect(dx + 10, dy + 22, 20, 10);
    }
}
