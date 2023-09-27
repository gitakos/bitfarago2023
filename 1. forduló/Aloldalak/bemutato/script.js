function Ora() {
    var akt_ido = new Date();
    var datum = document.getElementById('datum');
    var ev = akt_ido.getFullYear();
    var honap = akt_ido.getMonth();
    var nap_datum = akt_ido.getDate();
    var nap = akt_ido.getDay();
    datum.textContent = DatumAtalakitoCsoda(nap,ev,honap,nap_datum); 
    var ido = document.getElementById('ido');
    var ora = akt_ido.getHours().toString().padStart(2, '0');
    var perc = akt_ido.getMinutes().toString().padStart(2, '0');
    var mp = akt_ido.getSeconds().toString().padStart(2, '0');
    ido.textContent = ora+":"+perc+":"+mp;
}

function DatumAtalakitoCsoda(nap,ev,honap,nap_datum){
    var honapok = ["Januar","Februar","Marcius","Aprilis","Majus","Junius","Julius","Augusztus","Szeptember","Oktober","November","December"];
    var napok = ["Vasarnap","Hetfo","Kedd","Szerda","Csütörtök","Pentek","Szombat"];
    var margyar_datum = napok[nap]+", "+ev+". "+honapok[honap]+" "+nap_datum+".";
    return margyar_datum;
}

function toggleFullText(tldrId, fullTextId, buttonId) {
  var tldr = document.getElementById(tldrId);
  var fullText = document.getElementById(fullTextId);
  var button = document.getElementById(buttonId);
  tldr.style.overflow="hidden";
  fullText.style.overflow="hidden";
  tldr.style.height = tldr.scrollHeight + "px";
  fullText.style.height = fullText.scrollHeight + "px";
  tldr.style.transition = "opacity 0.5s ease, height 0.5s ease";
  fullText.style.transition = "opacity 0.5s ease, height 0.5s ease";




  if (tldr.style.display === "none") {

    tldr.style.opacity = "0";
    tldr.style.height = "0";
    fullText.style.opacity = "0";
    fullText.style.height = "0";
    button.innerHTML = "Mutass többet";
    setTimeout(function() {
      tldr.style.display = "block";
      fullText.style.display = "none";
      setTimeout(function() {
        tldr.style.opacity = "1";
        tldr.style.height = tldr.scrollHeight + "px";
      }, 0);
    }, 500);
  } else {

    fullText.style.opacity = "0";
    fullText.style.height = "0";
    tldr.style.opacity = "0";
    tldr.style.height = "0";
    button.innerHTML = "Kevesebb";
    setTimeout(function() {
      fullText.style.display = "block";
      tldr.style.display = "none";
      setTimeout(function() {
        fullText.style.opacity = "1";
        fullText.style.height = fullText.scrollHeight + "px";
      }, 0);
    }, 0);
  }
}

function szelesseg(){
  var element1 = document.getElementById('csapos_eman');
  var element2 = document.getElementById('eman_leiras');
  var temp1 = element1.getBoundingClientRect();
  var height1 = temp1.height;
  var width1 = temp1.width+"px";
  element2.style.width = width1;
} 

szelesseg();
setInterval(Ora, 1000);
Ora();
