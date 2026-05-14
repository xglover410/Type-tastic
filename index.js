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

// tracks user input for live comparison against target sentence
let typed = "";
// counts incorrect inputs for accuracy calculation
let errors = 0;
// total number of keypresses for accuracy calculation
let totalKeypresses = 0;
// timestamp of the first valid keypress
let startTime = null;

// Game Intro
console.log("--Hello and Welcome to Type-Tastic!--")


// generate the random sentence
let answer = randomSentenceGenerator(sentences);
process.stdout.write(answer + "\n");


// enable raw keyboard input in terminal - does not require Enter key
process.stdin.setRawMode(true); 
// keep stdin active for continuous key event streaming
process.stdin.resume(); 
// convert buffer input into readable string characters
process.stdin.setEncoding("utf8"); 


// routes every keypress into central game input handler
process.stdin.on("data", handleKey);

// handleKey function to update game state
function handleKey(data) {
  // allow for safe exit from program when CTRL + C are pressed
  if (data === "\u0003") {
    // turn off raw mode and pause standard input
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.exit();
    return
  }
  // ignores keypresses that are arrows and function keys
  if (data.startsWith("\x1b")) return;
  // start timing on the user's first real input
  if (startTime === null) {
    startTime = Date.now();
  }
   // handles user correction by removing the last typed character
  if (data === "\u007f") {
    typed = typed.slice(0, -1);
    render();
    return;
  }
  // determines expected character based on current typing position
  const expected = answer[typed.length];
  // validates user input against target sentence
  if (data === expected) {
    typed += data;
  } else {
    errors += 1;
  }
  totalKeypresses += 1;

  // check for completion condition and trigger finish function
  render();
  if (typed === answer) {
    finish();
  }
}

function finish() {
  // compute and display final session stats(total time, wpm, accuracy, errors), then restore terminal state
  const endTime = Date.now()
  const totalTime = (endTime - startTime) / 1000;
  console.log("\n Total Time: " + totalTime + "s");
  console.log(" WPM: " + Math.round(wpmCalculator(answer.length, totalTime)));
  console.log(" Accuracy: " + Math.round(accuracyCalculator(totalKeypresses, errors)) + "%");
  process.stdin.setRawMode(false);
  process.stdin.pause();
  // safely exit the game after completion
  process.exit();
}

function render() {
  // renders current typing state to terminal
  process.stdout.write("\r" + typed + "_");
 
}

