// import sentences array from sentences.js
import { sentences } from "./sentences.js";

// function to generate random sentence from sentences array
export function randomSentenceGenerator(arr) {
  const sentence = arr[Math.floor(Math.random() * sentences.length)];
  return sentence;
}

