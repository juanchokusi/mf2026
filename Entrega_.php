<?php
date_default_timezone_set("America/Lima");
require_once("controles/classRecibeEntrega.php");
$Fechahora = date("Y-m-d H:i:s", (strtotime("-2 Hours")));
$FechaHoy = date("Y-m-d");
$tusuario = $_SESSION['tipousuario'];
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//ES"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="../../favicon.ico">

        <title>Entrega</title>

        <!-- Bootstrap core CSS -->
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="css/offcanvas.css"/> 
        <link rel="stylesheet" type="text/css" href="css/jquery-ui.css"/>
        <link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'/>
        <link rel="stylesheet" type='text/css' href="css/alertify.core.css" />
        <link rel="stylesheet" type='text/css' href="css//alertify.default.css" />
        <link rel="stylesheet" type="text/css" href="css/style_recibe_entrega.css"/>
        
        <script type="text/javascript" src="js/jquery.1.7.1.min.js"></script>
        <script type="text/javascript" src="js/jquery-ui-1.10.min.js"></script>
        <script type="text/javascript" src="js/FuncionesEntrega.js"></script>
        <script type="text/javascript" src="js/jquery.alerts.js"></script>
        <script type="text/javascript" src="js/CreaTablas.js"></script>
</head>
<body>

        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Entregas</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <form class="navbar-form navbar-right" role="form">
                        <button type="button" id="enuevo"        onclick="eControlesNuevo();"     class="btn btn-xs btn-primary">Nuevo</button>                        
                        <button type="button" id="ebtn_cancelar" onclick="eControlesCancelar();"  class="btn btn-xs btn-primary">Cancelar</button>
                        <button type="button" id="eguardar"      onclick="eInserta_Recibidos();"  class="btn btn-xs btn-primary">Guardar</button>
                        <div class="form-group">
                            <input type="text" id="ebuscador" name="ebuscador" placeholder="Buscar" class="form-control">
                        </div>
                        <button type="button" id="eimprimir_r"  class="btn btn-xs btn-primary">Imprimir</button>
                        <button type="button" id="eanular"      onclick="fnConfirmaAnulaEntrega();"         class="btn btn-xs btn-primary">Anular</button>
                    </form>
                </div><!--/.navbar-collapse -->
            </div>
        </nav>
<div class="row row-offcanvas row-offcanvas-right">
<div class="col-xs-12 col-sm-9">
              <p class="pull-right visible-xs">
                <button type="button" class="btn btn-primary btn-xs" data-toggle="offcanvas">Toggle nav</button>
              </p>  
<div class="row">
<!--  Beneficiario Remitente   -->
    <div class="col-xs-6 col-sm-6 col-lg-4 form-group input-group-sm">
      <div class="input-group input-group-sm">
        <span class="input-group-addon">Beneficiario</span>     
        <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' class="form-control" id="ednib" name="ednib" placeholder="DNI Beneficiario">
        <span class="input-group-btn">
          <a href="#" id="ebusca_beneficiario" class="btn btn-info glyphicon glyphicon-search" data-toggle="modal" data-target="#emodal_b" onclick="elimpia_tabla_b();"></a>
        </span>
      </div>
      <input type="text" class="form-control" id="enombresb" placeholder="Nombres Beneficiario" readonly="readonly">
    
      <div class="input-group input-group-sm">
        <span class="input-group-addon">Remitente</span> 
        <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' class="form-control" id="ednir" name="ednir" placeholder="DNI Remitente">
        <span class="input-group-btn">          
          <a href="#" id="ebusca_remitente" class="btn btn-info glyphicon glyphicon-search" data-toggle="modal" data-target="#emodal_r" onclick="elimpia_tabla_r(); "></a>
        </span>
      </div>
          <input type="text" class="form-control" id="enombresr" name="enombresr" placeholder="Nombres Remitente" readonly="readonly">     
    </div><!--/span-->
<!--  Sucursal   -->
<div class="col-xs-6 col-sm-6 col-lg-4 form-group input-group-sm">
    <div class="input-group input-group-sm">
        <span class="input-group-addon">Codigo</span> 
        <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' class="form-control" id="origen" name="origen" placeholder="Sucursal de Origen">
        <span class="input-group-btn">                  
            <a href="#" id="ebusca_sucursal" class="btn btn-info glyphicon glyphicon-search" data-toggle="modal" data-target="#emodal_s" onclick="elimpia_tabla_s();"></a>
        </span>
    </div>              
    <input type="text" class="form-control" name="datapago" id="datapago" placeholder="Datos del Pago" readonly="readonly">
    <div class="input-group input-group-sm">        
        <input type="text" class="form-control" name="txtnrooperacion" id="txtnrooperacion" placeholder="Nro Operacion" readonly="readonly">
        <span class="input-group-btn">                    
            <a href="#" id="boton_pagar" class="btn btn-primary glyphicon glyphicon-user" data-placement="right" title="Pagar Transferencia"></a>
        </span>              
    </div>   
    
    <input type="text" class="form-control" id="eobserva" name="eobserva"  placeholder="Observaciones"/>
</div><!--/span-->
<!-- MONEY -->
<div class="col-xs-6 col-sm-6 col-lg-4 input-group-sm">
                <div class="input-group input-group-sm ">
                  <span class="input-group-addon">Importe</span>
                  <input type="text" class="form-control" id="eimporte_r" name="eimporte_r" value="0" onblur="eADecimal();" onkeyup=""/>
                </div>                 
                
                <div class="input-group input-group-sm">                  
                  <span class="input-group-addon">Cargo</span>
                  <input type="text" class="form-control" id="ecargo_r" name="ecargo_r" value="0" onblur="eADecimal();" onkeyup=""/>
                </div>
        <div class="input-group input-group-sm">
                    <span class="input-group-addon">Porcentaje</span> 
                    <select class="form-control input-sm" id="elistaporcentajes" onchange="ecalcula_cargo();">                
                    <option value="1.5">1.5 %</option> <option value="2.0">2.0 %</option> <option value="2.5">2.5 %   </option> 
                    <option value="3.0">3.0 %</option> <option value="3.5">3.5 %</option> <option value="4.0">4.0 %   </option> 
                    <option value="4.5">4.5 %</option> <option value="5.0">5.0 %</option> <option value="5.5">5.5 %   </option> 
                    <option value="6.0">6.0 %</option> <option value="6.5">6.5 %</option> <option value="7.0">7.0 %   </option>
                    <option value="7.5">7.5 %</option> <option value="8.0">8.0 %</option> <option value="8.5">8.5 %   </option>
                    <option value="9.0">9.0 %</option> <option value="9.5">9.5 %</option> <option value="10.0">10.0 % </option>
                  </select>
        </div>
</div>

</div><!--/row-->                      
</div><!--/span-->
 <!-- /////////////////// Sidebar BBB ////////////////////////-->
 <form name="eform_imprime" action="Imprime_Entregados.php" target="_blank" method='post'>
     <div class="col-xs-6 col-sm-3 sidebar-offcanvas " id="sidebar" role="navigation" >
         <div class="list-group">
             <a href="#" id="nombresucursal" class="list-group-item active"><?php echo $_SESSION['sucursal'] ?>
                 <span id="codigosucursal" class="badge"><?php echo $_SESSION['codsucursal'] ?></span>
             </a>
             <a href="#" id='nombreusuario' class="list-group-item"><?php echo $_SESSION['usuario'] ?>                        
             </a>
             <a href="#" class="list-group-item">
                 <input type="text" id="efecha_r" name="efecha_r" value = "<?php echo date('Y-m-d')?>">Fecha

             </a>
             <a href="#" class="list-group-item "> 
                 <div id="carga" style="display:none"> <img src="img/cargando.gif" /> </div>                 
             </a>                                                
             <!--<input type="text" style="text-transform:uppercase" class="form-control" id="ebuscador" placeholder="Buscar" />                    -->
         </div>             
     </div><!-- sidebar -->
     <input type="hidden" name="pdffecha" id="pdffecha">
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
     <input type="hidden" name="codgirosucursal" id="codgirosucursal">     
     
     <input type="hidden" name="correlativo" id="correlativo">
     <input type="hidden" name="eidclienteb" id="eidclienteb">
     <input type="hidden" name="eidclienter" id="eidclienter">
     <input type="hidden" name="codsucursal" id="codsucursal"            value="<?php echo $_SESSION['codsucursal'] ?>">
     <input type="hidden" name="codsucursalo" id="codsucursalo">
     <input type="hidden" name="optbuscar" id="optbuscar" value="E">
     <input type="hidden" name="nick"  id="enick"                         value="<?php echo $_SESSION['nick']?>" >
     <input type="hidden" name="efechahoy" id="efechahoy"                  value="<?=$FechaHoy ?>">
     <input type="hidden" name="efechahorahoy" id="efechahorahoy"          value="<?=$Fechahora?>">
     <input type="hidden" name="tipousuario" id="tipousuario"            value="<?php echo $_SESSION['tipousuario']?>">    
     <input type="hidden" name="sele_fe" id="sele_fe" value="R[0]">
     <input type="hidden" name="anulado" id="anulado">
     <input type="hidden" name="usuaentrega" id="usuaentrega" >
     <input type="hidden" name="idbanco" id="idbanco" >

 </form>
</div> <!-- canvas-->
 <div id="econtiene_tabla" class="table-responsive" name="econtiene_tabla" >    
    <!--<table class="table table-hover table-condensed"  id="TRecibidos">*/-->
    <table  id="TEntregados" class="table table-condensed" >
        <thead >
            <tr>
                <th>Nro</th>                
                <th>Codigo</th>
                <th>Fecha</th>
                <th class='eoculto'>DNI-B</th>               
                <th>Beneficiario</th>
                <th class='eoculto'>DNI-R</th>               
                <th>Remitente</th>
                <th>Destino</th>
                <th>Importe</th>
                <th class='eoculto'>Cargo</th>
                <th class="eoculto">IGV</th>
                <th class="eoculto">ITF</th>
                <th class='eoculto'>Otros</th>
                <th class='eoculto'>Total</th>
                <th>Nro.Cuenta</th>
                <th>N.Operacion</th>
                <th >UsuaRgstra</th>
                <th >fechaEntrega</th>
                <th >UsuaEntrega</th>
                <th>Observa</th>
                <th class="eoculto">Destino</th>                
                <th class="eoculto">NomSucursal</th>
                <th>Datos Pago</th>
                <th class="eoculto">A</th>
                
            </tr>
         </thead>
        <tbody id="tablaentregados" 
           
         </tbody>            
          
    </table>
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
        <!--================================================================================== 
            ============================ DIALOGO ASIGNA CUENTAS ============================== -->
        <div id="dialogo_asigcuenta" title="Cuentas"  >             
            
<button type="button" id="btn_efectivo" class="btn btn-xs btn-default">En Efectivo</button>
<button type="button" id="btn_otrotipopago" class="btn btn-xs btn-default">Otro Medio</button>                 
                <div class="input-group input-group-sm">                                
                <input type="text" id="descbanco" name="descbanco" class="form-control" placeholder="Nombre Banco" />    
                <span class="input-group-btn">                    
                    <a href="#" id="ebusca_beneficiario" class="btn btn-info glyphicon glyphicon-search" onclick="MuestraBuscador();"></a>
                </span>                
                </div>
            <input type="text" id="etxt_bancos" name="etxt_bancos" style="display:none" class="form-control" style="text-transform:uppercase" placeholder="Busca Banco" />    
            <input type="text" id="datoscuenta" name="datoscuenta" style="text-transform:uppercase"  class="form-control" placeholder="Cuenta" />
            <input type="text" id="nrodeoperacion" name="nrooperacion" style="text-transform:uppercase" class="form-control" placeholder="Nro de Operacion" />
            <div id="carga1" ></div>
            
        <table id="tabla_bancos" class="table table-condensed ">
                    <thead>
                        <tr>
                            <th>Nro. </th>
                            <th class="eoculto">idbanco</th>
                            <th>Banco</th>
                            <th>Descripcion</th>                            
                        </tr>
                    </thead>
                    <tbody id="tbody_banco" title="Para Seleccionar --> Click" >

                    </tbody>
                </table>                
            <div class="table-responsive" > 
                <table id="tabla_cuentas" style="display:none"  class="table table-condensed ">
                <!--<table id="tabla_cuentas" class="table table-condensed ">  -->
                    <thead>
                        <tr>
                            <th>Nro. </th>
                            <th>UserSistema</th>
                            <th >Banco</th>
                            <th>Nro. Cuenta</th>                            
                        </tr>
                    </thead>
                    <tbody id="tbody_cuentasxusuario" title="Para Seleccionar -->Doble Click" >

                    </tbody>
                </table>
            </div>
        </div>

<!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster-->
    <script type="text/javascript" language="javascript" src="js/bootstrap.min.js"></script> 
    <script type="text/javascript" language="javascript" src="js/offcanvas.js"></script>
    <script type="text/javascript" language="javascript" src="js/validacampos.js"></script>
    <script type="text/javascript" language="javascript" src="js/alertify.js"></script>
    
</body>
</html>

