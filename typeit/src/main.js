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
let caret = document.createElement("span");
let wordsContainer = document.getElementById('words-container')
caret.classList.add("caret");


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

function play() {
  let checkword = playground.querySelectorAll('span')
  console.log(checkword[5])
  playground.addEventListener('keydown', (e) => {
    let keypressed = e.key;
    let expectedkey = checkword[spancount].innerText
    if (keypressed === " ") {
      e.preventDefault();
      console.log("aghe chalo");
      spancount++; // move to next word on space
    }
    else if (keypressed === 'Backspace') {
      spancount = Math.max(0, spancount - 1); // don’t let it go below 0
      console.log("backspace pressed");
      numofwords = Math.max(0, numofwords - 1)
      correctwords.innerHTML = numofwords;
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
      spancount++;
    }
    scrollIfNeeded()
  })
}

  playground.focus()
  play()

//   playground.addEventListener('keydown', (e) => {
//   let keypressed = e.key;
//   let checkword = wordsContainer.querySelectorAll('span')
//   let expectedkey = checkword[spancount]?.innerText;

//   if (keypressed === " ") {
//     e.preventDefault();
//     spancount++;
//   }
//   else if (keypressed === 'Backspace') {
//     spancount = Math.max(0, spancount - 1);
//     numofwords = Math.max(0, numofwords - 1);
//     correctwords.innerHTML = numofwords;
//   }
//   else if (keypressed === expectedkey) {
//     numofwords++;
//     correctwords.innerHTML = numofwords;
//     spancount++;
//   }
//   else {
//     spancount++;
//   }

//   scrollIfNeeded();
// });


restart.addEventListener('click', (e) => {
  console.log("restartclicked")
  numofwords = 0;
  spancount = 0;
  correctwords.innerHTML = numofwords;
  playground.focus()
})