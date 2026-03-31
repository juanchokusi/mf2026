<?php
include 'ConectaMySql.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_id = isset($_POST["idmeta"]) ? intval($_POST["idmeta"]) : 0;
    $sql = "	SELECT fechai, fechaf, meta, nroops, (nroops-meta ) AS diferencia, estado	FROM metasxagente WHERE nrocuenta = '".$_POST["nrocuenta"]."'  AND estado='A';";
   /*  $sql_ = "SELECT id, name, email, meta FROM users WHERE idmeta = ?"; */
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    } else {
        echo json_encode(["error" => "data no encontrado"]);
    }

    $stmt->close();
    $conn->close();
}
?>
