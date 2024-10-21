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
let fires
let fireSpeed = 2; 
let fireDirection = 1; // 1 para mover para a direita, -1 para mover para a esquerda


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
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/king/enterDoor1.png',
      position: {
        x: 176.0, // Ajuste conforme necessário
        y: 410,   // Ajuste conforme necessário
      },
      onComplete: () => {
        console.log('completed animation');
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++;
            if (level === 11) level = 1;
            levels[level].init();
            player.switchSprite('idleRight');
            player.preventInput = false;
            gsap.to(overlay, { opacity: 0 });
          },
        });
      },
    },
  },
})

let level = 4
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
            x: 870,
            y: 430,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 12,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]

      computers = [
        new Sprite({
          position: {
            x: 100,
            y: 445,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      fires = [
        new Sprite({
          position: {
            x: 600,
            y: 240,
          },
          imageSrc: './img/pagina/fire2.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
        })
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
            x: 60.0,
            y: 430,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 12,
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

      fires = [
        new Sprite({
          position: {
            x: 800,
            y: 240,
          },
          imageSrc: './img/pagina/fire.png',
          frameRate: 13,
          frameBuffer: 10,
          loop: true,
          autoplay: true,
        })
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
            x: 50.0,
            y: 420,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 12,
          frameBuffer: 4,
          loop: false,
          autoplay: false,
        }),
      ]

      computers = [
        new Sprite({
          position: {
            x: 100,
            y: 185,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      fires = [
        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire.png',
          frameRate: 13,
          frameBuffer: 10,
          loop: true,
          autoplay: true,
        })
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
            x: 860,
            y: 180,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 12,
          frameBuffer: 4,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 865,
            y: 445,
          },
          imageSrc: './img/pagina/computer.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      fires = [
        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire.png',
          frameRate: 13,
          frameBuffer: 10,
          loop: true,
          autoplay: true,
        })
      ]


    },
  },
  5: {
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
        imageSrc: './img/pagina/5.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 176.0,
            y: 430,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 12,
          frameBuffer: 4,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 100,
            y: 185,
          },
          imageSrc: './img/pagina/computer.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      fires = [
        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire.png',
          frameRate: 13,
          frameBuffer: 10,
          loop: true,
          autoplay: true,
        })
      ]


    },
  },
  6: {
    init: () => {
      parsedCollisions = collisionsLevel6.parse2D()
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
        imageSrc: './img/pagina/6.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 870,
            y: 440,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 12,
          frameBuffer: 4,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 100,
            y: 185,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      fires = [
        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire.png',
          frameRate: 13,
          frameBuffer: 10,
          loop: true,
          autoplay: true,
        })
      ]


    },
  },
  7: {
    init: () => {
      parsedCollisions = collisionsLevel7.parse2D()
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
        imageSrc: './img/pagina/7.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 380,
            y: 430,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 12,
          frameBuffer: 4,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 500,
            y: 440,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      fires = [
        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire.png',
          frameRate: 13,
          frameBuffer: 10,
          loop: true,
          autoplay: true,
        })
      ]


    },
  },
  8: {
    init: () => {
      parsedCollisions = collisionsLevel8.parse2D()
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
        imageSrc: './img/pagina/8.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 255,
            y: 430,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 12,
          frameBuffer: 4,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 650,
            y: 440,
          },
          imageSrc: './img/pagina/computer.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      fires = [
        new Sprite({
          position: {
            x: 50,
            y: 50,
          },
          imageSrc: './img/pagina/fire.png',
          frameRate: 13,
          frameBuffer: 10,
          loop: true,
          autoplay: true,
        })
      ]


    },
  },
  9: {
    init: () => {
      parsedCollisions = collisionsLevel9.parse2D()
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
        imageSrc: './img/pagina/9.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 470,
            y: 155,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 12,
          frameBuffer: 4,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 880,
            y: 445,
          },
          imageSrc: './img/pagina/computer.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      fires = [
        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire.png',
          frameRate: 13,
          frameBuffer: 10,
          loop: true,
          autoplay: true,
        })
      ]


    },
  },
  10: {
    init: () => {
      parsedCollisions = collisionsLevel10.parse2D()
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
        imageSrc: './img/pagina/10.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 460,
            y: 180,
          },
          imageSrc: './img/doorOpen1.png',
          frameRate: 12,
          frameBuffer: 4,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 50,
            y: 50,
          },
          imageSrc: './img/pagina/computer1.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
        }),
      ]

      fires = [
        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire.png',
          frameRate: 13,
          frameBuffer: 10,
          loop: true,
          autoplay: true,
        })
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


let popupShown = false;


function animate() {
  window.requestAnimationFrame(animate);

  background.draw();

  doors.forEach((door) => {
    
    door.draw();
  });

  player.update(); // Mova a atualização do player para antes da verificação de colisão

  // Atualiza a hitbox do player
  player.updateHitbox()

  isNearComputer = false;
  computers.forEach((computer) => {
    computer.draw();

    if (isColliding(player, computer)) {
      isNearComputer = true;
      
    }
  });

  if (!isNearComputer) {
    popupShown = false;
  }

 
  fires.forEach((fire) => {
    // Atualiza a posição do fire com base na direção e velocidade
    fire.position.x += fireSpeed * fireDirection;
    console.log(fire.position.x)
    console.log(fire.width)
    console.log(canvas.width)
    console.log(fireDirection)
    // Verifica os limites do canvas e inverte a direção se necessário
    if (fire.position.x > 512) {
      fireDirection = -1
    }
    else if(fire.position.x < 20){
      fireDirection = 1
    }
    // Desenha o fire na nova posição
    fire.draw();
  });

  // Verifica colisão entre o player e o fire
  checkPlayerFireCollision();

  player.handleInput(keys);
  player.draw();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

levels[level].init()
animate()

