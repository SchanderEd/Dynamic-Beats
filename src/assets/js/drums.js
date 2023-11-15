import { onPlayBeat } from './drums-music-functions.min.js';
import { addRotateCard, removeRotateCard, defaultCards } from './drums-rotate.min.js';

const switchDrumsText = document.querySelector('.checkbox__inner');
const drumsBtns = document.querySelectorAll('.drums__btn');
const switchDrums = document.getElementById('switchDrums');

const enableDrums = () => {
  if (switchDrums.checked){
    drumsBtns.forEach((btn) => {
      btn.addEventListener('click', onPlayBeat);
    });
  } else {
    drumsBtns.forEach((btn) => {
      btn.removeEventListener('click', onPlayBeat);
    });
    return;
  };
};

switchDrums.addEventListener('click', () => {
  if (switchDrums.checked) {
    switchDrumsText.innerHTML = 'SOUND ON';

    removeRotateCard();
    defaultCards();
    enableDrums();
  };

  if (!switchDrums.checked) {
    switchDrumsText.innerHTML = 'SOUND OFF';
    
    addRotateCard();
  };
});

addRotateCard();