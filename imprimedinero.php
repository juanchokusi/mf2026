<?php


// Enviaremos un PDF
header('Content-type: application/pdf');
// Se va a llamar descarga.pdf
header('Content-Disposition: attachment; filename="KardexDinero.pdf"');

header("Pragma: no-cache");
header("Expires: 0");

echo $_POST['datos_a_enviar'];

// La fuente del PDF se encuentra en original.pdf
//readfile('original.pdf');
