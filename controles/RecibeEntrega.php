<?php
date_default_timezone_set("America/Lima");
require_once("controles/classRecibeEntrega.php");
/*$datRE = new RecibeEntrega();*/
$boton='nuevo';
$Fechahora = date("Y-m-d H:i:s");
$FechaHoy = date("Y-m-d");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//ES"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Pantera Comunicaciones</title>
<link rel="stylesheet" type="text/css" href="css/style_recibe_entrega.css"/>
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="css/offcanvas.css"/> 
<link rel="stylesheet" type="text/css" href="css/jquery-ui.css"/>
<link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'/>
<link rel="stylesheet" type='text/css' href="css/alertify.core.css" />
<link rel="stylesheet" type='text/css' href="css//alertify.default.css" />

<script type="text/javascript" src="js/jquery.1.7.1.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.min.js"></script>
<script type="text/javascript" src="js/funciones_recibe_entrega.js"></script>
<script type="text/javascript" src="js/jquery.alerts.js"></script>
<script type="text/javascript" src="js/CreaTablas.js"></script>
<!--<script src="js/index.js"></script>-->
<script type='text/javascript'>        

$(function () {
    
 $('#econtiene_tabla').hide("fast");
 $('#tabs-min').tabs({
 activate: function (event, ui) {
 var $activeTab = $('#tabs-min').tabs('option', 'active');
 if ($activeTab === 1) {
    $('#contiene_tabla').hide("fast");
    $('#econtiene_tabla').show();
    $("#optbuscar").attr("value","E");
    
 }
 else{
     $('#contiene_tabla').show();
     $('#econtiene_tabla').hide("fast");
     $("#optbuscar").attr("value","R");
 }
 }
 });
});

</script>
<script type='text/javascript'>

$(document).ready(function(){           
    ControlesAlGuardar();
    eControlesAlGuardar();
    document.getElementById("imprimir_r").disabled=true;
    document.getElementById("anular").disabled=true;
    document.getElementById("eimprimir_r").disabled=true;
    document.getElementById("eanular").disabled=true;
    document.getElementById("boton_pagar").disabled=true;
    document.getElementById("operacion").disabled=true;
    
$("#dnib").keypress(function(e) {
            //13 es el código de la tecla
            if(e.which === 13) {
                  /*alert('Has pulsado enter!');*/
                    $.ajax({
                        url:'controles/DatosCliente.php',
                        type:'POST',
                        dataType:'json',
                        data:{ dni:$('#dnib').val()},
                        beforeSend: function () {$("#nombresb").html("Procesando, espere por favor...");}
                    }).done(function(respuesta){
                        $("#nombresb").val(respuesta.nombres);
                        
                    });
            } /*END if*/
        });   
    $("#dnir").keypress(function(e) {      
            //13 es el código de la tecla
            if(e.which === 13) {
                  /*alert('Has pulsado enter!');*/
                    $.ajax({
                        url:'controles/DatosCliente.php',
                        type:'POST',
                        dataType:'json',
                        data:{ dni:$('#dnir').val()},
                        beforeSend: function () {$("#nombresr").html("Procesando, espere por favor...");}
                    }).done(function(respuesta){
                        $("#nombresr").val(respuesta.nombres);
                        
                    });
            } /*END if*/

        }); /*keypress*/ 

$("#cod_sucu").keypress(function(e) {      
    if($('#cod_sucu').val()!==$('#codsucursal').val() ){//verificamos sucursal diferente
            if(e.which === 13) {                
                    $.ajax({
                        url:'controles/Datos_Sucursal.php',
                        type:'POST',
                        dataType:'json',
                        data:{ codsucu:$('#cod_sucu').val()},
                        beforeSend: function () {$("#destino").html("Procesando, espere por favor...");}
                    }).done(function(respuesta){
                        $("#destino").val(respuesta.nomsucursal);
                        $("#pdfdestino").val(respuesta.nomsucursal);/*para la impresion*/    
                    });
            } /*END if*/
    }
}); /*keypress*/ 
$("#ednib").keypress(function(e) {      
            //13 es el código de la tecla
            if(e.which === 13) {
                  /*alert('Has pulsado enter!');*/
                    $.ajax({
                        url:'controles/DatosCliente.php',
                        type:'POST',
                        dataType:'json',
                        data:{ dni:$('#ednib').val()},
                        beforeSend: function () {$("#enombresb").html("Procesando, espere por favor...");}
                    }).done(function(respuesta){
                        $("#enombresb").val(respuesta.nombres);
                        
                    });
            }
 }); /*keypress*/ 
 $("#ednir").keypress(function(e) {      
            //13 es el código de la tecla
            if(e.which === 13) {
                  /*alert('Has pulsado enter!');*/
                    $.ajax({
                        url:'controles/DatosCliente.php',
                        type:'POST',
                        dataType:'json',
                        data:{ dni:$('#ednir').val()},
                        beforeSend: function () {$("#enombresr").html("Procesando, espere por favor...");}
                    }).done(function(respuesta){
                        $("#enombresr").val(respuesta.nombres);
                        
                    });
            } /*END if*/

        }); /*keypress*/ 

$("#ecod_sucu").keypress(function(e) {
            //13 es el código de la tecla
            if(e.which === 13) {                
                    $.ajax({
                        url:'controles/Datos_Sucursal.php',
                        type:'POST',
                        dataType:'json',
                        data:{ codsucu:$('#ecod_sucu').val()},
                        beforeSend: function () {$("#edestino").html("Procesando, espere por favor...");}
                    }).done(function(respuesta){
                        $("#edestino").val(respuesta.nomsucursal);
                        
                    });
            } /*END if*/

        }); /*keypress*/ 


$("#fecha_r").datepicker({        
        dateFormat: 'yy/mm/dd',
        showOn: 'both',
        buttonImage: 'img/calendar.ico',
        buttonImageOnly: true,
        changeYear: true,
        beforeShow: function(){$(".ui-datepicker").css('font-size', 12); },
        numberOfMonths: 1,
        onSelect: function (dateText){MuestraRecibidos($('#fecha_r').val(),$('#optbuscar').val());}
        /*onClose: function (selectedDate){CalculaTotalesR();} */
   });
$("#efecha_r").datepicker({
        dateFormat: 'yy/mm/dd',
        showOn: 'both',
        buttonImage: 'img/calendar.ico',
        buttonImageOnly: true,
        changeYear: true,
        beforeShow: function(){$(".ui-datepicker").css('font-size', 12); },
        numberOfMonths: 1,
        onSelect: function (dateText){MuestraEntregados($('#efecha_r').val(),$('#optbuscar').val());}
        /*onClose: function (selectedDate){CalculaTotalesR();} */
   });
   
  $("#buscador").keyup(function(){
        // When value of the input is not blank
        if( $(this).val() !== "")
        {  // Show only matching TR, hide rest of them
            $("#TRecibidos tbody>tr").hide();
            $("#TRecibidos td:contains-ci('" + $(this).val() + "')").parent("tr").show();
        }
        else
        { // When there is no input or clean again, show everything back
            $("#TRecibidos tbody>tr").show();
        }
    });   
   $.extend($.expr[":"], 
{
    "contains-ci": function(elem, i, match, array) 
    { return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0; }
});

 $("#ebuscador").keyup(function(){
        // When value of the input is not blank
        if( $(this).val() !== "")
        {// Show only matching TR, hide rest of them
            $("#TEntregados tbody>tr").hide();
            $("#TEntregados td:contains-ci('" + $(this).val() + "')").parent("tr").show();
        }
        else
        {   // When there is no input or clean again, show everything back
            $("#TEntregados tbody>tr").show();
        }
    }); 

});
/*END document*/

</script>
</head>
<body>
 
    <div class="navbar navbar-fixed-top navbar-inverse" role="navigation" >
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Mas Opciones</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Transferencias</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <!--<li class="active"><a href="#">Recibidos</a></li>-->            
            <li><a href="cierrediario.php" target="_blank">CierreDiario</a></li>
            <li><a href="#contact">Cruce</a></li>
            <li><a href="#contact">Supervisa</a></li>
            <li><a href="ManteClientes.php" target="_blank" >Tablas</a></li> 
            <li><a href="#contact">Reportes</a></li> 
            
          </ul>
        </div><!-- /.nav-collapse -->
    </div><!-- /.container -->
</div><!-- /.navbar -->
<!-- ********************** CUERPO ***********************************************************************-->
<div id="regresa"</div>
<div class="container-fluid">

<div id="tabs-min"  >
    <ul>
    <li><a href="#tabs-1">RECIBIDOS</a></li>
    <li><a href="#tabs-2">ENTREGADOS</a></li>    
  </ul>
    
<div id="tabs-1">  
<div class="row row-offcanvas row-offcanvas-right">
<div class="col-xs-12 col-sm-9">
              <p class="pull-right visible-xs">
                <button type="button" class="btn btn-primary btn-xs" data-toggle="offcanvas">Opciones</button>
              </p>  
<div class="row">
<!--  Beneficiario Remitente   -->
    <div class="col-xs-6 col-sm-6 col-lg-4 form-group input-group-sm">
      <div class="input-group input-group-sm has-warning">
        <span class="input-group-addon">Beneficiario</span>     
        <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' maxlength="10" class="form-control" id="dnib" name="dnib" placeholder="DNI Beneficiario">
        <span class="input-group-btn">          
          <a href="#" id="busca_beneficiario" class="btn btn-info glyphicon glyphicon-search" data-toggle="modal" data-target="#modal_b" onclick="limpia_tabla_b(); RecuperaClientesBFast();"></a>
        </span>
      </div>
      <input type="text" class="form-control" id="nombresb" placeholder="Nombres Beneficiario" readonly="readonly">
    
      <div class="input-group input-group-sm has-success">
        <span class="input-group-addon">Remitente</span> 
        <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' maxlength="10" class="form-control" id="dnir" name="dnir" placeholder="DNI Remitente">
        <span class="input-group-btn">          
          <a href="#" id="busca_remitente" class="btn btn-info glyphicon glyphicon-search" data-toggle="modal" data-target="#modal_r" onclick="limpia_tabla_r(); RecuperaClientesRFast();"></a>
        </span>
      </div>
      <input type="text" class="form-control" id="nombresr" placeholder="Nombres Remitente" readonly="readonly">     
    </div><!--/span-->
<!--  Sucursal   -->
      <div class="col-xs-6 col-sm-6 col-lg-4 form-group has-success input-group-sm">
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Codigo</span> 
                  <input type="text" class="form-control" id="cod_sucu" name="cod_sucu" placeholder="Codigo Sucursal" onkeyup='javascript:this.value=this.value.toUpperCase();' >
                  <span class="input-group-btn">
                  <!--<button class="btn btn-success  glyphicon glyphicon-download-alt" id='buscaS' name='buscaS'></button>-->
                  <a href="#" id="busca_sucursal" class="btn btn-info glyphicon glyphicon-search" data-toggle="modal" data-target="#modal_s" onclick="limpia_tabla_s(); RecuperaSucursalFast()"></a>
                    </span>
                </div>  
                    <input type="text" class="form-control" name="destino" id="destino" placeholder="Destino" readonly="readonly">
                    <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' class="form-control" name="lugdestino" id="lugdestino" placeholder="Lugar Destino">
                    <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' class="form-control" name="otros" id="otros" placeholder="Otros">
      </div><!--/span-->
<!-- MONEY -->
            <div class="col-xs-6 col-sm-6 col-lg-4 input-group-sm">
                <div class="input-group input-group-sm ">
                  <span class="input-group-addon">Importe</span>                
                  <input type="text" class="form-control" id="importe_r" name="importe_r" value="0" onfocus="if (this.value >= '0') {this.value = '';}" onblur="ADecimal();"  onkeyup="calcula_total();"/>
                </div>  
                <div class="input-group input-group-sm">
                  <span class="input-group-btn">                    
                   <!-- <a href="#" class="btn btn-warning glyphicon glyphicon-new-window" data-placement="right" title="Nuevo" data-toggle="modal tooltip" data-target="#modal_guardar" onclick="limpia_tabla_b();"></a>-->
                    </span>  
                  <span class="input-group-addon">Cargo</span>
                  <input type="text" class="form-control" id="cargo_r" name="cargo_r" value="0" onfocus="if (this.value >= '0') {this.value = '';}" onblur="ADecimal();" onkeyup="calcula_total();"/>
                </div>  

                <div class="input-group input-group-sm">  
                  <span class="input-group-btn">                    
                    <!--<a href="#" class="btn btn-danger glyphicon glyphicon-remove" data-placement="right" title="Cancelar" data-toggle="modal tooltip" data-target="#modal_guardar" onclick="limpia_tabla_b();"></a>-->
                    </span>  
                  <span class="input-group-addon">Otros</span>
                  <input type="text" class="form-control" id="otros_r" name="otros_r" value="0" onfocus="if (this.value >= '0') {this.value = '';}" onblur="ADecimal();" onkeyup="calcula_total();"/>
                </div>
                
                <div class="input-group input-group-sm has-error"> 
                  <span id="desactivame" class="input-group-btn">                    
                  
                   <!-- <a href="#" id="guardarecibidos" class="btn btn-success glyphicon glyphicon-save" data-placement="right" title="Guardar" data-toggle="modal" data-target="#modal_guardar" ></a>-->
                  
                    </span>  
                  <span class="input-group-addon">Total</span>
                  <input type="text" class="form-control" id="total_r" value="0" readonly="readonly"/> 
                    
                </div>
            </div> 
<!--  Porcentajes   -->
            <div class="col-xs-6 col-sm-6 col-lg-4 input-group-sm" >
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Porcentaje</span> 
                    <select class="form-control input-sm" id="listaporcentajes" onblur="calcula_total();" onchange="calcula_cargo();">                
                    <option value="1.5">1.5 %</option> <option value="2.0">2.0 %</option> <option value="2.5">2.5 %</option> 
                    <option value="3.0">3.0 %</option> <option value="3.5">3.5 %</option><option value="4.0">4.0 %</option> 
                    <option value="4.5">4.5 %</option> <option value="5.0">5.0 %</option> <option value="5.5">5.5 %</option> 
                    <option value="6.0">6.0 %</option> <option value="6.5">6.5 %</option>  <option value="7.0">7.0 %</option>
                    <option value="7.5">7.5 %</option> <option value="8.0">8.0 %</option> <option value="8.5">8.5 %</option>
                    <option value="9.0">9.0 %</option><option value="9.5">9.5 %</option><option value="10.0">10.0 %</option> 
                  </select>
                </div>
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">I.G.V.</span> 
                    <input type="text" class="form-control" id="igv_r" value="0" readonly="readonly">
                </div>
            </div>
<!--  vuelto   -->
            <div class="col-xs-6 col-sm-6 col-lg-4 input-group-sm" >                        
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Efectivo</span> 
                    <input type="text" class="form-control " id="efectivo_r" value="0" onfocus="if (this.value >= '0') {this.value = '';}" onkeyup="calcula_vuelto();">
                </div>  
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Vuelto</span> 
                    <input type="text" class="form-control" id="vuelto_r" value="0" readonly="readonly">
                </div>                  
            </div>
</div><!--/row-->
                      
</div><!--/span-->
 <!-- /////////////////// Sidebar RERERE////////////////////////-->
 <form name="form_imprime" action="Imprime_Recibidos.php" target="_blank" method='post'>
        <div class="col-xs-6 col-sm-3 sidebar-offcanvas " id="sidebar" role="navigation" >
                    <div class="list-group">
                    <a href="#" id="nombresucursal" class="list-group-item active"><?php echo $_SESSION['sucursal']?>
                    <!--<a href="#" id="nombresucursal" class="list-group-item active"><?php /*echo date("Y-m-d H:i:s", (strtotime ("-7 Hours")));*/?>-->
                        <span id="codigosucursal" class="badge"><?php echo $_SESSION['codsucursal']?></span>
                    </a>
                    <a href="#" id='nombreusuario' class="list-group-item"><?php echo $_SESSION['usuario']?>                        
                    </a>                              
                        <a href="#" class="list-group-item">
                        <input type="text" id="fecha_r" name="fecha_r" placeholder="Otra Fecha"/>
                        <input type="button" class="btn btn-primary btn-xs" id="nuevo" name="nuevo" value="Nuevo" onclick="ControlesNuevo();" />
                        <!--<input type="button" class="btn btn-warning btn-xs" id="cancelar" name="cancelar" value='Cancelar' onclick=''/>-->
                        <input type="button" class='btn btn-warning btn-xs' id="cuentas" name="cuentas" value='Cancelar' onclick='ControlesCancelar();'/>
                        </a>
                    <!--</form>--> 
                   
                        <a href="#" class="list-group-item ">
                            <div id="carga" style="display:none"> <img src="img/loading005.gif" /> </div>
                            
                            <input type="button" id="guardar" name="guardar" value="Guardar" class="btn btn-success btn-xs" onclick="Inserta_Recibidos();" />
                            <!--<input type="button" id="imprimir_r"  name="imprimir_r" class='btn btn-info btn-xs'  value='Imprimir' onclick="ImprimeR('Imprime_Recibidos.php');"/> -->
                            <input type="submit" id="imprimir_r"  name="imprimir_r" class='btn btn-info btn-xs'  value='Imprimir' /> 
                            <input type="button" id="anular" name="anular" value="Anular" class="btn btn-danger btn-xs" onclick="PideConfirmacion($('#optbuscar').val());" />
                             
                        </a>                        
                        <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' class="form-control" id="cuentas" name="cuentas" onkeyup='javascript:this.value=this.value.toUpperCase();' placeholder="Mas" />
                        <input type="text" style="text-transform:uppercase" class="form-control" id="buscador" value="" placeholder="Buscar" />
                    
                    </div> 
            
            </div><!-- sidebar -->
    <input type="hidden" name="correlativo" id="correlativo">
    <input type="hidden" name="codgirosucursal" id="codgirosucursal">    
    <input type="hidden" name="nick"  id="nick"                     value="<?php echo $_SESSION['nick']?>" >  
    <input type="hidden" name="codsucursal" id="codsucursal"        value="<?php echo $_SESSION['codsucursal']?>">
    <input type="hidden" name="fechahoy" id="fechahoy"              value="<?=$FechaHoy ?>">
    <input type="hidden" name="pdffecha" id="pdffecha">    
    <input type="hidden" name="optbuscar" id="optbuscar" value="R">
    <input type="hidden" name="motivoanulacion" id="motivoanulacion">
    <input type="hidden" name="pdfremitente" id="pdfremitente">
    <input type="hidden" name="pdfbeneficiario" id="pdfbeneficiario">
    <input type="hidden" name="pdfimporte" id="pdfimporte">
    <input type="hidden" name="pdfcargo" id="pdfcargo">
    <input type="hidden" name="pdfotros" id="pdfotros">
    <input type="hidden" name="pdftotal" id="pdftotal">
    <input type="hidden" name="pdfcoddestino" id="pdfcoddestino">
    <input type="hidden" name="pdfdestino" id="pdfdestino">    
        
    <!--<input type="hidden" name="correlativo" id="correlativo">-->        
           
 </form>
</div>    <!--canvas-->
</div>   <!-- end tab 1  -->    
<!-- mmmmmmmmmmmmmmmmmmmm siguiente tab mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm -->
<!-- mmmmmmmmmmmmmmmmmmmm siguiente tab mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm -->

<div id="tabs-2">     
<div class="row row-offcanvas row-offcanvas-right">
<div class="col-xs-12 col-sm-9">
              <p class="pull-right visible-xs">
                <button type="button" class="btn btn-primary btn-xs" data-toggle="offcanvas">Toggle nav</button>
              </p>  
<div class="row">
<!--  Beneficiario Remitente   -->
    <div class="col-xs-6 col-sm-6 col-lg-4 form-group input-group-sm">
      <div class="input-group input-group-sm has-warning">
        <span class="input-group-addon">Beneficiario</span>     
        <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' class="form-control" id="ednib" name="ednib" placeholder="DNI Beneficiario">
        <span class="input-group-btn">
          <!--<button class="btn btn-success  glyphicon glyphicon-download-alt" id='buscaB' name='buscaB' ></button>*/-->
          <a href="#" id="ebusca_beneficiario" class="btn btn-info glyphicon glyphicon-search" data-toggle="modal" data-target="#emodal_b" onclick="elimpia_tabla_b(); eRecuperaClientesBFast();"></a>
        </span>
      </div>
      <input type="text" class="form-control" id="enombresb" placeholder="Nombres Beneficiario" readonly="readonly">
    
      <div class="input-group input-group-sm has-success">
        <span class="input-group-addon">Remitente</span> 
        <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' class="form-control" id="ednir" name="ednir" placeholder="DNI Remitente">
        <span class="input-group-btn">
          <!--<button class="btn btn-info  glyphicon glyphicon-search" id ="buscaR" name="buscaR" type="submit"></button>-->          
          <!--<button class="btn btn-success  glyphicon glyphicon-download-alt" id='buscaS' name='buscaS'></button>-->
          <a href="#" id="ebusca_remitente" class="btn btn-info glyphicon glyphicon-search" data-toggle="modal" data-target="#emodal_r" onclick="elimpia_tabla_r(); eRecuperaClientesRFast();"></a>
        </span>
      </div>
          <input type="text" class="form-control" id="enombresr" name="enombresr" placeholder="Nombres Remitente" readonly="readonly">     
    </div><!--/span-->
<!--  Sucursal   -->
      <div class="col-xs-6 col-sm-6 col-lg-4 form-group has-success input-group-sm">
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Codigo</span> 
                  <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' class="form-control" id="ecod_sucu" name="ecod_sucu" placeholder="CODIGO">
                  <span class="input-group-btn">
                  <!--<button class="btn btn-success  glyphicon glyphicon-download-alt" id='buscaS' name='buscaS'></button>-->
                  <a href="#" id="ebusca_sucursal" class="btn btn-info glyphicon glyphicon-search" data-toggle="modal" data-target="#emodal_s" onclick="elimpia_tabla_s(); eRecuperaSucursalFast();"></a>
                    </span>
                </div>  
            <input type="text" class="form-control" name="edestino" id="edestino" placeholder="Sucursal Origen" readonly="readonly">
            <div class="input-group input-group-sm">
                <span class="input-group-btn">                    
                    <a href="#" id="boton_pagar" class="btn btn-warning glyphicon glyphicon-flash" data-placement="right" title="Nuevo" data-toggle="modal tooltip" data-target="#modal_guardar" onclick="FnPagar();"></a>
                </span>      
            <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' class="form-control" name="operacion" id="operacion" placeholder="Nro Operacion">
            </div>      
      </div><!--/span-->
<!-- MONEY -->
            <div class="col-xs-6 col-sm-6 col-lg-4 input-group-sm">
                <div class="input-group input-group-sm ">
                  <span class="input-group-addon">Importe</span>                
                  <input type="text" class="form-control" id="eimporte_r" name="eimporte_r" value="0" onblur="eADecimal();" onkeyup="ecalcula_total();"/>
                </div> 
                
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Porcentaje</span> 
                    <select class="form-control input-sm" id="elistaporcentajes" onblur="ecalcula_total();" onchange="ecalcula_cargo();">                
                    <option value="1.5">1.5 %</option> <option value="2.0">2.0 %</option> <option value="2.5">2.5 %</option> 
                    <option value="3.0">3.0 %</option> <option value="3.5">3.5 %</option><option value="4.0">4.0 %</option> 
                    <option value="4.5">4.5 %</option> <option value="5.0">5.0 %</option> <option value="5.5">5.5 %</option> 
                    <option value="6.0">6.0 %</option> <option value="6.5">6.5 %</option>  <option value="7.0">7.0 %</option>
                    <option value="7.5">7.5 %</option> <option value="8.0">8.0 %</option> <option value="8.5">8.5 %</option>
                    <option value="9.0">9.0 %</option><option value="9.5">9.5 %</option><option value="10.0">10.0 %</option>
                  </select>
                </div>
                
                <div class="input-group input-group-sm">                  
                  <span class="input-group-addon">Cargo</span>
                  <input type="text" class="form-control" id="ecargo_r" name="ecargo_r" value="0" onblur="eADecimal();" onkeyup="ecalcula_total();"/>
                </div>                  
            </div>             
</div><!--/row-->
                      
</div><!--/span-->
 <!-- /////////////////// Sidebar BBB ////////////////////////-->
 <form name="eform_imprime" action="Imprime_Entregados.php" target="_blank" method='post'>
        <div class="col-xs-6 col-sm-3 sidebar-offcanvas " id="sidebar" role="navigation" >
                    <div class="list-group">
                    <a href="#" id="nombresucursal" class="list-group-item active"><?php echo $_SESSION['sucursal']?>
                        <span id="codigosucursal" class="badge"><?php echo $_SESSION['codsucursal']?></span>
                    </a>
                    <a href="#" id='nombreusuario' class="list-group-item"><?php echo $_SESSION['usuario']?>                        
                    </a>
                        <a href="#" class="list-group-item">
                        <input type="text" id="efecha_r" name="efecha_r" placeholder="Otra Fecha"/>
                        <input type="button" id="enuevo" name="enuevo" value="Nuevo" class="btn btn-warning btn-xs" onclick="eControlesNuevo();"/>
                        <!--<input type="button" class='btn btn-default btn-xs' id="bancos" name="bancos" value='Bancos' onclick=''/> -->
                        <input type="button" class='btn btn-default btn-xs' id="ecuentas" name="ecuentas" value='Cancelar' onclick='eControlesCancelar();'/>
                        </a>
                        <a href="#" class="list-group-item "> 
                            <div id="ecarga" style="display:none"> <img src="img/loading005.gif" /> </div>
                            <input type="button" id="eguardar" name="eguardar" value="Guardar" class="btn btn-success btn-xs" onclick="eInserta_Recibidos();"/>
                            <!--<input type="button" id="imprimir_r"  name="imprimir_r" class='btn btn-info btn-xs'  value='Imprimir' onclick="ImprimeR('Imprime_Recibidos.php');"/> -->
                            <input type="submit" id="eimprimir_r"  name="eimprimir_r" class='btn btn-info btn-xs'  value='Imprimir' /> 
                            <input type="button" id="eanular" name="eanular" value="Anular" class="btn btn-danger btn-xs" onclick="PideConfirmacion($('#optbuscar').val());"/>
                        </a>                                                
                        <input type="text" style="text-transform:uppercase" class="form-control" id="ebuscador" placeholder="Buscar" />                    
                    </div> 
            
            </div><!-- sidebar -->
    <input type="hidden" name="epdffecha" id="epdffecha">
    <input type="hidden" name="emotivoanulacion" id="emotivoanulacion">
    <input type="hidden" name="epdfremitente" id="epdfremitente">
    <input type="hidden" name="epdfbeneficiario" id="epdfbeneficiario">
    <input type="hidden" name="epdfimporte" id="epdfimporte">
    <input type="hidden" name="epdfcargo" id="epdfcargo">
    <input type="hidden" name="epdfotros" id="epdfotros">
    <input type="hidden" name="epdftotal" id="epdftotal">
    <input type="hidden" name="epdfcodorigen" id="epdfcodorigen">
    <input type="hidden" name="epdfcoddestino" id="epdfcoddestino">
    <input type="hidden" name="epdfnomsucursal" id="epdfnomsucursal">
    <input type="hidden" name="ecodgirosucursal" id="ecodgirosucursal">
    <input type="hidden" name="epdfnick" id="epdfnick">
        
    <!--<input type="hidden" name="correlativo" id="correlativo">-->       
           
 </form>
 </div>    <!--canvas-->
</div> <!-- tab 2 -->  
        
</div> <!-- tabs min -->
</div><!--/.container fuid-->
<!-- ***************************** TABLA PRINCIPAL ****************************************************************-->
<div id="contiene_tabla" class="table-responsive" name="contiene_tabla"  >    
    <!--<table class="table table-hover table-condensed"  id="TRecibidos">*/-->
    <table  id="TRecibidos" class="table  table-condensed" >
        <thead >
            <tr>
                <th >Nro</th>                
                <th>Fecha</th>
                <th>Beneficiario</th>
                <th>Remitente</th>
                <th>Destino</th>
                <th>Importe</th>
                <th>Cargo</th>
                <th>Otros</th>
                <th>Total</th>
                <th>N.Operacion</th>
                <th>Observa</th>
                <th>Usuario</th>
                <th>Entregado</th>
                <th>A</th>
                <th>X</th>
            </tr>
         </thead>
         <tbody id="tablarecibidos" 
           
         </tbody> 
    </table>
</div>
<!-- ******** END TABLA ***********************************************************************-->
<div id="econtiene_tabla" class="table-responsive" name="econtiene_tabla" >    
    <!--<table class="table table-hover table-condensed"  id="TRecibidos">*/-->
    <table  id="TEntregados" class="table table-condensed" >
        <thead >
            <tr>
                <th>Itm</th>                
                <th>Nro</th>                
                <th>Fecha</th>
                <th>dniB</th>
                <th>Beneficiario</th>
                <th>dniR</th>
                <th>Remitente</th>
                
                <th>Importe</th>
                
                <th>Nro.Operacion</th>
                <th>Nro.Cuenta</th>
                
                <th>Usuario</th>
                <th>FechaHora</th>
                <th>A</th>                
            </tr>
         </thead>
        <tbody id="tablaentregados" 
           
         </tbody>            
          
    </table>
</div>
<!-- ******** END TABLA ***********************************************************************-->
<div id="invisible"  >    
    <!--<table class="table table-hover table-condensed"  id="TRecibidos">*/-->
    <table  id="tablainvisible" style="display: none" >
        
        <tbody id="tinvisible" 
           
         </tbody>                      
    </table>
</div>

<!-- DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD  DIALOGOS   DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD -->
<div class="modal fade" id="modal_b" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
        <h4 class="modal-title" id="myModalLabel_B">Busca BENEFICIARIO</h4>
        <input type="text" style="text-transform:uppercase" id="dni_b" name="dni_b" />
        <select id="opciones_b" > <option value='A'>Apellido</option> <option value='D'>DNI</option> </select>
        <input type="button" Value="BUSCAR" onclick="RecuperaClientesB();"/>
      </div>      
        <div class="modal-body" id="resultado_b"> 
           
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="limpia_tabla_b();">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal_r" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
        <h4 class="modal-title" id="myModalLabel1_R">Busca REMITENTE</h4>
        <input type="text" style="text-transform:uppercase" id="dni_r" name="dni_r" />
        <select id="opciones_r" > <option value='A'>Apellido</option> <option value='D'>DNI</option> </select>
        <input type="button" Value="BUSCAR" onclick="RecuperaClientesR();"/>
      </div>
      <!-- se carga los datos dinamicamente -->
        <div class="modal-body" id="resultado_r"> 
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="limpia_tabla_r();">Cerrar</button>        
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal_s" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
        <h4 class="modal-title" id="myModalLabel_S">Busca SUCURSAL</h4>
        <input type="text" style="text-transform:uppercase" id="codsucu" name="codsucu" />            
        <input type="button" value="Buscar Sucursal" onclick="RecuperaSucursal();"/>
      </div>
      <!-- se carga los datos dinamicamente -->
        <div class="modal-body" id="resultado_s"> 
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="limpia_tabla_s();">Cerrar</button>        
      </div>
    </div>
  </div>
</div>
<!--DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD -->
<div class="modal fade" id="emodal_b" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
        <h4 class="modal-title" id="emyModalLabel_B">BENEFICIARIO</h4>
        <input type="text" style="text-transform:uppercase" id="edni_b" name="edni_b" />    
        <select id="eopciones_b" > <option value='A'>Apellidos</option> <option value='D'>DNI</option> </select>
        <input type="button" value="BUSCAR" onclick="eRecuperaClientesB();"/>
      </div>
      <!-- se carga los datos dinamicamente -->
        <div class="modal-body" id="eresultado_b">
            
        </div>        
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="elimpia_tabla_b();">Cerrar</button>        
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="emodal_r" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
        <h4 class="modal-title" id="emyModalLabel_R">Busca REMITENTE</h4>
        <input type="text" style="text-transform:uppercase" id="edni_r" name="dni_r" />    
        <select id="eopciones_r" > <option value='A'>Apellido</option> <option value='D'>DNI</option> </select>
        <input type="button" Value="BUSCAR" onclick="eRecuperaClientesR();"/>
      </div>
      <!-- se carga los datos dinamicamente -->
        <div class="modal-body" id="eresultado_r"> 
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="elimpia_tabla_r();">Cerrar</button>        
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="emodal_s" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
        <h4 class="modal-title" id="emyModalLabel_S">Busca SUCURSAL</h4>
        <input type="text" style="text-transform:uppercase" id="ecodsucu" name="ecodsucu" />            
        <input type="button" value="Buscar Sucursal" onclick="eRecuperaSucursal();"/>
      </div>
      <!-- se carga los datos dinamicamente -->
        <div class="modal-body" id="eresultado_s"> 
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="elimpia_tabla_s();">Cerrar</button>        
      </div>
    </div>
  </div>
</div>
<!--DDDDDDDDDDDDDDDDDDDDDDDDDD END DIALOGOS  DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD-->
<!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster-->
    <script type="text/javascript" language="javascript" src="js/bootstrap.min.js"></script> 
    <script type="text/javascript" language="javascript" src="js/offcanvas.js"></script>
    <script type="text/javascript" language="javascript" src="js/validacampos.js"></script>
    <script type="text/javascript" language="javascript" src="js/alertify.js"></script>
<script type="text/javascript">
            $(function(){
                //Para escribir solo letras
                $('#dnir').validacampos('1234567890abcdefghijklmnñopqrstuvwxyz');
                $('#dnib').validacampos('1234567890abcdefghijklmnñopqrstuvwxyz');
                $('#codsucu').validacampos('1234567890abcdefghijklmnñopqrstuvwxyz');
                $('#buscador').validacampos('1234567890abcdefghijklmnñopqrstuvwxyz');
                //Para escribir solo numeros    
                $('#importe_r').validacampos('.0123456789');
                $('#cargo_r').validacampos('.0123456789');
                /*$('#itf_r').validacampos('0123456789');*/
                $('#otros_r').validacampos('.0123456789');
                $('#efectivo_r').validacampos('.0123456789');
                /*$('#total_r').validacampos('0123456789');*/
                    
            });           
</script>      

</body>
</html>