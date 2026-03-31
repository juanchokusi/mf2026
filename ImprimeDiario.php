<?php

date_default_timezone_set("America/Lima");
require_once('class.ezpdf.php');
require 'controles/ConectaMySql.php'; 
$pdf = & new Cezpdf ('a4');
$pdf->selectFont('../fonts/courier.afm');
$pdf->ezSetCmMargins(1, 1, 1, 1);

$pdf->ezStartPageNumbers(550, 18, 10, '', 'Pagina : {PAGENUM} de {TOTALPAGENUM}', 1);
$fechahora = date("Y-m-d H:i:s");
$all = $pdf->openObject();
$pdf->saveState();

$pdf->addText(30, 820, 10, 'Transferencias - Cierrediario : ');
$pdf->addText(160, 820, 10, $_GET["fecha"]);
$pdf->addText(250, 820, 10, $_GET["nombresucu"]);
$pdf->addText(30, 18, 8, $fechahora . '-' . $_GET["nusuario"]);
$pdf->restoreState();
$pdf->closeObject();
// termina las lineas
$pdf->addObject($all, 'all');
/* ----------------------------------- */
//$conexion = mysql_connect("localhost", "juancho", "050522");
//mysql_select_db("girostransferencias", $conexion);
/* DETALLE DIARIO DETALLE DIARIO DETALLE DIARIODETALLE DIARIODETALLE DIARIODETALLE DIARIO */
$consultaDet = "SELECT concepto,ing,sal,responsable,fechahora FROM diario_detalle where cod_diario = '". $_GET["coddiario"]."' and anulado='N' order by 3";
$rptaDet = mysqli_query($mysqli,$consultaDet);
$ixx = 0;

while ($datatmp = mysqli_fetch_assoc($rptaDet)) {
    $ixx = $ixx + 1;
    $dataDet[] = array_merge($datatmp);
}
$cc = count($dataDet);
for ($y = 0; $y < $cc; $y++) {
    $ting+=$dataDet[$y]['ing'];
    $tsal+=$dataDet[$y]['sal'];
}
$tsal = number_format($tsal, 2, '.', '');
$ting = number_format($ting, 2, '.', '');

/* DIARIO - DIARIO - DIARIO- DIARIO- DIARIO- DIARIO- DIARIO- DIARIO */
$consultaT = "call MuestraDiario('".$_GET["codsucu"]."','".$_GET["fecha"]."')";
$respta = mysqli_query($mysqli,$consultaT);
$iT = 0;
while ($datatmpT = mysqli_fetch_assoc($respta)) {
    $iT = $iT + 1;
    $dataTrans[] = array_merge($datatmpT);
}
$cT = count($dataTrans);
for ($y = 0; $y < $cT; $y++) {
    $tentrega+=$dataTrans[$y]['entrega'];
    $trecepcion+=$dataTrans[$y]['recepcion'];
    $tpendiente+=$dataTrans[$y]['pendiente'];
}
$tentrega = number_format($tentrega, 2, '.', '');
$trecepcion = number_format($trecepcion, 2, '.', '');
$tpendiente = number_format($tpendiente, 2, '.', '');

$totalesTrans = array(array('entrega' => $tentrega, 'recepcion' => $trecepcion, 'pendiente' => $tpendiente));

$titTrans = array('cod_girosucu' => '<b>Origen</b>',
    'cod_sucursald'         => '<b>Dest</b>',
    'fechahora_registro'    => '<b>Registrado</b>',
    'fechahora_entrega'     => '<b>Entregado</b>',
    'beneficiario'          => '<b>Beneficiario</b>',
    'remitente'             => '<b>Remitente</b>',
    'entrega'               => '<b>Entrega</b>',
    'recepcion'             => '<b>Recepcion</b>',
    'pendiente'             => '<b>Pendiente</b>'
);
$opTrans = array('shadeCol' => array(1, 1, 1), 'xPos' => 300, 'width' => 550, 'fontSize' => 8,
    'cols' => array('cod_girosucu' => array('justification' => 'left', 'width' => 50),
        'cod_sucursald'         => array('justification' => 'left', 'width' => 30),
        'fechahora_registro'    => array('justification' => 'right', 'width' => 55),
        'fechahora_entrega'     => array('justification' => 'right', 'width' => 55),
        'beneficiario'          => array('justification' => 'left', 'width' => 85),
        'remitente'             => array('justification' => 'left', 'width' => 85),
        'entrega'               => array('justification' => 'right', 'width' => 55),
        'recepcion'             => array('justification' => 'right', 'width' => 55),
        'pendiente'             => array('justification' => 'right', 'width' => 55))
);
$opTotTrans = array('shadeCol' => array(1, 1, 1), 'showHeadings' => 0, 'xPos' => 480, 'width' => 165,
    'cols' => array('entrega' => array('justification' => 'right', 'width' => 55),
        'recepcion' => array('justification' => 'right', 'width' => 55),
        'pendiente' => array('justification' => 'right', 'width' => 55))
);
/* DETALLE DETALLE DETALLE DETALLE DETALLE */
$totalesDet = array(array('Ingresos' => $ting, 'Salidas' => $tsal));
$totalgeneral = array(array('Total Ingresos' => $_GET["totaling"], 'Total Salidas' => $_GET["totalsal"], 'Saldo Final' => $_GET["saldof"]));
//$totalestitulos=array('concepto'=>'Conceptoooo','total'=>'Total');
$titulosDet = array('concepto' => '<b>Concepto</b>',
    'ing' => '<b>Ingreso</b>',
    'sal' => '<b>Salida</b>',
    'responsable' => '<b>Responsable</b>',
    'fechahora' => '<b>FECHA</b>'
);

$optDet = array('shadeCol' => array(1, 1, 1), 'xPos' => 300, 'width' => 450, 'fontSize' => 9,
        'cols'          => array('concepto' => array('justification' => 'left', 'width' => 150),
        'ing'           => array('justification' => 'right', 'width' => 60),
        'sal'           => array('justification' => 'right', 'width' => 60),
        'responsable'   => array('justification' => 'left', 'width' => 100),
        'fechahora'     => array('justification' => 'left', 'width' => 110))
);

$optTotalDet = array('shadeCol' => array(1, 1, 1), 'showHeadings' => 0, 'xPos' => 270, 'width' => 100,
        'cols'      => array('Ingresos' => array('justification' => 'right', 'width' => 60),
        'Salidas'   => array('justification' => 'right', 'width' => 60))
);
$optTotalGeneral = array('showHeadings' => 1, 'xPos' => 210, 'width' => 100, 'fontSize' => 12,
        'cols'          => array('Total Ingresos' => array('justification' => 'right', 'width' => 100),
        'Total Salidas' => array('justification'  => 'right', 'width' => 100),
        'Saldo Final'   => array('justification'  => 'right', 'width' => 100))
);

//$pdf->ezText($txttit, 12);
$pdf->ezTable($dataDet, $titulosDet, '', $optDet);
$pdf->ezText("\n", 1);
$pdf->ezTable($totalesDet, '', '', $optTotalDet);
$pdf->ezText("\n", 3);
$pdf->ezTable($totalgeneral, '', '', $optTotalGeneral);
/* TRANSFERENCIAS */
$pdf->ezText("\n", 3);
$pdf->ezTable($dataTrans, $titTrans, '', $opTrans);
$pdf->ezTable($totalesTrans, '', '', $opTotTrans);

ob_end_clean();
$pdf->ezStream();



















