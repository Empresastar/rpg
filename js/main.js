// 1. Seleção do Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

/**
 * 2. FUNÇÃO DE REDIMENSIONAMENTO (RESIZE)
 * Esta função ajusta o jogo para o tamanho da aba do navegador.
 */
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // A CORREÇÃO ESTÁ AQUI: 
    // Só tentamos atualizar a câmera se ela já foi criada (não é undefined)
    if (typeof camera !== 'undefined' && camera !== null) {
        camera.width = canvas.width;
        camera.height = canvas.height;
    }
}

// 3. INICIALIZAÇÃO DAS VARIÁVEIS
// Criamos o mundo primeiro
const world = new World();

// Criamos a câmera (Agora ela existe oficialmente)
const camera = new Camera(window.innerWidth, window.innerHeight);

// Criamos o jogador no centro do mapa
const player = new Player(world.width / 2, world.height / 2);

// Chamamos o resize uma vez para configurar o tamanho inicial do canvas
resize();

// Ouvinte de evento para quando o usuário esticar a janela
window.addEventListener('resize', resize);

/**
 * 4. LÓGICA DO JOGO (UPDATE)
 */
function update() {
    player.update(world);
    camera.follow(player, world);
}

/**
 * 5. DESENHO DO JOGO (DRAW)
 */
function draw() {
    // Limpa o rastro do frame anterior
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o mapa e objetos
    world.draw(ctx, camera);

    // Desenha o herói por cima
    player.draw(ctx, camera);
}

/**
 * 6. LOOP PRINCIPAL
 */
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// 7. MODO TELA CHEIA (OPCIONAL)
canvas.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch(err => {
            console.warn("Tela cheia não ativada: ", err.message);
        });
    }
});

// INICIA TUDO!
gameLoop();
