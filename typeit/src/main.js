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

let tenwords = document.querySelector('[data-words="10"]')
let twentywords = document.querySelector('[data-words="20"]')
let thirtywords = document.querySelector('[data-words="30"]')
let playground = document.getElementById('playground')
let restart = document.getElementById('restart')
let correctwords = document.getElementById('correctwords')
let start = document.getElementById('start')
let wordsContainer = document.getElementById('words-container')
let timerElement = document.getElementById('timer')
let caret = document.createElement("span");
let tensec = document.getElementById('10')
caret.classList.add("caret");

tensec.addEventListener('click',(e)=>{
  timer()
})

function moveCaret(position) {

  let targetSpan = checkword[position];
  if (targetSpan) {
    targetSpan.parentNode.insertBefore(caret, targetSpan);
  } else {
    // if at the end, just append
    wordsContainer.appendChild(caret);
  }
}

caret.classList.add("caret");

let istimeup
let timeleft = 10;
function timer() {
  let interval = setInterval(() => {
    timeleft--;
    console.log(timeleft)
    if (timeleft == 0) {
      timerElement.textContent = timeleft
      clearInterval(interval)
      console.log("time up")
      istimeup = true;
      timerElement.textContent = '10'

    }
    timerElement.textContent = timeleft
  }, 1000);
}

function generatewords(count) {
  let text = []
  for (let i = 0; i < count; i++) {
    text.push(wordList[i])
  }
  return text
}

let wordscount = document.getElementById('wordscount')

console.log(wordscount.children[1].dataset.words) //buttons selected for number of words 

let words = generatewords(100) // words generated here 
console.log(words)


let distribute;
let wordfocused;
let shpan
let spancount = 0;
let numofwords = 0;

let currentLine = 0;

function scrollIfNeeded() {
  let caretSpan = wordsContainer.querySelectorAll('span')[spancount];
  if (!caretSpan) return;

  let caretRect = caretSpan.getBoundingClientRect();
  let playgroundRect = playground.getBoundingClientRect();

  // If caret goes below the visible area, scroll up by one line
  if (caretRect.bottom > playgroundRect.bottom) {
    currentLine++;
    let lineHeight = parseFloat(getComputedStyle(playground).lineHeight);
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

function play() {
  checkword = playground.querySelectorAll('span')
  playground.addEventListener('keydown', (e) => {
    if (istimeup === true) {
      e.preventDefault()
      return;
    }
    let keypressed = e.key;
    let expectedkey = checkword[spancount].innerText
    if (keypressed === " ") {
      e.preventDefault();
      numofwords++;
      correctwords.innerHTML = numofwords;
      console.log("aghe chalo");
      spancount++; // move to next word on space
    } else if (keypressed === 'Backspace') {
      spancount = Math.max(0, spancount - 1); // don’t let it go below 0
      console.log("backspace pressed");
      numofwords = Math.max(0, numofwords - 1)
      correctwords.innerHTML = numofwords;
      checkword[spancount].classList.remove('correct', 'wrong')
    }
    else if (keypressed === expectedkey) {
      console.log("hogaya kaam");
      numofwords++;
      correctwords.innerHTML = numofwords;
      checkword[spancount].classList.add('correct')
      spancount++;
    }
    else {
      console.log("abey bsdk kia kr raha hai");
      checkword[spancount].classList.add('wrong')
      spancount++;
    }
    moveCaret(spancount); 
    scrollIfNeeded()
  })
}

playground.focus()

play()

restart.addEventListener('click', (e) => {
  console.log("restartclicked")
  numofwords = 0;
  spancount = 0;
  correctwords.innerHTML = numofwords;
  timerElement.textContent = '10';
  // checkword.classList.remove('correct','wrong')
  playground.focus()
})