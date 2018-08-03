const soundblastr = {
  sounds: [],
  keycodes: [81, 87, 69, 82, 84, 89, 85, 73, 79, 80],
  init() {
    this.loadSounds();
    this.htmlKeys = document.getElementsByClassName('key');
    document.addEventListener('keydown', this.keydownHandler);
    document.addEventListener('keyup', this.keyupHandler);
  },
  loadSounds() {
    for (let i=0; i<10; i++) {
      this.sounds[i] = new Audio(`sounds/s${i}.wav`);
    }
  },
  keydownHandler(e) {
    let k = soundblastr.keycodes.indexOf(e.keyCode);
    if (k > -1) {
      soundblastr.sounds[k].play();
      soundblastr.htmlKeys[k].classList.add('hover');
    }
  },
  keyupHandler() {
    for (let i=0; i<10; i++) {
      soundblastr.htmlKeys[i].classList.remove('hover');
    }
  }
}

soundblastr.init();