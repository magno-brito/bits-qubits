let isNearComputer = false;
let isNearApagador = false;
let ativadorFire = true;
const MARGIN_DOOR_COLLISION = 10;
let correctAnswer = false;
let popupShown = false; // Verifica se o popup já foi exibido
let fase = 1;

function showPopup(nome, fase) {
  console.log(fase)
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  document.body.appendChild(overlay);

  const popupContainer = document.createElement('div');
  popupContainer.classList.add('popup-content');
  overlay.appendChild(popupContainer);

  let arquivo = fase === 0 ? nome : `popups/popup${fase}.html`;
  console.log(level)

  fetch(arquivo)
    .then(response => {
      if (!response.ok) throw new Error('Arquivo não encontrado');
      return response.text();
    })
    .then(html => {
      popupContainer.innerHTML = html;

      // Verificar se o popup possui o feedback
      const feedbackElement = popupContainer.querySelector("#feedback");
      if (feedbackElement) {
        // Adiciona as opções de resposta
        const options = popupContainer.querySelectorAll('.option');
        options.forEach(option => {
          option.addEventListener('click', () => {
            if (option.id === "correta") {
              correctAnswer = true;
              feedbackElement.textContent = "Correto! Parabéns!";
              feedbackElement.style.color = "lightgreen";
              showGameFeedback("Correto! Parabéns!", "lightgreen");
            } else {
              correctAnswer = false;
              feedbackElement.textContent = "Incorreto! Tente novamente.";
              feedbackElement.style.color = "red";
              showGameFeedback("Incorreto! Tente novamente.", "red");
            }

            setTimeout(() => {
              closePopup(); // Espera o feedback ser mostrado antes de fechar
            }, 2000);
          });
        });
      } else {
        console.log("Elemento de feedback não encontrado no popup");
      }
    })
    .catch(error => {
      console.error('Erro ao carregar o popup:', error);
      popupContainer.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
    });
}

function closePopup() {
  const overlay = document.querySelector('div[style*="z-index: 999"]');
  console.log('correctAnswer ao fechar popup:', correctAnswer); // Verifique o valor de correctAnswer

  if (overlay) {
    overlay.remove(); // Fecha o popup
  }

  // Verifica se a resposta foi correta antes de abrir a porta
  if (correctAnswer) {
    console.log('Abrindo a porta...');
    player.velocity.x = 0;
    player.velocity.y = 0;
    player.preventInput = true;  // Previne o movimento do player enquanto a porta abre
    player.switchSprite('enterDoor');  // Troca o sprite para a animação de entrada na porta
    doors[0].play();  // Toca som ou qualquer outra ação relacionada à porta.

    // Se a resposta estiver correta, a porta se abre depois do feedback
    setTimeout(() => {
      player.preventInput = false; // Permite novamente o movimento do player após 2 segundos
      console.log('Porta aberta!');
    }, 2000);  // 2 segundos após o feedback
  } else {
    console.log('Resposta errada. Porta não abre.');
  }

  // Resetar popupShown para permitir nova exibição de popup
  popupShown = false;
}

function showGameFeedback(message, color) {
  const feedbackElement = document.querySelector("#feedback");  // Se o popup já tiver carregado, essa busca irá funcionar
  if (feedbackElement) {
    feedbackElement.textContent = message;
    feedbackElement.style.color = color;
  }
}

// Detecção de colisões e interação com teclas
window.addEventListener('keydown', (event) => {
  if (player.preventInput) return;

  if (event.key === 'Enter' && isNearComputer) {
    showPopup('popup.html', level || 0);
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
          if (!popupShown) {
            popupShown = true;
            showPopup(`questions/question${level}.html`, 0); // Mostrar o popup de pergunta
          }
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
  if (ativadorFire) {
    fires.forEach((fire) => {
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
