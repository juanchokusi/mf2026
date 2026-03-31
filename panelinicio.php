<?php
//require_once("controles/classRecibeEntrega.php");
if (!isset($_SESSION)) {
    session_start();
}
$Fechahora = date("Y-m-d H:i:s", (strtotime("-2 Hours")));
$FechaHoy = date("Y-m-d");
$tusuario = $_SESSION['tipousuario'];
$codsucu = $_SESSION['codsucursal'];
$usuamodi = $_SESSION['nick'];
$usuario_id = $_SESSION['mi_idusuario'];
require 'controles/ConectaMySql.php';
$consulta = "call spIniciaSaldos(); "; /* saldoxcuenta,saldoxagnte,diario */
$result = $mysqli->query($consulta);
/*
  $sql= "SELECT concat(b.iniciales,c.nrocuenta) as nrocuenta,b.desc_banco FROM bancos b join cuentas c on b.idbanco=c.idbanco where b.grupo = 'A' and b.anulado='N' order by 2;";
  $result = $mysqli->query($sql);
 */
echo("<script>console.log('PHP id: " . $_SESSION['mi_idusuario'] . "');</script>");
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
        <link rel="stylesheet" type="text/css" href="css/custom.css"/>
        <link rel="stylesheet" type="text/css" href="css/css_girosxcliente.css"/>
        <!-- GOOGLE FONTS-->
        <!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' /> -->

        <script language='javascript'>
            var pagina = "logout.php";
            function cierrasesion()
            {
                window.close();
            }
        </script>
    </head>

    <body onunload="cierrasesion();" >
        <div id="wrapper">
            <div class="navbar navbar-inverse navbar-fixed-top">
                <div class="adjust-nav">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#"><i class="fa fa-square-o "></i>&nbsp;Giros</a>
                    </div>
                    <div class="navbar-collapse collapse">
                        <ul class="nav navbar-nav navbar-right">
                            <!-- <li><a href="#">See Website</a></li>
                             <li><a href="#">Open Ticket</a></li>
                             <li><a href="#">Report Bug</a></li>-->
                            <li class="dropdown user-dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> <?php echo $_SESSION['nick'] ?> <b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#"><i class="fa fa-user"></i> Informacion</a></li>
                                    <li class="divider"></li>
                                    <li><a href="logout.php"><i class="fa fa-power-off"></i> Salir </a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            <!-- /. NAV TOP  -->

            <nav class="navbar-default navbar-side" role="navigation">
                <div class="sidebar-collapse">
                    <ul class="nav" id="main-menu">
                        <li class="text-center user-image-back">
                            <a href="#">
                                <div class="pull-left">
                                    <img src="img/find_user.jpg"/>
                                </div>                                
                                <h5><?php echo $_SESSION['usuario'] ?></h5>
                            </a>                            
                        </li>

                        <li> <a href="nRecepcion.php" target="_blank"><i class="fa fa-desktop "></i>Recepción</a> </li>                    
                        <li> <a href="Entrega.php" target="_blank"><i class="fa fa-money "></i>Entrega</a> </li>                        
                        <li> <a href=""><i class="fa fa-wrench"></i>Herramientas<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">                                
                                <li> <a href="GirosxCliente.php" target="_blank">Supervisa</a>  </li>
                                <li> <a href="Diario.php" target="_blank">Cierre Diario</a> </li>
                                <li> <a href="crucesucursales.php" target="_blank">Cruce</a> </li>
                                <li> <a href="boleta.php" target="_blank">Boletas</a> </li>
<!--                                <li> <a href="javascript:window.open('GirosxCliente.php','','width=600,height=400,left=50,top=50,toolbar=no');void 0">Supervisa</a> </li>-->
<!--                                <li> <a href="GirosxCliente.php" target="_blank">Giros x Cliente</a> </li>-->
                            </ul>
                        </li>
                        <li> <a href=""><i class="fa fa-table"></i>Tablas<span class="fa arrow"></span> </a>
                            <ul class="nav nav-second-level">
                                <li> <a href="Usuarios.php" target="_blank">Asociados-Usuarios </a></li>                                
                                <li> <a href="Bancos.php" target="_blank">Bancos </a> </li>                                                               
                                <li> <a class="fa fa-users" href="Clientes.php" target="_blank" >  Clientes </a> </li>
                                <li> <a href="conceptos.php" target="_blank">Conceptos </a></li>
                                <li> <a href="Sucursales.php" target="_blank">Sucursales </a> </li>
                                <li> <a href="Transacciones.php" target="_blank">Transacciones</a> </li>
                            </ul>
                        </li>

                        <li> <a href=""><i class="fa fa-outdent"></i>Cuentas<span class="fa arrow"></span> </a>
                            <ul class="nav nav-second-level">
                                <li> <a href="CuentaUsuario.php" target="_blank" >Cuentas de Asociado </a> </li>
                                <li> <a href="Agentes.php" target="_blank">Agentes </a></li>
                            </ul>
                        </li>
                        <li> <a href=""><i class="fa fa-user"></i>Login <span class="fa arrow"></span> </a>
                            <ul class="nav nav-second-level">
                                <li> <a href="indexLoginTrans.php">Iniciar Sesion</a> </li>
                                <li> <a href="Logout.php">Cerrar Sesion</a>  </li>
                            </ul>
                        </li>
                    </ul>

                </div>

            </nav>        
            <!-- /. NAV SIDE  -->

<div id="page-wrapper" >
    <div id="page-inner">
        <div class="row">
            <div class="col-md-12">
                <h3> Sucursal: <?php echo $_SESSION['sucursal'] ?></h3> 
                <div class="row">
                    <div class="col-md-6 ">
                        <input type="text" id="fechai" value="<?php echo date("Y/m/d");?>">
                        <input type="text" id="fechaf" value="<?php echo date("Y/m/d");?>">
                    </div>
                    <div class="col-md-6 ">    
                        
                        
                    </div>
                </div>
                <div  class="table-responsive mygrid-wrapper-div">
                    <table id="TMovsCliente" class=" table-bordered table-condensed ">
                        <thead >
                            
                        </thead>
                        <tbody id="tbody_MovsAgente" >
                            
                        </tbody>                                                
                    </table>
                </div>
                                
            </div>
            <!--col md 12-->
        </div> 
        <!-- /. ROW  -->
        <hr />
    </div>
    <!-- /. PAGE INNER  -->
</div>
<!-- /. PAGE WRAPPER  -->

</div>
<!-- /. WRAPPER  -->



        <!-- SCRIPTS -AT THE BOTOM TO REDUCE THE LOAD TIME-->
        <!-- JQUERY SCRIPTS -->
        <script src="js/jquery-1.11.1.min.js"></script>
        <script src="js/jquery-ui-1.10.min.js"></script>
        <script src="js/bootstrap.min.js"></script>        
        <script src="js/jquery.metisMenu.js"></script>        
        <script src="js/custom.js"></script> 
        <script type="text/javascript" src="js/FuncionesPanelIninicio.js"></script>
        <!--<script type="text/javascript" src="js/CierraSesionInactivo.js"></script>--> 

</body>
</html>
