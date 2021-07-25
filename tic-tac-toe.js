const O = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/LetterO.svg/1200px-LetterO.svg.png)';
const X = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Letter_x.svg/1200px-Letter_x.svg.png)';

const player = (symbol, name) => {
    const tilesTaken = [];
    return {symbol,tilesTaken,name};
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

const gameController = (() =>{

    const turnTracker = document.getElementsByClassName('turn-tracker')[0];
    const player1 = player(X,'Player 1');
    const player2 = player(O, 'Player 2');
    this.currentPlayer = player1;

    const changeTurn = () => {
        if (currentPlayer == player1){
            currentPlayer = player2;
            turnTracker.textContent = "Player 2's turn";
        } else{
            currentPlayer = player1;
            turnTracker.textContent = "Player 1's turn";
        }
    }

    const PlayTurn = () => {

        gameBoard.getTiles().forEach(element => {
            element.addEventListener('click', (element) => {
                element.target.style.backgroundImage = this.currentPlayer.symbol;
                this.currentPlayer.tilesTaken.push(element.target);
                if(checkWin(this.currentPlayer.tilesTaken)){
                    winText = document.getElementsByClassName('win-text')[0];
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

    return {PlayTurn};
})();



gameController.PlayTurn();