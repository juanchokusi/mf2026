<?php
date_default_timezone_set("America/Lima");
//require_once("controles/classRecibeEntrega.php");
/* $datRE = new RecibeEntrega(); */
session_start();
$Fechahora = date("Y-m-d H:i:s");
$FechaHoy = date("Y-m-d");
$tusuario = $_SESSION['tipousuario'];
?>
<!DOCTYPE html >
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">
    
    <title>Recepción</title>

    <!-- Bootstrap core CSS -->
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css" />  
        <link rel="stylesheet" type="text/css" href="css/offcanvas.css"/> 
        <link rel="stylesheet" type="text/css" href="css/jquery-ui.css"/>
        <link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'/>        
        <link rel="stylesheet" type="text/css" href="css/style_recibe_entrega.css"/>
<style type="text/css">
        
/*        th {padding:5px;background:#555;color:#fff}
        td {padding:5px;border:solid #ddd;border-width:0 0 1px;}*/
        .editable span{display:block;}
        .editable span:hover {background:url(img/edit.png) 90% 50% no-repeat;cursor:pointer}
        td input{height:24px;width:100px;border:1px solid #ddd;padding:0 5px;margin:0;border-radius:6px;vertical-align:middle}
        a.enlace{display:inline-block;width:24px;height:24px;margin:0 0 0 5px;overflow:hidden;text-indent:-999em;vertical-align:middle}
        .guardar{background:url(img/save.png) 0 0 no-repeat}
        .cancelar{background:url(img/cancel.png) 0 0 no-repeat}
    </style>
  </head>

  <body>

    <!-- Fixed navbar -->
    <nav id="minavbar" class="navbar navbar-default navbar-fixed-top" role="navigation">
       <div class="container" >
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><?php echo $_SESSION['nick'] ?></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
              <li><a href="#"><?php echo $_SESSION['sucursal'] ?></a> </li>                            
            
           </ul>
          <ul class="nav navbar-nav navbar-right">
            <a href="#menu-toggle" class="btn btn-default btn-xs blue" id="menu_toggle"  title="Oculta/Muestra Formulario">Menu</a>
            <li> <input type="text" id="buscador" style="text-transform:uppercase" placeholder="Buscar" class="form-control"> </li>            
            <li> <input type="text" id="fecha_r" name="fecha_r" value = "<?php echo date('Y-m-d') ?>"> </li>
            
            
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
<div class="container-fluid">
    
    <div class="row" id="formulario">
<!--  Beneficiario Remitente   -->
    <div class="col-xs-6 col-sm-3">
      <div class="input-group input-group-sm ">
        <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' maxlength="10" class="form-control" id="dnib" name="dnib" placeholder="DNI Beneficiario">
        <span class="input-group-btn">          
          <a href="#" id="busca_beneficiario" class="btn btn-default glyphicon glyphicon-search blue"></a>
        </span>
      </div>
        <input type="text" class="form-control" id="nombresb" placeholder="Nombres Beneficiario" readonly="readonly">
    
      <div class="input-group input-group-sm ">        
        <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' maxlength="10" class="form-control" id="dnir" name="dnir" placeholder="DNI Remitente">
        <span class="input-group-btn">          
          <a href="#" id="busca_remitente" class="btn btn-default glyphicon glyphicon-search" "></a>
        </span>
      </div>
      <input type="text" class="form-control" id="nombresr" placeholder="Nombres Remitente" readonly="readonly">     
    </div><!--/span-->
<!--  Sucursal   -->
    <div class="col-xs-6 col-sm-3 ">
        <div class="input-group input-group-sm">            
            <input type="text" class="form-control" id="destino" name="destino" placeholder="Sucursal Destino" onkeyup='javascript:this.value=this.value.toUpperCase();' >
                <span class="input-group-btn">
                    <a href="#" id="busca_sucursal" class="btn btn-default glyphicon glyphicon-search" data-toggle="modal" data-target="#modal_s"></a>
                </span>
        </div>  
        <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' class="form-control" name="ciudaddestino" id="ciudaddestino" placeholder="Ciudad Destino (BOLETAS)">
        <input type="text" onkeyup='javascript:this.value=this.value.toUpperCase();' class="form-control" name="observa" id="observa" placeholder="Observaciones">
        <div class="input-group input-group-sm">                
            <input type="text" class="form-control" id="cuentas" name="cuentas" placeholder="Cuentas" readonly="readonly"/>
            <span class="input-group-btn">
                <a id="busca_cuentas" title="Buscar Cuentas" class="btn btn-default glyphicon glyphicon-home"></a>
            </span>
        </div> 

    </div><!--/span-->
 <!-- MONEY -->
<div class="col-xs-6 col-sm-3 ">
    <div class="input-group input-group-sm ">
        <span class="input-group-addon">Imprte</span>                
        <input type="text" class="form-control" id="importe_r" name="importe_r" value="0" onfocus="if (this.value >= '0') {this.value = '';}" onblur="ADecimal();"  onkeyup="CalculaCargo();"/>
    </div>  
    <div class="input-group input-group-sm">      
        <span class="input-group-addon">Cargo</span>
        <input type="text" class="form-control" id="cargo_r" name="cargo_r" value="0" onfocus="if (this.value >= '0') {this.value = '';}" onblur="ADecimal();" onkeyup="calcula_total();"/>
    </div>  
    <div class="input-group input-group-sm">         
        <span class="input-group-addon">Otros</span>
        <input type="text" class="form-control" id="otros_r" name="otros_r" value="0" onfocus="if (this.value >= '0') {this.value = '';}" onblur="ADecimal();" onkeyup="calcula_total();"/>
    </div>
    
    <div class="input-group input-group-sm has-error">         
        <span class="input-group-addon">Total</span>
        <input type="text" class="form-control" id="total_r" value="0" readonly="readonly"/> 

    </div>
    
</div> 
<!--  Porcentajes   -->
    <div class="col-xs-6 col-sm-3" >
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">% %</span> 
                    <select class="form-control input-sm" id="listaporcentajes" onblur="calcula_total();" onchange="calcula_cargo();"> 
                    <option value="1.5">1.5 %</option> <option value="2.0">2.0 %</option> <option value="2.5">2.5 %</option> 
                    <option value="3.0">3.0 %</option> <option value="3.5">3.5 %</option> <option value="4.0">4.0 %</option> 
                    <option value="4.5">4.5 %</option> <option value="5.0">5.0 %</option> <option value="5.5">5.5 %</option> 
                    <option value="6.0">6.0 %</option> <option value="6.5">6.5 %</option> <option value="7.0">7.0 %</option>
                    <option value="7.5">7.5 %</option> <option value="8.0">8.0 %</option> <option value="8.5">8.5 %</option>
                    <option value="9.0">9.0 %</option> <option value="9.5">9.5 %</option> <option value="10.0">10.0 %</option> 
                  </select>
                </div>
                <div class="input-group input-group-sm" style="display: none" >
                    <span class="input-group-addon">I.G.V.</span> 
                    <input type="text" class="form-control" id="igv_r" value="0" readonly="readonly">
                </div>
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Efctvo</span> 
                    <input type="text" class="form-control " id="efectivo_r" value="0" onfocus="if (this.value >= '0') {this.value = '';}" onkeyup="calcula_vuelto();">
                </div>  
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Vuelto</span> 
                    <input type="text" class="form-control" id="vuelto_r" value="0" readonly="readonly">
                </div>
                <button id="btn_nuevo" type="button"    class="normal btn btn-default btn-xs blue"><strong>Nuevo</strong></button> 
                <button id="btn_cancelar" type="button" class="normal btn btn-default btn-xs blue">Cancelar</button>
                <button id="btn_guardar" type="button"  class="normal btn btn-default btn-xs blue">
                    <span class="glyphicon glyphicon-floppy-disk"></span> 
                </button>
                <button id="btn_anular" type="button"   class="normal btn btn-default btn-xs blue" onclick="fnConfirmaAnulaRecibidos();" title="Anular Giro">
                        <span class="glyphicon glyphicon-remove"></span> 
                </button>
                <button id="imprimir_r" type="button"   class="normal btn btn-default btn-xs blue" onclick="fnImprimeRecibidos('manualmente');">
                    <span class="glyphicon glyphicon-print"></span> 
                </button>
                <button id="btn_masdatos" type="button" class="normal btn btn-default btn-xs blue" title="Obtener Mas Datos acerca de la transaccion">
                    <span class="fa fa-list-alt fa-lg"></span>
                </button>
                <button id="btn_boleta" type="button" class="normal btn btn-default btn-xs " title="Imprimir Boleta">
                    <span class="glyphicon glyphicon-bold"></span>
                    <!--<span class="fa fa-spinner fa-spin"></span>-->
                </button>                
                <button id="btn_editar" type="button"         class=" btn btn-default btn-xs" title="Editar Giro">Editar</button>
                <button id="btn_guardaedicion" type="button"  class="edita btn btn-default btn-xs" >Guardar Cambios</button>
                <button id="btn_cancelaedicion" type="button" class="edita btn btn-default btn-xs" >Cancelar</button>
                <div id="carga" style="display:none"> <img src="img/cargando.gif" /> </div>
    </div>

</div><!--/row-->

    <input type="hidden" id="correlativo">
    <input type="hidden" id="codgirosucursal">
    <input type="hidden" id="nick"                  value="<?php echo $_SESSION['nick']?>" >  
    <input type="hidden" id="codsucursal"           value="<?php echo $_SESSION['codsucursal']?>">
    <input type="hidden" id="codsucursald">    
    <input type="hidden" id="fechahoy"              value="<?= $FechaHoy ?>">
    <input type="hidden" id="fechahorahoy"          value="<?= $Fechahora ?>">
    <input type="hidden" id="tipousuario"           value="<?php echo $_SESSION['tipousuario']?>">    
    <input type="hidden" id="pdffecha">                 
    <input type="hidden" id="optbuscar" value="R">
    <input type="hidden" id="motivoanulacion">      
    <input type="hidden" id="pdfcoddestino">
    <input type="hidden" id="pdfnomsucudestino">      
    <input type="hidden" id="sele_fr" value="R[0]">
    <input type="hidden" id="sele_fe" value="[0]">
    <input type="hidden" id="anulado">                      
    <input type="hidden" id="opver" value="mas">                      
    <input type="hidden" id="usuaentrega"> <!-- para saber si esta pendiente-->    

</div>    <!--container fluid-->

<!-- ***************************** TABLA PRINCIPAL ****************************************************************-->
<div  class="table-responsive mygrid-wrapper-div" >    
    <table  id="TRecibidos" class="table table-bordered table-condensed" >
        <thead >
            <tr>
                <th>Nro</th>                
                <th>Codigo</th>
                <th>Fecha</th>
                <th class="oculto">DNI-B</th>               
                <th>Beneficiario</th>
                <th class="oculto">DNI-R</th>               
                <th>Remitente</th>
                <th>Destino</th>
                <th>Importe</th>
                <th>Cargo</th>
                <th class="oculto">IGV</th>
                <th class="oculto">ITF</th>
                <th>Otros</th>
                <th>Total</th>
                <th>Nro.Cuenta</th>
                <th>N.Operacion</th>
                <th class="oculto">UsuaRgstra</th>
                <th class="oculto">fechaEntrega</th>
                <th class="oculto">UsuaEntrega</th>
                <th>Observa</th>
                <th class="oculto">Destino</th>                
                <th class="oculto">NomSucursal</th>
                <th>DatosPago</th>
                <th class="oculto">A</th>
                <th class="oculto">Codigo</th>
                <th class="oculto">Codigo</th>
                <th class="oculto">Codigo</th>
                <th class="oculto">Codigo</th>
            </tr>
         </thead>
         <tbody id="tablarecibidos" 
           
         </tbody> 
    </table>
</div>

<div id="dialogo_buscaclib">
    <input type="text" style="text-transform:uppercase" id="dni_b" placeholder="Buscar Beneficiario"/>
    <select id="opciones_b" > <option value='A'>Apellido</option> <option value='D'>DNI</option> </select>
    <input type="button" class="blue" Value="BUSCAR" onclick="RecuperaClientesB();"/>
    <a href="#menu-toggle" class="btn btn-default btn-xs glyphicon glyphicon-user blue" id="btn_llamaclientesb"  title="Crea Nuevo Cliente"></a>
    <div class="mygrid-wrapper-divb" id="resultado_b"> 

    </div>
</div>

<div id="dialogo_buscaclir">
    <input type="text" style="text-transform:uppercase" id="dni_r" placeholder="buscar Remitente"/>
    <select id="opciones_r" > <option value='A'>Apellido</option> <option value='D'>DNI</option> </select>
    <input type="button" class="blue" Value="BUSCAR" onclick="RecuperaClientesR();"/>
    <a href="#menu-toggle" class="btn btn-default btn-xs glyphicon glyphicon-user blue" id="btn_llamaclientesr"  title="Crea Nuevo Cliente"></a>
    <div class="mygrid-wrapper-divr" id="resultado_r"> 

    </div>
</div>

<div id="dialogo_buscasucu">
    <input type="text" style="text-transform:uppercase" id="codsucu" placeholder="Buscar Sucursal"/>    
    <input type="button" class="blue" Value="Buscar Sucursal" onclick="RecuperaSucursal();"/>    
    <div class="mygrid-wrapper-divs" id="resultado_s"> 

    </div>
</div>


        <!--================================================================================== 
            ============================ DIALOGO ASIGNA CUENTAS ============================== -->
        <div id="dialogo_asigcuenta" title="Cuentas"> 
            <div class="input-group-sm">    
                <input type="text" id="txt_datocliente" name="txt_datoscliente" readonly="readonly" />     
                <!--Autocompleta -->
                
                <input type="text" id="txt_bancos" name="txt_bancos" style="text-transform:uppercase"  placeholder="Bancos" /> 
                <input type="text" id="txt_nrocuenta" name="txt_nrocuenta" onkeyup='javascript:this.value = this.value.toUpperCase();' placeholder="Nro. de Cuenta" />

                <button type="button" id="btn_asignacuenta"  onclick="" title="Guardar" class="btn btn-default btn-xs blue">
                    <span class="glyphicon glyphicon-floppy-disk "></span>
                </button>
                <button type="button" id="btn_nuevacuenta"  onclick="" title="Nuevo" class="btn btn-default btn-xs blue">
                    <span class="glyphicon glyphicon-file "></span>
                </button>
                <button type="button" id="btn_eliminacuenta"  onclick="" title="Eliminar" class="btn btn-default btn-xs blue">
                    <span class="glyphicon glyphicon-remove "></span>
                </button>
            </div>    
            
           
<!-- ========================================================================================================= -->
            <div id="divcta" class="table-responsive mygrid-wrapper-divcta" > 
                <table id="tabla_cuentas" class="table table-condensed table-bordered">
                    <thead>
                        <tr>
                            <th>Nro. </th>
                            <th>Nro. Cuenta</th>
                            <th>Banco</th>                            
                        </tr>
                    </thead>
                    <tbody id="tbody_cuentas" >

                    </tbody> 
                </table>
            </div>
            <div id="divbanco" class="table-responsive mygrid-wrapper-divban" > 
                <table id="tabla_bancos " class="table table-condensed table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Itm </th>
                            <th class='oculto' >ID </th>
                            <th>Iniciales</th>
                            <th>Banco</th>                            
                        </tr>
                    </thead>
                    <tbody id="tbody_banco">

                    </tbody>
                </table>
            </div>

        </div>

        <div id="dialogo_masdatos">
            <div class="table-responsive" > 
                <table id="tabla_masdatos" class="table table-condensed table-bordered ">
                    <thead>
                        <tr>
                            <th>Beneficiario</th>
                            <th>Remitente</th>
                            <th>IGV</th>
                            <th>ITF</th>
                            <th>Usua.Rgstra</th>
                            <th>Fecha Entrega</th>
                            <th>Usua.Entrega</th>
                            <th>Ciudad Destino</th>
                            <th>Sucursal Destino</th>
                            <th>Datos Edita</th>
                            <th>NroBoleta</th>
                        </tr>
                    </thead>
                    <tbody id="tbody_masdatos" >

                    </tbody>
                </table>
            </div>
        </div>    
        <!--BOLETA-->
        <div id="dialogo_boleta">
            <div class="input-group-sm">    
                <input type="text" id="boleta_serie" value="001"maxlength="3">
                <input type="text" id="boleta_nro" maxlength="6" >
                <input type="text" id="boleta_fecha" >
                
                <input type="text" id="boleta_nombres" class="form-control" readonly="radonly" >
                <input type="text" id="boleta_destino" class="form-control" onkeyup='javascript:this.value = this.value.toUpperCase();'/>
                
                <div class="input-group input-group-sm ">                    
                    <input type="text" class="form-control" id="boleta_describe" >    
                    <span class="input-group-addon"> <input type="text" id="boleta_cargo"> </span>                
                </div>  
                <input type="text" id="boleta_numeroletras" class="form-control" readonly="radonly" >
                <br>
                <button type="button" id="btn_boleta_guardar" title="Gurdar/Imprimir Boleta" class="btn btn-default btn-sm blue">
                    <span class="glyphicon glyphicon-print"></span>
                </button>
                <button type="button" id="btn_boleta_cancelar" title="Cancelar" class="btn btn-default btn-sm blue">
                    <span class="glyphicon glyphicon-remove-sign"></span>
                </button>
                <button type="button" id="btn_boleta_editar"  onclick="" title="Editar" class="btn btn-default btn-sm blue">
                    <span class="fa fa-edit fa-lg"></span>
                </button>
            </div>
        </div>   
        
    <input type="hidden" id="opproceso" name="opproceso" value="L">  <!-- opciones para proceso lista cuentas -->
    <input type="hidden" id="txt_idbanco" >        
    <input type="hidden" id="sele_asc" value="[0]"> <!-- como bandera al seleccionar filas -->
    <input type="hidden" id="opt" value="AUTOCOMPLETA">
    <input type="hidden" id="idclienteb" >
    <input type="hidden" id="idclienter">
    <input type="hidden" id="idcliente">
    <input type="hidden" id="hid_idbanco" >
    <input type="hidden" id="sele" value="[0]">
    <input type="hidden" id="sele_as" value="[0]">
    <input type="hidden" id="sele_cta" value="us.[0]">
    <input type="hidden" id="md_dnib"   >
    <input type="hidden" id="md_dnir"   >
    <input type="hidden" id="md_igv"  >
    <input type="hidden" id="md_itf"  > 
    <input type="hidden" id="md_usuaregistra" > 
    <input type="hidden" id="md_fechaentrega" > 
    <input type="hidden" id="md_usuaentrega" >
    <input type="hidden" id="datos_edita" >
    <input type="hidden" id="unclick" >
    <input type="hidden" id="nroboleta" >
    
<!--
        <footer>
            <p>&copy; dataweb 2014</p>
        </footer>
-->
        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->

    <script type="text/javascript" language="javascript" src="js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" language="javascript" src="js/jquery-ui-1.10.min.js"></script>
    <script type="text/javascript" language="javascript" src="js/jquery.alerts.mod.js"></script>    
    
    <script type="text/javascript" language="javascript" src="js/bootstrap.min.js"></script> 
    <script type="text/javascript" language="javascript" src="js/validacampos.js"></script>
    <script type="text/javascript" language="javascript" src="js/FuncionesRecepcion.js"></script>
    <script type="text/javascript" language="javascript" src="js/CreaTablas.js"></script>
    <script type="text/javascript" language="javascript" src="js/FnNumeroALetras.js"></script>
    <script type="text/javascript" language="javascript" src="js/FnEditaTablaRecibidos.js"></script>
	<script type="text/javascript" src="js/CierraSesionInactivo.js"></script>
    </body>
</html>

