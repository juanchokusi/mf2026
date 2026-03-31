function FnCalculaTotales(){
var ti=0; var tr=0; var ten=0; var teg=0; var ts=0; var gti=0; var gte=0;
    ti=parseFloat(document.getElementById("tingresos").value);    
    tr =parseFloat(document.getElementById("trecepcion").value);    
    ten =parseFloat(document.getElementById("tentrega").value);
    teg =parseFloat(document.getElementById("tegresos").value);
    if (isNaN(ti))  ti=0;    if (isNaN(tr))  tr=0;    if (isNaN(ten)) ten=0;    if (isNaN(teg)) teg=0;
    gti = ti + tr;    gte = ten + teg;    ts = gti - gte;    
    document.getElementById("total_ingresos").value = parseFloat(Math.round(gti*100)/100).toFixed(2);    
    document.getElementById('total_egresos').value = parseFloat(Math.round(gte*100)/100).toFixed(2);
    document.getElementById('total_saldo').value = parseFloat(Math.round(ts*100)/100).toFixed(2);
    $("#saldo_final").val($("#total_saldo").val());
    if(ts<0){
        $('#total_saldo').css('background-color','tomato');
        $('#saldo_final').css('background-color','tomato');
        }
        else {
            $('#total_saldo').css('background-color','#428bca');
            $('#saldo_final').css('background-color','#428bca');
        }
}

function TotalesTransferencias() {
var sumae = 0; var sumar = 0; var sumap = 0;
$('#transferencias tr.dato').each(function(){ //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas                                                                                                                                    
    sumae += parseFloat($(this).find('td').eq(7).text()||0,10); //numero de la celda 5*/
    sumar += parseFloat($(this).find('td').eq(8).text()||0,10); 
    sumap += parseFloat($(this).find('td').eq(9).text()||0,10); 
});
document.getElementById('tentrega').value=sumae;
$("#total_en").text(sumae.toFixed(2));
document.getElementById('trecepcion').value=sumar;
$("#total_re").text(sumar.toFixed(2));
document.getElementById('tpendiente').value=sumap;
$("#total_pe").text(sumap.toFixed(2));
}

function FnCreaNuevoCierre() {
  var existe = $('#codcierrediario').val();
  if (existe === '') {
    var sucursal = $('#codsucursal').val();
    var fechacrea = $('#fecha_cierre').val();
    //var fechahoradehoy=$('#fechahoradehoy').val();
    var nusuario = $('#nusuario').val();
    jConfirm("¿Esta seguro de crear nuevo Diario con fecha :" + fechacrea, "Transferencias", function (r) {
      if (r) {
        $.ajax({async: true, type: "POST", dataType: "json", cache: false,
          data: {opt: 'ND', codsucu: sucursal, fechacrea: fechacrea, usuamodi: nusuario},
          url: "controles/ManteCierreDiario.php",
          beforeSend: function () { $('#carga').css({display: 'block'});},
          complete: function () { $('#carga').css('display', 'none');}
        }).done(function (respuesta) {
          $("#codcierrediario").val(respuesta[0].codigo);
          $("#fechacierrediario").val(respuesta[0].fecha);
          $("#fechacierrediario").val($("#fechacierrediario").val().substring(0, 10));
          jWarning("Se creó un Nuevo Diario con fecha: " + $("#fechacierrediario").val().substring(0, 10), "Transferencias - Cierre Diario");
        });
      }
    });
  } else {
    jAlert('Ya existe un Diario, Verifique...', 'Giros - Transferencias');
  }
  return false;
}

function fnMuestraDiario(idfila) {
    var idfila1 = $('#seleldd').val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfila1);
    var color = elTableRow.style.backgroundColor;
    elTableRow.style.backgroundColor = (elTableRow.style.backgroundColor === "#428bca") ? color : '#428bca';
    if (idfila1 !== idfila) {
        elTableRow1.style.backgroundColor = (elTableRow.style.backgroundColor === color) ? '#428bca' : color;
    }
    var elTableCells = elTableRow.getElementsByTagName("td");

    var fecha = elTableCells[0].innerHTML;
    document.getElementById("seleldd").value = idfila;
    $("#saldo_ala_fecha").val(elTableCells[2].innerHTML);
    
    $('#fecha_cierre').val(fecha);
    FnUbicaDiario();
}

function FnCargaDetalle(){
var existe = $('#codcierrediario').val().trim();
if (existe !== ''){
    /* FnCargaIngresos(); */
    fnMuestraIngresos();
    /* FnCargaEgresos(); */
    fnMuestraEgresos();
    FnMuestraCierre( $('#fecha_cierre').val(),'T');
    FnCargaListaDiarios();
       
    FnCalculaTotales();
    $('#btn_nuevo').css('display','none');
    $('#btn_vergiros').css('display','none');
    } else {
        jWarning('Debe CREAR un nuevo Diario...:', 'Transferencias');        
        $('#btn_nuevo').css('display','block');
        fnLimpiaTabla();
    }
}  

function CreaTablaListaDiario( datos ){
var html;
var i = 0;
for(var contador=0; contador < datos.length; contador++) {
        i=contador+1;   
        html += "<tr id='LD[" + contador + "]' class='dato' onclick='RecuperaFilaDiario(this.id);' ondblclick='fnMuestraDiario(this.id);' >";
        html += "<td >"                 + datos[contador].fecha_diario + " </td>";
        html += "<td class='ocultame' >"                 + datos[contador].cod_diario + "</td>";
        html += "<td align='right'>"    + datos[contador].saldo_i + "</td>";
        html += "<td align='right'>"    + datos[contador].saldo_f + "</td>";
        html += "<td >"                 + datos[contador].estado + "</td>";
        html += "<td >"+ " <button id= "+ datos[contador].cod_diario + " onclick='MuestraPDF(this.id);'  title='Ver PDF' type='button' aria-hidden='true' class='btn btn-default btn-xs' ><span class='fa fa-file-text green'></span></button>" + "</td>";
        html += "</tr>";
      }                 
      $("#body_listadiario").html( html );
      //TotalEgresos();
}

function FnCargaListaDiarios(){
if ( $("#codcierrediario").val().trim() !== "" ){    
    $.ajax({async: true,type: "POST",dataType: "json",cache: false,
      data: {opt: 'LISTA',codsucu: $("#codsucursal").val(), fecha: $('#fecha_cierre').val() },      
      url: "controles/ManteCierreDiario.php",
      beforeSend:function(){ $('#carga').css({display:'block'}); },
      complete:function(){$('#carga').css('display','none'); },
      success:  CreaTablaListaDiario
      });
  }  
}

function FnMuestraCierre(fechacierre, opt) {
    if ($('#codcierrediario').val().trim() !== "") {
        var sucursal = $('#codsucursal').val();
        var d = new Date();
        var nuevodia=d.getDate();
        var nuevomes = d.getMonth();
        nuevomes=nuevomes+1;
        if (nuevodia < 10) {
            nuevodia = '0' + nuevodia;
        }
        if (nuevomes < 10) {
            nuevomes = '0' + nuevomes;
        }
        var fecha_hoy = d.getFullYear() + "/" + (nuevomes) + "/" + nuevodia;        
        var fecha_cierre = $("#fecha_cierre").val();
        console.log(nuevodia);
        console.log(fecha_hoy);
        console.log(fecha_cierre);
        console.log(fechacierre);
        if (fecha_hoy == fecha_cierre) {
            $.ajax({async: true, type: "POST", dataType: "json", cache: false,
                data: {sucursal: sucursal, fecha: fechacierre, opt: opt},
                url: "controles/ManteCierreDiario.php",
                beforeSend: function (objeto) {$('#carga').css({display: 'block'});},
                success: CreaTablaTransferencias,
                complete: function () {$('#carga').css('display', 'none');}
            });
        } 
        if (fecha_cierre<fecha_hoy){
            $.ajax({async: true, type: "POST", dataType: "json", cache: false,
                data: {sucursal: sucursal, fecha: fecha_cierre, opt:'TA'},
                url: "controles/ManteCierreDiario.php",
                beforeSend: function (objeto) {$('#carga').css({display: 'block'});},
                success: CreaTablaTransferencias,
                complete: function () {$('#carga').css('display', 'none');}
            });
        }
    } // endif codcierrediario
    return false;
}

function CreaTablaTransferencias( json ){
var html;
var i=0;

    for(var contador=0; contador < json.length; contador++) {
        i=contador+1;   
        html += "<tr id='R[" + contador + "]' class='dato'>";
            html += "<td >" +  i +  "</td>";        
            html += "<td >" + json[contador].cod_girosucu +         "</td>";
            html += "<td >" + json[contador].cod_sucursald +        "</td>";
            html += "<td >" + json[contador].fechahora_registro +   "</td>";
            html += "<td >" + json[contador].fechahora_entrega +    "</td>";
            html += "<td >" + json[contador].beneficiario +         "</td>";
            html += "<td >" + json[contador].remitente +            "</td>";
            html += "<td align='right'>" + json[contador].entregado +   "</td>";
            html += "<td align='right'>" + json[contador].recibido +    "</td>";
            html += "<td align='right'>" + json[contador].pendiente +   "</td>";        
        html += "</tr>";
      } 
      $("#body_giros").html( html );
      TotalesTransferencias();
      FnCalculaTotales();

      $('#transferencias').dataTable({
        "fnDrawCallback": function (oSettings) {
          // Need to redo the counters if filtered or sorted 
          if (oSettings.bSorted || oSettings.bFiltered) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++)
            { $('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr).html(i + 1);}
          }
        },
        "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
        "aaSorting": [[1, 'asc']], "sScrollY": ($(window).height() / 2 - 40), "bPaginate": false,
        "bLengthChange": false, "bFilter": false, "bSort": true,
        "bInfo": false, "bAutoWidth": true, "bSortClasses": false //, "bJQueryUI": true
      });
      
}

function TotalIngresos() {
var sumai = 0;
$('#IngresosDet tr.dato').each(function(){ //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas                                                                                                                                    
    sumai += parseFloat($(this).find('td').eq(7).text()||0,10); //numero de la celda 6*/        
});
document.getElementById('tingresos').value=sumai;
$("#total_i").text(sumai.toFixed(2));
$('#total_i').priceFormat({
   prefix: '',
    centsSeparator: '.',
    thousandsSeparator: ','
});
}

function TotalEgresos() {
  var sumaeg = 0;
  $('#EgresosDet tr.dato').each(function () { //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas                                                                                                                                    
    sumaeg += parseFloat($(this).find('td').eq(7).text() || 0, 10); //numero de la celda 6*/        
  });
  document.getElementById('tegresos').value = sumaeg;
  $("#total_e").text(sumaeg.toFixed(2));
  $('#total_e').priceFormat({prefix: '', centsSeparator: '.', thousandsSeparator: ','});
}


function RecuperaFilaDiario(idfila){
    var idfila1 = $('#seleld').val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfila1);
    var color = elTableRow.style.backgroundColor;
    if (elTableRow1.style.backgroundColor !== 'LightSalmon') {
        elTableRow.style.backgroundColor = (elTableRow.style.backgroundColor === "LightSkyBlue") ? color : 'LightSkyBlue';
        if (idfila1 !== idfila) {
            elTableRow1.style.backgroundColor = (elTableRow.style.backgroundColor === color) ? 'LightSkyBlue' : color;
        }
    }
    var elTableCells = elTableRow.getElementsByTagName("td");

    document.getElementById("seleld").value = idfila;
    document.getElementById("opt_insert").value = ""; //                
    $("#opt_sele").val("sal"); //permite saber que tabla sera actualizada
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
    document.getElementById("masdatos_ing").disabled=false;
    document.getElementById("responsable_ing").disabled=false;
    document.getElementById("ingreso").disabled=false;        
    document.getElementById("masdatos_ing").value="";
    document.getElementById("responsable_ing").value="";
    document.getElementById("ingreso").value="";    
}

function ControlesEg(){
    document.getElementById("masdatos_eg").disabled=false;
    document.getElementById("responsable_eg").disabled=false;
    document.getElementById("egreso").disabled=false;
    document.getElementById("masdatos_eg").value="";
    document.getElementById("responsable_eg").value="";
    document.getElementById("egreso").value="";    
}

function ControlesGuardaI(){
    document.getElementById("masdatos_ing").disabled=true;
    document.getElementById("responsable_ing").disabled=true;
    document.getElementById("ingreso").disabled=true;    
}

function ControlesGuardaE(){
    document.getElementById("masdatos_eg").disabled=true;
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
    $('#masdatos_ing').attr('value','');
    $('#responsable_ing').attr('value','');
    $('#ingreso').attr('value','');
}

function LimpiaCamposDetalleEg(){
    //$('#mas_datos').attr('value','');
    $('#responsable_eg').attr('value','');
    $('#egreso').attr('value','');
}

function fnImprimeDiario() {
  var codsucu = $("#codsucursal").val();
  var fecha = $("#fecha_cierre").val();
  var coddiario = $("#codcierrediario").val();
  var nombresucu = $("#nombresucursal").val();
  var totaling = $("#total_ingresos").val();
  var totalsal = $("#total_egresos").val();
  var saldof = $("#total_saldo").val();
  var nusuario = $("#nusuario").val();
  var tentrega = parseFloat($("#tentrega").val());
  var trecepcion = parseFloat($("#trecepcion").val());
  var tpendiente = parseFloat($("#tpendiente").val());
  var efectivoneto = parseFloat($("#total_saldo").val()) - tpendiente; // parseFloat($("#total_saldo").val())
  window.open(
    "reportes/rptDiario.php?codsucu=" + codsucu + "&fecha=" + fecha + "&coddiario=" + coddiario + "&nombresucu=" + nombresucu + "&tingresos=" +
    totaling + "&tegresos=" + totalsal + "&saldofinal=" + saldof + "&nusuario=" + nusuario + "&tentregados=" + tentrega.toFixed(2) + "&trecibidos=" + trecepcion.toFixed(2) + "&tpendientes=" + tpendiente.toFixed(2) + "&efectivo_neto=" + efectivoneto.toFixed(2), "_blank"
  ); // changed here (cambiado aquí)

}
////////////////////// Document Ready //////////////////////////////
$(document).ready(function(){
// oculta menu lateral  
$("#wrapper").toggleClass("toggled");

$(window).resize(function() {
  $('#transferencias').dataTable().fnDestroy(); 
  var objDataTable = $('#transferencias').dataTable({
          "fnDrawCallback": function (oSettings) {
            // Need to redo the counters if filtered or sorted 
            if (oSettings.bSorted || oSettings.bFiltered) {
              for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++)
              { $('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr).html(i + 1);}
            }
          },
          "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
          "aaSorting": [[1, 'asc']], "sScrollY": ($(window).height() / 2 - 30), "bPaginate": false,
          "bLengthChange": false, "bFilter": false, "bSort": true,
          "bInfo": false, "bAutoWidth": true, "bSortClasses": false //, "bJQueryUI": true
        });
  objDataTable.fnSettings().oScroll.sY = 101;
  objDataTable.fnDraw();
/* 
$('#IngresosDet').dataTable().fnDestroy(); 
  var objDataTable1 = $('#IngresosDet').dataTable({
//          "fnDrawCallback": function (oSettings) {
//            // Need to redo the counters if filtered or sorted 
//            if (oSettings.bSorted || oSettings.bFiltered) {
//              for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++)
//              { $('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr).html(i + 1);}
//            }
//          },
          "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
          "aaSorting": [[1, 'asc']], "sScrollY": ($(window).height() / 2 - 120), "bPaginate": false,
          "bLengthChange": false, "bFilter": false, "bSort": true,
          "bInfo": false, "bAutoWidth": true, "bSortClasses": false //, "bJQueryUI": true
        });
  objDataTable1.fnSettings().oScroll.sY = 101;
  objDataTable1.fnDraw();
  
  $('#EgresosDet').dataTable().fnDestroy(); 
  var objDataTable2 = $('#EgresosDet').dataTable({
//          "fnDrawCallback": function (oSettings) {
//            // Need to redo the counters if filtered or sorted 
//            if (oSettings.bSorted || oSettings.bFiltered) {
//              for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++)
//              { $('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr).html(i + 1);}
//            }
//          },
          "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
          "aaSorting": [[1, 'asc']], "sScrollY": ($(window).height() / 2 - 120), "bPaginate": false,
          "bLengthChange": false, "bFilter": false, "bSort": true,
          "bInfo": false, "bAutoWidth": true, "bSortClasses": false //, "bJQueryUI": true
        });
  objDataTable2.fnSettings().oScroll.sY = 101;
  objDataTable2.fnDraw();
 */

});

//$('#ingreso').validacampos('.0123456789');
//$('#egreso').validacampos('.0123456789');
$('#egreso').priceFormat({
   prefix: '',
    centsSeparator: '.',
    thousandsSeparator: ','
});
$('#ingreso').priceFormat({
   prefix: '',
    centsSeparator: '.',
    thousandsSeparator: ','
});
$('#fraccion').priceFormat({ prefix: 'S/. ', centsSeparator: '.', thousandsSeparator: ','});

$('#total_saldo').priceFormat({
   prefix: '',
    centsSeparator: '.',
    thousandsSeparator: ','
});

$('#span_abierto').css('display','none');
$('#span_cerrado').css('display','none');
$('#total_ingresos').attr('value','0');
$('#total_egresos').attr('value','0');
$('#total_saldo').attr('value','0');
$('#recarga_dataTables').val('N');
//fnReiniciaDataTablesIng();
$("#btn_inserta_fraccion" ).tooltip({ 
  show: {effect: "explode", delay: 250 }, 
  position: { my: "left top", at: "right+5 top-5"} });

ControlesGuardaI();
ControlesGuardaE();
ActivaControles('G');
//ResizeDivG(); ResizeDivI(); ResizeDivE(); 
ResizeDivD();

$("#div_txt_ingreso").toggle(700);

$("#div_txt_egreso").toggle(700);

$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

$("#imprimediario__").click(function () {
  console.log($("#tpendiente").val());
  if ($("#codcierrediario").val() !== "") {
    jConfirm(
      "¿Se imprimira DIARIO con fecha:\n" + $("#fechacierrediario").val(), "Monry - Flash",
      function (r) {
        if (r) {
          var codsucu = $("#codsucursal").val();
          var fecha = $("#fecha_cierre").val();
          var coddiario = $("#codcierrediario").val();
          var nombresucu = $("#nombresucursal").val();
          var totaling = $("#total_ingresos").val();
          var totalsal = $("#total_egresos").val();
          var saldof = $("#total_saldo").val();
          var nusuario = $("#nusuario").val();
          var tentrega = parseFloat($("#tentrega").val());
          var trecepcion = parseFloat($("#trecepcion").val());
          var tpendiente = parseFloat($("#tpendiente").val());
          var efectivoneto = parseFloat($("#total_saldo").val()) - tpendiente; // parseFloat($("#total_saldo").val())
          window.open(
            "reportes/rptDiario.php?codsucu=" + codsucu +  "&fecha=" + fecha + "&coddiario=" + coddiario + "&nombresucu=" + nombresucu + "&tingresos=" +
              totaling + "&tegresos=" + totalsal + "&saldofinal=" + saldof + "&nusuario=" +  nusuario + "&tentregados=" + tentrega.toFixed(2) +  "&trecibidos=" + trecepcion.toFixed(2) + "&tpendientes=" + tpendiente.toFixed(2) + "&efectivo_neto=" + efectivoneto.toFixed(2), "_blank"
          ); // changed here (cambiado aquí)
        }
      }
    );
  } else {    jAlert("Seleccione Diario a imprimir, verifique...", "Transferencias"); }
});
 
$("#imprime_ing").click(function(){
console.log($("#codcierrediario").val());
console.log($("#correlativo_img").val());
if ($("#estado").val() !== 'CERRADO') {    
    var ingreso = $("#ingreso").val();
    if($("#codcierrediario").val() !== '' && ingreso>0){
        jConfirm("¿Se imprimira Recibo de Ingresos :\n"+ txt_concepto +' --> '+$("#ingreso").val() , "Transferencias", function(r) {
            if(r) { 
            var codsucu = $("#codsucursal").val();            
            var id_diariodetalle = $("#correlativo_img").val();            
            var num_letras = covertirNumLetras(ingreso);
            //var concepto = $("#lista_conceptos_ing").val()+'-'+$("#masdatos_ing").val();
            var usuario =  $("#nusuario").val();
            var opt = 'IN';
            window.open('ImprimeIngresosEgresos.php?iddiariodetalle='+id_diariodetalle+'&codsucu='+ codsucu +'&tipo='+ "cliente"+'&nick='+usuario+'&ingsal='+opt,'_blank');  // changed here (cambiado aquí)
            window.open('ImprimeIngresosEgresos.php?iddiariodetalle='+id_diariodetalle+'&codsucu='+ codsucu +'&tipo='+ "cajero" +'&nick='+usuario+'&ingsal='+opt,'_blank');  // changed here (cambiado aquí)
            }
          });      
    } else { jAlert ('Seleccione item a imprimir, verifique...','Transferencias'); }     
} 
 }); 
 
$("#imprime_eg").click(function () {
 if ($("#estado").val() !== 'CERRADO') {   
        var egreso = $("#egreso").val();
        if ($("#codcierrediario").val() !== '' && egreso > 0) {
            jConfirm("¿Se imprimira Recibo de Egresos :\n" + txt_concepto + ' --> ' + $("#egreso").val(), "Transferencias", function (r) {
                if (r) {
                    var codsucu = $("#codsucursal").val();
                    var id_diariodetalle = $("#correlativo_img").val();
                    var num_letras = covertirNumLetras(egreso);
                    //var concepto = $("#lista_conceptos").val()+'-'+$("#masdatos_eg").val();                    
                    var usuario =  $("#nusuario").val();
                    var opt = 'SA';
                     window.open('ImprimeIngresosEgresos.php?iddiariodetalle='+id_diariodetalle+ '&codsucu='+ codsucu + '&tipo='+ "cliente" + '&nick='+usuario+'&ingsal='+opt,'_blank');
                     window.open('ImprimeIngresosEgresos.php?iddiariodetalle='+id_diariodetalle+ '&codsucu='+ codsucu + '&tipo='+ "cajero" + '&nick='+usuario+'&ingsal='+opt,'_blank');
                }
            });
        } else {
            jAlert('Seleccione item a imprimir, verifique...', 'Transferencias');
        }
}    
});
// fecha en Español
$(function($){
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});
 
$("#fecha_cierre").datepicker({dateFormat: 'yy/mm/dd',showOn: 'both',buttonImageOnly: true,changeYear: true,
        buttonImage: 'img/calendar.ico',
        beforeShow: function(){$(".ui-datepicker").css('font-size', 12);},
        numberOfMonths: 1,
        
        onSelect: function (dateText){
          FnUbicaDiario( );
        }              
   }); 

$("#dialogo_lista_diarios").dialog({autoOpen: false, resizable: true,
        modal: true, height: 440, width: 380,
        open: function (event, ui) {
            var ntitulo = "Cierres diario disponibles";
            $("span.ui-dialog-title").css("font-size", 10);
            $("span.ui-dialog-title").text(ntitulo);
                      
        },
        buttons: {
            '<<Regresar': function () {
                $("#tabla_cuentas").css("display", "none");
                $("#tabla_bancos").css("display", "block");
               
            },
            'Descargar': function () {
                
            },
            'Cancelar': function () {
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            $("#tabla_cuentas").css("display", "none");
            $("#tabla_bancos").css("display", "block");
        }
    });

////////////////////////////// CLICK ////////////////////////////////////////
$("#btn_cancelaing").click(function(){
   $("#div_txt_ingreso").toggle(700);
   LimpiaIng();
});

$("#nuevo_ing").click(function(){
   $("#div_txt_ingreso").toggle(700);
   $("#lista_conceptos_ing").prop("selectedIndex", 0);
   LimpiaIng();
   $("#div_txt_egreso").css('display','none');
});

$("#inserta_ing").click(function(){
   FnInsertaIngresos();   
}); 
 
$("#btn_cancelaeg").click(function(){
   $("#div_txt_egreso").css("display","none");
   $("#div_sucursales").css("display","none");
   $("#div_agente_asociado").css("display","none");
   $("#div_asociado").css("display", "none");   $("#txt_asociado").val("");
   $("#div_agente").css("display", "none");     $("#txt_agente").val("");
   $("#lista_sucursales").prop("selectedIndex", 0);
   $("#lista_conceptos").prop("selectedIndex", 0);
   LimpiaIng();
});

$("#nuevo_eg").click(function(){
   $("#div_txt_egreso").toggle(700);
   $("#lista_conceptos").prop("selectedIndex", 0);
   $('#responsable_eg').attr("disabled",false);
   LimpiaEg();
});

$("#inserta_eg").click(function() {
  FnInsertaEgresos();
});
 
$('#btn_nuevo').click(function(){
    /* FnCreaNuevoCierre(); */
  jAlert("Cierra todo y vuelve a ingresar..., verifique...","Money - Flash");
}); 
 
$("#btn_cerrar").click(function(){
   FnCierreDiario(); 
});
 
$("#btn_span").click(function(){
     if ( $("#fechadehoy").val() === $("#fecha_cierre").val() ){
         FnAbreDiario();
     }else {
        if ($("#tusuario").val() === 'ADMIN'){
            FnAbreDiario();
        } else {
          jWarning("Solicite al ADMINSTRADOR","Giros - Transferencias");
        }
     }        
});
 
$("#btn_actualizasaldos").click(function(){
   jConfirm("¿Esta seguro de Recalcular ? \n Los SALDOS se MODIFICARAN desde: "+ $("#fecha_cierre").val()+"-> Hacia ADELANTE", "Giros - Transferencias", function(r) {
        if(r) 
        {
            fnActualizaSaldos();
       }
   });    
});

$("#btn_dinero").click(function(){
    if ( $("#codcierrediario").val().trim() !== "" ) {
        //alert($("#codcierrediario").val());
        $("#dialogo_dinero").dialog("open");
    } else {
        jWarning("Debe crear un nuevo Diario","Giros - Transferencias");
    }
});

$("#dialogo_dinero").dialog({autoOpen: false, resizable: true, modal: true,
    height: 600, width: 360,
    show: {effect: "blind", duration: 700},
    hide: {effect: "fade", duration: 700},
    open: function (event, ui) {
      var ntitulo = "Dinero de:" + $('#codcierrediario').val() + '// Fecha:' + $('#fecha_cierre').val();
      $("span.ui-dialog-title").css("font-size", 10);
      $("span.ui-dialog-title").text(ntitulo);
      fnCargaDinero();
    },
    close: function (event, ui) {
      var html;
      $("#tbody_masdatos").html(html);
    }
  });
        
$("#dialogo_distribucion").dialog({autoOpen: false, resizable: true, modal: true,
    height: 450, width: 510,
    show: {effect: "fade", duration: 500},
    hide: {effect: "fade", duration: 500},
    open: function (event, ui) {
      var ntitulo = "Distribuir: S/. " + $('#ingreso').val();
      $("span.ui-dialog-title").css("font-size", 12);
      $("span.ui-dialog-title").text(ntitulo);
      $("#lista_asociados").prop("selectedIndex", 0);
      $("#lista_agentes").prop("selectedIndex", 0);
      $("#opciones_distribucion").prop("selectedIndex", 0);
      $("#txt_fraccion_distro").val("");
      ListaDistro( $("#id_detalle").val() );
	  //console.log($("#id_detalle").val());
    },
//    buttons: {
//      'Aplicar Distribución': function () {        fnAplicaDistribucion();      },
//      'Cancelar Distribución' : function () {        CancelaDistro();      }
//    },
    close: function (event, ui) {
//      $("#tabla_cuentas").css("display", "none");
//      $("#tabla_bancos").css("display", "block");
    }
  });

$("#dialogo_asociados").dialog({autoOpen: false, resizable: true, modal: true,
    height: 480, width: 350,
    show: {effect: "blind", duration: 700},
    hide: {effect: "fade", duration: 700},
    open: function (event, ui) {
      var ntitulo = "Selecciona Asociados " + $('#fecha_cierre').val();
      $("span.ui-dialog-title").css("font-size", 10);
      $("span.ui-dialog-title").text(ntitulo);
      fnMuestraUsuarioCuenta('XXX','G');
    },
    close: function (event, ui) {
      var html;
      $("#tbody_masdatos").html(html);
    /*   LimpiaEg(); */
    }
  });

$("#dialogo_agentes").dialog({autoOpen: false, resizable: true, modal: true,
    height: 480, width: 500,
    show: {effect: "blind", duration: 700},
    hide: {effect: "fade", duration: 700},
    open: function (event, ui) {
      var ntitulo = "Selecciona Agentes " + $('#fecha_cierre').val();
      $("span.ui-dialog-title").css("font-size", 10);
      $("span.ui-dialog-title").text(ntitulo);
      fnMuestraUsuarioAgente();
    },
    close: function (event, ui) {
      var html;
      $("#tbody_masdatos").html(html);
   /*    LimpiaEg(); */
    }
  });

/*  ************** dialogos  *******************   */

$("#imprime_dinero").click(function(){
    var confirma_impresion=VerificaImprimirDinero();
   //$('#d_diferencia').css('background-color', 'white');
   if (confirma_impresion === 'SI'){
   $('#d_diferencia').css('color', 'white');
   imprSelec("dialogo_dinero");
   }
});

$("#div_sucursales").css("display","none");
$("#div_asociado").css("display","none");
$("#div_agente").css("display","none");

var optionSelectedAgt;
$("#lista_conceptos").change( function (){
  optionSelectedAgt = $('#lista_conceptos').val();
  console.log(optionSelectedAgt);
        if (optionSelectedAgt === '20') { // SALIDA DE EFECTIVO A OTRA SUCURSAL
            $("#div_sucursales").toggle(700);
            $("#lista_sucursales").prop("selectedIndex", 0);
        } else {
            $("#div_sucursales").css("display", "none");
            $("#lista_sucursales").prop("selectedIndex", 0);
        }
        if (optionSelectedAgt === '35') { // SALIDA DE EFECTIVO A Asociado
            $("#dialogo_asociados").dialog("open");
            $("#div_asociado").toggle(700);            
            //console.log(optionSelected);
        } else {
            $("#div_asociado").css("display", "none");
            $("#txt_asociado").val("");
        }
        if (optionSelectedAgt === '36') { // SALIDA DE EFECTIVO A Agentes
            $("#dialogo_agentes").dialog("open");
            $("#div_agente").toggle(700);
        } else {
            $("#div_agente").css("display", "none");
            $("#txt_agente").val("");
        }
        if (optionSelectedAgt === '70') { // TRANSFERENCIAS DE EFECTIVO>>AGENTE
            $("#dialogo_agentes").dialog("open");
            $("#div_agente").toggle(700);
        } else {
            $("#div_agente").css("display", "none");
            $("#txt_agente").val("");
        }
});

$("#lista_conceptos").click(function () {
    LimpiaEg(); 
});

$("#lista_sucursales").change( function (){
  var optionSelected = $('#lista_sucursales').val();
  sucudestino=$('#lista_sucursales option:selected').html();
  $("#extradata").val($("#codsucursal").val());
  
  if (optionSelected === $('#codsucursal').val() ) { // SALIDA DE EFECTIVO A OTRA SUCURSAL
    $("#lista_sucursales").prop("selectedIndex", 0);
  }
  //alert(sucudestino);
  $('#responsable_eg').attr("disabled",true);
});

$("#opciones_distribucion").change( function (){
  var optionSelected = $('#opciones_distribucion').val();
  if (optionSelected === 'A' ) { // SALIDA DE EFECTIVO A OTRA agente
    $("#lista_agentes").toggle(700);
    $("#lista_asociados").css("display","none");
	$("#lista_sucursales_distro").css("display","none");
    $("#cuenta_destino").val($("#lista_agentes").val());
    //alert( $("#cuenta_destino").val() );
    $("#lista_agentes").prop("selectedIndex", 0);
	//$("#lista_sucursales_distro").prop("selectedIndex", 0);
  }
  if (optionSelected === 'U' ) { // SALIDA DE EFECTIVO A OTRA Asociado
    $("#lista_asociados").toggle(700);
    $("#lista_agentes").css("display","none");
	$("#lista_sucursales_distro").css("display","none");
    $("#cuenta_destino").val($("#lista_asociados").val());
    //alert( $("#cuenta_destino").val() );
    $("#lista_asociados").prop("selectedIndex", 0);
  }
  if (optionSelected === 'S' ) { // SALIDA DE EFECTIVO A OTRA SUCURSAL
    $("#lista_sucursales_distro").toggle(700);
    $("#lista_agentes").css("display","none");
	$("#lista_asociados").css("display","none");
    $("#cuenta_destino").val($("#lista_sucursales_distro").val());
    //alert( $("#cuenta_destino").val() );
    $("#lista_sucursales_distro").prop("selectedIndex", 0);
  }
  if (optionSelected === '0' ) { // no elige ninguno
    $("#lista_asociados").css("display","none");
    $("#lista_agentes").css("display","none");
	$("#lista_sucursales_distro").css("display","none");
    $("#cuenta_destino").val("");
    //alert( $("#cuenta_destino").val() );
  }
  console.log(optionSelected);
});

$("#btn_inserta_distro").click(function(){
  if ($("#opciones_distribucion").val()==='Agente'){
    $("#cuenta_destino").val($("#lista_agentes").val());
  }
});

$("#btn_distribucion").click(function () {
    if ($("#id_detalle").val().trim() !== "") {
      if ($("#id_concepto_i").val().trim() === "17") {
        $("#dialogo_distribucion").dialog("open");
      }
    } else {
      jWarning("Debe Seleccionar Ingreso a Distribuir ", "Giros - Transferencias");
    }
	console.log();
  });

$("#btn_inserta_fraccion").click(function () {
    var existe,posible;
    if ($("#opciones_distribucion").val() === 'A') {
      existe = BuscaEnTablaDistro($("#lista_agentes").val());
      if ($("#lista_agentes").val() === existe) {
        jWarning("Cuenta ya Existe, verifique...", "Giros - Transferencias");
      }
      else {
        if (parseFloat($("#txt_fraccion_distro").val().trim()) === 0 || $("#lista_agentes").val() === '0') {
          jWarning("Datos incorrectos..., verifique", "Giros - Transferencias");
          $("#txt_fraccion_distro").focus();
        } else {          
          posible=VerificaFraccion();
          if ( posible === 'SI' ){
            $("#txt_fraccion_distro").val($("#txt_fraccion_distro").val().replace(",", ""));
            $("#dialogo_distribucion").dialog("close");
            $("#lista_agentes").css("display", "none");
            InsertaItmDistro($("#lista_agentes").val());
          } else { jAlert("esta EXCEDIENDO \n El monto a Distribuir es: S/. "+$('#ingreso').val(),"Distribución");}
        }
      }
    }

    if ($("#opciones_distribucion").val() === 'U') {
      existe = BuscaEnTablaDistro($("#lista_asociados").val());
      if ($("#lista_asociados").val() === existe) {
        jWarning("Cuenta ya Existe, verifique...", "Giros - Transferencias");
      }
      else {
        if (parseFloat($("#txt_fraccion_distro").val().trim()) === 0 || $("#lista_asociados").val() === '0') {
          jWarning("Datos incorrectos..., verifique", "Giros - Transferencias");
          $("#txt_fraccion_distro").focus();
        } else {
          posible=VerificaFraccion();
          if ( posible === 'SI' ){
            $("#txt_fraccion_distro").val($("#txt_fraccion_distro").val().replace(",", ""));
            $("#dialogo_distribucion").dialog("close");
            $("#lista_asociados").css("display", "none");
            InsertaItmDistro($("#lista_asociados").val());
          } else { jAlert("esta EXCEDIENDO \n El monto a Distribuir es: S/. "+$('#ingreso').val(),"Distribución");}
        }
      }
    }
	
	if ($("#opciones_distribucion").val() === 'S') {
      existe = BuscaEnTablaDistro($("#lista_sucursales_distro").val());
      if ($("#lista_asociados").val() === existe) {
        jWarning("Sucursal ya Existe, verifique...", "Giros - Transferencias");
      }
      else {
        if (parseFloat($("#txt_fraccion_distro").val().trim()) === 0 || $("#lista_sucursales_distro").val() === '0') {
          jWarning("Datos incorrectos..., verifique", "Giros - Transferencias");
          $("#txt_fraccion_distro").focus();
        } else {
          posible=VerificaFraccion();
          if ( posible === 'SI' ){
            $("#txt_fraccion_distro").val($("#txt_fraccion_distro").val().replace(",", ""));
            $("#dialogo_distribucion").dialog("close");
            $("#lista_sucursales_distro").css("display", "none");
            InsertaItmDistro_S($("#lista_sucursales_distro").val());
          } else { jAlert("esta EXCEDIENDO \n El monto a Distribuir es: S/. "+$('#ingreso').val(),"Distribución");}
        }
      }
    }
  });
  
$("#btn_cancela_distro").click(function () {
    fnCancelaDistro(); 
});
  
$("#btn_aplica_distro").click(function () {
    fnAplicaDistribucion();
});

$('#txt_fraccion_distro').priceFormat({ prefix: '', centsSeparator: '.', thousandsSeparator: ','});

$("#dialogo_asigcuenta").dialog("open");

$("#dialogo_recibo_img").dialog({
    autoOpen: false,
    resizable: true,
    modal: true,
    height: 500,
    width: 400,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "fade", duration: 500 },
    open: function (event, ui) {
      var ntitulo = "Imprimir Voucher";
      $("span.ui-dialog-title").css("font-size", 12);
      $("span.ui-dialog-title").text(ntitulo);
    },
    close: function (event, ui) {},
  });

    $("#dialogo_carga_recibos").dialog({
      autoOpen: false,
      resizable: true,
      modal: true,
      height: 500,
      width: 400,
      show: { effect: "blind", duration: 500 },
      hide: { effect: "fade", duration: 500 },
      open: function (event, ui) {
        var ntitulo = "Cargar Recibos Ingresos y Salidas";
        $("span.ui-dialog-title").css("font-size", 10);
        $("span.ui-dialog-title").text(ntitulo);
      },
    });

    var uploadObj = $("#fileuploader").uploadFile({
      url: "php/upload.php", //url donde se enviará la petición
      multiple: false, //defino que no se puedan arrastrar y soltar mas de 1 archivo
      allowedTypes: "png,jpg,jpeg,pdf", // extensiones permitidas
      fileName: "myfile", //nombre del archivo a enviar por $_Files
      showDelete: false, //mostrar botón eliminar
      showDone: false, //ocultar botón de Hecho
      showProgress: true, //mostrar barra de progreso
      showPreview: true, //mostrar previsualización de las imagenes a cargar
      previewHeight: "150px",
      previewWidth: "100px",
      autoSubmit: false, //deshabilitar el envio del archivo automaticamente, para poder ser enviado se utiliza la función startUpload()
      showStatusAfterSuccess: true, //mostrar estado despues de haber cargado correctamente las imagenes
      //maxFileCount: 1, //número máximo de archivos a subir
      maxFileSize: 3145728, //tamaño máximo permitido de los archivos en bytes, en MB: 3MB
      maxFileCountErrorStr:
        "Acción no permitida, el número máximo de archivos a subir es: ", //string que aparece al momento de tener un error del número máximo de archivos
      dragDropStr: "<span><b>. ---</b></span>", //string que aparece al momento de tener un error de arrastrar y soltar varios archivos cuando la opción multiple está en false
      sizeErrorStr: "Acción no permitida, el tamaño máximo del archivo es: ", //string que aparece cuando los archivos superan el tamaño máximo permitido
      extErrorStr: "Acción no permitida, las extensiones válidas son: ", //string que aparece cuando existe un error en las extensiones de los archivos a cargar
      cancelStr: "Cancelar", //string del botón cancelar
      uploadStr: "Buscar Recibo", //string del botón cancelar
      uploadButtonClass: "btn btn-info", //clase del botón de carga, se definió una clase de bootstrap
      dragdropWidth: "300px", //defino el ancho del area donde se arrastra y sueltan los archivos
      statusBarWidth: "300px", //defino el acho de la barra de estado.
      //Datos del formulario dinámico, estos son los datos que se envian además de las imagenes, se recuperan con
      returnType: "json",
      maxFileSize: 1024 * 5120,
      //maxFileCount:5,
      showDelete: true,
      deleteCallback: function (data, pd) {
        for (var i = 0; i < data.length; i++) {
          $.post(
            "php/delete.php",
            { op: "delete", name: data[i] },
            function (resp, textStatus, jqXHR) {
              //Show Message
              console.log("File Deleted");
              jAlert("Archivo Eliminado...", "Transferencia de Archivos");
            }
          );
        }
        pd.statusbar.hide();
      },
      onSuccess: function (files, data, xhr, pd) {
        fnInsertaRecibo();
        pd.statusbar.hide();
      },
      onError: function (files, status, errMsg, pd) {
        //$("#eventsmessage").html($("#eventsmessage").html()+"<br/>Error for: "+JSON.stringify(files));
        jAlert(
          "Error al cargar archivos, Verifique...",
          "Transferencia de Archivos"
        );
      },
    });

    $('#btn_guarda_recibos').click(function () {
        if ($("#descripcion_recibos_img").val().trim() !== '') {
            uploadObj.startUpload();
        } else {
            jAlert("Falta descripcion... ", "Transferecnias")
        }
    });

$("#btn_imprime_recibo").click(function () {
    var mode = "iframe";
    var close = mode === "popup";
    var options = { mode: mode, popClose: close };
    $("div.printableArea").printArea(options);
    /*fnRegistraImpresionVoucher();*/
  });

/* =========================================================== */
/* ================ guardar imagenes ========================= */
$("#btn_carga_reciboS").click(function () {

  if ($("#opt_sele").val().trim() == "salida") {
    console.log('hola'+$("#nombre_archivo").val());
    if ($("#nombre_archivo").val().trim() === "XXX") {
      $("#imageModal").dialog("open");
    }
  } else {
    jAlert("Seleccione una SALIDA...", "Money Flash");
  }
});

 $("#btn_carga_reciboI").click(function () {
   if ($("#opt_sele").val().trim() == "ing") {
     if ($("#nombre_archivo").val().trim() === "XXX") {
       $("#imageModal").dialog("open");
     }
   } else {
     jAlert("Seleccione un INGRESO...", "Money Flash");
   }
 });

    $("#imageModal").dialog({
      autoOpen: false,
      modal: true,
      width: 500,
      height: 400,
      resizable: false,
      buttons: {
        Salir: function () {
          $("#uploadPreview").empty();
          /* $("#imageModal").dialog("close"); */
        },
      },
      close: function (event, ui) {
        $("#uploadPreview").empty();
      },
      open: function (event, ui) {
        ServerDate();
      },
    });

    $("#imageModal_View").dialog({
      autoOpen: false,
      modal: true,
      width: 500,
      height: 400,
      resizable: false,
      close: function (event, ui) {
        $("#imagePreview").empty();
        $("#deleteBtn").remove();
        $("#printBtn").remove();
      },
      open: function (event, ui) {
        /* var NombreArchivo = $("#datos_cuenta").val(); */
        MuestraCambiaImagen() 
      },
    });

    $('#fileInput').on('change', function(e) {
        let file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                $('#uploadPreview').html('<img src="' + e.target.result + '" alt="Preview">');
            }
            reader.readAsDataURL(file);
        }
    });

    $('#uploadBtn').on('click', function() {
        let fileInput = $('#fileInput')[0];
        if (fileInput.files.length === 0) {
            alert('Por favor, selecciona una imagen primero.');
            return;
        }
        let file = fileInput.files[0];
        var valor1 = $("#server_date").val();
        var valor2 = $("#correlativo_img").val();
        newFileName = valor1 + '_' + valor2;
        var micarpeta = "uploads_recibos"
        console.log(newFileName);
        /* let newFileName = $('#datos_cuenta').val() || file.name; */
        let formData = new FormData();
        formData.append('image', file);
        formData.append('newFileName', newFileName);
        formData.append('micarpeta', micarpeta);
        $.ajax({
            url: 'php/upload_recibos.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                alert(response);
                fnInsertaRecibos(newFileName);
                $('#fileInput').val('');
                $('#newFileName').val('');
                $('#uploadPreview').empty();
                $('#datos_cuenta').val('');
                $("#correlativo_img").val()
                $("#imageModal").dialog("close");
            },
            error: function() {
                alert('Error al cargar la imagen.');
            }
        });
    });

    $("#searchBtn").on("click", function () {

    });

    $("#btn_anula_egresos").click(function () {
      console.log('Anulando egresos...');
      fnAnulaMovsCierreDiario();
    });
    $("#btn_elimina_ingresos").click(function () {
      console.log('Anulando egresos...');
      fnAnulaMovsCierreDiario();
    });

FnUbicaDiario();

FechaServidor();

}); // FIN DcoReady 
/* ============== FIN Document Ready ========================= */
function ServerDate() {
  $.ajax({
    url: "php/get_server_date.php",
    method: "GET",
    dataType: "json",
    success: function (response) {
      $("#server_date").val(response.server_date);
      console.log('funcion'+$("#server_date").val());
      var fechaOriginal = $('#server_date').val();
      var fechaSinGuiones = fechaOriginal.replace(/-/g, '');
      $("#server_date").val(fechaSinGuiones);
      console.log('funcion'+$("#server_date").val());
    },
    
  });
}

function fnInsertaRecibos(newFileName) {
  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: {opt: 'RECIBO', id_detalle: $("#correlativo_img").val(), nom_archivo: newFileName, usuariocarga: $('#nusuario').val(),
      descripcion: $('#descripcion_recibos_img').val(), op: 'I'  },
    url: "controles/ManteCierreDiario.php",
    success: function () {
      jAlert("Archivo Cargado, Verifique...", "Transferencia de Archivos");
      $("#correlativo_img").val("");
      if ($('#opt_sele').val() === "ing") {
        fnMuestraIngresos();
      } else {
        fnMuestraEgresos();

      }
    }
  });
  return false;
}

function fnAnulaRecibos() {
  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: {opt: "RECIBO", id_detalle: $("#correlativo_img").val(), nom_archivo: $("#usuariosistema").val(), usuariocarga: $('#nusuario').val(), 
            descripcion: $("#descripcion_recibos_img").val(), op: "A" },
    url: "controles/ManteCierreDiario.php",
    success: function () {
    $("#correlativo_img").val("");
    },
  });
  return false;
}

function MuestraCambiaImagen() {
  /* let searchFileName = $("#searchFileName").val(); */
  let searchFileName = $("#nombre_archivo").val().trim();
  if (!searchFileName) {
    alert("Por favor, ingresa un nombre de archivo para buscar.");
    return;
  }
  $.ajax({
    url: "php/search_recibos.php",
    type: "GET",
    data: { fileName: searchFileName},
    success: function (response) {
      if (response === "not found") {
        alert("Imagen no encontrada.");
      } else {
        console.log(response);
        $("#imagePreview").html('<img src="' + response + '" alt="Imagen encontrada">');
        $('<button id="deleteBtn">Eliminar</button>').insertAfter("#imagePreview");
        $('<button id="printBtn">Imprimir</button>').insertAfter("#imagePreview");
        $("#nombre_archivo").val("");

        $("#deleteBtn").on("click", function () {
        if ( $("#tusuario").val() === "ADMIN"){ 
          if (confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
            $.ajax({
              url: "php/delete_recibos.php",
              type: "POST",
              data: { fileName: searchFileName },
              success: function (deleteResponse) {
                alert(deleteResponse);
                $("#imagePreview").empty();
                $("#deleteBtn").remove();
                $("#printBtn").remove();
                $("#imageModal_View").dialog("close");
                fnAnulaRecibos();
                 if($('#opt_sele').val()==="ing"){
                  fnMuestraIngresos();
                  } else {
                    fnMuestraEgresos();
                  }
              },
              error: function () {
                alert("Error al eliminar la imagen.");
              },
            });
          }
        } else {
            jError('No tienes permiso, comunicate con el Administrador...', 'Giros - Transferencias');
          }
        });
        $("#printBtn").on("click", function () {
          if (confirm("¿Estás seguro de Imprimir esta imagen?")) {
            var mode = "iframe";
            var close = mode === "popup";
            var options = { mode: mode, popClose: close };
            $("div.printableArea").printArea(options);
          }
        });
      }
    },
    error: function () {
      alert("Error al buscar la imagen.");
    },
  });
} 

function fnImagenModalView_Open() {
    $("#imageModal_View").dialog("open");
  }
/* ======= fin mante imagenes ======================
==================================================== */
var sucu_destino;

function FnInsertaFraccion() {
  $.ajax({async: true, type: "POST", dataType: "json", cache: false,
    data: {opt: 'INSERTA_FRACCION', iddetalle: $("#id_detalle").val(), fraccion: $("#txt_fraccion_distro").val(), nrocuenta_destino: $("#cuenta_destino").val(),
      fecha_mov: $("#fechacierrediario").val(), usuario: $("#nusuario").val()},
    url: "controles/ManteCierreDiario.php",
    success: CreaTablaIngresos
  });
}

function imprSelec(nombre) {
  var ficha = document.getElementById(nombre);
  var ventimp = window.open(' ', 'popimpr');
  ventimp.document.write(ficha.innerHTML);
  ventimp.document.close();
  ventimp.print( );
  ventimp.close();
}

function LimpiaIng(){
   $("#masdatos_ing").val("");
   $("#responsable_ing").val("");   
   $("#ingreso").val("");
   
}

function LimpiaEg(){
   $("#responsable_eg").val("");
   $("#egreso").val("");
}

function ResizeDivI(){
    var altura = $(window).height();
    $('.mygrid-wrapper-divi').height(altura/2 - 100);
}

function ResizeDivE(){
    var altura = $(window).height();
    $('.mygrid-wrapper-dive').height(altura/2 - 100);
}

function ResizeDivG(){
    var altura = $(window).height();
    $('.mygrid-wrapper-divgiros').height(altura/2 - 10);
}

function ResizeDivD(){
    var altura = $(window).height();
    $('.mygrid-wrapper-divd').height(altura/2 - 10);
}

function fnLimpiaTabla(){
var html;    
    html += "<tr>";
        html += "<td>" + " <button id='btn_anulari' type='button' aria-hidden='true' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-remove blue'></span></button>" + "</td>";
        html += "<td ></td>";
        html += "<td ></td>";        
        html += "<td > NO hay datos </td>";
        html += "<td > </td>";        
        html += "<td > </td>";   
        html += "</tr>";
        $("#body_ingresos").html( html );
        $("#body_egresos").html( html );
var html1;
    html1 += "<tr>";
        html1 += "<td></td>";        
        html1 += "<td ></td>";
        html1 += "<td ></td>";
        html1 += "<td ></td>";
        html1 += "<td > NO hay datos</td>";
        html1 += "<td ></td>";
        html1 += "<td ></td>";
        html1 += "<td ></td>";
        html1 += "<td ></td>";
        html1 += "<td ></td>";        
        html1 += "</tr>";
        $("#body_giros").html( html1 );
}

function FnCierreDiario() {
  FnCalculaTotales();
  if ($("#estado").val() === 'ABIERTO') {
    jConfirm("¿Esta seguro de Cerrar DIARIO \n de fecha: " + $("#fecha_cierre").val(), "Transferencias", function (r) {
      if (r) {
        $.ajax({async: true, type: "POST", dataType: "json", cache: false,
          data: {opt: 'CIERRE', coddiario: $("#codcierrediario").val(), saldof: $("#total_saldo").val(), valor: 'CERRADO'},
          url: "controles/ManteCierreDiario.php"
        }).done(function (respuesta) {
          InsertaGirosPendientes();
          $("#codcierrediario").val(respuesta[0].codigo);
          $("#estado").val(respuesta[0].estado);
          if ($("#estado").val() === 'ABIERTO') {
            $('#span_abierto').css('display', 'block');
            $('#span_cerrado').css('display', 'none');
            $("table th").css("background", " #428bca");
            $("table th").css("color", "white");
            $("#div_btnsingreso").css("display", "block");
            $("#div_btnsegreso").css("display", "block");
          } else {
            $('#span_cerrado').css('display', 'block');
            $('#span_abierto').css('display', 'none');
            $("table th").css("background", "lightgray");
            $("table th").css("color", "black");
            $("#div_btnsingreso").css("display", "none");
            $("#div_btnsegreso").css("display", "none");
          }
          fnImprimeDiario();
        });
      }
    });
  } else {
    jAlert('Diario CERRADO, verifique...', 'Giros - Transferencias');
  }
}

function FnAbreDiario(){
FnCalculaTotales();
if($("#estado").val() === 'CERRADO' ){
    jConfirm("¿Esta seguro de ABRIR DIARIO con fecha:"+ $("#fecha_cierre").val(), "Giros - Transferencias", function(r) {
        if(r) {
            $.ajax({async: true,type: "POST",dataType: "json",cache: false,
            data: {opt:'CIERRE',coddiario: $("#codcierrediario").val(), saldof:$("#total_saldo").val(),valor:'ABIERTO'},
            url: "controles/ManteCierreDiario.php"
            }).done(function(respuesta){
            $("#codcierrediario").val(respuesta[0].codigo);
            $("#estado").val(respuesta[0].estado);
            if($("#estado").val() === 'ABIERTO' ){
                $('#span_abierto').css('display','block');
                $('#span_cerrado').css('display','none');
                $("table th").css("background"," #428bca");  $("table th").css("color","white");
                //$("#btn_actualizasaldos").css("display","block");
            }else { 
                $('#span_cerrado').css('display','block'); 
                $('#span_abierto').css('display','none'); 
                $("table th").css("background","lightgray"); $("table th").css("color","black");
                //$("#btn_actualizasaldos").css("display","none");                
                }
                
            if ( $("#fechadehoy").val() === $("#fecha_cierre").val() ){
                $("#div_btnsingreso").css("display","block"); 
                $("#div_btnsegreso").css("display","block");
                
            } else {
                if ($("#tusuario").val() === 'ADMIN'){
                    
                    $("#div_btnsingreso").css("display","block"); 
                    $("#div_btnsegreso").css("display","block");
                } else {
                    
                    $("#div_btnsingreso").css("display","none"); 
                    $("#div_btnsegreso").css("display","none");
                }
            }
            //FnCargaListaDiarios();       
        });                

        }
    });
} else { jAlert ('Diario ya esta CERRADO, verifique...','Giros - Transferencias'); } 
}

function fnActualizaSaldos(){
    $.ajax({async: true,type: "POST",dataType: "json",cache: false,
            data: {opt:'ACTUALIZA',coddiario: $("#codcierrediario").val(),fecha:$("#fecha_cierre").val(),saldofecha:$("#saldo_ala_fecha").val()},
            url: "controles/ManteCierreDiario.php"
            }).done(function(respuesta){
                FnCargaListaDiarios();
                //$("#btn_actualizasaldos").css("display","none");
            });
}


function fnCreaTablaDinero(datosd) {
    var html;
    var i = 0;
    for (var ii = 0; ii < datosd.length; ii++) {
        i = ii + 1;
        html += "<tr id='d[" + ii + "]' class='dato' onclick='fnSeleFilaDinero(this.id);'>";
        html += "<td>" + i + "</td>";
        html += "<td class='ocultame'>" + datosd[ii].cod_diario + "</td>";
        html += "<td align='center'>" + datosd[ii].denominacion + " </td>";
        html += "<td align='center' class='editabled' data-campo='cantidad'> <span>" + datosd[ii].cantidad + "</span></td>";
        html += "<td align='right' >" + datosd[ii].total + "</td>";
        html += "</tr>";
    }
    $("#body_dinero").html(html);
    fnTotalDinero();
}

function fnCargaDinero() {
    $.ajax({async: true, type: "POST", dataType: "json", cache: false,
        data: {opt: 'DINERO', coddiario: $("#codcierrediario").val(), fecha: $("#fecha_cierre").val()},
        url: "controles/ManteCierreDiario.php",
//        beforeSend: function () {$('#carga').css({display: 'block'});},
//        complete: function () {  $('#carga').css('display', 'none'); },
        success: fnCreaTablaDinero
    });
}

function fnTotalDinero() {
    var sumai = 0;
    var d_saldo_final = 0;
    var d_diferencia = 0;
    $('#tabla_dinero tr.dato').each(function () {
        sumai += parseFloat($(this).find('td').eq(4).text() || 0, 10); //numero de la celda 5*/        
    });
    $("#total_dinero").text(sumai.toFixed(2));
    d_saldo_final = parseFloat($("#total_saldo").val());
    d_diferencia = d_saldo_final - sumai;
    $("#d_saldo_final").text(d_saldo_final.toFixed(2));
    $("#d_total_efectivo").text(sumai.toFixed(2));
    $("#d_diferencia").text(d_diferencia.toFixed(2));
    if (parseFloat(d_diferencia) !== 0) {
        $('#d_diferencia').css('background-color', 'tomato');
        $('#d_saldo_final').priceFormat({
            prefix: '',
            centsSeparator: '.',
            thousandsSeparator: ','
        });
        $('#d_total_efectivo').priceFormat({
            prefix: '',
            centsSeparator: '.',
            thousandsSeparator: ','
        });
        $('#d_diferencia').priceFormat({
            prefix: '',
            centsSeparator: '.',
            thousandsSeparator: ','
        });
        $('#total_dinero').priceFormat({            prefix: '',            centsSeparator: '.',            thousandsSeparator: ','        });
    } else {
        $('#d_diferencia').css('background-color', 'white');
        $('#d_saldo_final').priceFormat({
            prefix: '',
            centsSeparator: '.',
            thousandsSeparator: ','
        });
        $('#d_total_efectivo').priceFormat({
            prefix: '',
            centsSeparator: '.',
            thousandsSeparator: ','
        });
        $('#d_diferencia').priceFormat({
            prefix: '',
            centsSeparator: '.',
            thousandsSeparator: ','
        });
        $('#total_dinero').priceFormat({            prefix: '',            centsSeparator: '.',            thousandsSeparator: ','        });
    }

}

function fnLimpiaTablaDinero() {
    var html;
    html += "<tr >";
    html += "<td></td>";
    html += "<td </td>";
    html += "<td </td>";
    html += "<td </div></td>";
    html += "<td </td>";
    html += "</tr>";
    $("#body_dinero").html( html );

}

function fnSeleFilaDinero(idfila){
    var idfila1=$('#seled').val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfila1);
    elTableRow.style.backgroundColor =(elTableRow.style.backgroundColor==="LightSkyBlue")?'white':'LightSkyBlue';
    if (idfila1 !== idfila){
        elTableRow1.style.backgroundColor=(elTableRow.style.backgroundColor==="white")?'LightSkyBlue':'white';       
    }
    var elTableCells = elTableRow.getElementsByTagName("td");
        $("#denominacion").val(elTableCells[2].innerHTML);
        document.getElementById("seled").value =idfila;
        //alert($("#denominacion").val());
}
/* 
function MuestraIngresos() {
  $.ajax({async: true, type: "POST", dataType: "json", cache: false,
    url: 'controles/ManteCierreDiario.php',
    data: {coddiario: $("#codcierrediario").val(), opt: 'LISTA_ING'},
    beforeSend: function (objeto) {
      $('#carga').css('display', 'block');
      $("#carga").html("<img src='img/loader.gif'>");
    },
    complete: function (objeto) {
      $('#carga').css('display', 'none');
    },
    success: function (data) { // creamos tabla
      if (data.success) {
        var i = 0;
        $.each(data, function (index, record) {
          if ($.isNumeric(index)) {
            i = i + 1;
            var row = $("<tr id='I[" + i + "]' class='dato' onclick='RecuperaFilaIng(this.id);' > </tr>");
            $("<td>" + " <button id='btn_anulari' onclick='fnAnulaDetalle();' title='Anular' type='button' aria-hidden='true' class='btn btn-default btn-xs' ><span class='fa fa-times blue'></span></button>" + "</td>").text(record.itm2).appendTo(row);
            $("<td> </td>").text(i).appendTo(row);
            $("<td class='ocultame'> </td>").text(record.iddetalle).appendTo(row);
            $("<td class='editable' data-campo='concepto'><span> </span></td>").text(record.concepto).appendTo(row);
            $("<td class='editable' data-campo='responsable'> </td>").text(record.responsable).appendTo(row);
            $("<td align='right' class='editable' data-campo='ing'> </td>").text(record.ing).appendTo(row);
            row.appendTo("#IngresosDet");
          }
        });
        TotalIngresos();
        FnCalculaTotales();

      }
// CARGA TABLA
      $('#IngresosDet').dataTable({
        "fnDrawCallback": function (oSettings) {
          // Need to redo the counters if filtered or sorted 
          if (oSettings.bSorted || oSettings.bFiltered) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++)
            {
              $('td:eq(1)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr).html(i + 1);
            }
          }
        },
        "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
        "aaSorting": [[1, 'asc']], "sScrollY": ($(window).height() / 2 - 120), "bPaginate": false,
        "bLengthChange": false, "bFilter": false, "bSort": true,
        "bInfo": false, "bAutoWidth": true, "bSortClasses": false //"bJQueryUI": true,
      });// en dataTables
      
    }
  });
  return false;
}
 */
var anula;
function ListaDistro(id_detalle) {
  $('#tabla_distribucion').dataTable().fnDestroy();
  $.ajax({async: true, type: "POST", dataType: "json", cache: false,
    data: {opt: 'LISTA_DISTRO', iddetalle:id_detalle},
    url: "controles/ManteCierreDiario.php",
    beforeSend: function () { $('#carga').css('display','block'); },
    complete:   function () { $('#carga').css('display', 'none'); },
    success: function (data) {
        var html;        var i = 0;
        for (var x = 0; x < data.length; x++) {
          i = x + 1;
          html += "<tr id='dt[" + i + "]' class='dato' onclick='SeleFilaDistro(this.id);'>";
          html += "<td>" + " <button id='btn_anular_distro' onclick='fnAnulaItmDistro();' title='Anular' type='button' aria-hidden='true' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-remove blue'></span></button>" + "</td>";
          html += "<td>" + i + "</td>";
          html += "<td class='ocultame'>" + data[x].iddistribucion + "</td>";
          html += "<td class='ocultame'>" + data[x].grupo + "</td>";
          html += "<td >" + data[x].cuenta + " </td>";
          html += "<td >" + data[x].propietario + " </td>";
          html += "<td class='ocultame'>" + data[x].estado + "</td>";
          html += "<td align='right' > " + data[x].fraccion + " </td>";
          html += "<td align='right' > " + data[x].monto + "</td>";
          html += "</tr>";
        }
        $("#body_distribucion").html(html);
        TotalesDistribucion();
        $('#tabla_distribucion').dataTable({
          "fnDrawCallback": function (oSettings) {
            // Need to redo the counters if filtered or sorted 
            if (oSettings.bSorted || oSettings.bFiltered) {
              for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++)
              {
                $('td:eq(1)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr).html(i + 1);
              }
            }
          },
          "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
          "aaSorting": [[1, 'asc']], "sScrollY": ($("#dialogo_distribucion").height() - 180), "bPaginate": false,
          "bLengthChange": false, "bFilter": false, "bSort": true,
          "bInfo": false, "bAutoWidth": true, "bSortClasses": false //"bJQueryUI": true,
        }); //end dataTables
	  var  estado_distro=data[1].estado;
      switch (estado_distro) {
        case '0':
          $("#div_btns_distribucion").css("display", "block");
          $("#btn_inserta_fraccion").css("display", "block");
          //$("#tabla_distribucion tr:nth-child(1)").hide();
          ocultarFila(2,true);
          anula = "NO";
          break;
        case 'P':
          $("#div_btns_distribucion").css("display", "block");
          $("#btn_inserta_fraccion").css("display", "block");
          anula = "SI";
          $("#mensajito").css("display", "none");
          break;
		case 'S':
          $("#div_btns_distribucion").css("display", "block");
          $("#btn_inserta_fraccion").css("display", "block");
          anula = "SI";
          $("#mensajito").css("display", "none");
          break;  
        case 'D':
          $("#div_btns_distribucion").css("display", "none");
          $("#btn_inserta_fraccion").css("display", "none");
          $("#tabla_distribucion").attr("disabled", true);
          anula = "NO";
          $("#mensajito").css("display", "block");
          break;
      }
      console.log(estado_distro);
    }
  });
}

function BuscaEnTablaDistro(nrocuenta) {
  var texto_nrocuenta;
  var nro_cuenta;
  var posicion;
  var hallado;
  $("#tabla_distribucion tr").find('td:eq(3)').each(function() {
	texto_nrocuenta = $(this).html();
	posicion = texto_nrocuenta.lastIndexOf(":");
	nro_cuenta = texto_nrocuenta.substr(posicion + 1, 30);
	if (nrocuenta.trim() === nro_cuenta.trim()) {
	  hallado = nro_cuenta.trim();
	}
  });
  return hallado;
}

function fnAnulaItmDistro() {
if (anula==="SI") {  
  jConfirm("¿Esta seguro de Anular : \n" + NroCuenta + "\n" + agente_asociado + "\n S/. " + $("#fraccion").val(), "Giros - Transferencias", function (r) {
    if (r) {
      $("#dialogo_distribucion").dialog("close");
      $.ajax({async: true, type: "POST", dataType: "json", cache: false,
        data: {opt: 'DEL_ITM_DISTRO', iddetalle: $("#id_distro").val()},
        url: "controles/ManteCierreDiario.php",
        success:function () { $("#dialogo_distribucion").dialog("open"); }
      });
    }
  });
  }
}

var NroCuenta,agente_asociado;
function SeleFilaDistro(id_fila){
  var id_fila1 = $('#seledistro').val();
  var elTableRow = document.getElementById(id_fila);
  var elTableRow1 = document.getElementById(id_fila1);
  
  elTableRow.style.backgroundColor = (elTableRow.style.backgroundColor === "LightSkyBlue") ? 'white' : 'LightSkyBlue';
  if (id_fila1 !== id_fila) {
    elTableRow1.style.backgroundColor = (elTableRow.style.backgroundColor === "white") ? 'LightSkyBlue' : 'white';
  }
  var elTableCells = elTableRow.getElementsByTagName("td");  
  $("#id_distro").val(elTableCells[2].innerHTML);
  $("#fraccion").val(elTableCells[5].innerHTML);
  agente_asociado=elTableCells[4].innerHTML;
  NroCuenta=elTableCells[3].innerHTML;
  $('#seledistro').val(id_fila);
  //alert($("#id_distro").val());  
}

function InsertaItmDistro(cuenta_destino) { // cuenta_destino, para saber si es Agente o Usuario
  $.ajax({async: true, type: "POST", dataType: "json", cache: false,
    data: {opt: 'IN_ITM_DISTRO', iddetalle: $("#id_detalle").val(), fraccion: $("#txt_fraccion_distro").val(), cuentadestino: cuenta_destino, 
          fechamov: $("#fechacierrediario").val(), usuario: $("#nusuario").val()},
    url: "controles/ManteCierreDiario.php",
    beforeSend: function () { $('#carga').css('display','block');},
    complete:   function () { $('#carga').css('display', 'none');}

  }).done(function (respuesta) {
      $("#dialogo_distribucion").dialog("open");
    });
}

function InsertaItmDistro_S(cuenta_destino) { // cuenta_destino, para saber si es Agente o Usuario
  var nro_cuenta_s = cuenta_destino + '::' + $('#lista_sucursales_distro option:selected').html() ;
  $.ajax({async: true, type: "POST", dataType: "json", cache: false,
    data: {opt: 'IN_ITM_DISTRO_S', iddetalle: $("#id_detalle").val(), fraccion: $("#txt_fraccion_distro").val(), cuentadestino: nro_cuenta_s, 
          fechamov: $("#fechacierrediario").val(), usuario: $("#nusuario").val()},
    url: "controles/ManteCierreDiario.php",
    beforeSend: function () { $('#carga').css('display','block');},
    complete:   function () { $('#carga').css('display', 'none');}

  }).done(function (respuesta) {
      $("#dialogo_distribucion").dialog("open");
    });
}

function fnCancelaDistro(){
jConfirm("¿Esta seguro de Cancelar Distribucion ? \n se Borraran TODOS LOS DATOS." , "Giros - Transferencias", function (r) {
    if (r) {
      $.ajax({async: true, type: "POST", dataType: "json", cache: false,
        data: {opt: 'CANCELA_DISTRO', iddetalle: $("#id_detalle").val()},
        url: "controles/ManteCierreDiario.php",
        complete: function() { $("#dialogo_distribucion").dialog("close"); $("#lista_agentes").css("display", "none"); $("#lista_asociados").css("display", "none");}
      });
    }
  });
  console.log($("#id_detalle").val());//
}

function fnValidaIdConcepto(idconcepto) {
  var rpta;
  switch (idconcepto) {
    case '17': //INGRESO DE EFECTIVO DESDE AGENTE
      rpta = 'NO';      break;
    case '18': //INGRESO DE EFECTIVO DESDE ASOCIADO
      rpta = 'NO';      break;
    case '21': // TRASLADO DE EFECTIVO DESDE SUCURSAL
      rpta = 'NO';      break;
    case '22': //saldo inicial
      rpta = 'NO';      break;

    default:
      rpta = 'SI';
  }
  
  return rpta;
}

function fnAplicaDistribucion() {
  jConfirm("¿Esta seguro de hacer la DISTRIBUCION de: S/. " + $("#sumafraccion").val(), "Distribuciónd e Efectivo", function (r) {
    if (r) {
      var grupo, nro_cuenta, monto_fraccion,posicion,id_concepto,nrocuenta,codsucu;
      $.ajax({async: true, type: "POST", dataType: "json", cache: false,
        data: {opt: 'LISTA_DISTRO', iddetalle: $("#id_detalle").val()},
        url: "controles/ManteCierreDiario.php",
        beforeSend: function () { $('#carga2').css('display', 'block'); },
        complete:   function () { $('#carga2').css('display', 'none');  }
      }).done(function (respuesta) {
        //jWarning("Se creó un Nuevo Diario con fecha: " + $("#fechacierrediario").val().substring(0, 10), "Transferencias - Cierre Diario");
		procesado=respuesta[1].estado;
        console.log(procesado);
        if ( procesado === 'P' ){
        for (var i = 0; i < respuesta.length; i++) {
          grupo=respuesta[i].grupo; // especifica si pertenece a Agente, Sucursal, Asociado
          nro_cuenta=respuesta[i].cuenta;
		  codsucu=respuesta[i].cuenta;
          posicion = nro_cuenta.lastIndexOf(":"); 
		  nro_cuenta = nro_cuenta.substr(posicion + 1, 30); 
		  nro_cuenta=nro_cuenta.trim();
          monto_fraccion=respuesta[i].fraccion;
          nrocuenta=respuesta[i].cuenta;
//        console.log(nro_cuenta);
//        console.log(respuesta[i].fraccion);
          switch (grupo) {
            case 'A':
              fnInsertaCuentaAgente(nro_cuenta,monto_fraccion);
              FnInsertaFraccionEnEgresos(monto_fraccion,'32',nrocuenta);
              break;
            case 'C':
              fnInsertaCuentaAsociado(nro_cuenta,monto_fraccion);
              FnInsertaFraccionEnEgresos(monto_fraccion,'33',nrocuenta);
              break;
			case 'S':              
              FnInsertaFraccionEnEgresos(monto_fraccion,'38',nrocuenta);
			        FnInsertaFraccionEnIngresos(monto_fraccion,'39',nrocuenta,codsucu); // HACE UN INGRESO EN LA SUCURSAL DE DESTINO
              break;  
          }
        }
        jWarning("Verifique Saldos...","Distribución");
        fnMarcaDistro();
        FnCargaEgresos();
      } else { if(procesado==='D'){
              jError ("Ya fue DISTRIBUIDO","Distribución");
            } else {
                if(respuesta[0].propietario==="---") {
                  jError ("IMPOSIBLE hacer la Distribución, Verifique...","Distribución");
                }
            }
      } 
              
      });
      
    }
  });
}

function fnInsertaCuentaAgente(nro_cuenta,monto_fraccion){
  $.ajax({async: true, type: "POST", dataType: "json", cache: false,
        data: {opt: "IT",nrocuenta:nro_cuenta,nrocuentadest:$('#id_detalle').val().trim(),dinero:'C',monto:monto_fraccion,ttran:'168',
                origen:$('#codsucursal').val(),idgiro:'0',nroop:'00-00',nromovs:'0',observa:$('#nombresucursal').val(),
                respo:'Sistema',modifica:$('#nusuario').val(),fechamov:$('#fechacierrediario').val(),opsql:'I' },
        url: "controles/ManteAgentes.php"
//        beforeSend: function () { $('#carga2').css('display', 'block'); },
//        complete:   function () { $('#carga2').css('display', 'none');  }
      });
}

function fnInsertaCuentaAsociado(nro_cuenta,monto_fraccion) {
  $.ajax({async: true, type: "POST", dataType: "json", cache: false,
    data: {opcion: "IT", nrocuenta:nro_cuenta, nrocuentadest:$('#id_detalle').val(), monto:monto_fraccion, nroop: '---', ttran:'169',
          destino: $("#codsucursal").val(), idgiro: '0', observa: $('#nombresucursal').val(), respo: 'Sistema', usuacrea: $('#nusuario').val(),
          fechamov: $('#fechacierrediario').val(), idempresa:$('#idempresa').val(), opsql:'I'},
    url: "controles/ManteCuentaUsuario.php"
//        beforeSend: function () { $('#carga2').css('display', 'block'); },
//        complete:   function () { $('#carga2').css('display', 'none');  }
  });
}

function TotalesDistribucion() {
  var suma_frac = 0; 
  $('#tabla_distribucion tr.dato').each(function () { //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas                                                                                                                                    
    if ($(this).find('td').eq(7).text() !== '0') {
      suma_frac += parseFloat($(this).find('td').eq(7).text() || 0, 10); //numero de la celda 5*/    
    }
  });
  if (suma_frac === 0){
    $("#suma_fraccion").text('0.00'); // campo en la tabla
    $("#sumafraccion").val('0.00');        
  }
  else {
    $("#sumafraccion").val(suma_frac.toFixed(2));
    $("#suma_fraccion").text(suma_frac.toFixed(2));    
    $('#suma_fraccion').priceFormat({prefix: '', centsSeparator: '.', thousandsSeparator: ','});
  }
 
}

function VerificaFraccion(){
  var suma=0; var sumafraccion=0; var fraccion=0; distribucion=0;
  $("#txt_fraccion_distro").val( $("#txt_fraccion_distro").val().replace(",", "") );
  sumafraccion=parseFloat( $("#sumafraccion").val() );
  fraccion=parseFloat($("#txt_fraccion_distro").val());
  suma=sumafraccion+fraccion;
  distribucion=parseFloat($('#ingreso').val());
//  console.log($('#ingreso').val());
//  console.log( sumafraccion );
//  console.log(fraccion);
//  console.log(suma);
  if (suma <= distribucion){
    return 'SI';
  } else{
    return 'NO';
  }
}

function FnInsertaFraccionEnEgresos(fraccion,id_concepto,cuenta) {
  $.ajax({async: true, type: "POST", dataType: "json", cache: false,
    url: "controles/ManteCierreDiario.php",
    data: {opt: 'IE', coddiario: $("#codcierrediario").val(), monto: fraccion, idconcepto:id_concepto,
      sucu_destino:'XX', concepto:cuenta , responsable: $("#codsucursal").val(), usuamodi: $("#nusuario").val()}
    //complete: FnCargaEgresos
  });
  return false;
}

function FnInsertaFraccionEnIngresos(fraccion,id_concepto,cuenta,codsucu) {
  var n_coddiario=$("#codcierrediario").val();
  var n_concepto=$("#codsucursal").val();
  n_coddiario=codsucu.substr(0,3) + n_coddiario.substr(3,10);
  n_concepto=n_concepto+'>>'+codsucu.substr(0,3);
  $.ajax({async: true, type: "POST", dataType: "json", cache: false,
    url: "controles/ManteCierreDiario.php",
    data: {opt: 'II', coddiario:n_coddiario, monto: fraccion, idconcepto:id_concepto,
      sucu_destino:'XX', concepto:n_concepto, responsable:n_concepto, usuamodi: $("#nusuario").val()}
    //complete: FnCargaEgresos
  });
  return false;
}

function fnMarcaDistro() {
  $.ajax({async: true, type: "POST", dataType: "json", cache: false,
    data: {opt: 'MARCA_DISTRO', usua: $("#nusuario").val(),iddetalle: $("#id_detalle").val()},
    url: "controles/ManteCierreDiario.php",
    complete: function () {
      $("#dialogo_distribucion").dialog("close");
      $("#lista_agentes").css("display", "none");
      $("#lista_asociados").css("display", "none");
    }
  });
}

function fnCreaTablaUsuarioCuenta(jsoncxu){
    var html;
    for (var contador = 0; contador < jsoncxu.length; contador++) {
        html += "<tr id='cu[" + contador + "]' ondblclick='fnSeleccionaCuentaAsociado(this.id);'>";
        var i = contador + 1;
        html += "<td>" + jsoncxu[contador].nusuario +  "</td>";
        html += "<td>" + jsoncxu[contador].iniciales + "</td>";
        html += "<td>" + jsoncxu[contador].nrocuenta + "</td>";
        html += "</tr>";
    } 
    $("#tbody_usuarioucenta").html(html);
}

function fnMuestraUsuarioCuenta(valorabuscar,optsql) {
    if ( valorabuscar !=='' )
    {    
        $.ajax({async: true, type: "POST", dataType: "json", cache: false,     
            data: {opcion: "CxU2", valor: valorabuscar, idempresa:$('#codsucursal').val().substr(0,1),opsql: optsql}, 
            url: "controles/ManteCuentaUsuario.php",
            beforeSend: function (objeto) {$("#carga").html("<img src='img/loader.gif'>");},
            complete: function (objeto) {$('#carga').css('display', 'none');},
            success: fnCreaTablaUsuarioCuenta
        });
    } else {
        jAlert("Ingrese datos a buscar...", "Cuentas");
    }
    return false;
}


function fnCreaTablaUsuarioAgente(jsoncxu){
    var html;
    for (var contador = 0; contador < jsoncxu.length; contador++) {
        html += "<tr id='ag[" + contador + "]' ondblclick='fnSeleccionaCuentaAgente(this.id);'>";
        var i = contador + 1;
        html += "<td>" + jsoncxu[contador].nrocuenta +  "</td>";
        html += "<td>" + jsoncxu[contador].iniciales + "</td>";
        html += "<td>" + jsoncxu[contador].desc_banco + "</td>";
        html += "</tr>";
    } 
    $("#tbody_cuentaagente").html(html);
}

function fnMuestraUsuarioAgente(valorabuscar,optsql) {
    if ( valorabuscar !=='' ){
        $.ajax({async: true, type: "POST", dataType: "json", cache: false,     
            data: {opcion: "AGENTES_DIARIO", valor: valorabuscar,idempresa:$('#codsucursal').val().substr(0,1), opsql: optsql}, 
            url: "controles/ManteBancos.php",
            beforeSend: function (objeto) {$("#carga").html("<img src='img/loader.gif'>");},
            complete: function (objeto) {$('#carga').css('display', 'none');},
            success: fnCreaTablaUsuarioAgente
        });
    } else {
        jAlert("Ingrese datos a buscar...", "Cuentas");
    }
    return false;
}

function fnInsertaTransaccionAsociado() {
  var data_transaccion = $('#nusuario').val()+'-'+ $('#codsucursal').val() + '->>' + $('#masdatos_eg').val(); 
  $.ajax({async: true, type: "POST", dataType: "json", cache: false,
    data: {opcion: "IT", nrocuenta: $('#nrocuenta_asociado').val(), nrocuentadest: '---', monto: $('#egreso').val(), nroop: '---', ttran: "200",
    destino: $("#codsucursal").val(), idgiro: '0', observa: data_transaccion, respo: $('#responsable_eg').val(), 
    usuacrea: $('#nusuario').val(), fechamov: $('#fechacierrediario').val(), idempresa:$('#idempresa').val(), opsql:"I"},
    url: "controles/ManteCuentaUsuario.php",
    beforeSend: function(objeto)  {   },
    complete: function(objeto)    {   }
  });
}

function fnInsertaTransaccionAgente(opcion) {
  var data_transaccion = $('#nusuario').val()+'-'+ $('#codsucursal').val() + '->>' + $('#masdatos_eg').val();
    console.log("opcion="+opcion);
//    console.log(opcion);
    var tipotransaccion;
    var op_dinero='';
    if (opcion === "36") {
        tipotransaccion = "201";
        op_dinero = 'C';        
    }
    if (opcion === "70") {
        tipotransaccion = "200";
        op_dinero = 'E';        
    }
    $.ajax({async: true, type: "POST", dataType: "json", cache: false,
        data: {opt: "IT", nrocuenta: $('#nrocuenta_agente').val(), nrocuentadest: '---', dinero: op_dinero, monto: $('#egreso').val(), ttran: tipotransaccion,
            origen: $("#codsucursal").val(), idgiro: '0', nroop: '---', nromovs: '0', observa: data_transaccion,
            respo: $('#responsable_eg').val(), modifica: $('#nusuario').val(), fechamov: $('#fechacierrediario').val(), idempresa:$('#idempresa').val(),opsql: 'I'},
        url: "controles/ManteAgentes.php"
    });
    console.log("opcion_="+opcion);
    console.log("tipotran="+tipotransaccion);    
    console.log("dinero="+op_dinero);
}

function ocultarFila(num,ver) {
  dis= ver ? '' : 'none';
  tab=document.getElementById('tabla_distribucion');
  tab.getElementsByTagName('tr')[num].style.display='none';
  console.log(num);
}

function VerificaImprimirDinero(){
    var usuario=$("#tusuario").val();
    var fecha_elegida = $('#fecha_cierre').val();
    var fecha_php = $('#fechadehoy').val();    
    var rpta;
    if (Date.parse(fecha_elegida) < Date.parse(fecha_php)) {
        
            if (usuario === 'ADMIN')    { rpta='SI';}
            if (usuario === 'OPERADOR') { rpta='NO';}
        
    }
    if (Date.parse(fecha_elegida) === Date.parse(fecha_php)) {
        
            if (usuario === 'ADMIN')    { rpta='SI';}
            if (usuario === 'OPERADOR') { rpta='SI';}
        
    }
    
    return rpta;
}

function CreaTablaListaDiarioPDF( datos ){
var html;
var i = 0;
for(var contador=0; contador < datos.length; contador++) {
        i=contador+1;   
        html += "<tr id='LD[" + contador + "]' class='dato' onclick='RecuperaFilaDiario(this.id);' ondblclick='fnMuestraDiario(this.id);' >";                
        html += "<td >"                 + datos[contador].fecha_diario + " </td>";
        
        html += "<td > "                + datos[contador].estado + "</td>";                        
        html += "</tr>";
      }                 
      $("#body_listadiario").html( html );
      //TotalEgresos();
}

function FnListaDiariosPDF(){
if ( $("#codcierrediario").val().trim() !== "" ){    
    $.ajax({async: true,type: "POST",dataType: "json",cache: false,
      data: {opt: 'LISTA',codsucu: $("#codsucursal").val(), fecha: $('#fecha_cierre').val() },      
      url: "controles/ManteCierreDiario.php",
      beforeSend:function(){ $('#carga').css({display:'block'}); },
      complete:function(){$('#carga').css('display','none'); },
      success:  CreaTablaListaDiario
      });
  }  
}

function cambiaImagen(codigo) {
console.log(codigo);
console.log("acercandoa a la solucion");
  $("#dialogo_recibo_img").dialog("open");
  var mivalor = "php/uploads/" + codigo + ".jpg";
  $("#dialogo_recibo_img img").attr("src", mivalor);
}

function FnUbicaDiario() {
  /* $('#IngresosDet').dataTable().fnDestroy();
  $('#EgresosDet').dataTable().fnDestroy(); */
  $('#transferencias').dataTable().fnDestroy();     
  $.ajax({async: true, type: "POST", dataType: 'json', cache: false,
    data: {opt: "B", codsucu: $('#codsucursal').val(), fecha: $('#fecha_cierre').val()},
    url: "controles/ManteCierreDiario.php"
  }).done(function (respuesta) {
    $("#codcierrediario").val(respuesta.codigo);
    $("#fechacierrediario").val(respuesta.fechadiario);
    $("#estado").val(respuesta.estado);
    console.log($("#estado").val())
    FnCargaDetalle();
    if ($("#estado").val() === 'ABIERTO') {
      $('#span_abierto').css('display', 'block');
      $('#span_cerrado').css('display', 'none');
      $("table th").css("background", " #428bca");
      $("table th").css("color", "white");
      $("#div_btns_ingreso").show();
      $("#div_btns_egreso").show();
    } 
    if( $("#estado").val() === 'CERRADO') {
      $('#span_cerrado').css('display', 'block');
      $('#span_abierto').css('display', 'none');
      $("table th").css("background", "lightgray");
      $("table th").css("color", "black");
      $("#div_btns_egreso").hide();
      $("#div_btns_ingreso").hide();
    }
    
/*     if ($("#fechadehoy").val() === $("#fecha_cierre").val()) {
        $("#div_btns_ingreso").css("display", "block");
        $("#div_btns_egreso").css("display", "block");
        
    } else {
      
      if ($("#tusuario").val() === 'ADMIN') {
        $("#div_btns_ingreso").css("display", "block");
        $("#div_btns_egreso").css("display", "block");
      } else {
        $("#div_btns_ingreso").css("display", "none");
        $("#div_btns_egreso").css("display", "none");
      }
    } */

  });
}

function MuestraPDF(nombrearchivo){
console.log("Nombre del archivo:", nombrearchivo);
  // Construye la URL del archivo PDF usando la variable `nombrearchivo`
  var url = "reportes/rpt_cierre_diario/" + nombrearchivo + ".pdf";
  // Abre el archivo PDF en una nueva pestaña del navegador
  window.open(url, '_blank');
}

function FechaServidor() {
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: { opt: "srvfecha" },
    url: "controles/ManteAgentes.php",
  }).done(function (respuesta) {
    $("#fecha_servidor").val(respuesta[0].fechaservidor);
    console.log('fecha_servidor:',$("#fecha_servidor").val());
  });
}

function InsertaGirosPendientes() {
  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: { opt: "IGPendientes", fecha: $('#fecha_cierre').val(), codsucu: $('#codsucursal').val() },
    url: "controles/ManteCierreDiario.php",
  }).done(function (respuesta) {
    console.log("Giros Pendientes Insertados");
  });
}