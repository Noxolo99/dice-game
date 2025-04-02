// *Function to change the player names/
let player1 = "Player 1";
let player2 = "Player 2";

function editNames() {
  player1 = prompt("Change Player1 name");
  player2 = prompt("Change player2 name");

  document.querySelector("p.Player1").innerHTML = player1;
  document.querySelector("p.Player2").innerHTML = player2;
}
// Function to trigger the confetti effect/
function triggerConfetti() {
  const duration = 5 * 1000;
  const { clientWidth, clientHeight } = document.documentElement;

  const start = Date.now();

  const createConfetti = (x, y, colors) => {
    const element = document.createElement("div");
    const size = Math.floor(Math.random() * 16) + 8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    element.style.width = size + "px";
    element.style.height = size + "px";
    element.style.background = color;
    element.style.position = "fixed";
    element.style.willChange = "transform, opacity";
    element.style.top = `${y}px`;
    element.style.left = `${x}px`;
    element.style.pointerEvents = "none";

    const animation = element.animate(
      [
        { transform: `translate3d(0,0,0)`, opacity: 1 },
        { transform: `translate3d(0,${clientHeight}px,0)`, opacity: 0 },
      ],
      {
        duration: duration,
        easing: "ease-out",
        fill: "forwards",
      }
    );

    animation.onfinish = () => {
      element.remove();
    };

    document.body.appendChild(element);
  };
  /*Confetti colors */
  const colors = ["##232931", "#9896f1", "#d59bf9"];
  (function frame() {
    const elapsed = Date.now() - start;

    if (elapsed < duration) {
      const x = Math.random() * clientWidth;
      const y = -Math.random() * clientHeight * 0.1;
      createConfetti(x, y, colors);
      createConfetti(x, y, colors);

      requestAnimationFrame(frame);
    }
  })();
}
// Play the dice sound
let diceSound = document.getElementById("diceSound");
diceSound.play();

//! Function to roll the dice/
function rollTheDice() {
  setTimeout(function () {
    const diceSound = document.getElementById("diceSound");

    // Play the dice sound when the roll begins
    diceSound.play();

    let randomNumber1 = Math.floor(Math.random() * 6) + 1;
    let randomNumber2 = Math.floor(Math.random() * 6) + 1;

    document
      .querySelector(".img1")
      .setAttribute("src", "images/dice" + randomNumber1 + ".png");

    document
      .querySelector(".img2")
      .setAttribute("src", "images/dice" + randomNumber2 + ".png");

    if (randomNumber1 === randomNumber2) {
      document.querySelector("h1").innerHTML = "Draw!";
    } else if (randomNumber1 < randomNumber2) {
      document.querySelector("h1").innerHTML = player2 + " WINS!";
      // Play the dice sound when a player wins
      diceSound.play();
      // Trigger confetti for player2
      triggerConfetti();
    } else {
      document.querySelector("h1").innerHTML = player1 + " WINS!";
      // Play the dice sound when a player wins
      diceSound.play();
      // Trigger confetti for player1
      triggerConfetti();
    }
  }, 2500);
}
