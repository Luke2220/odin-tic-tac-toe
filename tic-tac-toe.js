const O = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/LetterO.svg/1200px-LetterO.svg.png)';
const X = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Letter_x.svg/1200px-Letter_x.svg.png)';

document.getElementsByClassName('new-1player')[0].addEventListener('click', () => {gameController.newGame()});
document.getElementsByClassName('new-2player')[0].addEventListener('click', () => {gameController.newGame()});

const player = (symbol, name) => {
    const tilesTaken = [];
    let isComputer = false;
    return {symbol,tilesTaken,name, isComputer};
};

const gameBoard = (() => {
    const tiles = document.getElementsByClassName('tile');
    
    const getTiles = () => {
        a = [];
        for (let i = 0;i < tiles.length;i++)
        {
            a.push(tiles.item(i));
        }
        return a;
    }

    return {getTiles};
})();

const computerPlayer = (() =>{
    const getRandomTile = () =>{
        Math.random() * (9 - 1) + 1;
    }

    const pickTile = () => {
        gameBoard.getTiles()[getRandomTile()].style.backgroundImage = player.symbol;
    }

})()

const gameController = (() =>{

    const turnTracker = document.getElementsByClassName('turn-tracker')[0];
    const winText = document.getElementsByClassName('win-text')[0];
    const player1 = player(X,'Player 1');
    const player2 = player(O, 'Player 2');
    this.currentPlayer = player1;

    const newGame = (computerOpponent) =>{
        gameBoard.getTiles().forEach(element => {
            element.style.backgroundImage = 'none';
        })
        player1.tilesTaken = [];
        player2.tilesTaken = [];
        winText.style.opacity = 0;
        turnTracker.textContent = "Player 1's turn"
        this.currentPlayer = player1;

        if (computerOpponent == true){
            player2.isComputer = true;
        } else{
            player2.isComputer = false;
        }
    }

    const changeTurn = () => {
        if (currentPlayer == player1){
            currentPlayer = player2;
            turnTracker.textContent = "Player 2's turn";
            if (player2.isComputer == true){
                
            }
        } else{
            currentPlayer = player1;
            turnTracker.textContent = "Player 1's turn";
        }
    }

    const playGame = () => {

        gameBoard.getTiles().forEach(element => {
            element.addEventListener('click', (element) => {
                element.target.style.backgroundImage = this.currentPlayer.symbol;
                this.currentPlayer.tilesTaken.push(element.target);
                if(checkWin(this.currentPlayer.tilesTaken)){           
                    winText.textContent = `${this.currentPlayer.name} won!`;
                    winText.style.opacity = 1;
                }
                changeTurn();
            })
        });
    }

    const checkWin = (playersTiles) =>{
        let ourTiles = '';
        playersTiles.forEach(element => {
            ourTiles = ourTiles.concat(element.className);
        })

        if (ourTiles.includes('t1') && ourTiles.includes('t2') &&  ourTiles.includes('t3')){
            return true
        } 
        else if (ourTiles.includes('t4') && ourTiles.includes('t5') &&  ourTiles.includes('t6')){
            return true
        }
        else if (ourTiles.includes('t4') && ourTiles.includes('t5') &&  ourTiles.includes('t6')){
            return true; 
        }
        else if (ourTiles.includes('t7') && ourTiles.includes('t8') &&  ourTiles.includes('t9')){
            return true; 
        }
        else if (ourTiles.includes('t1') && ourTiles.includes('t4') &&  ourTiles.includes('t7')){
            return true; 
        }
        else if (ourTiles.includes('t2') && ourTiles.includes('t5') &&  ourTiles.includes('t8')){
            return true; 
        }
        else if (ourTiles.includes('t3') && ourTiles.includes('t6') &&  ourTiles.includes('t9')){
            return true; 
        }
        else if (ourTiles.includes('t3') && ourTiles.includes('t5') &&  ourTiles.includes('t7')){
            return true; 
        }
        else if (ourTiles.includes('t1') && ourTiles.includes('t5') &&  ourTiles.includes('t9')){
            return true; 
        } else{
            return false; 

        }

    }

    return {playGame, newGame};
})();



gameController.playGame();