//if player presses down, it make sure that the dropCounter goes back to zero so it doesnt double drop,
//basically reset back to 0

class Player {
  constructor(board) {
    this.board = board;
    this.piece = {
      pos: {
        x: 0,
        y: 0
      },
      matrix: null,
      score: 0
    };
  }


  playerDrop() {
    this.piece.pos.y++;
    if (this.board.collide(this.board.arena, this.piece)) {
      this.piece.pos.y--;
      this.board.merge(this.board.arena, this.piece); //updates board
      this.playerReset(); //gets new piece
      this.board.arenaSweep(); //checks to see if there are any rows that are filled up
      this.updateScore(); //updates score
    }
    this.dropCounter = 0;
  }



  playerMove(dir) {
    this.piece.pos.x += dir;
    if (this.board.collide(this.board.arena, this.piece)) {
      this.piece.pos.x -= dir;
    }
  }

  //resets the players current position to the top again and randomizes a new piece
  // if the top arena and the player piece collide then reset to fill all with 0, meaning blank
  // why doesnt it blank out on the sides or the top?
  playerReset() {
    const pieces = 'ILJOTSZ';
    this.piece.matrix = this.createPiece(pieces[pieces.length * Math.random() | 0]);
    console.log(this.piece.matrix);
    this.piece.pos.y = 0;
    this.piece.pos.x = (this.board.arena[0].length / 2 | 0) -
      (this.piece.matrix[0].length / 2 | 0);

    if (this.board.collide(this.board.arena, this.piece)) {
      this.board.arena.forEach(row => row.fill(0));
      this.piece.score = 0;
      this.updateScore;
    }
  }

  // function is used when player asks to rotate via keyboard, dir will be -1 or 1 depending which way of rotation
  // player.pos.x === current position of the piece via x direction
  //player.matrix is the dimensions of the piece, and dir is the -1 or 1
  // if it collides with the side walls then add the offset
  // if the offset to account for left or right,
  playerRotate(dir) {
    const pos = this.piece.pos.x;
    let offset = 1;
    this.rotate(this.piece.matrix, dir);
    while (this.board.collide(this.board.arena, this.player)) {
      this.player.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.player.matrix[0].length) {
        this.rotate(this.player.matrix, -dir);
        this.player.pos.x = pos;
        return;
      }
    }
  }



  rotate(matrix, dir) {
    for (let y = 0; y < this.piece.matrix.length; ++y) {
      for (let x = 0; x < y; x++) {
        [
          this.piece.matrix[x][y], this.piece.matrix[y][x]
        ] = [
          this.piece.matrix[y][x],
          this.piece.matrix[x][y]
        ];
      }
    }
    if (dir > 0) {
      this.piece.matrix.forEach(row => row.reverse());
    } else {
      this.piece.matrix.reverse();
    }
  }


  updateScore() {
    document.getElementById('score').innerText = this.piece.score;
  }



  //players initial starting spot, with the current static piece of T, which is matrix
  // const player = {
  //   pos: {
  //     x: 0,
  //     y: 0
  //   },
  //   matrix: null,
  //   score: 0
  // };

  createPiece(type) {
    if (type === 'T') {
      return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ];
    } else if (type === 'O') {
      return [
        [2, 2],
        [2, 2],

      ];
    } else if (type === 'L') {
      return [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ];
    } else if (type === 'J') {
      return [
        [0, 4, 0],
        [0, 4, 0],
        [4, 4, 0],
      ];
    } else if (type === 'I') {
      return [
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
      ];
    } else if (type === 'S') {
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0]
      ];
    } else if (type === 'Z') {
      return [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
      ];
    }
  }




  // draws the background and tile piece




  //pieces color


  // //Allows user to move the tile piece
  // document.addEventListener('keydown', event => {
  //       if (event.keyCode === 37) {
  //         playerMove(-1);

  //       } else if (event.keyCode === 39) {
  //         playerMove(1);
  //       } else if (event.keyCode === 40) {
  //         playerDrop();
  //       } else if (event.keyCode === 81) {
  //         playerRotate(-1);
  //       } else if (event.keyCode === 87) {
  //         playerRotate(1);
  //       }


}

export default Player;