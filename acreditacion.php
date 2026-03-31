
<input type="hidden" id="sele_f" value="G[0]">

  <input type="hidden" id="codsucu" value=<?php echo $codsucu ?>>
  <input type="hidden" id="nusuario" value=<?php echo $usuamodi ?>>
  <!-======================================================================->
    <div class container id="dialogo_acreditado" title="Codigos Acreditados">
      <div class="input-group input-group-sm">
        <select class=" form-control input-sm" id="lista_sucursales1"> <?php echo $optsucursales ?> </select>
      </div>
      <div class="input-group input-group-sm">
        <select class=" form-control input-sm" id="lista_usuarios"> <?php echo $optusuarios ?> </select>
      </div>
      <select id="select_minutos" class="form-control">
        <option value=10 selected>10 mnts</option>
        <option value=20>20 mnts</option>
        <option value=30>30 mnts</option>
        <option value=45>45 mnts</option>
        <option value=60>60 mnts</option>
      </select>
      <div class="input-group input-group-sm">
        <input type="text" id="txt_codigo_acredita" class="form-control" readonly value="00000" style="font-size: x-large; text-align: center">
        <input type="hidden" id="idusuario">
        <div class="btn-group">
          <button type="button" id="btn_generacodigo" class="btn btn-danger">Genera Codigo</button>
          <button type="button" class="btn btn-default">-</button>
          <button type="button" id="btn_asignacodigo" class="btn btn-success">Asigna Codigo</button>
        </div>
      </div>
    </div>






