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
// 1 para mover para a direita, -1 para mover para a esquerda


const player = new Player({
  imageSrc: './img/cat/catRight.png',
  frameRate: 12,
  animations: {
    idleRight: {
      frameRate: 12,
      frameBuffer: 1,
      loop: false,
      imageSrc: './img/cat/catRight.png',
    },
  
    idleLeft: {
      frameRate: 12,
      frameBuffer: 1,
      loop: false,
      imageSrc: './img/cat/catLeft.png',
    },
    runRight: {
      frameRate: 12,
      frameBuffer: 1,
      loop: true,
      imageSrc: './img/cat/catRight.png',
    },
    runLeft: {
      frameRate: 12,
      frameBuffer: 1,
      loop: true,
      imageSrc: './img/cat/catLeft.png',
    },
    enterDoor: {
      frameRate: 6,
      frameBuffer: 6,
      loop: true,
      imageSrc: './img/cat/enterDoor1.png',
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

let level = 11

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
          imageSrc: './img/doors/doorTest1.png',
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
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 100,
          limit_right: 300
        }),

        new Sprite({
          position: {
            x: 700,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move:false
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
            x: 60.0,
            y: 430,
          },
          imageSrc: './img/doors/doorTest2.png',
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

      fires = [

        new Sprite({
          position: {
            x: 600,
            y: 240,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 100,
          limit_right: 300,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 300,
            y: 120,
          },
          imageSrc: './img/pagina/fire5.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 100,
          limit_right: 700,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 700,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
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
            x: 60,
            y: 440,
          },
          imageSrc: 'img/doors/doorTest2.png',
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
            x: 300,
            y: 160,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 600,
            y: 280,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 600,
          limit_right: 900,
          direction: 1
        }),

      ]


    },
  },
  4: {
    init: () => {
      parsedCollisions = collisionsLevel4.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 80
      player.position.y = 80
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
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
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
            x: 650,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 300,
            y: 220,
          },
          imageSrc: './img/pagina/fire5.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 100,
          limit_right: 400,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 80,
            y: 280,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 100,
          limit_right: 400,
          direction: 1
        }),
       
      ]


    },
  },
  5: {
    init: () => {
      parsedCollisions = collisionsLevel5.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 80
      player.position.y = 430
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
            x: 470,
            y: 115,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 890,
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
          x: 400,
          y: 430,
        },
        imageSrc: './img/pagina/fire5.png',
        frameRate: 7,
        frameBuffer: 8,
        loop: true,
        autoplay: true,
        move: true,
        limit_left: 200,
        limit_right: 500,
        direction: 1
      }),

      new Sprite({
        position: {
          x: 800,
          y: 250,
        },
        imageSrc: './img/pagina/fire4.png',
        frameRate: 6,
        frameBuffer: 8,
        loop: true,
        autoplay: true,
        move: true,
        limit_left: 100,
        limit_right: 800,
        direction: 1
      }),
      ]


    },
  },
  6: {
    init: () => {
      parsedCollisions = collisionsLevel6.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 80
      player.position.y = 80
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
            y: 435,
          },
          imageSrc: 'img/doors/doorTest2.png',
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
            x: 100,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

          new Sprite({
            position: {
              x: 880,
              y: 160,
            },
            imageSrc: './img/pagina/fire3.png',
            frameRate: 8,
            frameBuffer: 9,
            loop: true,
            autoplay: true,
            move: false
          }),

          new Sprite({
            position: {
              x: 180,
              y: 160,
            },
            imageSrc: './img/pagina/fire3.png',
            frameRate: 8,
            frameBuffer: 9,
            loop: true,
            autoplay: true,
            move: false
          }),

          new Sprite({
            position: {
              x: 400,
              y: 100,
            },
            imageSrc: './img/pagina/fire5.png',
            frameRate: 7,
            frameBuffer: 8,
            loop: true,
            autoplay: true,
            move: true,
            limit_left: 300,
            limit_right: 630,
            direction: 1
          }),
  
          new Sprite({
            position: {
              x: 80,
              y: 430,
            },
            imageSrc: './img/pagina/fire4.png',
            frameRate: 6,
            frameBuffer: 8,
            loop: true,
            autoplay: true,
            move: true,
            limit_left: 80,
            limit_right: 800,
            direction: 1
          }),


      ]


    },
  },
  7: {
    init: () => {
      parsedCollisions = collisionsLevel7.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 80
      player.position.y = 80
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
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
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
            x: 770,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 80,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 50,
            y: 230,
          },
          imageSrc: './img/pagina/fire5.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 260,
          direction: 1
        }),
      ]


    },
  },
  8: {
    init: () => {
      parsedCollisions = collisionsLevel8.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 880
      player.position.y = 440
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
            x: 55,
            y: 440,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 630,
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
            x: 750,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 200,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 80,
            y: 50,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 80,
          limit_right: 900,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 80,
            y: 115,
          },
          imageSrc: './img/pagina/fire5.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 80,
          limit_right: 900,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 80,
            y: 180,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 80,
          limit_right: 900,
          direction: 1
        }),

      ]


    },
  },
  9: {
    init: () => {
      parsedCollisions = collisionsLevel9.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 80
      player.position.y = 530
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
            x: 480,
            y: 165,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
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
            x: 700,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
        new Sprite({
          position: {
            x: 80,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 50,
            y: 150,
          },
          imageSrc: './img/pagina/fire4.png',
          frameRate: 6,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 400,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 900,
            y: 150,
          },
          imageSrc: './img/pagina/fire5.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 580,
          limit_right: 900,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 80,
            y: 80,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 80,
          limit_right: 800,
          direction: 1
        }),
      ]
    },
  },
  10: {
    init: () => {
      parsedCollisions = collisionsLevel10.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 850
      player.position.y = 530
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
            x: 60,
            y: 430,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
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
            x: 200,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 880,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
        new Sprite({
          position: {
            x: 80,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 50,
            y: 170,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 900,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 150,
          limit_right: 850,
          direction: 1
        }),


      ]


    },
  },

  11: {
    init: () => {
      parsedCollisions = collisionsLevel11.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks

      player.position.x = 200
      player.position.y = 200
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/11.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 60,
            y: 430,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
          loop: false,
          autoplay: false,
        }),
      ]
      computers = [
        new Sprite({
          position: {
            x: 350,
            y: 305,
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
            x: 800,
            y: 220,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: false,
          limit_left: 620,
          limit_right: 320,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 580,
            y: 220,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 100,
          limit_right: 400,
          direction: 1,
           eixo: "y"
        }),

        new Sprite({
          position: {
            x: 200,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 470,
            y: 280,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
      ]

      apagador = [
        new Sprite({
          position: {
            x: 850,
            y: 425,
          },
          imageSrc: './img/pagina/apagador.png',
          frameRate: 1,
          frameBuffer: 1,
          loop: false,
          autoplay: false,
         
        }),
      ]


    },
  },
  12: {
    init: () => {
      parsedCollisions = collisionsLevel12.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 850
      player.position.y = 530
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/12.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 60,
            y: 430,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
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
            x: 200,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 880,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
        new Sprite({
          position: {
            x: 80,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 50,
            y: 170,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 900,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 150,
          limit_right: 850,
          direction: 1
        }),


      ]


    },
  },

  13: {
    init: () => {
      parsedCollisions = collisionsLevel13.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 850
      player.position.y = 530
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/13.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 60,
            y: 430,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
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
            x: 200,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 880,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
        new Sprite({
          position: {
            x: 80,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 50,
            y: 170,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 900,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 150,
          limit_right: 850,
          direction: 1
        }),


      ]


    },
  },
  14: {
    init: () => {
      parsedCollisions = collisionsLevel14.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 850
      player.position.y = 530
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/14.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 60,
            y: 430,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
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
            x: 200,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 880,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
        new Sprite({
          position: {
            x: 80,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 50,
            y: 170,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 900,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 150,
          limit_right: 850,
          direction: 1
        }),


      ]


    },
  },
  15: {
    init: () => {
      parsedCollisions = collisionsLevel15.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 850
      player.position.y = 530
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/15.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 60,
            y: 430,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
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
            x: 200,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 880,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
        new Sprite({
          position: {
            x: 80,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 50,
            y: 170,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 900,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 150,
          limit_right: 850,
          direction: 1
        }),


      ]


    },
  },
  16: {
    init: () => {
      parsedCollisions = collisionsLevel16.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 850
      player.position.y = 530
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/16.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 60,
            y: 430,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
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
            x: 200,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 880,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
        new Sprite({
          position: {
            x: 80,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 50,
            y: 170,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 900,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 150,
          limit_right: 850,
          direction: 1
        }),


      ]


    },
  },
  17: {
    init: () => {
      parsedCollisions = collisionsLevel17.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 850
      player.position.y = 530
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: (canvas.width - backgroundImageWidth) / 2,  
          y: (canvas.height - backgroundImageHeight) / 2,  
 
        },
        imageSrc: './img/pagina/17.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 60,
            y: 430,
          },
          imageSrc: 'img/doors/doorTest2.png',
          frameRate: 6,
          frameBuffer: 6,
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
            x: 200,
            y: 420,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 880,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),
        new Sprite({
          position: {
            x: 80,
            y: 290,
          },
          imageSrc: './img/pagina/fire3.png',
          frameRate: 8,
          frameBuffer: 9,
          loop: true,
          autoplay: true,
          move: false
        }),

        new Sprite({
          position: {
            x: 50,
            y: 170,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 50,
          limit_right: 900,
          direction: 1
        }),

        new Sprite({
          position: {
            x: 150,
            y: 300,
          },
          imageSrc: './img/pagina/fire6.png',
          frameRate: 7,
          frameBuffer: 8,
          loop: true,
          autoplay: true,
          move: true,
          limit_left: 150,
          limit_right: 850,
          direction: 1
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


let popupShown = false;


function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  doors.forEach((door) => {
    door.draw();
  });

  player.update(); 
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

  isNearApagador = false;
  apagador.forEach((apagador) => {
    apagador.draw();
    if (isColliding(player, apagador)) {
      isNearApagador = true; // Define isNearApagador como true ao colidir com apagador
    }
  });
 
  if (ativadorFire) { // Desenha os fires apenas se estiverem ativos
    fires.forEach((fire) => {
      if (fire.eixo == "y" && fire.move === true) {
        fire.position.y += fireSpeed * fire.direction;
        if (fire.position.y > fire.limit_right) {
          fire.direction = -1;  
        } else if (fire.position.y < fire.limit_left) {
          fire.direction = 1;  
        }
      }
      if (fire.eixo == "x" && fire.move === true) {
        fire.position.x += fireSpeed * fire.direction;
        if (fire.position.x > fire.limit_right) {
          fire.direction = -1;  
        } else if (fire.position.x < fire.limit_left) {
          fire.direction = 1;  
        }
      }
      fire.draw();
    });
  }
  
  
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

