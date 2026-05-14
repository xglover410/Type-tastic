# **Type-Tastic**


## **Description:** 

Type-Tastic is a CLI speed typing game built with Node.js. You will receive a sentence that you must type into the terminal as quickly and accurately as possible. Once you complete the sentence you will get a score which includes the total time it took you to type out the sentence, how fast you typed(wpm) and a percentage indicating how accurate your typing was.


## **Gameplay:**

![alt text](/assets/image-1.png)

![alt text](/assets/image-2.png)

![alt text](/assets/image-3.png)

## **Scoring:**

WPM = (characterCount / 5) / (seconds / 60)

Accuracy = ((((totalKeypresses - errors) / totalKeypresses) * 100))

## **Features:**

- Real-time keystroke capture using raw stdin in Node.js
- Random sentence generator
- Live terminal rendering using ANSI escape codes
- Words Per Minute (WPM) calculation
- Typing Accuracy Tracker
- Backspace support for editing input
- No external dependencies


## **Tech Stack:**

- Node.js runtime
- process.stdin in raw mode for per-key input
- process.stdout for terminal rendering
- ANSI escape sequences for line control
- ES Modules (imports/exports)


## **How to run this program:**

```bash
node index.js

```


## **How to exit this program:**

Ctrl + C


