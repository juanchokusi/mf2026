<?php
date_default_timezone_set("America/Lima");
$fecha_hora = date("d/m/y H:i:s");
//$remitente  = $_GET['fecha_r'];
include_once('pdf.php');
$pdf = new PDF('P','mm',array(80,170));
$pdf->AddPage();
$pdf->SetFont('Courier','B', 12);
//Logo
$pdf->SetXY(20, 1);
    $pdf->Image('panterita.png', 30, 5, 17, 25, 'PNG');
//Texto informativo empresa
$pdf->SetXY(2, 30);  $pdf->MultiCell(74, 4, utf8_decode('Money Flash'), 0, 'C');

$pdf->SetFont('Courier','B', 8);
$pdf->SetXY(2, 33);  $pdf->MultiCell(74, 4, utf8_decode('www.moneyflash.com.pe'), 0, 'C');

$pdf->SetFont('Courier','B', 10);
$pdf->SetXY(2, 37);
$pdf->SetTextColor(255); $pdf->MultiCell(74, 4, utf8_decode('Agente Multibanco - Casa de Cambio'), 0, 'C', true);

$pdf->SetXY(2, 41);
$pdf->SetTextColor(0);  $pdf->MultiCell(74, 4, utf8_decode('RECIBO CONTROL INTERNO'), 0, 'C');

$pdf->SetFont('Arial','B', 8);
$pdf->SetXY(2, 44); $pdf->MultiCell(74, 4, utf8_decode('RECEPCION'), 0, 'C');
//================================================================================
$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2,46);  $pdf->Cell(18, 8, 'Numero :', 0, 'L');
$pdf->SetXY(15,46); $pdf->Cell(15, 8, $_GET['codgirosucursal'], 0, 'L');

$pdf->SetXY(2,49);  $pdf->Cell(18, 8, 'Fecha   :', 0, 'L');
$pdf->SetXY(15,49); $pdf->Cell(15, 8, $_GET['pdffecha'] , 0, 'L');

$pdf->SetXY(2, 52); $pdf->Cell(18, 8, 'Remite  :', 0, 'L');
$pdf->SetXY(15, 52); $pdf->Cell(15, 8, $_GET['pdfremitente'] , 0, 'L');

$pdf->SetXY(2,55);  $pdf->Cell(18, 8, 'Destino :', 0, 'L');
$pdf->SetXY(15,58); $pdf->MultiCell(70, 3, $_GET['ciudestino'], 0, 'L');

$pdf->SetXY(2,61);  $pdf->Cell(18, 8, 'Otros   :', 0, 'L');
$pdf->SetXY(15,61); $pdf->Cell(15, 8, $_GET['observa_nrocuenta'] , 0, 'L');

$pdf->SetXY(2, 64); $pdf->Cell(18, 8, 'Benefi. :', 0, 'L');
$pdf->SetXY(15,64);  $pdf->Cell(15, 8, $_GET['pdfbeneficiario'], 0, 'L');
//========================================================================
$pdf->SetXY(2, 73); $pdf->Line(2, 73, 74, 73);
//========================================================================
$pdf->SetFont('Arial','B', 10);
$pdf->SetXY(2, 73);
    $pdf->Cell(18, 8, 'Importe: S/. ', 0, 'L');
    $pdf->Cell(18, 8, $_GET['pdfimporte'], 0, 1, 'C');    
//=========================================================================
$pdf->SetXY(2, 81); $pdf->Line(2, 81, 74, 81);
//=========================================================================
$pdf->SetFont('Arial','', 8);
$pdf->SetXY(2, 97);  $pdf->Cell(2, 5, '-------------------------', 0, 'R');
$pdf->SetXY(2, 100);  $pdf->Cell(2, 5, 'FIRMA CLIENTE', 0, 'R');
//$pdf->SetXY(2, 100);  $pdf->Line(2, 90, 27, 90);  $pdf->Cell(2, 5, 'FIRMA CLIENTE', 0, 'R');
$pdf->SetXY(40, 97);  $pdf->Cell(2, 5, '-------------------------', 0, 'R');
$pdf->SetXY(40, 100);  $pdf->Cell(2, 5, 'HUELLA DIGITAL', 0, 'C');

$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2, 103); $pdf->Cell(15, 8, "D.N.I. :", 0, 'R');

//=================== Pie de pagina ======================================
$pdf->SetXY(2, 110); $pdf->Cell(15, 8, 'Ud. fue atendido por:', 0, 'R');  
$pdf->SetXY(30, 110); $pdf->Cell(15, 8, $_GET['nick'], 0, 'R');

$pdf->SetXY(2, 113); $pdf->Cell(15, 8, 'Fecha: ', 0, 'R'); 
$pdf->SetXY(15, 113); $pdf->Cell(15, 8, $fecha_hora, 0, 'R'); 

$pdf->SetFont('Arial','', 8);
$pdf->SetXY(2, 116); $pdf->Cell(15, 8, '==========================================', 0, 'C'); 
$pdf->SetXY(2, 122); $pdf->MultiCell(74, 3, 'Tenemos 18 Locales para atenderlo.', 0, 'C'); 
$pdf->SetXY(2, 125); $pdf->MultiCell(74, 3, 'Todas tus operaciones en un solo lugar.', 0, 'C'); 
$pdf->SetXY(2, 131); $pdf->MultiCell(74, 3, utf8_decode('Envia tu dinero con rapidez... Con MoneyFlash podras tomar el control de tus envios a todo el Perú.'), 0, 'C');
$pdf->SetXY(2, 137); $pdf->Cell(15, 8, '==========================================', 0, 'C'); 
/* ============================================================================
=============================================================================== */    
//$pdf -> AddPage(); // Creamos una página
$pdf->Output(); //Salida al navegador

