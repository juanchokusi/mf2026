<?php
$motivo         =   $_POST['motivo'];  
$correlativo    =   $_POST['correlativo'];
 
//$conn = new PDO('mysql:host=BDTransferencias.db.11851382.hostedresource.com;dbname=BDTransferencias', 'BDTransferencias', 'Ninozzy666@'); 

$conn = new PDO('mysql:host=localhost;dbname=bdtransferencias', 'juancho', '050522'); 

  $statement = $conn->prepare("update giros set anulado='S', nro_cuenta=?,observagiro=DATE_ADD(NOW(), INTERVAL 2 HOUR) where correlativo=?");
  $statement->bindParam(1,$motivo);
  $statement->bindParam(2,$correlativo);
  $statement->execute();
/*
  $results=$statement->fetchAll(PDO::FETCH_ASSOC);
  $json=json_encode($results);
  echo($json);*/
  $conn=NULL;

