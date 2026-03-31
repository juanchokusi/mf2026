<?php
//date_default_timezone_set("America/Lima");
require 'ConectaMySql.php';
//$db = new mysqli($dbhost,$dbuser,$dbpass,$dbname);
$query = $mysqli->query("select idusuario,dni_usuario,apellidos_usuario,nombres_usuario,nusuario,direccion_usuario,telefono_usuario,e_mail,tipousuario from usuariosistema where anulado='N' order by 3");
$datos = array();
while ($usuarios = $query->fetch_array()) {
    $datos[] = array(
        "id"         => $usuarios["idusuario"],
        "dni_usuario"       => $usuarios["dni_usuario"],
        "apellidos_usuario" => $usuarios["apellidos_usuario"],
        "nombres_usuario"   => $usuarios["nombres_usuario"],
        "nusuario"          => $usuarios["nusuario"],
        "direccion_usuario" => $usuarios["direccion_usuario"],
        "telefono_usuario"  => $usuarios["telefono_usuario"],
        "e_mail"            => $usuarios["e_mail"],
        "tipousuario"       => $usuarios["tipousuario"]
    );
}
//echo ($datos);
$jsonusers = json_encode($datos);
echo ( $jsonusers );


