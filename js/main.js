// Seleciona o canvas e o contexto de desenho
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 1. CONFIGURAÇÃO DE TELA CHEIA DINÂMICA
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Se o jogo já estiver rodando, precisamos garantir que a câmera saiba o novo tamanho
    if (typeof camera !== 'undefined') {
        camera.width = canvas.width;
        camera.height = canvas.height;
    }
}

// Ajusta o tamanho ao carregar a página
resize();

// Ajusta o tamanho sempre que a janela mudar (redimensionar ou girar tela)
window.addEventListener('resize', resize);

// 2. INICIALIZAÇÃO DOS COMPONENTES DO JOGO
// Certifique-se que world.js, camera.js e player.js foram carregados no index.html antes deste
const world = new World();
const camera = new Camera(canvas.width, canvas.height);

// O jogador começa no centro do mapa gigante
const player = new Player(world.width / 2, world.height / 2);

// 3. FUNÇÃO DE ATUALIZAÇÃO (Lógica)
function update() {
    // Atualiza posição do jogador (passando o mundo para checar limites)
    player.update(world);
    
    // Faz a câmera seguir o jogador suavemente
    camera.follow(player, world);
}

// 4. FUNÇÃO DE RENDERIZAÇÃO (Visual)
function draw() {
    // Limpa a tela para o próximo frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o mapa (passando a câmera para saber o que exibir)
    world.draw(ctx, camera);

    // Desenha o jogador
    player.draw(ctx, camera);
}

// 5. O LOOP PRINCIPAL (Game Loop)
function gameLoop() {
    update();
    draw();
    
    // Solicita o próximo frame (60 FPS)
    requestAnimationFrame(gameLoop);
}

// 6. MODO FULLSCREEN AO CLICAR (Opcional, mas recomendado para Mobile)
canvas.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch(err => {
            console.log(`Erro ao ativar tela cheia: ${err.message}`);
        });
    }
});

// INICIA O JOGO
gameLoop();
