const O = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/LetterO.svg/1200px-LetterO.svg.png)';
const X = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Letter_x.svg/1200px-Letter_x.svg.png)';

const player = (symbol) => {
    const tilesTaken = [];
    return {symbol,tilesTaken};
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

    const player1 = player(X);
    const player2 = player(O);
    this.currentPlayer = player1;

    const changeTurn = () => {
        if (currentPlayer == player1){
            currentPlayer = player2;
        } else{
            currentPlayer = player1;
        }
    }

    const PlayTurn = () => {

        gameBoard.getTiles().forEach(element => {
            element.addEventListener('click', (element) => {
                element.target.style.backgroundImage = this.currentPlayer.symbol;
                this.currentPlayer.tilesTaken.push(element.target);
                console.log('Have we won: ', checkWin(this.currentPlayer.tilesTaken));
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