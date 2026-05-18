<!-- Sidebar for Form -->

<div id="sidebar">
  <h4 class="mt-4">Precuadre</h4>
  <div class="table-responsive">
    <table id="tabla_precuadre" class="table table-striped table-bordered user-table table-sm table-condensed">
      <thead>
        <tr>
          <th style='display: none'>nrocuenta</th>
          <th style='display: none'>fecha</th>
          <th style='display: none'>idtipotransaccion</th>
          <th>Descripcion</th>
          <th style='display: none'>tdinero</th>
          <th style='display: none'>editable</th>
          <th style='display: none'>idusuario</th>
          <th class="text-end">Ingreso</th>
          <th class="text-end">Salida</th>
          <th class="text-end">INGRESO</th>
          <th class="text-end">SALIDA</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody id="tbody_precuadre">

      </tbody>
    </table>
  </div>
  <br>
  <div class="form-container">
    <form id="userForm">

      <div id="div_combobox_sideform" class="input-group input-group-sm ">
        <span class="input-group-addon">Tipo Transaccion</span>
        <select class=" form-control input-sm" id="lista_sideform">
          <?php echo $optsideform ?>
        </select>
      </div>
      <div id="div_descripcion_sideform" class="input-group input-group-sm">
        <span class="input-group-addon">Descripcion</span>
        <input type="text" class="form-control" id="descripcion_sideform" readonly>
      </div>
      <div id="div_monto_sideform" class="input-group input-group-sm">
        <span class="input-group-addon">Monto</span>
        <input type="text" class="form-control" id="monto_sideform">
      </div>
      <button type="button" class="btn btn-info" id="btn_sideform_nuevo">Nuevo</button>
      <button type="button" class="btn btn-success" id="btn_sideform_guardar">Guardar</button>
      <button type="button" class="btn btn-danger" id="btn_sideform_cancelar">Cancelar</button>
    </form>
  </div>

</div>