class Camera {
    constructor(viewWidth, viewHeight) {
        this.x = 0;
        this.y = 0;
        this.width = viewWidth;
        this.height = viewHeight;
        this.lerp = 0.1; // Suavidade do movimento
    }

    follow(target, world) {
        // Alvo centralizado
        let targetX = target.x + target.size / 2 - this.width / 2;
        let targetY = target.y + target.size / 2 - this.height / 2;

        // Interpolação para movimento suave
        this.x += (targetX - this.x) * this.lerp;
        this.y += (targetY - this.y) * this.lerp;

        // Limites do mundo
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x > world.width - this.width) this.x = world.width - this.width;
        if (this.y > world.height - this.height) this.y = world.height - this.height;
    }
}
