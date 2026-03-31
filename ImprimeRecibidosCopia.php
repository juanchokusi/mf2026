<?php
date_default_timezone_set("America/Lima");
$fecha_hora = date("d/m/y H:i:s");
//$remitente  = $_GET['fecha_r'];
include_once('pdf.php');
$pdf = new PDF('P','mm',array(72,142));
//$pdf = new PDF();
$pdf->AddPage();
$pdf->SetFont('Courier','B', 12);
//Logo
$pdf->SetXY(20, 1); $pdf->Image('logo4.png', 5, 2, 62, 25, 'PNG');

$pdf->SetXY(2, 25);
$pdf->SetTextColor(255);  $pdf->MultiCell(68, 4, utf8_decode('RECIBO CONTROL INTERNO'), 0, 'C',true);

$pdf->SetFont('Arial','', 7);
$pdf->SetTextColor(0);
$pdf->SetXY(2, 30); $pdf->MultiCell(68, 4, utf8_decode('RECEPCION'), 0, 'C');
//================================================================================
$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2,33);  $pdf->Cell(18, 8, 'Numero :', 0, 'L');
$pdf->SetXY(15,33); $pdf->Cell(15, 8, $_GET['codgirosucursal'], 0, 'L');

$pdf->SetXY(2,36);  $pdf->Cell(18, 8, 'Fecha   :', 0, 'L');
$pdf->SetXY(15,36); $pdf->Cell(15, 8, $_GET['pdffecha'] , 0, 'L');

$pdf->SetXY(2, 39); $pdf->Cell(18, 8, 'Remite  :', 0, 'L');
$pdf->SetXY(15, 39); $pdf->Cell(15, 8, $_GET['pdfremitente'] , 0, 'L');

$pdf->SetXY(2,42);  $pdf->Cell(18, 8, 'Destino :', 0, 'L');
$pdf->SetXY(15,45); $pdf->MultiCell(58, 3, $_GET['ciudestino'], 0, 'L');

$pdf->SetXY(2,48);  $pdf->Cell(18, 8, 'Otros   :', 0, 'L');
$pdf->SetXY(15,48); $pdf->Cell(15, 8, $_GET['observa_nrocuenta'] , 0, 'L');

$pdf->SetXY(2, 51); $pdf->Cell(18, 8, 'Benefi. :', 0, 'L');
$pdf->SetXY(15,51);  $pdf->Cell(15, 8, $_GET['pdfbeneficiario'], 0, 'L');
//========================================================================
$pdf->SetXY(2, 60); $pdf->Line(2, 60, 68, 60);
//========================================================================
$pdf->SetFont('Arial','B', 8);
$pdf->SetXY(2, 60);
    $pdf->Cell(18, 8, 'Importe: S/. ', 0, 'L');
    $pdf->Cell(20, 8, $_GET['pdfimporte'], 0, 1, 'R');    
 
$pdf->SetXY(2, 63);
    $pdf->Cell(18, 8, 'Cargo:', 0, 'L');
    $pdf->Cell(20, 8, $_GET['pdfcargo'], 0, 1, 'R');
    
$pdf->SetXY(2, 66);
    $pdf->Cell(18, 8, 'Otros:', 0, 'L');
    $pdf->Cell(20, 8, $_GET['pdfotros'], 0, 1,'R');

$pdf->SetFont('Arial','B', 10);
$pdf->SetXY(2, 70);
    $pdf->Cell(18, 8, 'Total: S/.', 0, 'L');
    $pdf->Cell(20, 8, $_GET['pdftotal'], 0, 1,'R');
//========================================================================
//$pdf->SetXY(2, 70); 
$pdf->Line(2, 78, 68, 78);
//========================================================================
$pdf->SetFont('Arial','', 8);
$pdf->SetXY(2, 97);  $pdf->Cell(2, 5, '-------------------------', 0, 'R');
$pdf->SetXY(2, 100);  $pdf->Cell(2, 5, 'FIRMA CLIENTE', 0, 'R');
//$pdf->SetXY(2, 100);  $pdf->Line(2, 90, 27, 90);  $pdf->Cell(2, 5, 'FIRMA CLIENTE', 0, 'R');
$pdf->SetXY(40, 97);  $pdf->Cell(2, 5, '-------------------------', 0, 'R');
$pdf->SetXY(40, 100);  $pdf->Cell(2, 5, 'HUELLA DIGITAL', 0, 'C');

$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2, 103); $pdf->Cell(15, 8, "D.N.I. :", 0, 'R');

//=================== Pie de pagina ======================================
$pdf->SetXY(2, 110); $pdf->Cell(15, 8, 'Atendido por:', 0, 'R');  
$pdf->SetXY(20, 110); $pdf->Cell(15, 8, $_GET['nick'], 0, 'L');

$pdf->SetXY(2, 113); $pdf->Cell(15, 8, 'Fecha: ', 0, 'R'); 
$pdf->SetXY(15, 113); $pdf->Cell(15, 8, $fecha_hora, 0, 'R'); 




$pdf->Output(); //Salida al navegador
