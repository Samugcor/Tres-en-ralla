$(document).ready(function() {

    $('#nombrespopup').css('display', 'flex');

    $('#start').click(function() {
        let jugador1 = $('#jugador1').val();
        let jugador2 = $('#jugador2').val();

        $('#j1').text(jugador1);
        $('#j2').text(jugador2);

        // Hide the name input modal
        $('#nombrespopup').css('display', 'none');
    });

    let tablero = [[null,null,null],[null,null,null],[null,null,null]];
    let turno = 0;

    $(".imgcontainer").click(function() {
        if ($(this).children('img').attr('src') === 'Imagenes/white.svg') {
            let index = $(this).index();

            let rowIndex = Math.floor(index / 3);
            let cellIndex = index % 3;

            if (turno % 2 !== 0) {
                $(this).children('img').attr('src',"Imagenes/x.svg");
                tablero[rowIndex][cellIndex] = 'X';
            } else {
                $(this).children('img').attr('src',"Imagenes/circle.svg");
                tablero[rowIndex][cellIndex] = 'O';
            }

            turno++;
            setTimeout(function() {
                checkWin(tablero);
            }, 100);
        }
    });

    function checkWin(tablero) {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (tablero[i][0] !== null && tablero[i][0] === tablero[i][1] && tablero[i][0] === tablero[i][2]) {
                alert(tablero[i][0] + " wins!");
                resetGame();
                return;
            }
        }

        // Check columns
        for (let j = 0; j < 3; j++) {
            if (tablero[0][j] !== null && tablero[0][j] === tablero[1][j] && tablero[0][j] === tablero[2][j]) {
                alert(tablero[0][j] + " wins!");
                resetGame();
                return;
            }
        }

        // Check diagonals
        if ((tablero[0][0] !== null && tablero[0][0] === tablero[1][1] && tablero[0][0] === tablero[2][2]) ||
            (tablero[0][2] !== null && tablero[0][2] === tablero[1][1] && tablero[0][2] === tablero[2][0])) {
            alert(tablero[1][1] + " wins!");
            resetGame();
            return;
        }

        // Check for draw
        let draw = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tablero[i][j] === null) {
                    draw = false;
                    break;
                }
            }
            if (!draw) break;
        }
        if (draw) {
            alert("It's a draw!");
            resetGame();
            return;
        }
    }

    function showWinningPopup(winner) {
        $("#mensaje").text("El jugador"+ winner + " ha ganado!");
        $("#backgroundmensaje").css("display", "flex");
    }

    // Close the popup when the user clicks on the close button
    $(".restartboton").click(function() {
        $("#backgroundmensaje").css("display", "none");
    });

    function resetGame() {
        $(".imgcontainer").children('img').attr('src',"Imagenes/white.svg");
        tablero = [[null,null,null],[null,null,null],[null,null,null]];
        turno = 0;
    }
});