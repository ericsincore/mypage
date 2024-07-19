//Enlarge pictures on reference page
function bigImg(x) {
	x.style.height = "150px";
	x.style.width = "190px";
}

function normalImg(x) {
	x.style.height = "75px";
	x.style.width = "95px";
}

//Welcome Message
function welcome() {
	confirm("Welcome to the site about Clarksville, TN. \nIf you are looking for Clarksville, IN you are in the wrong spot!")
}

//Drag-and-Drop
function allowDrop(ev) {
  ev.preventDefault();
}

document.addEventListener("dragstart", function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.target.style.opacity = "0.2";
})

document.addEventListener("dragend", function drag(ev) {
	document.getElementById("word").innerHTML = "Thank You!";
	event.target.style.opacity = "1";
});


function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

//NavBar shrinks when screen is small
function myFunction() {
  var x = document.getElementById("myMenu");
  if (x.className === "menu") {
    x.className += " responsive";
  } else {
    x.className = "menu";
  }
}

//NavBar disappears when scrolls down
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("myMenu").style.top = "0";
  } else {
    document.getElementById("myMenu").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

