let isNearComputer = false;
const MARGIN_DOOR_COLLISION = 10; // Ajuste a margem conforme necessário

window.addEventListener('keydown', (event) => {
  if (player.preventInput) return;

  if (event.key === 'Enter' && isNearComputer) {
    showPopup('popup', level);
  }

  switch (event.key) {
    case 'w':
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        
        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width + MARGIN_DOOR_COLLISION &&
          player.hitbox.position.x >= door.position.x - MARGIN_DOOR_COLLISION &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y - MARGIN_DOOR_COLLISION &&
          player.hitbox.position.y <= door.position.y + door.height + MARGIN_DOOR_COLLISION
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;
          player.preventInput = true;
          player.switchSprite('enterDoor');
          door.play();
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
      // move player to the left
      keys.a.pressed = false

      break
    case 'd':
      // move player to the right
      keys.d.pressed = false

      break
  }
})

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

  // Concatenação do nome do arquivo
  let arquivo = ''
  if(fase == 0) {
    arquivo = nome
  }else {
    arquivo = `popups/${nome}${fase}.html`;
  }
  fetch(arquivo)
    .then(response => response.text())
    .then(html => {
      overlay.innerHTML = html;
    })
    .catch(error => {
      console.error('Erro ao carregar o popup:', error);
    });

  window.closePopup = function() {
    overlay.remove();
  };
}

  


function isColliding(rect1, rect2, margin = 0) {
  return (
    rect1.hitbox.position.x < rect2.position.x + rect2.width - margin &&
    rect1.hitbox.position.x + rect1.hitbox.width > rect2.position.x + margin &&
    rect1.hitbox.position.y < rect2.position.y + rect2.height - margin &&
    rect1.hitbox.position.y + rect1.hitbox.height > rect2.position.y + margin
  );
}


function checkPlayerFireCollision() {
  fires.forEach((fire) => {
    if (isColliding(player, fire, 10)) {
      if (!popupShown) {
        popupShown = true;
        showPopup('lost.html',0);
         setTimeout(() => {
          location.reload();
        }, 5000); 
      
      }
    }
  });
}