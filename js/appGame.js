const grid = document.querySelector('.grid');

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

createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = (className);
    return element;
}

const revealCard = ({ target }) => {
    target.parentNode.classList.add('reveal-card');
}

const createCard = (iconCard) => {
    const card = createElement('div','card');
    const faceFront = createElement('div','face front');
    const faceBack = createElement('div','face back');

    faceFront.style.backgroundImage = `url(../img/icons/${iconCard}.png)`;

    card.appendChild(faceFront);
    card.appendChild(faceBack);

    card.addEventListener('click', revealCard)
    
    return card;
}

const loadGame = () => {
    const duplicateIconCards = [ ...iconsCards, ...iconsCards ];
    const shuffledIconCards = duplicateIconCards.sort(() => Math.random() - 0.5)

    shuffledIconCards.forEach(iconCard => {
        const card = createCard(iconCard);
        grid.appendChild(card);
    })
}

loadGame();