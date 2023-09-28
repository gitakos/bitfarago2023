 
 function tablaGen(){
    var tabla = document.getElementById("tablaTartalom");
    var mezo = 0;
    for (var i = 0; i < 12; i++) {
        var sor = document.createElement("tr");
   
        for (var j = 0; j < 8; j++) {
            var cella = document.createElement("td");
            cella.id = mezo;
            cella.textContent = mezo;
            sor.appendChild(cella);
            mezo++;
        }
   
        tabla.appendChild(sor);
    }
 }

 tablaGen();
