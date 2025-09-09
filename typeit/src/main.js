import './style.css'
const wordList = [
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

function generatewords(count) {
  let text = []
  for (let i = 0; i < count; i++) {
    text.push(wordList[i])
  }
  return text.join("")
}

let wordscount = document.getElementById('wordscount')

console.log(wordscount.children[1].dataset.words) //buttons selected for number of words 

let words = generatewords(10) // words generated here 
console.log(words.split(""))


let distribute = document.createElement('span')

function createspan() {
  playground.appendChild(distribute)
  distribute.textContent = words[0]
  playground.focus()
}
function check() {
  playground.focus()
  playground.addEventListener('keydown', function (event) {
    distribute.classList.remove('correct', 'wrong')
    let keypressed = event.key
    let expectedkey = distribute.innerText
    if (keypressed == expectedkey) {
      distribute.classList.add('correct')
      console.log(keypressed)
    } else {
      distribute.classList.add('wrong')
      console.log(keypressed)
    };
  });
}

createspan()
check()

restart.addEventListener('click', (e) => {
  console.log("restartclicked")
  distribute.classList.add('restart')
  distribute.classList.remove('correct', 'wrong','restart')
  check()
})

