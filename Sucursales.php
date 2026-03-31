<?php
date_default_timezone_set("America/Lima");
//require_once("controles/classRecibeEntrega.php");
session_start();
$Fechahora = date("Y-m-d H:i:s");
$FechaHoy = date("Y-m-d");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Sucursales</title>
        
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">                        
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css"/>  
    <link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'>    
    <link rel="stylesheet" type="text/css" href="css/simple-sidebar.css">
    <link rel="stylesheet" type="text/css" href="css/css_sucursales.css">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
        
    <style type="text/css">
        /*//#contiene_tabla{font-family:sans-serif;font-size:12px}*/
        /*//table {width:100%;box-shadow:0 0 10px #ddd;text-align:left}*/
        th {padding:5px;background:#555;color:#fff}
        td {padding:5px;border:solid #ddd;border-width:0 0 1px;}
        .editable span{display:block;}
        .editable span:hover {background:url(img/edit.png) 90% 50% no-repeat;cursor:pointer}
        td input{height:24px;width:200px;border:1px solid #ddd;padding:0 5px;margin:0;border-radius:6px;vertical-align:middle}
        a.enlace{display:inline-block;width:24px;height:24px;margin:0 0 0 5px;overflow:hidden;text-indent:-999em;vertical-align:middle}
        .guardar{background:url(img/save.png) 0 0 no-repeat}
        .cancelar{background:url(img/cancel.png) 0 0 no-repeat}
        .mensaje{display:block;text-align:center;margin:0 0 20px 0}
        .ok{display:block;padding:10px;text-align:center;background:green;color:#fff}
        .ko{display:block;padding:10px;text-align:center;background:red;color:#fff}
        .ocultame {display: none}
        .ocultamee {display: none}
    </style>
</head>    
<body>
    <div id="wrapper">
        <!-- Sidebar -->
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#">Sucursales</a>
                </li>
                <!--<li>
                    <a href="#">Dashboard</a>
                </li> -->
                <div class="input-group input-group-sm">                                                
                    <input type="text" class="form-control" id="nombre" onkeyup='javascript:this.value = this.value.toUpperCase();' placeholder="Nombre" >
                    <input type="text" class="form-control" id="codigo" maxlength="3" onkeyup='javascript:this.value = this.value.toUpperCase();' placeholder="Codigo">                            
                    <input type="text" class="form-control" id="direccion" onkeyup='javascript:this.value = this.value.toUpperCase();' placeholder="Direccion">
                    
                </div>
		<div class="input-group input-group-sm">                                            
                    <input type="text" class="form-control" id="telefono" onkeyup='javascript:this.value = this.value.toUpperCase();'  placeholder="Telefonos">
                    <input type="text" class="form-control" id="email"  onkeyup='javascript:this.value = this.value.toUpperCase();'     placeholder="e-mail">

                    <button type="button" id="btn_nuevo"    class="btn btn-default btn-xs blue">Nuevo</button>
                    <button type="button" id="btn_guardar"  class="btn btn-default btn-xs blue">Guardar</button>
                    <button type="button" id="btn_cancelar" class="btn btn-default btn-xs blue">Cancelar</button>                    
                    
                    <div class="input-group input-group-sm ">
                        <input type="text" style="text-transform:uppercase" class="form-control" id="buscador" placeholder="Buscar...">                        
                    </div>            
                </div>    
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="mensaje"></div>
            <!--<div class="container-fluid">-->
                <div class="row">
                    <div class="col-lg-12">                        
                        <a href="#menu-toggle" class="btn btn-default btn-xs blue" id="menu-toggle" title="Oculta Barra Lateral">Menu</a>                        
                        <div id="contiene_tabla" class="table-responsive mygrid-wrapper-div">
                            <table id="tabla_sucursales" class="editinplace table-condensed">
                                <thead >
                                    
                                </thead>
                                <tbody>
                    
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
            <!--</div>-->
        </div> <!-- /#page-content-wrapper -->
        <input type="hidden" id="nick" value="<?php echo $_SESSION['nick'] ?>" >  
        <input type="hidden" id="tipo_usuario" value="<?php echo $_SESSION['tipousuario'] ?>" >  
        <input type="hidden" id="opproceso" value="L">
        <input type="hidden" id="idsucu" >
        <input type="hidden" id="hid_idcliente" >
        <input type="hidden" id="opver" value="mas">
        <input type="hidden" id="sele" name="sele" value="S" >
        <input type="hidden" id="sele_as" value="b[1]"> <!-- como bandera al seleccionar filas -->
        <input type="hidden" id="sele_asc" value="[0]"> 
    </div>
    <!-- /#wrapper -->                 
        
    <!-- jQuery -->
            
    <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.10.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    
    <script type="text/javascript" src="js/jquery.alerts.mod.js"></script>
    <script type="text/javascript" src="js/FuncionesSucursales.js"></script>
    <script type="text/javascript" src="js/validacampos.js"></script>   
   <script type="text/javascript" src="js/CierraSesionInactivo.js"></script>
</body>

</html>
