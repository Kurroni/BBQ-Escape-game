"use strict";

function buildDom(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString;
  return div.children[0];
}

// Runs on initial start and contains calls all other functions that manage the game
function main() {
  var game; // instance of the Game
  var splashScreen; // Start Screen
  var gameOverScreen;
  var playersName;
  var toLeaderboard = [];
  var scorePlayer;

  // -- splash screen

  function createSplashScreen() {
    splashScreen = buildDom(`
    <main class="start-container">
    <img class="redneck-start" src="../img/red+fork (1)Right.blured.png">
      <h1 class="start-header">
      <img src="https://fontmeme.com/permalink/191105/66b052c755e75bdf937aa1d462c49024.png" alt="hungry-hungry-hippos-font" border="0"></h1>
      <div class="rules-container">
      <div class="run">
        <p>
          run:
        </p>
        <i class="fas fa-chevron-left"></i>
        <i class="fas fa-chevron-right"></i>
      </div>
      <div class="thumb-up">
        <i class="far fa-thumbs-up">:</i>
        <img src="./img/ketchup.png" alt="">
      </div>
      <div class="thumb-down">
        <i class="far fa-thumbs-down">:</i>
        <img src="./img/redneck cut.png" alt="mad redneck character">
        <img class="terrier" src="./img/bull terrier.png" alt="bullterrier">
      </div>
      </div>
      <input class ="name-input" type="text" id="name" name="name"
      placeholder="Put your name here"/>
      <button class="start-button">run!</button>
         </main>
           `);
    document.body.appendChild(splashScreen);



    var startButton = splashScreen.querySelector("button");

    startButton.addEventListener("click", startGame);
  }

  function removeSplashScreen() {
    splashScreen.remove();
  }

  // -- game screen

  function createGameScreen() {
    var gameScreen = buildDom(`
    <main class="game container">
    <h1 class="game-screen-title">BBQ Escape of<p class="game-player-name"></p></h1>
    <header>
    <div class="lives">
    <span class="label">Lives:</span>
    <span class="value"></span>
    </div>
    <div class="score">
    <span class="label">Score:</span>
    <span class="value"></span>
    </div>
        </header>
        <div class="canvas-container">
        <canvas></canvas>
        </div>
      </main>
      `);
    document.body.appendChild(gameScreen);

    var gamePlayerName = document.querySelector('.game-player-name');
    gamePlayerName.innerHTML = playersName;

    return gameScreen;

  }

  function removeGameScreen() {
    game.removeGameScreen();
  }

  // -- game over screen

  function createGameOverScreen(score) {
    gameOverScreen = buildDom(`
        <main class="game-over">
          <h1>You've been eaten!</h1>
          <div class="player-score.container"><p class="game-player-name"></p><br><p>Your score is:</p><span></span></div>
          <div class = "leaderboardcontainter">
            <div>
              <ol class = "leaderboardlist" id = "name">
                <header>Top Players</header>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
              </ol>
            </div>
            <div>
              <ol class = "secondleaderboardlist" id = "score">
                <header>Score</header>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
                  <li>________</li>
              </ol>
            </div>
          <button class="btn-restart">try again</button>
        </main>
        <footer>
        <div>Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
        </footer>
      `);



    var button = gameOverScreen.querySelector("button");
    button.addEventListener("click", startGame);

    var span = gameOverScreen.querySelector("span");
    span.innerText = score;

    document.body.appendChild(gameOverScreen);
    setLeaderboard(toLeaderboard);

    var gamePlayerName = document.querySelector('.game-player-name');
    gamePlayerName.innerHTML = playersName;
  }

  function removeGameOverScreen() {
    if (gameOverScreen !== undefined) {
      gameOverScreen.remove();
    }
  }

  // -- Setting the game state

  function startGame() {
    removeSplashScreen();
    removeGameOverScreen();

    playersName = splashScreen.querySelector('.name-input').value;
    if (playersName == '') {
      playersName = 'the guest';
    }

    game = new Game();
    game.gameScreen = createGameScreen();

    game.start();
    // End the game
    game.passGameOverCallback(function () {
      // <-- UPDATE
      gameOver(game.score);
      updateScore(); // <-- UPDATE
    }); //	<-- UPDATE
  }

  function gameOver(score) {
    removeGameScreen();
    createGameOverScreen(score);

    playersName = splashScreen.querySelector('.name-input').value;
    if (playersName == '') {
      playersName = 'the guest';
    }
  }
  //below Griffith's code for leader board
  function updateScore() {
    var lastPlayer = {
      name: name,
      score: scorePlayer
    };
    var scoreString = localStorage.getItem('score');
    if (!scoreString) {
      var scoreArray = []
      scoreArray.push(lastPlayer);
      var leaderboardString = JSON.stringify(scoreArray);
      localStorage.setItem('score', leaderboardString);
    } else if (scoreString) {
      var scoreArray = JSON.parse(scoreString);
      scoreArray.push(lastPlayer);
      var leaderboardString = JSON.stringify(scoreArray);
      localStorage.setItem('score', leaderboardString);
      var test = localStorage.getItem('score');
      var testagain = JSON.parse(test);
      toLeaderboard = testagain;
    }
  }

  function setLeaderboard(array) {
    array.sort(compare);

    function compare(a, b) {
      if (a.score > b.score) {
        return -1;
      }
      if (a.score < b.score) {
        return 1;
      }
      return 0;
    }
    var nameList = document.querySelector('#name');
    var scoreList = document.querySelector('#score');
    let nam = nameList.querySelectorAll('li');
    nam.forEach(function (element, index) {
      if (array[index]) {
        element.innerHTML = array[index].name;
      }
    })
    let scr = scoreList.querySelectorAll('li');
    scr.forEach(function (element, index) {
      if (array[index]) {

        element.innerHTML = array[index].score;
      }
    })
  }


  // -- initialize Splash screen on initial start
  createSplashScreen();
}

// Runs the function `main` once all resources are loaded
window.addEventListener("load", main);