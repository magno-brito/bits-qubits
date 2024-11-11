let isNearComputer = false;
let isNearApagador = false; // Adicione esta variável
let ativadorFire = true;
const MARGIN_DOOR_COLLISION = 10; // Ajuste a margem conforme necessário

// Função para exibir o popup com um arquivo HTML
// Função para exibir o popup com um arquivo HTML
function showPopup(nome, fase) {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '999';
  document.body.appendChild(overlay);

  // Centralizar o conteúdo do popup
  const popupContainer = document.createElement('div');
  popupContainer.style.position = 'absolute';
  popupContainer.style.top = '50%';
  popupContainer.style.left = '60%';
  popupContainer.style.transform = 'translate(-50%, -50%)'; // Para centralizar corretamente
  popupContainer.style.maxWidth = '80%'; // Limita o tamanho do popup (opcional)
  popupContainer.style.maxHeight = '80%'; // Limita o tamanho do popup (opcional)
  popupContainer.style.overflow = 'auto'; // Permite rolagem caso o conteúdo seja muito grande
  overlay.appendChild(popupContainer);

  let arquivo = fase === 0 ? nome : `popups/${nome}${fase}.html`;

  fetch(arquivo)
    .then(response => response.text())
    .then(html => {
      popupContainer.innerHTML = html;
    })
    .catch(error => {
      console.error('Erro ao carregar o popup:', error);
    });

  window.closePopup = function() {
    overlay.remove();
  };
}


window.addEventListener('keydown', (event) => {
  if (player.preventInput) return;

  if (event.key === 'Enter' && isNearComputer) {
    showPopup('popup', level);
  }

  if (event.key === 'Enter' && isNearApagador) {
    fires.forEach(fire => {
      fire.startExtinguishing();
    });
  }

  switch (event.key) {
    case 'w':
      for (let door of doors) {
        if (isColliding(player, door, MARGIN_DOOR_COLLISION)) {
          player.velocity.x = 0;
          player.velocity.y = 0;
          player.preventInput = true;
          player.switchSprite('enterDoor');
          door.play();

          // Abre o popup com question.html ao entrar na porta
          showPopup('question.html', 0); // A página question.html será aberta no popup

          return;
        }
      }
      if (player.velocity.y === 0) player.velocity.y = -25;
      break;
    case 'a':
      keys.a.pressed = true;
      break;
    case 'd':
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
});

function isColliding(rect1, rect2, margin = 0) {
  return (
    rect1.hitbox.position.x < rect2.position.x + rect2.width - margin &&
    rect1.hitbox.position.x + rect1.hitbox.width > rect2.position.x + margin &&
    rect1.hitbox.position.y < rect2.position.y + rect2.height - margin &&
    rect1.hitbox.position.y + rect1.hitbox.height > rect2.position.y + margin
  );
}

function checkPlayerFireCollision() {
  if (ativadorFire) { // Verifique se o fogo está ativado antes de verificar colisão
    fires.forEach((fire) => {
      // Verifica se o fogo ainda está visível
      if (fire.opacity > 0 && isColliding(player, fire, 10)) {
        if (!popupShown) {
          popupShown = true;
          showPopup('lost.html', 0);
          setTimeout(() => {
            location.reload();
          }, 5000);
        }
      }
    });
  }
}

function checkPlayerEnergyCollision() {
  energies.forEach((energy) => {
    if (isColliding(player, energy, 10)) {
      if (!popupShown) {
        popupShown = true;
        showPopup('lost.html', 0);
        setTimeout(() => {
          location.reload();
        }, 5000);
      }
    }
  });
}
