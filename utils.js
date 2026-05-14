// import sentences array from sentences.js
import { sentences } from "./sentences.js";

// function to generate random sentence from sentences array
export function randomSentenceGenerator(arr) {
  const sentence = arr[Math.floor(Math.random() * sentences.length)];
  return sentence;
}

// function to calculate words per min
export function wpmCalculator(characterLength, seconds) {
  let wpm = (keypresses / 5) / (seconds / 60);
  return wpm
}

// function to calculate accuracy
export function accuracyCalculator(keypresses, errors) {
  let score = ((keypresses - errors) / keypresses) * 100;
  return score;
}

