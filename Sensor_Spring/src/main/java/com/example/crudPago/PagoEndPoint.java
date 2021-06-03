package com.example.crudPago;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import com.example.crudPago.*;
import me.tell.pago.BuscarPagosRequest;
import me.tell.pago.BuscarPagosResponse;
import me.tell.pago.BuscarSaludosRequest;
import me.tell.pago.BuscarSaludosResponse;
import me.tell.pago.EliminarPagoRequest;
import me.tell.pago.EliminarPagoResponse;
import me.tell.pago.RealizarPagoRequest;
import me.tell.pago.RealizarPagoResponse;

@Endpoint
public class PagoEndPoint {
    @Autowired
    private CrudPago crudPago;

    @PayloadRoot(namespace = "http://tell.me/pago", localPart = "RealizarPagoRequest")

    @ResponsePayload
    public RealizarPagoResponse damePago( @RequestPayload RealizarPagoRequest peticion){
        RealizarPagoResponse respuesta=new RealizarPagoResponse();
        //respuesta.setRespuesta("contenidospara pago "+peticion.getId());
        
        //Crear un pago
        Historial pago= new Historial();
        
       
        Date ahora = new Date();
        SimpleDateFormat formateador = new SimpleDateFormat("dd-MM-yyyy");
        pago.setFecha(formateador.format(ahora).toString());
        Date ahora2 = new Date();
        SimpleDateFormat formateador2 = new SimpleDateFormat("hh:mm:ss");
        pago.setHora(formateador2.format(ahora2).toString());
        
        
        //guardar con ayuda del crud
        
        crudPago.save(pago);
        
       
        respuesta.setId(Integer.toString(pago.getId()));
        return respuesta;
    }
    
    
    @PayloadRoot(namespace = "http://tell.me/pago", localPart = "EliminarPagoRequest")

    @ResponsePayload
    public EliminarPagoResponse wliminarPago( @RequestPayload EliminarPagoRequest peticion){
            EliminarPagoResponse respuesta =new EliminarPagoResponse();
            /*int id =peticion.getId();
            Pago pago=crudPago.findById(id).orElse(null);
            crudPago.delete(pago);
            respuesta.setRespuesta("El pago con ID="+id+" ha sido eliminado");*/
        return respuesta;
    }
    @PayloadRoot(namespace = "http://tell.me/pago", localPart = "BuscarPagosRequest")
    @ResponsePayload
    public BuscarPagosResponse buscarPagos( @RequestPayload BuscarPagosRequest peticion){
        BuscarPagosResponse respuesta= new BuscarPagosResponse();
        
        /*
        if(crudPago.existsById(peticion.getId())){
            Pago pagoBuscar= new Pago();
            Optional<Pago> pagoRec= crudPago.findById(peticion.getId());
            if(pagoRec.isPresent()){
                pagoBuscar=pagoRec.get();

                respuesta.setId(pagoBuscar.getId());
                respuesta.setCantidadTotal(pagoBuscar.getCantidadTotal());
                respuesta.setTipoPago(pagoBuscar.getTipoPago());
                respuesta.setFechaCompra(pagoBuscar.getFechaCompra());
                respuesta.setHoraCompra(pagoBuscar.getHoraCompra());
               
            }else{
                return respuesta;
            }
        }*/
        return respuesta;
    }
    @PayloadRoot(namespace = "http://tell.me/pago", localPart = "BuscarSaludosRequest")
    @ResponsePayload
    public BuscarSaludosResponse listaHistorial( @RequestPayload BuscarSaludosRequest peticion){
        
        
        BuscarSaludosResponse respuesta =new BuscarSaludosResponse();
        Iterable<Historial>listaSaludadores =crudPago.findAll();

        for(Historial ls :listaSaludadores ){
            BuscarSaludosResponse.Historial e =new BuscarSaludosResponse.Historial();
            e.setId(ls.getId());
            e.setFecha(ls.getFecha());
            e.setHora(ls.getHora());
            respuesta.getHistorial().add(e);

        }
        
        return respuesta;
    }
}