import { sounds } from './drumsSounds.js';

const stopBeat = (beatTimer) => {
  clearInterval(beatTimer);
};

const playBeat = (src, beatTimer) => {
  let beat = new Audio(src);

  if (switchDrums.checked) {
    beat.play();
  } else {
    //stopBeat(beatTimer);
  };
};

const onPlayBeat = (evt) => {
  let sound = sounds.find(sound => sound.id === evt.target.id);
  //let beatTimer = setInterval(() => playBeat(sound.src, beatTimer), 1000);
  playBeat(sound.src);
  //return beatTimer;
};

export { onPlayBeat };