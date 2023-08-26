class TicTacToe {
    constructor() {
        this.resetGame();
    }

    resetGame() {
        this.board = [
            ["-", "-", "-"],
            ["-", "-", "-"],
            ["-", "-", "-"]
        ];
        this.currentPlayer = "X"; 
    }

    printBoard() {
        return "```\n" + this.board.map(row => row.join(' | ')).join('\n') + "\n```";
    }

    checkWin() {
        for (let row of this.board) {
            if (row[0] === row[1] && row[1] === row[2] && row[0] !== "-") return true;
        }

        for (let col = 0; col < 3; col++) {
            if (this.board[0][col] === this.board[1][col] && this.board[1][col] === this.board[2][col] && this.board[0][col] !== "-") return true;
        }

        if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] && this.board[0][0] !== "-") return true;
        if (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0] && this.board[0][2] !== "-") return true;

        // Check for draw (board is full)
        if (this.board.every(row => row.every(cell => cell !== "-"))) return "Draw";

        return false;
    }

    makeMove(col, row) {
        if (row >= 0 && row < 3 && col >= 0 && col < 3 && this.board[row][col] === "-") {
            this.board[row][col] = this.currentPlayer;

            const check = this.checkWin();
            if (check === true) {
                return `YOU win!`;
            } else if (check === "Draw") {
                return "Draw!";
            }

            this.switchPlayer();
            return this.printBoard();
        } else {
            return "Invalid move!";
        }
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }

    botMove() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] === "-") {
                    this.board[i][j] = this.currentPlayer;

                    const check = this.checkWin();
                    if (check === true) {
                        return `Bot wins!`;
                    } else if (check === "Draw") {
                        return "Draw!";
                    }

                    this.switchPlayer();
                    return `Bot move: ${i} ${j}` + this.printBoard();
                }
            }
        }
    }

    displayHelp() {
        return `
        **Tic Tac Toe Help Menu**
        
        - **!start** : Start a new game of Tic Tac Toe.
        - **!move [row] [col]** : Make a move at the specified row and column.
              (e.g. \`!move 0 1\` to put your piece in the first row, second column)
        - **!help** : Display this help menu.
            `;
    }
}

module.exports = TicTacToe;