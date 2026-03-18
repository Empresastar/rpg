class World {
    constructor() {
        this.width = 5000;
        this.height = 5000;
        this.objects = [];
        this.generateMap();
    }

    generateMap() {
        const totalObjects = 500;
        const minDistance = 120; // Distância mínima entre objetos

        for (let i = 0; i < totalObjects; i++) {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 50) {
                let newObj = {
                    x: Math.random() * (this.width - 200) + 100,
                    y: Math.random() * (this.height - 200) + 100,
                    type: this.getRandomType(i),
                    size: 40 + Math.random() * 40
                };

                // Verifica se está muito perto de qualquer objeto já existente
                let tooClose = this.objects.some(obj => {
                    let dx = obj.x - newObj.x;
                    let dy = obj.y - newObj.y;
                    return Math.sqrt(dx * dx + dy * dy) < minDistance;
                });

                if (!tooClose) {
                    this.objects.push(newObj);
                    placed = true;
                }
                attempts++;
            }
        }
    }

    getRandomType(index) {
        if (index < 200) return 'tree';
        if (index < 350) return 'bush';
        return 'box';
    }

    draw(ctx, camera) {
        // Chão Realista
        let groundGrad = ctx.createLinearGradient(0, 0, 0, this.height);
        groundGrad.addColorStop(0, "#1e3d1a");
        groundGrad.addColorStop(1, "#2d5a27");
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0 - camera.x, 0 - camera.y, this.width, this.height);

        // Ordenar objetos pelo eixo Y (Y-Sorting) para que o que está "atrás" seja desenhado primeiro
        this.objects.sort((a, b) => a.y - b.y);

        this.objects.forEach(obj => {
            if (this.isVisible(obj, camera)) {
                this.drawObject(ctx, obj, camera);
            }
        });
    }

    isVisible(obj, camera) {
        return obj.x > camera.x - 150 && obj.x < camera.x + window.innerWidth + 150 &&
               obj.y > camera.y - 150 && obj.y < camera.y + window.innerHeight + 150;
    }

    drawObject(ctx, obj, camera) {
        const dx = obj.x - camera.x;
        const dy = obj.y - camera.y;

        // Sombra comum para todos
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.beginPath();
        ctx.ellipse(dx + 20, dy + obj.size, obj.size * 0.6, obj.size * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        if (obj.type === 'tree') {
            // Tronco com textura e largura proporcional
            ctx.fillStyle = "#3e2723";
            ctx.fillRect(dx + 12, dy + 10, 16, 40);
            
            // Detalhe de sombra no tronco
            ctx.fillStyle = "rgba(0,0,0,0.2)";
            ctx.fillRect(dx + 22, dy + 10, 6, 40);

            // Copa da Árvore (Folhas)
            let leafGrad = ctx.createRadialGradient(dx + 10, dy - 10, 5, dx + 20, dy + 10, 60);
            leafGrad.addColorStop(0, "#4caf50");
            leafGrad.addColorStop(1, "#1b5e20");
            ctx.fillStyle = leafGrad;
            
            ctx.beginPath();
            ctx.arc(dx + 20, dy, obj.size, 0, Math.PI * 2);
            ctx.fill();
        } else if (obj.type === 'box') {
            ctx.fillStyle = "#8b5e3c";
            ctx.fillRect(dx, dy, 45, 45);
            ctx.strokeStyle = "#5d4037";
            ctx.strokeRect(dx + 5, dy + 5, 35, 35);
        } else if (obj.type === 'bush') {
            ctx.fillStyle = "#2e7d32";
            ctx.beginPath();
            ctx.ellipse(dx + 20, dy + 25, 30, 18, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
