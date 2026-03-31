<?php
date_default_timezone_set("America/Lima");
//$fechahora= date("Y-m-d H:i:s", (strtotime ("-2 Hours")));
//$fechahora= date("Y-m-d H:i:s");
if($_POST){ 
    include 'ConectaMySql.php';
    $sql = 'call sp_mante_giros1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("sssssssssssssssss",
        $_POST['fechagiro'],$_POST['origen'],$_POST['remitente'],
        $_POST['destino'],$_POST['beneficiario'],$_POST['ciudestino'],$_POST['importe'],$_POST['cargo'],
        $_POST['igv'],$_POST['itf'],$_POST['otro'],$_POST['total'],$_POST['efectivo'],$_POST['estado'],
        $_POST['obsdest'],$_POST['obsgiro'],$_POST['codbanco'],$_POST['codtcuenta'],$_POST['nrocuenta'],
        $_POST['nrooperacion'],$_POST['nusuario'],$_POST['userpc'],$_POST['fechahoragiro'],$_POST['op']);
        $respuesta = new stdClass();
        
        if($stmt->execute()){            
            $result = $stmt->get_result();
            /*$row = $result->fetch_assoc();*/
            $row = $result->fetch_array();
            $respuesta->codgirosucu = $row['cod_girosucu'];            
        }else{
            die("Unable to save.");
        }
    } else{
        die("Unable to prepare statement.");
    }     
    echo json_encode($respuesta);
    $stmt->close();
    $mysqli->close();
}
 