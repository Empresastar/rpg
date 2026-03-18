let world, camera, player;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (camera) {
        camera.width = canvas.width;
        camera.height = canvas.height;
    }
}

function init() {
    resize();
    world = new World();
    camera = new Camera(canvas.width, canvas.height);
    player = new Player(world.width / 2, world.height / 2);

    window.addEventListener('resize', resize);
    gameLoop();
}

function update() {
    player.update(world);
    camera.follow(player, world);
}

function draw() {
    // Limpa a tela
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o Mundo e o Player
    world.draw(ctx, camera);
    player.draw(ctx, camera);

    // EFEITO DE LUZ AMBIENTE (Vinheta Realista)
    let ambient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width * 0.2, 
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
    );
    ambient.addColorStop(0, "rgba(0,0,0,0)");      // Centro iluminado
    ambient.addColorStop(1, "rgba(0,0,0,0.6)");    // Bordas escuras
    ctx.fillStyle = ambient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Inicia quando tudo carregar
window.onload = init;
