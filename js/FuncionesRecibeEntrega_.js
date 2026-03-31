function CalculaTotalesR() {
var sumai = 0;
var sumac = 0;
var sumao = 0;
var sumag = 0;
$('#TRecibidos tr.dato').each(function(){ //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas                                                                                                                                    
    sumai += parseFloat($(this).find('td').eq(5).text()||0,10); //numero de la celda 5*/
    sumac += parseFloat($(this).find('td').eq(6).text()||0,10); 
    sumao += parseFloat($(this).find('td').eq(7).text()||0,10); 
    sumag += parseFloat($(this).find('td').eq(8).text()||0,10); 
    if ($(this).find('td').eq(12).text() ==='Pendiente') { $(this).css('background', 'Pink')};
    if ($(this).find('td').eq(12).text() !=='Pendiente') { $(this).css('background', 'LightYellow')};
    if ($(this).find('td').eq(13).text() ==='S') { $(this).css('background', 'tomato')};        
})
$("#total_i").text(sumai.toFixed(2));
$("#total_c").text(sumac.toFixed(2));
$("#total_o").text(sumao.toFixed(2));
$("#total_g").text(sumag.toFixed(2));
}

function CalculaTotalesE() {
var sumai = 0;
$('#TEntregados tr.dato').each(function(){ //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas                                                                                                                                    
    sumai += parseFloat($(this).find('td').eq(7).text()||0,10); //numero de la celda 5*/

    if ($(this).find('td').eq(11).text() ==='Pendiente') { $(this).css('background', 'Pink')};
    if ($(this).find('td').eq(11).text() !=='Pendiente') { $(this).css('background', 'LightYellow')};
    if ($(this).find('td').eq(12).text() ==='S') { $(this).css('background', 'tomato')};        
})
//alert(suma);
$("#etotal_i").text(sumai.toFixed(2));
}

function calcula_cargo()
{
    var importe=parseFloat(document.getElementById("importe_r").value);
    var porcentaje=parseFloat(document.getElementById("listaporcentajes").value);
    cargo=importe*(porcentaje/100);
    document.getElementById("cargo_r").value = parseFloat(cargo).toFixed(2);
    document.getElementById("efectivo_r").focus();
}

function calcula_total(){ 

    var m1=0; var m2=0; var m3=0;
    m1 = parseFloat(document.getElementById("importe_r").value);
    m2 = parseFloat(document.getElementById("cargo_r").value);
    m3 = parseFloat(document.getElementById("otros_r").value);
    r = m1+m2+m3;
    document.getElementById("total_r").value = parseFloat(Math.round(r*100)/100).toFixed(2);    
    var igv=0;
    igv=parseFloat(document.getElementById("cargo_r").value);
    igv=igv-parseFloat(igv/1.18).toFixed(2);
    document.getElementById("igv_r").value = parseFloat(igv).toFixed(2);
    
}

function calcula_vuelto(){
        var efectivo=parseFloat(document.getElementById("efectivo_r").value);
        var total=parseFloat(document.getElementById("total_r").value);
        var vuelto=efectivo - total;
        document.getElementById("vuelto_r").value = parseFloat(Math.round(vuelto*100)/100).toFixed(2);   
}

function ecalcula_cargo()
{
    var importe=parseFloat(document.getElementById("eimporte_r").value);
    var porcentaje=parseFloat(document.getElementById("elistaporcentajes").value);
    cargo=importe*(porcentaje/100);
    document.getElementById("ecargo_r").value = parseFloat(cargo).toFixed(2);
    document.getElementById("ecargo_r").focus();
}

function ADecimal(){
    nimporte=document.getElementById("importe_r").value;
    document.getElementById("importe_r").value = parseFloat(Math.round(nimporte*100)/100).toFixed(2);  
    ncargo=document.getElementById("cargo_r").value;
    document.getElementById("cargo_r").value = parseFloat(Math.round(ncargo*100)/100).toFixed(2);  
    notros=document.getElementById("otros_r").value;
    document.getElementById("otros_r").value = parseFloat(Math.round(notros*100)/100).toFixed(2);  
}

function eADecimal(){
    nimporte=document.getElementById("eimporte_r").value;
    document.getElementById("eimporte_r").value = parseFloat(Math.round(nimporte*100)/100).toFixed(2);  
    ncargo=document.getElementById("ecargo_r").value;
    document.getElementById("ecargo_r").value = parseFloat(Math.round(ncargo*100)/100).toFixed(2);  
}

function RecuperaFilaB(idfilaB) 
{
  var elTableRow = document.getElementById(idfilaB);
  elTableRow.style.backgroundColor =(elTableRow.style.backgroundColor==="LightSkyBlue")?'white':'LightSkyBlue';
  if(elTableRow.style.backgroundColor === 'LightSkyBlue'){
    var elTableCells = elTableRow.getElementsByTagName("td");
        for (var i=0; i<elTableCells.length; i++) {          
          document.getElementById("dnib").value=elTableCells[0].innerHTML;     
          document.getElementById("nombresb").value=elTableCells[1].innerHTML;
          $('#otros').val(elTableCells[2].innerHTML);
        }
    }
    $(this).dialog('close');
  } 

function RecuperaFilaR(idfilaR) {
  var elTableRowR = document.getElementById(idfilaR);
  elTableRowR.style.backgroundColor =(elTableRowR.style.backgroundColor==="green")?'cyan':'green';
  if(elTableRowR.style.backgroundColor === 'green'){
    var elTableCellsR = elTableRowR.getElementsByTagName("td");
        for (var i=0; i<elTableCellsR.length; i++) {          
          document.getElementById("dnir").value=elTableCellsR[0].innerHTML;     
          document.getElementById("nombresr").value=elTableCellsR[1].innerHTML;
        }
    }
  } 

function RecuperaFilaS(idfilaS) {
  var elTableRow = document.getElementById(idfilaS);
  elTableRow.style.backgroundColor =(elTableRow.style.backgroundColor==="green")?'cyan':'green';
  if(elTableRow.style.backgroundColor === 'green'){
    var elTableCells = elTableRow.getElementsByTagName("td");
        for (var i=0; i<elTableCells.length; i++) {

          document.getElementById("cod_sucu").value=elTableCells[0].innerHTML;     
          document.getElementById("destino").value=elTableCells[1].innerHTML;
          if($('#codsucursal').val() === $('#cod_sucu').val()){
                    document.getElementById("cod_sucu").value="";     
                    document.getElementById("destino").value="";
                }
        }
    }
  }

function RecuperaClientesB()
{
 if ($('#dni_b').val()!=='' && +$('#dni_b').val().length >2){   
    $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {dni: $('#dni_b').val(), opt: $('#opciones_b').val()},
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    url: "controles/BuscaCliente.php",
    beforeSend: antesEnvio,
    success: CreaTablaB,
    timeout: 4000,
    error: errorEnvio
    });
} else { jAlert("Ingrese datos buscar", "Transferencias"); }
return false;
}

function RecuperaClientesBFast()
{
    if($('#dnib').val()!=='' && +$('#dnib').val().length >2){
        $.ajax({
        async: true,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {dni: $('#dnib').val(), opt:'A'},
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controles/BuscaCliente.php",
        beforeSend: antesEnvio,
        success: CreaTablaB,
        timeout: 4000,
        error: errorEnvio
        });
    } else { jAlert("Escriba datos a buscar", "Transferencias");}
return false;
}

function RecuperaClientesR()
{
if($('#dni_r').val()!==''  && +$('#dni_r').val().length >2){
        $.ajax({
        async: true,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {dni: $('#dni_r').val(), opt: $('#opciones_r').val()},
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controles/BuscaCliente.php",
        beforeSend: antesEnvio,
        success: CreaTablaR,
        timeout: 4000,
        error: errorEnvio
        });
    } else{  jAlert("Escriba datos a buscar", "Transferencias"); }    
return false;
}
function RecuperaClientesRFast() //Busca Rapida
{
    if($('#dnir').val()!=='' && +$('#dnir').val().length >2){
        $.ajax({
        async: true,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {dni: $('#dnir').val(), opt:'A'},
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controles/BuscaCliente.php",
        beforeSend: antesEnvio,
        success: CreaTablaR,
        timeout: 5000,
        error: errorEnvio
        });
    } else { jAlert("Escriba datos a buscar", "Transferencias");}    
return false;
}
function RecuperaSucursal()
{
    if($('#codsucu').val()!=='' && +$('#codsucu').val().length >2 ){
        $.ajax({
        async: true,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {codsucu: $('#codsucu').val()},
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controles/Busca_Sucursal.php",
        beforeSend: antesEnvio,
        success: CreaTablaS,
        //timeout: 4000,
        error: errorEnvio
        });
    } else { jAlert("Escriba datos a buscar", "Transferencias");}
return false;
}
function RecuperaSucursalFast()
{
    if($('#cod_sucu').val()!=='' && +$('#cod_sucu').val().length >2){
        $.ajax({
        async: true,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {codsucu: $('#cod_sucu').val()},
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controles/Busca_Sucursal.php",
        beforeSend: antesEnvio,
        success: CreaTablaS,
        //timeout: 4000,
        error: errorEnvio
        });
    } else { jAlert("Escriba datos a buscar", "Transferencias"); }    
return false;
}

function eRecuperaClientesB()
{
    if($('#edni_b').val()!=='' && +$('#edni_b').val().length >2){
        $.ajax({
        async: true,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {dni: $('#edni_b').val(), opt: $('#eopciones_b').val()},
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controles/BuscaCliente.php",
        beforeSend: antesEnvio,
        success: eCreaTablaB,
        timeout: 4000,
        error: errorEnvio
        });
    } else { jAlert("Escriba datos a buscar", "Transferencias"); }      
return false;
}
function eRecuperaClientesR()
{
    if($('#edni_r').val()!=='' && +$('#edni_r').val().length >2){
        $.ajax({
        async: true,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {dni: $('#edni_r').val(), opt: $('#eopciones_r').val()},
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controles/BuscaCliente.php",
        beforeSend: antesEnvio,
        success: eCreaTablaR,
        timeout: 4000,
        error: errorEnvio
        });
    } else { jAlert("Escriba datos a buscar", "Transferencias"); }        
return false;
}
function eRecuperaSucursal()
{
if($('#ecodsucu').val()!=='' && +$('#ecodsucu').val().length >2)
    {
            $.ajax({
            async: true,
            type: "POST",
            dataType: "json",
            cache: false,
            data: {codsucu: $('#ecodsucu').val()},
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            url: "controles/Busca_Sucursal.php",
            beforeSend: antesEnvio,
            success: eCreaTablaS,
            timeout: 4000,
            error: errorEnvio
            });
     } else { jAlert("Escriba datos a buscar", "Transferencias"); }      
return false;
}

function eRecuperaClientesBFast(){
if($('#ednib').val()!=='' && +$('#ednib').val().length >2)
    {    
            $.ajax({
            async: true,
            type: "POST",
            dataType: "json",
            cache: false,
            data: {dni: $('#ednib').val(), opt:'A' },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            url: "controles/BuscaCliente.php",
            beforeSend: antesEnvio,
            success: eCreaTablaB,
            timeout: 4000,
            error: errorEnvio
            });
     } else { jAlert("Escriba datos a buscar", "Transferencias"); }      
return false;
}

function eRecuperaClientesRFast(){
    if($('#ednir').val()!=='' && +$('#ednir').val().length >2){  
        $.ajax({
        async: true,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {dni: $('#ednir').val(), opt:'A'},
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controles/BuscaCliente.php",
        beforeSend: antesEnvio,
        success: eCreaTablaR,
        timeout: 4000,
        error: errorEnvio
        });
    } else { jAlert("Escriba datos a buscar", "Transferencias"); }              
return false;
}

function eRecuperaSucursalFast(){
if($('#ecod_sucu').val()!=='' && +$('#ecod_sucu').val().length >2){  
        $.ajax({
        async: true,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {codsucu: $('#ecod_sucu').val()},
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controles/Busca_Sucursal.php",
        beforeSend: antesEnvio,
        success: eCreaTablaS,
        timeout: 4000,
        error: errorEnvio
        });
    } else { jAlert("Escriba datos a buscar", "Transferencias"); }          
return false;
}
/* mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm*/
function limpia_tabla_b(){
var Table = document.getElementById("resultado_b");
Table.innerHTML = "";
}
function limpia_tabla_r(){
var Table = document.getElementById("resultado_r");
Table.innerHTML = "";
}
function limpia_tabla_s(){
var Table = document.getElementById("resultado_s");
Table.innerHTML = "";
}

function elimpia_tabla_b(){
var Table = document.getElementById("eresultado_b");
Table.innerHTML = "";
}
function elimpia_tabla_r(){
var Table = document.getElementById("eresultado_r");
Table.innerHTML = "";
}
function elimpia_tabla_s(){
var Table = document.getElementById("eresultado_s");
Table.innerHTML = "";
}
function limpia_tabla_clientes(){
var Table = document.getElementById("tabla_clientes");
Table.innerHTML = "";
}

function dialog_responsive()
{
      $("div").each(function(){
          if ($(this).attr("role") === "dialog"){
          
          $(this).css({width: "45%", minWidth: "250px", minHeight: "150px", left: "10px", top: "50px"});
          }
      });
  } /*END dialog_responsive*/

function antesEnvio() {
$("#log").text("Se procesa la función 'antesEnvio()' antes de enviarse los datos...");
}
// En caso de error
function errorEnvio() {
$("#log").text("Ha ocurrido un error!");
}
function ImprimeRecibidos(){
//var correla = parseInt(corr) ;
  $.ajax({
  async: true,
  type: "POST",
  dataType: "json",
  cache: false,
  data: {codsucu: $('#codsucu').val(),fecha: $('#fecha_r').val()},
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  url: "controles/Imprime_Recibidos.php",
  beforeSend: antesEnvio 
  });  
  return false;
}

function ImprimeEntregados(){
  $.ajax({
  async: true,
  type: "POST",
  dataType: "json",
  cache: false,
  data: {codsucu: $('#codsucu').val(),fecha: $('#fecha_r').val()},
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  url: "controles/Imprime_Entregados.php",
  beforeSend: antesEnvio
  });  
  //alert(corr);
return false;
}

function fnRegresa() {
    location.href = "#regresa";
}
function MuestraRecibidos(fecha_busqueda,opt)
{
  $.ajax({
  async: true,
  type: "POST",
  dataType: "json",
  cache: false,
  data: {codsucu:$("#codsucursal").val(),fecha:fecha_busqueda,opt:opt},  
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  url: "controles/BuscaRecibidos.php",  
  beforeSend:function(objeto){ $('#carga').css({display:'block'}); },
  success:  CreaTablaRecibidos(),
  complete:function(){$('#carga').css('display','none');}
  });
return false;
}

function MuestraEntregados(fecha_busqueda,opt)
{  
  $.ajax({
  async: true,
  type: "POST",
  dataType: "json",
  cache: false,
  data: {fecha: fecha_busqueda,opt:opt},  
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  url: "controles/BuscaRecibidos.php",
  
  beforeSend:function(objeto){ 
                $('#ecarga').css({display:'block'}); },
  success:  CreaTablaEntregados,
  
  complete:function(){$('#ecarga').css('display','none');}
  
  });
return false;
}

/* IIIIIIIIIIIIIIIIIII  INSERTAR RRRRRRRRRRRRRRRRRRRRRR */
function Inserta_Recibidos()
{            
    var codgiro       = 'pop';
    var fechagiro     = $("input#fecha_r").val();
    var fechahoragiro = $("input#fechahorahoy").val();
    var fechahoragiro1= $('#fecha_r').val()+' 10:10:10';
    var tipogiro      = 'G';   
    var origen        = $("input#codsucursal").val();
    var remitente     = $("input#dnir").val();
    var destino       = $("input#cod_sucu").val();
    var beneficiario  = $("input#dnib").val();
    var ciudestino    = $("input#destino").val();
    var importe       = parseFloat(document.getElementById('importe_r').value);
    var cargo         = parseFloat(document.getElementById('cargo_r').value); 
    var igv           = parseFloat(document.getElementById('igv_r').value);
    var itf           = '0';
    var otro          = parseFloat(document.getElementById('otros_r').value); 
    var total         = parseFloat(document.getElementById('total_r').value);
    var efectivo      = parseFloat(document.getElementById('efectivo_r').value);
    var estado        ='R';
    var obsdest       = $("input#lugdestino").val(); 
    var obsgiro       = $("input#otros").val();
    var codbanco      = '---';
    var codtcuenta    = '---';
    var nrocuenta     = $("input#lugdestino").val(); //$("input#otros").val();
    var nrooperacion  = $("input#otros").val(); 
    var nusuario      = $("input#nick").val(); 
    var userpc        = 'pctools365'; 
    var op            ='I';
    var usuario_sistema = "<?php echo $tipousuario?>";
//validando
if ($('#fechahoy').val() !== $('#fecha_r').val()) {
  if (usuario_sistema === 'ADMIN'){   
    jConfirm('Insertara una Transferencia con fecha : '+ $('#fecha_r').val() +'\n La fecha del sistema es : '+$('#fechahoy').val(), "Transferencias-Recibidos", function(r) {    
    if(r) {
        if (origen !== destino ) { 
            if (remitente.length === 0 || beneficiario.length === 0 || destino.length === 0 || importe === 0 || importe.length === 0 )  
            {   JAlert('Faltan datos verifique....',"Transferencias");
                return false;           
            } else {
                      $.ajax({
                      async: true,
                      type: "POST",
                      cache: false,
                      dataType: 'json',
                      data: {codgiro:codgiro, fechagiro:fechagiro, fechahoragiro:fechahoragiro1,tipogiro:tipogiro, origen:origen, remitente:remitente, destino:destino, beneficiario:beneficiario,
                      ciudestino:ciudestino, importe:importe, cargo:cargo, igv:igv, itf:itf, otro:otro, total:total, efectivo:efectivo, estado:estado, obsdest:obsdest, 
                      obsgiro:obsgiro, codbanco:codbanco, codtcuenta:codtcuenta, nrocuenta:nrocuenta, nrooperacion:nrooperacion, nusuario:nusuario, userpc:userpc, op:op},
                      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                      url: "controles/InsertaRecibidos2.php", 
                      beforeSend:function(objeto){ 
                                $('#carga1').css({display:'block'}); },
  
                      complete:function(){$('#carga1').css('display','none'); MuestraRecibidos($('#fechahoy').val(),$('#optbuscar').val());}
                    }).done(function(respuesta){
                                $("#codgirosucursal").val(respuesta.codgirosucu);                        
                    });
                    ValoresImpresion();
                    ControlesAlGuardar();
                    document.getElementById("imprimir_r").disabled=false;
                    return false;                               
            }
        }
        else { jAlert('Origen y destiino deberian ser diferentes...',"Transferencias"); }
    }//IF JCONFIRM
    }); // END jconfirm
  }else {jAlert("No tiene permiso para realizar este tipo de Transferencias \n Solicitelo a un Administrador", "Transferencias");}
}// validano fechas
else { 
    if (origen !== destino ) { 
        if (remitente.length === 0 || beneficiario.length === 0 || destino.length === 0 || importe === 0 || importe.length === 0 )  
        {   JAlert('Faltan datos verifique....',"Transferencias");
            return false;           
        } else {        
            $.ajax({
            async: true,
            type: "POST",
            cache: false,
            dataType: 'json',
            data: {codgiro:codgiro, fechagiro:fechagiro,fechahoragiro:fechahoragiro, tipogiro:tipogiro, origen:origen, remitente:remitente, destino:destino, beneficiario:beneficiario,
            ciudestino:ciudestino, importe:importe, cargo:cargo, igv:igv, itf:itf, otro:otro, total:total, efectivo:efectivo, estado:estado, obsdest:obsdest, 
            obsgiro:obsgiro, codbanco:codbanco, codtcuenta:codtcuenta, nrocuenta:nrocuenta, nrooperacion:nrooperacion, nusuario:nusuario, userpc:userpc, op:op},
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            url: "controles/InsertaRecibidos2.php", 
            beforeSend:function(objeto){ 
                $('#carga1').css({display:'block'}); },            
            complete:function(){$('#carga1').css('display','none'); MuestraRecibidos($('#fechahoy').val(),$('#optbuscar').val());}
            }).done(function(respuesta){
                $("#codgirosucursal").val(respuesta.codgirosucu);                        
            });
            ValoresImpresion();
            ControlesAlGuardar();
            document.getElementById("imprimir_r").disabled=false;
            return false;                               
            }
        }
        else { JAlert('Origen y destiino deberian ser diferentes...',"Transferencias"); }
    }    
}

function eInserta_Recibidos(){            
    var codgiro       = 'pop';
    var fechagiro     = $("input#fechahoy").val();
    var tipogiro      = 'G';   
    var origen        = $("input#ecod_sucu").val();
    var remitente     = $("input#ednir").val();
    var destino       = $("input#codsucursal").val();
    var beneficiario  = $("input#ednib").val();
    var ciudestino    = $("input#edestino").val();
    var importe       = parseFloat(document.getElementById('eimporte_r').value);
    var cargo         = parseFloat(document.getElementById('ecargo_r').value); 
    var igv           = '0'; /*parseFloat(document.getElementById('igv_r').value);*/
    var itf           = '0';
    var otro          = '0';/*parseFloat(document.getElementById('otros_r').value); */
    var total         = '0'; /*parseFloat(document.getElementById('etotal_r').value);*/
    var efectivo      = '0';/*parseFloat(document.getElementById('efectivo_r').value);*/
    var estado        ='R';
    var obsdest       = $("input#eotros").val(); 
    var obsgiro       = '---';
    var codbanco      = '---';
    var codtcuenta    = '---';
    var nrocuenta     = '---';
    var nrooperacion  = '---';    
    var nusuario      = $("input#nick").val(); 
    var userpc        = 'pctools365'; 
    var fechahora     = '<?php echo date("Y-m-d H:i:s");?>';
    var op            ='I';
   
//validando
if (origen !== destino ) { 
    if (remitente.length === 0 || beneficiario.length === 0 || destino.length === 0 || importe === 0 || importe.length === 0 )  
    {   JAlert('Faltan datos verifique....',"Transferencias");
        return false;           
    } else {
 //Construimos la variable que se guardará en el data del Ajax para pasar al archivo php que procesará los datos    
            $.ajax({
              async: true,
              type: "POST",
              dataType: 'json',
              cache: false,              
              data: {codgiro:codgiro, fechagiro:fechagiro, tipogiro:tipogiro, origen:origen, remitente:remitente, destino:destino, beneficiario:beneficiario,
              ciudestino:ciudestino, importe:importe, cargo:cargo, igv:igv, itf:itf, otro:otro, total:total, efectivo:efectivo, estado:estado, obsdest:obsdest, 
              obsgiro:obsgiro, codbanco:codbanco, codtcuenta:codtcuenta, nrocuenta:nrocuenta, nrooperacion:nrooperacion, nusuario:nusuario, userpc:userpc, op:op},
              contentType: "application/x-www-form-urlencoded; charset=UTF-8",
              url: "controles/InsertaRecibidos2.php",
              beforeSend:function(objeto){ 
                        $('#ecarga1').css({display:'block'}); },
              complete:function(){$('#ecarga1').css('display','none'); MuestraEntregados($('#fechahoy').val(),$('#optbuscar').val());}
            }).done(function(respuesta){
                        $("#ecodgirosucursal").val(respuesta.codgirosucu);                        
            });
            eValoresImpresion();
            eControlesAlGuardar();
            document.getElementById("eimprimir_r").disabled=true;
            return false;                               
    }
}else {
        JAlert('Origen y destiino deberian ser diferentes...',"Transferencias");
        return false;}
}

/* INSERTAINSERTAINSERTA-INSERTA-INSERTA INSERTA INSERTA INSERTA INSERTA INSERTA INSERTA INSERTA INSERTA */

function ControlesNuevo()
{    
document.getElementById("guardar").disabled=false;
document.getElementById("dnir").value='';
document.getElementById("dnib").value='';
document.getElementById("cod_sucu").value='';
document.getElementById("importe_r").value='0';
document.getElementById("cargo_r").value='0';
document.getElementById("igv_r").value='0';
document.getElementById("otros_r").value='0';
document.getElementById("total_r").value='0';
document.getElementById("efectivo_r").value='0';
document.getElementById("vuelto_r").value='0';
document.getElementById("otros").value='';
document.getElementById("lugdestino").value='';
document.getElementById("destino").value='';
document.getElementById("nuevo").disabled=true;
document.getElementById("nombresb").value='';
document.getElementById("nombresr").value='';

document.getElementById("dnir").disabled=false;
document.getElementById("dnib").disabled=false;
document.getElementById("cod_sucu").disabled=false;
document.getElementById("importe_r").disabled=false;
document.getElementById("cargo_r").disabled=false;
document.getElementById("otros_r").disabled=false;
document.getElementById("otros").disabled=false;
document.getElementById("lugdestino").disabled=false;
document.getElementById("destino").disabled=false;
document.getElementById("dnib").focus();
document.getElementById("imprimir_r").disabled=true;

document.getElementById("busca_beneficiario").disabled=false;
document.getElementById("busca_remitente").disabled=false;
document.getElementById("busca_sucursal").disabled=false;


}
function ControlesAlGuardar()
{
document.getElementById("guardar").disabled=true;
document.getElementById("anular").disabled=true;
document.getElementById("imprimir_r").disabled=false;
document.getElementById("nuevo").disabled=false;

document.getElementById("dnir").disabled=true;
document.getElementById("dnib").disabled=true;
document.getElementById("cod_sucu").disabled=true;
document.getElementById("importe_r").disabled=true;
document.getElementById("cargo_r").disabled=true;
document.getElementById("otros_r").disabled=true;
document.getElementById("otros").disabled=true;
document.getElementById("lugdestino").disabled=true;
document.getElementById("destino").disabled=true;
document.getElementById("busca_beneficiario").disabled=true;
document.getElementById("busca_remitente").disabled=true;
document.getElementById("busca_sucursal").disabled=true;

}

function ControlesCancelar(){
    ControlesNuevo();
    ControlesAlGuardar();
}

function eControlesNuevo()
{
document.getElementById("eguardar").disabled=false;
document.getElementById("ednir").value='';
document.getElementById("ednib").value='';
document.getElementById("ecod_sucu").value='';
document.getElementById("eimporte_r").value='0';
document.getElementById("ecargo_r").value='0';
document.getElementById("enombresb").value='';
document.getElementById("enombresr").value='';

document.getElementById("edestino").value='';
document.getElementById("enuevo").disabled=true;

document.getElementById("ednir").disabled=false;
document.getElementById("ednib").disabled=false;
document.getElementById("ecod_sucu").disabled=false;
document.getElementById("eimporte_r").disabled=false;
document.getElementById("ecargo_r").disabled=false;
document.getElementById("edestino").disabled=false;
document.getElementById("ednib").focus();
document.getElementById("eimprimir_r").disabled=true;

document.getElementById("ebusca_beneficiario").disabled=false;
document.getElementById("ebusca_remitente").disabled=false;
document.getElementById("ebusca_sucursal").disabled=false;
    
}
function eControlesAlGuardar()
{
document.getElementById("eguardar").disabled=true;
document.getElementById("eanular").disabled=true;
document.getElementById("eimprimir_r").disabled=false;
document.getElementById("ednir").value='';
document.getElementById("ednib").value='';
document.getElementById("ecod_sucu").value='';
document.getElementById("eimporte_r").value='0';
document.getElementById("ecargo_r").value='0';
document.getElementById("operacion").value='';
document.getElementById("edestino").value='';
document.getElementById("enuevo").disabled=false;

document.getElementById("ednir").disabled=true;
document.getElementById("ednib").disabled=true;
document.getElementById("ecod_sucu").disabled=true;
document.getElementById("eimporte_r").disabled=true;
document.getElementById("ecargo_r").disabled=true;
document.getElementById("operacion").disabled=true;
document.getElementById("edestino").disabled=true;

document.getElementById("ebusca_beneficiario").disabled=true;
document.getElementById("ebusca_remitente").disabled=true;
document.getElementById("ebusca_sucursal").disabled=true;

}
function eControlesCancelar(){
    eControlesNuevo();
    eControlesAlGuardar();
}
function ValoresImpresion(){
document.getElementById("pdfbeneficiario").value=document.getElementById("nombresb").value;
document.getElementById("pdfremitente").value=document.getElementById("nombresr").value;
document.getElementById("pdfimporte").value=document.getElementById("importe_r").value;        
document.getElementById("pdfcargo").value=document.getElementById("cargo_r").value;
document.getElementById("pdfotros").value=document.getElementById("otros_r").value;
document.getElementById("pdftotal").value=document.getElementById("total_r").value;
document.getElementById("pdfcoddestino").value=document.getElementById("cod_sucu").value;
document.getElementById("pdffecha").value=document.getElementById("fechahoy").value;
document.getElementById("pdfdestino").value=document.getElementById("destino").value;
}

function eValoresImpresion(){
document.getElementById("epdfbeneficiario").value=document.getElementById("enombresb").value;
document.getElementById("epdfremitente").value=document.getElementById("enombresr").value;
document.getElementById("epdfimporte").value=document.getElementById("eimporte_r").value; 
document.getElementById("epdforigen").value=document.getElementById("ecod_sucu").value;
document.getElementById("epdffecha").value=document.getElementById("fechahoy").value;
document.getElementById("epdfcoddestino").value=document.getElementById("codsucursal").value; /* sucursal al cual se logueo*/
}

function RecuperaFila(idfila) 
{
var elTableRow = document.getElementById(idfila);
var elTableCells = elTableRow.getElementsByTagName("td");
ControlesAlGuardar();
var idfila1=$('#sele_fr').val();
var elTableRow1 = document.getElementById(idfila1);
for (var i=0; i<elTableCells.length; i++) {
    var estado_r = elTableCells[12].innerHTML;
}
if(elTableRow1.style.backgroundColor !=='tomato'){
    if (estado_r !== 'Pendiente') {
        elTableRow.style.backgroundColor =(elTableRow.style.backgroundColor==="LightSkyBlue")?'LightYellow':'LightSkyBlue';  
        if (idfila1 !== idfila){ 
            elTableRow1.style.backgroundColor=(elTableRow.style.backgroundColor==="LightYellow")?'LightSkyBlue':'LightYellow';       
        }
    }
}    
    for (var i=0; i<elTableCells.length; i++) {          
            document.getElementById("pdffecha").value=elTableCells[1].innerHTML;
            document.getElementById("nombresb").value=elTableCells[2].innerHTML;
            document.getElementById("pdfbeneficiario").value=elTableCells[2].innerHTML;
            document.getElementById("nombresr").value=elTableCells[3].innerHTML;
            document.getElementById("pdfremitente").value=elTableCells[3].innerHTML;
            document.getElementById("importe_r").value=elTableCells[5].innerHTML;
            document.getElementById("pdfimporte").value=elTableCells[5].innerHTML;
            document.getElementById("cargo_r").value=elTableCells[6].innerHTML;
            document.getElementById("pdfcargo").value=elTableCells[6].innerHTML;
            document.getElementById("otros_r").value=elTableCells[7].innerHTML;
            document.getElementById("pdfotros").value=elTableCells[7].innerHTML;
            document.getElementById("total_r").value=elTableCells[8].innerHTML;
            document.getElementById("pdftotal").value=elTableCells[8].innerHTML;
            document.getElementById("lugdestino").value=elTableCells[10].innerHTML;
            document.getElementById("otros").value=elTableCells[9].innerHTML;
            var correla = elTableCells[14].innerHTML;
            document.getElementById("correlativo").value=correla.substring(3,8) ;
            document.getElementById("codgirosucursal").value=elTableCells[14].innerHTML;
            document.getElementById("cod_sucu").value=elTableCells[4].innerHTML;
            document.getElementById("pdfcoddestino").value=elTableCells[4].innerHTML;
            if (estado_r !== 'Pendiente') { document.getElementById("sele_fr").value =idfila; }
                
    }        
    document.getElementById("anular").disabled=false;
    document.getElementById("imprimir_r").disabled=false;  
}
var fecha_fila_sele;
function eRecuperaFila(eidfila) 
{    
var eelTableRow = document.getElementById(eidfila);
var eelTableCells = eelTableRow.getElementsByTagName("td");
var eidfila1=$('#sele_fe').val();
var eelTableRow1 = document.getElementById(eidfila1);
for (var i=0; i<eelTableCells.length; i++) {
    var estado_e = eelTableCells[11].innerHTML;
}
if((eelTableRow1.style.backgroundColor !=='LightYellow') && (eelTableRow1.style.backgroundColor !=='tomato')){
    if (estado_e === 'Pendiente') {
        eelTableRow.style.backgroundColor =(eelTableRow.style.backgroundColor === "LightSkyBlue")?'Pink':'LightSkyBlue';
        if (eidfila1 !== eidfila){ 
            eelTableRow1.style.backgroundColor=(eelTableRow.style.backgroundColor === "Pink")?'LightSkyBlue':'Pink';       
        }
    }
}    
    for (var i=0; i<eelTableCells.length; i++) {

          document.getElementById("ecodgirosucursal").value=eelTableCells[1].innerHTML;
          var correla = eelTableCells[1].innerHTML;
          document.getElementById("correlativo").value=correla.substring(3,8);
          var mifecha=eelTableCells[2].innerHTML;
          document.getElementById("epdffecha").value=mifecha.substring(0,10);
          document.getElementById("enombresb").value=eelTableCells[4].innerHTML;
          document.getElementById("epdfbeneficiario").value=eelTableCells[4].innerHTML;
          document.getElementById("enombresr").value=eelTableCells[6].innerHTML;
          document.getElementById("epdfremitente").value=eelTableCells[6].innerHTML;
          document.getElementById("eimporte_r").value=eelTableCells[7].innerHTML;
          document.getElementById("epdfimporte").value=eelTableCells[7].innerHTML;                    
          var Micodsucu = eelTableCells[1].innerHTML;
          document.getElementById("ecod_sucu").value=Micodsucu.substring(0,3);
          document.getElementById("epdfcodorigen").value=Micodsucu.substring(0,3);
          document.getElementById("operacion").value=eelTableCells[8].innerHTML;                    
          fecha_fila_sele=eelTableCells[11].innerHTML;
        }

        document.getElementById("eanular").disabled=false;
        document.getElementById("eimprimir_r").disabled=false;
                
        document.getElementById("edestino").value=document.getElementById("tablainvisible").rows[eidfila].cells[1].innerHTML;
        document.getElementById("epdfnomsucursal").value=document.getElementById("edestino").value;
        document.getElementById("epdfnick").value=document.getElementById("nick").value;

        if (estado_e === 'Pendiente') {document.getElementById("sele_fe").value=eidfila;} // flag para marcar fila
  } 

function PideConfirmacion(opcion){
var usuario_sistema = $('#tipousuario').val();
var fechaseleccion = $('#pdffecha').val();
var fechagiro=fechaseleccion.substring(0,10);

if (fechagiro === $('#fechahoy').val() ){ 
    if (opcion==='R') {    
      alertify.prompt("Anular : " + $('#nombresb').val() +" <br> " + $('#nombresr').val() + " <br> S/. " + $('#importe_r').val() + " <br>  <b> Escriba motivo de la anulacion </b>: ", function (e, str) { 
          if (e){            
              AnulaRecibidos(str);
              document.getElementById("correlativo").value='';
              MuestraRecibidos($('#fecha_r').val(),opcion);

          }else{ /*alertify.error("Has pulsado '" + alertify.labels.cancel + "'");*/ }
      });
    }else{
      if (usuario_sistema === 'ADMIN'){
          alertify.prompt("Anular : " + $('#enombresb').val() +" <br> " + $('#enombresr').val() + " <br> S/. " + $('#eimporte_r').val() + " <br>  <b> Escriba motivo de la anulacion </b>: ", function (e, str) {
            if (e){
                var corr=document.getElementById("correlativo").value;

                AnulaRecibidos(str,corr);
                document.getElementById("correlativo").value='';
                MuestraEntregados($('#efecha_r').val(),opcion);            
                }        
            });
      }else{JAlert("No puede anular esta Transferencia \n Comuniquese con la sucursal de Origen: "  + $('#codsucursal').val() , "Transferencias" );}
    }
}//END verifica fecha y tipo usuario 
else{    
    if (usuario_sistema === 'ADMIN'){
        if (opcion==='R') {    
            alertify.prompt("Anular : " + $('#nombresb').val() +" <br> " + $('#nombresr').val() + " <br> S/. " + $('#importe_r').val() + " <br>  <b> Escriba motivo de la anulacion </b>: ", function (e, str) { 
                if (e){            
                    AnulaRecibidos(str);
                    document.getElementById("correlativo").value='';
                    MuestraRecibidos($('#fecha_r').val(),opcion);     
                }
          });
        }else{
          if (usuario_sistema === 'ADMIN'){
              alertify.prompt("Anular : " + $('#enombresb').val() +" <br> " + $('#enombresr').val() + " <br> S/. " + $('#eimporte_r').val() + " <br>  <b> Escriba motivo de la anulacion </b>: ", function (e, str) {
                if (e){
                    var corr=document.getElementById("correlativo").value;           
                    AnulaRecibidos(str,corr);
                    document.getElementById("correlativo").value='';
                    MuestraEntregados($('#efecha_r').val(),opcion);            
                    }        
                });
          }else{JAlert("No puede anular esta Transferencia \n Comuniquese con la sucursal de Origen: "  + $('#codsucursal').val() , "Transferencias" );}
        }
    }else{JAlert("No puede anular Transferencias \n con fecha diferente a : " + $('#fechahoy').val() , "Transferencias" );}    
}// else  
return false;
}

function AnulaRecibidos(str)
{
  var corr=document.getElementById("correlativo").value;
  var correla = parseInt(corr);
  $.ajax({
        async: true,
        type: "POST",
        dataType: "json",
        cache: false,
        data: {motivo:str, correlativo: correla},  
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controles/anula_recibidos.php",

        complete:function(){jAlert("Anulado: "+ $('#codgirosucursal').val()+'=='+$('#importe_r').val(), "Transferencias");}
  });  
  //alert(corr);
return false;
}
function eRecuperaFilaB(eidfilaB) 
{
  var elTableRow = document.getElementById(eidfilaB);
  elTableRow.style.backgroundColor =(elTableRow.style.backgroundColor==="green")?'cyan':'green';
  if(elTableRow.style.backgroundColor === 'green'){
    var elTableCells = elTableRow.getElementsByTagName("td");
        for (var i=0; i<elTableCells.length; i++) {

          document.getElementById("ednib").value=elTableCells[0].innerHTML;     
          document.getElementById("enombresb").value=elTableCells[1].innerHTML;
          
        }
    }
    $(this).dialog('close');
  } 
/* END Funcion Recuperafila */
  function eRecuperaFilaR(eidfilaR) 
  {
  var elTableRowR = document.getElementById(eidfilaR);
  elTableRowR.style.backgroundColor =(elTableRowR.style.backgroundColor==="green")?'cyan':'green';
  if(elTableRowR.style.backgroundColor === 'green'){
    var elTableCellsR = elTableRowR.getElementsByTagName("td");
        for (var i=0; i<elTableCellsR.length; i++) {
          
          document.getElementById("ednir").value=elTableCellsR[0].innerHTML;     
          document.getElementById("enombresr").value=elTableCellsR[1].innerHTML;
        }
    }
  } 
/* END Recuperafila R*/
function eRecuperaFilaS(eidfilaS) 
{
  var elTableRow = document.getElementById(eidfilaS);
  elTableRow.style.backgroundColor =(elTableRow.style.backgroundColor==="green")?'cyan':'green';
  if(elTableRow.style.backgroundColor === 'green'){
    var elTableCells = elTableRow.getElementsByTagName("td");
        for (var i=0; i<elTableCells.length; i++) {
          
          document.getElementById("ecod_sucu").value=elTableCells[0].innerHTML;     
          document.getElementById("edestino").value=elTableCells[1].innerHTML;
        }
    }
  }
    
function FnPagar()
{

if ($('#operacion').val() !== '' )
{   
    jConfirm("¿Esta seguro de pagar transferencia Nro: " + $('#ecodgirosucursal').val()+' = '+$('#eimporte_r').val(), "Entregados", function(r) {
    if(r) {
        $.ajax({
                type: "POST",
                url: "controles/PagaEntregados.php", 
                data: {id:$('#ecodgirosucursal').val(), codsucu:$('#codsucursal').val(), usuario:$('#nick').val(), valor:$('#operacion').val()}
                }).done(function(msg) {
                    MuestraEntregados($('#efecha_r').val(),'E');
                    FnHabilitaEdicion('guardar');
                });
            }
        });
}else{
    jAlert("Nro de Operacion VACIO", "Transferencias");
    document.getElementById("operacion").focus();
    }
}
function FnHabilitaEdicion(op){
switch(op)
    {
    case "editar":
        document.getElementById("boton_pagar").disabled=false;
        document.getElementById("operacion").disabled=false;
        document.getElementById("boton_editar").disabled=false;
        $("#operacion").focus();
        break;
    case "guardar":
        //alert(op);
        document.getElementById("boton_pagar").disabled=true;
        document.getElementById("operacion").disabled=true;
        document.getElementById("boton_editar").disabled=true;
        break;        
    }

}
/*==============================================================================
========================== DocumentReady =======================================
===============================================================================*/
$(document).ready(function(){           
    ControlesAlGuardar();
    eControlesAlGuardar();
    document.getElementById("imprimir_r").disabled=true;
    document.getElementById("anular").disabled=true;
    document.getElementById("eimprimir_r").disabled=true;
    document.getElementById("eanular").disabled=true;    
    FnHabilitaEdicion('guardar');
    
$("#dnib").keypress(function(e) {
            //13 es el código de la tecla
            if(e.which === 13) {                  
                    $.ajax({
                        url:'controles/DatosCliente.php',
                        type:'POST',
                        dataType:'json',
                        data:{ dni:$('#dnib').val()},
                        beforeSend: function () {$("#nombresb").html("Procesando, espere por favor...");}
                    }).done(function(respuesta){
                        $("#nombresb").val(respuesta.nombres);
                        
                    });
            } /*END if*/
        });   
    $("#dnir").keypress(function(e) {      
            //13 es el código de la tecla
            if(e.which === 13) {
                  /*alert('Has pulsado enter!');*/
                    $.ajax({
                        url:'controles/DatosCliente.php',
                        type:'POST',
                        dataType:'json',
                        data:{ dni:$('#dnir').val()},
                        beforeSend: function () {$("#nombresr").html("Procesando, espere por favor...");}
                    }).done(function(respuesta){
                        $("#nombresr").val(respuesta.nombres);
                        
                    });
            } /*END if*/

        }); /*keypress*/ 

$("#cod_sucu").keypress(function(e) {      
    if($('#cod_sucu').val()!==$('#codsucursal').val() ){//verificamos sucursal diferente
            if(e.which === 13) {                
                    $.ajax({
                        url:'controles/Datos_Sucursal.php',
                        type:'POST',
                        dataType:'json',
                        data:{ codsucu:$('#cod_sucu').val()},
                        beforeSend: function () {$("#destino").html("Procesando, espere por favor...");}
                    }).done(function(respuesta){
                        $("#destino").val(respuesta.nomsucursal);
                        $("#pdfdestino").val(respuesta.nomsucursal);/*para la impresion*/    
                    });
            } /*END if*/
    }
}); /*keypress*/ 
$("#ednib").keypress(function(e) {      
            //13 es el código de la tecla
            if(e.which === 13) {
                  /*alert('Has pulsado enter!');*/
                    $.ajax({
                        url:'controles/DatosCliente.php',
                        type:'POST',
                        dataType:'json',
                        data:{ dni:$('#ednib').val()},
                        beforeSend: function () {$("#enombresb").html("Procesando, espere por favor...");}
                    }).done(function(respuesta){
                        $("#enombresb").val(respuesta.nombres);
                        
                    });
            }
 }); /*keypress*/ 
 $("#ednir").keypress(function(e) {      
            //13 es el código de la tecla
            if(e.which === 13) {
                  /*alert('Has pulsado enter!');*/
                    $.ajax({
                        url:'controles/DatosCliente.php',
                        type:'POST',
                        dataType:'json',
                        data:{ dni:$('#ednir').val()},
                        beforeSend: function () {$("#enombresr").html("Procesando, espere por favor...");}
                    }).done(function(respuesta){
                        $("#enombresr").val(respuesta.nombres);
                        
                    });
            } /*END if*/

        }); /*keypress*/ 

$("#ecod_sucu").keypress(function(e) {
            //13 es el código de la tecla
            if(e.which === 13) {                
                    $.ajax({
                        url:'controles/Datos_Sucursal.php',
                        type:'POST',
                        dataType:'json',
                        data:{ codsucu:$('#ecod_sucu').val()},
                        beforeSend: function () {$("#edestino").html("Procesando, espere por favor...");}
                    }).done(function(respuesta){
                        $("#edestino").val(respuesta.nomsucursal);
                        
                    });
            } /*END if*/

        }); /*keypress*/ 


$("#fecha_r").datepicker({        
        dateFormat: 'yy/mm/dd',
        showOn: 'both',
        buttonImage: 'img/calendar.ico',
        buttonImageOnly: true,
        changeYear: true,
        beforeShow: function(){$(".ui-datepicker").css('font-size', 12); },
        numberOfMonths: 1,
        onSelect: function (dateText){MuestraRecibidos($('#fecha_r').val(),$('#optbuscar').val());}
        /*onClose: function (selectedDate){CalculaTotalesR();} */
   });
$("#efecha_r").datepicker({
        dateFormat: 'yy/mm/dd',
        showOn: 'both',
        buttonImage: 'img/calendar.ico',
        buttonImageOnly: true,
        changeYear: true,
        beforeShow: function(){$(".ui-datepicker").css('font-size', 12); },
        numberOfMonths: 1,
        onSelect: function (dateText){MuestraEntregados($('#efecha_r').val(),$('#optbuscar').val());}
        /*onClose: function (selectedDate){CalculaTotalesR();} */
   });
   
  $("#buscador").keyup(function(){
        // When value of the input is not blank
        if( $(this).val() !== "")
        {  // Show only matching TR, hide rest of them
            $("#TRecibidos tbody>tr").hide();
            $("#TRecibidos td:contains-ci('" + $(this).val() + "')").parent("tr").show();
        }
        else
        { // When there is no input or clean again, show everything back
            $("#TRecibidos tbody>tr").show();
        }
    });   
$.extend($.expr[":"], 
{
    "contains-ci": function(elem, i, match, array) 
    { return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0; }
});

 $("#ebuscador").keyup(function(){
        // When value of the input is not blank
        if( $(this).val() !== "")
        {// Show only matching TR, hide rest of them
            $("#TEntregados tbody>tr").hide();
            $("#TEntregados td:contains-ci('" + $(this).val() + "')").parent("tr").show();
        }
        else
        {   // When there is no input or clean again, show everything back
            $("#TEntregados tbody>tr").show();
        }
    }); 

});
/*END document*/


$(function() {

    $('#econtiene_tabla').hide("fast");
    $('#tabs-min').tabs({
        activate: function(event, ui) {
            var $activeTab = $('#tabs-min').tabs('option', 'active');
            if ($activeTab === 1) {
                $('#contiene_tabla').hide("fast");
                $('#econtiene_tabla').show();
                $("#optbuscar").attr("value", "E");

            }
            else {
                $('#contiene_tabla').show();
                $('#econtiene_tabla').hide("fast");
                $("#optbuscar").attr("value", "R");
            }
        }
    });
    //Para escribir solo letras
    $('#dnir').validacampos('1234567890abcdefghijklmnñopqrstuvwxyz');
    $('#dnib').validacampos('1234567890abcdefghijklmnñopqrstuvwxyz');
    $('#codsucu').validacampos('1234567890abcdefghijklmnñopqrstuvwxyz');
    $('#buscador').validacampos('1234567890abcdefghijklmnñopqrstuvwxyz');
    //Para escribir solo numeros    
    $('#importe_r').validacampos('.0123456789');
    $('#cargo_r').validacampos('.0123456789');
    $('#otros_r').validacampos('.0123456789');
    $('#efectivo_r').validacampos('.0123456789');
    
});

$(function() {


});
