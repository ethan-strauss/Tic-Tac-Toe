/*
  Tic-Tac-Toe help project, version 2
    -- added a timer and start/stop toggle button and functionality
    -- added a winner testing button and functionality
*/





/*
----------------------------------------timer functionality
*/
let timer = null;
let timerStarted = false;
let timerSpan = null; //the span holding the timer button and span
let timerButton = null; //the button that starts/stops the timer
let secondsCount = 0;

function startTimer() {
  timer = setInterval(handleTimer, 1000); //execute handleTimer every 1000ms (1 second)
  timerStarted = true;
  timerButton.innerHTML = "Stop Timer"; //prepare for next time they press the button

} //end startTimer

/*
  This stops AND resets the timer
  You could break that functionality out, right?
*/
function stopTimer() {
  clearInterval(timer); //stop the timer
  timerStarted = false;
  timerSpan.innerHTML = 0; //reset to 0
  secondsCount = 0; //reset to 0
  timerButton.innerHTML = "Start Timer"; //prepare for next time they press the button

} //end stopTimer

/* executes whenever the timer button is pressed */
function handleTimerButton() {
  if (timerStarted) {
    //stop it if it's currently started
    stopTimer();
  } else {
    //start it if it's currently stopped
    startTimer();
  }
}

/* this function is executed each time the timer fires, e.g., every second (1000ms) */
function handleTimer() {
  //update timer in the UI
  secondsCount++;
  timerSpan.innerHTML = secondsCount;
} //end handleTimer


/*
----------------------------------------primary symbol placing functionality
----------------------------------------and winner testing functionality
*/

let ericTurn = true;
const NUM_ROWS = 3;
const NUM_COLS = 3;
const NUM_DIAG = 3;

let gameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]; //end gameBoard 2D array


/*
  Winner test functionality
*/
function testForWinner() {
  //Currently ONLY checks the rows, not columns or diagonals
  //this is because if I did that, there'd be very little left for you...

  let winner = 'N'; //We can use N to mean 'no winner';
  let winnerSpan = document.querySelector('#winner_span');
  /*check rows for winner*/
  for (let i = 0; i < NUM_ROWS; i++) {
    //check each cell across, and if they're equal and NOT empty
    //then someone has won
    if (gameBoard[i][0] !== '' && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]) {
      //who won?
      winner = gameBoard[i][0];
      break; //get out of the loop.  We don't need anymore info, since someone has won
    }
  } //end for to check rows

  /*check cols for winner*/
  //TODO - not implemented yet (that's your job!)
  for (let i = 0; i < NUM_COLS; i++) {
    if (gameBoard[i][0] !== '' && gameBoard[i][0] === gameBoard[i][0] && gameBoard[i][0] === gameBoard[i][0]) {
      winner = gameBoard[i][0];
      break;
    }
  }

  /*check diagonals for winner*/
  //TODO - not implemented yet (that's your job!)
  for (let i = 0; i < NUM_DIAG; i++) {
    if (gameBoard[i][0] !== '' && gameBoard[i][0] === gameBoard[i][2] && gameBoard[i][2] === gameBoard[i][3]) {
      winner = gameBoard[i][0];
      break;
    }
  }
  /*check cat's game (tie) - it's when there's no winner, but the board is full*/
  //TODO - not implemented yet (that's your job!)+

  if (winner === 'E') {
    //winner is Eric
    winnerSpan.innerHTML = "The winner is Eric.";
  } else {
    //winner is John
    winnerSpan.innerHTML = "The winner is John.";
  }
  //more else if(s?) as needed

  //NOTE:  If you play after a winner is discovered, it will allow a "different" winner to be named
  //Again, this project is just an example and does NOT contain everything you would ever want.

}


function handleCellClick(evt) {
  let cellString = evt.target.id;
  let cellArray = cellString.split('_');
  let row = parseInt(cellArray[1]);
  let col = parseInt(cellArray[2]);

  if (ericTurn) {
    //Eric's turn
    if (gameBoard[row][col] == '') {
      gameBoard[row][col] = 'E';
      setImage(row, col, 'E');
    }
  } else {
    //John's turn
    if (gameBoard[row][col] == '') {
      gameBoard[row][col] = 'J';
      setImage(row, col, 'J');
    }
  }

  ericTurn = !ericTurn; //flip turn
} //end handleCellClick

function setImage(row, col, piece) {
  let idString = 'td_' + row + '_' + col;
  let theImage = document.querySelector('#' + idString + ' img');

  if (piece === 'E') {
    theImage.src = 'images/eric1.png';
    theImage.style.width = '150px';
  } else if (piece === 'J') {
    theImage.src = 'images/john1.png';
    theImage.style.width = '150px';
  }

} //end setImage


/*
-------------------------------------- Start Function to trigger when page is finished loading
*/

function start() {

  let cells = document.querySelectorAll('td');
  for (let cell of cells) {
    //console.log(cell);
    cell.addEventListener('click', handleCellClick);
  }

  //timer button - allow the user to start the timer
  timerButton = document.querySelector('#btn_timer'); /* declared "globally" */
  timerButton.addEventListener('click', handleTimerButton);
  timerSpan = document.querySelector('#timer_span');

  //testing for winner
  let btnWinner = document.querySelector('#btn_winner');
  btnWinner.addEventListener('click', testForWinner);
} //end start


window.addEventListener('load', start);