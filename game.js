var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "yellow", "green", "blue"];
var buttonSounds = {};
var userChosenColour;

function main() {
    initiateButtons();
}

function nextSequence() {
    var randomChosenColour = buttonColours[Math.floor(Math.random() * Math.floor(4))];
    gamePattern.push(randomChosenColour);
    $("." + randomChosenColour).click();
    userClickedPattern = [];
}

function initiateButtons() {
    var clickSound;
    for (let i = 0; i < buttonColours.length; i++) {
        buttonSounds[buttonColours[i]] = new Audio("sounds/" + buttonColours[i] + ".mp3");
        $("." + buttonColours[i]).on('click', function() {
            clickSound = buttonSounds[buttonColours[i]];
            userChosenColour = buttonColours[i];
            userClickedPattern.push(userChosenColour);
            var self = $(this);
            self.addClass("pressed");
            setTimeout(function() {
                self.removeClass("pressed");
            }, 100);
            clickSound.currentTime = 0;
            clickSound.play();
        })
    }
    buttonSounds["wrong"] = new Audio("sounds/wrong.mp3");
}

main();