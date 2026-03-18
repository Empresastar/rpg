class World {
    constructor() {
        this.width = 5000;  // Mapa expandido
        this.height = 5000;
        this.tileSize = 64;
        
        // Cores do bioma
        this.colors = {
            grass: "#3e8e41",
            dirt: "#8B4513",
            tree: "#2d5a27",
            trunk: "#5d4037",
            box: "#b58952",
            bush: "#224b24"
        };

        // Gerar objetos espalhados uma única vez
        this.objects = [];
        this.generateMap();
    }

    generateMap() {
        // Criar 150 árvores, 80 caixas e 200 tufos de mato aleatórios
        for (let i = 0; i < 430; i++) {
            let type = i < 150 ? 'tree' : (i < 230 ? 'box' : 'bush');
            this.objects.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                type: type,
                size: type === 'tree' ? 60 : 30
            });
        }
    }

    draw(ctx, camera) {
        // 1. Desenha o chão (Grama)
        ctx.fillStyle = this.colors.grass;
        ctx.fillRect(0 - camera.x, 0 - camera.y, this.width, this.height);

        // 2. Desenha caminhos de Terra (detalhe visual)
        ctx.fillStyle = "rgba(0,0,0,0.05)"; 
        for(let i=0; i<this.width; i+=500) {
            ctx.fillRect(i - camera.x, 0 - camera.y, 100, this.height);
            ctx.fillRect(0 - camera.x, i - camera.y, this.width, 100);
        }

        // 3. Desenha os objetos
        this.objects.forEach(obj => {
            // Só desenha se estiver visível na tela (otimização)
            if (obj.x > camera.x - 100 && obj.x < camera.x + camera.width + 100 &&
                obj.y > camera.y - 100 && obj.y < camera.y + camera.height + 100) {
                
                this.drawObject(ctx, obj, camera);
            }
        });
    }

    drawObject(ctx, obj, camera) {
        const drawX = obj.x - camera.x;
        const drawY = obj.y - camera.y;

        if (obj.type === 'tree') {
            // Tronco
            ctx.fillStyle = this.colors.trunk;
            ctx.fillRect(drawX + 20, drawY + 40, 20, 30);
            // Folhas
            ctx.fillStyle = this.colors.tree;
            ctx.beginPath();
            ctx.arc(drawX + 30, drawY + 30, 35, 0, Math.PI * 2);
            ctx.fill();
        } else if (obj.type === 'box') {
            // Caixa
            ctx.fillStyle = this.colors.box;
            ctx.fillRect(drawX, drawY, 40, 40);
            ctx.strokeStyle = "#855e2d";
            ctx.strokeRect(drawX + 5, drawY + 5, 30, 30); // Detalhe da caixa
        } else if (obj.type === 'bush') {
            // Mato/Arbusto
            ctx.fillStyle = this.colors.bush;
            ctx.beginPath();
            ctx.ellipse(drawX + 15, drawY + 15, 20, 10, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
