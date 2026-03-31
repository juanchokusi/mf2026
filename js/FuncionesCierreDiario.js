function FnCalculaTotales()
{
var ti=0; var tr=0; var ten=0; var teg=0; var ts=0; var gti=0; var gte=0;
    ti=     parseFloat(document.getElementById("tingresos").value);    
    tr =    parseFloat(document.getElementById("trecepcion").value);    
    ten =   parseFloat(document.getElementById("tentrega").value);
    teg =   parseFloat(document.getElementById("tegresos").value);
    if (isNaN(ti))  ti=0;    if (isNaN(tr))  tr=0;    if (isNaN(ten)) ten=0;    if (isNaN(teg)) teg=0;
    gti = ti + tr;    gte = ten + teg;    ts = gti - gte;    
    document.getElementById("total_ingresos").value = parseFloat(Math.round(gti*100)/100).toFixed(2);    
    document.getElementById('total_egresos').value = parseFloat(Math.round(gte*100)/100).toFixed(2);
    document.getElementById('total_saldo').value = parseFloat(Math.round(ts*100)/100).toFixed(2);
    if(ts<0){
        $('#total_saldo').css('background-color','tomato');
        }
        else {$('#total_saldo').css('background-color','lavender');}    
}

function FnActualizaDiario()
{ // si es de fecha diferente solo administrador
if ($('#tusuario').val() === 'ADMIN'){
    var existe=$('#codcierrediario').val();
    FnCalculaTotales();
    if (existe !== ''){    
    jConfirm("Seguro de Actualizar Diario \nfecha : " + $('#fechacierrediario').val()+'\n Saldo Final= '+$("#total_saldo").val(), "Transferencias", function(r) { 
        if(r) {
            $.ajax({    
               async: true,
               type: "POST",
               dataType: 'json',
               cache: false,       
               data:{ opt:"actualiza", coddiario:$("#codcierrediario").val(), ting:$("#total_ingresos").val(), tsal: $("#total_egresos").val(), 
                      saldof: $("#total_saldo").val(), fechadiario: $("#fecha_cierre").val(), userpc: 'dataweb', usuamodi: $("#nusuario").val() },    
               contentType: "application/x-www-form-urlencoded; charset=UTF-8",
               url: "controles/ManteCierreDiario.php",
               beforeSend:function(objeto){ 
                        $('#carga1').css({display:'block'}); }
               }).done(function(respuesta){        
                   FnCargaListaDiarios();
                   $('#carga1').css('display','none'); 
               });
           }
       });
    } else {jAlert('Seleccione Diario, antes de continuar...','Transferencias');}
}else {jAlert('No puede modificar, comuniquese con el Administrador','Transferencias');}
}

function FnCreaNuevoCierre()
{
var existe=$('#codcierrediario').val();
if (existe === ''){
    var sucursal=$('#codsucursal').val();
    var fechacrea=$('#fecha_cierre').val();
    var fechahoradehoy=$('#fechahoradehoy').val();
    var nusuario=$('#nusuario').val();
    jConfirm("¿Esta seguro de crear nuevo Diario con fecha :" + fechacrea, "Transferencias", function(r) { 
    if(r) {
            $.ajax({
                    async: true,
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: {opt:'ND', codsucu:sucursal, fechacrea:fechacrea, usuamodi:nusuario},  
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    url: "controles/ManteCierreDiario.php"
                }).done(function(respuesta){
                    $("#codcierrediario").val(respuesta.codigo);
                    $("#fechacierrediario").val(respuesta.fecha); 
                    JAlert("Se creo un Nuevo Diario con fecha: "+$("#fechacierrediario").val(),"Transferencias - Cierre Dairio");
                });
        } 
    });
} else { jAlert('Ya existe un Diario, Verifique...','Transferencias');  }    
return false;    
}

function FnMuestraCierre(fechacierre,opt)
{
    $("#codcierrediario").attr("value","");
    $("#fechacierrediario").attr("value","");
LimpiaDetalle();
var sucursal=$('#codsucursal').val();
      $.ajax({async: true,type: "POST",dataType: "json",cache: false,
      data: {sucursal:sucursal, fecha:fechacierre, opt:opt},        
      url: "controles/ManteCierreDiario.php",      
      beforeSend:function(objeto){ 
                    $('#carga').css({display:'block'}); },
      success:  CreaTablaTransferencias,      
      complete:function(){$('#carga').css('display','none'); }

      });
      FnUbicaDiario(sucursal,fechacierre);
return false;
}

function FnUbicaDiario(codsucursal,fechabusqueda){
 $.ajax({async: true, type: "POST", dataType: 'json', cache: false,       
    data:{ opt:"B", codsucu:codsucursal, fecha: fechabusqueda },
    /*data:{ opt:"B", codsucu:$('#codsucursal').val(), fecha: $('#fecha_cierre').val() },*/
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    url: "controles/ManteCierreDiario.php"    
    }).done(function(respuesta){
        $("#codcierrediario").val(respuesta.codigo);
        $("#fechacierrediario").val(respuesta.fechadiario);
        $("#estado").val(respuesta.estado);
        FnCargaDetalle();
        FnCalculaTotales();
        if($("#estado").val() === 'ABIERTO' ){
            $('#span_abierto').css('display','block');
            $('#span_cerrado').css('display','none');
            
        }else { $('#span_cerrado').css('display','block'); 
                $('#span_abierto').css('display','none'); 
               }
    });
}

function FnCargaDetalle(){
var existe = $('#codcierrediario').val();
if (existe !== ''){    
    FnCargaIngresos();    
    FnCargaEgresos();        
    } else { jAlert('Debe CREAR un nuevo Diario...:', 'Transferencias'); }
}  

function FnCargaListaDiarios(){
    $.ajax({async: true, type: "POST", dataType: "json", cache: false,
      data: {codsucu: $("#codsucursal").val(), fecha: $('#fecha_cierre').val(), opt: 'LISTA'},
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      url: "controles/ManteCierreDiario.php",    
      success:  CreaTablaListaDiario
      //timeout: 3000      
      });
  //}  
}

function FnInsertaIngresos(){
var monto = parseFloat($("#ingreso").val());
if ($("#opt_insert").val() === 'II'){
    if (monto > 0 && $("#concepto_ing").val() !== ''){
      $.ajax({async: true, type: "POST", dataType: "json", cache: false,
        data: {coddiario: $("#codcierrediario").val(), monto:monto, concepto:$("#concepto_ing").val(),responsable:$("#responsable_ing").val(),usuamodi:$("#nusuario").val(),fecha:$("#fecha_cierre").val(),idempresa:$("#idempresa").val(),opt:$("#opt_insert").val()},
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controles/ManteCierreDiario.php",
        success: LimpiaCamposDetalleIng(),            
        complete: FnCargaIngresos
      });        
    }  else { jAlert ('Ingrese datos...','Transferencias - Ingresos'); }
}else { jAlert ('Pulse el boton  +   para agregar nuevo item','Transferencias - Ingresos'); }
return false; 
}

function FnCargaIngresos(){
//var monto =parseFloat($("#ingreso").val());
//if (monto > 0 && $("#concepto_ing").val() !== ''){ /*para evitar recarga innecesaria*/
    $.ajax({async: true, type: "POST", dataType: "json", cache: false,
      data: {coddiario: $("#codcierrediario").val(),fecha:$("#fecha_cierre").val(),idempresa:$("#idempresa").val(), opt:'LI'},
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      url: "controles/ManteCierreDiario.php",    
      success:  CreaTablaIngresos
      //timeout: 3000      
      //complete: CreaTablaIngresos
      });
  //}  
}

function CreaTablaIngresos( detingresos ){  
var html;     
    for(var contador=0; contador < detingresos.length; contador++) {
        i=contador+1;   
        html += "<tr id='I[" + contador + "]' class='dato' onclick='RecuperaFilaIng(this.id);'>";
        html += "<td>" + detingresos[contador].itm +  "</td>";        
        html += "<td class='editable' data-campo='concepto'> <span>" + detingresos[contador].concepto + "</span> </td>";
        html += "<td class='editable' data-campo='responsable'> <span>" + detingresos[contador].responsable + "</span> </td>";        
        html += "<td align='right' class='editable' data-campo='ing'> <span>" + detingresos[contador].ing + "</span> </td>";   
        html += "</tr>";
      }              
               html += "<tr >";                       
                        html += "<th ></th>";                        
                        html += "<th ></th>";
                        html += "<th ></th>";                     
                        html += "<th id='total_i'></th>";                                                
                html += "</tr>";                      
      $("#body_ingresos").html( html );
      
      TotalIngresos();
      FnCalculaTotales();
}

function FnInsertaEgresos(){   
var monto =parseFloat($("#egreso").val());
if ($("#opt_insert").val() === 'IE'){
    if (monto > 0 && $("#concepto_eg").val() !== ''){
      $.ajax({async: true, type: "POST", dataType: "json", cache: false,
      data: {coddiario: $("#codcierrediario").val(), monto:monto, concepto:$("#concepto_eg").val(), responsable:$("#responsable_eg").val(),usuamodi:$("#nusuario").val(),fecha:$("#fecha_cierre").val(),idempresa:$("#idempresa").val(), opt:$("#opt_insert").val()},
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      url: "controles/ManteCierreDiario.php",
      succes: LimpiaCamposDetalleEg(),
      complete: FnCargaEgresos
    });

    }   else { jAlert ('Ingrese datos...','Transferencias - Salidas'); }   
}else { jAlert ('Pulse el boton  +   para agregar nuevo item','Transferencias - Egresos'); }
return false;
}

function FnCargaEgresos(){
//var monto =parseFloat($("#egreso").val());
//if (monto > 0 && $("#concepto_eg").val() !== ''){ /*para evitar recarga innecesaria*/
    $.ajax({async: true, type: "POST", dataType: "json", cache: false,
      data: {coddiario: $("#codcierrediario").val(), fecha:$("#fecha_cierre").val(),idempresa:$("#idempresa").val(),opt:'LE'},
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      url: "controles/ManteCierreDiario.php",   
      success:  CreaTablaEgresos
      //timeout: 3000      
      });
   //}  
}

function CreaTablaEgresos( detingresos ){
var html; 
for(var contador=0; contador < detingresos.length; contador++) {
        var i=contador+1;   
        html += "<tr id='E[" + contador + "]' class='dato' onclick='RecuperaFilaEg(this.id);'>";
        html += "<td>" + detingresos[contador].itm +  "</td>";
        html += "<td class='editable' data-campo='concepto'> <span>" + detingresos[contador].concepto + "</span> </td>";
        html += "<td class='editable' data-campo='responsable'> <span>" + detingresos[contador].responsable + "</span> </td>";        
        html += "<td align='right' class='editable' data-campo='sal'> <span>" + detingresos[contador].sal + "</span> </td>";                
        html += "</tr>";
      } 
                html += "<tr >";                       
                        html += "<th ></th>";                        
                        html += "<th ></th>";
                        html += "<th ></th>";                     
                        html += "<th id='total_e'></th>";                                                
                html += "</tr>";                
      $("#body_egresos").html( html );
      TotalEgresos();
      FnCalculaTotales();
}

function CreaTablaListaDiario( datos ){
var html; 
for(var contador=0; contador < datos.length; contador++) {
        var i=contador+1;   
        html += "<tr id='LD[" + contador + "]' class='dato' onclick='RecuperaFilaEg(this.id);'>";
        
        html += "<td > <span>" + datos[contador].fecha_diario + "</span> </td>";
        html += "<td align='right'> <span>" + datos[contador].saldo_i + "</span> </td>";        
        html += "<td align='right'> <span>" + datos[contador].t_ing + "</span> </td>";                
        html += "<td align='right'> <span>" + datos[contador].t_sal + "</span> </td>";                
        html += "<td align='right'> <span>" + datos[contador].saldo_f + "</span> </td>";                
        html += "<td > <span>" + datos[contador].estado + "</span> </td>";                
        
        html += "</tr>";
      } 
                html += "<tr >";                       
                        html += "<th ></th>";                        
                        html += "<th id='total_saldoi'></th>";
                        html += "<th id='total_ting'></th>";                     
                        html += "<th id='total_tsal'></th>";
                        html += "<th id='total_saldof'></th>";
                        html += "<th ></th>";
                html += "</tr>";                
      $("#body_listadiario").html( html );
      //TotalEgresos();
}

function CreaTablaTransferencias( json ){
var html; 
    for(var contador=0; contador < json.length; contador++) {
        var i=contador+1;   
        html += "<tr id='R[" + contador + "]' class='dato' ondblclick='RecuperaFila(this.id);'>";
        html += "<td>" +  i +  "</td>";        
        html += "<td >" + json[contador].cod_girosucu + "</td>";
        html += "<td >" + json[contador].cod_sucursald + "</td>";
        html += "<td >" + json[contador].fechahora_registro + "</td>";
        html += "<td >" + json[contador].fechahora_entrega + "</td>";
        html += "<td >" + json[contador].beneficiario + "</td>";
        html += "<td >" + json[contador].remitente + "</td>";
        html += "<td align='right'>" + json[contador].entregado + "</td>";
        html += "<td align='right'>" + json[contador].recibido + "</td>";
        html += "<td align='right'>" + json[contador].pendiente + "</td>";        
        html += "</tr>";
      } 
                html += "<tr >";                       
                        html += "<th ></th>";                        
                        html += "<th ></th>";
                        html += "<th ></th>";
                        html += "<th ></th>";
                        html += "<th ></th>";
                        html += "<th ></th>";
                        html += "<th ></th>";
                        html += "<th  id='total_en'></th>";
                        html += "<th  id='total_re'></th>";
                        html += "<th  id='total_pe'></th>";                                                
                html += "</tr>";                
      $("#body_transferencias").html( html );
      TotalesTransferencias();
}

function TotalesTransferencias() {
var sumae = 0;
var sumar = 0;
var sumap = 0;

$('#transferencias tr.dato').each(function(){ //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas                                                                                                                                    
    sumae += parseFloat($(this).find('td').eq(7).text()||0,10); //numero de la celda 5*/
    sumar += parseFloat($(this).find('td').eq(8).text()||0,10); 
    sumap += parseFloat($(this).find('td').eq(9).text()||0,10); 
});
document.getElementById('tentrega').value=sumae;
$("#total_en").text(sumae.toFixed(2));
$("#total_en").css('font-size', 12);
$("#total_en").css('text-align','right');
document.getElementById('trecepcion').value=sumar;
//$("#trecepcion").val(sumar.toFixed(2));
$("#total_re").text(sumar.toFixed(2));
$("#total_re").css('font-size', 12);
$("#total_re").css('text-align','right');
$("#total_pe").text(sumap.toFixed(2));
$("#total_pe").css('font-size', 12);
$("#total_pe").css('text-align','right');
}

function TotalIngresos() {
var sumai = 0;
$('#IngresosDet tr.dato').each(function(){ //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas                                                                                                                                    
    sumai += parseFloat($(this).find('td').eq(3).text()||0,10); //numero de la celda 5*/        
});
document.getElementById('tingresos').value=sumai;
//$("#tingresos").text(sumai.toFixed(2)); //variable hidden
$("#total_i").text(sumai.toFixed(2));
$("#total_i").css('font-size', 12);
$("#total_i").css('text-align','right');
}

function TotalEgresos() {
var sumaeg = 0;
$('#EgresosDet tr.dato').each(function(){ //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas                                                                                                                                    
    sumaeg += parseFloat($(this).find('td').eq(3).text()||0,10); //numero de la celda 5*/        
});
document.getElementById('tegresos').value=sumaeg;
$("#total_e").text(sumaeg.toFixed(2));
$("#total_e").css('font-size', 12);
$("#total_e").css('text-align','right');
}

function FnCierreDiario(){
FnCalculaTotales();
if($("#estado").val() === 'ABIERTO' ){
   
} else { jAlert ('Diario ya esta CERRADO, verifique...','Transferencias'); } 
}

function RecuperaFilaIng(idfila)
{
    var idfila1=$('#sele').val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfila1);
    elTableRow.style.backgroundColor =(elTableRow.style.backgroundColor==="LightSkyBlue")?'white':'LightSkyBlue';
    if (idfila1 !== idfila){
        elTableRow1.style.backgroundColor=(elTableRow.style.backgroundColor==="white")?'LightSkyBlue':'white';       
    }
    var elTableCells = elTableRow.getElementsByTagName("td");  
    for (var i=0; i<elTableCells.length; i++) {
        document.getElementById("item").value=elTableCells[0].innerHTML;        
        var concepto_i=elTableCells[1].innerHTML;
            document.getElementById("concepto_ing").value=concepto_i.substring(7,concepto_i.length-8);
        var respo_i=elTableCells[2].innerHTML;
            document.getElementById("responsable_ing").value=respo_i.substring(7,respo_i.length-8);                
        var ing=elTableCells[3].innerHTML;
            document.getElementById("ingreso").value=ing.substring(7,ing.length-8);
        document.getElementById("sele").value =idfila;
        document.getElementById("opt_insert").value =""; // valor que permite agregar un nuevo item
    }    
}

function RecuperaFilaEg(idfila)
{
    var idfila1=$('#sele').val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfila1);
    elTableRow.style.backgroundColor =(elTableRow.style.backgroundColor==="LightSkyBlue")?'white':'LightSkyBlue';
    if (idfila1 !== idfila){
        elTableRow1.style.backgroundColor=(elTableRow.style.backgroundColor==="white")?'LightSkyBlue':'white';
    }
    var elTableCells = elTableRow.getElementsByTagName("td");
    for (var i=0; i<elTableCells.length; i++) {
        document.getElementById("item").value=elTableCells[0].innerHTML;
        var concepto_i=elTableCells[1].innerHTML;
            document.getElementById("concepto_eg").value=concepto_i.substring(7,concepto_i.length-8);
        var respo_i=elTableCells[2].innerHTML;
            document.getElementById("responsable_eg").value=respo_i.substring(7,respo_i.length-8);                
        var eg=elTableCells[3].innerHTML;
            document.getElementById("egreso").value=eg.substring(7,eg.length-8);
        document.getElementById("sele").value =idfila; 
        document.getElementById("opt_insert").value =""; //                
    }
} 

function ADecimal(){
    nimporte=document.getElementById("ingreso").value;
    document.getElementById("ingreso").value = parseFloat(Math.round(nimporte*100)/100).toFixed(2);      
}

function ActivaControles(op){
if (op==="I"){
    ControlesIng();
    ControlesEg();
    ControlesGuardaE();
    document.getElementById("opt_insert").value ="II"; // para daber en que parte de la tabala hacer la insercion
    }
if (op==="E"){
    ControlesEg();
    ControlesIng();
    ControlesGuardaI();
    document.getElementById("opt_insert").value ="IE";
    }
if (op==="G"){
    ControlesGuardaI();    
    }    
}

function ControlesIng(){
    document.getElementById("concepto_ing").disabled=false;
    document.getElementById("responsable_ing").disabled=false;
    document.getElementById("ingreso").disabled=false;        
    document.getElementById("concepto_ing").value="";
    document.getElementById("responsable_ing").value="";
    document.getElementById("ingreso").value="";    
}

function ControlesEg(){
    document.getElementById("concepto_eg").disabled=false;
    document.getElementById("responsable_eg").disabled=false;
    document.getElementById("egreso").disabled=false;
    document.getElementById("concepto_eg").value="";
    document.getElementById("responsable_eg").value="";
    document.getElementById("egreso").value="";    
}

function ControlesGuardaI(){
    document.getElementById("concepto_ing").disabled=true;
    document.getElementById("responsable_ing").disabled=true;
    document.getElementById("ingreso").disabled=true;    
}

function ControlesGuardaE(){
    document.getElementById("concepto_eg").disabled=true;
    document.getElementById("responsable_eg").disabled=true;
    document.getElementById("egreso").disabled=true;
}

function LimpiaDetalle(){
var Table = document.getElementById("body_ingresos");
Table.innerHTML = "";    
    
var Table = document.getElementById("body_egresos");
Table.innerHTML = "";    
    
}

function LimpiaCamposDetalleIng(){
    $('#concepto_ing').attr('value','');
    $('#responsable_ing').attr('value','');
    $('#ingreso').attr('value','');
}

function LimpiaCamposDetalleEg(){
    $('#concepto_eg').attr('value','');
    $('#responsable_eg').attr('value','');
    $('#egreso').attr('value','');
}

