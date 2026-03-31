<?php
//$conexion = new mysqli('servidor','usuario','password','basedatos',3306);
$conexion = new mysqli('localhost','juancho','050522','bdtransferencias');
//$conexion = new mysqli('BDTransferencias.db.11851382.hostedresource.com','BDTransferencias','Ninozzy666@','BDTransferencias');
	$sucursal = trim($_POST['sucursal']);
        
        /*$codigopostal= trim($_REQUEST['codigopostal']);*/
	/*$consulta = "select nombre, paterno, materno FROM tblalumno WHERE matricula = '$matricula'";*/
	$consulta = "select nusuario, tipo_usuario FROM usuario WHERE nusuario = '$nusuario'";

	$result = $conexion->query($consulta);
	
	$respuesta = new stdClass();
	if($result->num_rows > 0){
		$fila = $result->fetch_array();
		$respuesta->codsucursal = $fila['cod_sucursal'];
		$respuesta->colorsucursal = $fila['color_sucursal'];
		$respuesta->nomsucursal = $fila['nom_sucursal'];
	}
	echo json_encode($respuesta);
