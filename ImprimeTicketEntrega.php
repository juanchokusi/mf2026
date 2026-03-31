<?php
date_default_timezone_set("America/Lima");
$fecha_hora = date("d/m/y H:i:s");
include 'NumLetras.php';
include_once('pdf.php');
//Conneca database
 require 'controles/ConectaMySql.php';
$codgirosucu = $_GET['pdfcodgirosucursal'];
$codsucu = $_GET['codsucu'];
//$codgirosucu = 'MSE819756';
/*=========== recuperando datos del giro =================*/
$sql_giro = "CALL UbicaGiroImpresion('" . $codgirosucu ."','" . $codsucu ."')";
$result_giro = $mysqli->query($sql_giro);
$row_giro = $result_giro->fetch_array();
/*============================================================*/
$codorigen = $row_giro["cod_girosucu"];
$codorigen = substr($codorigen,1,3);
$empresa = $row_giro["idempresa"];
//$el_logo='logo_mf.jpg';
switch($empresa){
case 'M':
	$el_logo='logos/logo_mf.jpg';
	$el_logo1='logos/logo_mf1.jpg';
	break;
case 'P':
	$el_logo='logos/logo_p.jpg';
	$el_logo1='logos/logo_p1.jpg';
	break;
case 'E':
	$el_logo='logos/logo_e.jpg';
	$el_logo1='logos/logo_e1.jpg';
	break;
}
/*============================================================*/
//Crear nuevo pdf 
$pdf = new PDF('P','mm',array(72,155));
$pdf->AddPage();
$pdf->SetFont('Arial','B', 8);
//Logo
$pdf->SetXY(20, 1); $pdf->Image($el_logo, 2, 2, 68, 38, 'JPG');
//$pdf->SetXY(2, 30);  $pdf->MultiCell(74, 4, utf8_decode('Money Flash'), 0, 'C');
$pdf->SetXY(2, 40);  $pdf->MultiCell(68, 4, $row_giro["mensaje1"], 0, 'C');
$pdf->SetFont('Arial','B', 8);
$pdf->SetTextColor(255);
$pdf->SetXY(2, 44); $pdf->MultiCell(68, 4, 'AGENCIA MULTIBANCARIA - CASA DE CAMBIO', 0, 'C', true);
$pdf->SetFont('Courier','B', 7);
$pdf->SetTextColor(0);
$pdf->Image('logos/logo_w.png', 5, 48, 10, 8, 'PNG');
$pdf->SetXY(18, 49); $pdf->MultiCell(55, 4, 'RECLAMOS Y CONSULTAS - VOUCHER', 0, 'L');
$pdf->SetFont('arial','B', 8);
$pdf->SetXY(18, 53);  $pdf->MultiCell(55, 4, $row_giro["telefonos"], 0, 'L');

$pdf->SetXY(2, 58); $pdf->MultiCell(68, 4, 'RECIBO CONTROL INTERNO', 1, 'C');

$pdf->SetXY(2, 62); $pdf->MultiCell(74, 4, 'ENTREGA / PAGO', 0, 'C');
//========================================================================
//$pdf->Line(2, 52, 69, 52);
//================================================================================
$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2,65);  $pdf->Cell(18, 8, 'Numero :', 0, 'L');
$pdf->SetXY(15,65); $pdf->Cell(15, 8, $row_giro["cod_girosucu"], 0, 'L');

$pdf->SetXY(2,68);  $pdf->Cell(18, 8, 'Fecha Entrega:', 0, 'L');
$pdf->SetXY(23,68); $pdf->Cell(15, 8, $fecha_hora, 0, 'L');

$pdf->SetXY(2, 72); $pdf->Cell(18, 8, 'Origen  :', 0, 'L');
/* $pdf->SetXY(15, 58); $pdf->Cell(15, 8, $codorigen, 0, 'L'); */

$pdf->SetXY(2, 74); $pdf->Cell(18, 8, 'Remite  :', 0, 'L');
$pdf->SetXY(15, 74); $pdf->Cell(15, 8, $row_giro["remitente"], 0, 'L');

$pdf->SetXY(2, 77); $pdf->Cell(18, 8, 'Benefi. :', 0, 'L');
$pdf->SetXY(15,77);  $pdf->Cell(15, 8, $row_giro["beneficiario"], 0, 'L');
//========================================================================
$pdf->Line(2, 84, 69, 84);
//========================================================================
$pdf->SetFont('Arial','B', 10);
$pdf->SetXY(2, 85);
    $pdf->Cell(18, 8, 'Importe: S/. ', 0, 'L');
    $pdf->Cell(53, -8, $row_giro["importe_giro"], 0, 1, 'C');    
//=========================================================================
$pdf->Line(2, 94, 69, 94);
//=========================================================================
$importe = $row_giro["importe_giro"];
$letras = numletras($importe,1);

$pdf->SetFont('Arial','I', 6);
$pdf->SetXY(2, 93); $pdf->Cell(15, 8, 'Son: ' , 0, 'R'); 
$pdf->SetXY(7, 93); $pdf->Cell(15, 8, $letras , 0, 'R'); 

$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2, 98); $pdf->Cell(15, 8, 'Ud. fue atendido por:', 0, 'R');  
$pdf->SetXY(30, 98); $pdf->Cell(15, 8, $_GET['pdfnick'], 0, 'R');
$pdf->SetXY(2, 101); $pdf->Cell(15, 8, 'Fecha: ', 0, 'R'); 
$pdf->SetXY(15, 101); $pdf->Cell(15, 8, $fecha_hora, 0, 'R');

/* $pdf->SetFont('Arial','', 6);
$pdf->SetXY(2, 96); $pdf->Cell(15, 8, 'Registrado por: ', 0, 'R'); 
$pdf->SetXY(20, 96); $pdf->Cell(15, 8, $row_giro["usuario_registra"], 0, 'R');
$pdf->SetXY(2, 98); $pdf->Cell(15, 8, 'Entregado por: ', 0, 'R'); 
$pdf->SetXY(20, 98); $pdf->Cell(15, 8, $row_giro["usuario_entrega"], 0, 'R');
$pdf->SetXY(2, 100); $pdf->Cell(15, 8, 'Fecha Registro: ', 0, 'R'); 
$pdf->SetXY(20, 100); $pdf->Cell(15, 8, $row_giro["fechahora_registro"], 0, 'R'); */

$pdf->SetFont('Arial','', 8);
$pdf->SetXY(2, 104); $pdf->Cell(15, 8, '========================================', 0, 'C'); 
$pdf->SetXY(2, 110); $pdf->MultiCell(0, 3, $row_giro["mensaje2"], 0, 'C'); 
$pdf->SetXY(2, 120); $pdf->MultiCell(0, 3, $row_giro["mensaje3"], 0, 'C'); 
/* $pdf->SetXY(2, 120); $pdf->Cell(15, 8, '========================================', 0, 'C');  */

/* $pdf->SetFont('Arial','B', 7);
$pdf->SetXY(5, 125); $pdf->MultiCell(66, 3,'www.moneyflash.com.pe' , 0, 'C');
$pdf->SetFont('Arial','', 8);
$pdf->SetXY(2, 125); $pdf->Cell(15, 8, '========================================', 0, 'C'); 

$pdf->SetFont('Arial','', 6);
$pdf->SetXY(5, 130); $pdf->MultiCell(66, 3,'potenciado por :: makross' , 0, 'C'); */
$pdf->Output(); //Salida al navegador