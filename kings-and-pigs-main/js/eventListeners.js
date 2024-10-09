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
  const popup = document.createElement('div');
  popup.style.position = 'absolute';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.padding = '20px';
  popup.style.backgroundColor = 'white';
  popup.style.border = '2px solid black';
  popup.innerHTML = 'Você encontrou um computador!';
  document.body.appendChild(popup);

  // Fecha o popup após 3 segundos
  setTimeout(() => {
    popup.remove();
  }, 3000);
}

function isColliding(rect1, rect2) {
  return (
    rect1.hitbox.position.x < rect2.position.x + rect2.width &&
    rect1.hitbox.position.x + rect1.hitbox.width > rect2.position.x &&
    rect1.hitbox.position.y < rect2.position.y + rect2.height &&
    rect1.hitbox.position.y + rect1.hitbox.height > rect2.position.y
  );
}
