<?php
//require_once("controles/classRecibeEntrega.php");
$Fechahora = date("Y-m-d H:i:s", (strtotime("-2 Hours")));
if (!isset($_SESSION)) {
    session_start();
}
$FechaHoy = date("Y-m-d");
$tusuario = $_SESSION['tipousuario'];
$codsucu = $_SESSION['codsucursal'];
$usuamodi = $_SESSION['nick'];
require 'controles/ConectaMySql.php';
$consulta = "call spIniciaSaldos(); "; /* saldoxcuenta,saldoxagnte,diario */
$result = $mysqli->query($consulta);
/*
  $sql= "SELECT concat(b.iniciales,c.nrocuenta) as nrocuenta,b.desc_banco FROM bancos b join cuentas c on b.idbanco=c.idbanco where b.grupo = 'A' and b.anulado='N' order by 2;";
  $result = $mysqli->query($sql);
 */
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> Grupo Pantera</title>
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css"/>  
        <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css" />
        <link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'>        
        <link rel="stylesheet" type="text/css" href="css/css_tools.css"/>
        
        <link rel="stylesheet" type="text/css" href="css/simple-sidebar.css">        

        <script language='javascript'>
            var pagina = "logout.php";
            function cierrasesion()
            {
              window.close();
            }
        </script>
    </head>
    <body>
        <div id="wrapper">
            <?php include("menu.php"); ?>

            <div id="page-content-wrapper">


            </div>


        </div>


        <script src="js/jquery-1.8.3.min.js"></script>
        <script src="js/jquery-ui-1.10.min.js"></script>
        <script src="js/bootstrap.min.js"></script>        
        <script src="js/jquery.metisMenu.js"></script>        
        <script src="js/custom.js"></script> 
        <script type="text/javascript" src="js/FuncionesPanelIninicio.js"></script>
        <script type="text/javascript" src="js/CierraSesionInactivo.js"></script>     
    </body>
</html>