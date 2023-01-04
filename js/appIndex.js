const form = document.querySelector('form');
const themeArea = document.querySelector('.theme-area')
const buttonsTheme = document.querySelectorAll('.theme')
const playerArea = document.querySelector('.player-area')
const buttonsNumberOfPlayers = document.querySelectorAll('.btn-players')
const selectGridArea = document.querySelector('.select-grid-area')
const selectGridButton = document.querySelectorAll('.select-grid-button')


const selectItem = (area, target) => {
     area.forEach((button) => {
          if(button.classList.contains('clicked')){
               button.classList.remove('clicked')
          }
     })
     target.classList.add('clicked');
}

themeArea.addEventListener('click', e => {
     const target = e.target;
     if(e.target.classList.contains('btn')){
          selectItem(buttonsTheme,target);
     }
})

playerArea.addEventListener('click', e => {
     const target = e.target;
     if(e.target.classList.contains('btn')){
          selectItem(buttonsNumberOfPlayers,target);
     }
})

selectGridArea.addEventListener('click', e => {
     const target = e.target;
     if(e.target.classList.contains('btn')){
          selectItem(selectGridButton,target);
     }
})

form.addEventListener('submit', e => {
          e.preventDefault();
          
})