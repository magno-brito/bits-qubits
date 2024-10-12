let isNearComputer = false;

window.addEventListener('keydown', (event) => {
  if (player.preventInput) return

  if (event.key === 'Enter' && isNearComputer) {
    showPopup();
  }

  switch (event.key) {
    case 'w':
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i]

        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0
          player.velocity.y = 0
          player.preventInput = true
          player.switchSprite('enterDoor')
          door.play()
          return
        }
      }
      if (player.velocity.y === 0) player.velocity.y = -25

      break
    case 'a':
      // move player to the left
      keys.a.pressed = true
      break
    case 'd':
      // move player to the right
      keys.d.pressed = true
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a':
      // move player to the left
      keys.a.pressed = false

      break
    case 'd':
      // move player to the right
      keys.d.pressed = false

      break
  }
})


// Função para mostrar o popup
function showPopup() {
  // Criar o fundo overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '999';
  document.body.appendChild(overlay);

  // Carregar o conteúdo da página HTML
  fetch('popup.html')
    .then(response => response.text())
    .then(html => {
      // Inserir o HTML carregado no overlay
      overlay.innerHTML = html;
    })
    .catch(error => {
      console.error('Erro ao carregar o popup:', error);
    });

  // Função para fechar o popup
  window.closePopup = function() {
    overlay.remove();
  };
  
}

function isColliding(rect1, rect2) {
  return (
    rect1.hitbox.position.x < rect2.position.x + rect2.width &&
    rect1.hitbox.position.x + rect1.hitbox.width > rect2.position.x &&
    rect1.hitbox.position.y < rect2.position.y + rect2.height &&
    rect1.hitbox.position.y + rect1.hitbox.height > rect2.position.y
  );
}

function checkPlayerFireCollision() {
  fires.forEach((fire) => {
    if (isColliding(player, fire)) {
      if (!popupShown) {
        popupShown = true;
        alert("Fim do jogo!");
        // Você pode colocar lógica adicional para reiniciar o jogo ou voltar ao menu principal aqui
      }
    }
  });
}