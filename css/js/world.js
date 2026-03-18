class World {
    constructor() {
        this.width = 2000;  // Largura total do mapa
        this.height = 2000; // Altura total do mapa
        this.tileSize = 50;
    }

    draw(ctx, camera) {
        // Desenha o gramado (fundo)
        ctx.fillStyle = "#3e8e41"; 
        ctx.fillRect(0 - camera.x, 0 - camera.y, this.width, this.height);

        // Desenha uma grade para você perceber que o mundo está se movendo
        ctx.strokeStyle = "#45a049";
        ctx.lineWidth = 2;

        for (let x = 0; x <= this.width; x += this.tileSize) {
            ctx.beginPath();
            ctx.moveTo(x - camera.x, 0 - camera.y);
            ctx.lineTo(x - camera.x, this.height - camera.y);
            ctx.stroke();
        }
        for (let y = 0; y <= this.height; y += this.tileSize) {
            ctx.beginPath();
            ctx.moveTo(0 - camera.x, y - camera.y);
            ctx.lineTo(this.width - camera.x, y - camera.y);
            ctx.stroke();
        }
    }
}
