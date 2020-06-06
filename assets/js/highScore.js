function renderTableHS() {
  var retrieveStorage = localStorage["scoreStore"];

  if (retrieveStorage) {
    retrieveStorage = JSON.parse(retrieveStorage);

    var byScore = retrieveStorage.slice(0);

    const topScore = byScore.sort((a, b) => b.score - a.score).slice(0, 10);
    if (byScore.length > 0) {
      byScore.forEach((score) => {
        var userInitials = score.ui;
        var userScore = score.score;
        var gameDate = score.dmy;
        var scoreElement = document.createElement("div");
        scoreElement.innerHTML = userInitials + " ... " + userScore + " ... " + gameDate;
        var substrateList = document.getElementById("hsList");
        substrateList.appendChild(scoreElement);
      });
    } else {
      var scoreElement = document.createElement("div");
      scoreElement.innerHTML = "No high scores ... yet";
      scoreElement.setAttribute("class", "highscores gameoverdahdah");
      var substrateList = document.getElementById("hsList");
      substrateList.appendChild(scoreElement);
    }
  }
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    renderTableHS();
  },
  false
);
