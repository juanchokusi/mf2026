<?php
	/*$conexion = new mysqli('servidor','usuario','password','basedatos',3306);*/
$conexion = new mysqli('bdgirostrans.db.11851382.hostedresource.com','bdgirostrans','Panter@2014','bdgirostrans');
//$conexion = new mysqli('BDTransferencias.db.11851382.hostedresource.com','BDTransferencias','Ninozzy666@','BDTransferencias');

$codsucu = trim($_POST['codsucu']);        

$consulta = "call recupera_sucursal_v1 ('$codsucu')";

$result = $conexion->query($consulta);	
$respuesta = new stdClass();
if($result->num_rows > 0){
	$fila = $result->fetch_array();
        $respuesta->codsucursal = $fila['cod_sucursal'];
	$respuesta->nomsucursal = $fila['nom_sucursal'];
}
echo json_encode($respuesta);
?> 