const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024 
canvas.height = 576 

const backgroundImageWidth = 1024;  
const backgroundImageHeight = 576; 

let parsedCollisions
let collisionBlocks
let background
let doors
let computers

const player = new Player({
  imageSrc: './img/king/catRight.png',
  frameRate: 12,
  animations: {
    idleRight: {
      frameRate: 12,
      frameBuffer: 1,
      loop: false,
      imageSrc: './img/king/catRight.png',
    },
  
    idleLeft: {
      frameRate: 12,
      frameBuffer: 1,
      loop: false,
      imageSrc: './img/king/catLeft.png',
    },
    runRight: {
      frameRate: 12,
      frameBuffer: 1,
      loop: true,
      imageSrc: './img/king/catRight.png',
    },
    runLeft: {
      frameRate: 12,
      frameBuffer: 1,
      loop: true,
      imageSrc: './img/king/catLeft.png',
    },
    enterDoor: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/enterDoor1.png',
      onComplete: () => {
        console.log('completed animation')
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++

            if (level === 4) level = 1
            levels[level].init()
            player.switchSprite('idleRight')
            player.preventInput = false
            gsap.to(overlay, {
              opacity: 0,
            })
          },
        })
      },
    },
  },
})

let level = 3
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      
      //Teste
      c.fillStyle = 'rgba(255, 0, 0, 0.5)';
      console.log(typeof(collisionBlocks))



      player.collisionBlocks = collisionBlocks
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/1.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 860,
            y: 410,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]

      computers = [
        new Sprite({
          position: {
            x: 100,
            y: 440,
          },
          imageSrc: './img/pagina/computer.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 96
      player.position.y = 140

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/2.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 772.0,
            y: 410,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]

      computers = [
        new Sprite({
          position: {
            x: 870,
            y: 65,
          },
          imageSrc: './img/pagina/computer.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]


    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 750
      player.position.y = 230
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/3.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 176.0,
            y: 410,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]

      computers = [
        new Sprite({
          position: {
            x: 100,
            y: 180,
          },
          imageSrc: './img/pagina/computer.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
  4: {
    init: () => {
      parsedCollisions = collisionsLevel4.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 750
      player.position.y = 230
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/4.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 176.0,
            y: 410,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 12,
          frameBuffer: 2,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
}

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}

const overlay = {
  opacity: 0,
}


function animate() {
  window.requestAnimationFrame(animate);

  background.draw();

  doors.forEach((door) => {
    door.draw();
  });

  player.update(); // Mova a atualização do player para antes da verificação de colisão

  // Atualiza a hitbox do player
  player.updateHitbox()

  isNearComputer = false
  computers.forEach((computer) => {
    computer.draw();

    // Verifica colisão entre o player e o computador
    if (isColliding(player, computer)) {
      isNearComputer = true
      showPopup(); // Exibe o popup se houver colisão
    }
  });

  player.handleInput(keys);
  player.draw();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}



// function animate() {
//   window.requestAnimationFrame(animate)

//   background.draw()
//   // collisionBlocks.forEach((collisionBlock) => {
//   //   collisionBlock.draw()
//   // })

//   doors.forEach((door) => {
//     door.draw()
//   })

//   computers.forEach((computer) => {
//     computer.draw()

//     //Colisão com o computador
//   if (isColliding(player, computer)) {
//     showPopup(); // Exibe o popup se houver colisão
//   }
//   })

//   player.handleInput(keys)
//   player.draw()
//   player.update()

//   c.save()
//   c.globalAlpha = overlay.opacity
//   c.fillStyle = 'black'
//   c.fillRect(0, 0, canvas.width, canvas.height)
//   c.restore()
// }



// Função para verificar colisão


levels[level].init()
animate()





// const player = new Player({
//   imageSrc: './img/king/idle.png',
//   frameRate: 11,
//   animations: {
//     idleRight: {
//       frameRate: 11,
//       frameBuffer: 2,
//       loop: true,
//       imageSrc: './img/king/idle.png',
//     },
//     idleLeft: {
//       frameRate: 11,
//       frameBuffer: 2,
//       loop: true,
//       imageSrc: './img/king/idleLeft.png',
//     },
//     runRight: {
//       frameRate: 8,
//       frameBuffer: 4,
//       loop: true,
//       imageSrc: './img/king/runRight.png',
//     },
//     runLeft: {
//       frameRate: 8,
//       frameBuffer: 4,
//       loop: true,
//       imageSrc: './img/king/runLeft.png',
//     },
//     enterDoor: {
//       frameRate: 8,
//       frameBuffer: 4,
//       loop: false,
//       imageSrc: './img/king/enterDoor.png',
//       onComplete: () => {
//         console.log('completed animation')
//         gsap.to(overlay, {
//           opacity: 1,
//           onComplete: () => {
//             level++

//             if (level === 4) level = 1
//             levels[level].init()
//             player.switchSprite('idleRight')
//             player.preventInput = false
//             gsap.to(overlay, {
//               opacity: 0,
//             })
//           },
//         })
//       },
//     },
//   },
// })