<?php
/*
$dbhost="BDTransferencias.db.11851382.hostedresource.com";
$dbname="BDTransferencias";
$dbuser="BDTransferencias";
$dbpass="Ninozzy666@";
*/
$dbhost="localhost";
$dbname="bdtransferencias";
$dbuser="juancho";
$dbpass="050522";

$db = new mysqli($dbhost,$dbuser,$dbpass,$dbname);

$b=$_POST["campo"]."b";
	if ($db->connect_errno) 
	{
		die ("<span class='ko'>Fallo al conectar a MySQL: (" . $db->connect_errno . ") " . $db->connect_error."</span>");
	}
	else
	{   
		$query=$db->query("update ncliente  set ".$_POST["campo"]."='".$_POST["valor"]."'  where idcliente='".intval($_POST["id"])."' limit 1");
                $query=$db->query("update nclienteb set ".$b."='".$_POST["valor"]."' where idclienteb='".intval($_POST["id"])."' limit 1");
                $query=$db->query("update cliente  set ".$_POST["campo"]."='".$_POST["valor"]."'  where dni_ruc='".($_POST["dniruc"])."' limit 1");
                $query=$db->query("update clienteb set ".$b."='".$_POST["valor"]."' where dni_rucb='".($_POST["dniruc"])."' limit 1");
		if ($query) echo "<span class='ok'>Valores modificados correctamente.</span>";
		else echo "<span class='ko'>".$db->error."</span>";
	}