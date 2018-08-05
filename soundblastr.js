const soundblastr = {
  sounds: [],
  keycodes: [81, 87, 69, 82, 84, 89, 85, 73, 79, 80],
  init() {
    this.getDOM();
    this.loadSounds();
    this.setupAnimation();
    this.delays = new Array(10);
    document.addEventListener('keydown', this.keydownHandler);
    document.addEventListener('keyup', this.keyupHandler);
  },
  getDOM() {
    this.htmlKeys = document.getElementsByClassName('key');
    this.top = document.getElementById('top');
    this.bot = document.getElementById('bot');
  },
  loadSounds() {
    for (let i=0; i<10; i++) {
      this.sounds[i] = new Audio(`sounds/s${i}.wav`);
    }
  },  
  setupAnimation() {
    for (let i=0; i<10; i++) {
      let topDiv = document.createElement('div');
      let botDiv = document.createElement('div');
      topDiv.classList.add('top-div');
      botDiv.classList.add('bot-div');
      this.top.appendChild(topDiv); 
      this.bot.appendChild(botDiv);
    }
  },
  createAnimationDiv(side, i, color) {
    let animDiv = document.createElement('div');
    animDiv.style.width = 100 - i*3 + 'px';
    animDiv.style.height = '5px';
    animDiv.style.background = color;
    if (side == 'top') {
      animDiv.style['margin-bottom'] = '5px';    
    } else {
      animDiv.style['margin-top'] = '5px';
    }
    return animDiv;
  },
  animate(k) {
    soundblastr.htmlKeys[k].classList.add('hover');    
    for (let i=0; i<32; i++) {
      document.querySelector(`#top > div:nth-child(${k+1})`).appendChild(soundblastr.createAnimationDiv('top', i, '#009e78'));
      document.querySelector(`#bot > div:nth-child(${k+1})`).appendChild(soundblastr.createAnimationDiv('bot', i, '#009e78'));
    }
    let j = 0;
    let removeAnimDivs = function() {
      document.querySelector(`#bot > div:nth-child(${k+1})`).firstChild.remove(); 
      document.querySelector(`#top > div:nth-child(${k+1})`).firstChild.remove(); 
      j++;
      if (j < 32) { setTimeout(removeAnimDivs, 1 ) }  
    }
    setTimeout(removeAnimDivs, 1);
  },
  keydownHandler(e) {
    let k = soundblastr.keycodes.indexOf(e.keyCode);
    if ((k > -1) && (soundblastr.delays[k] == false || soundblastr.delays[k] == undefined)) {
      soundblastr.sounds[k].currentTime = 0;
      soundblastr.sounds[k].play();
      soundblastr.animate(k);
      soundblastr.delays[k] = true;
      setTimeout(function() { soundblastr.delays[k] = false; }, 100);
    } 
  },
  keyupHandler() {
    for (let i=0; i<10; i++) {
      soundblastr.htmlKeys[i].classList.remove('hover');
    }
  }
}

soundblastr.init();