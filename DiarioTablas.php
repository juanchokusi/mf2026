<div class="rowt">
  <!--///////////////////////// INGRESOS /////////////////////////////////-->
  <div class="col-50 form-group">
    <!--  <div class="col-xs-6 col-sm-6 form-group input-group-sm"> -->
    <!-- ======= botones ======= -->
    <div id="div_btns_ingreso" class="form-box">
      <button type="button" id="nuevo_ing" onclick="ActivaControles('I');" class="btn btn-default btn-xs blue" title="Nuevo Ingreso">
        <span class="glyphicon glyphicon-plus"></span>
      </button>
      <button type="button" id="inserta_ing" class="btn btn-default btn-xs blue">
        <span class="glyphicon glyphicon-floppy-disk"></span>
      </button>
      <button type="button" id="btn_cancelaing" class="btn btn-default btn-xs blue" title="Cancelar">
        <span class="glyphicon glyphicon-remove-circle"></span>
      </button>
      <button type="button" id="imprime_ing" class="btn btn-default btn-xs blue" title="Imprimir Ingreso">
        <span class="glyphicon glyphicon-print"></span>
      </button>
      <button type="button" id="btn_distribucion" class="btn btn-default btn-xs blue" title="Distribución de Efectivo">
        <span class="fa fa-exchange fa-lg"></span>
      </button>
      <button type="button" id="btn_carga_reciboI" class="btn btn-success btn-xs" title="Carga Recibo">
        <span class="glyphicon glyphicon-picture"></span>
      </button>
      <button type="button" id="btn_elimina_ingresos" class="btn btn-danger btn-xs" title="Eliminar Mov">
        <span class="glyphicon glyphicon-remove"></span>
      </button>
    </div>
    <!-- ======= inputs ======= -->
    <div id="div_txt_ingreso" class="form-box">
      <div id="divconcepto" class="input-group input-group-sm">
        <span class="input-group-addon">Concepto</span>
        <select class=" form-control input-sm" id="lista_conceptos_ing">
          <?php echo $conceptos_i ?>
        </select>
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-addon">Mas Datos</span>
        <input type="text" class="form-control" id="masdatos_ing" onkeyup='javascript:this.value = this.value.toUpperCase();'>
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-addon">Responsable</span>
        <input type="text" class="form-control " id="responsable_ing" onkeyup='javascript:this.value = this.value.toUpperCase();'>
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-addon">Monto S/.</span>
        <input type="text" class="form-control " id="ingreso" value="0" onfocus="if (this.value >= '0') {this.value = '';}">
      </div>
    </div>
    <!-- ======= tabla ======= -->
    <div class="table-container ">
      <div class="table-scroll">
        <table id="IngresosDet" class="table-condensed ">
          <thead>
            <tr>
              <th></th>
              <th class="ocultame">id Detalle</th>
              <th class="ocultame">idconcepto</th>
              <th>Concepto (Acerca de los Ing.)</th>
              <th class="ocultame">extradata</th>
              <th>Respo.</th>
              <th>Usuario</th>
              <th>Ingreso</th>
              <th class="ocultame">recibo</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th></th>
              <th class="ocultame"></th>
              <th class="ocultame"></th>
              <th></th>
              <th class="ocultame"></th>
              <th></th>
              <th>TOTAL</th>
              <th id="total_i"></th>
              <th class="ocultame">recibo</th>
            </tr>
          </tfoot>
          <tbody id="body_ingresos">
          </tbody>
        </table>
      </div>
    </div>

  </div> <!-- === col-50 === -->
  <!--///////////////////////// SALIDA /////////////////////////////////-->

  <div class="col-50">
    <div id="div_btns_egreso" class="form-box ">
      <button type="button" id="nuevo_eg" onclick="ActivaControles('E');" class="btn btn-default btn-xs blue" title="Nueva Salida">
        <span class="glyphicon glyphicon-plus"></span>
      </button>
      <button type="button" id="inserta_eg" class="btn btn-default btn-xs blue">
        <span class="glyphicon glyphicon-floppy-disk"></span>
      </button>
      <button type="button" id="btn_cancelaeg" class="btn btn-default btn-xs blue" title="Cancelar">
        <span class="glyphicon glyphicon-remove-circle"></span>
      </button>
      <button type="button" id="imprime_eg" class="btn btn-default btn-xs blue" title="Imprimir Egreso">
        <span class="glyphicon glyphicon-print"></span>
      </button>
      <button type="button" id="btn_carga_reciboS" class="btn btn-success btn-xs" title="Carga Recibo">
        <span class="glyphicon glyphicon-picture"></span>
      </button>
      <button type="button" id="btn_anula_egresos" class="btn btn-danger btn-xs" title="Anular Egreso">
        <span class="glyphicon glyphicon-remove"></span>
      </button>
    </div>
    <div id="div_txt_egreso" class="form-box ">
      <div id="divconcepto" class="input-group input-group-sm">
        <span class="input-group-addon">Concepto</span>
        <!--<input type="text" class="form-control" id="concepto_eg"  onkeyup='javascript:this.value = this.value.toUpperCase();'>-->
        <select class=" form-control input-sm" id="lista_conceptos">
          <?php echo $conceptos_e ?>
        </select>
      </div>
      <div id="div_sucursales" class="input-group input-group-sm ">
        <span class="input-group-addon">Destino</span>
        <select class=" form-control input-sm" id="lista_sucursales">
          <?php echo $optsucursales ?>
        </select>
      </div>
      <div id="div_asociado" class="input-group input-group-sm">
        <span class="input-group-addon">Asociado</span>
        <input type="text" class="form-control" id="txt_asociado">
      </div>
      <div id="div_agente" class="input-group input-group-sm">
        <span class="input-group-addon">Agente</span>
        <input type="text" class="form-control" id="txt_agente">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-addon">Mas Datos</span>
        <input type="text" class="form-control" id="masdatos_eg" onkeyup='javascript:this.value = this.value.toUpperCase();'>
      </div>
      <div id="div_responsable_eg" class="input-group input-group-sm">
        <span class="input-group-addon">Responsable</span>
        <input type="text" class="form-control " id="responsable_eg" onkeyup='javascript:this.value = this.value.toUpperCase();'>
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-addon">Monto S/.</span>
        <input type="text" class="form-control " id="egreso" value="0" onfocus="if (this.value >= '0') { this.value = ''; }">
      </div>
    </div>
    <div class="table-container ">
      <div class="table-scroll">
        <table id="EgresosDet" class="table-condensed">
          <thead>
            <tr>
              <th></th>
              <th class="ocultame">id Detalle</th>
              <th class="ocultame">idconcepto</th>
              <th>Concepto (Acerca de las Salidas)</th>
              <th class="ocultame"> ExtraData</th>
              <th>Respo.</th>
              <th>Usuario</th>
              <th>Salida</th>
              <th class="ocultame">recibo</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th></th>
              <th class="ocultame"></th>
              <th class="ocultame"></th>
              <th></th>
              <th class="ocultame"> </th>
              <th></th>
              <th>TOTAL</th>
              <th id="total_e"> </th>
              <th class="ocultame">recibo</th>
            </tr>
          </tfoot>
          <tbody id="body_egresos">
          </tbody>
        </table>
      </div>
    </div>
  </div>

</div> <!-- ==== row ====> -->

<div id="carga" style="display:none"> <img src="img/cargando.gif"> </div>
<div id="carga2" style="display:none"> <img src="img/loading_bar.gif"> </div>
<!--TABLA PRINCIPAL-->
<div class="rowt">
  <div class="col-100">
    <div class="table-container">
      <div id="divtabla" class="table-responsive ">
        <table id="transferencias" class=" table-condensed table-striped ">
          <thead>
            <tr>
              <th>Nro </th>
              <th>Codigo </th>
              <th>Destino </th>
              <th>Fecha Registro </th>
              <th>Fecha Entrega </th>
              <th>Beneficiario </th>
              <th>Remitente </th>
              <th>Entrega Entrega </th>
              <th>Recepcion Recepcion </th>
              <th>Pendiente Pendiente </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th id="total_en"></th>
              <th id="total_re"></th>
              <th id="total_pe"></th>
            </tr>
          </tfoot>

          <tbody id="body_giros">

          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

</div>