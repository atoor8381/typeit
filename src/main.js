import './style.css'

const wordList = [
  "apple", "banana", "chair", "river", "mountain", "window", "book", "orange", "pencil",
  "light", "shadow", "green", "music", "cloud", "flower", "bird", "stone", "table", "smile",
  "water", "dream", "leaf", "rain", "shoe", "glass", "tree", "sun", "star", "road", "train",
  "city", "ocean", "phone", "dog", "cat", "fish", "door", "house", "cake", "game", "clock",
  "brush", "sky", "fire", "paper", "key", "milk", "ball", "horse", "car", "hill", "lamp",
  "school", "fruit", "dress", "tea", "coffee", "room", "song", "hand", "face", "bell", "path",
  "apple", "banana", "chair", "river", "mountain", "window", "book", "orange", "pencil",
  "light", "shadow", "green", "music", "cloud", "flower", "bird", "stone", "table", "smile",
  "water", "dream", "leaf", "rain", "shoe", "glass", "tree", "sun", "star", "road", "train",
  "city", "ocean", "phone", "dog", "cat", "fish", "door", "house", "cake", "game", "clock",
  "brush", "sky", "fire", "paper", "key", "milk", "ball", "horse", "car", "hill", "lamp",
  "school", "fruit", "dress", "tea", "coffee", "room", "song", "hand", "face", "bell", "path"
];

let playground = document.getElementById('playground')
let restart = document.getElementById('restart')
let correctwords = document.getElementById('correctwords')
let wordsContainer = document.getElementById('words-container')
let timerElement = document.getElementById('timer')
let caret = document.createElement("span");
let tensec = document.getElementById('10')
let twentysec = document.getElementById('20')
let thirtysec = document.getElementById('30')
caret.classList.add("caret");

let intervals = [] //creating an array for the intervals 

function addintervals(fn, time) {
  const id = setInterval(fn, time)
  intervals.push(id)
  return id
}

function intervalclear(intId) {
  if (!intId) return;
  clearInterval(intId)
  intervals = intervals.filter(id => id !== intId)
}

function clearrallinterval() {
  intervals.forEach(id => clearInterval(id))
  intervals = []
}

clearrallinterval()

const timerButtons = [tensec, twentysec, thirtysec];

function disableTimerButtons(state) {
  timerButtons.forEach(btn => {
    if (!btn) return;
    btn.disabled = state;
  });
}

timerButtons.forEach(button => {
  if (!button) return;
  
  button.addEventListener('click', () => {
    defaultTimerIntervalId
    disableTimerButtons(true);
    const seconds = parseInt(button.id);
    timer(seconds);
    setTimeout(() => {
      disableTimerButtons(false);
    }, seconds * 1000 + 200);
  });
});

let targetSpan
let timerIntervalId = null
let defaultTimerIntervalId = null
let istimeup = false
let timeleft
let defaultTimerRunning = false
let defaultTimerOver = false //  NEW FLAG
let customtimerrunning;

function timer(length) {
  if (timerIntervalId !== null ) return;

  defaultTimerRunning = false;
  customtimerrunning = true;
  
  if (defaultTimerIntervalId !== null) {
    intervalclear(defaultTimerIntervalId)
    defaultTimerIntervalId = null
  }

  playground.focus()
  timeleft = length;
  timerElement.textContent = timeleft

  timerIntervalId = addintervals(() => {
    timeleft--;
    if (timeleft <= 0) {
      intervalclear(timerIntervalId)
      timerIntervalId = null
      istimeup = true;
      timerElement.textContent = length
      disableTimerButtons(false)
      customtimerrunning=false;
      reset()
      return;
    }
    timerElement.textContent = timeleft
  }, 1000);
}

function generatewords(count) {
  let text = []
  for (let i = 0; i < count; i++) {
    text.push(wordList[i % wordList.length])
  }
  return text
}

let words = generatewords(100)
let distribute;
let wordfocused;
let shpan
let spancount = 0;
let numofwords = 0;
let currentLine = 0;
let lineHeight;

function scrollIfNeeded() {
  let caretSpan = wordsContainer.querySelectorAll('span')[spancount];
  if (!caretSpan) return;

  let caretRect = caretSpan.getBoundingClientRect();
  let playgroundRect = playground.getBoundingClientRect();

  if (caretRect.bottom > playgroundRect.bottom) {
    currentLine++;
    lineHeight = parseFloat(getComputedStyle(playground).lineHeight);
    wordsContainer.style.transform = `translateY(-${currentLine * lineHeight}px)`;
  }
}

function createspan() {
  for (let i = 0; i < words.length; i++) {
    wordfocused = words[i]
    distribute = document.createElement('div')
    wordsContainer.appendChild(distribute)
    for (let j = 0; j < wordfocused.length; j++) {
      shpan = document.createElement('span')
      shpan.textContent = wordfocused[j]
      distribute.appendChild(shpan)
    }
    let space = document.createElement('span')
    distribute.appendChild(space)
    space.innerText = " "
  }
}
createspan()

let checkword;
let defaultinterval = 0;

function defaulttimer() {
  // Don't start if already running or finished once
  if (defaultTimerRunning || defaultTimerOver || customtimerrunning) return;
  defaultTimerRunning = true;
  disableTimerButtons(true); //disable other timer buttons

  let timeLeftLocal = 10;
  timerElement.textContent = timeLeftLocal;

  defaultTimerIntervalId = addintervals(() => {
    timerElement.textContent = timeLeftLocal;
    timeLeftLocal--;
    if (timeLeftLocal < 0) {
      intervalclear(defaultTimerIntervalId)
      defaultTimerIntervalId = null
      defaultTimerRunning = false
      defaultTimerOver = true // 👈 Mark finished permanently
      timerElement.textContent = '10';
      disableTimerButtons(false); //re enables the timer buttons
      clearrallinterval();
      istimeup = true; // 👈 stop typing
    }
  }, 1000);
}

function moveCaret(position) {
  targetSpan = checkword && checkword[position];
  if (targetSpan) {
    targetSpan.parentNode.insertBefore(caret, targetSpan);
  } else {
    wordsContainer.appendChild(caret);
  }
}

function play() {
  checkword = playground.querySelectorAll('span')
  playground.addEventListener('keydown', (e) => {
    // Block typing if default timer is over or time is up
    if (istimeup === true || defaultTimerOver === true) {
      e.preventDefault()
      return;
    }

    if (defaultinterval === 0) {
      defaulttimer()
    }
    defaultinterval++;

    let keypressed = e.key;
    let expectedkey = checkword[spancount] && checkword[spancount].innerText

    if (keypressed === " ") {
      e.preventDefault();
      numofwords++;
      correctwords.innerHTML = numofwords;
      spancount++;
    } else if (keypressed === 'Backspace') {
      e.preventDefault();
      spancount = Math.max(0, spancount - 1);
      numofwords = Math.max(0, numofwords - 1) //these lines will prevent us from going below zero 
      correctwords.innerHTML = numofwords;
      if (checkword[spancount]) {
        checkword[spancount].classList.remove('correct', 'wrong')
      }
    }
    else if (keypressed === expectedkey) {
      numofwords++;
      correctwords.innerHTML = numofwords;
      if (checkword[spancount]) checkword[spancount].classList.add('correct')
      spancount++;
    }
    else {
      if (checkword[spancount]) checkword[spancount].classList.add('wrong')
      spancount++;
    }
    moveCaret(spancount);
    scrollIfNeeded()
  })
}

playground.focus()
play()

function reset() {
  // here in these lines we are making sure that the user starts typing again the default settings can run 
  defaultinterval = 0
  defaultTimerRunning = false
  defaultTimerOver = false 
  customtimerrunning = false;
  istimeup = false
  // so that the user can again select any timer of his choice again 
  if (timerIntervalId !== null) {
    intervalclear(timerIntervalId)
    timerIntervalId = null
  }
  // 
  if (defaultTimerIntervalId !== null) {
    intervalclear(defaultTimerIntervalId)
    defaultTimerIntervalId = null
  }
  clearrallinterval() //clears all intervals 

  numofwords = 0;
  spancount = 0;
  correctwords.innerHTML = numofwords;
  currentLine = 0;
  timerElement.textContent = '10'
  wordsContainer.style.transform = `translateY(0px)`;
  moveCaret(0)
  checkword && checkword.forEach(element => {
    element.classList.remove('correct', 'wrong')
  });
  disableTimerButtons(false)
  playground.focus()
}

restart.addEventListener('click', (e) => {
  reset()
})



//on the start of the timer from any button the default timer should not be running 
