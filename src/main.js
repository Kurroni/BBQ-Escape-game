'use strict'

function buildDom(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.children[0];
}

// Runs on initial start and contains calls all other functions that manage the game
function main() {
  var game; // instance of the Game
  var splashScreen; // Start Screen
  var gameOverScreen;


  // -- splash screen

  function createSplashScreen() {
    splashScreen = buildDom(`
    <main class="start-container">
      <h1 class="start-header">BigBaQyard Escape</h1>
      <button class="start-button">Start</button>
    </main>
        `);
    document.body.appendChild(splashScreen);

    var startButton = splashScreen.querySelector('button');

    startButton.addEventListener('click', startGame);
  };

  function removeSplashScreen() {
    splashScreen.remove();
  };


  // -- game screen

  function createGameScreen() {
    var gameScreen = buildDom(`
        <main class="game container">
        <h1 class="game-screen-title">BBQ Escape</h1>
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
    return gameScreen;
  };

  function removeGameScreen() {
    game.removeGameScreen();
  };


  // -- game over screen


  function createGameOverScreen(score) {
    gameOverScreen = buildDom(`
        <main class="game-over">
          <h1>Game over</h1>
          <p>Your score: <span></span></p>
          <button class="btn-restart">Restart</button>
        </main>
      `);

    var button = gameOverScreen.querySelector('button');
    button.addEventListener('click', startGame);

    var span = gameOverScreen.querySelector('span');
    span.innerText = score;

    document.body.appendChild(gameOverScreen);
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

    game = new Game();
    game.gameScreen = createGameScreen();

    game.start();
    // End the game
    game.passGameOverCallback(function () { // <-- UPDATE
      gameOver(game.score); // <-- UPDATE
    }); //	<-- UPDATE
  }

  function gameOver(score) {

    removeGameScreen();
    createGameOverScreen(score);
  }


  // -- initialize Splash screen on initial start
  createSplashScreen();
}

// Runs the function `main` once all resources are loaded
window.addEventListener('load', main);