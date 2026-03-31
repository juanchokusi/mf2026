<?php
require 'ConectaMySql.php';
date_default_timezone_set("America/Lima");
$fechahora = date("Y-m-d H:i:s");
//$fechahora= date("Y-m-d H:i:s);
if (isset($_POST["opt"])) {
    if ($_POST["opt"] === "T") {
        $query = $mysqli->query("call MuestraDiario('" . $_POST["sucursal"] . "','" . $_POST["fecha"] . "')");
        $datos = array();
        while ($cierre = $query->fetch_array()) {
            $datos[] = array
                (
                "cod_girosucu" => $cierre["cod_girosucu"],
                "cod_sucursald" => $cierre["cod_sucursald"],
                "fechahora_registro" => $cierre["fechahora_registro"],
                "fechahora_entrega" => $cierre["fechahora_entrega"],
                "beneficiario" => $cierre["beneficiario"],
                "remitente" => $cierre["remitente"],
                "entregado" => $cierre["entregado"],
                "recibido" => $cierre["recibido"],
                "pendiente" => $cierre["pendiente"]
            );
        }
        $json = json_encode($datos);
        echo ( $json );        
    }
    
    if ($_POST["opt"] === "TA") {
        $query = $mysqli->query("call spMuestraDiarioAnterior1('" . $_POST["sucursal"] . "','" . $_POST["fecha"] . "')");
        $datos = array();
        while ($cierre = $query->fetch_array()) {
            $datos[] = array
                (
                "cod_girosucu" => $cierre["cod_girosucu"],
                "cod_sucursald" => $cierre["cod_sucursald"],
                "fechahora_registro" => $cierre["fechahora_registro"],
                "fechahora_entrega" => $cierre["fechahora_entrega"],
                "beneficiario" => $cierre["beneficiario"],
                "remitente" => $cierre["remitente"],
                "entregado" => $cierre["entregado"],
                "recibido" => $cierre["recibido"],
                "pendiente" => $cierre["pendiente"]
            );
        }
        $json = json_encode($datos);
        echo ( $json );        
    }

    if ($_POST["opt"] === "Bzzz") {
        $sql = " call spUbicaDiario ('" . $_POST["codsucu"] . "','" . $_POST["fecha"] . "') ";
        if (!$result = mysqli_query($mysqli, $sql)) {
            die();
        }
        $sucus = array();
        while ($sucu = mysqli_fetch_assoc($result)) {
            $sucus[] = array(
                "codigo" => $sucu["cod_diario"],
                "fechadiario" => $sucu["fecha_diario"],
                "estado" => $sucu["estado"]
            );
        }
        $rpta = json_encode($sucus);
        echo ($rpta);
    }

    if ($_POST["opt"] === "B") {
        $consulta = "call spUbicaDiario('".$_POST["codsucu"]."','".$_POST["fecha"]."')";
        $result = $mysqli->query($consulta);
        $respuesta = new stdClass();
        if ($result->num_rows > 0) {
            $fila = $result->fetch_array();
            $respuesta->codigo = $fila['cod_diario'];
            $respuesta->fechadiario = $fila['fecha_diario'];
            $respuesta->estado = $fila['estado'];
        }
        echo json_encode($respuesta);
    }

    if ($_POST["opt"] === "BBBBbbbb") {
        $query = $mysqli->query("call spUbicaDiario('".$_POST["codsucu"]."','".$_POST["fecha"]."')");
        $datos = array();
        while ($cierre = $query->fetch_array()) {
            $datos[] = array
                (
                "codigo"    => $cierre["cod_diario"],
                "fechadiario"  => $cierre["fecha_diario"],
                "estado"        => $cierre["estado"]
            );
        }
        $json = json_encode($datos);
        echo ( $json );
    }


    if ($_POST["opt"] === "LI") {
        $idempresa = $_POST["coddiario"];
        $idempresa = substr($idempresa, 1, 1);
        $query = $mysqli->query("call spListaInsertaDiario('" . $_POST["coddiario"] . "','10','10','XXX','XXX','XXX','XXX','".$_POST["fechab"]."','LI')");
        $datos = array();
        while ($cierre = $query->fetch_array()) {
            $datos[] = array(
                "iddetalle"     => $cierre["iddetalle"],
                "idconcepto"    => $cierre["idconcepto"],
                "concepto"      => $cierre["concepto"],
                "responsable"   => $cierre["responsable"],
                "usuamodi"      => $cierre["usuamodi"],
                "ing"           => $cierre["ing"],
                "recibo"        => $cierre["recibo"]
            );
        }
        $json = json_encode($datos);
        echo ($json);
    }

    if ($_POST["opt"] === "LE") {

        $query = $mysqli->query("call spListaInsertaDiario('" . $_POST["coddiario"] . "','10','10','XXX','XXX','XXX','XXX','".$_POST["fechab"]."','LE')");
        $datos = array();
        while ($cierre = $query->fetch_array()) {
            $datos[] = array(
                "iddetalle"     => $cierre["iddetalle"],
                "idconcepto"    => $cierre["idconcepto"],
                "concepto"      => $cierre["concepto"],
                "responsable"   => $cierre["responsable"],
                "usuamodi"      => $cierre["usuamodi"],
                "sal"           => $cierre["sal"],
                "recibo"        => $cierre["recibo"]
            );
        }
        $json = json_encode($datos);
        echo ($json);
    }

    if ($_POST["opt"] === "LISTA_DISTRO") {
        $query = $mysqli->query("call spListaInsertaDistro('" . $_POST["iddetalle"] . "','XXX','XXX','XXX','XXX','LISTAR')");
        $datos = array();
        while ($fila = $query->fetch_array()) {
            $datos[] = array(
                "iddistribucion" => $fila["iddistribucion"],
                "grupo"          => $fila["grupo"],
                "cuenta"         => $fila["cuenta"],
                "propietario"    => $fila["propietario"],
                "estado"         => $fila["estado"],
                "fraccion"       => $fila["fraccion"],
                "monto"          => $fila["monto"]
            );
        }
        $json = json_encode($datos);
        echo ($json);
    }

    if ($_POST["opt"] === "LISTA_DISTRO_E") {
        $query = $mysqli->query("call spListaInsertaDistroE('" . $_POST["iddetalle"] . "','XXX','XXX','XXX','XXX','LISTAR')");
        $datos = array();
        while ($fila = $query->fetch_array()) {
            $datos[] = array(
                "iddistribucion" => $fila["iddistribucion"],
                "grupo"          => $fila["grupo"],
                "cuenta"         => $fila["cuenta"],
                "propietario"    => $fila["propietario"],
                "estado"         => $fila["estado"],
                "fraccion"       => $fila["fraccion"],
                "monto"          => $fila["monto"]
            );
        }
        $json = json_encode($datos);
        echo ($json);
    }

    if ($_POST["opt"] === "IN_ITM_DISTRO") {
        $consulta = "call spListaInsertaDistro('" . $_POST["iddetalle"] . "','" . $_POST["fraccion"] . "','" . $_POST["cuentadestino"] . "',
                                               '" . $_POST["fechamov"] . "','" . $_POST["usuario"] . "','INSERTAR')";
        $result = $mysqli->query($consulta);
    }

    if ($_POST["opt"] === "IN_ITM_DISTRO_S") { // inserta tipo Sucursal
        $consulta = "call spListaInsertaDistro('" . $_POST["iddetalle"] . "','" . $_POST["fraccion"] . "','" . $_POST["cuentadestino"] . "',
                                               '" . $_POST["fechamov"] . "','" . $_POST["usuario"] . "','INSERTAR_S')";
        $result = $mysqli->query($consulta);
    }

    if ($_POST["opt"] === "DEL_ITM_DISTRO") { // ELIMINA DISTRO RECIBDE ID_DISTRO ENVEZ DE ID_DETALLE, DESDE LA FUNCION EN js
        $consulta = "call spListaInsertaDistro('" . $_POST["iddetalle"] . "','XXX','XXX','XXX','XXX','ELIMINAR')";
        $result = $mysqli->query($consulta);
    }

    if ($_POST["opt"] === "CANCELA_DISTRO") { // ELIMINA INGRESOS Y EGRESOS
        $consulta = "call spListaInsertaDistro('" . $_POST["iddetalle"] . "','XXX','XXX','XXX','XXX','CANCELAR')";
        $result = $mysqli->query($consulta);
    }

    if ($_POST["opt"] === "MARCA_DISTRO") { // ELIMINA INGRESOS Y EGRESOS
        $consulta = "call spListaInsertaDistro('" . $_POST["iddetalle"] . "','XXX','XXX','XXX','" . $_POST["usua"] . "','MARCAR')";
        $result = $mysqli->query($consulta);
    }

    if ($_POST["opt"] === "LISTA_ING") {
        $sql = "call spListaInsertaDiario('" . $_POST["coddiario"] . "','XXX','XXX','XXX','XXX','XXX','LI')";
        if (!$result = mysqli_query($mysqli, $sql)) {
            die();
        }
        $data = array();
        while ($fila = mysqli_fetch_assoc($result)) {
            $data[] = array(
                "iddetalle" => $fila["iddetalle"],
                "concepto" => $fila["concepto"],
                "responsable" => $fila["responsable"],
                "ing" => $fila["ing"]
            );
        }
        //$close = mysqli_close($mysqli); //or die("Ha sucedido un error inexperado en la desconexion de la base de datos");
        $data['success'] = true;
        echo json_encode($data);
    }

    if ($_POST["opt"] === "LISTA_EG") {
        $sql = "call spListaInsertaDiario('" . $_POST["coddiario"] . "','XXX','XXX','XXX','XXX','XXX','LE')";
        if (!$result = mysqli_query($mysqli, $sql)) {
            die();
        }
        $data = array();
        while ($fila = mysqli_fetch_assoc($result)) {
            $data[] = array(
                "iddetalle" => $fila["iddetalle"],
                "concepto" => $fila["concepto"],
                "responsable" => $fila["responsable"],
                "sal" => $fila["sal"]
            );
        }
        //$close = mysqli_close($mysqli); //or die("Ha sucedido un error inexperado en la desconexion de la base de datos");
        $data['success'] = true;
        echo json_encode($data);
    }

    if ($_POST['opt'] === 'ND') {
        $sql = " call spInsertaNuevoDiario('" . $_POST["codsucu"] . "','" . $_POST["fechacrea"] . "','" . $_POST["usuamodi"] . "') ";
        if (!$result = mysqli_query($mysqli, $sql)) {
            die();
        }
        $sucus = array();
        while ($sucu = mysqli_fetch_assoc($result)) {
            $sucus[] = array(
                "codigo" => $sucu["cod_diario"],
                "fecha" => $sucu["fechahora"]
            );
        }
        echo json_encode($sucus);
    }

    if ($_POST["opt"] === "CIERRE") { // ACTUALIZA RECIBIDOS
        $consulta = " call spCierra_Diario('" . $_POST["coddiario"] . "','" . $_POST["saldof"] . "','" . $_POST["valor"] . "') ";
        if (!$result = mysqli_query($mysqli, $consulta)) {
            die();
        }
        $datos = array();
        while ($itms = mysqli_fetch_assoc($result)) {
            $datos[] = array(
                "codigo" => $itms["cod_diario"],
                "estado" => $itms["estado"]
            );
        }
        $respuesta = json_encode($datos);
        echo ($respuesta);
    }

    if ($_POST["opt"] === "II") {
        $consulta = "call spListaInsertaDiario('".$_POST["coddiario"]."','".$_POST["monto"]."','".$_POST["idconcepto"]."','".$_POST["sucu_destino"]."',
                    '".$_POST["concepto"]."','".$_POST["responsable"]."','".$_POST["usuamodi"]."','".$_POST["fechab"]."','II')";
        $result = $mysqli->query($consulta);
    }

    if ($_POST["opt"] === "IE") {
        $consulta = "call spListaInsertaDiario('" . $_POST["coddiario"] . "','" . $_POST["monto"] . "','" . $_POST["idconcepto"] . "','" . $_POST["sucu_destino"] . "',
                    '" . $_POST["concepto"] . "','" . $_POST["responsable"] . "','" . $_POST["usuamodi"] . "','".$_POST["fechab"]."','IE')";
        $result = $mysqli->query($consulta);
    }

    if ($_POST["opt"] === "ACTUALIZA") {
        $consulta = "call spActualizaSaldosDiario('" . $_POST["coddiario"] . "','" . $_POST["saldofecha"] . "','" . $_POST["fecha"] . "') ";
        $result = $mysqli->query($consulta);
    }

    if ($_POST["opt"] === "EI") { // ELIMINA INGRESOS Y EGRESOS
        $consulta = "delete from diario_det_v1 where cod_diario='" . $_POST["coddiario"] . "' and itm='" . $_POST["item"] . "' ";
        $result = $mysqli->query($consulta);
    }

    if ($_POST["opt"] === "update") { // ACTUALIZA RECIBIDOS
        $consulta = "update diario_detalle set " . $_POST["campo"] . "='" . $_POST["valor"] . "' where iddetalle='" . $_POST["id_detalle"] . "' ";
        $result = $mysqli->query($consulta);
    }

    if ($_POST["opt"] === "UPDINERO") { // ACTUALIZA RECIBIDOS
        $consulta = "update dinero set " . $_POST["campo"] . "='" . $_POST["valor"] . "' where cod_diario='" . $_POST["coddiario"] . "' and denominacion= '" . $_POST["denomina"] . "'";
        $result = $mysqli->query($consulta);
    }

    if ($_POST["opt"] === "ANULA") { // ACTUALIZA RECIBIDOS
        $consulta = "update diario_detalle set anulado='S',usuamodi='" . $_POST["nusuario"] . "',fechahora=DATE_ADD(NOW(), INTERVAL 2 HOUR)  where iddetalle='" . $_POST["id_detalle"] . "' ";
        $result = $mysqli->query($consulta);
    }

    if ($_POST["opt"] === "CIERREzzzzz") {
        $query = $mysqli->query("call spCierraDiario('" . $_POST["coddiario"] . "','" . $_POST["usuamodifica"] . "','$fechahora','" . $_POST["ting"] . "','" . $_POST["teg"] . "','" . $_POST["saldof"] . "')");

        $datos = array();
        while ($cierre = $query->fetch_array()) {
            $datos[] = array(
                "coddiario" => $cierre["cod_diario"],
                "estado" => $cierre["observacion"]
            );
        }
        $json = json_encode($datos);
        echo ($json);
    }

    if ($_POST["opt"] === "LISTA") {
        $query = $mysqli->query("call spListaCierreDiario('" . $_POST["codsucu"] . "','" . $_POST["fecha"] . "')");
        $datos = array();
        while ($cierre = $query->fetch_array()) {
            $datos[] = array(
                "fecha_diario" => $cierre["fecha_diario"],
                "saldo_i" => $cierre["saldo_i"],
                "saldo_f" => $cierre["saldo_f"],
                "estado" => $cierre["estado"],
                "cod_diario" => $cierre["cod_diario"]
            );
        }
        $json = json_encode($datos);
        echo ($json);
    }

    if ($_POST["opt"] === "itmSSSS") {
        $query = $mysqli->query("SELECT concepto, responsable, fechahora, ing,sal from diario_det_v1 where cod_diario='" . $_POST["codgirosucu"] . "' and itm='" . $_POST["itm"] . "';");
        $datos = array();
        while ($cierre = $query->fetch_array()) {
            $datos[] = array(
                "concepto" => $cierre["concepto"],
                "responsable" => $cierre["responsable"],
                "fechahora" => $cierre["fechahora"],
                "ing" => $cierre["ing"],
                "sal" => $cierre["sal"]
            );
        }
        $jsondata = json_encode($datos);
        echo ($jsondata);
    }
    if ($_POST["opt"] === "itm") {
        $consulta = "SELECT concepto, responsable, fechahora, ing,sal from diario_det_v1 where cod_diario='" . $_POST["coddiario"] . "' and itm='" . $_POST["itm"] . "' ";
        $result = $mysqli->query($consulta);
        $respuesta = new stdClass();
        if ($result->num_rows > 0) {
            $fila = $result->fetch_array();
            $respuesta->concepto = $fila['concepto'];
            $respuesta->responsable = $fila['responsable'];
            $respuesta->fechahora = $fila['fechahora'];
            $respuesta->ing = $fila['ing'];
            $respuesta->sal = $fila['sal'];
        }
    }

    if ($_POST["opt"] === "DINERO") {
        $query = $mysqli->query("call spListaInsertaDinero('" . $_POST["coddiario"] . "','" . $_POST["fecha"] . "')");
        $datos = array();
        while ($cierre = $query->fetch_array()) {
            $datos[] = array(
                "cod_diario" => $cierre["cod_diario"],
                "denominacion" => $cierre["denominacion"],
                "cantidad" => $cierre["cantidad"],
                "total" => $cierre["total"]
            );
        }
        $json = json_encode($datos);
        echo ($json);
    }

    if ($_POST["opt"] === "RECIBO") {
        $consulta = "call spInsertaRecibos('".$_POST["id_detalle"]."','".$_POST["nom_archivo"]."','".$_POST["usuariocarga"]."','".$_POST["descripcion"]."','". $_POST["op"]."')";
        $result = $mysqli->query($consulta);
    }

    if ($_POST["opt"] === "IGPendientes") {
        $consulta = "call spInsertaGirosPendientes('".$_POST["fecha"]."','".$_POST["codsucu"]."')";
        $result = $mysqli->query($consulta);
    }
}


//$cierre->close();
$mysqli->close();
