<?php
session_start();
/*
define('DB_SERVER', 'BDTransferencias.db.11851382.hostedresource.com');
define('DB_USER', 'BDTransferencias');
define('DB_PASSWORD', 'Ninozzy666@');
define('DB_NAME', 'BDTransferencias');
*/
define('DB_SERVER', 'localhost');
define('DB_USER', 'juancho');
define('DB_PASSWORD', '050522');
define('DB_NAME', 'bdtransferencias');

if (isset($_POST['fecha'])) {
    $origen     = $_SESSION['codsucursal'];
    /*$destino    = $_SESSION['codsucursal'];*/
    $fecha    = $_POST['fecha'];
    $opcion     = $_POST['opt'];
    /*$fecha_f    = $_POST['fecha_f'];    */
    /*$dni        = 'XXX';
    $apellido   = 'XXX';
    $opt        = 'R'; //recibido o entregado*/
    try {
        $conn = new PDO("mysql:host=" . DB_SERVER . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        /*$stmt = $conn->prepare('SELECT cod_sucursal,nom_sucursal from sucursal WHERE nom_sucursal LIKE :codsucu');*/
        $stmt = $conn->prepare("call spRecuperaRecibidos(?,?,?)");
        $stmt->execute(array($origen,$fecha,$opcion));

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
        $jsonrecibe=json_encode($results);
        
    } catch (PDOException $e) { echo 'ERROR: ' . $e->getMessage(); }
    /* Toss back results as json encoded array. */
     echo($jsonrecibe);
    /*echo json_encode($return_arr);*/
}
$conn = NULL;