<?php
date_default_timezone_set("America/Lima");
session_start();
require 'controles/ConectaMySql.php';
$Fechahora = date("Y-m-d H:i:s");
$FechaHoy = date("Y-m-d");
$iempresa = $_SESSION['idempresa'];
$tipousuario = $_SESSION['tipousuario'];
echo ("<script>console.log('PHP id: " . $_SESSION['idempresa'] . "');</script>");

$sql_bancos__ = "SELECT concat(b.iniciales,':',b.idbanco,':',c.nrocuenta) as nrocuenta,b.desc_banco 
FROM bancos b right join cuentas c on b.idbanco=c.idbanco where b.grupo='A' and b.anulado='N' and c.anulado='N' and c.idempresa=mid('" . $iempresa . "',1,1) order by 2;";
$sql_bancos = " SELECT concat(b.iniciales,':',b.idbanco,':',c.nrocuenta) as nrocuenta, @row_number:=@row_number+1 AS numero_correlativo, concat(@ROW_NUMBER,'-',b.desc_banco) AS desc_banco 
FROM bancos b right join cuentas_empresa c on b.idbanco=c.idbanco, (SELECT @row_number:=0) AS r where b.grupo='A' and b.anulado='N' and c.anulado='N' and c.idempresa= '" . $iempresa . "';";
$result_bancos = $mysqli->query($sql_bancos);
$optbancos = '<option value="0"></option>';
while ($fila = $result_bancos->fetch_array()) {
  $optbancos .= '<option value="' . $fila["nrocuenta"] . '">' . $fila["desc_banco"] . '</option>';
}

if ($tipousuario == 'ADMIN') {
  $Consulta = "SELECT CONCAT(tipo,dinero,idtipotransaccion) as idttran,descripcion FROM tipotransaccion WHERE descripcion LIKE '%calle%' AND anulado='N'
    UNION ALL
    SELECT CONCAT(tipo,dinero,idtipotransaccion) as idttran,descripcion from tipotransaccion where descripcion NOT LIKE '%calle%' and grupo='A' and anulado='N';";
} else {
  $Consulta = " SELECT CONCAT(tipo,dinero,idtipotransaccion) as idttran,descripcion from tipotransaccion 
        WHERE idtipotransaccion IN (103, 193, 115, 165, 161, 163,148, 102, 105,190, 194, 196) ORDER BY descripcion;";
}
$result = $mysqli->query($Consulta);
$opttipotrans = '<option value="0"> </option>';
while ($fila = $result->fetch_array()) {
  $opttipotrans .= '<option value="' . $fila["idttran"] . '">' . $fila["descripcion"] . '</option>';
}

$sql_sucursales = "SELECT cod_sucursal,nom_sucursal from sucursal where anulado='N' and idempresa=mid('" . $iempresa . "',1,1) order BY nom_sucursal";
$result_sucursal = $mysqli->query($sql_sucursales);
$opt_sucursales = '<option value="0" >Sucursal de Origen/Destino</option>';
while ($fila = $result_sucursal->fetch_array()) {
  $opt_sucursales .= '<option value="' . $fila["cod_sucursal"] . '">' . $fila["nom_sucursal"] . '</option>';
}

$sql_nusuario = "SELECT nusuario,nusuario from usuariosistema where idempresa=mid('" . $iempresa . "',1,1) and anulado='N' order BY 2;";
$result_nusuarios = $mysqli->query($sql_nusuario);
$optusuarios = '<option value="0"> Responsable...</option>';
while ($fila = $result_nusuarios->fetch_array()) {
  $optusuarios .= '<option value="' . $fila["nusuario"] . '">' . $fila["nusuario"] . '</option>';
}
/* ================== side bar =============== */
$sql_sideform = " SELECT CONCAT(tipo,dinero,idtipotransaccion) as idttran,descripcion from tipotransaccion 
        WHERE idtipotransaccion IN (103, 193, 115, 165, 161, 148, 102, 105,190) ORDER BY descripcion;";
$result_sideform = $mysqli->query($sql_sideform);
$optsideform = '<option value="0"> ...</option>';
while ($fila = $result_sideform->fetch_array()) {
  $optsideform .= '<option value="' . $fila["idttran"] . '">' . $fila["descripcion"] . '</option>';
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

  <title>Agentes</title>

  <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css" />
  <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css" />
  <link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'>
  <link rel="stylesheet" type="text/css" href="css/jquery-confirm.min334.css" />
  <link rel="stylesheet" type="text/css" href="css/simple-sidebar.css">
  <link rel="stylesheet" type="text/css" href="css/css_tools.css" />
  <link rel="stylesheet" type="text/css" href="css/PrintArea.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css">

  <link rel="stylesheet" href="https://code.jquery.com/ui/1.8.24/themes/base/jquery-ui.css">

  <link rel="stylesheet" type='text/css' href="css/css_agentes.css">

  <style type="text/css">
    th {
      background: darkkhaki;
      color: black
    }

    /*td {padding:5px;border:solid #ddd;border-width:0 0 1px;}*/
    .editable span {
      display: block;
    }

    .editable span:hover {
      background: url(img/edit.png) 90% 50% no-repeat;
      cursor: pointer
    }

    td input {
      height: 24px;
      width: 80px;
      border: 1px solid #ddd;
      padding: 0 5px;
      margin: 0;
      border-radius: 6px;
      vertical-align: middle;
      text-align: right
    }

    a.enlace {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin: 0 0 0 5px;
      overflow: hidden;
      text-indent: -999em;
      vertical-align: middle
    }

    .guardar {
      background: url(img/save.png) 0 0 no-repeat
    }

    .cancelar {
      background: url(img/cancel.png) 0 0 no-repeat
    }

    /*//.anular{background:url(img/eliminar.png) 0 0 no-repeat}*/
    .mensaje {
      display: block;
      text-align: center;
      margin: 0 0 20px 0
    }

    .ok {
      display: block;
      padding: 10px;
      text-align: center;
      background: green;
      color: #fff
    }

    .ko {
      display: block;
      padding: 10px;
      text-align: center;
      background: red;
      color: #fff
    }

    /*#sidebar-wrapper{border:1px solid #003366;}*/
    /*#contiene-formulario { border:2px solid darkkhaki;}*/
    /*#contiene-tabla { border:2px solid darkkhaki;}*/
    #fechai {
      text-align: center;
      width: 100px;
      font-size: 14px;
      font-weight: bold;
      color: #428bca
    }

    #fechaf {
      text-align: center;
      width: 100px;
      font-size: 14px;
      font-weight: bold;
    }
  </style>

  <style type="text/css">
    .ui-dialog {
      font-size: 14px;
    }

    .input-group {
      margin-bottom: 15px;
    }

    input[type="text"],
    input[type="file"] {
      width: 100%;
      padding: 2px;
      margin-bottom: 2px;
      border: 1px solid #ddd;
      border-radius: 1px;
      box-sizing: border-box;
    }

    button:hover {
      background-color: #45a049;
    }

    #imagePreview,
    #uploadPreview {
      max-width: 100%;
      margin-top: 20px;
      text-align: center;
    }

    #imagePreview img,
    #uploadPreview img {
      max-width: 100%;
      border-radius: 4px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    #deleteBtn {
      background-color: #f44336;
    }

    #deleteBtn:hover {
      background-color: #d32f2f;
    }
  </style>

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
  <!-- /* ================= combobox =========================== */ -->
<!--   
  <style>
    body {
      padding: 20px;
    }

    .ui-autocomplete {
      max-height: 200px;
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 1050 !important;
    }

    .input-group .ui-autocomplete-input {
      border-radius: 4px 0 0 4px;
    }

    .combobox-container {
      margin-bottom: 15px;
    }

    .dropdown-toggle {
      height: 34px;
    }

    .result {
      margin-top: 5px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      display: none;
      background-color: #f9f9f9;
    }

    /* Ocultar el icono de jQuery UI y usar el de Bootstrap */
    .ui-button-icon-primary {
      visibility: hidden;
    }
  </style>
   -->

  <!-- /* ================= side form===================== */ -->
  <style>
    body {
      overflow-x: hidden;
    }

    #sidebar {
      position: fixed;
      height: 100vh;
      background-color: #f8f9fa;
      width: 500px;
      left: -500px;
      top: 0;
      padding: 10px;
      transition: all 0.3s;
      z-index: 1000;
      border-right: 1px solid #ddd;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
      overflow-y: auto;
    }

    #sidebar.active {
      left: 0;
    }

    .overlay_sf {
      display: none;
      position: fixed;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      opacity: 0;
      transition: all 0.5s ease-in-out;
    }

    .overlay_sf.active {
      display: block;
      opacity: 1;
    }

    .form-container {
      margin: 0;
      padding: 0;
    }

    .user-table {
      margin: 0;
      padding: 0;
      width: 100%;
    }

    .user-table th,
    .user-table td {
      padding: 2px !important;
      font-size: 11px;
    }

    .action-buttons {
      padding: 2px 5px !important;
      margin: 1px !important;
      font-size: 11px;
    }

    .form-group {
      margin-bottom: 10px;
    }
  </style>
  <!-- /* ================= readonly ===================== */ -->
  <style>
    input[readonly] {
      background-color: #fff !important;
      cursor: default;
    }
  </style>
<!-- /* ================= nro movs - metas ===================== */ -->
<style>
/* table { border-collapse: collapse; width: 60%; margin: 20px auto; }
th, td { border: 1px solid #ccc; padding: 10px; text-align: center; }
tr.selected { background-color: #cce5ff; } */

.btn { cursor: pointer; margin: 0 5px; }
.edit { color: green; }
.delete { color: red; }

input.inline-input { width: 60px; text-align: center; }

#guardar {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
}
</style>

<body id="cuerpo">
  <div class="overlay_sf"></div>
  <div id="wrapper">
    <?php include("menu.php"); ?>

    <div id="page-content-wrapper">
      <?php include("AgentesForm.php"); ?>
      <div class="mensaje"></div>
      <div class="container-fluid">
        <?php include("AgentesTabla.php"); ?>
      </div>
      <?php include("AgentesDialogo.php"); ?>

    </div> <!-- page-content-wrapper -->
    <?php include("acreditacion.php"); ?>
    <?php include("AgenteSideForm.php"); ?>

    <div id="overlay" style="display:none;">
      <img src="img/nube_sincronizada.gif" alt="Cargando..." class="loading-gif">
    </div>
    <div id="overlay_pass" style="display:none;">
      <img src="img/user_pass.gif" alt="Cargando..." class="loading-gif">
    </div>
    <div id="overlay_download" style="display:none;">
      <img src="img/mi_download.gif" alt="Cargando..." class="loading-gif">
    </div>

  </div> <!-- wrapper -->
  <input type="hidden" id="token_agente" value="<?php echo $_SESSION['mi_token'] ?>">

  <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
  <script src="https://code.jquery.com/ui/1.8.24/jquery-ui.min.js"></script>
  <script type="text/javascript" src="js/bootstrap.min.js"></script>
  <script type="text/javascript" src="js/jquery.dataTables-1.10.5.min.js"></script>
  <script type="text/javascript" src="js/jquery.alerts.mod.js"></script>
  <script type="text/javascript" src="js/jquery.metisMenu.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js"> </script>
  <script type="text/javascript" src="js/custom.js"></script>
  <script type="text/javascript" src="js/funcionesAcredita.js"></script>
  <script type="text/javascript" src="js/jquery-confirm.min334.js"></script>
  <script type="text/javascript" src="js/FuncionesAgente.js"></script>
  <script type="text/javascript" src="js/validacampos.js"></script>
  <script type="text/javascript" src="js/CierraSesionInactivo.js"></script>
  <script type="text/javascript" language="javascript" src="js/jquery.uploadfile.js"></script>
  <script type="text/javascript" language="javascript" src="js/jquery.PrintArea.js"></script>

</body>

</html>