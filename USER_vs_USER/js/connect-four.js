/**
 * Minimax (+Alpha-Beta) Implementation
 * @plain javascript version
 */
function Game() {
    this.rows = 6; // Height
    this.columns = 7; // Width
    this.status = 0; // 0: running, 1: won, 2: lost, 3: tie
    this.depth = 4; // Search depth
    this.score = 100000, // Win/loss score
    this.round = 0; // 0: Human, 1: Computer
    this.winning_array = []; // Winning (chips) array
    this.iterations = 0; // Iteration count


    that = this;

    that.init();
}

Game.prototype.init = function() {
    // Generate 'real' board
    // Create 2-dimensional array
    var game_board = new Array(that.rows);
    for (var i = 0; i < game_board.length; i++) {
        game_board[i] = new Array(that.columns);

        for (var j = 0; j < game_board[i].length; j++) {
            game_board[i][j] = null;
        }
    }

    // Create from board object (see board.js)
    this.board = new Board(this, game_board, 0);

    // Generate visual board
    var game_board = "";
    for (var i = 0; i < that.rows; i++) {
        game_board += "<tr>";
        for (var j = 0; j < that.columns; j++) {
            game_board += "<td class='empty'></td>";
        }
        game_board += "</tr>";
    }

    document.getElementById('game_board').innerHTML = game_board;

    // Action listeners
    var td = document.getElementById('game_board').getElementsByTagName("td");

    for (var i = 0; i < td.length; i++) {
        if (td[i].addEventListener) {
            td[i].addEventListener('click', that.act, false);
        } else if (td[i].attachEvent) {
            td[i].attachEvent('click', that.act)
        }
    }
}

/**
 * On-click event
 */
Game.prototype.act = function(e) {
    var element = e.target || window.event.srcElement;
    // Human round
    if (that.round == 0){
       that.place(element.cellIndex);
    }
    else {
      that.place(element.cellIndex);
    }

}
    var count1 = 0;
    var count2 = 0;

Game.prototype.place = function(column) {
    // If not finished

    if (that.board.score() != that.score && that.board.score() != -that.score && !that.board.isFull()) {
        for (var x = that.rows - 1; x >= 0; x--) {
            if (document.getElementById('game_board').rows[x].cells[column].className == 'empty') {
                if (that.round == 0) {
                    document.getElementById('game_board').rows[x].cells[column].className = 'coin cpu-coin';
                    count1++;

                } else {
                    document.getElementById('game_board').rows[x].cells[column].className = 'coin human-coin';
                    count2++;

                }
                break;

            }
        }

        if (!that.board.place(column)) {
            return alert("Invalid move!");
        }

        that.round = that.switchRound(that.round);
        document.getElementById('yellow-moves').innerHTML = 'No. moves: ' + count1;
        document.getElementById('red-moves').innerHTML = 'No. moves: ' + count2;
          document.getElementById('total-moves').innerHTML = 'Total Moves: ' + (count1 + count2);
        that.updateStatus();

    }
}


Game.prototype.switchRound = function(round) {
    // 0 Human, 1 Computer
    if (round == 0) {
        return 1;
    } else {
        return 0;
    }
}

Game.prototype.updateStatus = function() {
    // Human won
    if (that.board.score() == -that.score) {
        that.status = 1;
        that.markWin();
        alert("Yellow player won!");
    }

    // Computer won
    if (that.board.score() == that.score) {
        that.status = 2;
        that.markWin();
        alert("Red player won!");
    }

    // Tie
    if (that.board.isFull()) {
        that.status = 3;
        alert("Tie!");
    }

    var html = document.getElementById('status');
    if (that.status == 0) {
        html.className = "status-running";
        html.innerHTML = "running";
    } else if (that.status == 1) {
        html.className = "status-won";
        html.innerHTML = "Yellow player won";
    } else if (that.status == 2) {
        html.className = "status-lost";
        html.innerHTML = "Red player won";
    } else {
        html.className = "status-tie";
        html.innerHTML = "tie";
    }
}

Game.prototype.markWin = function() {
    document.getElementById('game_board').className = "finished";
    for (var i = 0; i < that.winning_array.length; i++) {
        var name = document.getElementById('game_board').rows[that.winning_array[i][0]].cells[that.winning_array[i][1]].className;
        document.getElementById('game_board').rows[that.winning_array[i][0]].cells[that.winning_array[i][1]].className = name + " win";
    }
}

Game.prototype.restartGame = function() {
    if (confirm('Game is going to be restarted.\nAre you sure?')) {

        that.status = 0;
        that.round = 0;
        that.init();
        document.getElementById('yellow-moves').innerHTML = "No. moves: ?";
        document.getElementById('red-moves').innerHTML = "No. moves: ?";
        document.getElementById('total-moves').innerHTML = "Total moves: ?";
        document.getElementById('game_board').className = "";
        that.updateStatus();
    }
}

/**
 * Start game
 */
function Start() {
    window.Game = new Game();
}

window.onload = function() {
    Start()
};
