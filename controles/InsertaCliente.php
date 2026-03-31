<?php
$fechahora= date("Y-m-d H:i:s", (strtotime ("-2 Hours")));
if($_POST){ 
    include 'bd_conecta_mysqli.php';
    $sql = 'call inserta_clientes (?,?,?,?,?,?,?,?)';
    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("ssssssss",
        $_POST['dni'],$_POST['apellidos'],$_POST['nombres'],$_POST['direccion'],$_POST['telefono'],
        $_POST['email'],$_POST['usuamodi'],$fechahora);
        $respuesta = new stdClass();
        if($stmt->execute()){            
            $result = $stmt->get_result();
            /*$row = $result->fetch_assoc();*/
            $row = $result->fetch_array();
            $respuesta->flag = $row['flag'];
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