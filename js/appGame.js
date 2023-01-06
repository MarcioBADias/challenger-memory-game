const grid = document.querySelector('.grid');
const players = document.querySelectorAll('.player');

const theme = localStorage.getItem('theme');
const gridSize = Number(localStorage.getItem('grid'));
const numberOfPlayers = Number(localStorage.getItem('players'));

let fistCard = '';
let secondCard = '';
let playerSelected = 0;

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

createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = (className);
    return element;
}


const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    
    if(disabledCards.length === 16){
        const ul = createElement('ul', 'rank-final');
        const li = createElement('li', 'rank-player');
        let finalScores = [];
        players.forEach(player => {
            const namePlayer = player.getAttribute('data-player');
            const finalPlayerScore = player.querySelector('span').textContent;
            finalScores.push({'player': `${namePlayer}`,'score': `${finalPlayerScore}`});
        })
        const finalScoresInOrder = finalScores.sort((a,b)=>{
            if(a.score > b.score){
                return -1;
            }
            if(a.score < b.score){
                return 1;
            }
            return 0;
        })

        finalScoresInOrder.forEach(finalScore =>{
            li.textContent += ` ${finalScore.player}: ${finalScore.score} acertos`;
            ul.appendChild(li);
        });
        grid.innerHTML = '';
        grid.style.display = 'block';
        grid.innerHTML = `<h3> Fim de jogo! Veja abaixo os resultados:</h3>`
        grid.appendChild(ul);
        
    }
}

const checkCards = () => {
    const fistIcon = fistCard.getAttribute('data-icon');
    const secondIcon = secondCard.getAttribute('data-icon');

    if(fistIcon === secondIcon){
        fistCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        
        spanScore = players[playerSelected].querySelector('span');

        spanScore.textContent++;

        fistCard = '';
        secondCard = '';

        checkEndGame();
    } else {

        setTimeout(()=>{
            fistCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            
            if(playerSelected < numberOfPlayers-1){
                players[playerSelected].classList.remove('active');
                playerSelected++;
                players[playerSelected].classList.add('active');
                
            }else {
                players[playerSelected].classList.remove('active');
                playerSelected = 0;
                players[playerSelected].classList.add('active');
            }
            fistCard = '';
            secondCard = '';
        }, 600)
    }
}


const revealCard = ({ target }) => {
    const clickedCard = target.parentNode;

    if(clickedCard.className.includes('reveal-card')){
        return;
    }

    if(fistCard === ''){
        clickedCard.classList.add('reveal-card');
        fistCard = clickedCard;
    } else if (secondCard === ''){
        clickedCard.classList.add('reveal-card');
        secondCard = clickedCard;
    }

    checkCards(numberOfPlayers);
}

const createCard = (iconCard) => {
    const card = createElement('div','card');
    const faceFront = createElement('div','face front');
    const faceBack = createElement('div','face back');

    faceFront.style.backgroundImage = `url(../img/icons/${iconCard}.png)`;

    card.appendChild(faceFront);
    card.appendChild(faceBack);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-icon', iconCard);

    players.forEach((player, index) => {
        if(index +1 <= numberOfPlayers){
            player.classList.remove('disabled-player');
        }
    })
    players[playerSelected].classList.add('active');
    
    return card;
}

const openGame = (deck = []) => {
    const duplicateIconCards = [ ...deck, ...deck ];
    const shuffledIconCards = duplicateIconCards.sort(() => Math.random() - 0.5)

    shuffledIconCards.forEach(iconCard => {
        const card = createCard(iconCard);
        grid.appendChild(card);
    })
}

const loadGame = () => {
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    gridSize === 4 && openGame(iconsCards4x4);
    gridSize === 6 && openGame(iconsCards6x6);    

    players[0].classList.remove('disabled-player');
    console.log(gridSize)
}

window.onload = () => {
    loadGame();
}
