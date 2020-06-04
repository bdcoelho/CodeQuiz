// set global variables

var timeLeft = 60;
var questionIndex = 0;
var responseBox = document.querySelector("#result");
var playerScore = document.getElementById("score").innerHTML;
var score = 0;
var gameOver = false;

var timerRunningFunction = function () {
  // Game end time criterion
  // Hide quiz content

  if (timeLeft < 1) {
    gameOver = true;
    document.querySelector("#quizContent").style = "visibility:hidden";
    document.querySelector("#gameContent").style = "display:block";
    document.querySelector("#FrontInfoBox").innerHTML =
      "GAME OVER <br> Your Final Score : " + score;
    document
      .querySelector("#FrontInfoBox")
      .setAttribute("class", "gameOver");
    document.querySelector("#result").style = "visibility:hidden;";
    questionIndex = 0;



    
    document.getElementById("saveScore").style = "visibility:visible";
  }

  if (timeLeft > 0) {
    timeLeft--;
  }

  document.getElementById("progressBar").value = 60 - timeLeft + 1;
  document.getElementById("counter").innerText = timeLeft + " seconds";
};

function timerFunction() {
  timerRunningFunction();
  timer = setInterval(timerRunningFunction, 1000);
}

function rollQuestions() {
  // get current question object from array
  var currentQuestion = questions[questionIndex];
  var showThisQuestion = questionIndex + 1;
  document.getElementById("questionNumber").innerText = "Q" + showThisQuestion;
  document.getElementById("question-title").innerText = currentQuestion.title;

  var theChoices = document.getElementById("choices");
  theChoices.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function (choice, i) {
    // appemd buttons using bootstrap design and move margin slightly left

    // get the correct answer
    var theAnswer = currentQuestion.answer;

    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("value", choice);
    choiceNode.setAttribute("class", "btn btn-light buttonPadding");
    choiceNode.setAttribute("style", "margin:1%;");
    choiceNode.setAttribute("id", "Btn" + i);

    // add choice array data and text content
    choiceNode.textContent = i + 1 + ". " + choice;

    // add trigger to fire off new event
    choiceNode.onclick = questionClickFunction;

    // dump it to the page
    theChoices.appendChild(choiceNode);
  });
}

function questionClickFunction() {
  // ok you've had your fun. now disable to div so you can't have a second shot until the next go.
  $("#choices").children().attr("disabled", "disabled");

  // erm - is it OK?
  responseBox.setAttribute("style", "visibility:visible");
  // pause the timer

  if (this.value !== questions[questionIndex].answer) {
    // nope - not cool - got it wrong.

    timeLeft -= 15;

    // too bad, so sad, you got it wrong. add the nasty shake.

    document.getElementById(this.id).classList.add("apply-shake");
    document.getElementById("counter").classList.add("explode");

    // because javascript is, any element class added and them removed will automatically overide the existing effect. subsequently,
    // a timeout needs to be called to allow the initial effect to occur and then to provide enough time for the class to be removed
    // for next time around.

    setTimeout(function () {
      document.getElementById("counter").classList.remove("explode");
    }, 1000);

    responseBox.setAttribute("class", "incorrect");
    responseBox.textContent = "Wrong!";
  } else {
    responseBox.setAttribute("class", "correct");
    responseBox.textContent = "Correct!";
    score = score + 1;
    document.getElementById("score").innerHTML = "Score : " + score;
  }

  // flash right/wrong feedback on page for half a second

  setTimeout(function () {
    responseBox.setAttribute("style", "visibility:hidden");
  }, 2000);

  // move to next question
  questionIndex++;

  // check if we've run out of questions
  if (questionIndex === questions.length) {
    // not good dave - we have run out of questions - and you said this would never happen...
    timeLeft = 0;
  } else {
    setTimeout(() => {
      rollQuestions();
    }, 2000);
  }
}

function parseDate() {
  var date = new Date();
  var day = date.getDay();
  var month = date.getMonth();
  var year = date.getFullYear();
  today = day + "/" + (parseInt(month) + 1) + "/" + year;
}

function startGame() {
  // check to see if the input field is ready.
  var userinput = document.getElementById("initials").value;

  // check if user has populated the input field

  if (userinput) {
    parseDate();

    // get what we have in storage
    var getStorageInfo = localStorage["browsergame"];
    // if getStorageInfo is not empty then parse json otherwise set as empty array
    var results = getStorageInfo ? JSON.parse(getStorageInfo) : [];

    // otherwise push in the array new results
    results.push({ ui: userinput, score: score, dmy: today });

    // replace by new results
    localStorage["browsergame"] = JSON.stringify(results);
  }

  // set conditions for new game

  gameOver = false;
  score = 0;
  timeLeft = 60;
  var questionIndex = 0;

  document.getElementById("score").innerHTML = "Score : " + score;
  document.querySelector("#quizContent").style = "visibility:visible";
  document.querySelector("#gameContent").style = "display:none";

  timerFunction();

  rollQuestions();
}

// add event listeners

startGameButton.addEventListener("click", startGame, false);

// TODO Submit after enter initials, not play game
