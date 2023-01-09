// Selectors
const btnGreen = $("#green");
const btnRed = $("#red");
const btnYellow = $("#yellow");
const btnBlue = $("#blue");

// variables

let level, userCombination, compCombination;
// Functions
const initFunc = function () {
  level = 1;
  btnPool = ["#green", "#red", "#yellow", "#blue"];
  userCombination = [];
  compCombination = [];
};

const pickBtn = function () {
  compCombination.push(btnPool[Math.trunc(Math.random() * btnPool.length)]);
  console.log(compCombination);
};

const showComb = function () {
  
};

const game = function () {
  initFunc();
  pickBtn();
  console.log(compCombination);
};

// Game Engine
if (
  $(window).keypress(function () {
    console.log("keydown");
    game();
  })
)
  // Event listeners
  btnGreen.click(function () {
    console.log("click");
  });

btnRed.click(function () {
  console.log("click");
});
btnYellow.click(function () {
  console.log("click");
});
btnBlue.click(function () {
  console.log("click");
});
