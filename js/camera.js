class Camera {
    constructor(viewWidth, viewHeight) {
        this.x = 0;
        this.y = 0;
        this.width = viewWidth;
        this.height = viewHeight;
        this.lerp = 0.1; // Suavidade: quanto menor, mais "elástica" é a câmera
    }

    follow(target, world) {
        // Calcula onde a câmera deveria estar para centralizar o alvo
        let targetX = target.x + target.size / 2 - this.width / 2;
        let targetY = target.y + target.size / 2 - this.height / 2;

        // Movimento suave (Lerp)
        this.x += (targetX - this.x) * this.lerp;
        this.y += (targetY - this.y) * this.lerp;

        // Trava a câmera para ela não mostrar o "vazio" fora do mapa
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x > world.width - this.width) this.x = world.width - this.width;
        if (this.y > world.height - this.height) this.y = world.height - this.height;
    }
}
