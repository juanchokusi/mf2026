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
//Crear nuevo pdf 
$pdf = new PDF('P','mm',array(72,120));
$pdf->AddPage();
$pdf->SetFont('Courier','B', 12);
//Logo
/* $pdf->SetXY(20, 1);
    $pdf->Image($el_logo1, 5, 2, 62, 25, 'JPG');
 */
$pdf->SetXY(2, 5);
$pdf->SetTextColor(255);  $pdf->MultiCell(68, 4,'RECIBO CONTROL INTERNO', 0, 'C',true);

$pdf->SetFont('Arial','B', 8);
$pdf->SetTextColor(0);
$pdf->SetXY(2, 9); $pdf->MultiCell(68, 4, 'RECEPCION', 0, 'C');
//================================================================================
$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2,13);  $pdf->Cell(18, 8, 'Numero :', 0, 'L');
$pdf->SetXY(15,13); $pdf->Cell(15, 8, $row_giro["cod_girosucu"], 0, 'L');

$pdf->SetXY(2,16);  $pdf->Cell(18, 8, 'Fecha   :', 0, 'L');
$pdf->SetXY(15,16); $pdf->Cell(15, 8, $row_giro["fechahora_registro"] , 0, 'L');

$pdf->SetXY(2, 19); $pdf->Cell(18, 8, 'Remite  :', 0, 'L');
$pdf->SetXY(15, 19); $pdf->Cell(15, 8, $row_giro["remitente"] , 0, 'L');

$pdf->SetXY(2,22);  $pdf->Cell(18, 8, 'Destino :', 0, 'L');
$pdf->SetXY(15,25); $pdf->MultiCell(58, 3, $row_giro["ciudad_destino"], 0, 'L');

$pdf->SetXY(2,28);  $pdf->Cell(18, 8, 'Otros   :', 0, 'L');
$pdf->SetXY(15,28); $pdf->Cell(15, 8, $row_giro["nro_boleta"] , 0, 'L');

$pdf->SetXY(2, 31); $pdf->Cell(18, 8, 'Benefi. :', 0, 'L');
$pdf->SetXY(15,31);  $pdf->Cell(15, 8, $row_giro["beneficiario"], 0, 'L');
//========================================================================
$pdf->SetXY(2, 60); $pdf->Line(2, 40, 68, 40);
//========================================================================
$pdf->SetFont('Arial','B', 8);
$pdf->SetXY(2, 40);
    $pdf->Cell(18, 8, 'Importe: S/. ', 0, 'L');
    $pdf->Cell(35, -8, $row_giro["importe_giro"], 0, 1, 'R');    
 
/* $pdf->SetXY(2, 63);
    $pdf->Cell(18, 8, 'Cargo:', 0, 'L');
    $pdf->Cell(20, 8, $row_giro["cargo_giro"], 0, 1, 'R');
    
$pdf->SetXY(2, 66);
    $pdf->Cell(18, 8, 'Otros:', 0, 'L');
    $pdf->Cell(20, 8, $row_giro["otros"] , 0, 1,'R');

$pdf->SetFont('Arial','B', 10);
$pdf->SetXY(2, 70);
    $pdf->Cell(18, 8, 'Total: S/.', 0, 'L');
    $pdf->Cell(20, 8, $row_giro["total"], 0, 1,'R'); */
//========================================================================
//$pdf->SetXY(2, 70); 
$pdf->Line(2, 48, 68, 48);
//========================================================================
$importe = $row_giro["importe_giro"];
$letras = numletras($importe,1);

$pdf->SetFont('Arial','I', 6);
$pdf->SetXY(2, 47); $pdf->Cell(15, 8, 'Son: ' , 0, 'R'); 
$pdf->SetXY(7, 47); $pdf->Cell(15, 8, $letras , 0, 'R'); 

$pdf->SetFont('Arial','', 8);
$pdf->SetXY(2, 67);  $pdf->Cell(2, 5, '-------------------------', 0, 'R');
$pdf->SetXY(2, 70);  $pdf->Cell(2, 5, 'FIRMA CLIENTE', 0, 'R');
//$pdf->SetXY(2, 100);  $pdf->Line(2, 90, 27, 90);  $pdf->Cell(2, 5, 'FIRMA CLIENTE', 0, 'R');
$pdf->SetXY(40, 67);  $pdf->Cell(2, 5, '-------------------------', 0, 'R');
$pdf->SetXY(40, 70);  $pdf->Cell(2, 5, 'HUELLA DIGITAL', 0, 'C');

$pdf->SetFont('Arial','', 7);
$pdf->SetXY(2, 73); $pdf->Cell(15, 8, "D.N.I. :", 0, 'R');

//=================== Pie de pagina ======================================
$pdf->SetXY(2, 80); $pdf->Cell(15, 8, 'Atendido por:', 0, 'R');  
$pdf->SetXY(20, 80); $pdf->Cell(15, 8, $_GET['nick'], 0, 'L');

$pdf->SetXY(2, 83); $pdf->Cell(15, 8, 'Fecha: ', 0, 'R'); 
$pdf->SetXY(15, 83); $pdf->Cell(15, 8, $fecha_hora, 0, 'R');

$pdf->SetFont('Arial','', 6);
$pdf->SetXY(2, 86); $pdf->Cell(15, 8, 'Registrado: ', 0, 'R'); 
$pdf->SetXY(15, 86); $pdf->Cell(15, 8, $row_giro["usuario_registra"], 0, 'R');
$pdf->SetXY(2, 88); $pdf->Cell(15, 8, 'Entregado: ', 0, 'R'); 
$pdf->SetXY(15, 88); $pdf->Cell(15, 8, $row_giro["usuario_entrega"], 0, 'R');


$pdf->Output(); //Salida al navegador

