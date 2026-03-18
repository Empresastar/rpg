class World {
    constructor() {
        this.width = 2000;  // Mundo muito maior que a tela
        this.height = 2000;
        this.tileSize = 40; // Tamanho de cada bloco de chão
    }

    draw(ctx, camera) {
        ctx.fillStyle = "#2d5a27"; // Verde escuro para o chão
        // Desenha o limite do mundo
        ctx.fillRect(0 - camera.x, 0 - camera.y, this.width, this.height);

        // Desenha algumas "marcações" (ex: árvores/pedras abstratas) 
        // para você perceber o movimento
        ctx.fillStyle = "#5d4037";
        for(let i = 0; i < 50; i++) {
            // Exemplo de posições fixas baseadas em um cálculo simples
            let x = (i * 150) % this.width;
            let y = (i * 200) % this.height;
            ctx.fillRect(x - camera.x, y - camera.y, 20, 20);
        }
    }
}
