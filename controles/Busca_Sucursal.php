<?php
/*
define('DB_SERVER', 'localhost');
define('DB_USER', 'juancho');
define('DB_PASSWORD', '050522');
define('DB_NAME', 'bdtransferencias');
*/
define('DB_SERVER', 'giroystrans.db.11851382.hostedresource.com');
define('DB_USER', 'giroystrans');
define('DB_PASSWORD', 'Panter@2014');
define('DB_NAME', 'giroystrans');

if (isset($_POST['codsucu'])) {
    try {
        $conn = new PDO("mysql:host=" . DB_SERVER . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare('SELECT cod_sucursal,nom_sucursal from sucursal WHERE nom_sucursal LIKE :codsucu');
        $stmt->execute(array('codsucu' => '%' . $_POST['codsucu'] . '%'));

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);
        $json=json_encode($results);
        
    } catch (PDOException $e) {
        echo 'ERROR: ' . $e->getMessage();
    }
    /* Toss back results as json encoded array. */
     echo($json);
    /*echo json_encode($return_arr);*/
}
$conn = NULL;