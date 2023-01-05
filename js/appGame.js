const grid = document.querySelector('.grid');
const players = document.querySelectorAll('.player');

let fistCard = '';
let secondCard = '';

players.forEach(player => player.textContent += ' X acertos')

const iconsCards = [
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
    '16-icon'
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
        window.alert(`O Jogo Acabou!`);
    }
}

const checkCards = () => {
    const fistIcon = fistCard.getAttribute('data-icon');
    const secondIcon = secondCard.getAttribute('data-icon');

    if(fistIcon === secondIcon){
        fistCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        
        fistCard = '';
        secondCard = '';

        checkEndGame();
    } else {

        setTimeout(()=>{
            fistCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
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

    checkCards();
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
    
    return card;
}

// const createGrid = (grid) => {
//     grid.style.gridTemplateColumns = `repeat(${grid}, 1fr)`
// }

const loadGame = () => {
    const duplicateIconCards = [ ...iconsCards4x4, ...iconsCards4x4 ];
    const shuffledIconCards = duplicateIconCards.sort(() => Math.random() - 0.5)

    // createGrid(grid)

    shuffledIconCards.forEach(iconCard => {
        const card = createCard(iconCard);
        grid.appendChild(card);
    })
}

window.onload = () => {
    const theme = localStorage.getItem('theme');
    const grid = localStorage.getItem('grid');
    const numberOfPlayers = localStorage.getItem('players');

    console.log(theme, grid, numberOfPlayers);
    loadGame();

}
