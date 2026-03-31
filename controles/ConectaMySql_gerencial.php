<?php

$host         = "31.97.83.113";
$database     = "pruebas_2026";
$username     = "admin_mf";
$password     = "Moneyfl@sh2032";

$mysqli = new mysqli($host, $username, $password, $database);
mysqli_set_charset($mysqli, "utf8"); //formato de datos utf8
//check if any connection error was encountered
if (mysqli_connect_errno()) {
    echo "Error: Could not connect to database.porque sera?";
    exit;
}
