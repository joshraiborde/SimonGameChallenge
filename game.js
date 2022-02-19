// 2.3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
// Array to hold the colors
var buttonColours = ["red", "blue", "green", "yellow"];

// 2.5. At the top of the game.js file, create a new empty array called gamePattern.
// Array to hold the game pattern
var gamePattern = [];

// 4.3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
// Array to hold values of userChosenColour variable
var userClickedPattern = [];

// Hint 7.1. You'll need a variable called started. Within in the JQ from Step 7.1, the started variable needs to be able to toggle to true once the game starts and if it's true, then further key presses should not trigger nextSequence().
var started = false;

// 7.2. Create a new variable called level and start at level 0, i.e. set it to 0.
var level = 0;

// $("document").one *********************************************************************************************

// 7.1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).one("keydown", function () {
  // Hint 7.1. You'll need a variable called started. Within in the JQ from Step 7.1, the started variable needs to be able to toggle to true once the game starts and if it's true, then further key presses should not trigger nextSequence().
  if (!started) {
    // 7.3. The h1 title starts out saying "Press A Key to Start", when the game has started, within in the JQ from Step 7.1, change this to say "Level 0".
    $("#level-title").text("Level " + level);

    nextSequence();
    started = true;
  }
});

// $(".btn").click *********************************************************************************************

// 4.1. Outside of any function, use jQuery to detect when any of the buttons are clicked and trigger a handler function.
// jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  // 4.2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  //var userChosenColour holds the id of the button that got clicked
  var userChosenColour = $(this).attr("id");

  // 4.4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  // Add the contents of the variable userChosenColour to the end of userClickedPattern array
  userClickedPattern.push(userChosenColour);

  // 5.3a. Call playSound() in btn click function with the userChosenColour as a param.
  // Plays sound when user clicks on the button
  playSound(userChosenColour);

  // 6.5. Call animatePress() in btn click function with the userChosenColour as a param.
  // Passes the pressed button to the animatePress()
  animatePress(userChosenColour);

  // 8.2. Call checkAnswer(), in $(".btn").click(function(),   after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  // Call checkAnswer() after the user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
  checkAnswer(userClickedPattern.length-1);

  // 4.4a At this stage, if you log the userClickedPattern you should be able to build up an array in the console by clicking on different buttons.
  // console.log("Button clicked: " + userClickedPattern);
});

// function checkAnswer(currentLevel) *********************************************************************************************

// 8.1. Create a new function called checkAnswer(), it should take one input with the name currentLevel.
// Function to check the answer from the user
function checkAnswer(currentLevel) {

  // 8.3. Write an if statement inside checkAnswer() to check if the most recent user answer (userClickedPatter)
  // is the same as the game pattern (gamerPattern).
  // If so then log "success", otherwise log "wrong".
  // Check if the most recent user answer is the same as the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // 8.4. If the user got the most recent answer right in step 3,
    // then check that they have finished their sequence with another if statement.
    // if the user got the most recent answer right on the check above, then check that they have finished their sequence with another if statement
    if (userClickedPattern.length === gamePattern.length){

      // 8.5. In the second "if statement" from Step 4, call nextSequence() after a 1000 millisecond delay.
      // Call nextSequence() after a 1000 millisecond delay
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    
  } else {

    // 9.1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    // JS to play the sound for if the user choses the wrong colour
    playSound("wrong");

    // 9.2. In the styles.css file, there is a class called "game-over",
    // apply this class to the body of the website when the user gets one of the answers wrong
    // and then remove it after 200 milliseconds.
    // Use jQuery to add the css game-over class once the user gets one of the answers wrong and then remove it after 200 milliseconds
    $("body").addClass("game-over");

    // 9.3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    // Change the h1 title
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // 9.2. In the styles.css file, there is a class called "game-over",
    // apply this class to the body of the website when the user gets one of the answers wrong
    // and then remove it after 200 milliseconds.
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    
    // 10.2. Call startOver() if the user gets the sequence wrong.
    startOver();
    }
}

// function nextSequence() *********************************************************************************************

// 2.1. Inside game.js create a new function called nextSequence()
function nextSequence() {

  // 8.6. Once nextSequence() is triggered, in the  nextSequence() function, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // 7.4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  // 7.5. Inside nextSequence(), update the h1 with this change in the value of level.
  // Hint 7.5.  You'll need to use jQuery again to change the h1 by targeting the id: level-title.
  $("#level-title").text("Level " + level);

  // 2.2. Inside the new function, generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  //   2.4. Inside newSequence(), create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  //   2.6. Inside newSequence(), add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  //   3.1. Use jQuery to select the button with the same id as the randomChosenColour
  //   3.2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // 5.4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);

  // return randomChosenColour;
}

// function animatedPress(currentColour) *********************************************************************************************

// 6.1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {
  // 6.3. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  // 6.4. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// function playSound(name) *********************************************************************************************

// 5.2. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
  // 3.3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  // 5.3. Take the code we used to play sound in the nextSequence() function and move it to playSound().
  // 5.4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function startOver() *********************************************************************************************

// 10.1. Create a new function called startOver().

function startOver() {
  
  // 10.3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}