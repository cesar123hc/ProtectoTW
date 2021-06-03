var mensaje = '';
function ini(){
    mensaje='<?xml version="1.0" encoding="utf-8"?>' +
    '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<Body>' +
    '<BuscarSaludosRequest xmlns="http://tell.me/pago">' +
    '</BuscarSaludosRequest>' +
    '</Body>' +
    '</Envelope>';
}

function soap() {
    // alert('hola')
    ini();
    axios.post('http://localhost:8080/ws/pago',mensaje,{
        headers:{
            'Content-Type' : 'text/xml'
        }
    })
    .then(function (response){
    //document.getElementById('Respuesta').value= resultado(response.data)

       var valor= resultado(response.data)
       console.log(valor);
    })
    .catch(err => console.log(err));
}
function resultado(rXml){
    
    var parser = new DOMParser();
    var xmlDoc= parser.parseFromString(rXml,"text/xml");
    var x= xmlDoc.getElementsByTagName("ns2:Historial");
    var res = x.length;
    var table="<tr><th>id</th><th>Fecha</th><th>hora</th></tr>";
    var i;
    for(i=0;i<res;i++){

    table += "<tr><td>" +
    x[i].getElementsByTagName("ns2:id")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("ns2:fecha")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("ns2:hora")[0].childNodes[0].nodeValue +
    "</td></tr>";
    
 
    }
    document.getElementById("demo").innerHTML = table;
    console.log(res);
    
}