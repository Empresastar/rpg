class World {
    constructor() {
        this.width = 2000;
        this.height = 2000;
        this.tileSize = 64;
    }

    draw(ctx, camera) {
        // Chão (Grama)
        ctx.fillStyle = "#2d5a27";
        ctx.fillRect(0 - camera.x, 0 - camera.y, this.width, this.height);

        // Desenha uma grade simples para referência
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        for (let x = 0; x < this.width; x += this.tileSize) {
            ctx.beginPath();
            ctx.moveTo(x - camera.x, 0 - camera.y);
            ctx.lineTo(x - camera.x, this.height - camera.y);
            ctx.stroke();
        }
        for (let y = 0; y < this.height; y += this.tileSize) {
            ctx.beginPath();
            ctx.moveTo(0 - camera.x, y - camera.y);
            ctx.lineTo(this.width - camera.x, y - camera.y);
            ctx.stroke();
        }
    }
}
