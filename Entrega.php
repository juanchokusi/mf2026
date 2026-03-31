<?php
if (!isset($_SESSION)) {
    session_start();
}
date_default_timezone_set("America/Lima");
//require_once("controles/classRecibeEntrega.php");
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
        
        <link rel="stylesheet" type="text/css" href="css/style_recibe_entrega.css"/>
    <link type="text/css" rel="stylesheet" href="css/jquery.dataTables.css"  />
    <link type="text/css" rel="stylesheet" href="css/dataTables.scroller.css"  />
        
    </head>
    <body>

         <!--Fixed navbar--> 
        <nav id="minavbar" class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="container" >
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <!--<a class="navbar-brand" href="#"><?php echo $_SESSION['nick'] ?></a>-->
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-left">
                        <!--<li><a href="#"> <?php echo $_SESSION['sucursal'] ?> </a> </li>--> 
<!--                    <li><a href="#" id="ebtn_cancelar"  onclick="eControlesCancelar();" >Cancelar</a></li>
                        <li><a href="#" id="eguardar"       onclick="eInserta_Recibidos();" >Guardar</a></li>         -->
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li> <input type="text" id="ebuscador" style="text-transform:uppercase" placeholder="Buscar" class="form-control"> </li>
                        <li> <input type="text" id="efecha_r" name="efecha_r" value = "<?php echo date('Y-m-d') ?>"> </li>
<!--                        <li><a href="" id="eimprimir_r"     onclick="fnImprimeRecibidos('manualmente');" >Imprimir</a></li>
                        <li><a href="" id="eanular"         onclick="fnConfirmaAnulaEntrega();">Anular</a></li> -->
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Pagar <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="#" id="boton_pagar" >Desde Asociado</a></li>
                                <li><a href="#" id="btn_pagadeagente" >Desde Agente</a></li>                            
                                <li class="divider"></li>                                                            
                                <li><a href="#" id="btn_efectivo" >Efectivo</a></li>
                            </ul>
                        </li>
                        <li><a href="#menu-toggle" id="menu_toggle"  title="Oculta/Muestra Formulario">Menu</a></li>
                        <li><a href="#menu-toggle" id="mas_datose" title="Muestra mas datos de la Transaccion">+Datos</a></li>
                        <li><a href="#" class="glyphicon glyphicon-print blue" id="imprime_entregados"  title="Imprimir"></a></li>
                    </ul>
                </div>
            </div>
        </nav>
        
    <!--
    <ul id="nav">
        <li class="nuevo">      <a id="enuevo"          onclick="eControlesNuevo();"      href="#" title="Nuevo"></a></li>
        <li class="cancelar">   <a id="ebtn_cancelar"   onclick="eControlesCancelar();"   href="#" title="Cacelar"></a></li>
        <li class="guardar">    <a id="eguardar"        onclick="eInserta_Recibidos();"   href="#" title="Guardar"></a></li>
        <li class="anular">     <a id="eanular"         onclick="fnConfirmaAnulaEntrega();"   href="#" title="Anular"></a></li>
        <li class="anular">     <a id="eanular" href="#" title="Anular"></a></li>
        <li class="imprimir">   <a id="eimprimir_r"     onclick="fnImprimeRecibidos('manualmente');" href="#" title="Imprimir"></a></li>
        
        <li class="masdatos">   <a id="mas_datose"      href="#" title="Mas Datos"></a></li>
        <li id="pagar" class=" pagar dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" title="Pagar giro"></a>
            <ul class="dropdown-menu" role="menu">
                <li class="efectivo" ><a href="#" id="btn_efectivo" title="Pagar en Efectivo">Efectivo</a></li>
                <li class="otromedio"><a href="#" id="btn_desdeagente" >Desde Agente</a></li>                            
                <li class="divider"></li>                            
                <li class="desdecuenta"><a href="#" id="boton_pagar" >Desde Cuenta</a></li>                            
            </ul>
        </li>
    </ul>-->

        
<div class=" container-fluid ">
<?php echo $_SESSION['nick'] ?>:::
<?php echo $_SESSION['sucursal'] ?> <div id="carga" style="display:none"><img src="img/cargando.gif" /></div>
    <div class="row" id="formulario">
                <!--  Beneficiario Remitente   -->
                <div class="col-xs-6 col-sm-3 ">
                    <div class="input-group input-group-sm">        
                        <input type="text" onkeyup='javascript:this.value = this.value.toUpperCase();' class="form-control" id="ednib" name="ednib" placeholder="DNI Beneficiario">
                        <span class="input-group-btn">
                            <a href="#" id="ebusca_beneficiario" class="btn btn-default glyphicon glyphicon-search" data-toggle="modal" data-target="#emodal_b" onclick=></a>
                        </span>
                    </div>
                    <input type="text" class="form-control" id="enombresb" placeholder="Nombres Beneficiario" readonly="readonly">                    
                
                    <div class="input-group input-group-sm">        
                        <input type="text" onkeyup='javascript:this.value = this.value.toUpperCase();' class="form-control" id="ednir" name="ednir" placeholder="DNI Remitente">
                        <span class="input-group-btn">          
                            <a href="#" id="ebusca_remitente" class="btn btn-default glyphicon glyphicon-search" data-toggle="modal" data-target="#emodal_r"></a>
                        </span>
                    </div>
                    <input type="text" class="form-control" id="enombresr" placeholder="Nombres Remitente" readonly="readonly">                    
                </div>
                <!-- MONEY -->
                <div class="col-xs-6 col-sm-3 ">
                    <div class="input-group input-group-sm ">
                        <span class="input-group-addon">Imprte</span>
                        <input type="text" class="form-control" id="eimporte_r" name="eimporte_r" value="0" onblur="eADecimal();" onkeyup=""/>
                    </div>                 
                    <div class="input-group input-group-sm">                  
                        <span class="input-group-addon">Cargo</span>
                        <input type="text" class="form-control" id="ecargo_r" name="ecargo_r" value="0" onblur="eADecimal();" onkeyup=""/>
                    </div>
                    <div class="input-group input-group-sm ">
                    <span class="input-group-addon">% %</span> 
                        <select class="form-control input-sm" id="elistaporcentajes" onchange="ecalcula_cargo();">                
                            <option value="1.5">1.5 %</option> <option value="2.0">2.0 %</option> <option value="2.5">2.5 %   </option> 
                            <option value="3.0">3.0 %</option> <option value="3.5">3.5 %</option> <option value="4.0">4.0 %   </option> 
                            <option value="4.5">4.5 %</option> <option value="5.0">5.0 %</option> <option value="5.5">5.5 %   </option> 
                            <option value="6.0">6.0 %</option> <option value="6.5">6.5 %</option> <option value="7.0">7.0 %   </option>
                            <option value="7.5">7.5 %</option> <option value="8.0">8.0 %</option> <option value="8.5">8.5 %   </option>
                            <option value="9.0">9.0 %</option> <option value="9.5">9.5 %</option> <option value="10.0">10.0 % </option>
                        </select>
                    </div>
                    <input type="text" class="form-control" id="txtnrooperacion" placeholder="Nro Operacion">
                </div>
                <!--  Sucursal   -->
                <div class="col-xs-6 col-sm-3 ">
                    <div class="input-group input-group-sm">        
                        <input type="text" onkeyup='javascript:this.value = this.value.toUpperCase();' class="form-control" id="origen" name="origen" placeholder="Sucursal de Origen">
                        <span class="input-group-btn">                  
                            <a href="#" id="ebusca_sucursal" class="btn btn-default glyphicon glyphicon-search" data-toggle="modal" data-target="#emodal_s"></a>
                        </span>
                    </div>
                    <input type="text" class="form-control" name="datapago" id="datapago" placeholder="Datos del Pago" readonly="readonly">
                    <input type="text" class="form-control" id="eobserva" placeholder="Observaciones"/>
                    
                </div>
                <div class="col-xs-6 col-sm-3 ">
                    <button id="enuevo" type="button"       onclick="eControlesNuevo();"        class="btn btn-default btn-xs blue">Nuevo</button>
                    <button id="ecancelar" type="button"    onclick="eControlesCancelar();"     class="btn btn-default btn-xs blue">Cancelar</button>
                    <button id="eguardar" type="button"     onclick="eInserta_Recibidos();"     class="btn btn-default btn-xs blue" >Guardar</button>
                    <button id="eanular" type="button"      onclick="fnConfirmaAnulaEntrega();" class="btn btn-default btn-xs blue" >Anular</button>
                    <button id="eimprimir_r" type="button"  onclick="fnImprimeRecibidos('manualmente');" class="btn btn-default btn-xs blue" >Imprimir</button>
                    <button id="mas_datose" type="button" class="btn btn-default btn-xs blue" >MasDatos</button>
                    
                </div>
                
    </div><!--/row-->

           
</div> <!-- conatainer fluid-->            

    <div id="econtiene_tabla" class="table-responsive mygrid-wrapper-div" >
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
                        <th class='eoculto'>Destino</th>
                        <th >Importe</th>
                        <th class='eoculto'>Cargo</th>
                        <th class="eoculto">IGV</th>
                        <th class="eoculto">ITF</th>
                        <th class='eoculto'>Otros</th>
                        <th class='eoculto'>Total</th>
                        <th>Nro.Cuenta</th>
                        <th>N.Operacion</th>
                        <th >UsuaRgstra</th>
                        <th >fechaEntrega</th>
                        <th class='eoculto'>UsuaEntrega</th>
                        <th>Observa</th>
                        <th class="eoculto">Destino</th>                
                        <th class="eoculto">NomSucursal</th>
                        <th>DatosPago</th>
                        <th class="eoculto">A</th>

                    </tr>
                </thead>
                <tbody id="tablaentregados" 

            </tbody>            

        </table>
    </div>


    <!--DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD -->
    <div class="modal fade" id="emodal_b" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
                    <h4 class="modal-title" id="emyModalLabel_B">BENEFICIARIO</h4>
                    <input type="text" style="text-transform:uppercase" id="edni_b" name="edni_b" />    
                    <select id="eopciones_b"> <option value='A'>Apellidos</option> <option value='D'>DNI</option> </select>
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
        <div class="input-group input-group-sm">                                
            <input type="text" id="descbanco" name="descbanco" style="text-transform:uppercase" class="form-control" placeholder="Nombre Banco" />    
            <span class="input-group-btn">                    
                <a href="#" id="btnbuscabancos" class="btn btn-default glyphicon glyphicon-search"></a>
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
                        <th>Asociado</th>
                        <th >Banco</th>
                        <th>Nro. Cuenta</th>                            
                    </tr>
                </thead>
                <tbody id="tbody_cuentasxusuario" title="Para Seleccionar -->Doble Click" >

                </tbody>
            </table>
        </div>
    </div>
    <!--dialogo mas datos-->
        <div id="dialogo_masdatose">
            <div class="table-responsive" > 
                <table id="tabla_masdatos" class="table table-condensed table-bordered ">
                    <thead>
                        <tr>
                            <th>DNI-Bene</th>
                            <th>DNI-Remte</th>
                            <th>IGV</th>
                            <th>ITF</th>
                            <th>Usua.Rgstra</th>
                            <th>Fecha Entrega</th>
                            <th>Usua.Entrega</th>
                            <th>Ciudad </th>
                            <th>Sucursal</th>
                        </tr>
                    </thead>
                    <tbody id="tbody_masdatose" >

                    </tbody>
                </table>
            </div>
        </div> 
<!-- PAGA CON AGENTE -->
    <div id="dialogo_pagaagente" title="Paga con cuenta de Agente"  >
<!--        <div class="input-group input-group-sm">                                
            <input type="text" id="descbanco" style="text-transform:uppercase" class="form-control" placeholder="Nombre Banco" />    
            <span class="input-group-btn">                    
                <a href="#" id="btnbuscabancos" class="btn btn-default glyphicon glyphicon-search"></a>
            </span>                
        </div>
        <input type="text" id="etxt_bancos"     style="display:none" class="form-control" style="text-transform:uppercase" placeholder="Busca Banco" />    -->
        <input type="text" id="datos_cuenta"     style="text-transform:uppercase" class="form-control" placeholder="Cuenta" />
        <input type="text" id="nro_deoperacion"  style="text-transform:uppercase" class="form-control" placeholder="Nro de Operacion" />
        <div id="carga1" ></div>

        <table id="tabla_agentes" class="table table-condensed ">
            <thead>
                <tr>
                    <th>Nro. </th>
                    <th class="eoculto">idbanco</th>
                    <th>Nro.Cuenta</th>
                    <th>Banco</th>
                    <th>Descripcion</th>                            
                </tr>
            </thead>
            <tbody id="body_agentes" >

            </tbody>
        </table>
        
    </div>
    
    <input type="hidden" id="md_dnib">
    <input type="hidden" id="md_dnir">
    <input type="hidden" id="md_igv">
    <input type="hidden" id="md_itf"> 
    <input type="hidden" id="md_usuaregistra" > 
    <input type="hidden" id="md_fechaentrega" > 
    <input type="hidden" id="md_usuaentrega" > 
    <input type="hidden" id="ciudaddestino" > 
    <input type="hidden" id="desdeagente" >
    <input type="hidden" id="sele_a" value="a[0]">
    
    
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
            <input type="hidden" name="nick"  id="nick"                         value="<?php echo $_SESSION['nick'] ?>" >
            <input type="hidden" name="efechahoy" id="efechahoy"                  value="<?= $FechaHoy ?>">
            <input type="hidden" name="efechahorahoy" id="efechahorahoy"          value="<?= $Fechahora ?>">
            <input type="hidden" id="tipousuario"            value="<?php echo $_SESSION['tipousuario'] ?>">    
            <input type="hidden" name="sele_fe" id="sele_fe" value="R[0]">
            <input type="hidden" name="anulado" id="anulado">
            <input type="hidden" name="usuaentrega" id="usuaentrega" >
            <input type="hidden" name="idbanco" id="idbanco" >
            <input type="hidden" name="idbanco" id="grupo" >
    <!-- Bootstrap core JavaScript
        ================================================== -->
    <!-- Placed at the end of the document so the pages load faster-->
<script type="text/javascript" language="javascript" src="js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" language="javascript" src="js/jquery-ui-1.10.min.js"></script>
<script type="text/javascript" language="javascript" src="js/jquery.alerts.mod.js"></script> 
<script type="text/javascript" language="javascript" src="js/bootstrap.min.js"></script> 
<script type="text/javascript" language="javascript" src="js/validacampos.js"></script>
<script type="text/javascript" language="javascript" src="js/CreaTablas.js"></script>
<script type="text/javascript" language="javascript" src="js/FuncionesEntrega.js"></script>
<script type="text/javascript" src="js/CierraSesionInactivo.js"></script>    

</body>
</html>

