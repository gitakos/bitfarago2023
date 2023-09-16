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
    var honapok = ["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"];
    var napok = ["Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat","Vasárnap"];
    var margyar_datum = napok[nap-1]+", "+ev+". "+honapok[honap]+" "+nap_datum+".";
    return margyar_datum;
}



setInterval(Ora, 1000);
Ora();
