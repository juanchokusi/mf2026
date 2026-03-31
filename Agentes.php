<?php
date_default_timezone_set("America/Lima");
session_start();
require 'controles/ConectaMySql.php';
$Fechahora = date("Y-m-d H:i:s");
$FechaHoy = date("Y-m-d");
        
        $sql_bancos= "SELECT concat(b.iniciales,c.nrocuenta) as nrocuenta,b.desc_banco FROM bancos b left join cuentas c on b.idbanco=c.idbanco where b.grupo = 'A' order by 2;";
	$result_bancos = $mysqli->query($sql_bancos);
	$optbancos = '<option value="0"> Elige una Banco</option>';
	while( $fila = $result_bancos->fetch_array() )
	{
		$optbancos.='<option value="'.$fila["nrocuenta"].'">'.$fila["desc_banco"].'</option>';
	}
        $Consulta = "SELECT CONCAT(tipo,dinero,idtipotransaccion) as idttran,descripcion from tipotransaccion where grupo='A' and anulado='N';";
	$result = $mysqli->query($Consulta);
	$opttipotrans = '<option value="0"> Elige Transacción</option>';
	while( $fila = $result->fetch_array() )
	{
		$opttipotrans.='<option value="'.$fila["idttran"].'">'.$fila["descripcion"].'</option>';
	}
        $sql_sucursales = "SELECT cod_sucursal,nom_sucursal from sucursal where anulado='N' order BY nom_sucursal;";
	$result_sucursal = $mysqli->query($sql_sucursales);
	$optsucursales = '<option value="0">Origen</option>';
	while( $fila = $result_sucursal->fetch_array() )
	{
		$optsucursales.='<option value="'.$fila["cod_sucursal"].'">'.$fila["nom_sucursal"].'</option>';
	}
        
        $sql_nusuario= "SELECT idusuario, nusuario from usuariosistema where anulado='N' order BY 2;";
	$result_nusuarios = $mysqli->query($sql_nusuario);
	$optusuarios = '<option value="0"> Responsable...</option>';
	while( $fila = $result_nusuarios->fetch_array() )
	{
		$optusuarios.='<option value="'.$fila["idusuario"].'">'.$fila["nusuario"].'</option>';
	}
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <title>Agentes</title>
        <meta name="generator" content="Bootply" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">        
        <!--[if lt IE 9]>
                <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
        <link rel="stylesheet" type='text/css' href="css/bootstrap.min.css">        
        <link rel="stylesheet" type="text/css" href="css/jquery-ui.css"/>
        <link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'/>
        <link rel="stylesheet" type='text/css' href="css/css_agentes.css">        
    </head>
    <body>
        
<div class="page-container">
    <!-- top navbar -->
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="offcanvas" data-target=".sidebar-nav">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Agentes</a>

            </div>
        </div>
    </div>
        
<div class="container-fluid">
        
    <div class="row row-offcanvas row-offcanvas-left">

        <!-- sidebar -->
<div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
            <ul class="nav">
                <div id="carga" > </div>
                <div class="input-group input-group-sm">
                    <input type="text" id="txtnick" class="form-control" value="<?php echo $_SESSION['nick']?>" readonly="readonly" >
                    <input type="text" id="txtsucursal" class="form-control" value="<?php echo $_SESSION['sucursal']?>" readonly="readonly">
                </div>
                <select class="form-control input-sm"   id="listabancos"><?php echo $optbancos; ?>     </select>
                <div id="divimagen"  > 
                    <img src="" class="img-responsive" id="myimage" >
                </div>
                <div class="input-group input-group-sm">
                    <input type="text" class="form-control" id="datos_cuenta" readonly="readonly" >
                    <span class="input-group-btn"><a href="#" id="btn_nuevo" class="btn btn-default glyphicon glyphicon-plus blue" title="Nuevo"></a></span>
                    <span class="input-group-btn"><a href="#" id="btn_cancelar" class="ocultame btn btn-default glyphicon glyphicon-remove blue" title="Cancelar"></a></span>
                    <span class="input-group-btn"><a href="#" id="btn_guardar" class="ocultame btn btn-default glyphicon glyphicon-floppy-disk blue" title="Guardar"></a></span>
                    
                </div>
                
                <select class="form-control input-sm ocultame"   id="listatipotran"> <?php echo $opttipotrans; ?>  </select>
                <div id="divcta_destino" class="ocultame input-group input-group-sm">
                    <input type="text" class=" form-control" id="cta_destino" placeholder="Cuenta Destino">
                    <span class="input-group-btn"><a href="#" id="btn_usuariocuenta" class=" btn btn-default glyphicon glyphicon-th-list blue" title="Cuentas de Usuario"></a></span>
                </div>
                <!--<input type="text" class="form-control" id="desc_cuenta" placeholder="" readonly="readonly" >-->
                <input type="text" class="ocultame form-control" id="monto" placeholder=" S/. 00.00"  >
                <input type="text" class="ocultame form-control" id="nro_operacion" placeholder="Nro. Operación"  >
                <select class="ocultame form-control input-sm"   id="listasucursal"> <?php echo $optsucursales; ?>  </select>
                <select class="ocultame form-control input-sm"   id="listausuarios"> <?php echo $optusuarios; ?>  </select>
                <input type="text" class="ocultame form-control" id="nromovs" placeholder="Nro.Ops"  >
                <input type="text" class="ocultame form-control" id="observacion" placeholder="Observacion"  >                                
            </ul>        
    </div>
        
<!--============================== main area ==========================-->

<div class="col-xs-12 col-sm-9">
 
<input type="text" id="fechai" value="<?php echo date("Y/m/d");?>">
<input type="text" id="fechaf" value="<?php echo date("Y/m/d");?>">  
<button id="btn_movscuenta" type="button" class="btn btn-default btn-xs blue" title="Muestra Movimientos de Agente" >Movimientos</button>
<!--<button id="btn_masmovs" type="button" class="btn btn-default btn-xs" >+ Información</button>-->
<div  class="table-responsive mygrid-wrapper-div">
    <table id="TMovsAgente" class="table table-bordered table-condensed">
        <thead >
            <tr>
                <th></th>
                <th>Nro</th>
                <th style="display: none" > ID</th>
                <th>                        Fecha</th>
                <th>                        Motivo</th>              
                <th>                        CtaDestino</th>
                <th>                        Observación</th>
                <th>                        Datos Transferencia</th>
                <th>                        Datos Beneficiario</th>
                <th style='display: none'>  UsuaModifica</th>
                <th style='display: none'>  NroOperacion</th>                
                <th >                       NroOPs</th>                
                <th  align='right'>         Ingreso</th>               
                <th  align='right'>         Salida</th>                
                <th align='right'>          Cuenta</th>
                <th align='right'>          Efectivo</th>
            </tr>
        </thead>
        <tbody id="tbody_MovsAgente" 

    </tbody>
</table>
</div>

</div><!-- /.col-xs-12 main -->

 </div><!--/.row-->
 </div><!--/.container-->
</div><!--/.page-container-->
<!-- script references -->

<input type="hidden" id="sele_cu" value="cu[0]">
<input type="hidden" id="sele_mv" value="mv[0]">
<input type="hidden" id="nro_cuenta">   
<input type="hidden" id="tipotran">
<input type="hidden" id="ingsal">
<input type="hidden" id="idtran">

<input type="hidden" id="usuariosistema" value="<?php echo $_SESSION['nick']?>" >
<input type="hidden" id="opver" value="mas">
<input type="hidden" id="iniciales" >
<input type="text" id="tipodinero" > <!-- recoge tipo de operacion y dinero -->

<div id="dialogo_cuentas" >
    <div class="table-responsive"> 
        <table id="tabla_usuariocuenta" class="table table-condensed table-bordered">
            <thead >
                <tr>                            
                    <th>Usuario</th>
                    <th>Banco</th>
                    <th>NroCuenta</th>
                </tr>
            </thead>                                                   
            <tbody id="tbody_usuarioucenta">

            </tbody>
        </table>                    
    </div>        
</div>



<script type="text/javascript" src="js/jquery.1.7.1.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>

<script type="text/javascript" src="js/FuncionesAgente.js"></script>    
<script type="text/javascript" src="js/jquery.alerts.js"></script>
<script type="text/javascript" src="js/validacampos.js"></script>


</body>

</html>
