class World {
    constructor() {
        this.width = 5000;
        this.height = 5000;
        this.objects = [];
        this.generateMap();
    }

    generateMap() {
        // Gera Árvores, Caixas e Arbustos
        for (let i = 0; i < 400; i++) {
            const type = i < 150 ? 'tree' : (i < 250 ? 'box' : 'bush');
            this.objects.push({
                x: Math.random() * (this.width - 100),
                y: Math.random() * (this.height - 100),
                type: type,
                size: 40 + Math.random() * 40
            });
        }
    }

    draw(ctx, camera) {
        // Chão com degradê (Grama realista)
        let groundGrad = ctx.createLinearGradient(0, 0, 0, this.height);
        groundGrad.addColorStop(0, "#1e3d1a");
        groundGrad.addColorStop(1, "#2d5a27");
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0 - camera.x, 0 - camera.y, this.width, this.height);

        // Desenha objetos
        this.objects.forEach(obj => {
            if (this.isVisible(obj, camera)) {
                this.drawRealistObject(ctx, obj, camera);
            }
        });
    }

    // Checa se o objeto está na tela para não pesar o jogo
    isVisible(obj, camera) {
        return obj.x > camera.x - 100 && 
               obj.x < camera.x + window.innerWidth + 100 &&
               obj.y > camera.y - 100 && 
               obj.y < camera.y + window.innerHeight + 100;
    }

    drawRealistObject(ctx, obj, camera) {
        const dx = obj.x - camera.x;
        const dy = obj.y - camera.y;

        // SOMBRA PROJETADA
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.beginPath();
        ctx.ellipse(dx + obj.size/2, dy + obj.size, obj.size/2, obj.size/4, 0, 0, Math.PI * 2);
        ctx.fill();

        if (obj.type === 'tree') {
            // Tronco
            ctx.fillStyle = "#3e2723";
            ctx.fillRect(dx + obj.size/2 - 10, dy + 20, 20, 40);

            // Copa da Árvore (Iluminação Radial)
            let leafGrad = ctx.createRadialGradient(dx + 20, dy + 10, 5, dx + 30, dy + 30, 50);
            leafGrad.addColorStop(0, "#4caf50"); 
            leafGrad.addColorStop(1, "#1b5e20"); 
            ctx.fillStyle = leafGrad;
            ctx.beginPath();
            ctx.arc(dx + obj.size/2, dy + 10, obj.size, 0, Math.PI * 2);
            ctx.fill();
        } else if (obj.type === 'box') {
            // Caixa detalhada
            ctx.fillStyle = "#8b5e3c";
            ctx.fillRect(dx, dy, 45, 45);
            ctx.strokeStyle = "rgba(0,0,0,0.4)";
            ctx.lineWidth = 2;
            ctx.strokeRect(dx+2, dy+2, 41, 41);
            // Pregos
            ctx.fillStyle = "#333";
            ctx.fillRect(dx+5, dy+5, 3, 3);
            ctx.fillRect(dx+37, dy+5, 3, 3);
            ctx.fillRect(dx+5, dy+37, 3, 3);
            ctx.fillRect(dx+37, dy+37, 3, 3);
        } else if (obj.type === 'bush') {
            // Arbusto orgânico
            ctx.fillStyle = "#2e7d32";
            ctx.beginPath();
            ctx.ellipse(dx + 20, dy + 25, 30, 18, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
