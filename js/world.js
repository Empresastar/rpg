class World {
    constructor() {
        this.width = 5000;
        this.height = 5000;
        this.objects = [];
        this.houses = [];
        this.generateMap();
    }

    generateMap() {
        // Espalha árvores, caixas e mato
        for (let i = 0; i < 250; i++) {
            const type = i < 150 ? 'tree' : (i < 200 ? 'box' : 'bush');
            this.objects.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                type: type,
                id: i
            });
        }
        // Vilas de casas
        for (let i = 0; i < 20; i++) {
            this.houses.push({
                x: Math.random() * (this.width - 200),
                y: Math.random() * (this.height - 200),
                w: 180,
                h: 140
            });
        }
    }

    draw(ctx, camera) {
        // 1. CHÃO COM TEXTURA DE GRAMA (Padrão de repetição)
        ctx.fillStyle = "#2d5a27";
        ctx.fillRect(0 - camera.x, 0 - camera.y, this.width, this.height);

        // Detalhes de "mato" no chão para não ficar liso
        ctx.fillStyle = "#356b2e";
        for(let i=0; i<this.width; i+=400) {
            for(let j=0; j<this.height; j+=400) {
                ctx.fillRect(i - camera.x + (i%3)*10, j - camera.y + (j%2)*10, 4, 4);
            }
        }

        // 2. DESENHAR CASAS COM DETALHES
        this.houses.forEach(h => {
            if (this.isVisible(h.x, h.y, h.w, h.h, camera)) {
                this.drawHouse(ctx, h, camera);
            }
        });

        // 3. DESENHAR OBJETOS
        this.objects.forEach(obj => {
            if (this.isVisible(obj.x, obj.y, 80, 80, camera)) {
                this.drawObject(ctx, obj, camera);
            }
        });
    }

    isVisible(x, y, w, h, camera) {
        return x > camera.x - w && x < camera.x + canvas.width + w &&
               y > camera.y - h && y < camera.y + canvas.height + h;
    }

    drawHouse(ctx, h, camera) {
        const dx = h.x - camera.x;
        const dy = h.y - camera.y;

        // Sombra lateral
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(dx + 10, dy + 10, h.w, h.h);

        // Paredes (Bege)
        ctx.fillStyle = "#e3d5b8";
        ctx.fillRect(dx, dy, h.w, h.h);
        
        // Detalhe madeira base
        ctx.fillStyle = "#8b5e3c";
        ctx.fillRect(dx, dy + h.h - 10, h.w, 10);

        // Porta
        ctx.fillStyle = "#5d4037";
        ctx.fillRect(dx + h.w/2 - 20, dy + h.h - 50, 40, 50);

        // Janelas com "vidro" (Azul claro)
        ctx.fillStyle = "#add8e6";
        ctx.fillRect(dx + 20, dy + 30, 30, 30);
        ctx.fillRect(dx + h.w - 50, dy + 30, 30, 30);

        // Telhado (Vermelho com profundidade)
        ctx.fillStyle = "#b71c1c";
        ctx.beginPath();
        ctx.moveTo(dx - 20, dy);
        ctx.lineTo(dx + h.w / 2, dy - 70);
        ctx.lineTo(dx + h.w + 20, dy);
        ctx.fill();
    }

    drawObject(ctx, obj, camera) {
        const dx = obj.x - camera.x;
        const dy = obj.y - camera.y;

        if (obj.type === 'tree') {
            // Tronco com sombra
            ctx.fillStyle = "#3e2723";
            ctx.fillRect(dx + 25, dy + 40, 15, 30);
            
            // Folhas (Círculos sobrepostos para volume)
            ctx.fillStyle = "#1b5e20";
            ctx.beginPath(); ctx.arc(dx + 32, dy + 20, 35, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = "#2e7d32";
            ctx.beginPath(); ctx.arc(dx + 20, dy + 10, 25, 0, Math.PI * 2); ctx.fill();
        } 
        else if (obj.type === 'box') {
            // Caixa de Madeira Detalhada
            ctx.fillStyle = "#8b5e3c";
            ctx.fillRect(dx, dy, 45, 45);
            ctx.strokeStyle = "#5d4037";
            ctx.lineWidth = 3;
            ctx.strokeRect(dx + 5, dy + 5, 35, 35);
            // "X" na caixa
            ctx.beginPath();
            ctx.moveTo(dx+10, dy+10); ctx.lineTo(dx+35, dy+35);
            ctx.moveTo(dx+35, dy+10); ctx.lineTo(dx+10, dy+35);
            ctx.stroke();
        } 
        else if (obj.type === 'bush') {
            // Arbustos
            ctx.fillStyle = "#4caf50";
            ctx.beginPath();
            ctx.ellipse(dx + 20, dy + 25, 30, 18, 0, 0, Math.PI * 2);
            ctx.fill();
            // Florzinha no arbusto
            ctx.fillStyle = "#ffeb3b";
            ctx.fillRect(dx + 15, dy + 20, 4, 4);
        }
    }
}
