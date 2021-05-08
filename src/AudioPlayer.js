const MAX_OVERLAY = 30;

// sounds
const sounds = {
  background: require('../assets/loop.mp3'),
  bump: require('../assets/bump.mp3'),
};

const soundManager = {
  background: new Audio(sounds.background),
  bump: Array(MAX_OVERLAY)
    .fill()
    .map(() => ({
      audioElement: new Audio(sounds.bump),
      busy: false,
    })),
};

export default class AudioPlayer {
  static playBackgroundMusic() {
    AudioPlayer.play(soundManager['background'], 0.7, true);
  }

  static bump() {
    AudioPlayer.play(soundManager['bump'], 0.2, false);
  }

  static play(audio, volume, loop) {
    if (audio instanceof Array) {
      const findFree = audio.find((el) => !el.busy);

      if (findFree) {
        findFree.busy = true;
        findFree.audioElement.loop = loop;
        findFree.audioElement.volume = volume;
        findFree.audioElement.play();
        findFree.audioElement.addEventListener('ended', () => {
          findFree.busy = false;
        });
      }

      return;
    }

    audio.loop = loop;
    audio.volume = volume;
    audio.play();
  }
}
