//Edit butonlarına basıldığı zaman çağrılan ve kullanıcı bilgisi düzenleme ekranını açmamızı sağlayan fonksiyon
function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid;
  playerConfigOverlayElement.style.display = "block";
  backDropElement.style.display = "block";
}

//Kullanıcı düzenleme ekranını kapatan cancel butonunu çalıştıran fonksiyon
function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backDropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error"); //error classını silmemize yarar
  errorsOutputElement.textContent = ""; //hata mesajını ekrandan temizlememize yarar
  document.getElementById("playername").value = ""; //ilk kullanıcı girişinden sonra ikinci kullanıcı adı girilirken iinput içeriğini temizlememize yarar
}

function savePlayerConfig(event) {
  event.preventDefault(); //HTTP istek göndermeyi engellemek için kullanırız. Confirm -> butonuna basıldığında formu göndermez.
  const formData = new FormData(event.target); //FormData formlarla alakalı JS'de tanımlı bir nesnedir.
  const enteredPlayerName = formData.get("username").trim(); //input alanında kullanıcı adını hedef alır verdiğimiz name değerini burda gireriz ve onu tutar. trim() -> Boşluklardan kurtulmamızı sağlar boşlukları siler. Burada isim girildiğinden emin olmak için kullanırız. '   Max   ' -> 'Max' olarak alır.

  //console.log(enteredPlayerName); //Girdinin doğru gelip gelmediğini kontrol etmek için console'a yazdırabiliriz.

  //kullanıcı adını doğrulamak için kurduğumuz kontrol yapısı
  if (!enteredPlayerName) {
    // enteredPlayerName === ' '
    event.target.firstElementChild.classList.add("error"); //Hata mesajına CSS eklemek için kullanırız
    errorsOutputElement.textContent = "Please enter a valid name!";
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  ); //Dinamik olarak çalışan hangi kullanıcının girildiyse onu seçmemizi sağlayan değişken
  updatedPlayerDataElement.children[1].textContent = enteredPlayerName; //Kullanıcı adının yazdığı h3 tagini seçen ve girilen ismin atamasını yaptığımız yer.

  // if (editedPlayer === 1) {
  //   players[0].name = enteredPlayerName;
  // }else{
  //   players[1].name = enteredPlayerName;
  // }  bu if else yapısı yerine daha dinamik bir şekilde aşağıdaki kodu da kullanabiliriz:

  players[editedPlayer - 1].name = enteredPlayerName; //kullanıcı 1 -> 0. index olduğu için kullanıcı 2 -> 1. index olduğu için bu şekilde yazılarak dinamik hale getirilebilir.

  closePlayerConfig(); //bilgileri girdikten sonra otomatik olarak kapatmak için kullanırız.
}
