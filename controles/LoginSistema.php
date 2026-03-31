<?php
session_start();
//date_default_timezone_set("America/Lima");
require 'ConectaMySql.php';
$errmsg_arr = array();
$errflag = false;

$query = $mysqli->query("call spVerificaUsuario('".$_POST["nusuario"]."','".$_POST["pass"]."','".$_POST["codsucursal"]."')");
$datos = array();
    while ($sucursal = $query->fetch_array()) {
        $datos[] = array
        (
            "flag"        => $sucursal["flag"],
            "idusuario"   => $sucursal["idusuario"],
            "nombres"     => $sucursal["nombres"],                
            "tipousuario" => $sucursal["tipousuario"],
            "idempresa"   => $sucursal["idempresa"]
            );
        $logueo = $sucursal["flag"];
        $_SESSION['usuario'] = $sucursal['nombres'];
        $_SESSION['tipousuario'] = $sucursal['tipousuario'];
        $_SESSION['idusuario'] = $sucursal['idusuario'];
        $_SESSION['nick'] = $_POST['nusuario'];
        $_SESSION['codsucursal'] = $_POST['codsucursal'];
        $_SESSION['sucursal'] = $_POST['sucursal'];
        $_SESSION['idempresa'] = $sucursal['idempresa'];
        $_SESSION['mitoken'] = $_POST['mi_token'];
        }

if ($logueo > 0) {
    if ($_SESSION['tipousuario'] === 'ADMIN') {
        header("location: ../nInicio_admin.php");
        
    } else {
        header("Location: ../nInicio.php");
    }
} else {
    $errmsg_arr[] = 'Usuario y/o Password no existe... vuelva a intentarlo';
    $errflag = true;
}
if ($errflag) {
    $_SESSION['ERRMSG_ARR'] = $errmsg_arr;
    session_write_close();
   /*  header("location: ../indexLoginTrans.php"); */
    header("location: ../indexlogintransv1.php");
    exit();
}
$close = mysqli_close($mysqli) or die("Ha sucedido un error inexperado en la desconexion de la base de datos");
