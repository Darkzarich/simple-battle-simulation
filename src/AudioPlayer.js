const sounds = {
    background: new Audio(require('../assets/loop.mp3')),
    bump: new Audio(require('../assets/bump.mp3'))
}
export default class AudioPlayer {
  static playBackgroundMusic() {
    AudioPlayer.play(sounds['background'], 0.7, true)
  }

  static bump() {
    AudioPlayer.play(sounds['bump'], 0.2, false)
  }

  static play(audio, volume, loop) {
    const newAudio = audio.cloneNode(true)
    newAudio.loop = loop;
    newAudio.volume = volume;
    newAudio.play();
  }
}
