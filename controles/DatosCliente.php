<?php

/*$conexion = new mysqli('BDTransferencias.db.11851382.hostedresource.com','BDTransferencias','Ninozzy666@','BDTransferencias');*/
$conexion = new mysqli('localhost','juancho','050522','bdtransferencias');

$dni = trim($_POST['dni']);
        
$consulta = "call spRecuperaCliente('$dni')";

$result = $conexion->query($consulta);
	
$respuesta = new stdClass();
if($result->num_rows > 0){
	$fila = $result->fetch_array();
	$respuesta->idcliente = $fila['idcliente'];
        $respuesta->nombres = $fila['apelnombre'];
}
	echo json_encode($respuesta);
