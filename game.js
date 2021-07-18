var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level=0;
var randomChosenColour = 0;
var started=0;

function nextSequence() {
  level++;
  $("h1").html("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var selectedColour = "#" + randomChosenColour;

  $(selectedColour).fadeOut(100);
  $(selectedColour).fadeIn(100);
  playSound(randomChosenColour);
}

// Event Listener added for Click
$(".btn").click(
  function()
  {
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(this.id);
    playSound(userChosenColour);
    checkAnswer();
  }
)


$(document).keypress(
  function(){
  // if(started==0) {started++;nextSequence();}
  if(started==0){started++;nextSequence();}
  else if(started==-1)
  {
    startOver();
  }
  }

);


function checkAnswer()
{
  var i=userClickedPattern.length-1;
  if(userClickedPattern[i]!=gamePattern[i]){gameOver();}
  else  if(userClickedPattern.length==gamePattern.length) {userClickedPattern=[];setTimeout(nextSequence,1000); }
}


function gameOver()
{
  started=-1;
  $("h1").html("Game Over, Press Any Key to Restart");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(
    function(){$("body").removeClass("game-over");},200
  );
}

function startOver()
{
  started=0;
  level=0;
  gamePattern=[];userClickedPattern=[];
  nextSequence();
}


function playSound(name)
{
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}




function animatePress(currentColour){
  var jCurrentColour='#'+currentColour;
  $(jCurrentColour).addClass("pressed");
  setTimeout(
    function(){
      $(jCurrentColour).removeClass("pressed");
    },100
  );
}
