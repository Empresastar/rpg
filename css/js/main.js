const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ajuste de tela
canvas.width = 800;
canvas.height = 600;

// Inicialização
const world = new World();
const camera = new Camera(canvas.width, canvas.height);
const player = new Player(world.width / 2, world.height / 2);

function update() {
    player.update(world);
    camera.follow(player, world);
}

function draw() {
    // Limpar tela
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar camadas
    world.draw(ctx, camera);
    player.draw(ctx, camera);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Rodar o jogo
gameLoop();
