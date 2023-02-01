//Variable qui me permet de savoir si le jeu commence ou non.
var Started = false

//Variable qui me permet d'augmenter le level et de l'afficher.
var level = 0;

//Tableau qui sauvegarde les clique de l'utilisateur
var userClickedPattern = [];

//Désigner une couleur à mémoriser
var buttonColours = ["red", "blue", "green", "yellow"];

//Coeur même du jeu qui permet d'afficher la couleur à mémoriser
var gamePattern = [];

$(document).keypress(function() {
    if (!Started) {
        $('#level-title').text("level " + level);
        nextsequence();
        Started = true;
    }
});

//Sauvegarde l'id du bouton cliqué
$('.btn').click(function(){

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function nextsequence() {

    userClickedPattern = [];

    //Monter de niveau
    level++;

    //Change le titre du jeu au niveau actuel
    $("#level-title").text("Level " + level);

    //Permet de générer un nombre aléatoire
    var randomNumber = Math.floor(Math.random() * 4);   

    //Permet de désigner le nombre générer aléatoirement à une couleur
    var randomChosenColour = buttonColours[randomNumber];

    //Permet d'ajouter une nouvelle couleur à mémoriser au jeu 
    gamePattern.push(randomChosenColour);

    //Ajoute une animation à la couleur aléatoirement choisis
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //Ajouter un son à la couleur choisis
    playSound(randomChosenColour);
};

//Fonction qui permet de jouer un son suivant si c'est le jeu ou le joueurs qui clique
function playSound(name) {

    var audio = new Audio("/sounds/" + name + ".mp3");
    audio.play();

};

function animatePress(currentColour) {

    $('#' + currentColour).addClass("pressed");

    setTimeout(function(){
    $('#' + currentColour).removeClass("pressed");
    }, 100);
};

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
  

    if(userClickedPattern.length == gamePattern.length) {
        setTimeout(function(){
            nextsequence();
        },1000);
    }
  } else {
    $('body').addClass("game-over");

    setTimeout(function(){
        $('body').removeClass("game-over");
    }, 200);

    var wrong = new Audio("/sounds/wrong.mp3");
    wrong.play();

    $("#level-title").text("GAME OVER, press any key to restart");
    
    startOver()
  };
};

function startOver() {
    level = 0
    gamePattern = []
    Started = false
}