//Array to hold values of userChosenColour variable
var userClickedPattern = [];

//Array to hold the game pattern
var gamePattern = [];

//Array to hold the colors
var buttonColours = ["red", "blue", "green", "yellow"];

//jQuery to detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function () {
  //var userChosenColour holds the id of the button that got clicked

  /*
  A webpage is filled with objects (button, input, h1, p, ...).
 
  Whenever the user performs an action (click, keypress,... ) on one of these objects, the objects on which the action took place is referred to as this (object) in the code.
 
  You can compare it to the following:
 
  - there is a piece of paper on the table.
 
  - I take the piece of paper (action) and I call it this
 
  - I can then go over it's properties (this is white, this is blank/written on, this weighs 80 gr/m2, ...)
 
  So the object (the piece of paper) is referred to as this
  */

  var userChosenColour = $(this).attr("id");

  //Add the contents of the variable userChosenColour to the end of userClickedPattern array
  userClickedPattern.push(userChosenColour);

  //Plays sound when user clicks on the button
  playSound(userChosenColour);

  //Passes the pressed button to the animatePress()
  animatePress(userChosenColour);

  console.log("Button clicked: " + userClickedPattern);

  //Call checkAnswer() after the user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
  checkAnswer(userClickedPattern.length - 1);
});

//Function to generate a random number between 0 and 3
function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level
  userClickedPattern = [];

  //Increase the level by 1 every time nextSequence() is called
  level++;

  //Update the h1 with the value of the level been played
  $("#level-title").text("Level " + level);

  //Generates a random number between 1 and 3
  var randomNumber = buttonColours[Math.floor(Math.random() * 4)];

  //New variable randomChosenColour to store the random colour
  var randomChosenColour = randomNumber;

  //Add the new randomChosenColour to the end of the gamePattern array
  gamePattern.push(randomChosenColour);

  //jQuery select the button with the same ID as the randomChosenColour and animate it with a flash
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //Refactoring the code in playSound() so it work for both playing sound in nextSequence() and when the user clicks a button
  playSound(randomChosenColour);

  //return randomChosenColour;
}

//Function to play sound that takes one parameter called name
function playSound(name) {
  //JS to play the sound for each button colour selected
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Function to animate the buttons with a CSS class, it takes one parameter called currentColour
function animatePress(currentColour) {
  //Use jQuery to add this pressed class to the button that gets clicked inside animatePress()
  $("#" + currentColour).addClass("pressed");

  //JS to remove the pressed class after 100 milliseconds
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Variable to keep track of whether the game has started or not in order to only call nextSequence() on the first keypress
var started = false;

//Variable to hold the level been played
var level = 0;

//Detect when a keyboard key has been pressed with jQuery, once it happens call nextSequence()
$(document).keypress(function () {
  if (!started) {
    //Change the text on h1 to "Level 0..."
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Function to check the answer from the user
function checkAnswer(currentLevel) {
  //Check if the most recent user answer is the same as the game pattern
  //If so then log "success", otherwise log "wrong"
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    //if the user got the most recent answer right on the check above, then check that they have finished their sequence with another if statement
    if (userClickedPattern.length === gamePattern.length) {
      //Call nextSequence() after a 1000 millisecond delay
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //JS to play the sound for if the user choses the wrong colour
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    //Use jQuery to add the css game-over class once the user gets one of the answers wrong and then remove it after 200 milliseconds
    $("body").addClass("game-over");

    //Change the h1 title
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    console.log("Wrong");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
