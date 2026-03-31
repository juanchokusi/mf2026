<?php

date_default_timezone_set("America/Lima");
$fecha = date("Y-m-d");
require 'ConectaMySql.php';

if ($_POST["opcion"] === "MOSTRAR") {
    $query = $mysqli->query("call spMuestraGiros('" . $_POST["codsucu"] . "','" . $_POST["empresa"] . "','" . $_POST["fechai"] . "','" . $_POST["fechaf"] . "','" . $_POST["opt"] . "')");
    $datos = array();
    while ($col = $query->fetch_array()) {
        $datos[] = array(
            "cod_girosucu"      => $col["cod_girosucu"],
            "fechahora_registro" => $col["fechahora_registro"],
            "dni_rucb"          => $col["dni_rucb"],
            "beneficiario"      => $col["beneficiario"],
            "dni_ruc"           => $col["dni_ruc"],
            
            "remitente"         => $col["remitente"],
            "cod_sucursald"     => $col["cod_sucursald"],
            "importe_giro"      => $col["importe_giro"],
            "cargo_giro"        => $col["cargo_giro"],            
            "otros"             => $col["otros"],
            
            "total"             => $col["total"],
            "nro_cuenta"        => $col["nro_cuenta"],
            "nro_operacion"     => $col["nro_operacion"],
            "usuario_registra"  => $col["usuario_registra"],
            "observagiro"       => $col["observagiro"],
            
            "ciudad_destino"    => $col["ciudad_destino"],
            "usuario_entrega"   => $col["usuario_entrega"],
            "fechahora_entrega" => $col["fechahora_entrega"],
            "nom_sucursal"      => $col["nom_sucursal"],
            "datapago"          => $col["datapago"],
            
            "anulado"           => $col["anulado"],
            "data_edita"        => $col["data_edita"],
            "nro_boleta"        => $col["nro_boleta"],
            "boucher"           => $col["boucher"]
        );
    }
    $json = json_encode($datos);
    echo ( $json );

}

if ($_POST["opcion"] === "MOSTRARzzzzz") {
        $sql = "call spMuestraGiros('" . $_POST["codsucu"] . "','" . $_POST["empresa"] . "','" . $_POST["fechai"] . "','" . $_POST["fechaf"] . "','" . $_POST["opt"] . "')";
        if (!$result = mysqli_query($mysqli, $sql)) {
            die();
        }
        $data = array();
        while ($col = mysqli_fetch_assoc($result)) {
            $data[] = array(
            "cod_girosucu"      => $col["cod_girosucu"],
            "fechahora_registro" => $col["fechahora_registro"],
            "dni_rucb"          => $col["dni_rucb"],
            "beneficiario"      => $col["beneficiario"],
            "dni_ruc"           => $col["dni_ruc"],
            "remitente"         => $col["remitente"],
            "cod_sucursald"     => $col["cod_sucursald"],
            "importe_giro"      => $col["importe_giro"],
            "cargo_giro"        => $col["cargo_giro"],            
            "otros"             => $col["otros"],
            "total"             => $col["total"],
            "nro_cuenta"        => $col["nro_cuenta"],
            "nro_operacion"     => $col["nro_operacion"],
            "usuario_registra"  => $col["usuario_registra"],
            "observagiro"       => $col["observagiro"],
            "ciudad_destino"    => $col["ciudad_destino"],
            "usuario_entrega"   => $col["usuario_entrega"],
            "fechahora_entrega" => $col["fechahora_entrega"],
            "nom_sucursal"      => $col["nom_sucursal"],
            "datapago"          => $col["datapago"],
            "anulado"           => $col["anulado"],
            "data_edita"        => $col["data_edita"],
            "nro_boleta"        => $col["nro_boleta"]
            );
        }
        //$close = mysqli_close($mysqli); //or die("Ha sucedido un error inexperado en la desconexion de la base de datos");
        $data['success'] = true;
		echo json_encode($data);
    }


if ($_POST["opcion"] === "CODIGO") {
//$idusuario=intval($_POST["idusuario"]);
$codigo_acredita=intval($_POST["codacredita"]);
$sele_minutos=intval($_POST["minutos"]);

        $query = $mysqli->query("call spAcreditador('".$_POST["idusuario"]."','".$_POST["cod_sucu"]."',$codigo_acredita,$sele_minutos,'".$_POST["usuaacredita"]."','".$_POST["opt"]."')");
        $datos = array();
        while ($valor = $query->fetch_array()) {
            $datos[] = array
                (
                "codigo" => $valor["codigo"] ,            
                "mensaje" => $valor["mensaje"]
            );
        }
        $json = json_encode($datos);
        echo ( $json );        
    }
if($_POST["opcion"]==="MENSAJE"){ 
    /* $consulta = "call spInsertaRecibos('".$_POST["correlativo"]."','".$_POST["codgirosucu"]."','".$_POST["usuariocarga"]."','".$_POST["descripcion"]."','".$_POST["op"]."')"; */
    $consulta = "call ManteMensajeTickets('".$_POST["telefonos"]."','".$_POST["mensaje1"]."','".$_POST["mensaje2"]."','".$_POST["mensaje3"]."','".$_POST["id_empresa"]."','".$_POST["codsucu"]."','".$_POST["op"]."')";
    $result = $mysqli->query($consulta);
}

 if ($_POST['opcion'] === 'CODIGO__') {
    $idusuario=intval($_POST["idusuario"]);
    $codigo_acredita=intval($_POST["codigo_acredita"]);
    $sele_minutos=intval($_POST["minutos"]);
        $sql = "call spAcreditador($idusuario,'".$_POST["cod_sucu"]."',$codigo_acredita,$sele_minutos,'".$_POST["usuaacredita"]."','".$_POST["opt"]."')";
        if (!$result = mysqli_query($mysqli, $sql)) {
            die();
        }
        $sucus = array();
        while ($sucu = mysqli_fetch_assoc($result)) {
            $sucus[] = array(
                "codigo" => $sucu["codigo"],
                "mensaje" => $sucu["mensaje"]
            );
        }
        echo json_encode($sucus);
    }

if ($_POST["opt"] === "GCA") {
    /* genera codigo de anulaciones */
    $query = $mysqli->query("CALL GeneraCodigoAnulaciones('".$_POST["codigo"]."','".$_POST["usuario"]."','".$_POST["codsucu"]."','".$_POST["opcion"]."')");
    $datos = array();
    while ($fila = $query->fetch_array()) {
        $datos[] = array(
            "codigo" => $fila["codigo"],
            "mensaje" => $fila["mensaje"]
        );
    }
    $json = json_encode($datos);
    echo ($json);
}
