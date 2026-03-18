class World {
    constructor() {
        this.width = 5000;
        this.height = 5000;
        this.objects = [];
        this.generateMap();
    }

    generateMap() {
        for (let i = 0; i < 400; i++) {
            const type = i < 150 ? 'tree' : (i < 250 ? 'box' : 'bush');
            this.objects.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                type: type,
                size: 40 + Math.random() * 40 // Tamanhos variados
            });
        }
    }

    draw(ctx, camera) {
        // Chão com degradê para parecer solo real
        let groundGrad = ctx.createLinearGradient(0-camera.x, 0-camera.y, this.width-camera.x, this.height-camera.y);
        groundGrad.addColorStop(0, "#1e3d1a");
        groundGrad.addColorStop(1, "#2d5a27");
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0 - camera.x, 0 - camera.y, this.width, this.height);

        // Desenhar objetos com sombra projetada
        this.objects.forEach(obj => {
            if (this.isVisible(obj, camera)) {
                this.drawRealistObject(ctx, obj, camera);
            }
        });
    }

    isVisible(obj, camera) {
        return obj.x > camera.x - 100 && obj.x < camera.x + canvas.width + 100 &&
               y > camera.y - 100 && y < camera.y + canvas.height + 100;
    }

    drawRealistObject(ctx, obj, camera) {
        const dx = obj.x - camera.x;
        const dy = obj.y - camera.y;

        // SOMBRA REALISTA (Inclinada)
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.beginPath();
        ctx.ellipse(dx + obj.size/2, dy + obj.size, obj.size/2, obj.size/4, 0, 0, Math.PI * 2);
        ctx.fill();

        if (obj.type === 'tree') {
            // Tronco com degradê
            let trunkGrad = ctx.createLinearGradient(dx, dy, dx + 20, dy);
            trunkGrad.addColorStop(0, "#3e2723");
            trunkGrad.addColorStop(1, "#5d4037");
            ctx.fillStyle = trunkGrad;
            ctx.fillRect(dx + obj.size/2 - 10, dy + 20, 20, 40);

            // Copa da árvore com Iluminação (Luz vinda do topo esquerdo)
            let leafGrad = ctx.createRadialGradient(dx + 20, dy + 10, 5, dx + 30, dy + 30, 50);
            leafGrad.addColorStop(0, "#4caf50"); // Luz
            leafGrad.addColorStop(1, "#1b5e20"); // Sombra
            ctx.fillStyle = leafGrad;
            ctx.beginPath();
            ctx.arc(dx + obj.size/2, dy + 10, obj.size, 0, Math.PI * 2);
            ctx.fill();
        } else if (obj.type === 'box') {
            // Caixa com textura de madeira
            ctx.fillStyle = "#8b5e3c";
            ctx.fillRect(dx, dy, 45, 45);
            ctx.strokeStyle = "rgba(0,0,0,0.4)";
            ctx.lineWidth = 2;
            ctx.strokeRect(dx+2, dy+2, 41, 41);
            // Pregos nos cantos
            ctx.fillStyle = "#333";
            [5, 35].forEach(px => [5, 35].forEach(py => ctx.fillRect(dx+px, dy+py, 3, 3)));
        }
    }
}
