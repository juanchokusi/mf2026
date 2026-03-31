<?php
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

if (isset($_GET['term'])) {
    $return_arr = array();

    try {
        $conn = new PDO("mysql:host=" . DB_SERVER . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare('SELECT desc_banco from bancos WHERE desc_banco LIKE :term');
        $stmt->execute(array('term' => '%' . $_GET['term'] . '%'));

        while ($row = $stmt->fetch()) {
            $return_arr[] = $row['desc_banco'];
        }
    } catch (PDOException $e) {
        echo 'ERROR: ' . $e->getMessage();
    }    
    echo json_encode($return_arr);
}

$conn = NULL;

