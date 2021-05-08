const BASE_URL = process.env.NODE_ENV === 'development' 
    ? ''
    : process.env.GHPAGES_BASE_URL

export default class AudioPlayer {
  static playBackgroundMusic() {
    AudioPlayer.play(`${BASE_URL}/assets/loop.mp3`, 0.7, true)
  }

  static bump() {
    AudioPlayer.play(`${BASE_URL}/assets/bump.mp3`, 0.2, false)
  }

  static play(src, volume, loop) {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    audio.play();
  }
}
