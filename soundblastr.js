const soundblastr = {

  sounds: {
    claps: [],
    crashes: [],
    cymbals: [],
    fx: [],
    hihats: [],
    kicks: [],
    percussions: [],
    shakers: [],
    snares: [],
    toms: []
  },

  keycodes: [81, 87, 69, 82, 84, 89, 85, 73, 79, 80],

  bindings: {
    0: { type: 'claps',  i: 0 },
    1: { type: 'crashes', i: 0 },
    2: { type: 'cymbals', i: 0 },
    3: { type: 'fx', i: 0 },
    4: { type: 'hihats', i: 0 },
    5: { type: 'kicks', i: 0 },
    6: { type: 'percussions', i: 0 },
    7: { type: 'shakers', i: 0 },
    8: { type: 'snares', i: 0 },
    9: { type: 'toms', i: 0 },
  },
  
  init() {
    this.getDOM();
    this.setupAnimation();
    this.delays = new Array(10);
    
    document.addEventListener('keydown', this.keydownHandler);
    document.addEventListener('keyup', this.keyupHandler);
    this.htmlSettings.addEventListener('click', this.settingsOpen);
    for (let i=0; i<this.htmlTypes.length; i++) {
      this.htmlTypes[i].addEventListener('click', this.menuTypeHandler);
    }

    this.loadSounds('claps', 10);
    this.loadSounds('crashes', 7);
    this.loadSounds('cymbals', 10);
    this.loadSounds('fx', 10);
    this.loadSounds('hihats', 10);
    this.loadSounds('kicks', 10);
    this.loadSounds('percussions', 10);
    this.loadSounds('shakers', 4);
    this.loadSounds('snares', 4);
    this.loadSounds('toms', 4);

  },
  getDOM() {
    this.htmlKeys = document.getElementsByClassName('key');
    this.top = document.getElementById('top');
    this.bot = document.getElementById('bot');
    this.htmlSettings = document.getElementById('settings');
    this.info = document.querySelector('.info');
    this.settingBind = document.querySelector('.setting-bind');
    this.htmlTypes = document.querySelectorAll('.div-type');
  },
  loadSounds(type, n) {
    for (let i=0; i<n; i++) {
      this.sounds[type][i] = new Audio(`sounds/${type}/${i}.wav`);
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
      let sound = soundblastr.sounds[soundblastr.bindings[k].type][soundblastr.bindings[k].i];
      sound.currentTime = 0;
      sound.play();
      soundblastr.animate(k);
      soundblastr.delays[k] = true;
      setTimeout(function() { soundblastr.delays[k] = false; }, 100);
    } 
  },
  keyupHandler() {
    for (let i=0; i<10; i++) {
      soundblastr.htmlKeys[i].classList.remove('hover');
    }
  },
  settingsOpen() {
    for (let i=0; i<soundblastr.htmlKeys.length; i++) { 
      soundblastr.htmlKeys[i].classList.add('half-transparent');
      soundblastr.htmlKeys[i].addEventListener('click', soundblastr.changeBind);
    }
    soundblastr.info.style.display = 'flex';
    soundblastr.htmlSettings.removeEventListener('click', soundblastr.settingsOpen);
    soundblastr.htmlSettings.addEventListener('click', soundblastr.settingsclose);
  },
  settingsclose() {
    for (let i=0; i<soundblastr.htmlKeys.length; i++) { 
      soundblastr.htmlKeys[i].classList.remove('half-transparent');
      soundblastr.htmlKeys[i].removeEventListener('click', soundblastr.changeBind);
    }
    soundblastr.info.style.display = 'none';
    soundblastr.htmlSettings.addEventListener('click', soundblastr.settingsOpen);
  },
  changeBind() {
    let innerhtml = this.innerHTML;
    let keys = { 'Q': 81, 'W': 87, 'E': 69, 'R': 82, 'T': 84, 'Y': 89, 'U': 85, 'I': 73, 'O': 79, 'P': 80 };
    soundblastr.kBuff = soundblastr.keycodes.indexOf(keys[innerhtml]);
    soundblastr.settingBind.style.display = 'flex';
    document.querySelector('.div-type').click();
  },
  kBuff: null,
  menuTypeHandler() {
    let clicked = this.innerHTML;
    soundblastr.htmlTypes.forEach(div => {
      div.classList.remove('active');
    })
    this.classList.add('active');
    let content = document.querySelector('.setting-bind-main-list');
    while (content.firstChild) { content.removeChild(content.firstChild) }
    
    let i = 1;
    soundblastr.sounds[clicked.toLowerCase()].forEach(el => {
      let div = document.createElement('div');
      let text = document.createTextNode(clicked + ' ' +  i);
      div.appendChild(text);
      div.setAttribute('data-type', clicked.toLowerCase());
      div.setAttribute('data-i', i - 1);
      div.addEventListener('click', function() {
        soundblastr.bindSound(soundblastr.kBuff, this.getAttribute('data-type'), this.getAttribute('data-i'))
      });
      content.appendChild(div);
      i++;
    });
  },
  bindSound(key, type, i) {
    soundblastr.bindings[key] = {
      type: type,
      i: i
    };
    soundblastr.settingBind.style.display = 'none';
  }
}

soundblastr.init();