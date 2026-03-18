/**
 * MOTOR PRINCIPAL DO JOGO
 * Gerencia o Loop, a Tela e as Instâncias
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 1. CONFIGURAÇÃO DE TELA (Responsivo)
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Só atualiza a câmera se ela já tiver sido criada lá embaixo
    if (typeof camera !== 'undefined' && camera !== null) {
        camera.width = canvas.width;
        camera.height = canvas.height;
    }
}

// Executa o resize imediatamente e sempre que a janela mudar
resize();
window.addEventListener('resize', resize);

// 2. INICIALIZAÇÃO DOS MÓDULOS
// Criamos o mundo primeiro para saber o tamanho total
const world = new World();

// Criamos a câmera com o tamanho atual da tela
const camera = new Camera(canvas.width, canvas.height);

// Criamos o jogador no centro do mapa (2500, 2500)
const player = new Player(world.width / 2, world.height / 2);

/**
 * 3. FUNÇÃO DE ATUALIZAÇÃO (Lógica)
 */
function update() {
    // Move o jogador e checa se ele não saiu das bordas do mundo
    player.update(world);
    
    // Faz a câmera deslizar suavemente atrás do jogador
    camera.follow(player, world);
}

/**
 * 4. FUNÇÃO DE DESENHO (Visual)
 */
function draw() {
    // Limpa a tela para desenhar o novo frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Camada 1: O Chão e os objetos (Árvores, Caixas, Mato, Casas)
    world.draw(ctx, camera);

    // Camada 2: O Jogador (Sempre desenhado por cima do chão)
    player.draw(ctx, camera);
}

/**
 * 5. LOOP INFINITO (Game Loop)
 */
function gameLoop() {
    update();
    draw();
    
    // Mantém o jogo rodando a 60 frames por segundo
    requestAnimationFrame(gameLoop);
}

// 6. CONTROLE DE TELA CHEIA (Fullscreen)
// O navegador exige que o usuário clique na tela para liberar o Fullscreen
canvas.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch(err => {
            console.warn(`Aviso: Não foi possível ativar tela cheia: ${err.message}`);
        });
    }
});

// INICIALIZA O MOTOR DO JOGO
gameLoop();
