var buttonColours = ["red", "blue", "green", "yellow"];

//stores player's selection
var userClickedPattern = [];

//stores CPU's selection
var gamePattern = [];

//Level variable
var level = 0;


$(".btn").click(function() {

  //Fetches the clicked button's id
  userChosenColour = $(this).attr("id");

  //Pushes the selected colour in player's selection array
  userClickedPattern.push(userChosenColour);

  //Play and animate player's selected button
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //Call checkAnswer function to check if the last selected response if right or not
  checkAnswer(userClickedPattern.length - 1);
});


//Used to check if it's a new game or not
$(document).keypress(function() {

  //if gamePattern array's length is 0 that means game hasn't begin yet
  if (gamePattern.length == 0) {

    $("#level-title").text("Level " + level); //changes the h1 heading
    nextSequence();//begins the game
  }
});

//Used to play sounds based on button color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Plays computer generated steps
function nextSequence() {

  userClickedPattern = [];//user pattern set back to empty

  var randomNumber = Math.floor(Math.random() * 4);//Line 42-45 selects a random number and then a random colour
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);//pushes it to the CPU array

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);//animate press
  playSound(randomChosenColour);//playSound of the button

  level += 1;//increment the level
  $("#level-title").text("Level " + level);//changes the level heading to the corresponding level
}

//Used to animate the clicked button
function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");//sets the "pressed" class to the selected button

  //removes "pressed" class after 100ms
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

//Used to check answers
function checkAnswer(currentLevel) {

  //If the last button clicked matches with the CPU's pattern
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    //console.log("Success");
    //If this is the end of user's selection-> plays next sequence after 1s
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    //Plays wrong audio
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    //Changes class to "game-over" and prompts to restart game
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

//Reset the game or Start Over in case of wrong answer
function startOver() {
  level=0;//reset level
  gamePattern=[];//reset player's selection
}
