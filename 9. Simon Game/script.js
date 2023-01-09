const mainHeader = $("#level-title");

// Variables
// Those will be initialized in a function to stay DRY with the code.
let level, userClickedPattern, gamePattern, started;
const buttonColours = ["green", "red", "yellow", "blue"];
// Functions

// Initialize game variables with init value
const initFunc = function () {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  started = false;
};

// Initialize values
initFunc();

const playSound = function (name) {
  // As we pass in the explicit name of the colour, we can pass that in to the Audio() function.
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
    // Reset all game variables
    initFunc();
    playSound("wrong");
    $("body").addClass("game-over");
    mainHeader.text("Game Over, Press Any Key to Restart");
    // We want to remove 'game-over' class after a while, not immediately. Otherwise, we won't see the red background color, when the game is over.
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
  }
};

// Listeners

// Listen for button to get a colour
$(".btn").click(function (e) {
  // once the button is pressed, the event gets created and thanks to that, we can get its CSS ID property
  let userChosenColour = e.target.id;
  // depending on what user chooses, the button gets animated and its assigned sound plays.
  animatePress(userChosenColour);
  playSound(userChosenColour);
  // depending on what user chooses, it gets added to the user pattern array
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Listen for a key to start the game
$(window).keypress(function () {
  // Once the started variable is set to true, pressing keyboard keys won't do anything to the game.
  if (!started) {
    nextSequence();
    started = true;
  }
});
