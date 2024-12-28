const array = ["développeur", "étudiant", "footballeur"];
const target = document.getElementById("target");
let wordIndex = 0;
let letterIndex = 0;

const createLetter = () => {
  const letter = document.createElement("span");
  target.appendChild(letter);
  letter.textContent = array[wordIndex][letterIndex];
  setTimeout(() => {
    letter.remove();
  }, array[wordIndex].length * 100 * 2);
};

const timer = () => {
  setTimeout(() => {
    if (wordIndex < array.length) {
      if (letterIndex < array[wordIndex].length) {
        createLetter();
        letterIndex++;
        timer();
      } else {
        setTimeout(() => {
          timer();
        }, array[wordIndex].length * 100 *2 + 1000);
        wordIndex++;
        letterIndex = 0;
      }
    } else {
      wordIndex = 0;
      letterIndex = 0;
      timer();
    }
  }, 100);
};

timer();
