class World {
    constructor() {
        this.width = 5000;  // Mundo Gigante
        this.height = 5000;
        this.tileSize = 64;
        
        // Cores do Jogo
        this.colors = {
            grass: "#2e7d32",   // Verde escuro
            dirt: "#5d4037",    // Marrom terra
            tree: "#1b5e20",    // Verde folha
            trunk: "#3e2723",   // Marrom tronco
            box: "#a1887f",     // Madeira da caixa
            bush: "#4caf50",    // Verde mato
            house: "#d7ccc8",   // Parede da casa
            roof: "#b71c1c"     // Telhado vermelho
        };

        this.objects = [];
        this.houses = [];
        this.generateMap();
    }

    generateMap() {
        // Gerar 200 Árvores
        for (let i = 0; i < 200; i++) {
            this.objects.push({
                x: Math.random() * (this.width - 100),
                y: Math.random() * (this.height - 100),
                type: 'tree'
            });
        }

        // Gerar 100 Caixas espalhadas
        for (let i = 0; i < 100; i++) {
            this.objects.push({
                x: Math.random() * (this.width - 50),
                y: Math.random() * (this.height - 50),
                type: 'box'
            });
        }

        // Gerar 300 tufos de Mato/Grama alta
        for (let i = 0; i < 300; i++) {
            this.objects.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                type: 'bush'
            });
        }

        // Gerar 15 Casas em vilas espalhadas
        for (let i = 0; i < 15; i++) {
            this.houses.push({
                x: Math.random() * (this.width - 200),
                y: Math.random() * (this.height - 200),
                w: 160,
                h: 120
            });
        }
    }

    draw(ctx, camera) {
        // 1. CHÃO (Grama principal)
        ctx.fillStyle = this.colors.grass;
        ctx.fillRect(0 - camera.x, 0 - camera.y, this.width, this.height);

        // 2. DETALHES DE TERRA (Estradas abstratas)
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        for (let i = 0; i < this.width; i += 800) {
            ctx.fillRect(i - camera.x, 0 - camera.y, 150, this.height);
            ctx.fillRect(0 - camera.x, i - camera.y, this.width, 150);
        }

        // 3. DESENHAR CASAS
        this.houses.forEach(h => {
            if (this.isVisible(h.x, h.y, h.w, h.h, camera)) {
                // Sombra
                ctx.fillStyle = "rgba(0,0,0,0.2)";
                ctx.fillRect(h.x - camera.x + 10, h.y - camera.y + 10, h.w, h.h);
                // Base
                ctx.fillStyle = this.colors.house;
                ctx.fillRect(h.x - camera.x, h.y - camera.y, h.w, h.h);
                // Telhado
                ctx.fillStyle = this.colors.roof;
                ctx.beginPath();
                ctx.moveTo(h.x - camera.x - 20, h.y - camera.y);
                ctx.lineTo(h.x - camera.x + h.w / 2, h.y - camera.y - 60);
                ctx.lineTo(h.x - camera.x + h.w + 20, h.y - camera.y);
                ctx.fill();
                // Porta
                ctx.fillStyle = "#3e2723";
                ctx.fillRect(h.x - camera.x + h.w/2 - 15, h.y - camera.y + h.h - 40, 30, 40);
            }
        });

        // 4. DESENHAR OBJETOS (Árvores, Caixas, Mato)
        this.objects.forEach(obj => {
            if (this.isVisible(obj.x, obj.y, 60, 60, camera)) {
                this.drawObject(ctx, obj, camera);
            }
        });
    }

    // Função para não processar o que está fora da tela (Performance)
    isVisible(x, y, w, h, camera) {
        return x > camera.x - w && x < camera.x + camera.width + w &&
               y > camera.y - h && y < camera.y + camera.height + h;
    }

    drawObject(ctx, obj, camera) {
        const dx = obj.x - camera.x;
        const dy = obj.y - camera.y;

        if (obj.type === 'tree') {
            // Tronco
            ctx.fillStyle = this.colors.trunk;
            ctx.fillRect(dx + 25, dy + 40, 14, 25);
            // Folhas
            ctx.fillStyle = this.colors.tree;
            ctx.beginPath();
            ctx.arc(dx + 32, dy + 25, 30, 0, Math.PI * 2);
            ctx.fill();
        } else if (obj.type === 'box') {
            ctx.fillStyle = this.colors.box;
            ctx.fillRect(dx, dy, 40, 40);
            ctx.strokeStyle = "rgba(0,0,0,0.3)";
            ctx.strokeRect(dx + 5, dy + 5, 30, 30);
        } else if (obj.type === 'bush') {
            ctx.fillStyle = this.colors.bush;
            ctx.beginPath();
            ctx.ellipse(dx + 20, dy + 20, 25, 15, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
