// set global variables

var timeLeft = 60;
var questionIndex = 0;
var responseBox = document.querySelector("#result");
var playerScore = document.querySelector("#score").innerHTML;
var score = 0;
var gameOver = false;
var timer;

var runTimer = function () {
  // Game end time criterion
  // Hide quiz content

  if (timeLeft < 1) {
    gameOver = true;
    document.querySelector("#quizContent").style = "visibility:hidden";
    document.querySelector("#gameContent").style = "display:block";
    document.querySelector("#FrontInfoBox").innerHTML =
      "Time's Up! <br> Your Final Score : " + score;
    document.querySelector("#FrontInfoBox").setAttribute("class", "gameOver");
    document.querySelector("#result").style = "visibility:hidden;";
    questionIndex = 0;
    document.getElementById("saveMyScore").style = "visibility:visible";
  } else {
    document.getElementById("saveMyScore").style = "visibility:hidden;";
  }

  // document.getElementById("saveMyScore").style.visibility="hidden"

  if (timeLeft > 0) {
    timeLeft--;
  } else {
    clearInterval(timer);
  }

  document.getElementById("progressBar").value = 60 - timeLeft + 1;
  document.getElementById("counter").innerText = timeLeft + " seconds";
};

function timerFunction() {
  clearInterval(timer);
  runTimer();
  timer = setInterval(runTimer, 1000);
}

function rollQuestions() {
  var currentQuestion = questions[questionIndex];
  var showThisQuestion = questionIndex + 1;
  document.getElementById("questionNumber").innerText =
    "Question " + showThisQuestion;
  console.log(currentQuestion);
  document.getElementById("question-title").innerText = currentQuestion.title;

  var theChoices = document.getElementById("choices");
  theChoices.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, i) {
    var theAnswer = currentQuestion.answer;

    var choiceNode = document.createElement("button");

    choiceNode.setAttribute("value", choice);

    choiceNode.setAttribute("type", "button");

    choiceNode.setAttribute("class", "btn btn-outline-info");

    choiceNode.setAttribute("id", "Btn" + i);

    choiceNode.textContent = i + 1 + ". " + choice;

    choiceNode.onclick = questionClickFunction;

    theChoices.appendChild(choiceNode);
  });
}

function questionClickFunction() {
  $("#choices").children().attr("disabled", "disabled");

  responseBox.setAttribute("style", "visibility:visible");

  if (this.value !== questions[questionIndex].answer) {
    timeLeft -= 15;

    document.getElementById(this.id).classList.add("apply-shake");
    document.getElementById("counter").classList.add("explode");

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

  setTimeout(function () {
    responseBox.setAttribute("style", "visibility:hidden");
  }, 2000);

  questionIndex++;

  if (questionIndex === questions.length) {
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
  document.querySelector("#FrontInfoBox").setAttribute("class", "no-display");

  document.querySelector("#play-button").setAttribute("class", "no-display");

  var userinput = document.getElementById("initials").value;

  if (userinput) {
    parseDate();

    var getStorageInfo = localStorage["scoreStore"];
    var results = getStorageInfo ? JSON.parse(getStorageInfo) : [];
    results.push({ ui: userinput, score: score, dmy: today });
    localStorage["scoreStore"] = JSON.stringify(results);
  }

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

startGameButton.addEventListener("click", startGame, false);

// TODO Submit after enter initials, not play game
