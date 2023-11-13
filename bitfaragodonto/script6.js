function szamolas(szam) {
    var eredmeny = "";
    if (szam == 0)
        return "";
    while(szam>0){
        var maradek = szam-1;
        maradek = maradek%26;
        eredmeny = String.fromCharCode('A'.charCodeAt(0) + maradek) + eredmeny;
        szam = Math.floor((szam-1)/26);
    }
    
    return eredmeny;
}
function feladat6(){
    var p = document.getElementById("eredmeny");
    p.innerText = "Bemenet: "+document.getElementById("megadando_szam").value+", "+"Kimenet:"+szamolas(document.getElementById("megadando_szam").value);
}