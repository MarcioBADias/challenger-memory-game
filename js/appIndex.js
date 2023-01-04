const form = document.querySelector('form');

form.addEventListener('click', e => {
    e.preventDefault();

   if(e.target.classList.contains('btn')){
        e.target.classList.add('clicked');
   }

})