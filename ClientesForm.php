<div class="container-fluid">
    <div class="col-xs-6 col-sm-4">
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
    </div>    
    <div class="col-xs-6 col-sm-4">
        <div class="input-group input-group-sm">                        
            <input type="text" class="form-control" id="direccion_c" onkeyup='javascript:this.value = this.value.toUpperCase();' placeholder="Direccion">
            <input type="text" class="form-control" id="telefono_c" onkeyup='javascript:this.value = this.value.toUpperCase();'  placeholder="Telefonos">
            <input type="text" class="form-control" id="email_c"  onkeyup='javascript:this.value = this.value.toUpperCase();'     placeholder="e-mail">
        </div>
    </div>    
    <div class="col-xs-6 col-sm-4">
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
</div>

</div>