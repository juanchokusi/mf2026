<?php

$host         = "31.97.83.113";
$database     = "pruebas_2026";
$username     = "admin_mf";
$password     = "Moneyfl@sh2032";

//$host         = "107.180.94.79";
//$database     = "admin_pruebas25";
//$username     = "admin_juancho";
//$password     = "moneyfl@sh2032";

//connect to mysql server
$mysqli = new mysqli($host, $username, $password, $database);
mysqli_set_charset($mysqli, "utf8"); //formato de datos utf8
//check if any connection error was encountered
if (mysqli_connect_errno()) {
    echo "Error: Could not connect to database.porque sera?";
    exit;
}

/*
// Create connection
$conn = mysqli_connect($host, $username, $password, $database);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
mysqli_close($conn);
*/
