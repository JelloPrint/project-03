import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {

	constructor(element, width, height) {
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(element);

		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.boardGap = 10;
		this.radius = 8;


		this.board = new Board(this.width, this.height);
		this.player1 = new Paddle (
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			(this.height - this.paddleHeight) / 2,
			KEYS.a,
			KEYS.z,
			'blue',
			// this.score
		);

		this.player2 = new Paddle (
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.width - this.boardGap - this.paddleWidth,
			(this.height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down,
			'red',
			// this.score
		);

		this.ball = new Ball (
			this.radius,
			this.width,
			this.height
		);

		this.score1 = new Score (
			this.width / 2 - 50, 30, 30
		);

		this.score2 = new Score (
			this.width / 2 + 30, 30, 30
		);


		document.addEventListener('keydown', event => {
			switch (event.key) {
				case KEYS.spaceBar:
					this.pause = !this.pause;
					break;
			}
		});

		document.addEventListener('keydown', event => {
			switch (event.key) {
				case KEYS.r:
					location.reload();
					break;
			}
		});
	}

// 	Working on creating alert when one player's score reaches 5 points as well play sound effect
//
//	 victory(player1, player2) {
//       const blueVictory = this.score(player1) = 5;
//       const redVictory = this.score(player2) = 5;

//       if(blueVictory) {
//         !this.pause;
//         window.alert("Blue Player Wins! Please press 'r' to restart");
//         this.gameOver.play();

//     } else if (redVictory) {
//        !this.pause;
//         window.alert("Red Player Wins! Please press 'r' to restart");
//         this.gameOver.play();
//     }
//   }

	render() {

		if (this.pause) {
			return;
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'version', '1.1');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);


		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball.render(svg, this.player1, this.player2); 
		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);
	}

}
