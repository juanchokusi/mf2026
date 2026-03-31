<?php
date_default_timezone_set("America/Lima");
session_start();
require 'controles/ConectaMySql.php';
$Fechahora = date("Y-m-d H:i:s");
$FechaHoy = date("Y-m-d");

$Consulta = "SELECT CONCAT(idtipotransaccion,tipo) as tipo,descripcion from tipotransaccion WHERE grupo='C' AND anulado = 'N' ORDER by 1;";
$result = $mysqli->query($Consulta);
$opciones = '<option value="0"> Tipo Transacción </option>';
while ($fila = $result->fetch_array()) {
    $opciones.='<option value="' . $fila["tipo"] . '">' . $fila["descripcion"] . '</option>';
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Cuenta-Asociado</title>
        
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">                        
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css"/>  
    <link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'>    
    <link rel="stylesheet" type="text/css" href="css/simple-sidebar.css">
    <link rel="stylesheet" type="text/css" href="css/css_cuentausuario.css">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
        
    <style type="text/css">
        
        th {padding:5px;background:#555;color:#fff}
        td {padding:5px;border:solid #ddd;border-width:0 0 1px;}
        .editable span{display:block;}
        .editable span:hover {background:url(img/edit.png) 90% 50% no-repeat;cursor:pointer}
        td input{height:24px;width:200px;border:1px solid #ddd;padding:0 5px;margin:0;border-radius:6px;vertical-align:middle}
        a.enlace{display:inline-block;width:24px;height:24px;margin:0 0 0 5px;overflow:hidden;text-indent:-999em;vertical-align:middle}
        .guardar{background:url(img/save.png) 0 0 no-repeat}
        .cancelar{background:url(img/cancel.png) 0 0 no-repeat}
        /* .anular{background:url(img/eliminar.png) 0 0 no-repeat}	 */
        .mensaje{display:block;text-align:center;margin:0 0 20px 0}
        .ok{display:block;padding:10px;text-align:center;background:green;color:#fff}
        .ko{display:block;padding:10px;text-align:center;background:red;color:#fff}
        .ocultame {display: none}
        .ocultamee {display: none}
    </style>
</head>    
<body>
    <div id="wrapper">
        <!-- Sidebar -->
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#">Cuenta-Asociado</a>
                </li>
                <!--<li>
                    <a href="#">Dashboard</a>
                </li> -->
                <input type="text" class="form-control" id="datos_cuenta" readonly="readonly" >
                
                <div class="input-group input-group-sm">
                    <select class="form-control input-sm" id="listatipotran">
                        <?php echo $opciones; ?>
                    </select>
                    <span class="input-group-btn">          
                        <a href="#" id="btn_nuevatran" class="btn btn-default glyphicon glyphicon-plus blue" title="Nuevo"></a>
                    </span>
                </div>
                
                <div class="input-group input-group-sm ocultame">
                    <input type="text" class="form-control" id="monto" placeholder="S/. 00.00">
                    <span class="input-group-btn">          
                        <a href="#" id="btn_cancelatran" class="btn btn-default glyphicon glyphicon-remove blue" title="Cancelar"></a>
                    </span>
                </div>                
                <div class="input-group input-group-sm ocultame">                    
                    <input type="text" id="observa" onkeyup='javascript:this.value=this.value.toUpperCase();' class="form-control" placeholder="Dato adicional">
                    <span class="input-group-btn">          
                        <a href="#" id="btn_guardatran" class="btn btn-default glyphicon glyphicon-floppy-save blue" title="Guardar"></a>
                    </span>
                </div>
                <div class="input-group input-group-sm" style="display: none">                    
                    <input type="text" id="buscacuentausuario" style="text-transform: uppercase" class="form-control" placeholder="Buscar cuenta de usuario">
                    <span class="input-group-btn">          
                        <a href="#" id="btn_buscacuentausuario" class="btn btn-default glyphicon glyphicon-search blue" title="Buscar Cuenta de USUARIO"></a>
                    </span>
                </div>
                
            <div class="table-responsive mygrid-wrapper-div1"> 
                <table id="TUsuarioCuenta" class="table table-condensed table-bordered">
                    <thead >
                        <tr>
                            <!--<th>Nro</th> -->
                            <th>Usuario</th>
                            <th>Banco</th>
                            <th>NroCuenta</th>
                        </tr>
                    </thead>                                                   
                        <tbody id="tbody_UsuarioCuenta">

                        </tbody>
                </table>                    
             </div>
            <div class="input-group input-group-sm">
                <input type="text" id="txtnick" class="form-control" value="<?php echo $_SESSION['nick']?>" readonly="readonly" >
                <input type="text" id="txtsucursal" class="form-control" value="<?php echo $_SESSION['sucursal']?>" readonly="readonly">
            </div>                
                
                
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="mensaje"></div>
            <!--<div class="container-fluid">-->
                <div class="row">
                    <div class="col-lg-12">                        
                        <a href="#menu-toggle" class="btn btn-default btn-xs blue" id="menu-toggle"  title="Oculta Barra Lateral">Menu</a>
                        
                            <input type="text" id="fechai" value="<?php echo date("Y/m/d");?>">
                            <input type="text" id="fechaf" value="<?php echo date("Y/m/d");?>">  
                            <button id="btn_movscuenta" type="button" class="btn btn-default btn-xs" >Mostrar Movimientos</button>
                            <button id="btn_masmovs" type="button" class="btn btn-default btn-xs" >+ Información</button>
                            <div  class="table-responsive mygrid-wrapper-div">
                                <table id="TMovsCuenta" class="editinplace table-condensed">
                                    <thead >
                                        <tr>
                                            <th></th>
                                            <th>Nro</th>
                                            <th style="display: none" > ID</th>
                                            <th style="display: none" > ID</th>
                                            <th>                        Fecha</th>
                                            <th>                        Motivo</th>              
                                            <th>                        Datos Adicionales</th>
                                            <th >                       Datos Pago</th>
                                            <th >                       Datos Beneficiario</th>
                                            <th class="ocultamovs">     Usuario Paga</th>
                                            <th  align='right'>          Ingreso</th>               
                                            <th  align='right'>          Salida</th>                
                                            <th align='right'>          Saldo</th>
                                            <th style="display: none">  N</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody_MovsCuenta" 

                                </tbody>
                            </table>
                        </div>
                        
                    </div>
            </div>
            <!--</div>-->
        </div> <!-- /#page-content-wrapper -->
        
        <input type="hidden" id="sele_cu" value="cu[0]">
        <input type="hidden" id="sele_mv" value="mv[0]">
        <input type="hidden" id="nro_cuenta">           
        <input type="hidden" id="ingsal">        
        <input type="hidden" id="tipo_usuario" value="<?php echo $_SESSION['tipousuario']?>" >
        <input type="hidden" id="usuariosistema" value="<?php echo $_SESSION['nick']?>" >
        <input type="hidden" id="opver" value="mas">
        <input type="hidden" id="idtipotransaccion">
        <input type="hidden" id="idtipotran"> <!-- para el change de listatipotran  -->
        <input type="hidden" id="idtransaccion">
        <input type="hidden" id="ingreso">
        <input type="hidden" id="salida">
        <input type="hidden" id="descripcion">
        
        
    </div> <!-- /#wrapper -->       
                
    <!-- jQuery -->
            
    <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.10.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>

    <script type="text/javascript" src="js/FuncionesCuentaUsuario.js"></script>    
    <script type="text/javascript" src="js/jquery.alerts.mod.js"></script>
    <script type="text/javascript" src="js/validacampos.js"></script>   
   <script type="text/javascript" src="js/CierraSesionInactivo.js"></script>
</body>

</html>
