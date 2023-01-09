// Selectors
// const btnGreen = $("#green");
// const btnRed = $("#red");
// const btnYellow = $("#yellow");
// const btnBlue = $("#blue");
const mainHeader = $("#level-title");

// variables

let level, userClickedPattern, gamePattern, started;
const buttonColours = ["green", "red", "yellow", "blue"];
// Functions

// Initialize game with init values
const initFunc = function () {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  started = false;
};

// Initialize values
initFunc();

const playSound = function (name) {
  const audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
};

const animatePress = function (currentColor) {
  // Add press efect
  $(`#${currentColor}`).addClass("pressed");
  // Removing press efect
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};

const nextSequence = function () {
  // Once if statement checks whether the input button was the last one required to move to another level, it resets the user input, so they have to input each color in the right order from the scratch.
  userClickedPattern = [];
  level++;
  $(mainHeader).text(`Level ${level}`);

  // It picks next random colour
  const randomChosenColour =
    buttonColours[Math.trunc(Math.random() * buttonColours.length)];
  // It adds new random colour to the existing pool
  gamePattern.push(randomChosenColour);
  // Animate and play sound of the randomly picked colour
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
};

const checkAnswer = function (currentLevel) {
  // Once a user choose their first color, it get's checked agains the gamePattern array.
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // If values from both arrays are the same, it then checks if that button press was the last required, so that it can pick another random color and wait for the user for input. If not, the function finishes execution and the button listeners listens for another colour.
    if (userClickedPattern.length === gamePattern.length) {
      // Added 1 second of execution delay, so it doesn't show next button right away when the user presses the right button
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
    // If values from both array are different, it means that the user chose the wrong colour and the game is over.
  } else {
    initFunc();
    playSound("wrong");
    $("body").addClass("game-over");
    mainHeader.text("Game Over, Press Any Key to Restart");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
  }
};

// Listeners

// Listen for button to get a colour
$(".btn").click(function (e) {
  let userChosenColour = e.target.id;
  animatePress(userChosenColour);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Listen for a key to start the game
$(window).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});
