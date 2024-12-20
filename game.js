var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userChosenPattern = [];

var level = 0;
var gamestart = false;


$(document).keydown(function() {
    
    if (gamestart === false) {
        nextSequence();
        gamestart = true;
        $("h1").text("Level " + level);
            
    }
  
  });

  $(".btn").click(function() {
         var userChosenColour = this.id;
        animatePress(userChosenColour);
        userChosenPattern.push(userChosenColour);

        playSound(userChosenColour);
        setTimeout(function() {
            animatePress(userChosenColour);
        }, 100);
        
        checkAnswer(userChosenPattern.length);    
});

function checkAnswer(lastIndex) {

    if (userChosenPattern[lastIndex-1] == gamePattern[lastIndex-1]) {
        //Good
        if (userChosenPattern.length === gamePattern.length) {
            
            if (userChosenPattern.length == 5) {
                $("body").addClass("win");
                $("#level-title").text("You win!! Press Any Key to Restart");
                $("#level-title").css("color", "black");
                startOver();
            }
            else {
                setTimeout(function() {
                nextSequence();
            }, 1000);
            }                
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}

function nextSequence() {
    level++;
    userChosenPattern = [];
    

    $("h1").text("Level " + level);

    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playLevel();
}
  


  function flash(name) {
    $("." + name).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(name);
  }



function playSound(name) {
    var sound = new Audio("./sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("."+currentColour).toggleClass("pressed");   
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playLevel() {

    var i = 0;
    var interval = setInterval(function() {
        flash(gamePattern[i]);
        i++;
        if (i === gamePattern.length) {
            clearInterval(interval);
        }
    }, 500);
}


