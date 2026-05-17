<?php
date_default_timezone_set("America/Lima");
$FechaHoy = date("Y-m-d");
include 'ConectaMySql.php';
if ($_POST["opt"] === "MOVSAGENTE")
{
    $query = $mysqli->query("call spMuestraMovsAgente('" . $_POST["cuenta"] . "','" . $_POST["fecha_i"] . "','" . $_POST["fecha_f"] . "','" . $_POST["mi_token"] . "')");
    $datos = array();
    while ($recibidos = $query->fetch_array()) {
        $datos[] = array(
            "idtransaccion"     => $recibidos["idtransaccion"],
            "idtipotransaccion" => $recibidos["idtipotransaccion"],
            "fecha_tran"        => $recibidos["fecha_tran"],
            "fechahora_tran"    => $recibidos["fechahora_tran"],
            "descripcion"       => $recibidos["descripcion"],
            "cuentadest"        => $recibidos["cuentadest"],
            "observacion"       => $recibidos["observacion"],
            "datostran"         => $recibidos["datostran"],
            "beneficiario"      => $recibidos["beneficiario"],            
            "usua_crea"         => $recibidos["usua_crea"],
            "nrooperacion"      => $recibidos["nrooperacion"],            
            "nromovs"           => $recibidos["nromovs"],
            "monto_ing"         => $recibidos["monto_ing"],
            "monto_sal"         => $recibidos["monto_sal"],
            "saldofinalc"       => $recibidos["saldofinalc"],
            "saldofinal"        => $recibidos["saldofinal"],
            "anulado"           => $recibidos["anulado"],
            "voucher"           => $recibidos["voucher"]
        );
    }
    $jsonmovs = json_encode($datos);
    echo ( $jsonmovs );
}

if($_POST["opt"]==="IT")  
{    
    $result=$mysqli->query("call spInsertaTransaccionAgente ('".$_POST["nrocuenta"]."','".$_POST["nrocuentadest"]."','".$_POST["dinero"]."','".$_POST["monto"]."',
            '".$_POST["ttran"]."','".$_POST["origen"]."','".$_POST["idgiro"]."','".$_POST["nroop"]."','".$_POST["nromovs"]."','".$_POST["observa"]."',
            '".$_POST["respo"]."','".$_POST["modifica"]."','".$_POST["fechamov"]."', '".$_POST["idempresa"]."', '".$_POST["opsql"]."')");
}

if($_POST["opt"]==="ANULA")  
{    
    $result = $mysqli->query("call spAnulaMovsAgente ('".$_POST["idtran"]."','".$_POST["fechamov"]."','".$_POST["nrocuenta"]."','".$_POST["idtipotran"]."','".$_POST["motivo"]."',
            '".$_POST["monto"]."','" . $_POST["usuamodi"] . "','" . $_POST["ingsal"] . "')");
}

if($_POST["opt"]==="EDITA")
{    
    $result = $mysqli->query("call spEditaMovsAgente ('".$_POST["idtran"]."','".$_POST["campo"]."','".$_POST["descripcion"]."','".$_POST["monto"]."','".$_POST["fechamov"]."','" . $_POST["nrocuenta"] . "','".$_POST["usuamodi"]."','".$_POST["ingsal"]."') ");
        
}

if($_POST["opt"]==="ASALDOS")
{    
    $result = $mysqli->query(" call spActualizaSaldos ('".$_POST["fechamov"]."','".$_POST["nrocuenta"]."','".$_POST["tipocuenta"]."','".$_POST["monto"]."', '".$_POST["dinero"]."') ");
}

if ($_POST["opt"] === "srvfecha") {
    $query = $mysqli->query("call spFechaServidor()");
    $datos = array();
    while ($fila = $query->fetch_array()) {
        $datos[] = array(
            "fechaservidor" => $fila["fechaservidor"]
        );
    }
    $json = json_encode($datos);
    echo ($json);
}

if ($_POST["opt"] === "VERIFPASS") {
    $query = $mysqli->query("CALL spVerificaPass('".$_POST["usuario"]."','".$_POST["pass"]."')");
    $datos = array();
    while ($fila = $query->fetch_array()) {
        $datos[] = array(
            "idusuario" => $fila["idusuario"]
        );
    }
    $json = json_encode($datos);
    echo ($json);
}

if ($_POST["opt"] === "LISTAMETAS") {
    $v_meta = intval($_POST["meta"]);
    $idmeta = intval($_POST["idmeta"]);
    $query = $mysqli->query(" CALL spListaMetasxAgente('" . $_POST["nrocuenta"] . "','" . $_POST["fechai"] . "','" . $_POST["fechaf"] . "','" . $_POST["meta"] . "',$idmeta,'" . $_POST["opcion"] . "' ); ");
    $datos = array();
    while ($fila = $query->fetch_array()) {
        $datos[] = array(
            "idmxagente" => $fila["idmxagente"],
            "fechai" => $fila["fechai"],
            "fechaf" => $fila["fechaf"],
            "meta" => $fila["meta"],
            "nroops" => $fila["nroops"],
            "diferencia" => $fila["diferencia"],
            "estado" => $fila["estado"]
        );
    }
    $json = json_encode($datos);
    echo ($json);
}

if ($_POST['opt'] === 'UbicaVSA__') {
  $sql = " call spManteVoucherSaldosAgente('".$_POST["nrocuenta"]."','".$_POST["usuario"]."','".$_POST["nombre_archivo"]."','".$_POST["observacion"]."','".$_POST["fechabusqueda"]."','".$_POST["id_vsa"]."','".$_POST["op"]."') ";
  if (!$result = mysqli_query($mysqli, $sql)) {
    die();
  }
  $sucus = array();
  while ($sucu = mysqli_fetch_assoc($result)) {
    $sucus[] = array(
        "codigo" => $sucu["id"],
        "nombre_archivo" => $sucu["nombre_archivo"]
    );
  }
  $json = json_encode($sucus);
  echo ($json);
}

if ($_POST["opt"] === "UbicaVSA") {
    $query = $mysqli->query(" call spManteVoucherSaldosAgente('".$_POST["nrocuenta"]."','".$_POST["usuario"]."','".$_POST["nombre_archivo"]."','".$_POST["observacion"]."','".$_POST["fechabusqueda"]."','".$_POST["id_vsa"]."','".$_POST["op"]."'); ");
    $datos = array();
    while ($fila = $query->fetch_array()) {
        $datos[] = array(
            "codigo" => $fila["id"],
            "nombre_archivo" => $fila["nombre_archivo"]
        );
    }
    $json = json_encode($datos);
    echo ($json);
}

if ($_POST['opt'] === 'METASUNAGENTE') {
    $sql  = " call spMovsMetaxAgente('" . $_POST["nrocuenta"] . "'); ";
    $stmt = $mysqli->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    } else {
        echo json_encode(["error" => "data no encontrado"]);
    }
    $stmt->close();
}

if ($_POST["opt"] === "PRECUADRE") {
    $query = $mysqli->query(" CALL spMuestraPreCuadre('" . $_POST["nrocuenta"] . "','" . $_POST["fecha"] . "' ,'" . $_POST["idusuario"] . "' ); ");
    $datos = array();
    while ($fila = $query->fetch_array()) {
        $datos[] = array(
            "nrocuenta"         => $fila["nrocuenta"],
            "fecha"             => $fila["fecha"],
            "idtipotransaccion" => $fila["idtipotransaccion"],
            "descripcion"       => $fila["descripcion"],
            "tdinero"           => $fila["tdinero"],
            "editable"          => $fila["editable"],
            "idusuario"         => $fila["idusuario"],
            "ingreso"           => $fila["ingreso"],
            "salida"            => $fila["salida"],
            "nromovs"           => $fila["nromovs"],
            "saldo_cuenta"      => $fila["saldo_cuenta"],
            "saldo_efectivo"    => $fila["saldo_efectivo"]
        );
    }
    $json = json_encode($datos);
    echo ($json);
}

if ($_POST["opt"] === "GES-PRECUADRE") {
    $query = $mysqli->query("CALL spGestionaPrecuadre('".$_POST["accion"]."','".$_POST["nrocuenta"]."','".$_POST["fecha"]."','".$_POST["idtipotransaccion"]."',
                            '".$_POST["descripcion"]."','".$_POST["dinero"]."','".$_POST["ingreso"]."','".$_POST["salida"]."','".$_POST["nromovs"]."','".$_POST["idusuario"]."')");
}


$mysqli->close();
