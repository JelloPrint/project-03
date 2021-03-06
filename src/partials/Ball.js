import { SVG_NS } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/pong-01.wav');
    this.goalPlayer1 = new Audio('public/sounds/blueteamscore.mp3');
    this.goalPlayer2 = new Audio('public/sounds/redteamscore.mp3');
    this.gameOver = new Audio('public/sounds/gameover.mp3');
    this.reset();
  }

  reset() {
    this.x = this.boardWidth /2;
    this.y = this.boardHeight /2;
    this.vy = 0;

    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
      
      this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision(player1, player2) {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if(hitLeft) {
      this.goal(player2);
      player1.height += 2.5;
      this.direction = -1;
      this.goalPlayer2.play();

    } else if (hitRight) {
      this.goal(player1);
      player2.height += 2.5;
      this.goalPlayer1.play();

    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision(player1, player2) {
    if (this.vx > 0) {

      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x + this.radius >= leftX
        && this.y >= topY
        && this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }

    } else {
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
      let [leftX, rightX, topY, bottomY] = paddle;
      
      if (
        this.x - this.radius <= rightX
        && this.y >= topY
        && this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
    }
  }
  goal(player) {
    player.score++;
    player.height -= 5;
    this.reset();

  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision(player1, player2);
    this.paddleCollision(player1, player2);

    let ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    ball.setAttributeNS(null, 'fill', '#000000');
    svg.appendChild(ball);
  }

}