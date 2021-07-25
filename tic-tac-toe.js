const O = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/LetterO.svg/1200px-LetterO.svg.png)';
const X = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Letter_x.svg/1200px-Letter_x.svg.png)';

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

})();

const player = (symbol) => {
    let playerSymbol = symbol;
    return {symbol};
};


gameBoard.getTiles().forEach(element => {
    element.addEventListener('click', (element, gameController.currentPlayer) => {
        element.target.style.backgroundImage = currentPlayer.playerSymbol;
    })
});