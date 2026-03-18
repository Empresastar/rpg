const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Instancia as classes
const world = new World();
const camera = new Camera(canvas.width, canvas.height);
const player = new Player(world.width / 2, world.height / 2); // Começa no meio do mundo

function update() {
    player.update();
    camera.follow(player); // A câmera segue o jogador
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // IMPORTANTE: O mundo e o player precisam saber a posição da câmera
    world.draw(ctx, camera);
    player.draw(ctx, camera);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
