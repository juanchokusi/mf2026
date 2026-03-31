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
if ($db->connect_errno) 
{
    die ("<span class='ko'>Fallo al conectar a MySQL: (" . $db->connect_errno . ") " . $db->connect_error."</span>");
}
else
{
    /*$query=$db->query("update usuario set anulado='S' where idusuario='".intval($_POST["id"])."' limit 1");*/
    $query=$db->query("delete from diario_det where cod_diario='".$_POST["coddiario"]."' and concepto='".$_POST["concepto"]."' ");
    if ($query) echo "<span class='ok'>Valores modificados correctamente.</span>";
    else echo "<span class='ko'>".$db->error."</span>";
}
