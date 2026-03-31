<?php
$host = "bdgirostrans.db.11851382.hostedresource.com";
$db_name = "bdgirostrans";
$username = "bdgirostrans";
$password = "Panter@2014";

//connect to mysql server
$mysqli = new mysqli($host, $username, $password, $db_name);
//check if any connection error was encountered
if(mysqli_connect_errno()) {
    echo "Error: Could not connect to database.";
    exit;
}