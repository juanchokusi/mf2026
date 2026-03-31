<?php
date_default_timezone_set("America/Lima");
$FechaHoy = date("Y-m-d");
include 'ConectaMySql.php';

if ($_POST["opt"] === "LI") {
  $query = $mysqli->query("CALL spListaDiario('" . $_POST["coddiario"] . "','" . $_POST["fecha"] . "','LI');");
  $datos = array();
  while ($cierre = $query->fetch_array()) {
    $datos[] = array(
      "iddetalle"   => $cierre["iddetalle"],
      "idconcepto"  => $cierre["idconcepto"],
      "concepto"    => $cierre["concepto"],
      "extradata"   => $cierre["extradata"],
      "responsable" => $cierre["responsable"],
      "usuamodi"    => $cierre["usuamodi"],
      "ing"         => $cierre["ing"],
      "recibo"      => $cierre["recibo"]
    );
  }
  $json = json_encode($datos);
  echo ($json);
}

if ($_POST["opt"] === "LE") {
  $query = $mysqli->query("call spListaDiario('" . $_POST["coddiario"] . "','" . $_POST["fecha"] . "','LE');");
  $datos = array();
  while ($cierre = $query->fetch_array()) {
    $datos[] = array(
      "iddetalle"   => $cierre["iddetalle"],
      "idconcepto"  => $cierre["idconcepto"],
      "concepto"    => $cierre["concepto"],
      "extradata"   => $cierre["extradata"],
      "responsable" => $cierre["responsable"],
      "usuamodi"    => $cierre["usuamodi"],
      "sal"         => $cierre["sal"],
      "recibo"      => $cierre["recibo"]
    );
  }
  $json = json_encode($datos);
  echo ($json);
}

if ($_POST["opt"] === "II") {
  $consulta = "call spListaInsertaDiario('" . $_POST["coddiario"] . "','" . $_POST["monto"] . "','" . $_POST["idconcepto"] . "','" . $_POST["sucu_destino"] . "',
                    '" . $_POST["concepto"] . "','" . $_POST["responsable"] . "','" . $_POST["usuamodi"] . "','" . $_POST["fecha"] . "','".$_POST["extradata"]."','".$_POST["idempresa"]."','II')";
  $result = $mysqli->query($consulta);
}

if ($_POST["opt"] === "IE") {
  $consulta = "call spListaInsertaDiario('" . $_POST["coddiario"] . "','" . $_POST["monto"] . "','" . $_POST["idconcepto"] . "','" . $_POST["sucu_destino"] . "',
                    '" . $_POST["concepto"] . "','" . $_POST["responsable"] . "','" . $_POST["usuamodi"] . "','" . $_POST["fecha"] . "','".$_POST["extradata"]."','" . $_POST["idempresa"] . "','IE')";
  $result = $mysqli->query($consulta);
}

if ($_POST["opt"] === "ANULA_MOVS") {
  $consulta = "call spAnulaMovsCierreDiario('".$_POST["id_detalle"]."','".$_POST["extradata"]."','".$_POST["fecha"]."','".$_POST["concepto"]."','".$_POST["motivo"]."')";
  $result = $mysqli->query($consulta);
}
