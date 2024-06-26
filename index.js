let jugador1;
let jugador2;
let turno = 1;
let tablero = [[null,null,null],[null,null,null],[null,null,null]];

$(document).ready(function() {
    //FUNCIONES
    function checkWin(tablero) {
      
        for (let i = 0; i < 3; i++) {
            if (tablero[i][0] !== null && tablero[i][0] === tablero[i][1] && tablero[i][0] === tablero[i][2]) {

                if (tablero[i][0]=="X") {
                    showWinningPopup(jugador1);

                }else{  
                    showWinningPopup(jugador2);

                }
                return;
            }
        }

      
        for (let j = 0; j < 3; j++) {
            if (tablero[0][j] !== null && tablero[0][j] === tablero[1][j] && tablero[0][j] === tablero[2][j]) {
                if (tablero[0][j]=="X") {
                    showWinningPopup(jugador1);

                }else{  
                    showWinningPopup(jugador2);

                }
                return;
            }
        }

      
        if ((tablero[0][0] !== null && tablero[0][0] === tablero[1][1] && tablero[0][0] === tablero[2][2]) ||
            (tablero[0][2] !== null && tablero[0][2] === tablero[1][1] && tablero[0][2] === tablero[2][0])) {

            if (tablero[1][1]=="X") {
                showWinningPopup(jugador1);
            }else{  
                showWinningPopup(jugador2);
            }
            return;
        }

      
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
            showEmpatePopup();
            return;
        }
    }

    function showWinningPopup(winner) {

        $("#winerpopup").css("display", "flex");
        $("#mensaje").text("El jugador "+ winner + " ha ganado!");
    }
    function showEmpatePopup() {
        $("#felicitaciones").text("Oh no!")
        $("#winerpopup").css("display", "flex");
        $("#mensaje").text("Es un empate!");
    }
    function resetGame() {
        $(".imgcontainer").children('img').attr('src',"Imagenes/white.svg");
        $('#nombrespopup').css('display', 'flex');
        tablero = [[null,null,null],[null,null,null],[null,null,null]];
        turno = 1;
    }

    //Set pop up nombres
    $('#nombrespopup').css('display', 'flex');

    $('#start').click(function() {
        jugador1 = $('#jugador1').val();
        jugador2 = $('#jugador2').val();
        
        $('#j1').text(jugador1);
        $('#j2').text(jugador2);

       
        $('#nombrespopup').css('display', 'none');
    });

    //Juego

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

    //Restart

    $(".restartboton").click(function() {
        resetGame();
        $("#winerpopup").css("display", "none");
    });

    
});