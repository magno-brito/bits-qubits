class CollisionBlock {
  constructor({ position, movable = false, image }) {
    this.position = position;
    this.width = 64;
    this.height = 64;
    this.movable = movable;
    this.direction = 1;  // Direção do movimento
    this.limit_left = this.position.x - 100;  // Limite da esquerda
    this.limit_right = this.position.x + 100;  // Limite da direita
    this.image = image
  }

  update() {
    if (this.movable) {
      this.position.x += this.direction * 2;  // Movimento horizontal
  
      // Expande o alcance de movimento aumentando os limites
      if (this.position.x > this.limit_right + 100 || this.position.x < this.limit_left - 100) {
        this.direction *= -1;  // Inverte a direção ao atingir os limites ajustados
      }
    }
  }
  
  draw(ctx) {
    // Verifica se a imagem existe antes de tentar desenhá-la
    if (this.image) {
      ctx.drawImage(this.image, this.position.x, this.position.y, 64, 64);
    } else {
      console.log("Imagem não carregada corretamente."); // Debug
       ctx.fillStyle = "blue"; 
      ctx.fillRect(this.position.x, this.position.y, 64, 64);
    }
  }
}
