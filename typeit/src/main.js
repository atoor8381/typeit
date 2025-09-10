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
let correctwords = document.getElementById('correctwords')
let start = document.getElementById('start')

function generatewords(count) {
  let text = []
  for (let i = 0; i < count; i++) {
    text.push(wordList[i])
  }
  return text
}

let wordscount = document.getElementById('wordscount')

console.log(wordscount.children[1].dataset.words) //buttons selected for number of words 

let words = generatewords(60) // words generated here 
console.log(words)


let distribute;
let wordfocused;
let shpan
let spancount = 0;
let numofwords = 0;

function createspan() {
  for (let i = 0; i < words.length; i++) {
    wordfocused = words[i]
    distribute = document.createElement('div')
    playground.appendChild(distribute)
    // console.log(wordfocused)
    for (let j = 0; j < wordfocused.length; j++) {
      shpan = document.createElement('span')
      shpan.textContent = wordfocused[j]
      distribute.appendChild(shpan)
      // console.log(shpan)
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
    }
    else if (keypressed === expectedkey) {
      console.log("hogaya kaam");
      numofwords++;
      correctwords.innerHTML = numofwords;
      spancount++;
    }
    else {
      console.log("abey bsdk kia kr raha hai");
      spancount++;
    }

  })
}

start.addEventListener('click', (e) => {
  playground.focus()
  console.log(e)
  play()
})
// function check() {
//   playground.focus()
//   playground.addEventListener('keydown', function (event) {
//     shpan.classList.remove('correct', 'wrong')
//     let keypressed = event.key
//     let expectedkey = distribute.innerText
//     if (keypressed == expectedkey) {
//       shpan.classList.add('correct')
//       console.log(keypressed)
//     } else {
//       shpan.classList.add('wrong')
//       console.log(keypressed)
//     };
//   });
// }

// check()

restart.addEventListener('click', (e) => {
  console.log("restartclicked")
  numofwords = 0;
  spancount = 0;
  correctwords.innerHTML = numofwords;

})

//now our next goal is to make the word fit in to the playground calculate total words typed and time taken.



