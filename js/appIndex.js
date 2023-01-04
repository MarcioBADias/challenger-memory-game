const form = document.querySelector('form');
const buttonsTheme = document.querySelectorAll('.theme')
const buttonsNumberOfPlayers = document.querySelectorAll('.btn-players')


const selectItem = (area, target) => {
     area.forEach((button) => {
          if(button.classList.contains('clicked')){
               button.classList.remove('clicked')
          }
     })
     target.classList.add('clicked');
}
form.addEventListener('click', e => {
     e.preventDefault();
     const target = e.target;
     if(e.target.classList.contains('theme')){
          
          selectItem(buttonsNumberOfPlayers,target);
     }
})