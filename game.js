var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    
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
