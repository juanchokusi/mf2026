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

if (isset($_POST) && $_POST["buscacli"] !='' )
{
    if ($db->connect_errno) 
    {
        die ("<span class='ko'>Fallo al conectar a MySQL: (" . $db->connect_errno . ") " . $db->connect_error."</span>");
    }
    else
    {
        if($_POST["opt"]=="D"){
            $query=$db->query("select idcliente,dni_ruc,apel_razon,nombres,direccion from ncliente where dni_ruc like '%".$_POST["buscacli"]."%' and anulado='N' limit 50");
            $datos=array();
        }
        if($_POST["opt"]=="A") {
            $query=$db->query("select idcliente,dni_ruc,apel_razon,nombres,direccion from ncliente where apel_razon like '".$_POST["buscacli"]."%' and anulado='N' limit 50");
            $datos=array();
        }
        while ($usuarios=$query->fetch_array())
        {
            $datos[]=array(
            "id"=>$usuarios["idcliente"],
            "dni_ruc"=>$usuarios["dni_ruc"],
            "apel_razon"=>$usuarios["apel_razon"],
            "nombres"=>$usuarios["nombres"],
            "direccion"=>$usuarios["direccion"] );
        }
        echo json_encode($datos);
    }
    
}
