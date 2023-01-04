const form = document.querySelector('form');
const themeArea = document.querySelector('.theme-area')
const buttonsTheme = document.querySelectorAll('.theme')
const playerArea = document.querySelector('.player-area')
const buttonsNumberOfPlayers = document.querySelectorAll('.btn-players')
const selectGridArea = document.querySelector('.select-grid-area')
const selectGridButtons = document.querySelectorAll('.select-grid-button')


const selectItem = (item, target) => {
     item.forEach((button) => {
          button.classList.contains('clicked') && button.classList.remove('clicked')
     })
     target.classList.add('clicked');
}

const printSelectedItem = (area, buttons)=> {
     area.addEventListener('click', e => {
          e.target.classList.contains('btn') && selectItem(buttons,e.target);
     })
}

printSelectedItem(themeArea, buttonsTheme);
printSelectedItem(playerArea, buttonsNumberOfPlayers);
printSelectedItem(selectGridArea, selectGridButtons);

form.addEventListener('submit', e => {
          e.preventDefault();
          
})