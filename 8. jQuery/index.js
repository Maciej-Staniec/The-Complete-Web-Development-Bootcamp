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
$("p").text("Set text content with text()");
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
