// This code creates an object containing the optional responses for the winning choice

/*
 * You're off to a great start, you definitely have the capacity to quickly jump
 * to the next level. I'm going to do everything I can to make sure you get there!
 * So I'm going to really push you.
 * Pay attention to the details like code formatting - YES it matters that much
 * Hi quality formatting is like a really slick ad on TV, its the first impression!
 * and says you care about your code.
 */

/* 
 * I'm going to add comments directly to this code and then I'm going to create a new
 * branch with the code updated.
 * Start making sure you code structure is tight (whitespace, consistency) 
 * add spaces after a comma in an array [0, 1, 2] (consistency)
 * Choose single or double quote not both! (consistency)
 * To help with this I'm going to add jshint (eslint is for newer javascript es2015) to your project
 * http://jshint.com/
 * http://eslint.org/
 * It helps with code quality by telling you when you have errors or issues
 * You should always use this as it helps identity a lot of common bugs
 * and general code quality issues. There are plugins for most editors
 * so just google jshint and your editor for instance: jshint sublime
 * for installation.
 * Either use semicolons or don't (consistency)
 * 
 * We can also use a js prettifier which formats the code for consistency
 * This is one approach: https://medium.com/@brindelle/format-your-javascript-with-prettier-before-committing-177079ec356a
 * Find others! Sublime has prettifier extensions as well as all the other IDEs
 * This stuff really matters to programmers be extra vigilent about it.
 * Its the difference between looking junior and more professional.
*/

var prize = {
  award: ['diamonds','gold','money'],
  msg: ["You are entitled to all the ", " you can carry."],
  
  /*
   * whitespace alignment, var winMsg and the lines below it
   * add space after function arguments function() {}
   * why this.msg[1]? and not this.msg[x]?
   * what happens if x is outside of the bounds of the array???
   * thats a fatal error. Check to make sure x < prize.length
   * is x a zero based index?? make sure you're passing in 
   * either zero based number or 1 based in which case you have
   * to go (x - 1) for instance
   * award[x - 1], msg[x - 1]
   */ 
  giveGift: function(x){
              var winMsg = "";

                winMsg = this.msg[0] + this.award[x] + this.msg[1];
               return winMsg;
  }
} 

/* 
 * This sort of pure function captures the winning responses, allowing for future usage
 * add space after function arguments function() {}
 * pass in the prize! That way you aren't relying on a global prize
 * what happens if you want to switch prizes later? If you pass in the 
 * the prize to this function then you can change that easily.
 * The prize should have a common "interface". Meaning any new prize
 * has the same public properties/methods - this is a contract
 * and the interface enforces the idea that you can swap in any Prize object
 * because the interface is the same.
 * 
 * Prize Interface (publicly available properties every Prize should have)
 * prize.award
 * prize.msg
 * prize.giveGift
 * 
 * announce(prize, x);
 * 
 * Now you can pass in any prize and it just works! Maybe depending on the user
 * They get a different prize object but of-course it has the same interface
 * Now we aren't using real interfaces liked you'd see in Java but we are using
 * that principle. We're relying on duck typing (look this up)
 * assuming all 3 properties are there we can assume our object is a prize
 * 
 */
function announce(x){
  return  prize.giveGift(x);
}

// -------------------------------------------------------------------------------------

// code below is the initialization of the game. It handles user interactivity
/*
 * This is using a huge callback function! Thats a "code smell"
 * Its likely that function is doing many things. Your function
 * Should be doing 1 thing well!
 * Because of this this code is really fragile
 * It can' be extended easily (extensibility)
 * Its hard to reason about what it does
 * It handles instructions
 * It handles input
 * It handles game state
 * So all these things are linked
 * Start off rely simply and add functions that do 1 thing
 * 
 * 
 * 1 function that takes input from user
 *   based on user input call next function
 * 1 function for showing instructions
 * 1 function for hiding instructions
 * 1 function to toggle between showing and hiding instructions (optional! not sure you want to)
 * 1 game state object if you're going to save state, this is debatable if you need to
 *    var user = {
 *      guesses: [],
 *      currentGuess: null,
 *    }
 * 1 function to set user state (every guess update state)
 * 1 function to show answer response
 * 
 * 
 * 
 * OK I'm going to stop here since most of the issues I see are related to 
 * really big do all functions. I think what you did was start programming
 * without first defining all the parts, so you ended up duct taping things together
 * create really small simple functions and build the app from those
 * I should be able to clearly see a function for each part.
 * 
 */ 
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