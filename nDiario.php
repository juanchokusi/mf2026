<?php
date_default_timezone_set("America/Lima");
//require_once("controles/classRecibeEntrega.php");
session_start();
require 'controles/ConectaMySql.php';
$Fechahora = date("Y-m-d H:i:s");
$FechaHoy = date("Y/m/d");

if (!isset($_SESSION["nick"])) {
    Header("Location : Logout.php");
    exit;
}
$idempresa = $_SESSION['codsucursal'];
$idempresa = SUBSTR($idempresa,0,1);

$sql_agt = "select c.nrocuenta,b.iniciales,b.desc_banco from bancos b right JOIN cuentas_empresa c on b.idbanco=c.idbanco where b.grupo='A' and b.anulado='N' and c.anulado='N' and c.idempresa=mid('".$idempresa."',1,1);";
$resultado = $mysqli->query($sql_agt);
$agt = '<option value="0">Elige Agente...</option>';
while ($mifila = $resultado->fetch_array(MYSQLI_ASSOC)) {
    $agt.='<option value="'.$mifila["nrocuenta"].'">' . $mifila["desc_banco"] . '</option>';
}

$sql_i = "select idconcepto,descripcion from conceptos WHERE anulado = 'N' and idgasto='100';";
$resultado_i = $mysqli->query($sql_i);
$conceptos_i= '<option value="0"> Elige Concepto...</option>';
while ($fila = $resultado_i->fetch_array(MYSQLI_ASSOC)) {
    $conceptos_i.='<option value="' . $fila["idconcepto"] . '">' . $fila["descripcion"] . '</option>';
}

$sql_e = "select idconcepto,descripcion from conceptos WHERE anulado = 'N' and idgasto <>'100' order by descripcion;";
$resultado_e = $mysqli->query($sql_e);
$conceptos_e = '<option value="0"> Elige Concepto...</option>';
while ($fila = $resultado_e->fetch_array(MYSQLI_ASSOC)) {
    $conceptos_e.='<option value="' . $fila["idconcepto"] . '">' . $fila["descripcion"] . '</option>';
}

$sql_sucursales = "SELECT cod_sucursal,nom_sucursal from sucursal where anulado='N' and idempresa=mid('".$idempresa."',1,1) and cod_sucursal <> '".$idempresa."' order BY nom_sucursal";
$result_sucursal = $mysqli->query($sql_sucursales);
$optsucursales = '<option value="0">Elige Destino...</option>';
while ($fila = $result_sucursal->fetch_array(MYSQLI_ASSOC)) {
    $optsucursales.='<option value="'.$fila["cod_sucursal"].'">' . $fila["nom_sucursal"] . '</option>';
}

$sql_asociado = "call spBuscaUsuarioCuenta('xx','".$idempresa."','D');";
$result_asociado = $mysqli->query($sql_asociado);
$asociados = '<option value="0">Elige Asociado..</option>';
while ($fila = $result_asociado->fetch_array(MYSQLI_ASSOC)) {
    $asociados.='<option value="'.$fila["nrocuenta"].'">' . $fila["descripcion"] . '</option>';
}

?>
<!--<!DOCTYPE html>-->
<!doctype html public "-//W3C//DTD HTML 4.01 Transitional//EN" 
"http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="www.dataweb365.com">

    <title>Cierre Diario</title>
    
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css"/>   
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css" />
    <link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'>  
    <link rel="stylesheet" type="text/css" href="css/jquery-confirm.min334.css" />  
    <link rel="stylesheet" type="text/css" href="css/css_tools.css"/>
    <link rel="stylesheet" type="text/css" href="css/offcanvas.css"/>
    <link rel="stylesheet" type="text/css" href="css/css_diario.css">
    <link rel="stylesheet" type="text/css" href="css/simple-sidebar.css">
    <link rel="stylesheet" type="text/css" href="css/jquery-confirm.min.css"/>
        <link rel="stylesheet" type="text/css" href="css/uploadfile.custom.css">
        <link rel="stylesheet" type="text/css" href="css/PrintArea.css"/>
<style>
    /* Layout */
    .rowt {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }
    .col-50 {
        width: calc(50% - 5px);
    }
    .col-100 {
        width: 100%;
    }
    /* Inputs */
    .form-box {
        margin-bottom: 10px;
        /* display: none; */
    }
    .form-box input {
        width: 100%;
        padding: 8px;
        margin-bottom: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .btn-toggle {
        margin-bottom: 10px;
        padding: 8px;
        width: 100%;
        border: none;
        background-color: #28a745;
        color: white;
        cursor: pointer;
        border-radius: 4px;
    }
    /* Tabla */
    .table-container {
        width: 100%;
        overflow-x: auto;
    }
    .table-scroll {
        max-height: 300px;
        overflow-y: auto;
        border: 1px solid #ccc;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 400px;
    }

    th, td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: center;
    }

    thead th {
        background-color: #007BFF;
        color: white;
        position: sticky;
        top: 0;
    }

    tfoot th {
        background-color: #343a40;
        color: white;
 
    position: sticky;
    bottom: 0;
}

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .col-50 {
            width: 100%;
        }
    }
</style>
<!-- ====== tablas ====== -->
</head>
<style type="text/css">

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
        #egreso {text-align: center; font-size: 12pt; font-weight: bold}
        #ingreso {text-align: center; font-size: 12pt; font-weight: bold}

</style>
<!-- CSS PARA EL OERLAY -->
<style type="text/css">
    #overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: none;
      animation: fadeIn 0.5s;
      /* Añade la animación */
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    .loading-gif {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  </style>


  <body id="cuerpo">

<div id="wrapper">
    <?php include("menu.php"); ?>
    <div class="page-content-wrapper">        
        <div id="sideform" class="col-xs-6 col-md-4">            
            <?php include("DiarioSideForm.php"); ?>            
        </div>    
        <div class="col-xs-12 col-sm-6 col-md-8">            
            <?php include("DiarioTablas.php"); ?>            
        </div>    
        
        <?php include("DiarioDialogos.php"); ?> 
        <?php include("acreditacion.php"); ?>
        
    </div>
    <!--content wrapper-->
    
</div>
<div id="overlay" style="display:none;">
      <img src="img/nube_sincronizada.gif" alt="Cargando..." class="loading-gif">
    </div>
    <div id="overlay_pass" style="display:none;">
      <img src="img/user_pass.gif" alt="Cargando..." class="loading-gif">
    </div>
<!--wrapper--> 
<!-- jQuery -->    
    <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>    
    <script type="text/javascript" src="js/jquery-ui-1.10.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/jquery.dataTables-1.10.5.min.js"></script>
    <script type="text/javascript" src="js/jquery.alerts.mod.js"></script>
    <script type="text/javascript" src="js/jquery.metisMenu.js"></script>        
    <script type="text/javascript" src="js/custom.js"></script>
    <script type="text/javascript" src="js/funcionesAcredita.js"></script>
    
    <script type="text/javascript" src="js/validacampos.js"></script>       
    <script type="text/javascript" src="js/FuncionesDiario.js"></script>
    <script type="text/javascript" src="js/FuncionesDiarioCuentas.js"></script>
    <script type="text/javascript" src="js/FnNumeroALetras.js"></script>
    <script type="text/javascript" src="js/FuncionesEditaTablas.js"></script>
    <script type="text/javascript" src="js/CierraSesionInactivo.js"></script>
    <script type="text/javascript" src="js/jquery.price_format.2.0.min.js"></script>
    <script type="text/javascript" src="js/jquery-confirm.min.js"></script>
    <script type="text/javascript" src="js/jquery-confirm.min334.js"></script>
    <script type="text/javascript" src="js/jquery.uploadfile.js"></script>
    <script type="text/javascript" src="js/jquery.PrintArea.js"></script>
</body>

</html>
