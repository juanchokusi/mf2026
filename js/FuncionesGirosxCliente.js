function CalculaTotales() {
var sumai = 0;var sumac = 0;var sumao = 0;var sumat = 0;;
$('#TMovsCliente tr.dato').each(function(){
    if ($(this).find('td').eq(23).text() !=='S') {
        sumai += parseFloat($(this).find('td').eq(10).text()||0,10);
        sumac += parseFloat($(this).find('td').eq(11).text()||0,10); 
        sumao += parseFloat($(this).find('td').eq(12).text()||0,10); 
        sumat += parseFloat($(this).find('td').eq(13).text()||0,10); 
    }     
});

$("#total_i").text(sumai.toFixed(2));
$("#total_c").text(sumac.toFixed(2));
$("#total_o").text(sumao.toFixed(2));
$("#total_t").text(sumat.toFixed(2));

}

function fnCreaTablaClientes(jsoncli){
    var html; 
    var i=0;
    for (var y = 0; y < jsoncli.length; y++ ){
        html += "<tr id='c[" + y + "]' ondblclick='fnSeleccionaClientes(this.id);'>";
        i = y + 1;        
        html += "<td>" + i + "</td>";
        html += "<td >"+ jsoncli[y].dni_ruc + "</td>";
        html += "<td >"+ jsoncli[y].nombres + "</td>";
        html += "</tr>";
    }    
    $("#body_TClientes").html(html);
}

function fnCreaTablaMovsCliente(jsonmovs)
{
    var voucher;
    var html;
    for (var x = 0; x < jsonmovs.length; x++) {
        html += "<tr id='mv[" + x + "]' class='dato' onclick='fnSeleccionaMovCliente(this.id);' ondblclick='fnMuestraMasDatso();'>";
        var i = x + 1;
        html += "<td>" + i + "</td>";
        voucher = jsonmovs[x].voucher;
        if (voucher === 'XXX') {
            html += "<td>" + " <button id='btn_anular' title='' type='button' aria-hidden='true' class='btn btn-default btn-xs' ><span class='glyphicon glyphicon-remove'></span></button>" + "</td>";
        } else {
            html += "<td>" + " <button id=" + jsonmovs[x].cod_girosucu + " onclick='cambiaImagene(this.id);' title='Boucher' type='button' aria-hidden='true' class='btn btn-default btn-xs' ><span class='glyphicon glyphicon-picture blue'></span></button>" + "</td>";
        }
        
        html += "<td style='display: none'>"                                          + jsonmovs[x].correlativo + "</td>";
        html += "<td style='display: none'>"                                          + jsonmovs[x].cod_girosucu + "</td>";
        html += "<td >"                                                               + jsonmovs[x].fechahora_registro + "</td>";
        html += "<td class='editable' data-campo='cod_sucursal'><span>"               + jsonmovs[x].cod_sucursal + "</span></td>";
        html += "<td class='editable' data-campo='dni_ruc'><span>"                    + jsonmovs[x].dni_ruc + "</span></td>";
        html += "<td >"                                                               + jsonmovs[x].remitente + "</td>";
        html += "<td class='editable' data-campo='cod_sucursald'><span>"              + jsonmovs[x].cod_sucursald + "</span></td>";
        html += "<td class='editable' data-campo='dni_rucb'><span>"                   + jsonmovs[x].dni_rucb + "</span></td>";       
        html += "<td >"                                                               + jsonmovs[x].beneficiario + "</td>";
        html += "<td align='right' class='editable' data-campo='importe_giro'><span>" + jsonmovs[x].importe_giro + "</span></td>";
        html += "<td align='right' class='editable' data-campo='cargo_giro'><span>"   + jsonmovs[x].cargo_giro + "</span></td>";        
        html += "<td align='right' class='editable' data-campo='otros'><span>"        + jsonmovs[x].otros + "</span></td>";
/*13*/  html += "<td align='right' class='editable' data-campo='total'><span>"        + jsonmovs[x].total + "</span></td>";
        html += "<td style='display: none'>" + jsonmovs[x].ciudad_destino + "</td>";
        html += "<td style='display: none'>" + jsonmovs[x].observagiro + "</td>";
        html += "<td style='display: none'>" + jsonmovs[x].nro_cuenta + "</td>";
/*17*/html += "<td >"                        + jsonmovs[x].nro_operacion + "</td>";
        html += "<td >"                      + jsonmovs[x].data_pago + "</td>";
        html += "<td style='display: none'>" + jsonmovs[x].usuario_registra + "</td>";
        html += "<td >"                      + jsonmovs[x].fechahora_entrega + "</td>";
        html += "<td >"                      + jsonmovs[x].usuario_entrega + "</td>";                
        html += "<td style='display: none'>" + jsonmovs[x].anulado + "</td>";
        html += "</tr>";
    } /*End FOR*/
    /*console.log(voucher);*/
    $("#tbody_MovsCliente").html(html);
    //fnTotalesIngSal();
    CalculaTotales();
}

function fnSeleccionaMovCliente(idfila) {
    if ($("#sele_as").val() === "S") {
        var idfilac = $('#sele_mv').val();
        var elTableRow = document.getElementById(idfila);
        var elTableRow1 = document.getElementById(idfilac);
        var color = elTableRow.style.backgroundColor;
        elTableRow.style.backgroundColor = (elTableRow.style.backgroundColor === "LightSkyBlue") ? color : 'LightSkyBlue';
        if (idfilac !== idfila) {
            elTableRow1.style.backgroundColor = (elTableRow.style.backgroundColor === color) ? 'LightSkyBlue' : color;
        }
        var elTableCells = elTableRow.getElementsByTagName("td");
        
        $("#idgiro").val(elTableCells[3].innerHTML);
        $("#correlativo").text(elTableCells[3].innerHTML);
        $("#codgirosucu").text(elTableCells[4].innerHTML);
        $("#destino").text(elTableCells[15].innerHTML);
        $("#observa").text(elTableCells[16].innerHTML);
        $("#nrocuenta").text(elTableCells[17].innerHTML);
        $("#nrooperacion").text(elTableCells[18].innerHTML);
        $("#datapago").text(elTableCells[19].innerHTML);
        $("#registra").text(elTableCells[20].innerHTML); 
        $("#sele_mv").val(idfila);
        //$('#dialogo_cuentas').dialog('close');
        console.log($("#idgiro").val());
    }
}

function fnSeleccionaClientes(idfila) {    
    var idfilac = $('#sele_c').val();
    var elTableRow = document.getElementById(idfila);
        var elTableRow1 = document.getElementById(idfilac);
        var color = elTableRow.style.backgroundColor;
        elTableRow.style.backgroundColor = (elTableRow.style.backgroundColor === "LightSkyBlue") ? color : 'LightSkyBlue';
        if (idfilac !== idfila) {
            elTableRow1.style.backgroundColor = (elTableRow.style.backgroundColor === color) ? 'LightSkyBlue' : color;
        }
        var elTableCells = elTableRow.getElementsByTagName("td");
        $("#txt_buscacli").val(elTableCells[1].innerHTML);        
        $("#sele_c").val(idfila);
        $("#divclientes").css("display","none");
        fnMuestraMovsCliente();
        //$("#sele_buscar").prop("selectedIndex", 0);
}

function fnMuestraClientes(){
    $.ajax({async: true, type: "POST", dataType: "json", cache: false,
    data: {opcion: "LISTACLIENTES",valor:$("#txt_buscacli").val().trim() },
    url: "controles/ManteGirosxCliente.php",
    beforeSend: function (objeto) {$('#carga').css('display', 'block');$("#carga").html("<img src='img/loader.gif'>");},
    complete: function (objeto) {$('#carga').css('display', 'none');},
    success: fnCreaTablaClientes
    });
return false;   
}    

function fnMuestraMovsCliente(){
    $.ajax({async: true, type: "POST", dataType: "json", cache: false,
    data: {opcion: "MOVSCLIENTE",fecha_i:$("#fechai").val(), fecha_f:$("#fechaf").val(), dni:$("#txt_buscacli").val().trim() },
    url: "controles/ManteGirosxCliente.php",
    beforeSend: function (objeto) {$('#carga').css('display', 'block'); $("#carga").html("<img src='img/loader.gif'>");},
    complete:   function (objeto) {$('#carga').css('display', 'none');},
    success: fnCreaTablaMovsCliente
    });
return false;   
}

function fnMuestraMasDatso(){
if ( $("#idgiro").val().trim() !=="" ) {
    $("#dialogo_masdatos").dialog("open");
    } else {
    jError("Elija una Transaccion...","Giros - Transferencias");
    }           
    
}

function fnImprimeReporte() {
    window.open('reportes/rptGirosxCliente.php?nombresucu=' + $("#nombresucursal").val() + '&fechai=' + $("#fechai").val() + '&fechaf=' + $("#fechaf").val() + '&dni=' + $("#txt_buscacli").val(), '_blank');  // changed here (cambiado aquí)
}

///////////////////////////////  DocumentReady //////////////////////////////
$(document).ready(function () {
    
    $("#btn_imprimir").attr("disabled",true);
    $("#sele_as").val("S");
    $("#divclientes").css("display","none");
        
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });    
    $(function () {
        var window_height = $(window).height(),
                content_height = window_height - 220;
        $('.mygrid-wrapper-div').height(content_height);
    });

    $(window).resize(function () {
        var window_height = $(window).height(),
                content_height = window_height - 220;
        $('.mygrid-wrapper-div').height(content_height);
    });
    $(function () {
        var window_height = $("#formulario").height(),
                content_height = window_height - 10;
        $('.mygrid-wrapper-divc').height(content_height);
    });

//    $(window).resize(function () {
//        var window_height = $(window).height(),
//                content_height = window_height - 500;
//        $('.mygrid-wrapper-divc').height(content_height);
//    });
    //$( "#btn_buscar" ).tooltip({         show: {effect: "slideDown", delay: 250  }});
    $( "#btn_masdatos" ).tooltip({      show: {effect: "explode",   delay: 250  }});
    $( "#btn_imprimir" ).tooltip({      show: {effect: "explode",   delay: 250  }});
    
    $("#fechai").datepicker({dateFormat: 'yy/mm/dd', showOn: 'both', buttonImage: 'img/calendar.ico', buttonImageOnly: true, changeYear: true,
        beforeShow: function() {$(".ui-datepicker").css('font-size', 12);},
        numberOfMonths: 1,
        onSelect: function(dateText) {            
        }        
    });

    $("#fechaf").datepicker({dateFormat: 'yy/mm/dd', showOn: 'both', buttonImage: 'img/calendar.ico', buttonImageOnly: true, changeYear: true,
        beforeShow: function() {$(".ui-datepicker").css('font-size', 12);},
        numberOfMonths: 1,
        onSelect: function(dateText) {
            //MuestraEntregados($('#efecha_r').val(), $('#optbuscar').val());
            //$("#cuentas").css("display","block");
        }
        /*onClose: function (selectedDate){CalculaTotalesR();} */
    });
///////////////// KEY PRESS //////////////////////

    $("#txt_buscacli").keypress(function (e) {
        //13 es el código de la tecla
        if (e.which === 13) {
            if ($("#txt_buscacli").val().trim() === '') {
                jWarning("Introduzca datos a buscar... ", "Giros - Transferencias");
            } else {
                if ($("#sele_buscar").val() === "A") {
                    //$("#dialogo_ubicacliente").dialog("open");
                    $("#divclientes").css("display","block");
                    fnMuestraClientes();
                }
                if ($("#sele_buscar").val() === "D") {
                    fnMuestraMovsCliente();
                    $("#btn_imprimir").attr("disabled",false); 
                }
            } 
        }
    });
//////////////////////////// CLICK ////////////////////////////
    $('#btn_buscar').click( function(){
        if ( $("#txt_buscacli").val().trim() === '' ){
            jWarning("Introduzca datos a buscar... ","Giros - Transferencias");
        } else {
            if ( $("#sele_buscar").val() ==="A" ) {
                    //$("#dialogo_ubicacliente").dialog("open");
                    $("#divclientes").css("display","block");
                    fnMuestraClientes();
                }
            if ( $("#sele_buscar").val() ==="D" ) {
                    fnMuestraMovsCliente();
                    $("#btn_imprimir").attr("disabled",false); 
                }            
            }
    });
    
    $('#btn_masdatos').click( function(){
        if ( $("#idgiro").val().trim() !=="" ) {
            $("#dialogo_masdatos").dialog("open");
        } else {
            jError("Elija una Transaccion...","Giros - Transferencias");
        }                    
    });
    
    $("#btn_imprimir").click(function(){
        
        fnImprimeReporte();
        
    });

//////////////////////// DIALOGO /////////////////////////    
/*    $("#dialogo_ubicacliente").dialog({autoOpen: false, resizable: true,
            modal: true, height: 350, width:340,
            show: {effect: "blind",duration: 500},
            hide: {effect: "fade",duration: 500},
            open: function (event, ui) {                
                var ntitulo = "Selecciona Cliente";
                $("span.ui-dialog-title").css("font-size", 10);
                $("span.ui-dialog-title").text(ntitulo);
                fnMuestraCliente( $('#txt_buscacli').val() ); 
            },
            buttons: {
                'Salir': function () {
                    $(this).dialog("close");
                }                
            },
            close: function (event, ui) {
                var html;
                $("#tbody_ubicacliente").html(html);
            }
        });
*/    
    $("#dialogo_masdatos").dialog({autoOpen: false, resizable: true,
            modal: true, height: 300, width:600,
            show: {effect: "blind",duration: 500},
            hide: {effect: "fade",duration: 500},
            open: function (event, ui) {
                var ntitulo = "Datos de : " + $('#datos_cliente').val();
                //var ntitulo = "Selecciona Cliente";
                $("span.ui-dialog-title").css("font-size", 10);
                $("span.ui-dialog-title").text(ntitulo);

            },
            buttons: {
                'Salir': function () {
                    $(this).dialog("close");
                }                
            },
            close: function (event, ui) {
                var html;
                //$("#tbody_adicional").html(html);
            }
        });    
    
////////////////////////////// editar tabla  //////////////////////////////////
/*===========================================================================*/

  $("#dialogo_CargaImagen").dialog({
    autoOpen: false,
    resizable: true,
    modal: true,
    height: 500,
    width: 400,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "fade", duration: 500 },
    open: function (event, ui) {
      var ntitulo = "Cargar Voucher";
      $("span.ui-dialog-title").css("font-size", 10);
      $("span.ui-dialog-title").text(ntitulo);
    },
    
  });

    $('#carga_imagen').click(function () {
        if ($("#correlativo_img").val().trim() !== '') {
            if ($("#md_fechaentrega").val() !== 'Pendiente') {
                $("#dialogo_CargaImagen").dialog("open");
            } else {
                jAlert("Transferencia esta pendiente, Verifique...", "Transferecnias")
            }
        } else {
            jAlert("Seleccione una Transferencia...", "Transferecnias")
        }
    });

    $('#btn_guarda_voucher').click(function () {
        if ($("#descripcion_img").val().trim() !== '') {
            uploadObj.startUpload();
        } else {
            jAlert("Falta descripcion... ", "Transferecnias")
        }
    });

    var uploadObj = $("#fileuploader").uploadFile({
        url: "public_html/php/upload.php", //url donde se enviará la petición
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
        maxFileCountErrorStr: "Acción no permitida, el número máximo de archivos a subir es: ", //string que aparece al momento de tener un error del número máximo de archivos
        dragDropStr: "<span><b>. ---</b></span>", //string que aparece al momento de tener un error de arrastrar y soltar varios archivos cuando la opción multiple está en false
        sizeErrorStr: "Acción no permitida, el tamaño máximo del archivo es: ", //string que aparece cuando los archivos superan el tamaño máximo permitido
        extErrorStr: "Acción no permitida, las extensiones válidas son: ", //string que aparece cuando existe un error en las extensiones de los archivos a cargar
        cancelStr: "Cancelar", //string del botón cancelar
        uploadStr: "Buscar Voucher", //string del botón cancelar
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
                $.post("php/delete.php", {op: "delete", name: data[i]},
                        function (resp, textStatus, jqXHR) {
                            //Show Message  
                            console.log("File Deleted");
                            jAlert("Archivo Eliminado...", "Transferencia de Archivos")
                        });
            }
            pd.statusbar.hide();
        },
        onSuccess: function (files, data, xhr, pd) {
            fnInsertaVoucher();
            pd.statusbar.hide();
        },
        onError: function (files, status, errMsg, pd) {
            //$("#eventsmessage").html($("#eventsmessage").html()+"<br/>Error for: "+JSON.stringify(files));
            jAlert("Error al cargar archivos, Verifique...", "Transferencia de Archivos")
        }
    });


 $("#btn_vouchere").click(function () {
    cambiaImagene($("#codgirosucursal").val().trim());
  });

  $("#dialogo_voucher_imge").dialog({
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

$("#btn_imprime_voucher").click(function () {
    var mode = "iframe";
    var close = mode === "popup";
    var options = { mode: mode, popClose: close };
    $("div.printableArea").printArea(options);
    /*fnRegistraImpresionVoucher();*/
  });


    
}); 

function fnLimpiaCampos(){
    
    $("#lista_sucursalo").prop("selectedIndex", 0);
    $("#lista_sucursald").prop("selectedIndex", 0);
    $("#txt_remitente").val("");
    $("#txt_beneficiario").val("");
    $("#txt_importe").val("");
    $("#txt_cargo").val("");
    $("#txt_otros").val("");
    $("#txt_total").val("");
    
}

function cambiaImagene(codigo) {
console.log(codigo);
console.log("acercndoa ala slucion");
  $("#dialogo_voucher_imge").dialog("open");
  var mivalor = "php/uploads/" + codigo + ".jpg";
  $("#dialogo_voucher_imge img").attr("src", mivalor);
}

