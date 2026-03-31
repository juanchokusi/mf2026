<?php
date_default_timezone_set("America/Lima");
$fecha_hora = date("d/m/Y H:i:s");
/*$beneficiario  = $_GET['codsucursal'];*/
include_once('pdf.php');
/*include_once('myDBC.php');*/
$pdf = new PDF('P','mm',array(74,170));
$pdf->AddPage();
$pdf->SetFont('Arial','B', 12);
//Logo
$pdf->SetXY(20, 1);
    $pdf->Image('logos/logo_mf.jpg', 5, 2, 62, 25, 'JPG');

$pdf->SetXY(2, 27);
$pdf->SetTextColor(255); $pdf->MultiCell(68, 4, utf8_decode('RECIBO CONTROL INTERNO'), 0, 'C', true);

$pdf->SetFont('Arial','B', 8);
$pdf->SetTextColor(0);
$pdf->SetXY(2, 31); $pdf->MultiCell(68, 4, utf8_decode('Entrega/Pago'), 0, 'C');
//================================================================================
$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2,34);  $pdf->Cell(15, 8, 'Numero:', 0, 'L');    
$pdf->SetXY(15,34); $pdf->Cell(15, 8, $_GET['pdfcodgirosucursal'], 0, 'L');    

$pdf->SetXY(2, 37); $pdf->Cell(18, 8, 'Entrega:', 0, 'L'); 
$pdf->SetXY(15,37); $pdf->Cell(15, 8, $fecha_hora , 0, 'L');    

$pdf->SetXY(2, 40); $pdf->Cell(18, 8, 'Origen:', 0, 'L');
$pdf->SetXY(15,40); $pdf->Cell(15, 8,substr($_GET['pdforigen'],12) , 0, 'L' );

$pdf->SetXY(2, 43); $pdf->Cell(18, 8, 'Beneficiario:', 0, 'L');
$pdf->SetXY(17,46); $pdf->MultiCell(70, 3, $_GET['pdfenombresb'], 0, 'L');

$pdf->SetXY(2, 49); $pdf->Cell(18, 8, 'Remitente:', 0, 'L');
$pdf->SetXY(15,52); $pdf->MultiCell(70, 3, $_GET['pdfenombresr'] , 0, 'L');
//========================================================================
//$pdf->SetXY(2, 56); 
$pdf->Line(2, 58, 72, 58);
//========================================================================
$pdf->SetFont('Arial','B', 10);    
$pdf->SetXY(2, 58);
    $pdf->Cell(18, 8, 'Importe: S/. ', 0, 'L');
    $pdf->Cell(18, 8, $_GET['pdfeimporte_r'], 0, 1, 'C');    

//========================================================================
$pdf->Line(2, 66, 72, 66);
//=================== Pie de pagina ======================================
$pdf->SetFont('Arial','', 8);
$pdf->SetXY(2, 69); $pdf->Cell(15, 8, 'Atendido por:', 0, 'R');  
$pdf->SetXY(20, 69); $pdf->Cell(15, 8, $_GET['pdfnick'], 0, 'L');

$pdf->SetXY(2, 72); $pdf->Cell(15, 8, 'Fecha: ', 0, 'R'); 
$pdf->SetXY(15, 72); $pdf->Cell(15, 8, $fecha_hora, 0, 'R'); 

//$pdf->SetFont('Arial','', 8);
$pdf->SetXY(2, 75); $pdf->Cell(15, 8, '==========================================', 0, 'C'); 
$pdf->SetXY(2, 81); $pdf->MultiCell(74, 3, 'Tenemos 18 Locales para atenderlo.', 0, 'C'); 
$pdf->SetXY(2, 84); $pdf->MultiCell(74, 3, 'Todas tus operaciones en un solo lugar.', 0, 'C'); 
$pdf->SetXY(2, 87); $pdf->MultiCell(74, 3, utf8_decode('Envia tu dinero con rapidez... Con MoneyFlash podras tomar el control de tus envios a todo el Perú.'), 0, 'C');
$pdf->SetXY(2, 90); $pdf->Cell(15, 8, '==========================================', 0, 'C'); 
/* ============================================================================
=============================================================================== */    
$pdf->SetFont('Arial','b', 8);
$pdf->SetXY(2, 95); $pdf->MultiCell(74, 3, 'www.moneyflash.com.pe', 0, 'C');


/* ------------------------------------------------------------------------     
 */                
$pdf->Output(); //Salida al navegador
