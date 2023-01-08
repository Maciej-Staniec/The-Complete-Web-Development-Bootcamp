/* Getting coordinates of elements */

// function getPos(el) {
//   var rect = el.getBoundingClientRect();
//   return { x: rect.left, y: rect.top };
// }
// var coords = getPos(document.querySelector(".yellow-box"));
// console.log("yellow-box x:" + coords.x);
// console.log("yellow-box y:" + coords.y);

// var coords = getPos(document.querySelector(".parent"));
// console.log("parent x:" + coords.x);
// console.log("parent y:" + coords.y);

// var coords = getPos(document.querySelector(".set"));
// console.log("set x:" + coords.x);
// console.log("set y:" + coords.y);

// var coords = getPos(document.querySelector(".red-box"));
// console.log("red-box x:" + coords.x);
// console.log("red-box y:" + coords.y);

/* -------------------------------- JQuery basics -------------------------------- */

/* Return a CSS property */
// Returning the background color of a class
console.log($(".red-box").css("background-color"));

/* Set a CSS property */
// Setting the background color of a class
$(".red-box").css("background-color", "orange");

/* Set multiple properties of a class */
// Change background color, height and width
$(".blue-box").css({
  "background-color": "red",
  height: "200px",
  width: "200px",
});

// Add CSS class attribute
$("#main-heading").addClass("hidden");
// Remove CSS class attribute
$("#main-heading").removeClass("hidden");
// Toggle CSS class attribute
$(".jquery").toggleClass("hidden");
$(".jquery").toggleClass("hidden");

// Get text content of the selected element
console.log($("p").text());
// Set text content of the selected element
$(".body-p").text("Set text content with text()");
// Get HTML content of the selected element
console.log($("#main").html());
// Set HTML content of the selected element
$("table").html(
  "<tr><th>Player</th><th>Goals</th><th>Matches</th></tr><tr><th>Lionel Messi</th><th>790</th><th>466</th></tr>"
);
// Get attribute value of the selected element
console.log($("a").attr("href"));
// Set attribute value of the selected element
$("a").attr("href", "https://www.yahoo.co.uk");

// Add event listeners
$(".green-box").click(function () {
  console.log("Click");
});

// Hide and Show elements
$(".parent").hide();
$(".parent").show();
// Hide/Show toggle
$("#btn-hide-show").click(function () {
  $(".jquery").toggle("slow");
});

// Fade out
$(".btn-fade-out").click(function () {
  $(".red-box").fadeOut("slow");
});

// Fade in
$(".btn-fade-in").click(function () {
  $(".red-box").fadeIn();
});

// Fade toggle
$(".btn-fade-toggle").click(function () {
  $(".blue-box").fadeToggle(3000);
});

// Fade to
$(".btn-fade-to").click(function () {
  $(".yellow-box").fadeTo(4000, 0.3);
});

// Slide Toggle
$("#slide-p").click(function () {
  $("#slide-c-u").slideToggle();
});

// Slide down
$(".slide-p-down").click(function () {
  console.log("click");
  $("#slide-c-l").slideDown();
});

// Slide up
$(".slide-p-up").click(function () {
  $("#slide-c-l").slideUp();
});

/* -------------------------------- Animations -------------------------------- */

// For animations, you can only change CSS properties with numeric values like margin, width, height, opacity etc.

// Animate Grey
$("#btn-anim-grey").click(function () {
  $(".grey-box").animate({ left: "250px" });
});

// Animate Black
/* Jquery allows for chaining up different methods */
$("#btn-anim-black").click(function () {
  $(".black-box")
    .animate({
      left: "250px",
      opacity: "0.5",
      height: "200px",
      width: "200px",
    })
    .slideUp()
    .slideDown();
});

// Animate with relative values - each event makes the div bigger

$("#btn-anim-grey").click(function () {
  $(".grey-box").animate({ left: "250px", width: "+=50px", height: "+=50px" });
});

// remove h1 header element
$("#main-heading").remove();
