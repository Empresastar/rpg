class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 30;
        this.speed = 5;
        this.keys = {};
        window.addEventListener('keydown', e => this.keys[e.key.toLowerCase()] = true);
        window.addEventListener('keyup', e => this.keys[e.key.toLowerCase()] = false);
    }

    update(world) {
        let nextX = this.x;
        let nextY = this.y;

        if (this.keys['w']) nextY -= this.speed;
        if (this.keys['s']) nextY += this.speed;
        if (this.keys['a']) nextX -= this.speed;
        if (this.keys['d']) nextX += this.speed;

        // SISTEMA DE COLISÃO
        // Verifica se a próxima posição vai bater em algum objeto do mundo
        let canMove = !world.objects.some(obj => {
            // Só checa colisão com Árvores e Caixas (Arbusto você pode atravessar)
            if (obj.type === 'bush') return false;

            let dx = (nextX + this.size/2) - obj.x;
            let dy = (nextY + this.size/2) - obj.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            // Se a distância for menor que o tamanho dos dois somados, houve colisão
            return distance < (this.size/2 + obj.size * 0.4);
        });

        if (canMove) {
            this.x = nextX;
            this.y = nextY;
        }

        // Bordas do mundo
        this.x = Math.max(0, Math.min(this.x, world.width - this.size));
        this.y = Math.max(0, Math.min(this.y, world.height - this.size));
    }

    draw(ctx, camera) {
        const dx = this.x - camera.x;
        const dy = this.y - camera.y;

        // Sombra
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.beginPath();
        ctx.arc(dx + 15, dy + 35, 12, 0, Math.PI * 2);
        ctx.fill();

        // Player (Visão de cima)
        ctx.fillStyle = "#2980b9";
        ctx.beginPath();
        ctx.ellipse(dx + 15, dy + 15, 18, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffdbac";
        ctx.beginPath();
        ctx.arc(dx + 15, dy + 10, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}
