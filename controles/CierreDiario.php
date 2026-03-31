<?php
require 'ConectaMySql.php';
$query = $mysqli->query("call spCierreDiario_IniciaSaldos('M')");
//$query = $mysqli->query("call spCierreDiario_IniciaSaldos('M')");
?>