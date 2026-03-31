<?php
date_default_timezone_set("America/Lima");
//require_once("controles/classRecibeEntrega.php");
session_start();
$Fechahora = date("Y-m-d H:i:s");
$FechaHoy = date("Y-m-d");
//require 'controles/ConectaMySql.php'; 
//$sql_bancos= " call spListaInsertaDinero('MFS2015118','2015-01-18') "; 
//	$result_bancos = $mysqli->query($sql_bancos);
//
//?>
<!--<!DOCTYPE html>-->
<!doctype html public "-//W3C//DTD HTML 4.01 Transitional//EN" 
"http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<!--    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">-->

    <title>Cierre Diario</title>
    
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css" />  
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css"/>   
    <link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'>       
    <link rel="stylesheet" type="text/css" href="css/simple-sidebar.css">   
    <link rel="stylesheet" type="text/css" href="css/css_diario.css">
       
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>
<style type="text/css">
        
       th {padding:5px;background: #428bca;color:white}
        /*td {padding:5px;border:solid #ddd;border-width:0 0 1px;}*/
        th {font-size: 11px}
        .editable span{display:block;}
        .editable span:hover {background:url(img/edit.png) 80% 50% no-repeat;cursor:pointer}
        a.enlace{display:inline-block;width:24px;height:24px;margin:0 0 0 5px;overflow:hidden;text-indent:-999em;vertical-align:middle}
        .guardar{background:url(img/save.png) 0 0 no-repeat}
        .guardatipo{background:url(img/save.png) 0 0 no-repeat}
        .cancelar{background:url(img/cancel.png) 0 0 no-repeat}
        
        .guardard{background:url(img/save.png) 0 0 no-repeat}
        .cancelard{background:url(img/cancel.png) 0 0 no-repeat}       
        .mensaje{display:block;text-align:center;margin:0 0 20px 0}
        .ok{display:block;padding:10px;text-align:center;background:green;color:#fff}
        .ko{display:block;padding:10px;text-align:center;background:red;color:#fff}
        .ocultame {display: none}
        
    </style>
<body>
<div id="wrapper">
        <!-- Sidebar -->
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#">Cierre Diario</a>
                </li>
                <!--<li>
                    <a href="#">Dashboard</a>
                </li> -->
                <div class="input-group input-group-sm">
                    <input type="text" id="txtnick" class="form-control" value="<?php echo $_SESSION['nick']?>" readonly="readonly" >
                    <input type="text" id="txtsucursal" class="form-control" value="<?php echo $_SESSION['sucursal']?>" readonly="readonly">
                </div>                		
                <div class="input-group input-group-sm">
                    <input type="text" class="form-control" readonly="readonly" id="codcierrediario">
                    <input type="text" class="form-control" readonly="readonly" id="fechacierrediario">
                    <button type="button" id="btn_span" class="btn btn-default btn-sm blue">  <span id="span_abierto" class="glyphicon glyphicon-thumbs-up"></span> 
                                                                                              <span id="span_cerrado" class="glyphicon glyphicon-lock"></span> </button>    
                </div>                                    
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Total Ingresos</span>
                    <input type="text" class="form-control" id="total_ingresos" readonly="readonly">
                </div>
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Total Egresos</span>
                    <input type="text" class="form-control" id="total_egresos" readonly="readonly">
                </div>                    
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Saldo Final</span>
                    <input type="text" class="form-control" id="total_saldo" readonly="readonly">
                </div>
             
                <input type="text" id="fecha_cierre"  readonly="readonly" value="<?php echo $FechaHoy ?>">
                
                <div id="divbotones" class="input-group input-group-sm">
                    <button type="button" id="btn_nuevo" class="btn btn-default btn-xs blue">Nuevo</button>
                    <button type="button" id="btn_cerrar"  class="btn btn-default btn-xs blue" title="Cerrar Diario"><strong>Cerrar Diario</strong></button>
                    <button type="button" id="btn_recargadetalle"   class="btn btn-default btn-xs blue" onclick="FnCargaDetalle();">CargaDetalles</button>
                    <button type="button" id="btn_recalculatotales" class="btn btn-default btn-xs blue" onclick="FnCalculaTotales();">CalculaTotales</button>
                    <button type="button" id="btn_actualizasaldos" class="btn btn-default btn-xs blue ocultame" title="Actualiza Saldos">Actualiza Saldos</button>
                    <button type="button" id="imprimediario" class="btn btn-default btn-xs"><strong>Imprime Diario</strong></button>
                    <button type="button" id="btn_dinero" class="btn btn-default btn-xs blue">
                        <span class="fa fa-money fa-2x"></span>
                    </button>
                </div>
                
                <div id="" class="mygrid-wrapper-divd">
                <table id="lista_diario" class="table table-condensed table-bordered table-hover table-striped">
                    <thead>
                    <tr>
                      <td>Fecha</td>
                      <td>SaldoI</td>                     
                      <td>SaldoF</td>
                      <td>Estado</td>
                    </tr>
                    </thead>
                    <tbody id="body_listadiario" >

                    </tbody>
                </table>
                </div>
                
            </ul>
    </div>
        <!-- /#sidebar-wrapper -->

<div id="page-content-wrapper">
<a href="#menu-toggle" class="btn btn-default btn-xs blue" id="menu-toggle" title="Oculta Barra Lateral">Menu</a>    
<div class="row">
<!--///////////////////////// INGRESOS /////////////////////////////////-->
    <div class="col-xs-6 col-sm-6 form-group input-group-sm">
        <div id="div_btnsingreso" class="input-group input-group-sm">
            <button type="button" id="nuevo_ing"   onclick="ActivaControles('I');" class="btn btn-default btn-xs blue" title="Nuevo Ingreso">
                <span class="glyphicon glyphicon-plus"></span> 
            </button>
            <button type="button" id="inserta_ing" class="btn btn-default btn-xs blue">
                <span class="glyphicon glyphicon-floppy-disk"></span>
            </button>
            <button type="button" id="btn_cancelaing" class="btn btn-default btn-xs blue" title="Cancelar">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </button>
            <button type="button" id="imprime_ing" class="btn btn-default btn-xs blue" title="Imprimir Ingreso">
                <span class="glyphicon glyphicon-print"></span>
            </button>
        </div>
        <div id="div_btns_ingreso">
<!--            <button type="button" onclick="FnCargaDetalle();" class="btn btn-warning btn-sm">
                <span class="glyphicon glyphicon-refresh"></span>
            </button>           -->
            <div class="input-group input-group-sm">
                <span class="input-group-addon">Concepto</span>                
                <input type="text" class="form-control" id="concepto_ing"  onkeyup='javascript:this.value=this.value.toUpperCase();'>
            </div>                    
            <div class="input-group input-group-sm">
                <span class="input-group-addon">Responsable</span>
                <input type="text" class="form-control " id="responsable_ing" onkeyup='javascript:this.value=this.value.toUpperCase();'> 
            </div>
            <div class="input-group input-group-sm">
                <span class="input-group-addon">Monto</span>
                <input type="text" class="form-control " id="ingreso"  value="0" onfocus="if (this.value >= '0') {this.value = '';}" onblur="ADecimal();" >    
            </div>
        </div>
        <div class="table-responsive mygrid-wrapper-divi">
            <table id="IngresosDet" class=" table table-condensed " >
                <thead>
                <tr>
                    <th></th>
                    <th>Itm</th>
                    <th>Concepto</th>
                    <th>Responsable</th>
                    <th>Ingreso</th>
                </tr>
                </thead>
                <tbody id="body_ingresos" >

                </tbody>
                
            </table>
        </div> 
        <div class="input-group input-group-sm">
                <span class="input-group-addon">Total Ingresos</span>
                <input type="text" class="form-control " id="total_i" readonly="readonly" > 
        </div>
</div>
<!--///////////////////////// SALIDA /////////////////////////////////-->
<div class="col-xs-6 col-sm-6 form-group input-group-sm">
    <div id="div_btnsegreso" class="input-group input-group-sm">
        <button type="button" id="nuevo_eg" onclick="ActivaControles('E');" class="btn btn-default btn-xs blue" title="Nuevo Igreso">
            <span class="glyphicon glyphicon-plus"></span> 
        </button>
        <button type="button" id="inserta_eg" class="btn btn-default btn-xs blue">
            <span class="glyphicon glyphicon-floppy-disk"></span>
        </button>
        <button type="button" id="btn_cancelaeg" class="btn btn-default btn-xs blue" title="Cancelar">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </button>
        <button type="button" id="imprime_eg" class="btn btn-default btn-xs blue" title="Imprimir Egreso">
            <span class="glyphicon glyphicon-print"></span>
        </button>
    </div>
    <div id="div_btns_egreso" class="input-group input-group-sm">

            <div class="input-group input-group-sm">
                <span class="input-group-addon">Concepto</span>                
                <input type="text" class="form-control" id="concepto_eg"  onkeyup='javascript:this.value=this.value.toUpperCase();'>
            </div>                    
            <div class="input-group input-group-sm">
                <span class="input-group-addon">Responsable</span>
                <input type="text" class="form-control " id="responsable_eg" onkeyup='javascript:this.value=this.value.toUpperCase();'> 
            </div>
            <div class="input-group input-group-sm">
                <span class="input-group-addon">Monto</span>
                <input type="text" class="form-control " id="egreso"  value="0" onfocus="if (this.value >= '0') {this.value = '';}" onblur="ADecimal();" >    
            </div>
    </div>
    <div  class="table-responsive mygrid-wrapper-dive">
        <table id="EgresosDet" class="table table-condensed">
            <thead>
            <tr>
                <th></th>
                <th>Nro</th>
                <th>Concepto</th>
                <th>Responsable</th>
                <th>Salida</th>
            </tr>
            </thead>
            <tbody id="body_egresos" >

            </tbody>
        </table>
    </div>
        <div class="input-group input-group-sm">
                <span class="input-group-addon">Total Salidas</span>
                <input type="text" class="form-control " id="total_e" readonly="readonly" > 
        </div>
</div>
        
</div>    
                <div id="carga" style="display:none"> <img src="img/cargando.gif" /> </div>
    <div class="row">         
        <div class="col-lg-12">
        <!--<a href="#menu-toggle" class="btn btn-default btn-xs blue" id="btn_vergiros" title="Oculta Barra Lateral">Ver Giros</a>-->
            <div class="table-responsive mygrid-wrapper-divgiros">
                <table id="transferencias" class="table table-condensed table-hover ">
                    <thead>
                    <tr>
                        <th>Nro             </th>
                        <th>Codigo          </th>
                        <th>Destino         </th>
                        <th>Fecha Registro  </th>
                        <th>Fecha Entrega   </th>
                        <th>Beneficiario    </th>
                        <th>Remitente       </th>
                        <th>Entrega         </th>
                        <th>Recepcion       </th>
                        <th>Pendiente       </th>
                    </tr>
                    </thead>
                <tbody id="body_giros" >

                </tbody>
                </table>   
            </div>
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Total Entregados</span>
                    <input type="text" class="form-control " id="total_en" readonly="readonly">
                    <span class="input-group-addon">Total Recepcion</span>
                    <input type="text" class="form-control " id="total_re" readonly="readonly">
                    <span class="input-group-addon">Total Pendiente</span>
                    <input type="text" class="form-control " id="total_pe" readonly="readonly">
                </div>
        </div>        	        
        
    </div>

</div>
<div id="dialogo_dinero" >
    <?php echo $_SESSION['sucursal']?>    
    <div id="divdinero" class="table-responsive"> 
        <table id="tabla_dinero" class="table table-condensed table-bordered">
            <thead >
                <tr>                            
                    <th>Itm</th>
                    <th class="ocultame">coddiario</th>
                    <th>S/.</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tfoot>
                <tr>                            
                    <th></th>
                    <th class="ocultame"></th>
                    <th ></th>
                    <th align="right">Total</th>
                    <th id="total_dinero"></th>
                </tr>
            </tfoot>
            <tbody id="body_dinero">
               
            </tbody>
        </table>
    <?php echo $Fechahora ?>    
        <button type="button" id="imprime_dinero" class="btn btn-default btn-sm blue" title="Imprimir Ingreso">
            <span class="glyphicon glyphicon-print"></span>
        </button>
<!--        <form action="imprimedinero.php" method="post" target="_blank" id="FormularioExportacion">
            <button  class="botonExcel" >pdf</button>
            <input type="hidden" id="datos_a_enviar" name="datos_a_enviar" />
        </form>-->
        
    </div> 
    
</div>  

        
            <!--</div>-->
</div> <!-- /#page-content-wrapper -->        
<input type="hidden"  id="codsucursal" value="<?php echo $_SESSION['codsucursal']?>">
<input type="hidden"  id="nombresucursal" value="<?php echo $_SESSION['sucursal']?>">
<input type="hidden"  id="nusuario" value="<?php echo $_SESSION['nick']?>">
<input type="hidden"  id="nombreusuario" value="<?php echo $_SESSION['usuario']?>">
<input type="hidden" id="tusuario" value="<?php echo $_SESSION['tipousuario']?>">
<input type="hidden" id="id_detalle">
<input type="hidden" id="opt_insert">
<input type="hidden" id="tingresos">
<input type="hidden" id="trecepcion">
<input type="hidden" id="tegresos">
<input type="hidden" id="tentrega">
<input type="hidden" id="tpendiente">
<input type="hidden" id="fechadehoy" value="<?php echo $FechaHoy ?>" >
<input type="hidden" id="fechahoradehoy" value="<?php echo $Fechahora ?>" >
<input type="hidden" id="estado">
<input type="hidden" id="numletras">
<input type="hidden" id="selei" value="I[0]" >
<input type="hidden" id="selee" value="E[0]" >
<input type="hidden" id="seled" value="d[0]" >
<input type="hidden" id="old_saldofinal">
<input type="hidden" id="opt_sele">
<input type="hidden" id="denominacion">

    <!-- jQuery -->    
    <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>    
    <script type="text/javascript" src="js/jquery-ui-1.10.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>       
    <script type="text/javascript" src="js/jquery.alerts.mod.js"></script>
    
    <script type="text/javascript" src="js/validacampos.js"></script>       
    <script type="text/javascript" src="js/FuncionesDiario.js"></script>
    <script type="text/javascript" src="js/FnNumeroALetras.js"></script>
    <script type="text/javascript" src="js/FuncionesEditaTablas.js"></script>
    <script type="text/javascript" src="js/CierraSesionInactivo.js"></script>
</body>

</html>

