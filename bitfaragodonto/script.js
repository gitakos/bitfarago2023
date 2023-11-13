function atalakit(roman) {
    const romai = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    let veg = 0;

    for (let i = 0; i < roman.length; i++) {
        let jelenleg = romai[roman[i]];
        let kovi = romai[roman[i + 1]];

        if (kovi > jelenleg) {
            veg += kovi - jelenleg;
            i++;
        } else {
            veg += jelenleg;
        }
    }

    return veg;
}

function feladat1(){
    var p = document.getElementById("eredmeny");
    if(jo_e(document.getElementById("bemenet").value))
        p.innerText = "Bemenet: "+document.getElementById("bemenet").value+", "+"Kimenet:"+atalakit(document.getElementById("bemenet").value);
    else
        p.innerText = "Nem megfelelő római számot adott meg!";
    
}

function jo_e(szoveg) {
    for (let i = 0; i < szoveg.length; i++) {
      if (szoveg[i] < 'A' || szoveg[i] > 'Z') {
        return false;
      }
    }
    return true;
  }