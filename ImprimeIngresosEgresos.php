<?php
date_default_timezone_set("America/Lima");
$fecha_hora = date("d/m/y H:i:s");
include 'NumLetras.php';
include_once('pdf.php');
//Conneca database
 require 'controles/ConectaMySql.php';
$ingsal = strval($_GET['ingsal']);
$tipo = $_GET["tipo"]; /* cliente, cajero*/
$id_diariodetalle = $_GET['iddiariodetalle'];

/*=========== recuperando datos del diariodetalle =================*/
$sql_giro = "CALL UbicaDiarioImpresion('" . $id_diariodetalle ."')";
$result_giro = $mysqli->query($sql_giro);
$row_giro = $result_giro->fetch_array();
/*============================================================*/
/* $codorigen = $row_giro["cod_girosucu"];
$codorigen = substr($codorigen,1,3); */
$empresa = $_GET['codsucu'];
$empresa = substr($empresa,0,1);
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
/*========================= INGRESOS ===================================*/

if ($ingsal == 'IN' and $tipo == 'cliente' ){
//Crear nuevo pdf
	$pdf = new PDF('P','mm',array(72,100));
	$pdf->AddPage();
	$pdf->SetFont('Arial','B', 8);
	//Logo
	$pdf->SetXY(20, 1); $pdf->Image($el_logo1, 5, 2, 62, 25, 'JPG');

	$pdf->SetFont('Arial','B', 10);
	$pdf->SetTextColor(255);
	$pdf->SetXY(2, 25); $pdf->MultiCell(68, 4, 'Agente Multibanco - Casa de Cambio', 0, 'C', true);
	$pdf->SetFont('Courier','B', 10);
	$pdf->SetTextColor(0);

	$pdf->SetXY(2, 30); $pdf->MultiCell(68, 4, 'RECIBO DE INGRESOS', 1, 'C');
	$pdf->SetXY(23,39); $pdf->Cell(15, 6, $row_giro["ing"], 0, 'L');
	$importe = $row_giro["ing"];
		$pdf->SetFont('Arial','', 7);
	$pdf->SetXY(2,35);  $pdf->Cell(18, 8, 'Recibi de :', 0, 'L');
	$pdf->SetXY(18,35); $pdf->Cell(15, 8, $row_giro["responsable"], 0, 'L');

	$pdf->SetXY(2,39);  $pdf->Cell(18, 8, 'La suma de S/. ', 0, 'L');

	$letras = numletras($importe,1);
	$pdf->SetFont('Arial','I', 7);
	$pdf->SetXY(2, 42); $pdf->Cell(15, 8, 'Son: ' , 0, 'R'); 
	$pdf->SetXY(8, 42); $pdf->Cell(15, 8, $letras , 0, 'R');

	$pdf->SetFont('Arial','', 7);
	$pdf->SetXY(2, 46); $pdf->Cell(15, 8, 'Por concepto de: ' , 0, 'R'); 
	$pdf->SetXY(22, 46); $pdf->Cell(15, 8, $row_giro["concepto"] , 0, 'R');

	$pdf->SetXY(2, 50); $pdf->Cell(15, 8, 'Motivo: ' , 0, 'R'); 
	$pdf->SetXY(12, 50); $pdf->Cell(15, 8, $row_giro["descripcion"] , 0, 'R');

	$pdf->SetXY(2, 54); $pdf->Cell(15, 8, 'Entregado por: ' , 0, 'R'); 
	$pdf->SetXY(20, 54); $pdf->Cell(15, 8, $row_giro["usuario"] , 0, 'R');

	$pdf->SetXY(2, 58); $pdf->Cell(15, 8, 'Fecha entrega: ' , 0, 'R'); 
	$pdf->SetXY(22, 58); $pdf->Cell(15, 8, $row_giro["fechahora"] , 0, 'R');

	$pdf->SetFont('Arial','', 6);
	$pdf->SetXY(2, 65); $pdf->Cell(15, 8, 'Atendido por:', 0, 'R');  
	$pdf->SetXY(20, 65); $pdf->Cell(15, 8, $_GET['nick'], 0, 'R');
	$pdf->SetXY(2, 68); $pdf->Cell(15, 8, 'Fecha impresion: ', 0, 'R'); 
	$pdf->SetXY(20, 68); $pdf->Cell(15, 8, $fecha_hora, 0, 'R');

	$pdf->SetFont('Arial','', 8);
	$pdf->SetXY(2, 70); $pdf->Cell(15, 8, '========================================', 0, 'C'); 

	$pdf->SetFont('Arial','B', 7);
	$pdf->SetXY(5, 75); $pdf->MultiCell(66, 3,'www.moneyflash.com.pe' , 0, 'C');

	$pdf->Output('cliente','I');

}
if ($ingsal == 'IN' and $tipo == 'cajero' ){
//Crear nuevo pdf
$pdf = new PDF('P','mm',array(72,130));
$pdf->AddPage();
$pdf->SetFont('Arial','B', 8);
//Logo
$pdf->SetXY(20, 1); $pdf->Image($el_logo1, 5, 2, 62, 25, 'JPG');

$pdf->SetFont('Arial','B', 10);
$pdf->SetTextColor(255);
$pdf->SetXY(2, 25); $pdf->MultiCell(68, 4, 'Agente Multibanco - Casa de Cambio', 0, 'C', true);
$pdf->SetFont('Courier','B', 10);
$pdf->SetTextColor(0);
	$pdf->SetXY(2, 30); $pdf->MultiCell(68, 4, 'RECIBO DE INGRESOS', 1, 'C');
	$pdf->SetXY(23,39); $pdf->Cell(15, 6, $row_giro["ing"], 0, 'L');
	$importe = $row_giro["ing"];

	$pdf->SetFont('Arial','', 7);
	$pdf->SetXY(2,35);  $pdf->Cell(18, 8, 'Recibi de :', 0, 'L');
	$pdf->SetXY(18,35); $pdf->Cell(15, 8, $row_giro["responsable"], 0, 'L');

	$pdf->SetXY(2,39);  $pdf->Cell(18, 8, 'La suma de S/. ', 0, 'L');

	$letras = numletras($importe,1);
	$pdf->SetFont('Arial','I', 7);
	$pdf->SetXY(2, 42); $pdf->Cell(15, 8, 'Son: ' , 0, 'R'); 
	$pdf->SetXY(8, 42); $pdf->Cell(15, 8, $letras , 0, 'R');

	$pdf->SetFont('Arial','', 7);
	$pdf->SetXY(2, 46); $pdf->Cell(15, 8, 'Por concepto de: ' , 0, 'R'); 
	$pdf->SetXY(22, 46); $pdf->Cell(15, 8, $row_giro["concepto"] , 0, 'R');

	$pdf->SetXY(2, 50); $pdf->Cell(15, 8, 'Motivo: ' , 0, 'R'); 
	$pdf->SetXY(12, 50); $pdf->Cell(15, 8, $row_giro["descripcion"] , 0, 'R');

	$pdf->SetXY(2, 54); $pdf->Cell(15, 8, 'Entregado por: ' , 0, 'R'); 
	$pdf->SetXY(20, 54); $pdf->Cell(15, 8, $row_giro["usuario"] , 0, 'R');

	$pdf->SetXY(2, 58); $pdf->Cell(15, 8, 'Fecha entrega: ' , 0, 'R'); 
	$pdf->SetXY(22, 58); $pdf->Cell(15, 8, $row_giro["fechahora"] , 0, 'R');

	$pdf->SetFont('Arial','', 8);
	$pdf->SetXY(2, 83);  $pdf->Cell(2, 5, '-------------------------', 0, 'R');
	$pdf->SetXY(2, 86);  $pdf->Cell(2, 5, '     RECIBE', 0, 'C');

	$pdf->SetXY(40, 83);  $pdf->Cell(2, 5, '-------------------------', 0, 'R');
	$pdf->SetXY(40, 86);  $pdf->Cell(2, 5, '     ENTREGA', 0, 'C');

	$pdf->SetFont('Arial','', 6);
	$pdf->SetXY(2, 90); $pdf->Cell(15, 8, 'Atendido por:', 0, 'R');  
	$pdf->SetXY(20, 90); $pdf->Cell(15, 8, $_GET['nick'], 0, 'R');
	$pdf->SetXY(2, 93); $pdf->Cell(15, 8, 'Fecha impresion: ', 0, 'R'); 
	$pdf->SetXY(20, 93); $pdf->Cell(15, 8, $fecha_hora, 0, 'R');

	$pdf->SetFont('Arial','', 8);
	$pdf->SetXY(2, 97); $pdf->Cell(15, 8, '========================================', 0, 'C'); 

	$pdf->SetFont('Arial','B', 7);
	$pdf->SetXY(5, 102); $pdf->MultiCell(66, 3,'www.moneyflash.com.pe' , 0, 'C');

	$pdf->Output('Cajero','I'); //Salida al navegador

}

/*========================== EGRESOS ==================================*/
if ($ingsal == 'SA' and $tipo == 'cliente' ){
//Crear nuevo pdf
	$pdf = new PDF('P','mm',array(72,100));
	$pdf->AddPage();
	$pdf->SetFont('Arial','B', 8);
	//Logo
	$pdf->SetXY(20, 1); $pdf->Image($el_logo1, 5, 2, 62, 25, 'JPG');

	$pdf->SetFont('Arial','B', 10);
	$pdf->SetTextColor(255);
	$pdf->SetXY(2, 25); $pdf->MultiCell(68, 4, 'Agente Multibanco - Casa de Cambio', 0, 'C', true);
	$pdf->SetFont('Courier','B', 10);
	$pdf->SetTextColor(0);

	$pdf->SetXY(2, 30); $pdf->MultiCell(68, 4, 'RECIBO DE EGRESOS', 1, 'C');
	$pdf->SetXY(23,39); $pdf->Cell(15, 6, $row_giro["sal"], 0, 'L');
	$importe = $row_giro["sal"];
		$pdf->SetFont('Arial','', 7);
	$pdf->SetXY(2,35);  $pdf->Cell(18, 8, 'Se entrega a :', 0, 'L');
	$pdf->SetXY(18,35); $pdf->Cell(15, 8, $row_giro["responsable"], 0, 'L');

	$pdf->SetXY(2,39);  $pdf->Cell(18, 8, 'La suma de S/. ', 0, 'L');

	$letras = numletras($importe,1);
	$pdf->SetFont('Arial','I', 7);
	$pdf->SetXY(2, 42); $pdf->Cell(15, 8, 'Son: ' , 0, 'R'); 
	$pdf->SetXY(8, 42); $pdf->Cell(15, 8, $letras , 0, 'R');

	$pdf->SetFont('Arial','', 7);
	$pdf->SetXY(2, 46); $pdf->Cell(15, 8, 'Por concepto de: ' , 0, 'R'); 
	$pdf->SetXY(22, 46); $pdf->Cell(15, 8, $row_giro["concepto"] , 0, 'R');

	$pdf->SetXY(2, 50); $pdf->Cell(15, 8, 'Motivo: ' , 0, 'R'); 
	$pdf->SetXY(12, 50); $pdf->Cell(15, 8, $row_giro["descripcion"] , 0, 'R');

	$pdf->SetXY(2, 54); $pdf->Cell(15, 8, 'Entregado por: ' , 0, 'R'); 
	$pdf->SetXY(20, 54); $pdf->Cell(15, 8, $row_giro["usuario"] , 0, 'R');

	$pdf->SetXY(2, 58); $pdf->Cell(15, 8, 'Fecha entrega: ' , 0, 'R'); 
	$pdf->SetXY(22, 58); $pdf->Cell(15, 8, $row_giro["fechahora"] , 0, 'R');

	$pdf->SetFont('Arial','', 6);
	$pdf->SetXY(2, 65); $pdf->Cell(15, 8, 'Atendido por:', 0, 'R');  
	$pdf->SetXY(20, 65); $pdf->Cell(15, 8, $_GET['nick'], 0, 'R');
	$pdf->SetXY(2, 68); $pdf->Cell(15, 8, 'Fecha impresion: ', 0, 'R'); 
	$pdf->SetXY(20, 68); $pdf->Cell(15, 8, $fecha_hora, 0, 'R');

	$pdf->SetFont('Arial','', 8);
	$pdf->SetXY(2, 70); $pdf->Cell(15, 8, '========================================', 0, 'C'); 

	$pdf->SetFont('Arial','B', 7);
	$pdf->SetXY(5, 75); $pdf->MultiCell(66, 3,'www.moneyflash.com.pe' , 0, 'C');

	$pdf->Output('cliente','I');

}
if ($ingsal == 'SA' and $tipo == 'cajero' ){
//Crear nuevo pdf
$pdf = new PDF('P','mm',array(72,130));
$pdf->AddPage();
$pdf->SetFont('Arial','B', 8);
//Logo
$pdf->SetXY(20, 1); $pdf->Image($el_logo1, 5, 2, 62, 25, 'JPG');

$pdf->SetFont('Arial','B', 10);
$pdf->SetTextColor(255);
$pdf->SetXY(2, 25); $pdf->MultiCell(68, 4, 'Agente Multibanco - Casa de Cambio', 0, 'C', true);
$pdf->SetFont('Courier','B', 10);
$pdf->SetTextColor(0);
	$pdf->SetXY(2, 30); $pdf->MultiCell(68, 4, 'RECIBO DE EGRESOS', 1, 'C');
	$pdf->SetXY(23,39); $pdf->Cell(15, 6, $row_giro["sal"], 0, 'L');
	$importe = $row_giro["sal"];

	$pdf->SetFont('Arial','', 7);
	$pdf->SetXY(2,35);  $pdf->Cell(18, 8, 'Se entrega a:', 0, 'L');
	$pdf->SetXY(18,35); $pdf->Cell(15, 8, $row_giro["responsable"], 0, 'L');

	$pdf->SetXY(2,39);  $pdf->Cell(18, 8, 'La suma de S/. ', 0, 'L');

	$letras = numletras($importe,1);
	$pdf->SetFont('Arial','I', 7);
	$pdf->SetXY(2, 42); $pdf->Cell(15, 8, 'Son: ' , 0, 'R'); 
	$pdf->SetXY(8, 42); $pdf->Cell(15, 8, $letras , 0, 'R');

	$pdf->SetFont('Arial','', 7);
	$pdf->SetXY(2, 46); $pdf->Cell(15, 8, 'Por concepto de: ' , 0, 'R'); 
	$pdf->SetXY(22, 46); $pdf->Cell(15, 8, $row_giro["concepto"] , 0, 'R');

	$pdf->SetXY(2, 50); $pdf->Cell(15, 8, 'Motivo: ' , 0, 'R'); 
	$pdf->SetXY(12, 50); $pdf->Cell(15, 8, $row_giro["descripcion"] , 0, 'R');

	$pdf->SetXY(2, 54); $pdf->Cell(15, 8, 'Entregado por: ' , 0, 'R'); 
	$pdf->SetXY(20, 54); $pdf->Cell(15, 8, $row_giro["usuario"] , 0, 'R');

	$pdf->SetXY(2, 58); $pdf->Cell(15, 8, 'Fecha entrega: ' , 0, 'R'); 
	$pdf->SetXY(22, 58); $pdf->Cell(15, 8, $row_giro["fechahora"] , 0, 'R');

	$pdf->SetFont('Arial','', 8);
	$pdf->SetXY(2, 83);  $pdf->Cell(2, 5, '-------------------------', 0, 'R');
	$pdf->SetXY(2, 86);  $pdf->Cell(2, 5, '     RECIBE', 0, 'C');

	$pdf->SetXY(40, 83);  $pdf->Cell(2, 5, '-------------------------', 0, 'R');
	$pdf->SetXY(40, 86);  $pdf->Cell(2, 5, '     ENTREGA', 0, 'C');

	$pdf->SetFont('Arial','', 6);
	$pdf->SetXY(2, 90); $pdf->Cell(15, 8, 'Atendido por:', 0, 'R');  
	$pdf->SetXY(20, 90); $pdf->Cell(15, 8, $_GET['nick'], 0, 'R');
	$pdf->SetXY(2, 93); $pdf->Cell(15, 8, 'Fecha impresion: ', 0, 'R'); 
	$pdf->SetXY(20, 93); $pdf->Cell(15, 8, $fecha_hora, 0, 'R');

	$pdf->SetFont('Arial','', 8);
	$pdf->SetXY(2, 97); $pdf->Cell(15, 8, '========================================', 0, 'C'); 

	$pdf->SetFont('Arial','B', 7);
	$pdf->SetXY(5, 102); $pdf->MultiCell(66, 3,'www.moneyflash.com.pe' , 0, 'C');

	$pdf->Output('Cajero','I'); //Salida al navegador

}

