function fnTotalesIngSal() {
var sumai = 0; var sumas = 0; var sumao = 0;
    $('#TMovsAgente tr.dato').each(function(){ //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas  
        if ($(this).find('td').eq(2).text() ==='666') { $(this).css('color', 'DarkBlue');};
        if ($(this).find('td').eq(2).text() ==='555') { $(this).css('background-color', 'LightGray');}
        if ($(this).find('td').eq(18).text() ==='S') { $(this).css('color', 'tomato');};
        if ($(this).find('td').eq(2).text() ==='666' && $(this).find('td').eq(18).text() !=='S') {         
            sumao += parseInt($(this).find('td').eq(13).text()||0,10); //numero de la celda 12*/
            sumai += parseFloat($(this).find('td').eq(14).text()||0,10); 
            sumas += parseFloat($(this).find('td').eq(15).text()||0,10);
        };
    });
    $("#total_i").text(sumai.toFixed(2));
    $("#total_s").text(sumas.toFixed(2));
    $("#total_o").text(sumao);
}

function aDecimal(){    
    nimporte = $('#monto').val();
    $('#monto').val(parseFloat(Math.round(nimporte*100)/100).toFixed(2));    
}

function fnCreaTablaUsuarioCuenta(jsoncxu) {
  //LimpiaTabla();
  var html;
  for (var contador = 0; contador < jsoncxu.length; contador++) {
    html +=
      "<tr id='cu[" + contador + "]' ondblclick='fnSeleccionaCuenta(this.id);'>";
    var i = contador + 1;
    //html += "<td>" + i + "</td>";
    html += "<td>" + jsoncxu[contador].nusuario + "</td>";
    html += "<td>" + jsoncxu[contador].iniciales + "</td>";
    html += "<td>" + jsoncxu[contador].nrocuenta + "</td>";
    html += "</tr>";
  }
  $("#tbody_usuarioucenta").html(html);
}

function fnCreaTablaMovsAgente(jsonmovs){
  var voucher
    var html;
    for (var contador = 0; contador < jsonmovs.length; contador++) {
        html += "<tr id='mv[" + contador + "]' class='dato' onclick='fnSeleccionaMov(this.id);'>";
        var i = contador + 1;
        voucher = jsonmovs[contador].voucher;
        if (voucher == "XXX" || voucher == ''){
             html += "<td>" + " <button id='btn_anular' onclick='fnAnulaMovsAgente();' title='Anular' type='button' class='btn btn-default btn-xs' ><span class='glyphicon glyphicon-remove blue'></span></button>" + "</td>";
        } else {
            html += "<td>" + " <button id=" + jsonmovs[contador].voucher + " onclick='cambiaImagene(this.id);' title='Boucher' type='button' class='btn btn-default btn-xs' ><span class='glyphicon glyphicon-picture blue'></span></button>" + "</td>";
        }
        html += "<td>" + i + "</td>";
/*1*/   html += "<td style='display: none'>" +  jsonmovs[contador].idtransaccion + "</td>";
        html += "<td style='display: none'>" +  jsonmovs[contador].idtipotransaccion + "</td>";
        html += "<td>" +                        jsonmovs[contador].fecha_tran + "</td>";
        html += "<td>" +                        jsonmovs[contador].fechahora_tran + "</td>";
/*5*/   html += "<td>" +                        jsonmovs[contador].descripcion + "</td>";
        html += "<td style='display: none'>" +  jsonmovs[contador].cuentadest + "</td>";
        html += "<td class='editable' data-campo='observacion'><span>" + jsonmovs[contador].observacion + "</span> </td>";
        html += "<td>" +                        jsonmovs[contador].datostran + "</td>";       
        html += "<td >" +                       jsonmovs[contador].beneficiario + "</td>";
/*10*/  /* html += "<td style='display: none'>" +  jsonmovs[contador].usua_crea + "</td>"; */
/*10*/  html += "<td >" +  jsonmovs[contador].usua_crea + "</td>";
        html += "<td style='display: none'>" +  jsonmovs[contador].nrooperacion + "</td>";        
        html += "<td align='right' class='editable' data-campo='nromovs'><span>" +    jsonmovs[contador].nromovs + "</span> </td>";
/*13*/  html += "<td align='right' class='editable' data-campo='monto_ing'><span>" +  jsonmovs[contador].monto_ing + "</span> </td>";
/*14*/  html += "<td align='right' class='editable' data-campo='monto_sal'><span>" +  jsonmovs[contador].monto_sal + "</span> </td>";
        html += "<td align='right'>" +          jsonmovs[contador].saldofinalc + "</td>";
        html += "<td align='right'>" +          jsonmovs[contador].saldofinal + "</td>";
/*17*/  html += "<td style='display: none'>" +  jsonmovs[contador].anulado + "</td>";
        html += "</tr>";
    } 
    
    $("#tbody_MovsAgente").html(html);
    fnTotalesIngSal();
    
      $('#TMovsAgente').dataTable({
        "fnDrawCallback": function (oSettings) {
          // Need to redo the counters if filtered or sorted 
          if (oSettings.bSorted || oSettings.bFiltered) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++)
            { $('td:eq(1)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr).html(i + 1);}
          }
        },
        "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
        "aaSorting": [[1, 'asc']], "sScrollY": ($(window).height() - 220), "bPaginate": false,
        "bLengthChange": false, "bFilter": false, "bSort": true,
        "bInfo": false, "bAutoWidth": true, "bSortClasses": false //, "bJQueryUI": true
      });

}

function fnSeleccionaCuenta(idfila) 
{    
    var idfilac = $('#sele_cu').val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfilac);
    var color = elTableRow.style.backgroundColor; 
    elTableRow.style.backgroundColor = (elTableRow.style.backgroundColor === "LightSkyBlue") ? color : 'LightSkyBlue';
    if (idfilac !== idfila) {
        elTableRow1.style.backgroundColor = (elTableRow.style.backgroundColor === color ) ? 'LightSkyBlue' : color;
    }
    var elTableCells = elTableRow.getElementsByTagName("td");
    //for (var i = 0; i < elTableCells.length; i++) {
        $("#cta_destino").val( elTableCells[0].innerHTML + '=>' + elTableCells[1].innerHTML + ':' + elTableCells[2].innerHTML );
        $("#nro_cuentadest").val( elTableCells[2].innerHTML );
        //alert($("#cta_destino").val());
    //}    
     $("#sele_cu").val(idfila);
     $('#dialogo_cuentas').dialog('close');
	 /*console.log($("#nro_cuentadest").val());*/
}

function fnMuestraUsuarioCuenta(valorabuscar,optsql) {
    //if ($("#buscacuentausuario").val().trim() !== '')
    if ( valorabuscar !=='' )
    {    
        $.ajax({async: true, type: "POST", dataType: "json", cache: false,     
            data: {opcion: "CxU2", valor: valorabuscar,idempresa:$("#idempresa").val(), opsql: optsql}, 
            url: "controles/ManteCuentaUsuario.php",
            beforeSend: function (objeto) {$("#carga").html("<img src='img/loader.gif'>");},
            complete: function (objeto) {$('#carga').css('display', 'none');},
            success: fnCreaTablaUsuarioCuenta
        });
    } else {
        jAlert("Ingrese datos a buscar...", "Cuentas");
        //$("#buscacuentausuario").focus();
    }
    return false;
}

function fnMuestraMovsAgente(cuenta, fechai, fechaf) {
  /*console.log('token:',$('#token').val());*/
  $('#TMovsAgente').dataTable().fnDestroy();  
  $.ajax({async: true, type: "POST", dataType: "json", cache: false,
        data: {opt: "MOVSAGENTE",cuenta:cuenta, fecha_i: fechai, fecha_f: fechaf, mi_token:$('#token').val()},
        url: "controles/ManteAgentes.php",
        beforeSend: function (objeto) {$("#overlay").show();},
        complete: function (objeto) { $("#overlay").hide();},
        success: fnCreaTablaMovsAgente
    });
    return false;
}

function fnInsertaMovAgente(tipo, dinero, tipotran) {

  if ($("#tipotran").val() === "133" && $("#tipo_usuario").val() !== "ADMIN") {
    $.alert({ title: 'Denegado', content: 'Money-Flash', type: 'red' });
    return;
  }
  if ($("#tipotran").val() === "134" && $("#tipo_usuario").val() !== "ADMIN") {
    $.alert({ title: 'Denegado', content: 'Money-Flash', type: 'red' });
    return;
  } if ($("#tipotran").val() === "135" && $("#tipo_usuario").val() !== "ADMIN") {
    $.alert({ title: 'Denegado', content: 'Money-Flash', type: 'red' });
    return;
  } if ($("#tipotran").val() === "136" && $("#tipo_usuario").val() !== "ADMIN") {
    $.alert({ title: 'Denegado', content: 'Money-Flash', type: 'red' });
    return;
  }
  /**************************** ********  DEPOSITO CTA ASOCIADO ******************************** */
  if ($("#tipotran").val() === "102" || $("#tipotran").val() === "105") {
    if ($('#cta_destino').val() === '' || $('#monto').val().length === 0) {
      $.alert({ title: 'Faltan datos verifique...', content: 'Money-Flash', type: 'red', typeAnimated: true });
      return;
    }
    var data_adicional;
    if ($("#observacion").val().trim() !== "") {
      data_adicional = $("#cta_destino").val() + " ::" + $("#observacion").val();
      $("#observacion").val(data_adicional);
    } else {
      data_adicional = $("#cta_destino").val() + "*" + $("#agente_origen").val();
      $("#observacion").val(data_adicional);
    }
    /*seleccionado*/
    $("#cta_destino").val($("#nro_cuentadest").val());
  }

  /* TRANSFERENCIA HACIA OTRO AGENTE  */
  if ($("#tipotran").val() === "161" || $("#tipotran").val() === "163") {
    var data_adicional;
    if ($('#listaagentes').val() === '0' || $('#listaagentes').val() === '' || $('#monto').val().length === 0) {
      $.alert({ title: 'Faltan datos verifique...', content: 'Money-Flash', type: 'red', typeAnimated: true });
      return;
    }
    if ($("#observacion").val().trim() !== "") {
      data_adicional = $("#iniciales_destino").val() + ":" + $("#nrocuenta_destino").val() + " ::" + $("#observacion").val() +
        "*" + $("#iniciales").val() + ":" + $("#datos_cuenta").val();
      $("#observacion").val(data_adicional);
    } else {
      data_adicional = $("#iniciales_destino").val() + ":" + $("#nrocuenta_destino").val() + "*" + $("#iniciales").val() +
        ":" + $("#datos_cuenta").val(); $("#observacion").val(data_adicional);
    }
    $("#cta_destino").val($("#nrocuenta_destino").val());
    //alert($('#observacion').val());
  }

  /* TRASLADO EFECTIVO>>ASOCIADO */
  if ($("#tipotran").val() === "164") {
    var data_adicional;
    if ($("#observacion").val().trim() !== "") {
      data_adicional = $("#cta_destino").val() + " ::" + $("#observacion").val() + "*" + $("#agente_origen").val();
      $("#observacion").val(data_adicional);
    } else {
      data_adicional =
        $("#cta_destino").val() + "*" + $("#agente_origen").val();
      $("#observacion").val(data_adicional);
    }
    $("#cta_destino").val($("#nro_cuentadest").val()); /*seleccionado*/
    //alert($('#nro_operacion').val());
  }
  /*********** traslado a otra sucursal (efectivo y cuenta)***********************/
  if ($("#tipotran").val() === "165" || $("#tipotran").val() === "190") {
    console.log($('#listasucursal').val());
    var data_adicional;
    if ($('#listasucursal').val() === '0' || $('#listasucursal').val() === '' || $('#monto').val().length === 0){ 
      $.alert({title: 'Faltan datos verifique...', content: 'Money-Flash', type: 'red', typeAnimated: true});
     return;
    } 
    if ($("#observacion").val().trim() !== "") {
      data_adicional = $("#listasucursal option:selected").html() + " ::" + $("#observacion").val() + "*" + $("#iniciales").val() + "::" + $("#nro_cuenta").val();
      $("#observacion").val(data_adicional);
    } else {
      data_adicional = $("#listasucursal option:selected").html() + "*" + $("#iniciales").val() + "::" + $("#nro_cuenta").val();
      $("#observacion").val(data_adicional);
    }
  }

  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: {
      opt: "IT", nrocuenta: $("#nro_cuenta").val(), nrocuentadest: $("#cta_destino").val().trim(), dinero: dinero, monto: $("#monto").val(), ttran: tipotran,
      origen: $("#listasucursal").val(), idgiro: "0", nroop: $("#nro_operacion").val(), nromovs: $("#nromovs").val(), observa: $("#observacion").val(),
      respo: $("#usuariosistema").val(), modifica: $("#usuariosistema").val(), fechamov: $("#fechaf").val(), idempresa: $("#idempresa").val(), opsql: tipo
    },
    url: "controles/ManteAgentes.php",
    beforeSend: function (objeto) {
      $("#carga").css("display", "block");
      $("#carga").html("<img src='img/loader.gif'>");
    },
    complete: function (objeto) {
      fnMuestraMovsAgente($("#nro_cuenta").val(), $("#fechaf").val(), $("#fechaf").val());
      $("#divmovis").css("display", "none");
      $("#carga").css("display", "none");
      $("#btn_cancelar").css("display", "none");
      $("#btn_guardar").css("display", "none");
      /* $("#listatipotran").css("display", "none"); */
      $("#div_listatipotran").hide("slow");
      ManteMetasxAgente($("#nro_cuenta").val(), $("#fechaf").val(), $("#fechaf").val(), 0, 0, 'listauno');
    },
  });
}

async function fnGuardaMovs() {
try { 
  var fecha_seleccionada = $("#fechaf").val().replace(/\//g, '-');
  var fecha_servidor = await FechaServidor();
  console.log(fecha_servidor,'fechaf:', fecha_seleccionada);

  if (fecha_servidor === fecha_seleccionada) {
    if ($('#tipotran').val() !== "98") { //TrASLADO DE EFECTIVO
      if ($('#fechai').val() === $('#fechaf').val()) {
        if ($('#monto').val().trim() === '' || $('#listatipotran').val().trim() === 0 || $('#nro_cuenta').val().trim() === '') {
          jAlert('Elige TRANSACCION o Faltan datos, Verifique...', 'AGENTE');
        } else {
          jConfirm('¿Esta seguro de agregar TRANSACCION ' + $('#tipotran').val() + ' de: S/.' + $('#monto').val() + '\n' + 'Con Fecha: ' + $('#fechai').val(), "AGENTE", function (r) {
            if (r) {
              fnInsertaMovAgente($("#ingsal").val(), $('#tipodinero').val(), $('#tipotran').val());
              $("#listaagentes").prop("selectedIndex", 0); $("#listatipotran").prop("selectedIndex", 0);
              $("#listasucursal").prop("selectedIndex", 0); $("#listausuarios").prop("selectedIndex", 0);
            }
          });
        }
      } else { jAlert('Las fechas deben ser IGUALES' + '\n' + $('#fechai').val() + '\n' + $('#fechaf').val() + '\n' + 'Verifique...', 'CUENTAS'); }
    } else {
      if ($('#fechai').val() === $('#fechaf').val()) {
        if ($('#monto').val().trim() === '' || $('#listasucursal').val().trim() === "98") {
          jAlert('Faltan datos, Verifique...', 'AGENTE');
        } else {
          jConfirm('¿Esta seguro de agregar TRANSACCION de: S/.' + $('#monto').val() + '\n' + 'Con Fecha: ' + $('#fechai').val(), "AGENTE", function (r) {
            if (r) {
              fnInsertaMovAgente($("#ingsal").val(), $('#tipodinero').val(), $('#tipotran').val());
              $("#listaagentes").prop("selectedIndex", 0); $("#listatipotran").prop("selectedIndex", 0);
              $("#listasucursal").prop("selectedIndex", 0); $("#listausuarios").prop("selectedIndex", 0);
            }
          });
        }
      } else { jAlert('Elige una sucursal de destino...', 'Money-Flash'); }
    }

  }
} catch (error) { console.error("Error fechas no coiciden...:", error);} 

}   

async function fnAnulaMovsAgente() {
  try {
    var fecha_servidor = await FechaServidor();
    var evalua_ttran = ValidaTTran($("#idtipotran").val());
    var fecha_seleccionada = $("#fecha_tran").val();
    if (fecha_servidor !== fecha_seleccionada) {
      $.alert({ title: 'Solo fecha Actual', content: 'Money-Flash', type: 'red', typeAnimated: true });
      return;
    }
    if (evalua_ttran !== "SI" || anulado !== "N" || $("#tipo_usuario").val() !== "ADMIN" || $("#idtipotran").val() === "98") {
      $.alert({ title: 'Denegado', content: 'Money-Flash', type: 'red' });
      return;
    }
    if ($("#idtransaccion").val().trim() === "") {
      $.alert({ title: 'Selecciona un Movimiento...', content: 'Money-Flash', type: 'red' });
      return;
    }
    var verifica_pass = 0;
    /* ======================================================== */
    $.confirm({
      title: "Seguro de Anular Movimieto...",
        content: `
        <form>
            <input type="text" id="motivo_anula" class="form-control" readonly onfocus="this.removeAttribute('readonly');" placeholder="Motivo de Anulación">
            <input type="password" id="pass_confirm" class="form-control" readonly onfocus="this.removeAttribute('readonly');" placeholder="Codigo de Anulación" required>
        </form>`,
      onContentReady: function () {
        // Opcional: Forzar un pequeño delay para asegurar que el navegador no inyecte nada
        setTimeout(() => {
          this.$content.find('#motivo_anula, #pass_confirm').val('');
        }, 50);
      },
      type: 'red',
      buttons: {
        aceptar: {
          text: 'aceptar', btnClass: 'btn-red',
          action: async function () {
            if ($("#motivo_anula").val().trim() !== "") {
              const verifica_res = await VerificaPass($("#pass_confirm").val().trim());
              const motivo_anula = $("#motivo_anula").val();
              if (verifica_res && verifica_res.codigo > 0) {
                AnulaMovimiento(motivo_anula);
                $.alert({title: 'Anulación Exitosa', content: 'Money-Flash', type: 'green'});
              } else {
                const msg = (verifica_res && verifica_res.mensaje) ? verifica_res.mensaje : 'Contraseña Incorrecta';
                $.alert({ title: msg, content: 'Money-Flash', type: 'red' });
              }
            } else {
              $.alert({ title: 'Escriba motivo de la anulacion', content: 'Money-Flash', type: 'red' });
            }

          }
        },
        Cancelar: function () {
          $.alert({ title: 'Cancelado...', content: 'Money-Flash', type: 'red' });
        }
      }
    });
  } catch (error) { console.error("Error obteniendo la fecha del servidor:", error); }
}

function AnulaMovimiento(motivo_anulacion) {
  $.ajax({
    async: true, type: "POST", dataType: "json",
    cache: false,
    data: {
      opt: "ANULA", idtran: $("#idtransaccion").val(), fechamov: $("#fechaf").val(), nrocuenta: $("#nro_cuenta").val(), idtipotran: $("#idtipotran").val(),
      motivo: motivo_anulacion, monto: $("#montoanula").val(), usuamodi: $("#usuariosistema").val(), ingsal: $("#tipomov").val()
    },
    url: "controles/ManteAgentes.php",
    beforeSend: function (objeto) { $("#overlay").show(); },
    complete: function (objeto) { $("#overlay").hide(); },
    success: function (objeto) {
      fnLimpiaTabla();
      fnMuestraMovsAgente($("#nro_cuenta").val(), $("#fechaf").val(), $("#fechaf").val());
    },
  });
}

function fnAnulaMovAgente() {
  var evalua_ttran = ValidaTTran($("#idtipotran").val());
  var fecha_servidor = FechaServidor();
  var fecha_seleccionada = $("#fecha_tran").val();

  if (fecha_servidor === fecha_seleccionada) {
    if (evalua_ttran === "SI") {
      /* validar que la fecha sea solo de hoy , obtener fecha desde el servidor.....  */
      if ( anulado === "N" &&  $("#tipo_usuario").val() === "ADMIN" && $("#idtipotran").val() !== "98") {
        if ($("#idtransaccion").val().trim() === "") {
          jAlert("Selecciona un Movimiento...");
        } else {
          jPrompt("¿Seguro de Anular?" + "\n" + $("#motivo").val() + " : S/." + $("#ingresosalida").val() + "\n" + "Escriba MOTIVO de Anulacion"," ","Money-Flash",
            function (txt) {
              if (txt) {
                if (txt === " ") {
                  jError("Escriba motivo de Anulacion...", "Giros - Transferecncias" );
                } else {
                  $.ajax({
                    async: true, type: "POST", dataType: "json", cache: false,
                    data: {opt: "ANULA", idtran: $("#idtransaccion").val(), fechamov: $("#fechaf").val(), nrocuenta: $("#nro_cuenta").val(),
                      idtipotran: $("#idtipotran").val(), motivo: txt, monto: $("#montoanula").val(), usuamodi: $("#usuariosistema").val(), ingsal: $("#tipomov").val()},
                    url: "controles/ManteAgentes.php",
                    beforeSend: function (objeto) { $("#carga").html("<img src='img/loader.gif'>");},
                    complete: function (objeto) { $("#carga").css("display", "none"); },
                    success: function (objeto) {
                      fnLimpiaTabla();
                      fnMuestraMovsAgente( $("#nro_cuenta").val(), $("#fechaf").val(), $("#fechaf").val());
                    },
                  });
                }
              }
            }
          );
        }
      }
    }
  } else {jError("Denegado", "Money-Flash");}
  /* ==================   ======================= */
  if ( fecha_servidor !== fecha_seleccionada && $("#tipo_usuario").val() === "ADMIN" ) {
    if (evalua_ttran === "SI") {
      if ( anulado === "N" && $("#tipo_usuario").val() === "ADMIN" && $("#idtipotran").val() !== "98") {
        if ($("#idtransaccion").val().trim() === "") {
          jAlert("Selecciona un Movimiento...");
        } else {
          jPrompt("¿Seguro de Anular?" + "\n" + $("#motivo").val() + " : S/." + $("#ingresosalida").val() + "\n" + "Escriba MOTIVO de Anulacion", " ", "Money-Flash",
            function (txt) {
              if (txt) {
                if (txt === " ") {
                  jError( "Escriba motivo de Anulacion...", "Giros - Transferecncias");
                } else {
                  $.ajax({
                    async: true, type: "POST", dataType: "json", cache: false,
                    data: { opt: "ANULA", idtran: $("#idtransaccion").val(), fechamov: $("#fechaf").val(), nrocuenta: $("#nro_cuenta").val(),
                      idtipotran: $("#idtipotran").val(), motivo: txt, monto: $("#montoanula").val(), usuamodi: $("#usuariosistema").val(), ingsal: $("#tipomov").val(), },
                    url: "controles/ManteAgentes.php",
                    beforeSend: function (objeto) { $("#carga").html("<img src='img/loader.gif'>"); },
                    complete: function (objeto) { $("#carga").css("display", "none");},
                    success: function (objeto) {
                      fnLimpiaTabla();
                      fnMuestraMovsAgente($("#nro_cuenta").val(), $("#fechaf").val(), $("#fechaf").val());
                    },
                  });
                }
              }
            }
          );
        }
      }
    }
  } else {jError("Denegado", "Money-Flash");}
}

var seleccionado = "N";
var anulado="S";

function fnSeleccionaMov(idfila) {
if (seleccionado === "N" ){    
    var idfilamv = $('#sele_mv').val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfilamv);
    var color = elTableRow.style.backgroundColor; 
    elTableRow.style.backgroundColor = (elTableRow.style.backgroundColor === "LightSkyBlue") ? color : 'LightSkyBlue';
    if (idfilamv !== idfila) { 
        elTableRow1.style.backgroundColor = (elTableRow.style.backgroundColor === color ) ? 'LightSkyBlue' : color; 
    }
    var elTableCells = elTableRow.getElementsByTagName("td"); 
    $("#idtransaccion").val(elTableCells[2].innerHTML);
    $("#idtipotran").val(elTableCells[3].innerHTML);
    $("#fecha_tran").val(elTableCells[4].innerHTML);
    $("#motivo").val(elTableCells[6].innerHTML);
    
    var ing = elTableCells[14].innerHTML;    ing = ing.substring(6, ing.length-8);    
    var sal = elTableCells[15].innerHTML;    sal = sal.substring(6, sal.length-8);
    anulado=elTableCells[18].innerHTML;
    $("#ingreso").val(ing);    $("#salida").val(sal);
    if (parseFloat(ing) > 0 ){ $("#montoanula").val(ing); $("#tipomov").val("I"); } 
    else {$("#montoanula").val(sal); $("#tipomov").val("S");}
    var montomov = parseFloat($("#ingreso").val()) + parseFloat($("#salida").val());
    $("#ingresosalida").val(montomov);
    $("#sele_mv").val(idfila);
    }
}

function fnSeleccionaMeta(idfila) {
  if (seleccionado === "N") {
    var idfilac = $("#sele_meta").val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfilac);
    var color = elTableRow.style.backgroundColor;
    elTableRow.style.backgroundColor =
      elTableRow.style.backgroundColor === "LightSkyBlue"
        ? color
        : "LightSkyBlue";
    if (idfilac !== idfila) {
      elTableRow1.style.backgroundColor =
        elTableRow.style.backgroundColor === color ? "LightSkyBlue" : color;
    }
    var elTableCells = elTableRow.getElementsByTagName("td");
    $("#idmeta").val(elTableCells[0].innerHTML);
    $("#diag_fechai").val(elTableCells[1].innerHTML);
    $("#diag_fechaf").val(elTableCells[2].innerHTML);
    $("#diag_txt_meta").val(elTableCells[3].innerHTML);
    $("#sele_meta").val(idfila);
    var estado = elTableCells[6].innerHTML;
    /*console.log(estado);*/
    if (estado === "ABIERTO") {
      $("#btn_diag_cerrar").prop("disabled", false);
    } else {
      $("#btn_diag_cerrar").prop("disabled", true);
    }
  }
}

/////////////////////////// Document Ready  ////////////////////////////////////////
$(document).ready(function () {

/* =====================  side form ===================================== */
  // Toggle sidebar
  $('#toggleSidebar').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('.overlay_sf').toggleClass('active');
  });

  // Close sidebar when clicking cancel button
  $('#cancelButton').on('click', function () {
    $('#sidebar').removeClass('active');
    $('.overlay_sf').removeClass('active');
  });

  // Close sidebar when clicking on overlay
  $('.overlay_sf').on('click', function () {
    $('#sidebar').removeClass('active');
    $('.overlay_sf').removeClass('active');
  });

  // Form submission (just prevent default for this example)
  $('#userForm').on('submit', function (e) {
    e.preventDefault();
    alert('Formulario enviado! (Esta es sólo una demostración)');
    // Aquí iría la lógica para procesar el formulario
  });

  // Edit user action
  $('.edit-user').on('click', function () {
    let row = $(this).closest('tr');
    let name = row.find('td:first').text();
    alert('Editando usuario: ' + name);
    // Aquí iría la lógica para cargar los datos en el formulario
  });

  // Delete user action
  $('.delete-user').on('click', function () {
    let row = $(this).closest('tr');
    let name = row.find('td:first').text();
    if (confirm('¿Está seguro que desea eliminar a ' + name + '?')) {
      alert('Usuario eliminado (demostración)');
      // Aquí iría la lógica para eliminar el usuario
    }
  });
  $("#tabla_precuadre tr:last-child").css({
    "font-weight": "bold",
    "background-color": "#000",
    "color": "#fff"
  });
/* =========================================================================== */

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $("#dato_usuario").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    
    $("#formulario-toggle").click(function(e) {
        e.preventDefault();
        $("#formulario_agente").toggle(700);
    });
    
    $( "#btn_nuevo" ).tooltip({         show: {effect: "slideDown", delay: 250  }});
    $( "#btn_cancelar" ).tooltip({      show: {effect: "explode",   delay: 250  }});
    $( "#btn_guardar" ).tooltip({       show: {effect: "explode",   delay: 250  }});
    $( "#btn_usuariocuenta" ).tooltip({ show: {effect: "explode",   delay: 250  }});
    $( "#btn_movscuenta" ).tooltip({ show: {effect: "explode",   delay: 250  }});
    $( "#btn_editar" ).tooltip({ show: {effect: "explode",   delay: 250  }});
    $( "#btn_anular" ).tooltip({ show: {effect: "explode",   delay: 250  }});
    //$( "#btn_anula_agente" ).tooltip({ show: {effect: "explode",   delay: 250  }});
    
    $("#dialogo_cuentas").dialog({
      autoOpen: false,
      resizable: true,
      modal: true,
      height: 400,
      width: 360,
      show: { effect: "blind", duration: 500 },
      hide: { effect: "fade", duration: 500 },
      open: function (event, ui) {
        //var ntitulo = "Datos de : " + $('#codgirosucursal').val() + '// Fecha:' + $('#pdffecha').val();
        var ntitulo = "Selecciona Cuenta de Asociado";
        $("span.ui-dialog-title").css("font-size", 10);
        $("span.ui-dialog-title").text(ntitulo);
        fnMuestraUsuarioCuenta($("#idbanco").val(), "G"); //lista solo cuentas que pertencen al agente
      },
      buttons: {
        Salir: function () {
          $(this).dialog("close");
        },
      },
      close: function (event, ui) {
        var html;
        $("#tbody_masdatose").html(html);
      },
    });
    
    $("#monto").focusout( function(){
        aDecimal();
    });
    
    $('#btn_usuariocuenta').click(function() {
        $('#dialogo_cuentas').dialog('open');
    });

    $("#btn_cancelar").css("display", "none");
    $("#btn_guardar").css("display", "none");

    $('#btn_nuevo').click( function(){
        if ( $('#listabancos').val() !== '0' ){
            $("#btn_cancelar").css("display", "block");
            $("#btn_guardar").css("display", "block");
            /* $("#listatipotran").css("display", "block"); */
            $("#div_listatipotran").show("slow");
            fnLimpiaNuevo();
            $("#listatipotran").prop("selectedIndex", 0);
            $("#divmovis").css("display","none");
        } else {jAlert ('Elija Banco...','Agentes'); }
       
    });

    $('#btn_cancelar').click( function(){       
       fnLimpiaNuevo();
       $("#listatipotran").prop("selectedIndex", 0);
       $("#divmovis").css("display","none");
       $("#btn_cancelar").css("display", "none");
       $("#btn_guardar").css("display", "none"); 
       /* $("#listatipotran").css("display", "none"); */
       $("#div_listatipotran").hide("slow");
    });

  $('#btn_guardar').click(function () {
    fnGuardaMovs();
  });
    
  $("#btn_movscuenta").click(function () {
    if ($("#datos_cuenta").val().trim() !== "0") {
      jConfirm("¿Esta operacion puede DEMORAR, esta seguro de CONTINUAR??" + $("#fecha_cierre").val(), "Money-Flash", function (r) {
        if (r) {
          $("#TMovsAgente").dataTable().fnDestroy();
          $("#nombre_agente").val($("#listabancos option:selected").html());
          fnMuestraMovsAgente($("#nro_cuenta").val(), $("#fechaf").val(), $("#fechaf").val());
        }
      });
    } else {
      jAlert("Seleccione Agente...", "AGENTES");
    }
  });

$("#fechaf").prop('disabled', true);
 /*$('#fechai').css('visibility', 'hidden');*/

    $("#fechaf").datepicker({dateFormat: 'yy/mm/dd', showOn: 'both', buttonImage: 'img/calendar.ico', buttonImageOnly: true, changeYear: true,
        beforeShow: function() {$(".ui-datepicker").css('font-size', 12);},
        numberOfMonths: 1,
        onSelect: function(dateText) {
            ubicaVoucherSaldoAgente($("#nro_cuenta").val());
        }
    });

    $("#listabancos").change(function () {
      var optionSelected = $("#listabancos").val();

      var n = optionSelected.indexOf(":"); // posicion desde donde empeza r a separar
      var last = optionSelected.lastIndexOf(":");

      $("#iniciales").val(optionSelected.substr(0, n));

      $("#idbanco").val(optionSelected.substr(n + 1, 3));

      $("#nro_cuenta").val(optionSelected.substr(last + 1, 50));
      $("#cod_img").val(optionSelected.substr(last + 1, 30));

      $("#datoagente").val($("#nro_cuenta").val().trim());

      $("#datos_cuenta").val($("#nro_cuenta").val().trim());
      $("#agente_origen").val($("#listabancos option:selected").html());

      if ($("#nro_cuenta").val().trim() !== "") {
        ubicaVoucherSaldoAgente($("#nro_cuenta").val());
        ManteMetasxAgente($("#nro_cuenta").val(),$("#fechaf").val(),$("#fechaf").val(),0,0,'listauno');
      } else {
        /*console.log("object");*/
      }
    });
 
 $("#listaagentes").change(function(){
     var optionSelected = $('#listaagentes').val();
     var last = optionSelected.lastIndexOf(":");
     var n=optionSelected.indexOf(":");     
        //alert(optionSelected.substring(last+1,30));
     if( $("#datos_cuenta").val().trim() === optionSelected.substr(last+1,30) ){
         jError("Seleccione Otro AGENTE...","Money-Flash");
         $("#listaagentes").prop("selectedIndex", 0);
         $("#datos_cuenta").val("");
     } else {
         $("#nrocuenta_destino").val(optionSelected.substr(last+1,30));
         $("#iniciales_destino").val(optionSelected.substr(0,n));
        /* alert($("#nrocuenta_destino").val()); */
     }
     
 });
 /* ======== vakida campos========== */
$('#monto').validacampos('.0123456789');
$('#txt_sideform').validacampos('.0123456789');
$('#nromovs').validacampos('0123456789');
$('#nro_operacion').validacampos('0123456789');


$("#div_listatipotran").hide("slow");

$("#divmovis").hide("slow");

var nromovs=0;
$("#nromovs").val(nromovs);

  $('#listatipotran').one('focus', function() {
    $(this).val('');
    $("#listatipotran").prop("selectedIndex", 0);
  });

$('#listatipotran').change(function () {
    console.log($('#listatipotran').val());
    var val_optionSelected = $('#listatipotran').val();
    var optionSelected = val_optionSelected.replace(/[0-9]/g, ''); /* elimina los numeros */
    var nro = val_optionSelected.match(/\d+(\.\d+)?/g); /* extrae los numeros */
    var ttran = nro[0];  /* asigna el numero extraido a ttran */
    console.log(ttran);
    $('#tipotran').val(ttran);
    $("#ingsal").val($('#listatipotran').val().substring(0,1));
    if(optionSelected.length === 2){
       $('#tipodinero').val(optionSelected.substring(1,2));
       /* console.log(optionSelected.substring(1,2)); */
    }
    if(optionSelected.length === 3){
       $('#tipodinero').val(optionSelected.substring(1,3));
       /* console.log(optionSelected.substring(1,3)); */
    }

     fnLimpiaNuevo();
   /*  $("#divmovis").css("display","block"); */
    $("#divmovis").show("slow");
    switch(optionSelected) {
        case 'IC':                       
            $('#cta_destino').css('display','none');
            /* $('#listaagentes').css('display','none'); */
            $('#div_listaagentes').css('display','none');
            $('#btn_usuariocuenta').css('display','none');
            
            $('#spannro_operacion').css('display','none');            
            $('#nro_operacion').css('display','none');
            /* $('#listasucursal').css('display','none'); */
            $('#div_listasucursal').css('display','none');
            /* $('#listausuarios').css('display','none'); */
            $('#div_listausuarios').css('display','none');
            $('#spannromovs').css('display','none');
            $('#nromovs').css('display','none');
            /*depo al agente*/
            if (ttran === '100'){
                /* $('#listasucursal').css('display','block'); */
                $('#div_listasucursal').css('display','block');
                /* $('#listausuarios').css('display','block'); */
                $('#div_listausuarios').css('display','block');
              } 
            /*RETIRO CNTA A SOCIADO*/
            if (ttran === '105' ){$('#cta_destino').css('display','block'); $('#btn_usuariocuenta').css('display','block');
                                    $('#spannro_operacion').css('display','block');   $('#nro_operacion').css('display','block');
                                    $('#spannromovs').css('display','block'); $('#nromovs').css('display','block');} /*retiro cuenta asociado*/            
        break;
        case 'SC':
            $('#cta_destino').css('display','block');
            /* $('#listaagentes').css('display','none'); */
            $('#div_listaagentes').css('display','none');
            $('#btn_usuariocuenta').css('display','block');
            
            $('#spannro_operacion').css('display','block'); 
            $('#nro_operacion').css('display','block');
            /* $('#listasucursal').css('display','none'); */
            $('#div_listasucursal').css('display','none');
            /* $('#listausuarios').css('display','none'); */
            $('#div_listausuarios').css('display','none');
            $('#spannromovs').css('display','block');       
            $('#nromovs').css('display','block');
            if (ttran === '115' || ttran === '148' || ttran === '136'){/*ITF,COMISION,AJUSTE*/
                $('#cta_destino').css('display','none');
                $('#btn_usuariocuenta').css('display','none');
                $('#spannro_operacion').css('display','none'); 
                $('#nro_operacion').css('display','none');
                /* $('#listasucursal').css('display','none'); */
                $('#div_listasucursal').css('display','none');
                /* $('#listausuarios').css('display','none'); */
                $('#div_listausuarios').css('display','none');
                $('#spannromovs').css('display','none');       
                $('#nromovs').css('display','none');
            }
            if ( ttran === '159'){
                $('#cta_destino').css('display','none');
                $('#btn_usuariocuenta').css('display','none');
                /* $('#listasucursal').css('display','block'); */
                $('#div_listasucursal').css('display','block');
                $('#nromovs').css('display','none');
                $('#spannromovs').css('display','none');
            }
            if ( ttran === '161' || ttran === '163' ){
                $('#cta_destino').css('display','none');
                /* $('#listaagentes').css('display','block'); */
                $('#div_listaagentes').css('display','block');
                $('#btn_usuariocuenta').css('display','none');
                /* $('#listasucursal').css('display','none'); */
                $('#div_listasucursal').css('display','none');
                $('#nromovs').css('display','none');
                $('#spannromovs').css('display','none');
            }
            if ( ttran === '161' || ttran === '163' ){
                $('#cta_destino').css('display','none');
                /* $('#listaagentes').css('display','block'); */
                $('#div_listaagentes').css('display','block');
                $('#btn_usuariocuenta').css('display','none');
                /* $('#listasucursal').css('display','none'); */
                $('#div_listasucursal').css('display','none');
                $('#nromovs').css('display','none');
                $('#spannromovs').css('display','none');
            }
            if ( ttran === '190'){
                $('#cta_destino').css('display','none');
                $('#btn_usuariocuenta').css('display','none');
                /* $('#listasucursal').css('display','block'); */
                $('#div_listasucursal').css('display','block');
                $('#nromovs').css('display','none');
                $('#spannromovs').css('display','none');
            }
            
            break;
        case 'IE':
            $('#cta_destino').css('display','none');
            /* $('#listaagentes').css('display','none'); */
            $('#div_listaagentes').css('display','none');
            $('#btn_usuariocuenta').css('display','none');
            
            $('#spannro_operacion').css('display','none'); 
            $('#nro_operacion').css('display','none');
            /* $('#listasucursal').css('display','block'); */
            $('#div_listasucursal').css('display','block');
            $('#listausuarios').css('display','block');
            $('#spannromovs').css('display','none');       
            $('#nromovs').css('display','none');
            if (ttran === '133'){
                /* $('#listasucursal').css('display','none'); */
                $('#div_listasucursal').css('display','none');
                /* $('#listausuarios').css('display','none'); */
                $('#div_listausuarios').css('display','none');
                
              }
        break;
        case 'SE':
            $('#cta_destino').css('display','none');
            /* $('#listaagentes').css('display','none'); */
            $('#div_listaagentes').css('display','none');
            $('#btn_usuariocuenta').css('display','none');
            
            $('#spannro_operacion').css('display','none'); 
            $('#nro_operacion').css('display','none');
            /* $('#listasucursal').css('display','block'); */
            $('#div_listasucursal').css('display','block');
            /* $('#listausuarios').css('display','none'); */
            $('#div_listausuarios').css('display','none');
            
            $('#spannromovs').css('display','none');
            $('#nromovs').css('display','none');
            if (ttran === '104'){/*retiro ctapropia,ajuste efectivo*/
                $('#spannro_operacion').css('display','block'); 
                $('#nro_operacion').css('display','block');
                /* $('#listasucursal').css('display','none'); */
                $('#div_listasucursal').css('display','none');
                $('#spannromovs').css('display','block');
                $('#nromovs').css('display','block');
            }
            if (ttran === '134'){ 
                /* $('#listasucursal').css('display','none'); */
                $('#div_listasucursal').css('display','none');
            }
            
            if (ttran === '163'){
                /* $('#listaagentes').css('display','block'); */
                $('#div_listaagentes').css('display','block');
                /* $('#listasucursal').css('display','none'); */
                $('#div_listasucursal').css('display','none');
            }
            
            if (ttran === '164'){
                $('#cta_destino').css('display','block');
                $('#btn_usuariocuenta').css('display','block'); 
                /* $('#listasucursal').css('display','none'); */
                $('#div_listasucursal').css('display','none');
            }
            
        break;
        case 'IEC':
            $('#cta_destino').css('display','none');
            /* $('#listaagentes').css('display','none'); */
            $('#div_listaagentes').css('display','none');
            $('#btn_usuariocuenta').css('display','none');
            
            $('#spannro_operacion').css('display','block'); 
            $('#nro_operacion').css('display','block');
            /* $('#listasucursal').css('display','none'); */
            $('#div_listasucursal').css('display','none');
            /* $('#listausuarios').css('display','none'); */
            $('#div_listausuarios').css('display','none');
            $('#spannromovs').css('display','block');
            $('#nromovs').css('display','block');
            if (ttran === '104'){/*pago servicos,otros,recarga*/
                
            }            
        break;
    };
   });

  $('#lista_sideform').change(function () {
    var textoSeleccionado = $(this).find("option:selected").text();
    var val_optionSelected = $('#lista_sideform').val();
    var optionSelected = val_optionSelected.replace(/[0-9]/g, ''); /* elimina los numeros */
    var nro = val_optionSelected.match(/\d+(\.\d+)?/g); /* extrae los numeros */
    var ttran = nro[0];  /* asigna el numero extraido a ttran */
    /*console.log(ttran);*/
    $('#idtipotransaccion').val(ttran);
    $('#descripcion_precuadre').val(textoSeleccionado);
    $("#ingsal_pc").val($('#lista_sideform').val().substring(0,1)); /* ingreso/salida */
    /*console.log(textoSeleccionado);*/
    if (optionSelected.length === 2) {
      $('#tipo_dinero_pc').val(optionSelected.substring(1, 2));
      /*console.log(optionSelected.substring(1, 2));*/
    }
    if (optionSelected.length === 3) {
      $('#tipo_dinero_pc').val(optionSelected.substring(1, 3));
      /*console.log(optionSelected.substring(1, 3));*/
    }

  });

///////////////////////////////////////////////////////////////////////
/////////////////////////// EDITA CAMPOS //////////////////////////////
    var td, campo, valor, id;

    $(document).on("dblclick", "td.editable span", function (e)
    {
        if ($("#fechaf").val() === $("#fechaf").val()) {
            var evalua_ttran = ValidaTTran($("#idtipotran").val());
            if (anulado === "N" && $("#tipo_usuario").val().trim() === "ADMIN" && evalua_ttran === "SI" ) {
                valor = $(this).text();
                if (valor !== '0.00') {
                    e.preventDefault();
                    $("td:not(.id)").removeClass("editable");
                    td = $(this).closest("td");
                    campo = $(this).closest("td").data("campo");
                    id = $(this).closest("tr").find(".id").text();
                    td.text("").html("<input type='text' onkeyup='javascript:this.value=this.value.toUpperCase();' name='" + campo + "' value='" + valor + "'><a class='enlace guardar' href='#'> </a> <a class='enlace cancelar' href='#'></a> ");
                } else {
                    e.preventDefault();
                    $("td:not(.id)").removeClass("editable");
                    td = $(this).closest("td");
                    campo = $(this).closest("td").data("campo");
                    id = $(this).closest("tr").find(".id").text();
                    td.text("").html("<input type='text' readonly='readonly' name='" + campo + "' value='" + valor + "'> <a class='enlace cancelar' href='#'></a> ");
                }
                seleccionado = "S";
            } else {
                jError('Deshabilitado...', 'Money-Flash');
            }
        }
        else {
            jError('Fecha Inicial y Fecha Final deben ser iguales para EDITAR\n' + $("#fechaf").val() + ' <> ' + $("#fechaf").val(), 'Money-Flash');
        }
    });

    $(document).on("click", ".guardar", function (e) {
      var fecha_servidor = FechaServidor();
      var fecha_seleccionada = $("#fecha_tran").val();
      if (fecha_servidor === fecha_seleccionada) {
        $(".mensaje").html("<img src='img/cargando.gif'>");
        e.preventDefault();
        nuevovalor = $(this).closest("td").find("input").val();
        // definimos tipo de movimiento
        var nuevomonto = 0;
        var ing_o_sal = 0;
        var monto_i = parseFloat($("#ingreso").val()); //dato capturados al seleccionar fila
        var monto_s = parseFloat($("#salida").val()); //dato capturados al seleccionar fila
        nuevomonto = parseFloat(nuevovalor); // capturado al editar fila, tambien servira para actualizar transaccion
        if (monto_i === 0) {
          ing_o_sal = monto_s;
        } // para saber si columna tiene valor > 0
        if (monto_s === 0) {
          ing_o_sal = monto_i;
        }

        actualizamonto = ing_o_sal - nuevomonto; // la diferencia a actualizar en saldos

        //alert($("#idtransaccion").val().trim());
        var mensaje = "Esta seguro de Editar ?";

        jConfirm(mensaje, "Money-Flash", function (r) {
          if (r) {
            if (nuevovalor.trim() !== "") {
              $.ajax({
                type: "POST",
                url: "controles/ManteAgentes.php",
                data: {
                  opt: "EDITA",
                  idtran: $("#idtransaccion").val().trim(),
                  campo: campo,
                  descripcion: nuevovalor,
                  monto: actualizamonto,
                  fechamov: $("#fechaf").val(),
                  nrocuenta: $("#nro_cuenta").val(),
                  usuamodi: $("#usuariosistema").val(),
                  ingsal: $("#tipomov").val(),
                },
              }).done(function (msg) {
                $(".mensaje").css("display", "block");
                $(".mensaje").html(msg);
                td.html("<span>" + nuevovalor + "</span>");
                $("td:not(.id)").addClass("editable");
                setTimeout(function () {
                  $(".ok,.ko").fadeOut("fast");
                }, 2000);
                seleccionado = "N";
                fnLimpiaTabla();
                fnMuestraMovsAgente( $("#nro_cuenta").val(), $("#fechaf").val(), $("#fechaf").val() );
              });
            } else {
              $(".mensaje").html("<p class='ko'>Debes ingresar un valor</p>");
            }
          }
        });
      } else {
        jError("Denegado", "Money-Flash");
      }
    });

    $(document).on("click", ".guardagrupo", function (e)
    {
        $(".mensaje").html("<img src='img/loader.gif'>");
        e.preventDefault();
        tusuario = $(this).closest("td").find("select").val();
        if (tusuario.trim() !== "")
        {
            var campo = 'grupo';
            $.ajax({type: "POST",url: "controles/ManteBancos.php",
                data: {opcion: 'ACTUALIZA', campo: campo, valor: tusuario, id: id}
            }).done(function (msg) {$('.mensaje').css('display', 'block');$(".mensaje").html(msg);
                td.html("<span>" + tusuario + "</span>");$("td:not(.id)").addClass("editable");
                setTimeout(function () {$('.ok,.ko').fadeOut('fast');}, 3000);
            });
        } else {$(".mensaje").html("<p class='ko'>Debes seleccionar un valor</p>");}

    });

    $(document).on("click", ".cancelar", function (e)
    {
        e.preventDefault();
        td.html("<span>" + valor + "</span>");
        $("td:not(.id)").addClass("editable");
        seleccionado = "N";
    });
 /////////////////////////////////////////////////////////////////////////
 
 $(window).resize(function () {
    $('#TMovsAgente').dataTable().fnDestroy();
    var objDataTable = $('#TMovsAgente').dataTable({
      "fnDrawCallback": function (oSettings) {
        // Need to redo the counters if filtered or sorted 
        if (oSettings.bSorted || oSettings.bFiltered) {
          for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++)
          {
            $('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr).html(i + 1);
          }
        }
      },
      "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
      "aaSorting": [[1, 'asc']], "sScrollY": ($(window).height() - 220), "bPaginate": false,
      "bLengthChange": false, "bFilter": false, "bSort": true,
      "bInfo": false, "bAutoWidth": true, "bSortClasses": false //, "bJQueryUI": true
    });
    objDataTable.fnSettings().oScroll.sY = 220;
    objDataTable.fnDraw();
  });

  //fnMuestraMovsAgente($('#nro_cuenta').val(), $('#fechai').val(), $('#fechaf').val() );
  
  $("#btn_imprime_movs").click(function() {
	if ($("#datos_cuenta").val() !== '') {
	  jConfirm("¿Se imprimira Movimientos de agente: "+ $("#nombre_agente").val() +"\n Del: " + $("#fechaf").val() +" al: "+$("#fechaf").val(), "Transferencias", function(r) {
		if (r) {
		  var nomagente = $("#nombre_agente").val();
		  var fecha_i = $("#fechaf").val();
		  var fecha_f = $("#fechaf").val();
		  var nusuario = $("#usuariosistema").val();

		  window.open('reportes/rptMovsAgente.php?nombreagente=' + $("#nombre_agente").val() + '&nrocuenta=' + $("#datos_cuenta").val() + 
				  '&fecha_i=' + $("#fechaf").val() +'&fecha_f=' + $("#fechaf").val() + '&nusuario=' + $("#usuariosistema").val(), '&token=' + $("#token").val(),+'_blank');  
		}
	  });
	} else {
	  jAlert('Seleccione Agentes antes de imprimir, verifique...', 'Transferencias');
	}
  });
  
  $("#btn_anula_agente__").click(function () {
    //AnulaCuenta();
    jConfirm(
      "¿Esta seguro de ANULAR NroCuenta :" + $("#nro_cuenta").val(),
      "Asociados",
      function (r) {
        if (r) {
          AnulaCuenta();
          $("#btn_anula_agente").attr("disabled", true);
        }
      }
    );
  });
//=====================================//

//  console.log($("#listasucursal option:selected").html());

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

//==============================================//
    var uploadObj = $("#fileuploader").uploadFile({
      url: "php/upload_vsa.php", //url donde se enviará la petición
      multiple: false, //defino que no se puedan arrastrar y soltar mas de 1 archivo
      allowedTypes: "png,jpg,jpeg,pdf", // extensiones permitidas
      fileName: "image", //nombre del archivo a enviar por $_Files
      newName:"nuevo",
      showDelete: false, //mostrar botón eliminar
      showDone: false, //ocultar botón de Hecho
      showProgress: true, //mostrar barra de progreso
      showPreview: true, //mostrar previsualización de las imagenes a cargar
      previewHeight: "200px",
      previewWidth: "150px",
      autoSubmit: false, //deshabilitar el envio del archivo automaticamente, para poder ser enviado se utiliza la función startUpload()
      showStatusAfterSuccess: true, //mostrar estado despues de haber cargado correctamente las imagenes
      maxFileCount: 1, //número máximo de archivos a subir
      maxFileSize: 3145728, //tamaño máximo permitido de los archivos en bytes, en MB: 3MB
      maxFileCountErrorStr:
        "Acción no permitida, el número máximo de archivos a subir es: ", //string que aparece al momento de tener un error del número máximo de archivos
      dragDropStr: "<span><b>.</b></span>", //string que aparece al momento de tener un error de arrastrar y soltar varios archivos cuando la opción multiple está en false
      sizeErrorStr: "Acción no permitida, el tamaño máximo del archivo es: ", //string que aparece cuando los archivos superan el tamaño máximo permitido
      extErrorStr: "Acción no permitida, las extensiones válidas son: ", //string que aparece cuando existe un error en las extensiones de los archivos a cargar
      cancelStr: "Cancelar", //string del botón cancelar
      uploadStr: "Buscar Imagen", //string del botón cancelar
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
            "php/delete_vsa.php",
            { op: "delete", name: data[i] },
            function (resp, textStatus, jqXHR) {
              //Show Message
              /*console.log("File Deleted");*/
              jAlert("Archivo Eliminado...", "Transferencia de Archivos");
            }
          );
        }
        pd.statusbar.hide();
      },
      onSuccess: function (files, data, xhr, pd) {
        InsertaVoucherSaldoAgente();
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

$("#btn_vsa__").click(function () {
  if ($("#datos_cuenta").val() === ""){
     jAlert("Elija un Agente... ", "Money Flash");
  }
  else {
    if ( parseInt($("#id_vsa").val()) === 0 ){
    //   /*console.log(parseInt($("#id_vsa").val()));*/
      $("#imageModal").dialog("open");
    }
    else {
      var id_vsa = parseInt($("#id_vsa").val());
      CambiaImagen_vsa(id_vsa);
    }
  }
});

  $("#btnGuardaVoucher_VSA").click(function () {
    if ($("#descripcion_img").val().trim() !== "") {
      var newName = $("#cod_img").val();
      var formData = new FormData();
      formData.append('newName', newName);

      uploadObj.startUpload();
      
    } else {
      jAlert("Falta descripcion... ", "Transferecnias");
    }
  });

  $("#DialogoCargaImagen_VSA").dialog({
    autoOpen: false, resizable: true, modal: true, height: 500, width: 400,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "fade", duration: 500 },
    open: function (event, ui) {
      var ntitulo = "Cargar Voucher";
      $("span.ui-dialog-title").css("font-size", 10);
      $("span.ui-dialog-title").text(ntitulo);
    },
    buttons: {
      Salir: function () {
        $("#DialogoCargaImagen_VSA").dialog("close");
      },
    },

    close: function (event, ui) {},
  });

  $("#dialogoMuestraImagen_vsa").dialog({
    autoOpen: false,
    resizable: true,
    modal: true,
    height: 500,
    width: 400,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "fade", duration: 500 },
    open: function (event, ui) {
      var ntitulo = "Imprimir  SA";
      $("span.ui-dialog-title").css("font-size", 12);
      $("span.ui-dialog-title").text(ntitulo);
    },
    close: function (event, ui) {},
  });

$("#btn_imprime_vsa").click(function () {
    var mode = "iframe";
    var close = mode === "popup";
    var options = { mode: mode, popClose: close };
    $("div.printableArea").printArea(options);
    /*fnRegistraImpresionVoucher();*/
  });

    $('#btn_elimina_vsa').click(function () {
       fnAnulaVoucher_vsa();
    });
/* =========================================================== */
/* ================ guardar imagenes ========================= */
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
        MuestraCambiaImagen($("#nombre_archivo").val());
      },
    });

    $("#btn_vsa").click(function () {
      if ($("#datos_cuenta").val() === "") {
        jAlert("Elija un Agente... ", "Money Flash");
      } else {
        if (parseInt($("#id_vsa").val()) === 0) {
          /*console.log(parseInt($("#id_vsa").val()));
          console.log($("#datos_cuenta").val());*/
          ServerDate();
          $("#imageModal").dialog("open");
        } else {
          $("#imageModal_View").dialog("open");
        }
      }
    });

 $("#btn_meta__").click(function () {
    if ($("#tipo_usuario").val() === "ADMIN" && $("#nro_cuenta").val() !== "") {
      $.confirm({
        title: 'Cambiar META (Nro. de Operaciones)',
        content: '<div class="form-group">' +
        '<div class="mb-3">' +
        '<label class="form-label">Ingrese META</label>' +
        '<input id="txt_meta" type="number" value="' + $("#spn_meta").text() + '" class="form-control" onkeypress="return event.charCode >= 48 && event.charCode <= 57" />' +
        '</div>' +
        '<div class="mb-3">' +
        '<label class="form-label">Fecha Inicial</label>' +
        '<input id="txt_fechai" type="date" class="form-control" value="' + $("#nroops_fechai").val() + '" />' +
        '</div>' +
        '<div class="mb-3">' +
        '<label class="form-label">Fecha Final</label>' +
        '<input id="txt_fechaf" type="date" class="form-control" value="' + $("#nroops_fechaf").val() + '" />' +
        '</div>' +
        '</div>',
        didOpen: function () {
          try { $('#txt_meta').val(''); $('#txt_fechai').val(''); $('#txt_fechaf').val(''); } catch (e) { }
        },
        type: 'green',
        buttons: {
            nuevo: {text: 'nuevo', btnClass: 'btn-blue',
                action: function(){
                  /* ManteNroOps($("#nro_cuenta").val(), $("#txt_fechai").val(), $("#txt_fechaf").val(), $("#txt_meta").val(),0, 'I'); */
                  $("#txt_meta").val('');
                  $("#txt_fechai").val('');
                  $("#txt_fechaf").val('');
                  $("#meta_opcion").val('I');
                  return false;
                }
            },
            guardar: {text: 'guardar', btnClass: 'btn-green',
                action: function(){
                  ManteNroOps(("#nro_cuenta").val(), $("#txt_fechai").val(), $("#txt_fechaf").val(), $("#txt_meta").val(),$("#meta_opcion").val());
                  
                }
            },
            cancelar: function () { $.alert("Cacelado...");
                $("#txt_meta").val('');
                $("#txt_fechai").val('');
                $("#txt_fechaf").val('');
                $("#meta_opcion").val('');
            }
        }
      });
    } else { $.alert({title: 'Denegado', content: 'Money-Flash', type: 'red'});}
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
        var valor2 = $('#datos_cuenta').val();
        newFileName = valor1 + '_' + valor2;
        /*console.log(newFileName);*/
        /* let newFileName = $('#datos_cuenta').val() || file.name; */
        let formData = new FormData();
        formData.append('image', file);
        formData.append('newFileName', newFileName);
        $.ajax({
            url: 'php/upload_vsa.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                alert(response);
                InsertaVoucherSaldoAgente(newFileName);
                $('#fileInput').val('');
                $('#newFileName').val('');
                $('#uploadPreview').empty();
                $('#datos_cuenta').val('');
                $("#imageModal").dialog("close");
            },
            error: function() {
                alert('Error al cargar la imagen.');
            }
        });
    });

    $("#searchBtn").on("click", function () {

    });

/* =========== Botones dialogo metas ====== */
$("#btn_diag_guardar").prop("disabled", true);
$("#btn_diag_cerrar").attr("disabled", true);

/* ===========  ====== */
$("#btn_diag_cancelar").click(function () {
  $("#div_txt_metas").css('display', 'none');
  $("#diag_fechai").val('');
  $("#diag_fechaf").val('');
  $("#diag_txt_meta").val('');
  $("#btn_diag_cerrar").prop("disabled", true);
  $("#btn_diag_guardar").prop("disabled", true);
});

$("#btn_diag_nuevo").click(function () {
  if ($("#meta_estado").val().trim() !== "A") {
      $("#div_txt_metas").css('display', 'block');
      $("#diag_fechai").val('');
      $("#diag_fechaf").val('');
      $("#diag_txt_meta").val('');
      $("#btn_diag_guardar").prop("disabled", false);
      $("#btn_diag_cerrar").prop("disabled", true);
  } else { jError("Existen meta abierta, cierre para continuar...", "Money-Flash"); }
});

  $("#btn_diag_guardar").click(function () {
  if ($("#meta_estado").val().trim() !== "A") {
    if ($("#diag_fechai").val() !== $("#diag_fechaf").val()) {
      if ($("#tipo_usuario").val().trim() === 'ADMIN') {
        if ( $("#diag_fechai").val() !== "" && $("#diag_fechaf").val() !== "" &&  $("#diag_txt_meta").val() !== "" ) {
          fnMuestraMetasAgente(
            $("#nro_cuenta").val(),
            $("#diag_fechai").val(),
            $("#diag_fechaf").val(),
            $("#diag_txt_meta").val(), 
            '0',
            "insertar");
          $("#btn_diag_guardar").prop("disabled", true);
          $("#btn_diag_cerrar").prop("disabled", true);
          $("#div_txt_metas").css('display', 'none');
        } else { jError("Faltan datos...", "Money-Flash"); }
      } else { jError("Deshabilitado...", "Money-Flash"); }
    } else {jError("Fecha Inicial y Fecha Final deben ser diferentes", "Money-Flash"); }
  } else { jError("Existen meta abierta, cierre para continuar...", "Money-Flash"); }
  });

$("#btn_diag_cerrar").click(function () {
  if ($("#tipo_usuario").val().trim() === "ADMIN") {
    fnMuestraMetasAgente(
      $("#nro_cuenta").val(),
      $("#diag_fechai").val(),
      $("#diag_fechaf").val(),
      $("#diag_txt_meta").val(),
      $("#idmeta").val(),
      "cerrar");
    $("#btn_diag_guardar").prop("disabled", true);
  } else {
    jError("Deshabilitado...", "Money-Flash");
  }
});

$("#btn_metasxagente").click(function () {
   fnMuestraMetasAgente( $("#nro_cuenta").val(), $("#fechaf").val(), $("#fechaf").val(),  '0', '0', 'listar');
});

$("#btn_precuadre").click(function () {
  fnMuestraPrecuadre($("#nro_cuenta").val(), $("#fechaf").val());
  $("#descripcion_sideform").val("");
  $("#btn_sideform_guardar").prop("disabled", true);
});

$("#btn_sideform_guardar").click(function () {
  if ( $("#ingsal_pc").val() === 'I' ) {
    $("#salida_precuadre").val('0');
    $("#ingreso_precuadre").val($("#monto_sideform").val());
    /*console.log($("#monto_sideform").val());*/
    fnGestionarPrecuadre('INSERTAR');
    fnOcultaDivs();
    $("#btn_sideform_nuevo").prop('disabled', false);
    $("#btn_sideform_guardar").prop('disabled', true);
  }
  if ( $("#ingsal_pc").val() === 'S' ) {
    $("#ingreso_precuadre").val('0');
    $("#salida_precuadre").val($("#monto_sideform").val());
    /*console.log($("#monto_sideform").val());*/
    fnGestionarPrecuadre('INSERTAR');
    fnOcultaDivs();
  }
  if ( $("#editar").val() === 'S') {
    if(parseFloat($("#ingreso_precuadre").val()) > 0) {
      $("#ingreso_precuadre").val($("#monto_sideform").val());
    } else {
      $("#salida_precuadre").val($("#monto_sideform").val());
    }
    fnGestionarPrecuadre('EDITAR');
    fnOcultaDivs();
    $("#editar").val('N');
  }
  fnLimpiaSideform();
    $("#btn_sideform_nuevo").prop('disabled', false);
    $("#btn_sideform_guardar").prop('disabled', true);
});

$("#btn_sideform_cancelar").click(function () {
  fnOcultaDivs();
  fnLimpiaSideform();
  $("#btn_sideform_nuevo").prop('disabled', false);
  $("#btn_sideform_guardar").prop('disabled', true);
  $("#editar").val('N');
});

$("#btn_sideform_nuevo").click(function () {
  $("#div_combobox_sideform").show("slow") ;
  $("#div_descripcion_sideform").hide("slow");
  $("#div_monto_sideform").show("slow");
  $("#descripcion_sideform").val('');
  $("#monto_sideform").val('');
  $("#btn_sideform_guardar").prop('disabled', false);
  $("#btn_sideform_nuevo").prop('disabled', true);
  $("#editar").val('N');
  fnLimpiaSideform();
});

let cambios = {};
$("#tabla_metasxagente").on("click", ".edit", function (e) {
  $("#btn_diag_guardar").hide();
  e.stopPropagation();
  let fila = $(this).closest("tr");
  let celda = fila.find(".meta");
  if (celda.find("input").length) return;
  let valor = celda.text();
  let input = $("<input>", {
    type: "number",
    class: "inline-input",
    value: valor,
  });

  celda.html(input);
  input.focus();
  // ENTER = guardar en memoria
  input.on("keypress", function (e) {
    if (e.which === 13) {
      let nuevoValor = $(this).val();
      let id = fila.data("id");
      celda.text(nuevoValor);
      // guardar cambio local
      cambios[id] = nuevoValor;
      console.log("Cambios pendientes:", cambios);
      $.confirm({
        title: "Seguro de realizar cambios ?",
        content: "Money-Flash",
        buttons: {
          aceptar: function () {
            fnMuestraMetasAgente(
              $("#nro_cuenta").val(),
              "1000-01-01",
              "1000-01-01",
              nuevoValor,
              $("#idmeta").val(),
              "actualizar",
            );
          },
          cancel: function () {
            $.alert("Cancelado:", id);
          },
        },
      });
    }
  });
  // cancelar
  input.on("blur", function () {
    celda.text(valor);
  });
});

$("#tabla_metasxagente").on("click", ".delete", function () {
  let fila = $(this).closest("tr");
  let id = fila.data("id");
  $.confirm({
    title: "Seguro de eliminar esta meta ?",
    content: "Money-Flash",
    buttons: {
      aceptar: function () {
        fnMuestraMetasAgente(
          $("#nro_cuenta").val(),
          '1000-01-01',
          '1000-01-01',
          $("#diag_txt_meta").val(),
          $("#idmeta").val(),
          "anular",
        );
      },
      cancel: function () {
        $.alert("Cancelado:", id);
      },
    },
  });

  /*     if(confirm("¿Eliminar ID " + id + "?")){
        $.post("eliminar.php", {id:id}, function(){
            cargarDatos();
        });
    } */
});

fnOcultaDivs();
/* =========== end general ====== */
});
/* =========== end general ====== */

function fnEditarPrecuadre(idfila) {
  $("#div_combobox_sideform").hide("slow") ;
  $("#div_descripcion_sideform").show("slow");
  $("#div_monto_sideform").show("slow");
  $("#btn_sideform_nuevo").prop('disabled', true);
  $("#btn_sideform_guardar").prop('disabled', false);
  $("#editar").val('S');
  /*console.log($("#editar").val());*/
}

function fnAnularPrecuadre(idfila) {
  jConfirm('¿Esta seguro de Eliminar', "Money-Flash", function (r) {
    if (r) {
      fnGestionarPrecuadre('ELIMINAR');
      fnOcultaDivs();
      $("#editar").val('N');
    }
  });

}

function fnOcultaDivs(){
  $("#div_combobox_sideform").hide("slow") ;
  $("#div_descripcion_sideform").hide("slow");
  $("#div_monto_sideform").hide("slow");
  $("#descripcion_sideform").val('');
  $("#monto_sideform").val('');
}

function fnLimpiaTabla(){
var html;
    
        html += "<tr >";        
        html += "<td></td>";
        html += "<td></td>";
        html += "<td></td>";
        html += "<td></td>";
        html += "<td></td>";
        html += "<td></td>";
        html += "<td></td>";
        html += "<td></td>";
        html += "<td></td>";       
        html += "<td></td>";       
        html += "<td></td>";       
        html += "<td></td>";       
        html += "<td></td>";       
/*13*/  html += "<td></td>";       
        html += "<td></td>";       
        html += "<td></td>";       
        html += "<td></td>";       
/*17*/  html += "<td></td>";
        html += "</tr>";
    
    html += "<tr>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
    html += "</tr>";        
    $("#tbody_MovsAgente").html(html);
}

function fnLimpiaNuevo(){
var nro_movs=0;
    $( "#monto" ).val('');
    $( "#nro_operacion" ).val('');
    $( "#nromovs" ).val(nro_movs);
    $( "#observacion" ).val('');    
    $( "#cta_destino" ).val('');
    
}

function fnCambiaLogo(){
if ( $('#iniciales').val() === '0' ){
    //alert($('#iniciales').val());
    $('#divimagen').css('display','none');
    }    
    else {
    var ellogo='img/'+$('#iniciales').val().trim()+'.jpg';
    $("#myimage").attr("src",ellogo);    
    $('#iniciales').val(ellogo);        
    $('#divimagen').css('display','block');
                            
    }    
}


function ValidaTTran(ttran) {
  var rpta;
  switch (ttran) {
    case '98':
      rpta = 'NO';      break;
    case '100':
        rpta = 'NO';      break;
    case '102':
      rpta = 'SI';      break;
    case '103':
      rpta = 'SI';      break;
    case '106':
      rpta = 'SI';      break;
    case '109':
      rpta = 'NO';      break;  
    case '158':
      rpta = 'NO';      break;    
    case '161':
      rpta = 'SI';      break;
    case '163':
      rpta = 'SI';      break;
    case '164':
      rpta = 'SI';      break;
    case '165':
      rpta = 'SI';      break;
    case '200':
      rpta = 'NO';      break;
    case '201':
      rpta = 'NO';      break;
    
    default:
      rpta = 'SI';
  }
  //alert(rpta);
  return rpta;

}

function AnulaCuenta(){
        $.ajax({async: true, type: "POST", dataType: "json", cache: false,      
        data: {opcion: "ANULACTA",nrocuenta:$('#nro_cuenta').val(),tipo:'agente'},
        url: "controles/ManteCuentaUsuario.php",
        beforeSend: function (objeto) {
            $('#carga').css('display', 'block');
            $("#carga").html("<img src='img/loader.gif'>");
        },
        complete: function (objeto) {      
            $('#carga').css('display', 'none');
            window.location.reload();
        }
    });
}

function cambiaImagene__(codigo) {
  console.log(codigo);

  $("#dialogo_voucher_imge").dialog("open");
  var mivalor = "php/uploads/" + codigo + ".jpg";
  console.log(mivalor);
  $("#dialogo_voucher_imge img").attr("src", mivalor);
}

function cambiaImagene(nombre_archivo) {
  let searchFileName = nombre_archivo;
  let mi_url
  console.log('searchFileName:',searchFileName);
  if (!searchFileName) {
    $.alert({ title: 'Por favor, ingresa un nombre de archivo para buscar...', content: 'Money-Flash', type: 'red' });
    return;
  }
/*   if ($("#idtipotransaccion").val() === "158") {
    mi_url = "php/search_voucher.php";
  } else {
    mi_url = "php/search_recibos.php";
  } */
  $.ajax({
    url: "php/search_voucher.php",
    type: "GET",
    data: { fileName: searchFileName },
    success: function (response) {
      if (response === "not found") {
        $.alert({ title: 'Imagen no encontrada.', content: 'Money-Flash', type: 'red' });
      } else {
        /*console.log(response);*/
       /*  $("#imagePreview").html('<img src="' + response + '" alt="Imagen encontrada">');
        /* $('<button id="deleteBtn">Eliminar</button>').insertAfter("#imagePreview"); */
       /* $('<button id="printBtn">Imprimir</button>').insertAfter("#imagePreview"); */

        $("#dialogo_voucher_imge").dialog("open");
/*         var mivalor = "php/uploads/" + codigo + ".jpg";
        console.log(mivalor); */
        $("#dialogo_voucher_imge img").attr("src", response);

      }
    },
    error: function () {
      $.alert({ title: 'Error al buscar la imagen.', content: 'Money-Flash', type: 'red' });
    },
  });
} 


function ubicaVoucherSaldoAgente(nro_cuenta){
$.ajax({async: true, type: "POST", dataType: 'json', cache: false,
    data: {opt:"UbicaVSA", nrocuenta:nro_cuenta, usuario:$('#usuariosistema').val(), nombre_archivo:'', observacion:'', fechabusqueda:$('#fechaf').val(), id_vsa:'', op: 'L'},
    url: "controles/ManteAgentes.php",
    beforeSend: function (objeto) { $("#overlay").show(); },
    complete: function (objeto) { $("#overlay").hide(); },
  }).done(function (respuesta) {
    $("#id_vsa").val(respuesta[0].codigo);
    $("#nombre_archivo").val(respuesta[0].nombre_archivo);
    console.log($("#nombre_archivo").val());
    if ( parseInt($("#id_vsa").val()) > 0 ){ 
        var newIconClass = 'glyphicon-picture gi-15x';
        var $buttonIcon = $('#btn_vsa').find('i');
        $buttonIcon.attr('class', 'glyphicon ' + newIconClass);
        
    } else {
        var newIconClass1 = ' glyphicon-paperclip gi-1x';
        var $buttonIcon1 = $('#btn_vsa').find('i');
        $buttonIcon1.attr('class', 'glyphicon ' + newIconClass1); 
    }   
  });
}

function InsertaVoucherSaldoAgente(newFileName) {
  $.ajax({async: true, type: "POST", dataType: "json", cache: false,
        data: {opt: 'UbicaVSA', nrocuenta: $('#nro_cuenta').val(), usuario: $('#usuariosistema').val(), nombre_archivo: newFileName,
                                observacion:$('#descripcion_img').val(), fechabusqueda:$('#fechaf').val(), id_vsa:'100',op: 'I'},
        url: "controles/ManteAgentes.php",
        success: function () {
            jAlert("Archivo Cargado, Verifique...", "Transferencia de Archivos");
            /* $("#correlativo_img").val("");
            $("#codgirosucu_img").val(""); */
            $("#descripcion_img").val("");
            /* $("#DialogoCargaImagen_VSA").dialog("close"); */
        }
    });
    return false;
}

function MuestraCambiaImagen(nombre_archivo) {
  /* let searchFileName = $("#searchFileName").val(); */
  let searchFileName = nombre_archivo;
  if (!searchFileName) {
    alert("Por favor, ingresa un nombre de archivo para buscar.");
    return;
  }

  $.ajax({
    url: "php/search.php",
    type: "GET",
    data: { fileName: searchFileName },
    success: function (response) {
      if (response === "not found") {
        alert("Imagen no encontrada.");
      } else {
        /*console.log(response);*/
        $("#imagePreview").html('<img src="' + response + '" alt="Imagen encontrada">');
        $('<button id="deleteBtn">Eliminar</button>').insertAfter("#imagePreview");
        $('<button id="printBtn">Imprimir</button>').insertAfter("#imagePreview");

        $("#deleteBtn").on("click", function () {
        if ( $("#tipo_usuario").val() === "ADMIN"){ 
          if (confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
            $.ajax({
              url: "php/delete_vsa.php",
              type: "POST",
              data: { fileName: searchFileName },
              success: function (deleteResponse) {
                alert(deleteResponse);
                $("#imagePreview").empty();
                $("#deleteBtn").remove();
                $("#printBtn").remove();
                $("#imageModal_View").dialog("close");
                fnAnulaVoucher_vsa();
              },
              error: function () {
                alert("Error al eliminar la imagen.");
              },
            });
          }
        } else {
            jError('No tienes permiso, comunicate con el Administrador...', 'Money-Flash');
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

function fnAnulaVoucher_vsa() {

  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: { opt: 'UbicaVSA', nrocuenta: $('#nro_cuenta').val(), usuario: $('#usuariosistema').val(), ubicacion: 'ubicacion/archivo', observacion: $('#descripcion_img').val(), fechabusqueda: $('#fechaf').val(), id_vsa: parseInt($("#id_vsa").val()), op: 'A' },
    url: "controles/ManteAgentes.php",
    success: function () {
      $("#id_vsa").val("0");
      var newIconClass1 = ' glyphicon-paperclip gi-1x';
      var $buttonIcon1 = $('#btn_vsa').find('i');
      $buttonIcon1.attr('class', 'glyphicon ' + newIconClass1);
    }
  });
  return false;
  }

function ServerDate() {
  $.ajax({
    url: "php/get_server_date.php",
    method: "GET",
    dataType: "json",
    success: function (response) {
      $("#server_date").val(response.server_date);
      /*console.log('server_date:'+$("#server_date").val());*/
      var fechaOriginal = $('#server_date').val();
      var fechaSinGuiones = fechaOriginal.replace(/-/g, '');
      $("#server_date").val(fechaSinGuiones);
      /*console.log('funcion'+$("#server_date").val());*/
    },
  });
}

function VerificaPass(pass_evaluar) {
  var pass_confirm = pass_evaluar;
  var usuario_sis = $("#usuariosistema").val();
  var codsucursal = $("#codsucursal").val();
  var rpta = 0;
  return new Promise((resolve, reject) => {
    $.ajax({
      async: true, type: "POST", dataType: "json", cache: false,
      data: { opt: "GCA", codigo: pass_confirm, usuario: usuario_sis, codsucu: codsucursal, opcion: "I" },
      url: "controles/ManteInicio.php",
      beforeSend: function (objeto) { $("#overlay_pass").show(); },
      complete: function (objeto) { $("#overlay_pass").hide(); },
    }).done(function (respuesta) {
      // Devolver código y mensaje para usar por el llamador
      resolve({ codigo: respuesta[0].codigo, mensaje: respuesta[0].mensaje || '' });
    }).fail(function (jqXHR, textStatus, errorThrown) {
      reject(errorThrown);
    });
  });
}

function FechaServidor() {
    return new Promise((resolve, reject) => {
        $.ajax({async: true, type: "POST", dataType: "json", cache: false,
            data: { opt: "srvfecha" },
            url: "controles/ManteAgentes.php",
        }).done(function (respuesta) {
            resolve(respuesta[0].fechaservidor);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    });
}

function ManteMetasxAgente(p_nrocuenta) {
  /*console.log('p_nrocuenta:', p_nrocuenta);*/
  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: { opt: "METASUNAGENTE", nrocuenta: p_nrocuenta },
    url: "controles/ManteAgentes.php",
    beforeSend: function (objeto) { $("#overlay").show(); },
    complete: function (objeto) { $("#overlay").hide(); },
  }).done(function (response) {
    if (response.error) {
      console.log(response.error);
    } else {
      $("#spn_meta").text(response.meta);
      $("#spn_nroops").text(response.nroops);
      $("#spn_diferencia").text(response.diferencia);
      $("#meta_estado").val(response.estado);
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log("Error en la solicitud: " + textStatus + '--' + errorThrown + '--' + jqXHR.status);
  });
}

function fnMuestraMetasAgente(p_nrocuenta,p_fechai, p_fechaf, p_meta, p_idmeta,p_opcion) {
  if ($("#datos_cuenta").val() !== "" && $("#tipo_usuario").val() === "ADMIN") {
    $('#dialogo_metasxagente').modal('show');
    $.ajax({
      url: "controles/ManteAgentes.php",
      type: "POST",
      dataType: "json",
      data: { opt: "LISTAMETAS", nrocuenta: p_nrocuenta, fechai: p_fechai, fechaf: p_fechaf, meta: p_meta, idmeta:p_idmeta, opcion: p_opcion },
      beforeSend: function (objeto) { $("#overlay").show(); },
      complete: function (objeto) { $("#overlay").hide(); $("#btn_diag_guardar").show();},
      success: function (data) {
        // Limpiar tabla antes de cargar nuevos datos
        $("#tbody_metasxagente").empty();
        $("#meta_estado").val('C');
        // Verificar si hay datos
        if (data.length > 0) {
          // Recorrer los datos y añadirlos a la tabla
          $.each(data, function (index, metas) {
            col_accion = (metas.estado.trim() === "ABIERTO") ? "<i class='fa fa-edit btn edit' style='color: green;'></i><i class='fa fa-ban btn delete' style='color: red;'></i>" : ""; 
            var fila = "<tr id='mt[" + index + "]' onclick='fnSeleccionaMeta(this.id);'>" +
            "<td style='display: none'>" + metas.idmxagente + "</td>" +
            "<td>" + metas.fechai + "</td>" +
            "<td>" + metas.fechaf + "</td>" +
            "<td class='meta'>" + metas.meta + "</td>" +
            "<td>" + metas.nroops + "</td>" +
            "<td>" + metas.diferencia + "</td>" +
            "<td>" + metas.estado + "</td>" +
            "<td> " + col_accion + " </td>" +
            "</tr>";
            $("#tbody_metasxagente").append(fila);
          });

        } else {
          // Mostrar mensaje si no hay datos
          $("#tbody_metasxagente").append("<tr><td colspan='4' class='text-center'>No hay usuarios disponibles</td></tr>" );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en la petición AJAX: " + error);
        $("#tbody_metasxagente").append("<tr><td colspan='4' class='text-center'>Error al cargar los datos</td></tr>" );
      },
    });
  }
}

function fnMuestraPrecuadre(p_nrocuenta,p_fecha) {
if ($("#datos_cuenta").val() !== "" ) {
    var btn_accion;
    $.ajax({
      url: "controles/ManteAgentes.php",
      type: "POST",
      dataType: "json",
      data: { opt: "PRECUADRE", nrocuenta: p_nrocuenta, fecha: p_fecha, idusuario: $("#idusuario").val() },
      beforeSend: function (objeto) { 
         if ($('#sidebar').hasClass('active') === false) {
            $("#overlay").show(); 
        }        
        
      },
      success: function (data) {
        // Limpiar tabla antes de cargar nuevos datos
        $("#tbody_precuadre").empty();
        // Verificar si hay datos
        if (data.length > 0) {
          // Recorrer los datos y añadirlos a la tabla
          $.each(data, function (index, pcuadre) {
            btn_accion = pcuadre.editable;
            var fila = "<tr id='pc[" + index + "]' onclick='fnSeleccionaPrecuadre(this.id);'>" +
            "<td style='display: none'>" + pcuadre.nrocuenta + "</td>" +
            "<td style='display: none'>" + pcuadre.fecha + "</td>" +
            "<td style='display: none'>" + pcuadre.idtipotransaccion + "</td>" +
            "<td style='width: 40%'>" + pcuadre.descripcion + "</td>" +
            "<td style='display: none'>" + pcuadre.tdinero + "</td>" +
            "<td style='display: none'>" + pcuadre.editable + "</td>" +
            "<td style='display: none'>" + pcuadre.idusuario + "</td>" +
            "<td align='right' style='width: 15%'>" + pcuadre.ingreso + "</td>" +
            "<td align='right' style='width: 15%'>" + pcuadre.salida + "</td>" +
            "<td align='right' style='width: 15%'>" + pcuadre.saldo_cuenta + "</td>" +
            "<td align='right' style='width: 15%'>" + pcuadre.saldo_efectivo + "</td>" +
            "<td>" + (btn_accion === "S" ? "<button id='btn_edit_pc' onclick='fnEditarPrecuadre(this.id);' class='btn btn-xs edit-btn'><span class='glyphicon glyphicon-pencil'></span></button>" +
            "<button id='btn_delete_pc' onclick='fnAnularPrecuadre(this.id);' class='btn btn-danger btn-xs delete-btn'><span class='glyphicon glyphicon-trash'></span></button>" : "") + "</td>" +
            "</tr>";
            $("#tbody_precuadre").append(fila);
          });
        } else {
          // Mostrar mensaje si no hay datos
          $("#tbody_precuadre").append("<tr><td colspan='4' class='text-center'>No hay data disponibles</td></tr>" );
        }
      },
      complete: function (objeto) { 
        if ($('#sidebar').hasClass('active') === false) {
          $("#overlay").hide();
          $('#sidebar').toggleClass('active');
          $('.overlay_sf').toggleClass('active');
        } 

      },
      error: function (xhr, status, error) {
        console.error("Error en la petición AJAX: " + error);
        $("#tbody_precuadre").append("<tr><td colspan='4' class='text-center'>Error al cargar los datos</td></tr>" );
      },
    });
} else { $.alert({ title: 'Elije un Agente', content: 'Money - Flash'}); }

}

function fnSeleccionaPrecuadre(idfila) {
  if (seleccionado === "N") {
    var idfilac = $("#sele_pc").val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfilac);
    var color = elTableRow.style.backgroundColor;
    elTableRow.style.backgroundColor =
      elTableRow.style.backgroundColor === "LightSkyBlue"
        ? color
        : "LightSkyBlue";
    if (idfilac !== idfila) {
      elTableRow1.style.backgroundColor =
        elTableRow.style.backgroundColor === color ? "LightSkyBlue" : color;
    }
    var elTableCells = elTableRow.getElementsByTagName("td");
    $("#sele_pc").val(idfila);
    $("#nro_cuenta").val(elTableCells[0].innerHTML);
    /* $("#diag_fechai").val(elTableCells[1].innerHTML); */
    $("#idtipotransaccion").val(elTableCells[2].innerHTML);
    $("#descripcion_precuadre").val(elTableCells[3].innerHTML); 
    $("#descripcion_sideform").val(elTableCells[3].innerHTML); 
    $("#ingreso_precuadre").val(elTableCells[7].innerHTML);
    $("#salida_precuadre").val(elTableCells[8].innerHTML);
    /* $("#idusuario").val(elTableCells[9].innerHTML); */
    /*console.log('2:',$("#idtipotransaccion").val());
    console.log('3:',$("#descripcion_precuadre").val());
    console.log('7:',$("#ingreso_precuadre").val());
    console.log('8:',$("#salida_precuadre").val());
    console.log('3:',$("#descripcion_sideform").val());*/
    if(parseFloat($("#ingreso_precuadre").val()) > 0) {
      $("#monto_sideform").val($("#ingreso_precuadre").val());
    } else {
      $("#monto_sideform").val($("#salida_precuadre").val());
    }
      
  }
}

function fnGestionarPrecuadre(p_accion) {
  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: { opt: 'GES-PRECUADRE', accion:p_accion, nrocuenta: $('#nro_cuenta').val(), fecha: $('#fechaf').val(), idtipotransaccion: $('#idtipotransaccion').val(),
            descripcion: $('#descripcion_precuadre').val(), dinero: $('#tipo_dinero_pc').val(), ingreso: $('#ingreso_precuadre').val(), salida: $('#salida_precuadre').val(), idusuario: $('#idusuario').val()},
    url: "controles/ManteAgentes.php",
    success: function () {
      fnMuestraPrecuadre($("#nro_cuenta").val(), $("#fechaf").val());
      $("#ingsal_pc").val('');
      $("#editar").val('N');
    }
  });
  return false;
  }

function fnLimpiaSideform(){
  $("#monto_sideform").val('');
  $("#idtipotransaccion").val('');
  $("#descripcion_precuadre").val('');
  $("#tipo_dinero_pc").val(''); /*E,C, EC.. */
  /* $("#ingsal_precuadre").val(''); */
  $('#ingreso_precuadre').val('');
  $('#salida_precuadre').val(''); 
 /*  $('#idusuario').val(''); */
}
