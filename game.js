var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "yellow", "green", "blue"];
var buttonSounds = {};
var userChosenColour;
var level = 0;
var clickSound;

function main() {
    initiateButtons();
    gameStart();
}

function nextSequence() {
    var randomChosenColour;
    level++;
    $("#level-title").text("Level: " + level);
    randomChosenColour = buttonColours[Math.floor(Math.random() * Math.floor(4))];
    gamePattern.push(randomChosenColour);
    for (let i = 0; i < gamePattern.length; i++) {
        // figure out why it doesn't show everything in the pattern or not correctly
        setTimeout(function() {
            handleClick($("." + gamePattern[i]));
            userClickedPattern = [];
            }, 200 + i*300);
    }

}

function initiateButtons() {
    for (let i = 0; i < buttonColours.length; i++) {
        buttonSounds[buttonColours[i]] = new Audio("sounds/" + buttonColours[i] + ".mp3");
        $("." + buttonColours[i]).on('click', function(){
            handleClick($(this));
            checkPlay($(this));
        })
    }
    buttonSounds["wrong"] = new Audio("sounds/wrong.mp3");
}

function gameStart() {
    $(document).on("keypress", function(event) {
        if (level === 0 ) {
            console.log("Keypress next sequence");
            nextSequence()
        }
    })
}

function handleClick(btn) {
    clickSound = buttonSounds[btn.attr("id")];
    userChosenColour = btn.attr("id");
    userClickedPattern.push(userChosenColour);
    btn.addClass("pressed");
    setTimeout(function() {
        btn.removeClass("pressed");
    }, 100);
    clickSound.currentTime = 0;
    clickSound.play();
}

function checkPlay(btn) {
    if (level > 0) {
        console.log(gamePattern + " - " + userClickedPattern);
        for (var i = 0; i < userClickedPattern.length; i++) {
            if (userClickedPattern[i] !== gamePattern[i]) {
                endGame();
            } else if (i === gamePattern.length - 1) {
                nextSequence();
            }
            console.log("Right colour");
        }
    }
}

function endGame() {
    $("#level-title").text("You lost at level " + level + " press any key to restart");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    buttonSounds["wrong"].currentTime = 0;
    buttonSounds["wrong"].play();
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStart();
}

main();