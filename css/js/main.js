const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configuração de tamanho (Resolução interna)
canvas.width = 800;
canvas.height = 600;

// Instanciar o jogador (vamos criar a classe abaixo)
const player = new Player(canvas.width / 2, canvas.height / 2);

function update() {
    player.update();
}

function draw() {
    // 1. Limpa o frame anterior
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Desenha o fundo (Mundo)
    // Aqui entrará a lógica de chunks no futuro

    // 3. Desenha o jogador
    player.draw(ctx);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop); // Mantém o jogo a 60 FPS
}

// Inicia o jogo
gameLoop();
