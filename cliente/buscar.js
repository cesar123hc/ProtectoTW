var mensaje = '';
function ini(){
    mensaje='<?xml version="1.0" encoding="utf-8"?>' +
    '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<Body>' +
    '<BuscarPagosRequest xmlns="http://tell.me/pago">' +
    '<id>'+ document.getElementById('id_pedido').value +'</id>' +
    '</BuscarPagosRequest>' +
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
    //document.getElementById('r').value= resultado(response.data)

       var valor= resultado(response.data)
       console.log(valor);
    })
    .catch(err => console.log(err));
}
function resultado(rXml){
    
    var parser = new DOMParser();
    var xmlDoc= parser.parseFromString(rXml,"text/xml");

    document.getElementById("id").innerHTML= xmlDoc.getElementsByTagName("ns2:id")[0].childNodes[0].nodeValue;
    document.getElementById("cantidad").innerHTML= xmlDoc.getElementsByTagName("ns2:cantidad_Total")[0].childNodes[0].nodeValue;
    document.getElementById("tipo").innerHTML= xmlDoc.getElementsByTagName("ns2:tipo_Pago")[0].childNodes[0].nodeValue;
    document.getElementById("fecha").innerHTML=xmlDoc.getElementsByTagName("ns2:fecha_Compra")[0].childNodes[0].nodeValue;
    document.getElementById("hora").innerHTML=xmlDoc.getElementsByTagName("ns2:hora_Compra")[0].childNodes[0].nodeValue;
 
    
    console.log(res);
    
}