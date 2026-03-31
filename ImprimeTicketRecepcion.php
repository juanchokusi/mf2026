<?php
date_default_timezone_set("America/Lima");
$fecha_hora = date("d/m/y H:i:s");
include 'NumLetras.php';
include_once('pdf.php');
//Conneca database
 require 'controles/ConectaMySql.php';
$codgirosucu = $_GET['codgirosucursal']; 
$codsucu = $_GET['codsucu']; 
//$codgirosucu = 'MSE819756';

/*=========== recuperando datos del giro =================*/
$sql_giro = "CALL UbicaGiroImpresion('" . $codgirosucu ."','" . $codsucu ."')";
$result_giro = $mysqli->query($sql_giro);
$row_giro = $result_giro->fetch_array();
/*$row_giro["cod_girosucu"]; $row_giro["fechahora_registro"];$row_giro["beneficiario"];$row_giro["remitente"];
$row_giro["importe_giro"];$row_giro["cargo_giro"];$row_giro["otros"];$row_giro["total"];$row_giro["nro_cuenta"];
$row_giro["ciudad_destino"];$row_giro["nom_sucursal"];$row_giro["observagiro"];$row_giro["idempresa];*/
/*======= RECUPEANDO DATOS DEL MENSAJE en ticket ===================
	/*$row_giro["telefonos"];$row_giro["mensaje1"];$row_giro["mensaje2"];$row_giro["mensaje3"];*/
/*======================= logo segun empresa ========================*/
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
if ($codsucu === "MMO"){
	$el_logo='logos/logo_me.jpg';
}
if ($codsucu === "MAA"){
	$el_logo='logos/logo_me.jpg';
}
/*============================================================*/
$yy=40;
//Crear nuevo pdf 
$pdf = new PDF('P','mm',array(72,165));
$pdf->AddPage();
$pdf->SetFont('Arial','B', 7);
//Logo
$pdf->SetXY(20, 1); $pdf->Image($el_logo, 2, 2, 68, 38, 'JPG');
//$pdf->SetXY(2, 30);  $pdf->MultiCell(74, 4, utf8_decode('Money Flash'), 0, 'C');
$pdf->SetXY(2, $yy);  $pdf->MultiCell(68, 4, $row_giro["mensaje1"], 0, 'C');
$pdf->SetFont('Arial','B', 8);
$pdf->SetTextColor(255);
$pdf->SetXY(2, $yy+4); $pdf->MultiCell(68, 4, 'AGENCIA MULTIBANCARIA - CASA DE CAMBIO', 0, 'C', true);
$pdf->SetFont('arial','B', 7);
$pdf->SetTextColor(0);
//$pdf->SetXY(20, 35); 
$pdf->Image('logos/logo_w.png', 5, $yy+8, 10, 8, 'PNG');
$pdf->SetXY(18, $yy+8); $pdf->MultiCell(55, 4, 'RECLAMOS Y CONSULTAS - VOUCHER', 0, 'L');
$pdf->SetFont('arial','B', 8);
$pdf->SetXY(18, $yy+12);  $pdf->MultiCell(55, 4, $row_giro["telefonos"], 0, 'L');

$pdf->SetXY(2, $yy+17); $pdf->MultiCell(68, 4, 'RECIBO CONTROL INTERNO', 1, 'C');

$pdf->SetXY(2, $yy+21); $pdf->MultiCell(74, 4, 'R E C E P C I O N', 0, 'C');
//========================================================================
//$pdf->Line(2, 52, 69, 52);
//================================================================================
$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2,$yy+23);  $pdf->Cell(18, 8, 'Numero :', 0, 'L');
$pdf->SetXY(15,$yy+23); $pdf->Cell(15, 8, $row_giro["cod_girosucu"], 0, 'L');

$pdf->SetXY(2,$yy+26);  $pdf->Cell(18, 8, 'Fecha   :', 0, 'L');
$pdf->SetXY(15,$yy+26); $pdf->Cell(15, 8, $row_giro["fechahora_registro"] , 0, 'L');

$pdf->SetXY(2, $yy+29); $pdf->Cell(18, 8, 'Remite  :', 0, 'L');
$pdf->SetXY(15, $yy+29); $pdf->Cell(15, 8, $row_giro["remitente"], 0, 'L');

$pdf->SetXY(2,$yy+32);  $pdf->Cell(18, 8, 'Destino :', 0, 'L');
$pdf->SetXY(15,$yy+35); $pdf->MultiCell(70, 3, $row_giro["ciudad_destino"], 0, 'L');

$pdf->SetXY(2,$yy+38);  $pdf->Cell(18, 8, 'Otros   :', 0, 'L');
$pdf->SetXY(15,$yy+38); $pdf->Cell(15, 8, $row_giro["observagiro"], 0, 'L');

$pdf->SetXY(2, $yy+41); $pdf->Cell(18, 8, 'Benefi. :', 0, 'L');
$pdf->SetXY(15,$yy+41);  $pdf->Cell(15, 8, $row_giro["beneficiario"], 0, 'L');
//========================================================================
$pdf->Line(2, $yy+47, 69, $yy+47);
//========================================================================
$pdf->SetFont('Arial','B', 10);
$pdf->SetXY(2, $yy+47);
    $pdf->Cell(18, 8, 'Importe: S/. ', 0, 'L');
    $pdf->Cell(35, -8, $row_giro["importe_giro"], 0, 1, 'R');    
$pdf->SetXY(2, $yy+51);
    $pdf->Cell(18, 8, 'Cargo:', 0, 'L');
    $pdf->Cell(35, -8, $row_giro["cargo_giro"], 0, 1, 'R');
$pdf->SetXY(2, $yy+55);
    $pdf->Cell(18, 8, 'Otros:', 0, 'L');
    $pdf->Cell(35, -8, $row_giro["otros"] , 0, 1,'R');
$pdf->SetFont('Arial','B', 10);
$pdf->SetXY(2, $yy+59);
    $pdf->Cell(18, 8, 'Total: S/.', 0, 'L');
    $pdf->Cell(35, -8, $row_giro["total"], 0, 1,'R');
//=========================================================================
$pdf->Line(2, $yy+67, 69, $yy+67);
//=========================================================================
$importe = $row_giro["total"];
$letras = numletras($importe,1);

$pdf->SetFont('Arial','I', 6);
$pdf->SetXY(2, 105); $pdf->Cell(15, 8, 'Son: ' , 0, 'R'); 
$pdf->SetXY(7, 105); $pdf->Cell(15, 8, $letras , 0, 'R'); 

$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2, 108); $pdf->Cell(15, 8, 'Ud. fue atendido por:', 0, 'R');  
$pdf->SetXY(30, 108); $pdf->Cell(15, 8, $_GET['nick'], 0, 'L');
$pdf->SetXY(2, 111); $pdf->Cell(15, 8, 'Fecha: ', 0, 'R'); 
$pdf->SetXY(15, 111); $pdf->Cell(15, 8, $fecha_hora, 0, 'R');

$pdf->SetFont('Arial','', 6);
$pdf->SetXY(2, 114); $pdf->Cell(15, 8, 'Registrado: ', 0, 'R'); 
$pdf->SetXY(15, 114); $pdf->Cell(15, 8, $row_giro["usuario_registra"], 0, 'R');
//$pdf->SetXY(2, 98); $pdf->Cell(15, 8, 'Entregado: ', 0, 'R'); 
//$pdf->SetXY(25, 98); $pdf->Cell(15, 8, $row_giro["usuario_entrega"], 0, 'R');
//$pdf->SetXY(2, 98); $pdf->Cell(15, 8, 'Impreso: ', 0, 'R'); 
//$pdf->SetXY(25, 98); $pdf->Cell(15, 8, $_GET['nick'], 0, 'R');

$pdf->SetFont('Arial','', 8);
$pdf->SetXY(2, 117); $pdf->Cell(15, 8, '=======================================', 0, 'C'); 
$pdf->SetXY(2, 122); $pdf->MultiCell(68, 3, $row_giro["mensaje2"], 0, 'C'); 
$pdf->SetXY(2, 132); $pdf->MultiCell(68, 3, $row_giro["mensaje3"], 0, 'C'); 
/* $pdf->SetXY(2, 138); $pdf->Cell(15, 8, '=======================================', 0, 'C');  */

/* $pdf->SetFont('Arial','b', 7);
//$pdf->SetTextColor(255);
$pdf->SetXY(5, 143); $pdf->MultiCell(58, 3,'www.moneyflash.com.pe' , 0, 'C');
$pdf->SetFont('Arial','I', 5);
$pdf->SetXY(5, 147); $pdf->MultiCell(58, 3,'Powered by makross' , 0, 'C');
    */
$pdf->Output(); //Salida al navegador
