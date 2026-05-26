<div id="contiene-formulario" class="container-fluid">

   <div id="formulario_agente" class="row">
      <div class="col-xs-6 col-sm-4">
         <div class="input-group input-group-sm" style="margin-bottom: 2px;">
            <input type="text" id="txtnick" class="form-control" value="<?php echo $_SESSION['nick'] ?>"
               readonly="readonly">
            <input type="text" id="txtsucursal" class="form-control" value="<?php echo $_SESSION['sucursal'] ?>"
               readonly="readonly">
         </div>

         <div class="btn-group btn-group-sm">
            <button id="btn_meta" type="button" class="btn btn-info">Meta <span id="spn_meta" class="badge">0</span></button>
            <button type="button" class="btn btn-success">Movs <span id="spn_nroops" class="badge">0</span></button>
            <button type="button" class="btn btn-warning">Falta <span id="spn_diferencia" class="badge">0</span></button>
         </div>
      </div>

      <div class="col-xs-6 col-sm-4">

         <div class="form-group combobox-container">
            <!-- <div class="input-group">
               <select id="listabancos" class="combobox form-control" data-result="ciudades-result">
                  <?php /* echo $optbancos; */ ?>
               </select>
               <span class="input-group-btn">
                  <button class="btn btn-default dropdown-toggle" type="button">
                     <span class="caret"></span>
                  </button>
               </span>
            </div> -->
            <select class=" form-control input-sm ocultame" id="listabancos"> <?php echo $optbancos ?> </select>
         </div>

         <div class="input-group input-group-sm">
            <input type="text" class="form-control" id="datos_cuenta" readonly="readonly">
            <span class="input-group-btn"><a href="#" id="btn_nuevo"
                  class=" btn btn-default glyphicon glyphicon-plus blue" title="Nuevo"></a></span>
            <span class="input-group-btn"><a href="#" id="btn_cancelar"
                  class=" btn btn-default glyphicon glyphicon-remove blue" title="Cancelar"></a></span>
            <span class="input-group-btn"><a href="#" id="btn_guardar"
                  class=" btn btn-default glyphicon glyphicon-floppy-disk blue" title="Guardar"></a></span>
         </div>

         <div id="div_listatipotran" class="form-group ">
            <!-- <div class="input-group">
               <select id="listatipotran" class="combobox form-control" data-result="ciudades-result">
                  <?php /* echo $opttipotrans;  */?>
               </select>
               <span class="input-group-btn">
                  <button class="btn btn-default dropdown-toggle" type="button">
                     <span class="caret"></span>
                  </button>
               </span>
            </div> -->
            <select class=" form-control input-sm ocultame" id="listatipotran"> <?php echo $opttipotrans ?> </select>
         </div>

         <!-- ================= fin div ============================ -->
      </div>

      <div class="col-xs-6 col-sm-4">
         <div id="divmovis">
            <div id="div_listaagentes" class="form-group combobox-container">
               <!--<div class="input-group">
                   <select id="listaagentes" class="combobox form-control" data-result="ciudades-result">
                     <?php /* echo $optbancos; */ ?>
                  </select>
                  <span class="input-group-btn">
                     <button class="btn btn-default dropdown-toggle" type="button">
                        <span class="caret"></span>
                     </button>
                  </span>
               </div> -->
               <select class=" form-control input-sm ocultame" id="listaagentes"> <?php echo $optbancos ?> </select>
            </div>

            <div id="div_ctadestino" class=" input-group input-group-sm">
               <input type="text" class=" form-control" id="cta_destino" placeholder="Cuenta Destino">
               <span class="input-group-btn"><a href="#" id="btn_usuariocuenta"
                     class=" btn btn-default glyphicon glyphicon-th-list blue" title="Cuentas de Asociado"></a></span>
            </div>
            <div id="divmonto" class="input-group input-group-sm">
               <span class="input-group-addon">Monto</span>
               <input type="text" class=" form-control" id="monto" placeholder=" S/. 00.00">
            </div>
            <div class="input-group input-group-sm">
               <span class="input-group-btn"><a id="spannro_operacion" class=" btn btn-default">Nro OP</a></span>
               <input type="text" class=" form-control" id="nro_operacion" placeholder="Nro. Operación"
                  onkeyup="javascript:this.value = this.value.toUpperCase();">
            </div>

            <div id="div_listasucursal" class="form-group combobox-container">
               <!-- <div class="input-group">
                  <select id="listasucursal" class="combobox form-control" data-result="ciudades-result">
                     <?php /* echo $optsucursales; */ ?>
                  </select>
                  <span class="input-group-btn">
                     <button class="btn btn-default dropdown-toggle" type="button">
                        <span class="caret"></span>
                     </button>
                  </span>
               </div> -->
               <select class=" form-control input-sm ocultame" id="listasucursal"> <?php echo $opt_sucursales ?> </select>
            </div>

            <div id="div_listausuarios" class="form-group combobox-container">
               <!-- <div class="input-group">
                  <select id="listausuarios" class="combobox form-control" data-result="ciudades-result">
                     <?php /* echo $optusuarios;  */?>
                  </select>
                  <span class="input-group-btn">
                     <button class="btn btn-default dropdown-toggle" type="button">
                        <span class="caret"></span>
                     </button>
                  </span>
               </div> -->
               <select class=" form-control input-sm ocultame" id="listausuarios"> <?php echo $optusuarios ?> </select>
            </div>

            <div class="input-group input-group-sm ">
               <span class="input-group-btn"><a id="spannromovs" class=" btn btn-default">NroMovs</a></span>
               <input type="text" class=" form-control" id="nromovs" value="0">
            </div>

            <div id="divobservacion" class="input-group input-group-sm">
               <span class="input-group-addon">MasDatos</span>
               <input type="text" class=" form-control" id="observacion" placeholder="Datos Adicionales"
                  onkeyup="javascript:this.value = this.value.toUpperCase();">
            </div>
         </div>
      </div>
   </div>
</div>