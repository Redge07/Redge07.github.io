const Body = document.body;
let cpt = 0;

const ring = () => {
  const monAudio = new Audio();
  monAudio.src = "./Enter.mp3";
  monAudio.volume = 0.05;
  monAudio.play();
};

const finish = (score, temps) => {
  const Resultat = Body.querySelector(".resultat");
  Resultat.style.transform = "translate(-50%, -50%) scale(1)";
  Resultat.querySelector("h3:nth-child(2)").querySelector("span").innerHTML =
    score;
  Resultat.querySelector("h3:nth-child(3)").querySelector("span").innerHTML =
    (score / temps).toFixed(2) + "/s";

  Resultat.querySelector("button").addEventListener("click", () => {
    Body.querySelector(".timer").style.visibility = "hidden";
    Body.querySelector(".timer").textContent = 0;
    Body.querySelector("button").style.display = "flex";
    Body.querySelector(".score").textContent = 0;
    Resultat.style.transform = "translate(-50%, -50%) scale(0)";
    cpt = 0;
    Body.querySelector(".chrono").style.display = "flex";
    Body.style.background = "none";
  });
};

const bubbleCreate = () => {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  Body.appendChild(bubble);
  bubble.style.left = Math.random() * 100 + "%";
  bubble.style.width = Math.random() * 100 + 100 + "px";
  bubble.style.setProperty("--nivLeft", Math.random() * 100 + "%");
  setTimeout(() => {
    bubble.remove();
  }, 4000);

  bubble.addEventListener("click", () => {
    cpt++;
    Body.querySelector(".score").textContent = cpt;
    bubble.remove();
    ring();
  });
};

const game = () => {
  const temps =
    Body.querySelector("input").value == "" ||
    Body.querySelector("input").value == 0
      ? 10
      : Body.querySelector("input").value;

  bubbleInterval = setInterval(bubbleCreate, 300);

  let timer = 0;
  timerInterval = setInterval(() => {
    timer++;
    resTimer = (timer / 10).toFixed(1);
    Body.querySelector(".timer").textContent = resTimer;
  }, 100);

  setTimeout(() => {
    clearInterval(bubbleInterval);
    clearInterval(timerInterval);
    Body.style.background = "lightgray";
    finish(Body.querySelector(".score").textContent, temps);
    Body.querySelectorAll(".bubble").forEach((bubble) => {
      bubble.remove();
    });
  }, temps * 1000);
};

Body.querySelector("button").addEventListener("click", () => {
  Body.querySelector(".timer").style.visibility = "visible";
  game();
  Body.querySelector("button").style.display = "none";
  Body.querySelector(".chrono").style.display = "none";
});

Body.querySelector(".chrono")
  .querySelector("i:nth-child(1)")
  .addEventListener("click", () => {
    Body.querySelector(".chrono").querySelector("input").value++;
  });

Body.querySelector(".chrono")
  .querySelector("i:nth-child(3)")
  .addEventListener("click", () => {
    Body.querySelector(".chrono").querySelector("input").value--;
    Body.querySelector(".chrono").querySelector("input").value < 0
      ? (Body.querySelector(".chrono").querySelector("input").value = 0)
      : Body.querySelector(".chrono").querySelector("input").value;
  });
