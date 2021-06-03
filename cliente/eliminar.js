var mensaje = '';
function ini(){
    mensaje='<?xml version="1.0" encoding="utf-8"?>' +
    '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<Body>' +
    '<EliminarPagoRequest xmlns="http://tell.me/pago">' +
    '<id>'+ document.getElementById('id_pedido').value +'</id>' +
    '</EliminarPagoRequest>' +
    '</Body>' +
    '</Envelope>';
}

function soap() {
    ini();
    axios.post('http://localhost:8080/ws/pago',mensaje,{
        headers:{
            'Content-Type' : 'text/xml'
        }
    })
    .then(function (response){

       var valor= eliminar(response.data)
       console.log(valor);
    })
    .catch(err => console.log(err));
}

function eliminar(rXml){
    
    var parser = new DOMParser();
    var xmlDoc= parser.parseFromString(rXml,"text/xml");

    alert('PAGO ELIMINADO');
    
    
    console.log(res);
    
}