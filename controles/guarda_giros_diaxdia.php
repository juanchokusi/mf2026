<?php
require 'ConectaMySql.php';
$query = $mysqli->query("call spGuardaEstadoGirosDiaxDia()");
?>