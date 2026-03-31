<?php
date_default_timezone_set("America/Lima");
session_start();
require 'controles/ConectaMySql.php';
$Fechahora = date("Y-m-d H:i:s");
$FechaHoy = date("Y-m-d");
$iempresa = $_SESSION['codsucursal'];

$Consulta = "SELECT CONCAT(idtipotransaccion,tipo) as tipo,descripcion from tipotransaccion WHERE grupo='C' AND anulado = 'N' ORDER by 1;";
$result = $mysqli->query($Consulta);
$opciones = '<option value="0"> Tipo Transacción </option>';
while ($fila = $result->fetch_array()) {
    $opciones.='<option value="' . $fila["tipo"] . '">' . $fila["descripcion"] . '</option>';
}

$sql_sucursales = "SELECT cod_sucursal,nom_sucursal from sucursal where anulado='N' and idempresa=mid('" . $iempresa . "',1,1) order BY nom_sucursal";
$result_sucursal = $mysqli->query($sql_sucursales);
$opt_sucursales2 = '<option value="0" >Sucursal Destino</option>';
while ($fila = $result_sucursal->fetch_array()) {
  $opt_sucursales2 .= '<option value="' . $fila["cod_sucursal"] . '">' . $fila["nom_sucursal"] . '</option>';
}
/* echo ("<script>console.log('PHP id: " . $iempresa . "');</script>");
echo ("<script>console.log('PHP sucursal: " . $opt_sucursales2 . "');</script>"); */
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
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css" />
    <link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'>    
    <link rel="stylesheet" type="text/css" href="css/simple-sidebar.css">
    <link rel="stylesheet" type="text/css" href="css/css_tools.css"/>
    <link rel="stylesheet" type="text/css" href="css/jquery-confirm.min334.css" />
    <link rel="stylesheet" type="text/css" href="css/css_cuentausuario.css">
        
<style type="text/css">
        
        th {padding:5px;background:#555;color:#DAA520}
        td {padding:5px;border:solid #ddd;border-width:0 0 1px;}
        .editable span{display:block;}
        .editable span:hover {background:url(img/edit.png) 90% 50% no-repeat;cursor:pointer}
        td input{height:24px;width:100px;border:1px solid #ddd;padding:0 5px;margin:0;border-radius:6px;vertical-align:middle; text-align: center}
        a.enlace{display:inline-block;width:24px;height:24px;margin:0 0 0 5px;overflow:hidden;text-indent:-999em;vertical-align:middle}
        .guardar{background:url(img/save.png) 0 0 no-repeat}
        .cancelar{background:url(img/cancel.png) 0 0 no-repeat}
        /*.anular{background:url(img/eliminar.png) 0 0 no-repeat}	*/
        .mensaje{display:block;text-align:center;margin:0 0 20px 0}
        .ok{display:block;padding:10px;text-align:center;background:green;color:#fff}
        .ko{display:block;padding:10px;text-align:center;background:red;color:#fff}
        .ocultame {display: none}
        .ocultamee {display: none}
</style>

<style>
    #overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 1000;
        display: none;
        animation: fadeIn 0.5s; /* Añade la animación */
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .loading-gif {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>

</head>    
<body>
<div id="wrapper">
    <?php include("menu.php"); ?>
    <div id="page-content-wrapper">
        <?php include("CuentaUsuarioForm.php"); ?>
        <?php include("CuentaUsuarioTabla.php"); ?>
    </div>
    <!--content wrapper-->
</div>
<!--wrapper-->    
<div id="overlay" style="display:none;">
    <img src="img/nube_sincronizada.gif" alt="Cargando..." class="loading-gif">
</div>
<div id="overlay_pass" style="display:none;">
    <img src="img/user_pass.gif" alt="Cargando..." class="loading-gif">
</div>
<input type="hidden" id="sele_cu" value="cu[0]">
<input type="hidden" id="sele_mv" value="mv[0]">
<input type="hidden" id="nro_cuenta">
<input type="hidden" id="nro_cuenta_d">
<input type="hidden" id="ingsal">
<input type="hidden" id="tipo_usuario" value="<?php echo $_SESSION['tipousuario']?>">
<input type="hidden" id="usuariosistema" value="<?php echo $_SESSION['nick']?>">
<input type="hidden" id="codsucursal" value="<?php echo $_SESSION['codsucursal']?>">
<input type="hidden" id="idempresa" value="<?php echo $_SESSION['idempresa']?>">
<input type="hidden" id="opver" value="mas">
<input type="hidden" id="idtipotransaccion">
<input type="hidden" id="idtipotran"> <!-- para el change de listatipotran  -->
<input type="hidden" id="idtransaccion">
<input type="hidden" id="ingreso">
<input type="hidden" id="salida">
<input type="hidden" id="descripcion">
<input type="hidden" id="montoanula">
<input type="hidden" id="campo">
<input type="hidden" id="fecha_transaccion">
<input type="hidden" id="server_date"> <!-- Added hidden input for server_date -->
<input type="hidden" id="id_vsc">
<input type="hidden" id="nombre_archivo"> <!-- Fixed missing closing quote -->
<input type="hidden" id="nombre_archivo_v"> <!-- Fixed missing closing quote -->
<!-- jQuery -->
            
    <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.10.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/jquery.alerts.mod.js"></script>
    <script type="text/javascript" language="javascript" src="js/jquery.metisMenu.js"></script>
    <script type="text/javascript" language="javascript" src="js/custom.js"></script>
    <script type="text/javascript" src="js/jquery-confirm.min334.js"></script>
    <script type="text/javascript" src="js/FuncionesCuentaUsuario.js"></script>
    <script type="text/javascript" src="js/validacampos.js"></script>
    <script type="text/javascript" src="js/CierraSesionInactivo.js"></script>          
</body>

</html>    