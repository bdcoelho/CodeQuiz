// set global variables
var timeLeft = 60;
var playerScore = document.querySelector("#score").innerHTML;
var score = 0;
var questionIndex = 0;
var timer;
var responseBox = document.querySelector("#result");
var gameOver = false;

function timerFunction() {
  clearInterval(timer);
  runTimer();
  timer = setInterval(runTimer, 1000);
}

var runTimer = function () {
  function updateScore() {
    var userinput = document.querySelector("#initials").value;
    if (userinput) {
      parseDate();
      var retrieveStorage = localStorage["scoreStore"];
      var quizResults = retrieveStorage ? JSON.parse(retrieveStorage) : [];

      quizResults.push({ ui: userinput, score: score, dmy: today });
      localStorage["scoreStore"] = JSON.stringify(quizResults);
      location.reload();
    } else {
      location.reload();
    }
  }

  if (timeLeft < 1) {
    gameOver = true;
    document.querySelector("#gameContent").style = "display:block";
    document.querySelector("#quizContent").style = "visibility:hidden";
    document.querySelector("#FrontInfoBox").setAttribute("class", "gameOver");
    document.querySelector("#FrontInfoBox").innerHTML =
      "Time's Up! <br> Your Final Score : " + score;

    document.querySelector("#result").style = "visibility:hidden;";
    questionIndex = 0;
    document
      .querySelector("#saveMyScore")
      .setAttribute("class", "default-visible");

    scoreSubmit.addEventListener("click", updateScore, false);
  } else {
    document
      .querySelector("#saveMyScore")
      .setAttribute("class", "default-hidden");
  }

  if (timeLeft > 0) {
    timeLeft--;
  } else {
    clearInterval(timer);
  }

  document.querySelector("#progressBar").value = 60 - timeLeft + 1;
  document.querySelector("#counter").innerText = timeLeft + " seconds";
};

function questionClickFunction() {
  $("#choices").children().attr("disabled", "disabled");

  responseBox.setAttribute("style", "visibility:visible");

  if (this.value !== questions[questionIndex].answer) {
    timeLeft -= 5;

    document.getElementById(this.id).classList.add("apply-shake");
    document.querySelector("#counter").classList.add("explode");

    setTimeout(function () {
      document.querySelector("#counter").classList.remove("explode");
    }, 1000);

    responseBox.setAttribute("class", "incorrect");
    responseBox.textContent = "Wrong!";
  } else {
    responseBox.setAttribute("class", "correct");
    responseBox.textContent = "Correct!";
    score = score + 1;
    document.querySelector("#score").innerHTML = "Score : " + score;
  }

  setTimeout(function () {
    responseBox.setAttribute("style", "visibility:hidden");
  }, 2000);

  questionIndex++;

  if (questionIndex === questions.length) {
    timeLeft = 0;
  } else {
    setTimeout(() => {
      qSelector();
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
  document.querySelector("#FrontInfoBox").setAttribute("class", "no-display");

  document.querySelector("#play-button").setAttribute("class", "no-display");

  gameOver = false;
  score = 0;
  timeLeft = 60;
  var questionIndex = 0;

  document.querySelector("#score").innerHTML = "Score : " + score;
  document.querySelector("#quizContent").style = "visibility:visible";
  document.querySelector("#gameContent").style = "display:none";

  timerFunction();

  qSelector();
}
function qSelector() {
  var currentQuestion = questions[questionIndex];
  var showThisQuestion = questionIndex + 1;
  document.querySelector("#questionNumber").innerText =
    "Question " + showThisQuestion;
  document.querySelector("#question-title").innerText = currentQuestion.title;

  var theChoices = document.querySelector("#choices");
  theChoices.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, i) {
    var theAnswer = currentQuestion.answer;

    var optionElement = document.createElement("button");

    optionElement.setAttribute("value", choice);

    optionElement.setAttribute("type", "button");

    optionElement.setAttribute("class", "btn btn-outline-info");

    optionElement.setAttribute("id", "Btn" + i);

    optionElement.textContent = choice;

    optionElement.onclick = questionClickFunction;

    theChoices.appendChild(optionElement);
  });
}
startGameButton.addEventListener("click", startGame, false);
