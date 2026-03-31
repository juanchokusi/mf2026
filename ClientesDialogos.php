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
<input type="hidden" id="nick" value="<?php echo $_SESSION['nick'] ?>" >  
<input type="hidden" id="tipo_usuario" value="<?php echo $_SESSION['tipousuario'] ?>" >  
<input type="hidden" id="opproceso" value="L">
<input type="hidden" id="hid_idbanco" >
<input type="hidden" id="hid_idcliente" >
<input type="hidden" id="opver" value="mas">
<input type="hidden" id="sele" name="sele" value="S" >
<input type="hidden" id="sele_as" value="b[0]"> <!-- como bandera al seleccionar filas -->
<input type="hidden" id="sele_asc" value="[0]"> 