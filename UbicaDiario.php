<?php

$conexion = new mysqli('localhost','juancho','050522','bdtransferencias');
//$conexion = new mysqli('BDTransferencias.db.11851382.hostedresource.com','BDTransferencias','Ninozzy666@','BDTransferencias');

$codsucu = trim($_POST['codsucu']);
$fecha      = "2014-07-01";

$consulta = "call sp_ubica_diario ('$codsucu','$fecha')";

$result = $conexion->query($consulta);
	
$respuesta = new stdClass();
if($result->num_rows > 0){
	$fila = $result->fetch_array();
	$respuesta->codigo = $fila['cod_diario'];
}
echo json_encode($respuesta);