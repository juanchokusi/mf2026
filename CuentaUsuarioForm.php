<div id="formulario" class="row">
  <div class="col-xs-6 col-sm-4">
    <div class="input-group input-group-sm">
      <input type="text" class="form-control" id="datos_cuenta" readonly="readonly">
      <span class="input-group-btn">
        <a href="#" id="btn_anula_cuenta" class="btn btn-default blue glyphicon glyphicon-ban-circle " title="Listar..."></a>
      </span>
    </div>
    <div class="input-group input-group-sm">
      <select class="form-control input-sm" id="listatipotran"> <?php echo $opciones; ?> </select>
      <span class="input-group-btn">
        <a href="#" id="btn_nuevatran" class="btn btn-default glyphicon glyphicon-plus blue" title="Nuevo"></a>
      </span>
    </div>
    <div id="div_listasucursales" class="input-group input-group-sm" style="display: none">
      <select class="form-control input-sm" id="listasucursales"> <?php echo $opt_sucursales2; ?> </select>
      <span class="input-group-btn">
        <a href="#" id="btn_nuevatran__" class="btn btn-default glyphicon glyphicon-option-vertical blue" title="Lista Sucursales"></a>
      </span>
    </div>
    <div id="div_datos_cuenta_d" class="input-group input-group-sm ">
      <input type="text" id="datos_cuenta_d" class="form-control" placeholder="Cuenta destino" readonly="readonly">
      <span class="input-group-btn">
        <a href="#" id="btn_muestra_asociados" class="btn btn-default fa fa-list-alt blue" title="Muestra Asociados"></a>
      </span>
    </div>

    <div class="input-group input-group-sm ">
      <input type="text" class="form-control" id="monto" placeholder="S/. 00.00">
      <span class="input-group-btn">
        <a href="#" id="btn_guardatran" class="btn btn-default glyphicon glyphicon-floppy-disk blue" title="Guardar"></a>
      </span>
    </div>
    <div class="input-group input-group-sm ">
      <input type="text" id="observa" onkeyup='javascript:this.value = this.value.toUpperCase();' class="form-control" placeholder="Muestra Asociados">
      <span class="input-group-btn">
        <a href="#" id="btn_muestratabla__" class="btn btn-default glyphicon glyphicon-indent-left " title="Muestra Usuarios"></a>
      </span>
    </div>
    <div class="input-group input-group-sm" style="display: none">
      <input type="text" id="buscacuentausuario" style="text-transform: uppercase" class="form-control" placeholder="Buscar cuenta de usuario">
      <span class="input-group-btn">
        <a href="#" id="btn_buscacuentausuario" class="btn btn-default glyphicon glyphicon-search blue" title="Buscar Cuenta de USUARIO"></a>
      </span>
    </div>
  </div>

  <div class="col-xs-6 col-sm-4">
    <div id="DivUsuarioCuenta" style=" display: block;">
      <div class="table-responsive mygrid-wrapper-div1">
        <table id="TUsuarioCuenta" class="table table-condensed table-bordered">
          <thead>
            <tr>
              <!--<th>Nro</th> -->
              <th>Usuario</th>
              <th>Banco</th>
              <th>NroCuenta</th>
            </tr>
          </thead>
          <tbody id="tbody_UsuarioCuenta">

          </tbody>
        </table>
      </div>
    </div>
  </div>

</div>

<!-- ============== caragar imagenes ============================== -->
<div id="imageModal" title="Carga y Visualización de Imágenes" style="display:none;">
  <div class="input-group">
    <!-- <input type="file" id="fileInput" accept="image/*">
    <input type="hidden" id="newFileName" placeholder="Nuevo nombre de archivo">
    <button id="uploadBtn">Cargar imagen</button> -->
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
<!-- /* =================================================================== */ -->
<div id="imageModal_vsc" title="Carga y Visualización de Imágenes" style="display:none;">
  <div class="input-group">
    <input type="file" id="fileInput" accept="image/*">
    <input type="hidden" id="newFileName" placeholder="Nuevo nombre de archivo">
    <button id="uploadBtn">Cargar imagen</button>
  </div>
  <div id="uploadPreview_vsc"></div>
</div>

<div id="imageModal_View_vsc" title="Visualización de VSC" style="display:none;">
  <div class="input-group">
    <!--         <input type="text" id="searchFileName" placeholder="Buscar imagen por nombre">
        <button id="searchBtn">Buscar</button> -->
  </div>
  <div id="imagePreview_vsc" class="printableArea"></div>
</div>
<!-- /*========================================================== -->