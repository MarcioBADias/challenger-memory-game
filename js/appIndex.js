const form = document.querySelector('form');
const themeArea = document.querySelector('.theme-area')
const buttonsTheme = document.querySelectorAll('.theme')
const playerArea = document.querySelector('.player-area')
const buttonsNumberOfPlayers = document.querySelectorAll('.btn-players')
const selectGridArea = document.querySelector('.select-grid-area')
const selectGridButtons = document.querySelectorAll('.select-grid-button')

let theme = '';
let numberOfPlayers = '';
let gridSize = '';

const selectItem = (item, target) => {
     item.forEach((button) => {
          button.classList.contains('clicked') && button.classList.remove('clicked');
     })
     target.classList.add('clicked');
}

const printSelectedItem = (area, buttons)=> {
     area.addEventListener('click', e => {
          e.preventDefault();
          e.target.classList.contains('btn') && selectItem(buttons,e.target);
          e.target.classList.contains('theme') && (theme = e.target.value);
          e.target.classList.contains('btn-players') && (numberOfPlayers = e.target.value);
          e.target.classList.contains('select-grid-button') && (gridSize = e.target.value);
          
          console.log(theme, numberOfPlayers, gridSize)

     })
}

printSelectedItem(themeArea, buttonsTheme);
printSelectedItem(playerArea, buttonsNumberOfPlayers);
printSelectedItem(selectGridArea, selectGridButtons);


form.addEventListener('submit', e => {
     e.preventDefault();

     localStorage.setItem('theme', theme);
     localStorage.setItem('players', numberOfPlayers);
     localStorage.setItem('grid', gridSize);

     window.location = 'pages/game.html'
})
