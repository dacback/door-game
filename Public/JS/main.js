// This code creates an object containing the optional responses for the winning choice

var prize = {
  award: ['diamonds','gold','money'],
  msg: ["You are entitled to all the ", " you can carry."],
  
  giveGift: function(x){
              var winMsg = "";

                winMsg = this.msg[0] + this.award[x] + this.msg[1];
               return winMsg;
  }
}

// This sort of pure function captures the winning responses, allowing for future usage
function announce(x){
  return  prize.giveGift(x);
}

// -------------------------------------------------------------------------------------

// code below is the initialization of the game. It handles user interactivity
var beginGame = (function (){
  alert(sayRules());

  var question ="Yes or No, do you want see instructions again?";
  var enterGuess = "Enter number between 0 - 10 for Door";
  
  var initResponse = prompt(question, "").toLowerCase();
  
  if(initResponse === "yes"){
      alert(sayAgain());
  } 
  
  var allGuess = [];

// Frequency below establishes a limit/control for the number of inputs. In this case 3 entries 
  var frequency = [1,2,3];
  for(var i = 0; i < frequency.length; i++){

// Code below grants player two chances to input properly formatted entries     
    var pGuess = prompt(enterGuess + frequency[i],"");
    if (isNaN(pGuess) || pGuess == 'undefined'){
      alert("You did not enter a number. Please try again. Enter number between 0 - 10"); 
        pGuess = prompt(enterGuess + frequency[i],"");
        if(isNaN(pGuess) || pGuess == 'undefined' || pGuess < 0){
                  alert('Sorry, the game has been terminated. Please try again')
          
          if(isNaN(allGuess[i])){
              allGuess.length = 0;
            i = frequency.length;
              }
        }

        } else if( pGuess > 9 || pGuess < 0){
      alert("You entered " + pGuess + ". Please enter number between 0 - 10");
        pGuess = prompt(enterGuess + frequency[i],"");
        if(pGuess < 0 || isNaN(pGuess) || pGuess == 'undefined'){
                  alert('Sorry, the game has been terminated. Please try again')
          
          if(isNaN(allGuess[i])){
              allGuess.length = 0;
            i = frequency.length;
              }
        }
        } 
        pGuess = parseInt(pGuess);
      allGuess.push(pGuess);
  }

// code below terminates game if entries are not integers. I.e. one or more is NaN
  if(allGuess.indexOf(NaN) >= 0){
    console.log(allGuess);
    allGuess.length = 0;

    if(allGuess.length === 0){
      alert('Sorry. The Game was terminated due to input error. Please try again');
      return;
    }
  }

    return allGuess;
})();

// -------------------------------------------------------------------------------------

doorPrize(beginGame);
// code below sets the logic to compare user input vs random number guess.
function doorPrize (guess1,guess2,guess3){
  var numEntered = [];
    numEntered.push(guess1,guess2,guess3);
    console.log(numEntered + ' Player guess at the top');

// this code parseInt's guess number enter in case user enters a string vs an integer
  var allGuessNums = numEntered.map(function(item){
    return parseInt(item);
    });

// this code captures the 3 random numbers from the random number generator function
    var randomNums = setThreeRandomNums();
    console.log(randomNums + ' Random #s at the top');

// code below sets the loop limit
    var len = Math.max(allGuessNums.length, randomNums.length);
    var matchNums = [];
    var playerGuess = "";
    // var door = "";
 
// code below compares values in both arrays, position by position   
    for (var i = 0; i < len; i++) {
      if(allGuessNums[i] === randomNums[i]) {
        playerGuess = allGuessNums[i];
        matchNums.push(playerGuess);
        // door = ("door" + (i+1));
    }

      var matchLens = matchNums.length;
      var prize = "";
      var winResponse = "";
      var wrongResponse = "";
    
      if(matchLens === 3){

// this code sets the Prize message from the announce Fn (pure function) above
          prize = announce(0);
          
          winResponse = ("Fantastic!. You are indeed a savant. You correctly guess the right number for each door.");
          alert(winResponse);
          alert(prize);
          
      } else if(matchLens === 2){
  
        prize = announce(1);
        
        winResponse = ("Very good. You are a wise man. You correctly guess 2 numbers.");
        alert(winResponse);
        alert(prize);
        
      } else if (matchLens === 1){
  
        prize = announce(2);
        
        winResponse = ("Congratulations. You are a lucky man. You correctly guess 1 number.");
        alert(winResponse);
        alert(prize);
      
      } else {
        wrongResponse = ("Sorry, for you apparently chose unwisely. Your soul belongs to me.");
        alert(wrongResponse);
      }
      console.log(randomNums + ' Random #s at end of codeblock');
      console.log(playerGuess + ' #s picked at end of codeblock');
      console.log(matchNums + ' Number of right answers at end of codeblock');

      return;
    }
}

// -------------------------------------------------------------------------------------
// code below is the random number generator logic
function setThreeRandomNums(){
  var initialArr = ["door1","door2","door3"];
  var guessArr = [];
  var guess = "";
    for(var i = 0; i < initialArr.length; i++){
        guess = Math.floor(Math.random()*10);
        guessArr.push(guess);
  } 
  return guessArr;
}

// -------------------------------------------------------------------------------------

// code below tells the story and instructions for the game.
function sayRules(){
  var rules = ("Welcome savant. There are 3 doors before you. Your challenge is to guess a number between 0 - 9 " +
    "for Door #1, #2 and #3." + "\nIf you guess ALL three numbers correctly, you are entitled to all the " +
    "Diamonds you can carry. " + "\nIf you guess 2 of 3 numbers you are entitled to all the Gold you can " +
    "carry. If you only guess 1 number correctly, you are entitled to all the money you can carry " + "\nIf you fail " +
    "to guess any correctly, I'm entitled to your soul!" +  "\nYou have one chance to make the right " +
    "choice. \nChoose wisely");
    return rules;
}

function sayAgain(){    
  var repeat = ("Again, There are 3 doors before you. Your challenge is to guess a number between 0 - 9 " +
    "for Door #1, #2 and #3." + "\nIf you guess ALL three numbers correctly, you are entitled to all the " +
    "Diamonds you can carry. " + "\nIf you guess 2 of 3 numbers you are entitled to all the Gold you can " +
    "carry. If you only guess 1 number correctly, you are entitled to all the money you can carry " + "\nIf you fail " +
    "to guess any correctly, I'm entitled to your soul!" +  "\nYou have one chance to make the right " +
    "choice. \nChoose wisely");
  return repeat;
}