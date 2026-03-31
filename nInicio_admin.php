<?php
date_default_timezone_set("America/Lima");

if (!isset($_SESSION)) {
  session_start();
  $Fechahora = date("Y-m-d H:i:s");
  $FechaHoy = date("Y/m/d");
  if (!isset($_SESSION["nick"])) {
    Header("Location : Logout.php");
    exit;
  }
  $mi_token = $_SESSION['mitoken'];
  $mi_idusuario = $_SESSION['idusuario'];
  $tusuario = $_SESSION['tipousuario'];
  $codsucu = $_SESSION['codsucursal'];
  $sucursal = $_SESSION['sucursal'];
  $usuamodi = $_SESSION['nick'];
  $idempresa = $_SESSION['idempresa'];
  $id_empresa = substr($idempresa, 0, 1);
  require 'controles/ConectaMySql.php';
  // iniciamos saldos
  $consulta = "call spIniciaSaldos('" . $idempresa . "'); ";
  $result = $mysqli->query($consulta);
  $consulta1 = "CALL spIniciaSaldoDiario('" . $codsucu . "'); ";
  $result1 = $mysqli->query($consulta1);
echo("<script>console.log('PHP id: " . $_SESSION['idusuario'] . "');</script>");
  /* ============= Cargamos Lista de Sucursales ========================================================*/
/*   $sql_sucursales = "SELECT cod_sucursal,nom_sucursal from sucursal where anulado='N' and idempresa=mid('" . $idempresa . "',1,1) order BY nom_sucursal";
  $result_sucursal = $mysqli->query($sql_sucursales);
  $optsucursales = '<option value="LS">Elige una Sucursal</option>';
  while ($fila = $result_sucursal->fetch_array()) {
    $optsucursales .= '<option value="' . $fila["cod_sucursal"] . '">' . $fila["nom_sucursal"] . '</option>';
  } */
  /* ============== Caragamos lista de usuarios =======================================================*/
/*   $sql_usuarios = "SELECT nusuario,CONCAT(nusuario,' -- ',nombres_usuario,' ',apellidos_usuario) AS nombres FROM usuariosistema WHERE idempresa='M' AND anulado='N'";
  $result_usuarios = $mysqli->query($sql_usuarios);
  $optusuarios = '<option value="LU">Elige Usuario</option>';
  while ($mi_fila = $result_usuarios->fetch_array()) {
    $optusuarios .= '<option value="' . $mi_fila["nusuario"] . '">' . $mi_fila["nombres"] . '</option>';
  }  */
  /* ============== Caragamos MENSAJE EN LOS TICKETS =======================================================*/
  $sql_msj = "CALL ManteMensajeTickets('xx', 'xxx' ,'xxx', 'xxx', '" . $id_empresa . "', '" . $codsucu . "', 'R')";
  $result_msj = $mysqli->query($sql_msj);
  $row_msj = $result_msj->fetch_array();
  /* $fono = $row_msj["telefonos"]; */

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

  <title>Inicio</title>

  <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css" />
  <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css" />
  <link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'>
  <!--<link rel="stylesheet" type="text/css" href="css/simple-sidebar.css">-->
  <link rel="stylesheet" type="text/css" href="css/css_tools.css" />
  <!--<link rel="stylesheet" type="text/css" href="css/jquery.dataTables-1.10.5.min.css"/>-->

  <link rel="stylesheet" type="text/css" href="css/css_inicio.css">
  <link rel="stylesheet" type="text/css" href="css/simple-sidebar.css">
  <link rel="stylesheet" type="text/css" href="css/jquery-confirm.min.css" />
  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
  <div id="wrapper">
   <!--  <?php /* include("menu_admin.php");  */?> -->
    <?php include("menu.php"); ?>
    <div class="page-content-wrapper">
      <?php include("InicioForm.php"); ?>
      <?php include("InicioTablas.php"); ?>
    </div>
  </div>
    <?php include("acreditacion.php"); ?>
  
    <!-======================================================================->
      <div class container id="dialogo_TicketMensaje" title="Mensajes en el Ticket">
        <div class="form-group">
          <label>Telefonos</label>
          <textarea class="form-control" id="txt_telefonos" rows="1"> <?php echo $row_msj["telefonos"] ?> </textarea>
        </div>
        <div class="form-group">
          <label>Mensaje 1</label>
          <textarea class="form-control" id="txt_mensaje1" rows="1"> <?php echo $row_msj["mensaje1"] ?> </textarea>
        </div>
        <div class="form-group">
          <label>Mensaje 2</label>
          <textarea class="form-control" id="txt_mensaje2" rows="2"> <?php echo $row_msj["mensaje2"] ?> </textarea>
        </div>
        <div class="form-group">
          <label>Mensaje 3</label>
          <textarea class="form-control" id="txt_mensaje3" rows="3"> <?php echo $row_msj["mensaje3"] ?> </textarea>
        </div>
        <button type="button" id="btn_guarda_mensaje" class="btn btn-success"> <?php echo "Guardar en:" . $sucursal; ?></button>
        <button type="button" id="btn_guarda_mensaje_todos" class="btn btn-danger">Guardar Para Todos</button>
      </div>
      <input type="hidden" id="idempresa" value= <?php echo $id_empresa ?>>
      <input type="hidden" id="mi_token" value= <?php echo $mi_token ?>>
      <!-======================================================================->
        <script>
          // Función que se llama cuando se hace clic en un elemento <li>
          function miFuncion() {
            $("#dialogo_TicketMensaje").dialog("open");
          }
          console.log("<?php echo $mi_token; ?>");
          console.log("<?php echo $tusuario; ?>");
        </script>
<input type="hidden" id="txt_sucursal" value= <?php echo $sucursal ?>>

        <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
        <script type="text/javascript" src="js/jquery-ui-1.10.min.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/jquery.dataTables-1.10.5.min.js"></script>
        <script type="text/javascript" src="js/jquery.alerts.mod.js"></script>
        <script type="text/javascript" src="js/jquery.metisMenu.js"></script>
        <script type="text/javascript" src="js/custom.js"></script>

        <script type="text/javascript" src="js/jquery-confirm.min.js"></script>
        <script type="text/javascript" src="js/FuncionesInicio.js"></script>
        <script type="text/javascript" src="js/validacampos.js"></script>
        <script type="text/javascript" src="js/CierraSesionInactivo.js"></script>
</body>

</html>