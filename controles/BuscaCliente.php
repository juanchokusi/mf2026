<?php
  $dni       = $_POST['dni'];
  $opt        =$_POST['opt'];
  
 //$conn = new PDO('mysql:host=BDTransferencias.db.11851382.hostedresource.com;dbname=BDTransferencias', 'BDTransferencias', 'Ninozzy666@');
 $conn = new PDO('mysql:host=localhost;dbname=bdtransferencias', 'juancho', '050522');
  
  $statement = $conn->prepare("call sp_muestra_cliente_v1(?,?)");
  $statement->bindParam(1,$dni);
  $statement->bindParam(2,$opt);
  $statement->execute();

  $results=$statement->fetchAll(PDO::FETCH_ASSOC);
  $json=json_encode($results);
  echo($json);
  $conn=NULL;
