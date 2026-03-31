<?php
date_default_timezone_set("America/Lima");
session_start();
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Supervisa</title>

    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css" />
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css" />
    <link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'>
    <link rel="stylesheet" type="text/css" href="css/simple-sidebar.css">
    <link rel="stylesheet" type="text/css" href="css/css_tools.css" />

    <link rel="stylesheet" type='text/css' href="css/css_girosxcliente.css">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

    <style type="text/css">
        th {
            padding: 5px;
            background: #555;
            color: #fff
        }

        td {
            padding: 5px;
            border: solid #ddd;
            border-width: 0 0 1px;
        }

        .editable span {
            display: block;
        }

        .editable span:hover {
            background: url(img/edit.png) 90% 50% no-repeat;
            cursor: pointer
        }

        td input {
            height: 24px;
            width: 200px;
            border: 1px solid #ddd;
            padding: 0 5px;
            margin: 0;
            border-radius: 6px;
            vertical-align: middle
        }

        a.enlace {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin: 0 0 0 5px;
            overflow: hidden;
            text-indent: -999em;
            vertical-align: middle
        }

        .guardar {
            background: url(img/save.png) 0 0 no-repeat
        }

        .cancelar {
            background: url(img/cancel.png) 0 0 no-repeat
        }

        /*.anular{background:url(img/eliminar.png) 0 0 no-repeat}	*/
        .mensaje {
            display: block;
            text-align: center;
            margin: 0 0 20px 0
        }

        .ok {
            display: block;
            padding: 10px;
            text-align: center;
            background: green;
            color: #fff
        }

        .ko {
            display: block;
            padding: 10px;
            text-align: center;
            background: red;
            color: #fff
        }
    </style>
</head>

<body>
    <div id="wrapper">
        <?php include("menu.php"); ?>

        <div id="page-content-wrapper">
            <!--FORMULARIO-->
            <a href="#menu-toggle" class="blue btn btn-default btn-xs" id="menu-toggle" title="Menu Lateral">Menu</a>
            <div id="formulario" class="container-fluid">

                <div class="col-xs-6 col-sm-4">
                    <div class="input-group input-group-sm">
                        <input type="text" id="txtnick" class="form-control" value="<?php echo $_SESSION['nick'] ?>" readonly="readonly">
                        <input type="text" id="txtsucursal" class="form-control" value="<?php echo $_SESSION['sucursal'] ?>" readonly="readonly">
                    </div>

                    <div class="input-group input-group-sm ">
                        <input type="text" onkeyup="javascript:this.value = this.value.toUpperCase();" class="form-control" id="txt_buscacli" placeholder="Buscar...">
                        <span class="input-group-btn">
                            <select id="sele_buscar" class="btn btn-default ">
                                <option value="D">DNI </option>
                                <option value="A">Apellido </option>
                            </select>
                        </span>
                    </div>
                    <input type="text" id="fechai" value="<?php echo date("Y/m/d"); ?>">
                    <input type="text" id="fechaf" value="<?php echo date("Y/m/d"); ?>">
                    <button id="btn_buscar" type="button" class="btn btn-default btn-xs blue" title="Buscar Giros de Cliente">Buscar</button>
                    <button id="btn_masdatos" type="button" class="btn btn-default btn-xs blue" title="Mas Datos del Giro">MasDatos</button>
                    <button id="btn_imprimir" type="button" class="btn btn-default btn-xs blue fa fa-print fa-lg" title="Imprimir"></button>
                    <!--                <button id="btn_editar" type="button" class="btn btn-default btn-xs blue" title="Editar Transaccion Seleccionada" >Editar Giro</button>-->
                    <div id="carga"> </div>
                </div>

                <div class="col-xs-6 col-sm-4">
                    <div id="divclientes" class="input-group input-group-sm">
                        <div class="table-responsive mygrid-wrapper-divc">
                            <table id="TClientes" class="table-condensed table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Itm</th>
                                        <th>DNI</th>
                                        <th>Nombres</th>
                                    </tr>
                                </thead>
                                <tbody id="body_TClientes">

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            <!--TABLA-->
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="table-responsive mygrid-wrapper-div">
                            <table id="TMovsCliente" class="editinplace table table-condensed table-bordered">
                                <thead>
                                    <tr>
                                        <th>Itm</th>
                                        <th style='display: none'> corre</th>
                                        <th style='display: none'> codgiro</th>
                                        <th> Vchr</th>
                                        <th> Fecha</th>
                                        <th> Origen</th>
                                        <th> DNI-R</th>
                                        <th> Remitente</th>
                                        <th> Destino</th>
                                        <th> DNI-B</th>
                                        <th> Beneficiario</th>
                                        <th align='right'> Importe</th>
                                        <th align='right'> Cargo</th>
                                        <th align='right'> Otros</th>
                                        <th align='right'> Total</th>
                                        <th style='display: none'> Ciudad Destino</th>
                                        <th style='display: none'> Observa</th>
                                        <th style='display: none'> NroCuenta</th>
                                        <th> NroOperacion</th>
                                        <th> DatosPago</th>
                                        <th style='display: none'> Registra</th>
                                        <th> Fecha Entrega</th>
                                        <th> Entrega</th>
                                        <th style='display: none'> A</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody_MovsCliente">

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th style='display: none'></th>
                                        <th style='display: none'></th>
                                        <th> </th>
                                        <th> </th>
                                        <th> </th>
                                        <th> </th>
                                        <th> </th>
                                        <th> </th>
                                        <th> Totales</th>
                                        <th id="total_i"> </th>
                                        <th id="total_c"> </th>
                                        <th id="total_o"> </th>
                                        <th id="total_t"> </th>
                                        <th style='display: none'> </th>
                                        <th style='display: none'> </th>
                                        <th style='display: none'> </th>
                                        <th> </th>
                                        <th> </th>
                                        <th style='display: none'> </th>
                                        <th> </th>
                                        <th> </th>
                                        <th> </th>
                                        <th style='display: none'> </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                    </div> <!-- col-lg-12 -->
                </div> <!-- ROW -->
            </div>

            <!--DIALOGO-->
            <div id="dialogo_masdatos">
                <div class="table-responsive">
                    <table id="tabla_adicional" class="table table-condensed table-bordered">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Ciudad-Destino</th>
                                <th>Observacion</th>
                                <th>Nro.Cuenta</th>
                                <th>Nro.Operacion</th>
                                <th>DatosPago</th>
                                <th>Registra</th>
                            </tr>
                        </thead>
                        <tbody id="tbody_adicional">
                            <td id="correlativo"> </td>
                            <td id="destino"> </td>
                            <td id="observa"> </td>
                            <td id="nrocuenta"> </td>
                            <td id="nrooperacion"> </td>
                            <td id="datapago"> </td>
                            <td id="registra"> </td>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="dialogo_CargaImagen">
                <input type="hidden" id="correlativo_img" readonly="readonly">
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">CODIGO</span>
                    <input type="text" class="form-control" id="codgirosucu_img" readonly="readonly">
                </div>
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Descripcion</span>
                    <input type="text" class="form-control" id="descripcion_img" onkeyup='javascript:this.value = this.value.toUpperCase();'>
                </div>
                <div id="fileuploader">Upload</div>
                <div class="form-group">
                    <button type="button" id="btn_guarda_voucher" class="btn btn-success">Guardar BOUCHER</button>
                </div>

            </div>

            <div id="dialogo_voucher_imge" title="Boucher">
                <div id="voucher_imge" class="printableArea">
                    <img src="php/uploads/juancho411.jpg" id="imagen" />
                </div>
                <button type="button" id="btn_imprime_voucher" class="btn btn-default btn-xs blue">Imprimir Boucher</button>
            </div>


            <input type="hidden" id="sele_c" value="c[0]">
            <input type="hidden" id="sele_mv" value="mv[0]">
            <input type="hidden" id="tipo_usuario" value="<?php echo $_SESSION['tipousuario'] ?>">
            <input type="hidden" id="usuariosistema" value="<?php echo $_SESSION['nick'] ?>">
            <input type="hidden" id="nombresucursal" value="<?php echo $_SESSION['sucursal'] ?>">
            <input type="hidden" id="cod_sucuo">
            <input type="hidden" id="cod_sucud">
            <input type="hidden" id="dni_r">
            <input type="hidden" id="dni_b">
            <input type="hidden" id="sele_as">
            <input type="hidden" id="idgiro">
            <input type="hidden" id="codgirosucu">
        </div>
        <!-- page contett -->
    </div>
    <!--end wrapper-->
    <?php include("acreditacion.php"); ?>


    <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.10.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" language="javascript" src="js/jquery.metisMenu.js"></script>
    <script type="text/javascript" language="javascript" src="js/custom.js"></script>
    <script type="text/javascript" language="javascript" src="js/funcionesAcredita.js"></script>

    <script type="text/javascript" src="js/FuncionesGirosxCliente.js"></script>
    <script type="text/javascript" src="js/jquery.alerts.mod.js"></script>
    <script type="text/javascript" src="js/validacampos.js"></script>
    <script type="text/javascript" src="js/CierraSesionInactivo.js"></script>
    <script type="text/javascript" language="javascript" src="js/jquery.uploadfile.js"></script>
    <script type="text/javascript" language="javascript" src="js/jquery.PrintArea.js"></script>
</body>

</html>