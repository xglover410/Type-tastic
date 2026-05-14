/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  TL;DR  -->  pure helper utilities

      - contains stateless calculation/helper functions
      - generates random sentences from arrays
      - calculates WPM from chars + elapsed time
      - calculates typing accuracy percentage
      - does not have terminal logic, side effects, or shared state
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// function to generate random sentence from sentences array
export function randomSentenceGenerator(arr) {
  const sentence = arr[Math.floor(Math.random() * arr.length)];
  return sentence;
}

// function to calculate words per min
export function wpmCalculator(characterLength, seconds) {
  let wpm = (characterLength / 5) / (seconds / 60);
  return wpm
}

// function to calculate accuracy
export function accuracyCalculator(keypresses, errors) {
  let score = ((keypresses - errors) / keypresses) * 100;
  return score;
}

