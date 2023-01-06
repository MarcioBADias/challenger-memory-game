const grid = document.querySelector('.grid');
const players = document.querySelectorAll('.player');

const theme = localStorage.getItem('theme');
const gridSize = Number(localStorage.getItem('grid'));
const numberOfPlayers = Number(localStorage.getItem('players'));

let fistCard = '';
let secondCard = '';
let playerSelected = 0;



const iconsCards4x4 = [
    '01-icon',
    '02-icon',
    '03-icon',
    '04-icon',
    '05-icon',
    '06-icon',
    '07-icon',
    '08-icon'
]

const iconsCards6x6 = [
    '01-icon',
    '02-icon',
    '03-icon',
    '04-icon',
    '05-icon',
    '06-icon',
    '07-icon',
    '08-icon',
    '09-icon',
    '10-icon',
    '11-icon',
    '12-icon',
    '13-icon',
    '14-icon',
    '15-icon',
    '16-icon',
    '17-icon',
    '18-icon'
]

const numbersCards4x4 = [
    '01-number',
    '02-number',
    '03-number',
    '04-number',
    '05-number',
    '06-number',
    '07-number',
    '08-number'
];

const numbersCards6x6 = [
    '01-number',
    '02-number',
    '03-number',
    '04-number',
    '05-number',
    '06-number',
    '07-number',
    '08-number',
    '09-number',
    '10-number',
    '11-number',
    '12-number',
    '13-number',
    '14-number',
    '15-number',
    '16-number',
    '17-number',
    '18-number'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = (className);
    return element;
}

const createFinalScore = () => {
    const ul = createElement('ul', 'rank-final');
    const li = createElement('li', 'rank-player');

    let finalScores = [];

    const getFinalScores = player => {
        const namePlayer = player.getAttribute('data-player');
        const finalPlayerScore = player.querySelector('span').textContent;
        finalScores.push({'player': `${namePlayer}`,'score': `${finalPlayerScore}`});
    }

    players.forEach(getFinalScores);

    const orderingARank = (a,b)=>{
        if(a.score > b.score){
            return -1;
        }
        if(a.score < b.score){
            return 1;
        }
        return 0;
    }

    const finalScoresInOrder = finalScores.sort(orderingARank);

    const createARank = finalScore =>{
        li.textContent += ` ${finalScore.player}: ${finalScore.score} acertos`;
        ul.appendChild(li);
    }

    const showFinalRank = () => {
        grid.innerHTML = '';
        grid.style.display = 'block';
        grid.innerHTML = `<h3> Fim de jogo! Veja abaixo os resultados:</h3>`
        grid.appendChild(ul)
    }

    finalScoresInOrder.forEach(createARank);
    
    showFinalRank();
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    const endGame = disabledCards.length === gridSize*gridSize;

    endGame && createFinalScore();
}

const checkCards = () => {
    const fistIcon = fistCard.getAttribute('data-icon');
    const secondIcon = secondCard.getAttribute('data-icon');
    const isMacth = fistIcon === secondIcon;
    const isValidPlayer = playerSelected < numberOfPlayers-1;
    
    const scoring = () => {
        spanScore = players[playerSelected].querySelector('span');
        spanScore.textContent++;
    }

    const foundedCard = element => element.firstChild.classList.add('disabled-card');
    const hideCard = element => element.classList.remove('reveal-card');
    
    const resetfoundedCards = () => {
        fistCard = '';
        secondCard = '';
    }

    const passTurn = element => element.classList.remove('active');
    const activeTurn = element => element.classList.add('active')

    if(isMacth){
        foundedCard(fistCard);
        foundedCard(secondCard);
        
        scoring();

        resetfoundedCards();

        checkEndGame();
    } else {
        setTimeout(()=>{
            hideCard(fistCard);
            hideCard(secondCard);
            
            if(isValidPlayer){
                passTurn(players[playerSelected]);
                playerSelected++;
                activeTurn(players[playerSelected]);
                
            }else {
                passTurn(players[playerSelected]);
                playerSelected = 0;
                activeTurn(players[playerSelected]);
            }
            
            resetfoundedCards();

        }, 600)
    }
}

const revealCard = ({ target }) => {
    const clickedCard = target.parentNode;
    const isARevealedCard = clickedCard.className.includes('reveal-card');
    const fistCardIsClosed = fistCard === '';
    const secondCardIsClosed = secondCard === '';

    const showCard = element => element.classList.add('reveal-card');

    if(isARevealedCard){
        return;
    }

    if(fistCardIsClosed){
        showCard(clickedCard);
        fistCard = clickedCard;
    } else if (secondCardIsClosed){
        showCard(clickedCard);
        secondCard = clickedCard;
    }

    checkCards(numberOfPlayers);
}

const createCard = (iconCard) => {
    const card = createElement('div','card');
    const faceFront = createElement('div','face front');
    const faceBack = createElement('div','face back');

    const changingPlayer = (player, index) => {
        if(index +1 <= numberOfPlayers){
            player.classList.remove('disabled-player');
        }
    }

    faceFront.style.backgroundImage = `url(../img/icons/${iconCard}.png)`;

    card.appendChild(faceFront);
    card.appendChild(faceBack);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-icon', iconCard);

    players.forEach(changingPlayer)
    players[playerSelected].classList.add('active');
    
    return card;
}

const openGame = (deck = []) => {
    const duplicateCards = [ ...deck, ...deck ];
    const shuffledCards = duplicateCards.sort(() => Math.random() - 0.5)
    const drawRandomCard = iconCard => {
        const card = createCard(iconCard);
        grid.appendChild(card);
    }
    shuffledCards.forEach(drawRandomCard)
}

const setThemeAndGrid = (theme, gridSize) => {
    if(theme === 'number'){
        gridSize === 4 && openGame(numbersCards4x4);
        gridSize === 6 && openGame(numbersCards6x6);
        return
    }
    if(theme === 'icon'){
        gridSize === 4 && openGame(iconsCards4x4);
        gridSize === 6 && openGame(iconsCards6x6);    
        return
    }
}

const loadGame = () => {
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; //Aplica o tamanho do grid
    setThemeAndGrid(theme, gridSize);
    players[0].classList.remove('disabled-player'); //ativa o player 1
    
}

loadGame();

