<?php
//date_default_timezone_set("America/Lima");
//require_once("controles/classRecibeEntrega.php");
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

    <title>Clientes</title>
        
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">                        
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css"/>  
    <link rel='stylesheet' type='text/css' href='css/jquery.alerts.css'>    
    <link rel="stylesheet" type="text/css" href="css/simple-sidebar.css">
    <link rel="stylesheet" type="text/css" href="css/css_clientes.css">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
        
    <style type="text/css">
        
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
                    <a href="#">Clientes</a>
                </li>
                <!--<li>
                    <a href="#">Dashboard</a>
                </li> -->
                <div class="input-group input-group-sm"> 
                    <span class="input-group-addon">DNI</span>
                    <input type="text" class="form-control" id="dni_c" onkeyup='javascript:this.value = this.value.toUpperCase();' maxlength="8" >        
                </div>    
                <div class="input-group input-group-sm">
                    <span class="input-group-addon">Nombres</span>
                    <input type="text" class="form-control" id="nombres_c" onkeyup='javascript:this.value = this.value.toUpperCase();' >
                </div>    
                <div class="input-group input-group-sm"> 
                    <span class="input-group-addon">Apellidos</span>
                    <input type="text" class="form-control" id="apellidos_c" onkeyup='javascript:this.value = this.value.toUpperCase();'>
                </div>    
                
		<div class="input-group input-group-sm">                        
                    <input type="text" class="form-control" id="direccion_c" onkeyup='javascript:this.value = this.value.toUpperCase();' placeholder="Direccion">
                    <input type="text" class="form-control" id="telefono_c" onkeyup='javascript:this.value = this.value.toUpperCase();'  placeholder="Telefonos">
                    <input type="text" class="form-control" id="email_c"  onkeyup='javascript:this.value = this.value.toUpperCase();'     placeholder="e-mail">

                    <button type="button" id="nuevo"        onclick="ControlesNuevo();"   class="btn btn-default btn-xs blue">Nuevo</button>
                    <button type="button" id="btn_guardar"  class="btn btn-default btn-xs blue">Guardar</button>
                    <button type="button" id="cancelar"     onclick="CotrolesCancelar();" class="btn btn-default btn-xs blue">Cancelar</button>
                    <button type="button" id="btn_cuentas" title="Asigna Nro de Cuenta a Clientes" class="btn btn-default btn-xs blue">CUENTAS</button>
                    <button type="button" id="mas_informacion" title="Mas Informacion" class="btn btn-default btn-xs glyphicon glyphicon-plus blue"> </button>
                    
                    <div class="input-group input-group-sm ">
                        <input type="text" style="text-transform:uppercase" class="form-control" id="busca_cli" placeholder="Buscar...">
                        <span class="input-group-btn">          
                        <select id="optBusca"  class="btn btn-default"> <option value="A">Apellido </option> <option value="D">DNI </option> </select>
                        </span>      
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
                        <a href="#menu-toggle" class="btn btn-default btn-xs blue" id="menu-toggle"  title="Oculta Barra Lateral">Menu</a>
                        
                        <div id="contiene_tabla" class="table-responsive mygrid-wrapper-div">
                        <table id="tabla_clientes" class="editinplace table-condensed">
                            <tr >
                                <th>Itm</th>
                                <th class="ocultamee" >ID</th>
                                <th>D.N.I.</th>
                                <th>Apellidos</th>
                                <th>Nombres</th>
                                <th>Direccion</th>
                                <th>Telefono</th>
                                <th>e-mail</th>
                                <th class="ocultame" >Usuario</th>
                                <th class="ocultame" >Fecha</th>
                            </tr>
                        </table>
                        </div>
                    </div>
            </div>
            <!--</div>-->
        </div> <!-- /#page-content-wrapper -->
        <input type="hidden" id="nick" value="<?php echo $_SESSION['nick'] ?>" >  
        <input type="hidden" id="tipo_usuario" value="<?php echo $_SESSION['tipousuario'] ?>" >  
        <input type="hidden" id="opproceso" value="L">
        <input type="hidden" id="hid_idbanco" >
        <input type="hidden" id="hid_idcliente" >
        <input type="hidden" id="opver" value="mas">
        <input type="hidden" id="sele" name="sele" value="S" >
        <input type="hidden" id="sele_as" value="b[0]"> <!-- como bandera al seleccionar filas -->
        <input type="hidden" id="sele_asc" value="[0]"> 
    </div>
    <!-- /#wrapper -->       
        
        <div id="dialogo_asigcuenta" title="Asigna Cuentas a Clientes"  >             
            <div class="input-group-sm">    
                <input type="text" id="txt_datoscliente" readonly="readonly" />     
                <!--Autocompleta -->
                <input type="text" id="txt_bancos" style="text-transform:uppercase"  placeholder="Bancos" /> 
                <input type="text" id="txt_nrocuenta" onkeyup='javascript:this.value = this.value.toUpperCase();' placeholder="Nro. de Cuenta" />
            </div>    
            <div class="input-group-sm">    
                <button type="button" id="btn_asignacuenta"  title="Guardar" class="btn btn-default btn-xs">
                    <span class="glyphicon glyphicon-floppy-disk blue"></span>
                </button>
                <button type="button" id="btn_nuevacuenta"  title="Nueva Cuenta" class="btn btn-default btn-xs">
                    <span class="glyphicon glyphicon-file blue"></span>
                </button>
                <button type="button" id="btn_eliminacuenta"  title="Eliminar Cuenta" class="btn btn-default btn-xs">
                    <span class="glyphicon glyphicon-remove blue"></span>
                </button>
            </div>    
            <div class="table-responsive" > 
                <table id="tabla_cuentas" class="table table-condensed ">
                    <thead>
                        <tr>
                            <th>Nro. </th>
                            <th>Nro. Cuenta</th>
                            <th>Banco</th>                    

                        </tr>
                    </thead>
                    <tbody id="tbody_cuentas" >

                    </tbody>
                </table>

            </div>
        </div>        
        
    <!-- jQuery -->
            
    <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.10.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>

    <script type="text/javascript" src="js/FuncionesClientes.js"></script>    
    <script type="text/javascript" src="js/jquery.alerts.mod.js"></script>
    <script type="text/javascript" src="js/validacampos.js"></script>   
   <script type="text/javascript" src="js/CierraSesionInactivo.js"></script>
</body>

</html>
