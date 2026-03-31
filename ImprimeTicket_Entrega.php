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
	$el_logo1='logos/logo_p.jpg';
	break;
case 'E':
	$el_logo='logos/logo_e.jpg';
	$el_logo1='logos/logo_e1.jpg';
	break;
}
/*============================================================*/
//Crear nuevo pdf 
$pdf = new PDF('P','mm',array(72,120));
$pdf->AddPage();
/* $pdf->SetFont('Arial','B', 8);
//Logo
$pdf->SetXY(20, 1); $pdf->Image($el_logo1, 5, 2, 62, 25, 'JPG'); */
//$pdf->SetXY(2, 30);  $pdf->MultiCell(74, 4, utf8_decode('Money Flash'), 0, 'C');
/* $pdf->SetXY(2, 27);  $pdf->MultiCell(68, 4, $row_giro["mensaje1"], 0, 'C'); */
/* $pdf->SetFont('Arial','B', 8);
$pdf->SetTextColor(255);
$pdf->SetXY(2, 5); $pdf->MultiCell(68, 4, 'Agencia Multibancaria - Casa de Cambio', 0, 'C', true); */
$pdf->SetFont('Courier','B', 9);
$pdf->SetTextColor(0);
//$pdf->SetXY(20, 35); 
//$pdf->Image('logos/logo_w.png', 5, 35, 10, 8, 'PNG');
//$pdf->SetXY(18, 36); $pdf->MultiCell(55, 4, 'RECLAMOS Y CONSULTAS', 0, 'L');
//$pdf->SetXY(18, 40);  $pdf->MultiCell(55, 4, $row_giro["telefonos"], 0, 'L');

$pdf->SetXY(2, 5); $pdf->MultiCell(68, 4, 'RECIBO CONTROL INTERNO', 1, 'C');

$pdf->SetXY(2, 9); $pdf->MultiCell(74, 4, 'ENTREGA / PAGO', 0, 'C');
//========================================================================
//$pdf->Line(2, 52, 69, 52);
//================================================================================
$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2,14);  $pdf->Cell(18, 8, 'Numero :', 0, 'L');
$pdf->SetXY(15,14); $pdf->Cell(15, 8, $row_giro["cod_girosucu"], 0, 'L');

$pdf->SetXY(2,17);  $pdf->Cell(18, 8, 'Fecha Entrega:', 0, 'L');
$pdf->SetXY(22,17); $pdf->Cell(15, 8, $fecha_hora, 0, 'L');

$pdf->SetXY(2, 20); $pdf->Cell(18, 8, 'Origen  :', 0, 'L');
/* $pdf->SetXY(15, 48); $pdf->Cell(15, 8, $codorigen, 0, 'L'); */

$pdf->SetXY(2, 23); $pdf->Cell(18, 8, 'Remite  :', 0, 'L');
$pdf->SetXY(15, 23);$pdf->Cell(15, 8, $row_giro["remitente"], 0, 'L');

$pdf->SetXY(2, 26); $pdf->Cell(18, 8, 'Benefi. :', 0, 'L');
$pdf->SetXY(15,26); $pdf->Cell(15, 8, $row_giro["beneficiario"], 0, 'L');
//========================================================================
$pdf->Line(2, 33, 69, 33);
//========================================================================
$pdf->SetFont('Arial','B', 10);
$pdf->SetXY(2, 33);
    $pdf->Cell(18, 8, 'Importe: S/. ', 0, 'L');
    $pdf->Cell(53, -8, $row_giro["importe_giro"], 0, 1, 'C');    
//=========================================================================
$pdf->Line(2, 43, 69, 43);
//=========================================================================
$importe = $row_giro["importe_giro"];
$letras = numletras($importe,1);

$pdf->SetFont('Arial','I', 6);
$pdf->SetXY(2, 43); $pdf->Cell(15, 8, 'Son: ' , 0, 'R'); 
$pdf->SetXY(7, 43); $pdf->Cell(15, 8, $letras , 0, 'R');

$pdf->SetFont('Arial','', 8);
$pdf->SetXY(2, 65);  $pdf->Cell(2, 5, '-------------------------', 0, 'R');
$pdf->SetXY(2, 68);  $pdf->Cell(2, 5, 'FIRMA CLIENTE', 0, 'R');
//$pdf->SetXY(2, 100);  $pdf->Line(2, 90, 27, 90);  $pdf->Cell(2, 5, 'FIRMA CLIENTE', 0, 'R');
$pdf->SetXY(40, 65);  $pdf->Cell(2, 5, '-------------------------', 0, 'R');
$pdf->SetXY(40, 68);  $pdf->Cell(2, 5, 'HUELLA DIGITAL', 0, 'C');

$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2, 71); $pdf->Cell(15, 8, "D.N.I. :", 0, 'R');

$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2, 78); $pdf->Cell(15, 8, 'Atendido por:', 0, 'R');  
$pdf->SetXY(25, 78); $pdf->Cell(15, 8, $_GET['pdfnick'], 0, 'R');
$pdf->SetXY(2, 81); $pdf->Cell(15, 8, 'Fecha: ', 0, 'R'); 
$pdf->SetXY(15, 81); $pdf->Cell(15, 8, $fecha_hora, 0, 'R');

$pdf->SetFont('Arial','', 6);
$pdf->SetXY(2, 84); $pdf->Cell(15, 8, 'Registrado por: ', 0, 'R'); 
$pdf->SetXY(20, 84); $pdf->Cell(15, 8, $row_giro["usuario_registra"], 0, 'R');
$pdf->SetXY(2, 86); $pdf->Cell(15, 8, 'Entregado por: ', 0, 'R'); 
$pdf->SetXY(20, 86); $pdf->Cell(15, 8, $row_giro["usuario_entrega"], 0, 'R');
$pdf->SetXY(2, 88); $pdf->Cell(15, 8, 'Fecha Regsitro: ', 0, 'R'); 
$pdf->SetXY(20, 88); $pdf->Cell(15, 8, $row_giro["fechahora_registro"], 0, 'R');

/* $pdf->SetFont('Arial','', 7);
$pdf->SetXY(2, 113); $pdf->Cell(15, 8, '=============================================', 0, 'C'); 
$pdf->SetFont('Arial','B', 7);
$pdf->SetXY(5, 118); $pdf->MultiCell(58, 3,'www.moneyflash.com.pe' , 0, 'C');
$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2, 118); $pdf->Cell(15, 8, '=============================================', 0, 'C');  */

$pdf->Output(); //Salida al navegador