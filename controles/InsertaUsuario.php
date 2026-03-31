<?php
/*$fechahora= date("Y-m-d H:i:s", (strtotime ("-7 Hours")));
if($_POST){ 
    include 'bd_conecta_mysqli.php';
    $sql = 'insert into usuario values (null,?,?,?,?,?,?,?,?,?,?,?)';
    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("sssssssssss",
        $_POST['dni'],$_POST['apellidos'],$_POST['nombres'],$_POST['nusuario'],$_POST['direccion'],
        $_POST['telefono'],$_POST['email'],$_POST['pass'],$_POST['tusuario'],$_POST['anulado'],$_POST['tipousuario']);
        $respuesta = new stdClass();
        if($stmt->execute()){            
            $result = $stmt->get_result();
            /*$row = $result->fetch_assoc();
            $row = $result->fetch_array();*/
            /*$respuesta->codgirosucu = $row['cod_girosucu'];*/
/*        }else{
            die("Unable to save.");
        }
    } else{
        die("Unable to prepare statement.");
    }     
    echo json_encode($respuesta);
    $stmt->close();
    $mysqli->close();
}
*/

$dbhost="BDTransferencias.db.11851382.hostedresource.com";
$dbname="BDTransferencias";
$dbuser="BDTransferencias";
$dbpass="Ninozzy666@";
/*
$dbhost="localhost";
$dbname="bdtransferencias";
$dbuser="juancho";
$dbpass="050522";
 */
date_default_timezone_set("America/Lima");
$fechahora= date("Y-m-d H:i:s", (strtotime ("-7 Hours")));
//$fechahora= date("Y-m-d H:i:s);

$db = new mysqli($dbhost,$dbuser,$dbpass,$dbname);

//$consulta= "delete from diario_det_v1 where cod_diario='".$_POST["coddiario"]."' and itm='".$_POST["item"]."' ";
$consulta= "insert into usuario values (null,'".$_POST['dni']."','".$_POST['apellidos']."','".$_POST['nombres']."','".$_POST['nusuario']."','".$_POST['direccion']."',
        '".$_POST['telefono']."','".$_POST['email']."','".$_POST['pass']."','".$_POST['tusuario']."','".$_POST['anulado']."','".$_POST['tipousuario']."')";
$result = $db->query($consulta);	


