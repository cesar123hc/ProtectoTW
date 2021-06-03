// Create a client instance
client = new Paho.MQTT.Client("18.116.240.0", 9001, "clientweb cesar");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("outTopic");
  message = new Paho.MQTT.Message("1");
  message.destinationName = "inTopic";
  client.send(message);
  
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  soap();
  
}



var mensaje="";
function ini(){

   
        mensaje='<?xml version="1.0" encoding="utf-8"?>' +
        '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<Body>' +
        '<RealizarPagoRequest xmlns="http://tell.me/pago">' +
        '<hora>'+ "Mensaje" +'</hora>' +

        '</RealizarPagoRequest>' +
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
        document.getElementById('r').value= resultado(response.data)
    })
    .catch(err => console.log(err));
}

function resultado(rXml){
    var parser = new DOMParser();
    var xmlDoc= parser.parseFromString(rXml, "text/xml");
    var resul= xmlDoc.getElementsByTagName("ns2:id")[0].childNodes[0].nodeValue;
    alert('PAGO CON ÉXITO, FOLIO'+resul);
    return resul;
}

function myFunction() {
  //alert("I am an alert box!");
}