// 1. Variáveis globais (apenas declaramos, não damos valor ainda)
let world, camera, player;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

/**
 * 2. FUNÇÃO DE REDIMENSIONAMENTO
 */
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // TRAVA DE SEGURANÇA: Só mexe na câmera se ela já existir de fato
    if (camera) {
        camera.width = canvas.width;
        camera.height = canvas.height;
    }
}

/**
 * 3. FUNÇÃO DE INICIALIZAÇÃO (Onde a mágica começa)
 */
function init() {
    // Primeiro configuramos o tamanho do canvas
    resize();

    // Criamos as instâncias na ordem correta
    world = new World();
    camera = new Camera(canvas.width, canvas.height);
    player = new Player(world.width / 2, world.height / 2);

    // Ouvinte para redimensionar a tela depois que tudo já existe
    window.addEventListener('resize', resize);

    // Começa o loop do jogo
    gameLoop();
}

/**
 * 4. LÓGICA E DESENHO
 */
function update() {
    player.update(world);
    camera.follow(player, world);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    world.draw(ctx, camera);
    player.draw(ctx, camera);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// 5. MODO TELA CHEIA
canvas.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch(err => {});
    }
});

// EXECUÇÃO: Só inicia quando o navegador terminar de ler TUDO
window.onload = init;
