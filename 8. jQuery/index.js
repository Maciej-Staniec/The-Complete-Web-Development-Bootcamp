function getPos(el) {
  var rect = el.getBoundingClientRect();
  return { x: rect.left, y: rect.top };
}
var coords = getPos(document.querySelector(".yellow-box"));
console.log("yellow-box x:" + coords.x);
console.log("yellow-box y:" + coords.y);

var coords = getPos(document.querySelector(".parent"));
console.log("parent x:" + coords.x);
console.log("parent y:" + coords.y);

var coords = getPos(document.querySelector(".set"));
console.log("set x:" + coords.x);
console.log("set y:" + coords.y);

var coords = getPos(document.querySelector(".red-box"));
console.log("red-box x:" + coords.x);
console.log("red-box y:" + coords.y);
