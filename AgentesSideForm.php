    
        <!-- Sidebar -->    
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <!--<a id="datoagente" href="#"></a>-->
                    <input type="text" id="datoagente" readonly="readolnly">
                </li>
                <!--<li>
                    <a href="#">Dashboard</a>
                </li> -->
                <div class="input-group input-group-sm">
                    <input type="text" id="txtnick" class="form-control" value="<?php echo $_SESSION['nick']?>" readonly="readonly" >
                    <input type="text" id="txtsucursal" class="form-control" value="<?php echo $_SESSION['sucursal']?>" readonly="readonly">
                </div>
                <select class="form-control input-sm"   id="listabancos"><?php echo $optbancos; ?>     </select>
                <div id="divimagen"  > 
                    <img src="" class="img-responsive" id="myimage" >
                </div>
                <div class="input-group input-group-sm">
                    <input type="text" class="form-control" id="datos_cuenta" readonly="readonly" >
                    <span class="input-group-btn"><a href="#" id="btn_nuevo" class=" btn btn-default glyphicon glyphicon-plus blue" title="Nuevo"></a></span>
                    <span class="input-group-btn"><a href="#" id="btn_cancelar" class=" btn btn-default glyphicon glyphicon-remove blue" title="Cancelar"></a></span>
                    <span class="input-group-btn"><a href="#" id="btn_guardar" class=" btn btn-default glyphicon glyphicon-floppy-disk blue" title="Guardar"></a></span>                    
                </div>

                <select class="form-control input-sm " id="listatipotran"> <?php echo $opttipotrans; ?>  </select>
                
             <div id="divmovis" >
                <div id="div_ctadestino" class=" input-group input-group-sm">
                    <input type="text" class=" form-control" id="cta_destino" placeholder="Cuenta Destino">
                    <span class="input-group-btn"><a href="#" id="btn_usuariocuenta" class=" btn btn-default glyphicon glyphicon-th-list blue" title="Cuentas de Asociado"></a></span>
                </div>
                
                <div id="divmonto" class="input-group input-group-sm">
                    <span class="input-group-addon">Monto</span>
                    <input type="text" class=" form-control" id="monto" placeholder=" S/. 00.00"  >
                </div>
                
                <div  class="input-group input-group-sm">                    
                    <span class="input-group-btn"><a id="spannro_operacion" class=" btn btn-default">Nro OP</a></span>
                    <input type="text" class=" form-control" id="nro_operacion" placeholder="Nro. Operación" onkeyup="javascript:this.value = this.value.toUpperCase();" >
                    
                </div>
                    <select class=" form-control input-sm"   id="listasucursal"> <?php echo $optsucursales; ?>  </select>
                
                    <select class=" form-control input-sm"   id="listausuarios"> <?php echo $optusuarios; ?>  </select>
          
                <div  class="input-group input-group-sm ">                    
                    <span class="input-group-btn"><a id="spannromovs" class=" btn btn-default">NroMovs</a></span>
                    <input type="text" class=" form-control" id="nromovs" value="0" >
                </div>
                <div id="divobservacion" class="input-group input-group-sm">
                    <span class="input-group-addon">MasDatos</span>
                    <input type="text" class=" form-control" id="observacion" placeholder="Datos Adicionales" onkeyup="javascript:this.value = this.value.toUpperCase();">
                </div>
                
                    
            </div>            
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->
