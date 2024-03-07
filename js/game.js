//Oyun bittikten sonra oyunun yeniden başlaması için butona tıklandığında sıfırlayan fonksiyon
function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  winnerAreaElement.innerHTML =
    'You won <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = "none";

  gameFieldIndex = 0;
  for(let i = 0; i<3; i++){
    for (let j = 0; j <3; j++) {
        gameData[i][j] = 0;
        const gameFieldItemElement = gameFieldElements[gameFieldIndex];
        gameFieldItemElement.textContent = '';
        gameFieldItemElement.classList.remove('disabled');
        gameFieldIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  } //iki kullanıcı içinde kullanıcı adlarının girildiğini kontrol etmek için bir if bloğu oluşturduk.
  
  activePlayerNameElement.textContent = players[activePlayer].name; //oyun başladığında sıranın kimde olduğunu ekrana yazar
  gameAreaElement.style.display = "block";
}

//Oyuncular arasında geçiş yapmamızı sağlayan fonksiyon
function switchPlayers() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name; //dinamik olarak sıranın kimde olduğunu ekrana yazar
}

//Kullanıcının oyun alanına tıkladığı zaman sembolünü koyan fonksiyon
function selectGameField(event) {
  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty fields!");
    return;
  }
  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  //console.log(gameData); -> Kontrol

  // winnerId = 0 durumunda çalışır
  const winnerId = checkForGameOver();

  //winnerId != 0 durumunda çalışır ve kazanan ismi gösterir.
  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;

  switchPlayers();
}

function checkForGameOver() {
  // Satırların (row) eşitliğini kontrol etmek için kullanılan döngü
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  // Sütunların (col) eşitliğini kontrol etmek için kullanılan döngü
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  //Çapraz sol üstten sağ alta kontrol
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  //Çapraz sol alttan sağ üste kontrol
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerId) {
  if (winnerId > 0) {
    gameOverElement.style.display = "block";
    winnerPlayerElement.textContent = players[winnerId - 1].name;
  } else {
    gameOverElement.style.display = "block";
    winnerAreaElement.textContent = "It's a draw!";
  }
}
