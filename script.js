 // Create an array of questions and define it as a variable. do this by making the questions an array with each question an object as below. You can format the correct answer to match the text string or the array number. The array is below.
var questionPool = [
  {
    question: "What does HTML stand for?",
    answers: ["hippo thomas moxie lengua", "hype trumps Mike's lunch", "hyper text markup language", "higgle tiggle miggle liggle"],
    correctAnswer: "hyper text markup language"
  },
  {
    question: "What does CSS stand for?",
    answers: ["cranium skull smasher", "cereal swiss shark", "chubby single selfies", "cascading style sheets"],
    correctAnswer: "cascading style sheets"
  },
  {
    question: "What's the best way to implement CSS?",
    answers: ["external stylesheet", "inline", "style tag", "send thoughts and prayers"],
    correctAnswer: "external stylesheet"
  },
  {
    question: "How does a for loop start?",
    answers: ["for (i = 0; i < 1; i++)", "4 (888) = 8", "if (function) repeat for (loop)", "for x = y, z"],
    correctAnswer: "for (i = 0; i < 1; i++)"
  },
  {
    question: "What do you use a for loop for?",
    answers: ["Nothing, really", "repeating a function for a given number of iterations", "Defining multiple variables at once", "Applying your style sheet to new elements"],
    correctAnswer: "repeating a function for a given number of iterations"
  },
  {
    question: "How do you ask the computer to check if something is equal to something else?",
    answers: ["=", "equals", "===", "is ="],
    correctAnswer: "==="
  }
]

//create a score variable that starts at 0
var score = 0;
//create a question index variable and start it at 0
var questionIndex = 0;
//create a variable for the number of seconds we start with, and to be the number of seconds we have left
var time = 60;


// This line creates a $timer variable equal to the html element ID'd "timer". Putting a $ before elements in javascript when not using jquery still helps you "tag" that element within your javascript, a heplful trick. 
var $timer = document.querySelector("#timer");
// Here's one for the scorebox.
var $scorebox = document.querySelector("#scorebox");
$scorebox.textContent = score;

// create a timer variable and set an interval  
var timer = setInterval(function(){
  //that makes it equal to "time" then subtracts a second every 1000 milliseconds
  time--;
  //and changes the text content of the html element id'd as time to be equal to our "time" variable. It might be easier to organize this if you ID html elements as "HTMLtimer" and such so that it will be less confusing to refer to them here (using $ in variables is meant to help with that).
  $timer.textContent = time;
  // clears the interval when the time is zero, which is the best way to stop the timer. Also fires the endGame function.
  if (time <= 0){
    clearInterval(timer);
    endGame();
  } 
  //the number after the closing brackets determines the number of milliseconds in the interval defined at the beginning of this function.
}, 1000)


// this function will produce our questions and answers in their respective divs.
function renderQuestion() {
  //create a variable for our position in the question pool, this will cause it to move with the questionIndex variable
  var currentQuestion = questionPool[questionIndex];
  //creates a $question variable that will attach to the #question element in the html
  var $question = document.querySelector("#question");
  //creates a $answers variable that will attach to the #answers element in html
  var $answers = document.querySelector("#answers");
  // set the text content of the element id'd "question" to the questionIndex'th question from the question pool
  $question.textContent = questionPool[questionIndex].question;
  // set the inner html of the element id'd "answers" to a blank space to which we can append the answer text in our for loop below
  $answers.innerHTML = "";

  //here's the for loop to display the answers under each question and turn them into buttons.
  for (let i = 0; i < currentQuestion.answers.length; i++) {
    var $btn = document.createElement("button");
    $btn.textContent = currentQuestion.answers[i];
    $btn.setAttribute("class", "btn btn-dark ml-3");
    $btn.setAttribute("style", "margin-top:16px; margin-right:16px; margin-bottom:16px");
    $answers.append($btn);
    
  }; //close for loop
}; //close renderQuestion function

//creates an endGame function that makes the questions and answers hidden
function endGame() {
  document.querySelector("#question").setAttribute("style", "visibility:hidden");
  document.querySelector("#answers").setAttribute("style", "visibility:hidden");
};


document.querySelector("#answers").addEventListener("click", function (e){
  if (!e.target.matches("button")) return;
  var userAnswer = e.target.textContent;
  
  if (userAnswer === questionPool[questionIndex].correctAnswer) {
    score++;
    document.querySelector("#scorebox").textContent = score;
  } else {
    time = time - 5;
  }
  
  if (questionIndex >= questionPool.length) {
    //out of questions end game
    alert("game over")
  } else {
    questionIndex++;
    renderQuestion();
  }
});

document.querySelector("#highScoresLink").addEventListener("click", function() {
  clearInterval(timer);
  var $timer = document.querySelector("#timer")
  $timer.textContent = "game over";
  endGame();
});


// this tells the renderQuestion function to fire as soon as the page loads.
renderQuestion();

//PSEUDOCODE

//take time away fif question is answered wrong:

//set an end game function that shows the total score
