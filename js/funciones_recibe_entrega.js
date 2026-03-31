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
    if ($(this).find('td').eq(12).text() ==='1000-10-10 00:00:00') { $(this).css('background', 'Pink')};
    if ($(this).find('td').eq(12).text() !=='1000-10-10 00:00:00') { $(this).css('background', 'LightYellow')};
    if ($(this).find('td').eq(13).text() ==='S') { $(this).css('background', 'tomato')};        
})
//alert(suma);
$("#total_i").text(sumai.toFixed(2));
$("#total_c").text(sumac.toFixed(2));
$("#total_o").text(sumao.toFixed(2));
$("#total_g").text(sumag.toFixed(2));
//$("#total").html('S/. '+suma);
}

function CalculaTotalesE() {
var sumai = 0;
/*var sumac = 0;
var sumao = 0;
var sumag = 0;*/
$('#TEntregados tr.dato').each(function(){ //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas                                                                                                                                    
    sumai += parseFloat($(this).find('td').eq(7).text()||0,10); //numero de la celda 5*/
    /*sumac += parseFloat($(this).find('td').eq(6).text()||0,10); 
    sumao += parseFloat($(this).find('td').eq(7).text()||0,10); 
    sumag += parseFloat($(this).find('td').eq(8).text()||0,10); */
    if ($(this).find('td').eq(11).text() ==='1000-10-10 00:00:00') { $(this).css('background', 'Pink')};
    if ($(this).find('td').eq(11).text() !=='1000-10-10 00:00:00') { $(this).css('background', 'LightYellow')};
    if ($(this).find('td').eq(12).text() ==='S') { $(this).css('background', 'tomato')};        
})
//alert(suma);
$("#etotal_i").text(sumai.toFixed(2));
/*$("#total_c").text(sumac.toFixed(2));
$("#total_o").text(sumao.toFixed(2));
$("#total_g").text(sumag.toFixed(2));*/
//$("#total").html('S/. '+suma);
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

function RecuperaFilaB(idfilaB) {
  var elTableRow = document.getElementById(idfilaB);
  elTableRow.style.backgroundColor =(elTableRow.style.backgroundColor==="LightSkyBlue")?'cyan':'LightSkyBlue';
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
          /*alert(elTableCells[i].innerHTML);*/
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
if($('#ecodsucu').val()!=='' && +$('#ecodsucu').val().length >2){
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
if($('#ednib').val()!=='' && +$('#ednib').val().length >2){    
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

function dialog_responsive(){
  /*Diseño responsable para los cuadros de diálogo*/
      $("div").each(function(){
          if ($(this).attr("role") === "dialog"){
          /*Modifica las propiedades CSS a tu gusto*/
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
  /*data: {fecha: $('#fecha_r').val()},  */
  //data: {motivo:str, correlativo: correla},  
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  url: "controles/Imprime_Recibidos.php",
  beforeSend: antesEnvio
  /*beforeSend:function(objeto){ $('#carga1').css({display:'block'}); },
  success: MuestraRecibidos($('#fechahoy').val()),
  timeout: 4000,
  complete:function(){$('#carga1').css('display','none');}*/
  });  
  //alert(corr);
return false;
}

function ImprimeEntregados(){
  $.ajax({
  async: true,
  type: "POST",
  dataType: "json",
  cache: false,
  data: {codsucu: $('#codsucu').val(),fecha: $('#fecha_r').val()},
  /*data: {fecha: $('#fecha_r').val()},  */
  //data: {motivo:str, correlativo: correla},  
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
function MuestraRecibidos(fecha_busqueda,opt){
  /*var fecha_busqueda = $('#fecha_r').val();*/
  $.ajax({
  async: true,
  type: "POST",
  dataType: "json",
  cache: false,
  /*data: {codsucu: $('#codsucu').val(),fecha_i: $('#fecha_r').val()},*/
  data: {fecha: fecha_busqueda,opt:opt},  
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  url: "controles/BuscaRecibidos.php",
  /*beforeSend: antesEnvio,*/
  beforeSend:function(objeto){ 
                $('#carga').css({display:'block'}); },
  success:  CreaTablaRecibidos,
  timeout: 5000,
  complete:function(){$('#carga').css('display','none');}
  
  });
return false;
}

function MuestraEntregados(fecha_busqueda,opt){
  /*var fecha_busqueda = $('#fecha_r').val();*/
  $.ajax({
  async: true,
  type: "POST",
  dataType: "json",
  cache: false,
  data: {fecha: fecha_busqueda,opt:opt},  
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  url: "controles/BuscaRecibidos.php",
  /*beforeSend: antesEnvio,*/
  beforeSend:function(objeto){ 
                $('#ecarga').css({display:'block'}); },
  success:  CreaTablaEntregados,
  timeout: 4000,
  complete:function(){$('#ecarga').css('display','none');}
  
  });
return false;
}

/* IIIIIIIIIIIIIIIIIII  INSERTAR RRRRRRRRRRRRRRRRRRRRRR */
function Inserta_Recibidos(){            
    var codgiro       = 'pop';
    var fechagiro     = $("input#fecha_r").val();
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
//validando
if ($('#fechahoy').val() === $('#fecha_r').val() ) { 
    if (origen !== destino ) { 
        if (remitente.length === 0 || beneficiario.length === 0 || destino.length === 0 || importe === 0 || importe.length === 0 )  
        {   alert('Faltan datos verifique....');
            return false;           
        } else {
     //Construimos la variable que se guardará en el data del Ajax para pasar al archivo php que procesará los datos    
                $.ajax({
                  async: true,
                  type: "POST",
                  cache: false,
                  dataType: 'json',
                  data: {codgiro:codgiro, fechagiro:fechagiro, tipogiro:tipogiro, origen:origen, remitente:remitente, destino:destino, beneficiario:beneficiario,
                  ciudestino:ciudestino, importe:importe, cargo:cargo, igv:igv, itf:itf, otro:otro, total:total, efectivo:efectivo, estado:estado, obsdest:obsdest, 
                  obsgiro:obsgiro, codbanco:codbanco, codtcuenta:codtcuenta, nrocuenta:nrocuenta, nrooperacion:nrooperacion, nusuario:nusuario, userpc:userpc, op:op},
                  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                  url: "controles/InsertaRecibidos2.php", 
                  beforeSend:function(objeto){ 
                            $('#carga1').css({display:'block'}); },
                  /*success:  muestra,*/
                  complete:function(){$('#carga1').css('display','none'); MuestraRecibidos($('#fechahoy').val(),$('#optbuscar').val());}
                }).done(function(respuesta){
                            $("#codgirosucursal").val(respuesta.codgirosucu);                        
                });
                ValoresImpresion();
                ControlesAlGuardar();
                document.getElementById("imprimir_r").disabled=false;
                return false;                               
        }
    }else { alert('Origen y destiino deberian ser diferentes...'); }
}else { alert('Insertara una Transferencia con fecha:'+ $('#fecha_r').val() +'/n La fecha del sistema es :'+$('#fechahoy').val() );}    
return false;
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
    {   alert('Faltan datos verifique....');
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
        alert('Origen y destiino deberian ser diferentes...');
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

function RecuperaFila(idfila) {
  ControlesAlGuardar();  
  var elTableRow = document.getElementById(idfila);
  var elTableCells = elTableRow.getElementsByTagName("td");
        for (var i=0; i<elTableCells.length; i++) {
          /*alert(elTableCells[i].innerHTML);*/
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
        }
        
        document.getElementById("anular").disabled=false;
        document.getElementById("imprimir_r").disabled=false;
  } 

function eRecuperaFila(eidfila) {
    
var eelTableRow = document.getElementById(eidfila);
  var eelTableCells = eelTableRow.getElementsByTagName("td");
          for (var i=0; i<eelTableCells.length; i++) {
          /*alert(elTableCells[i].innerHTML);*/
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
        } 
        document.getElementById("eanular").disabled=false;
        document.getElementById("eimprimir_r").disabled=false;
                
        document.getElementById("edestino").value=document.getElementById("tablainvisible").rows[eidfila].cells[1].innerHTML;
        document.getElementById("epdfnomsucursal").value=document.getElementById("edestino").value;
        document.getElementById("epdfnick").value=document.getElementById("nick").value;
        document.getElementById("boton_pagar").disabled=false;
        document.getElementById("operacion").disabled=false;
  } 

function PideConfirmacion(opcion){
if (opcion==='R') {
    
    alertify.prompt("Anular : " + $('#nombresb').val() +" <br> " + $('#nombresr').val() + " <br> S/. " + $('#importe_r').val() + " <br>  <b> Escriba motivo de la anulacion </b>: ", function (e, str) { 
        if (e){            
            AnulaRecibidos(str);
            document.getElementById("correlativo").value='';
            MuestraRecibidos($('#fecha_r').val(),opcion);
            /*MuestraRecibidos(fecha);*/
            /*alertify.success("Has pulsado '" + alertify.labels.ok + "'' e introducido: " + str + fecha + corr);        */
        }else{
            /*alertify.error("Has pulsado '" + alertify.labels.cancel + "'");*/
        }
    });
  }else{
      alertify.prompt("Anular : " + $('#enombresb').val() +" <br> " + $('#enombresr').val() + " <br> S/. " + $('#eimporte_r').val() + " <br>  <b> Escriba motivo de la anulacion </b>: ", function (e, str) { 
        if (e){
            var corr=document.getElementById("correlativo").value;
            /*var fecha=document.getElementById("fechahoy").value;*/
            AnulaRecibidos(str,corr);
            document.getElementById("correlativo").value='';
            MuestraEntregados($('#efecha_r').val(),opcion);            
        }else{            
        }
    });
  }
return false;
}
function AnulaRecibidos(str){
  var corr=document.getElementById("correlativo").value;
  var correla = parseInt(corr) ;
  $.ajax({
  async: true,
  type: "POST",
  dataType: "json",
  cache: false,
  data: {motivo:str, correlativo: correla},  
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  url: "controles/anula_recibidos.php",
  beforeSend: antesEnvio,
  complete:function(){jAlert("Anulado: "+correla, "Transferencias");}
  });  
  //alert(corr);
return false;
}
function eRecuperaFilaB(eidfilaB) {
  var elTableRow = document.getElementById(eidfilaB);
  elTableRow.style.backgroundColor =(elTableRow.style.backgroundColor==="green")?'cyan':'green';
  if(elTableRow.style.backgroundColor === 'green'){
    var elTableCells = elTableRow.getElementsByTagName("td");
        for (var i=0; i<elTableCells.length; i++) {
          /*alert(elTableCells[i].innerHTML);*/
          document.getElementById("ednib").value=elTableCells[0].innerHTML;     
          document.getElementById("enombresb").value=elTableCells[1].innerHTML;
          
        }
    }
    $(this).dialog('close');
  } 
/* END Funcion Recuperafila */
  function eRecuperaFilaR(eidfilaR) {
  var elTableRowR = document.getElementById(eidfilaR);
  elTableRowR.style.backgroundColor =(elTableRowR.style.backgroundColor==="green")?'cyan':'green';
  if(elTableRowR.style.backgroundColor === 'green'){
    var elTableCellsR = elTableRowR.getElementsByTagName("td");
        for (var i=0; i<elTableCellsR.length; i++) {
          /*alert(elTableCells[i].innerHTML);*/
          document.getElementById("ednir").value=elTableCellsR[0].innerHTML;     
          document.getElementById("enombresr").value=elTableCellsR[1].innerHTML;
        }
    }
  } 
/* END Recuperafila R*/
function eRecuperaFilaS(eidfilaS) {
  var elTableRow = document.getElementById(eidfilaS);
  elTableRow.style.backgroundColor =(elTableRow.style.backgroundColor==="green")?'cyan':'green';
  if(elTableRow.style.backgroundColor === 'green'){
    var elTableCells = elTableRow.getElementsByTagName("td");
        for (var i=0; i<elTableCells.length; i++) {
          /*alert(elTableCells[i].innerHTML);*/
          document.getElementById("ecod_sucu").value=elTableCells[0].innerHTML;     
          document.getElementById("edestino").value=elTableCells[1].innerHTML;
        }
    }
  }
    
 function FnPagar(){
if (document.getElementById("operacion").value !== '')
{
    var codsucu= $('#ecodgirosucursal').val();
    codsucu=codsucu.substring(0,3);
    jConfirm("¿Esta seguro de pagar transferencia Nro: " + $('#ecodgirosucursal').val(), "Entregados", function(r) {
    if(r) {
        $.ajax({
                type: "POST",
                url: "controles/PagaEntregados.php", 
                data: {id:$('#ecodgirosucursal').val(), codsucu:codsucu, usuario:$('#nick').val(), valor:$('#operacion').val()}
                }).done(function( msg ) {
                    MuestraEntregados($('#efecha_r').val(),'E');
                    document.getElementById("boton_pagar").disabled=true;
                    document.getElementById("operacion").disabled=true;
                });
        } 
        });    
}else{
    jAlert("Nro de Operacion VACIO", "Transferencias");
    document.getElementById("operacion").focus();
}
}
  /* EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE EJEMPLO EEEEEEEEEEEEEEEEEEEEEEE  */
//function FuncionInsertaRecibidos() 
//{    
//    //Obtenemos el valor del campo nombre
//
//    var cargo         = parseFloat(document.getElementById("cargo_r").value); 
//    var remitente     = $("input#dnir").val();
//   var fechagiro     = $("input#fecha_r").val();
//    var importe       = parseFloat(document.getElementById("importe_r").value);
//    /*var importe       = $("input#importe_r").val(); */
//    //Construimos la variable que se guardará en el data del Ajax para pasar al archivo php que procesará los datos
//    /*var dataString = 'cargo:' + cargo + '&remitente:' + remitente + '&fechagiro:' + fechagiro + '&importe:' + importe ;*/
//    $.ajax({
//      type: "POST",
//      url: "InsertaRecibidos.php",
//      /*data: dataString,*/
//      data: {cargo:cargo, remitente:remitente, fechagiro:fechagiro, importe:importe},
//      success: function() {
//          $('#register_form').html("<div id='message'></div>");
//            $('#message').html("<h2>Tus datos han sido guardados correctamente!</h2>")
//            .hide()
  //          .fadeIn(1500, function() {
    //      $('#message').append("<a href='index.php?action=see'>Ver usuarios registrados</a>");
      //      });
        //}
    //});
    //alert(importe);
   // return false;
  //}
/*
function abrir_dialogoB() {
      $( "#dialogo_r" ).dialog({
          modal: true,
          height:300,
          width:350,
          show: 'explode',
          buttons: {"Cerrar": function() { $( this ).dialog( "close" ); limpia_tabla(); } }
          });dialog_responsive()
    };
function abrir_dialogoR() {
      $( "#dialogo_b" ).dialog({
          modal: true,
          height:300,
          width:350,
          show: 'explode',
          buttons: {"Cerrar": function() { $( this ).dialog( "close" ); limpia_tabla(); } }
          });dialog_responsive()
    };
*/
 




