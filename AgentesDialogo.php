<div id="dialogo_cuentas">
  <div class="table-responsive">
    <table id="tabla_usuariocuenta" class="table table-condensed table-bordered">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Banco</th>
          <th>NroCuenta</th>
        </tr>
      </thead>
      <tbody id="tbody_usuarioucenta">

      </tbody>
    </table>
  </div>
</div>

<div id="dialogo_voucher_imge" title="Boucher">
  <div id="voucher_imge" class="printableArea">
    <img src="php/uploads/juancho411.jpg" id="imagen" />
  </div>
  <button type="button" id="btn_imprime_voucher" class="btn btn-default btn-xs blue">Imprimir Boucher</button>
</div>

<div id="DialogoCargaImagen_VSA">
  <input type="hidden" id="correlativo_img" readonly="readonly">
  <div class="input-group input-group-sm">
    <span class="input-group-addon">CODIGO</span>
    <input type="text" class="form-control" id="cod_img" readonly="readonly">
  </div>
  <div class="input-group input-group-sm">
    <span class="input-group-addon">Descripcion</span>
    <input type="text" class="form-control" id="descripcion_img" onkeyup='javascript:this.value = this.value.toUpperCase();'>
  </div>
  <div id="fileuploader">Cargar</div>
  <div class="form-group">
    <br>
    <button type="button" id="btnGuardaVoucher_VSA" class="btn btn-success">Guardar</button>
  </div>
</div>

<div id="dialogoMuestraImagen_vsa" title="Boucher">
  <div id="voucher_vsa" class="printableArea">
    <img src="php/uploads_vsa/juancho411.jpg" id="imagen" />
  </div>
  <button type="button" id="btn_imprime_vsa" class="btn btn-success">Imprimir </button>
  <button type="button" id="btn_elimina_vsa" class="btn btn-danger">Eliminar </button>
</div>

<div id="gallery"></div>

<!-- ============== caragar imagenes ============================== -->
<div id="imageModal" title="Carga y Visualización de Imágenes" style="display:none;">
  <div class="input-group">
    <input type="file" id="fileInput" accept="image/*">
    <input type="hidden" id="newFileName" placeholder="Nuevo nombre de archivo">
    <button id="uploadBtn">Cargar imagen</button>
  </div>
  <div id="uploadPreview"></div>
</div>

<div id="imageModal_View" title="Visualización de Imágenes" style="display:none;">
  <div class="input-group">
    <!--         <input type="text" id="searchFileName" placeholder="Buscar imagen por nombre">
        <button id="searchBtn">Buscar</button> -->
  </div>
  <div id="imagePreview" class="printableArea"></div>
</div>
<!-- /*========================================================== -->

<div id="dialogo_metasxagente" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
        <h4 class="modal-title">Nro de Operaciones - Metas</h4>
      </div>
      <div class="modal-body">
        <div class="table-responsive">
          <table id='tabla_metasxagente' class="table  table-bordered table-condensed">
            <thead>
              <tr>
                <th style='display: none'>id</th>
                <th>Fech Inicio</th>
                <th>Fech Fin</th>
                <th>META</th>
                <th>NroOps</th>
                <th>Diferencia</th>
                <th>estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="tbody_metasxagente">

            </tbody>
          </table>
        </div>
//**  Saludos */
        <div id="div_txt_metas" style="display:none;">
          <div class="input-group input-group-sm" style="display: flex; margin-bottom: 2px;">
            <label style="flex: 1; margin: 0; padding: 2px; text-align: center; background: #f8f9fa; border: 1px solid #ddd;">F. Inicio</label>
            <label style="flex: 1; margin: 0; padding: 2px; text-align: center; background: #f8f9fa; border: 1px solid #ddd;">F. Final</label>
            <label style="flex: 1; margin: 0; padding: 2px; text-align: center; background: #f8f9fa; border: 1px solid #ddd;">Meta</label>
          </div>
          <div class="input-group " style="display: flex;">
            <input type="date" id="diag_fechai" class="form-control">
            <input type="date" id="diag_fechaf" class="form-control">
            <input type="text" id="diag_txt_meta" class="form-control" maxlength="10" style="text-align: center;" pattern="\d*" inputmode="numeric" oninput="this.value = this.value.replace(/\D/g, '')">
          </div>
        </div>

        <div class="form-group" style="display: flex; gap: 5px;">
          <button type="button" id="btn_diag_cerrar" class="btn btn-info btn-xs">Cerrar Meta</button>
          <button type="button" id="btn_diag_nuevo" class="btn btn-primary btn-xs">Nuevo</button>
          <button type="button" id="btn_diag_guardar" class="btn btn-success btn-xs">Guardar</button>
          <button type="button" id="btn_diag_cancelar" class="btn btn-warning btn-xs" data-dismiss="modal">Cancelar</button>
        </div>

      </div>
    </div>
  </div>
</div>

<input type="hidden" id="sele_cu" value="cu[0]">
<input type="hidden" id="sele_mv" value="mv[0]">
<input type="hidden" id="sele_meta" value="mt[0]">
<input type="hidden" id="sele_pc" value="pc[0]">
<input type="hidden" id="nro_cuenta">
<input type="hidden" id="nro_cuentadest">
<input type="hidden" id="tipotran">
<input type="hidden" id="ingsal">
<input type="hidden" id="idtran">
<input type="hidden" id="tipo_usuario" value="<?php echo $_SESSION['tipousuario'] ?>">
<input type="hidden" id="usuariosistema" value="<?php echo $_SESSION['nick'] ?>">
<input type="hidden" id="codsucursal" value="<?php echo $_SESSION['codsucursal'] ?>">
<input type="hidden" id="idempresa" value="<?php echo $_SESSION['idempresa'] ?>">
<input type="hidden" id="nombre_usuario" value="<?php echo $_SESSION['usuario'] ?>">
<input type="hidden" id="idusuario" value="<?php echo $_SESSION['idusuario'] ?>">
<input type="hidden" id="token" value="<?php echo $_SESSION['mitoken'] ?>">
<input type="hidden" id="opver" value="mas">
<input type="hidden" id="iniciales">
<input type="hidden" id="idbanco">
<input type="hidden" id="tipodinero"> <!-- recoge tipo de operacion y dinero -->
<input type="hidden" id="idtransaccion">
<input type="hidden" id="motivo">
<input type="hidden" id="ingreso">
<input type="hidden" id="salida">
<input type="hidden" id="ingresosalida"><!-- para el prompt -->
<input type="hidden" id="montoanula"> <!-- anular -->
<input type="hidden" id="tipomov"> <!-- anular -->
<input type="hidden" id="idtipotran"> <!-- anular -->
<input type="hidden" id="nrocuenta_destino">
<input type="hidden" id="iniciales_destino">
<input type="hidden" id="agente_origen">
<input type="hidden" id="fecha_tran">
<input type="hidden" id="nombre_agente">
<input type="hidden" id="id_vsa">
<input type="hidden" id="nombre_archivo">
<input type="hidden" id="server_date">
<input type="hidden" id="meta_fechai">
<input type="hidden" id="meta_fechaf">
<input type="hidden" id="meta_opcion">
<input type="hidden" id="idmeta">
<input type="hidden" id="meta_estado">
<input type="hidden" id="idtipotransaccion"> <!-- para el precuadre -->
<input type="hidden" id="descripcion_precuadre"> <!-- para el precuadre --> 
<input type="hidden" id="tipo_dinero_pc"> <!-- para el precuadre --> 
<input type="hidden" id="ingsal_pc"> <!-- para el precuadre --> 
<input type="hidden" id="ingreso_precuadre"> <!-- para el precuadre --> 
<input type="hidden" id="salida_precuadre"> <!-- para el precuadre --> 
<input type="hidden" id="editar"> <!-- para el precuadre --> 
