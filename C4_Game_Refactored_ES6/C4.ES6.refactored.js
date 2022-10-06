class Game {
  constructor() {
    this.width = 7;
    this.height = 6;
    this.currPlayer = 1;
    this.board = [];
    this.makeBoard();
    this.makeHtmlBoard();
  }
  //Make Board
  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      // console.log(this.board);
      this.board.push(Array.from({ length: this.width }));
    }
  }

  //
  makeHtmlBoard() {
    const board = document.getElementById("board");
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", (evt) => {
      this.handleClick(evt);
    });

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement("td");
      headCell.innerText = "Click";
      headCell.classList.add("top-text");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }
    board.append(top);

    for (let y = 0; y < this.height; y++) {
      const row = document.createElement("tr");
      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }
      board.append(row);
    }
  }

  //
  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  //original

  //
  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.classList.add(`p${this.currPlayer}`);
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  //
  endGame(msg) {
    alert(msg);
  }

  //

  handleClick(evt) {
    const x = +evt.target.id;
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // Place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // If there is a winner, announce there is a win and who the winner is
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer} won!`);
    }

    // If there is a tie, announce there is a tie
    if (this.board.every((row) => row.every((cell) => cell))) {
      return this.endGame("Tie!");
    }

    //Sets the current player (if current player is player 1, set currPlayer to 2.  Otherwise, currPlayer is 1)
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }

  //

  checkForWin() {
    const _win = (cells) => {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );
    };

    //Set up win scenarios to be checked when player plays their turn (adds a chip to the HTML board)
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

//Instance of class Game
const connectFour = new Game();
