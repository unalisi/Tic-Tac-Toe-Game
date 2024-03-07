const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;

const players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    },
];

//Kullanıcı edit bölümü açılması için gerekli elemanların seçilmesi
const playerConfigOverlayElement = document.getElementById("config-overlay");
const backDropElement = document.getElementById("backdrop");

//form elemanını seçme
const formElement = document.querySelector("form");

//Hata yazdıracağımız elemanı seçme
const errorsOutputElement = document.getElementById("config-errors");

// Oyuncu edit butonlarını seçme
const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player-2-btn");
const cancelConfigBtnElement = document.getElementById("cancel-config-btn");

//Oyun başlatma butonunu ve oyun alanını seçme
const startNewGameBtnElement = document.getElementById('start-game-btn');
const gameAreaElement = document.getElementById('active-game');

//Oyun tahtasındaki tüm li etiketlerini yani oyun karelerini seçme
const gameFieldElements = document.querySelectorAll('#game-board li');

//Aktif seçim yapacak oyuncuyu seçme
const activePlayerNameElement = document.getElementById('active-player-name');

//Oyun bittiği zaman gözükecek html öğesini seçme
const gameOverElement = document.getElementById('game-over');

//Kazanan oyuncunun adının gözükeceği HTML elemanını seçme
const winnerAreaElement = document.getElementById('winner-area'); //Yazının görüneceği bütün alanı seçme
const winnerPlayerElement = document.getElementById('winner-name'); //Oyuncu adı

// Seçilen edit butonlarına EventListener ile görev atama
editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);

//Cancel butonu ile kullanıcı düzenleme ekranını kapatmak
cancelConfigBtnElement.addEventListener("click", closePlayerConfig);

//Kullanıcı düzenleme ekranında boşluğa tıklayınca ekranı kapatma
backDropElement.addEventListener("click", closePlayerConfig);

//forma EventListener ile görev atama
formElement.addEventListener("submit", savePlayerConfig);

//Oyun başlatma butonuna görev atama
startNewGameBtnElement.addEventListener('click', startNewGame);

for( const gameFieldElement of gameFieldElements ){
    gameFieldElement.addEventListener('click', selectGameField)
}
