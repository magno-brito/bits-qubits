class CollisionBlock {
  constructor({ position, movable = false }) {
    this.position = position;
    this.width = 64;
    this.height = 64;
    this.movable = movable;
    this.direction = 1;  // Direção do movimento
    this.limit_left = this.position.x - 100;  // Limite da esquerda
    this.limit_right = this.position.x + 100;  // Limite da direita
  }

  update() {
    if (this.movable) {
      this.position.x += this.direction * 2;  // Movimento horizontal
      if (this.position.x > this.limit_right || this.position.x < this.limit_left) {
        this.direction *= -1;  // Inverte a direção
      }
    }
  }

  draw() {
    // Desenhando o bloco
    c.fillStyle = 'rgba(255, 0, 0, 0.5)';  // Cor visível para teste
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
