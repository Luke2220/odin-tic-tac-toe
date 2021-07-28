const O = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/LetterO.svg/1200px-LetterO.svg.png)';
const X = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Letter_x.svg/1200px-Letter_x.svg.png)';

document.getElementsByClassName('new-1player')[0].addEventListener('click', () => {gameController.newGame(true)});
document.getElementsByClassName('new-2player')[0].addEventListener('click', () => {gameController.newGame(false)});

const player = (symbol, name) => {
    const ourTiles = [];
    let isComputer = false;
    return {symbol,ourTiles,name, isComputer};
};

const tile = (div) => {
    this.isTaken = false;
    const tileDiv = div;

    const reset = () =>{ 
        this.isTaken = false;
        tileDiv.style.backgroundImage = 'none';
    }

    return {isTaken, tileDiv,reset};
}

const gameBoard = (() => {
    const tiles = document.getElementsByClassName('tile');
    
    const getTiles = () => {
        a = [];
        for (let i = 0;i < tiles.length;i++)
        {
            newTile = tile(tiles.item(i));
            console.log(newTile);
            a.push(newTile);
        }
        return a;
    }
    const tileBoard = getTiles();
    const setTile = (tile, symbol) => {
        if (tile.isTaken == false){
            tile.tileDiv.style.backgroundImage = symbol;
            tile.isTaken = true;
        } else{
            return false;
        }
    }

    const freezeBoard = () => {
        tileBoard.forEach(element =>{
            element.isTaken = true;
        })
    }

    return {tileBoard, setTile, freezeBoard};
})();

const computerPlayer = (() =>{
    const getRandomNum = () =>{
        return Math.round(Math.random() * 8);
    }

    const pickTile = (playerAi,safety) => {
        if (safety == 10){console.log('could not find tile'); return;}
        let tile = gameBoard.tileBoard[getRandomNum()];
        if (tile.isTaken == false)
        {
            gameBoard.setTile(tile,playerAi.symbol);
            playerAi.ourTiles.push(tile);
        }
        else{
            pickTile(playerAi, safety+1);
        }
    }
    return {pickTile};
})()

const gameController = (() =>{

    const turnTracker = document.getElementsByClassName('turn-tracker')[0];
    const winText = document.getElementsByClassName('win-text')[0];
    const player1 = player(X,'Player 1');
    const player2 = player(O, 'Player 2');
    this.currentPlayer = player1;

    const newGame = (computerOpponent) =>{
        gameBoard.tileBoard.forEach(element => {
            element.isTaken = false;
            element.reset();
        })
        player1.ourTiles = [];
        player2.ourTiles = [];
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
            if (player2.isComputer == true){
                computerPlayer.pickTile(player2,0);
            } else {
                currentPlayer = player2;
                turnTracker.textContent = "Player 2's turn";
            }
        } else{
            currentPlayer = player1;
            turnTracker.textContent = "Player 1's turn";
        }
    }

    const playGame = () => {

        gameBoard.tileBoard.forEach(element => {
            element.tileDiv.addEventListener('click', () => {
                if (gameBoard.setTile(element, this.currentPlayer.symbol) != false){
                    this.currentPlayer.ourTiles.push(element);
                    if(checkWin(this.currentPlayer.ourTiles)){           
                        winText.textContent = `${this.currentPlayer.name} won!`;
                        winText.style.opacity = 1;
                        gameBoard.freezeBoard();
                    }
                    changeTurn();
                }else{
                    console.log('Tile Taken');
                }
            })
        });
    }

    const checkWin = (playersTiles) =>{
        let ourTiles = '';
        playersTiles.forEach(element => {
            ourTiles = ourTiles.concat(element.tileDiv.className);
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