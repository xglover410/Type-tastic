/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  TL;DR  -->  main game engine + runtime state

      - initializes and runs the typing game
      - enables raw stdin keyboard input
      - tracks typed chars, errors, timing, and score
      - processes every keypress through handleKey()
      - redraws terminal output via render()
      - calculates final stats and restores terminal on exit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


// import necessary functions
import { sentences } from "./sentences.js"
import { randomSentenceGenerator, wpmCalculator, accuracyCalculator } from "./utils.js"


// Game state variables
let typed = "";
let errors = 0;
let totalKeypresses = 0;
let startTime = null;

// Game Intro
console.log("--Hello and Welcome to Type-Tastic!--")


// generate the random sentence
let answer = randomSentenceGenerator(sentences);
process.stdout.write(answer + "\n");


// enable standard input in terminal
process.stdin.setRawMode(true); 
// enable input events
process.stdin.resume(); 
// translate binary into readable text
process.stdin.setEncoding("utf8"); 


// data listener
process.stdin.on("data", handleKey);

// handleKey function to update game state

function handleKey(data) {
  // exit the program when CTRL + C are pressed
  if (data === "\u0003") {
    // turn off raw mode and pause standard input
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.exit();
    return
  }
  // ignores keypresses that are arrows and function keys
  if (data.startsWith("\x1b")) return;
  // start timer when valid data is inputted
  if (startTime === null) {
    startTime = Date.now();
  }
   // modify typed variable when backspace key is pressed
  if (data === "\u007f") {
    typed = typed.slice(0, -1);
    render();
    return;
  }
  // find the next character
  const expected = answer[typed.length];
  // compare expected with data
  if (data === expected) {
    typed += data;
  } else {
    errors += 1;
  }
  totalKeypresses += 1;

  // if user gets answer correct, end the game
  render();
  if (typed === answer) {
    finish();
  }
}

function finish() {
  const endTime = Date.now()
  const totalTime = (endTime - startTime) / 1000;
  // log the total time taken
  console.log("\n Total Time: " + totalTime + "s");
  // log the wpm
  console.log(" WPM: " + Math.round(wpmCalculator(answer.length, totalTime)));
  // log the accuracy and number of errors
  console.log(" Accuracy: " + Math.round(accuracyCalculator(totalKeypresses, errors)) + "%");
  // turn off raw mode and pause standard input
  process.stdin.setRawMode(false);
  process.stdin.pause();
  process.exit();
}

function render() {
  // show text on the terminal using escape characters
  // tracker for user input
  process.stdout.write("\r" + typed + "_");
 
}

