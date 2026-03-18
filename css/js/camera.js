class Camera {
    constructor(viewWidth, viewHeight) {
        this.x = 0;
        this.y = 0;
        this.width = viewWidth;
        this.height = viewHeight;
    }

    follow(target, world) {
        // Centraliza a câmera no jogador
        this.x = target.x + target.size / 2 - this.width / 2;
        this.y = target.y + target.size / 2 - this.height / 2;

        // Limites da câmera (não mostrar o "vazio" fora do mapa)
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x > world.width - this.width) this.x = world.width - this.width;
        if (this.y > world.height - this.height) this.y = world.height - this.height;
    }
}
