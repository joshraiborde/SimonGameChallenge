var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatedPress(userChosenColour);
    nextSequence();
    
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).on("click", function(){
        $("." + randomChosenColour).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour)
    })

}

function playSound(name) {
    var audio = new Audio('/sounds/' + name + ".mp3")
    audio.play();
}


function animatedPress(currentColour) {
    $("." + currentColour).addClass("pressed")
    setTimeout(() => {
        $("." + currentColour).removeClass("pressed")
    }, 100);
    
}

$(document).one("keydown", function(event) {
    // alert("first key: " + event.key);
if (!started) {
    $("#level-title").text("Level " + level)
    nextSequence();
    started = true;
}
})

function checkAnswer(currentLevel) {
    
}