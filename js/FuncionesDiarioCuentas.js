
function FnInsertaIngresos() {
    jConfirm("¿Esta seguro de agregar: S/. " + $("#ingreso").val(), "Giros - Transferencias", function (rpta) {
      if (rpta) {
        if ($("#opt_insert").val() === 'II') {
          $("#ingreso").val($("#ingreso").val().replace(",", ""));
          var monto = parseFloat($("#ingreso").val());
          if (monto > 0 && $("#lista_conceptos_ing").val() !== '0') {
            $.ajax({async: true, type: "POST", dataType: "json", cache: false,
              data: {opt: $("#opt_insert").val(), coddiario: $("#codcierrediario").val(), monto: monto,idconcepto:$("#lista_conceptos_ing").val(),
                    sucu_destino:$("#lista_sucursales").val(),concepto: $("#masdatos_ing").val(),responsable: $("#responsable_ing").val(),
                    usuamodi: $("#nusuario").val(),fecha:$("#fecha_cierre").val(),extradata:$("#extradata").val(),idempresa:$("#idempresa").val()},
              url: "controles/ListaCierreDiario.php",
              
            }).done(function (respuesta) {
              fnMuestraIngresos()
              $("#extradata").val('');
            });
            $("#div_txt_ingreso").toggle(700);
            LimpiaIng();
          } else { jError('Faltan datos, Verifique...', 'Giros - Transferencias');}
        } else {jWarning('Pulse el boton  +   para agregar nuevo item', 'Transferencias - Ingresos');}
      }
    });
    
    return false;
  }
  
  function fnMuestraIngresos() {
    const codDiario = $("#codcierrediario").val();
    const fechaCierre = $("#fecha_cierre").val();
    
    $.ajax({
      url: "controles/ListaCierreDiario.php",
      type: "POST", dataType: "json",
      data: { coddiario: codDiario, fecha: fechaCierre, opt: 'LI' },
      beforeSend: function() { $("#overlay").show(); },
      complete: function() { $("#overlay").hide(); },
      success: function(data) {
        // Limpiar tabla antes de cargar nuevos datos
        const $bodyIngresos = $("#body_ingresos");
        $bodyIngresos.empty();
        
        // Verificar si hay datos
        if (data && data.length > 0) {
          // Construir todo el HTML antes de insertarlo (más eficiente)
          let tableHtml = '';
          
          // Recorrer los datos y añadirlos a la tabla
          $.each(data, function(index, dataingresos) {
            const recibo = dataingresos.recibo;
            let rowHtml = `<tr id='I[${index}]' class='dato' onclick='RecuperaFilaIng(this.id);'>`;
            
            // Botón según tipo de recibo
            if (recibo === "XXX") {
              rowHtml += "<td><button type='button' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-folder-open blue'></span></button></td>";
            } else {
              rowHtml += `<td><button id="${dataingresos.iddetalle}" onclick='fnImagenModalView_Open(this.id);' title='Recibo' type='button' aria-hidden='true' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-picture green'></span></button></td>`;
            }            
            // Resto de la fila con template literals para mejor legibilidad
            rowHtml += `
             
              <td class='ocultame'>${dataingresos.iddetalle}</td>
              <td class='ocultame'>${dataingresos.idconcepto}</td>
              <td class='' data-campo='concepto'>${dataingresos.concepto}</td>
              <td class='ocultame'>${dataingresos.extradata}</td>
              <td class='' data-campo='responsable'>${dataingresos.responsable}</td>
              <td class='' data-campo='usuamodi'>${dataingresos.usuamodi}</td>
              <td align='right' class='' data-campo='ing'>${dataingresos.ing}</td>
              <td class='ocultame'>${dataingresos.recibo}</td>
            </tr>`;
            tableHtml += rowHtml;
          });
          // Agregar todas las filas a la tabla de una sola vez (más eficiente)
          $bodyIngresos.html(tableHtml);
          
          // Actualizar totales
          TotalIngresos();
          FnCalculaTotales();
        } else {
          // Mostrar mensaje si no hay datos (corregido el mensaje para mostrar "No hay datos disponibles" en lugar de "No hay usuarios disponibles")
          $bodyIngresos.html("<tr><td colspan='9' class='text-center'>No hay datos disponibles</td></tr>");
        }
      },
      error: function(xhr, status, error) {
        console.error("Error en la petición AJAX:", error);
        const errorMessage = `<tr><td colspan='9' class='text-center'>Error al cargar los datos: ${error}</td></tr>`;
        $("#body_ingresos").html(errorMessage);
      }
    });
  }
  
  function FnInsertaEgresos() {
    var optionSelected = $('#lista_conceptos').val();
    var data_traslado = $("#codsucursal").val()+'->'+$("#masdatos_eg").val()
    jConfirm("¿Esta seguro de agregar: S/. " + $("#egreso").val(), "Giros - Transferencias", function (rpta) {
      if (rpta) {
        if ($("#opt_insert").val() === 'IE') {
          $("#egreso").val($("#egreso").val().replace(",", ""));
          var monto = parseFloat($("#egreso").val());
          if (monto > 0 && $("#lista_conceptos").val() !== '0') {
            $.ajax({
              async: true, type: "POST", dataType: "json", cache: false,
              data: {opt: $("#opt_insert").val(), coddiario: $("#codcierrediario").val(), monto: monto, idconcepto: $("#lista_conceptos").val(),
                sucu_destino: $("#lista_sucursales").val(), concepto: data_traslado, responsable: $("#responsable_eg").val(),
                usuamodi: $("#nusuario").val(), fecha: $("#fecha_cierre").val(), extradata: $("#extradata").val(), idempresa: $("#idempresa").val()},
              url: "controles/ListaCierreDiario.php",
            }).done(function (respuesta) {
              fnMuestraEgresos()
              /* switch (optionSelected) {
                case '35': 
                  fnInsertaTransaccionAsociado();
                  break;
                case '70':
                  fnInsertaTransaccionAgente(optionSelected);
                  break;
              } */
              $("#div_txt_egreso").toggle(700);
              LimpiaEg();
              $("#extradata").val('');
            });
          } else { jAlert('Ingrese datos...', 'Diario - Egresos'); }
        } else { jAlert('Pulse el boton  +   para agregar nuevo item', 'Cierre Diario - Egresos'); }
      }
    });

  }
  
  function fnMuestraEgresos() {
    const codDiario = $("#codcierrediario").val();
    const fechaCierre = $("#fecha_cierre").val();
    $.ajax({
      url: "controles/ListaCierreDiario.php",
      type: "POST", dataType: "json",
      data: { coddiario: codDiario, fecha: fechaCierre, opt: 'LE' },
      beforeSend: function() { $("#overlay").show(); },
      complete: function() { $("#overlay").hide(); },
      success: function(data) {
        // Limpiar tabla antes de cargar nuevos datos
        const $bodyEgresos = $("#body_egresos");
        $bodyEgresos.empty();
        // Verificar si hay datos
        if (data && data.length > 0) {
          // Construir todo el HTML antes de insertarlo (más eficiente)
          let tableHtml = '';
          // Recorrer los datos y añadirlos a la tabla
          $.each(data, function(index, dataegresos) {
            const recibo = dataegresos.recibo;
            let rowHtml = `<tr id='E[${index}]' class='dato' onclick='RecuperaFilaEg(this.id);'>`;
            // Botón según tipo de recibo
            if (recibo === "XXX") {
              rowHtml += "<td><button type='button' id='' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-folder-open blue'></span></button></td>";
            } else {
              rowHtml += `<td><button id="${dataegresos.iddetalle}" onclick='fnImagenModalView_Open(this.id);' title='Recibo' type='button' aria-hidden='true' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-picture green'></span></button></td>`;
            }          
            // Resto de la fila con template literals para mejor legibilidad
            rowHtml += `
              
              <td class='ocultame'>${dataegresos.iddetalle}</td>
              <td class='ocultame'>${dataegresos.idconcepto}</td>
              <td class='' data-campo='concepto'>${dataegresos.concepto}</td>
              <td class='ocultame'>${dataegresos.extradata}</td>
              <td class='' data-campo='responsable'>${dataegresos.responsable}</td>
              <td class='' data-campo='usuamodi'>${dataegresos.usuamodi}</td>
              <td align='right' class='' data-campo='ing'>${dataegresos.sal}</td>
              <td class='ocultame'>${dataegresos.recibo}</td>
            </tr>`;         
            tableHtml += rowHtml;
          });
          // Agregar todas las filas a la tabla de una sola vez (más eficiente)
          $bodyEgresos.html(tableHtml);
          // Actualizar totales
          TotalEgresos();
          FnCalculaTotales();
        } else {
          // Mostrar mensaje si no hay datos (corregido el mensaje para mostrar "No hay datos disponibles" en lugar de "No hay usuarios disponibles")
          $bodyEgresos.html("<tr><td colspan='9' class='text-center'>No hay datos disponibles</td></tr>");
        }
      },
      error: function(xhr, status, error) {
        console.error("Error en la petición AJAX:", error);
        const errorMessage = `<tr><td colspan='9' class='text-center'>Error al cargar los datos: ${error}</td></tr>`;
        $("#body_egresos").html(errorMessage);
      }
    });
  }
  var txt_concepto='';
  var txt_masdatos='';
  var posicion=0;
  
  function RecuperaFilaIng(idfila) {
  
    var idfila1 = $("#selei").val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfila1);
    var color = elTableRow.style.backgroundColor;
    elTableRow.style.backgroundColor = elTableRow.style.backgroundColor === "LightSkyBlue" ? color : "LightSkyBlue";
    if (idfila1 !== idfila) {
      elTableRow1.style.backgroundColor = elTableRow.style.backgroundColor === color ? "LightSkyBlue" : color;
    }
    var elTableCells = elTableRow.getElementsByTagName("td");
  
    document.getElementById("id_detalle").value = elTableCells[1].innerHTML;
   /*  $("#id_concepto_").val(elTableCells[2].innerHTML); */
    var concepto_i = elTableCells[4].innerHTML;
    document.getElementById("masdatos_ing").value = concepto_i.substring( 7, concepto_i.length - 8 );
  
    txt_concepto = $("#masdatos_ing").val();
    posicion = txt_concepto.lastIndexOf("-");
    txt_masdatos = txt_concepto.substr(posicion + 1, 70);
    txt_concepto = txt_concepto.substr(0, posicion);
  
    var respo_i = elTableCells[5].innerHTML;
    document.getElementById("responsable_ing").value = respo_i.substring( 7, respo_i.length - 8 );
    var ing = elTableCells[7].innerHTML;
    document.getElementById("ingreso").value = ing.substring( 7, ing.length - 8);
    var nombrearchivo = elTableCells[8].innerHTML;
    $("#nombre_archivo").val(nombrearchivo);
    $("#id_concepto_i").val(elTableCells[2].innerHTML);
    document.getElementById("selei").value = idfila;
    document.getElementById("opt_insert").value = ""; // valor que permite agregar un nuevo item
    $("#opt_sele").val("ingreso"); //permite saber que tabla sera actualizada
    $("#correlativo_img").val($("#id_detalle").val());
    $("#cod_recibos_img").val($("#id_detalle").val());
    console.log($("#correlativo_img").val());
    console.log($("#opt_sele").val());
    console.log('Recupera fila:'+$("#nombre_archivo").val());
    console.log('id_concepto_i:',$("#id_concepto_").val());
    $("#id_concepto_e").val("");
    $("#descripcion_recibos_img").val($("#masdatos_ing").val()+"--"+$("#responsable_ing").val());
    $("#EgresosDet body_egresos").css("background-color", "#FFFFFF");
  }
  
  function RecuperaFilaEg(idfilae) {
    var idfila1 = $('#selee').val();  
    var elTableRow = document.getElementById(idfilae);
    var elTableRow1 = document.getElementById(idfila1);
    var color = elTableRow.style.backgroundColor;
    elTableRow.style.backgroundColor = (elTableRow.style.backgroundColor === "LightSkyBlue") ? color : 'LightSkyBlue';
    if (idfila1 !== idfilae) {
      elTableRow1.style.backgroundColor = (elTableRow.style.backgroundColor === color ) ? 'LightSkyBlue' : color;
    }
    var elTableCells = elTableRow.getElementsByTagName("td");
   /*  document.getElementById("id_detalle").value = elTableCells[2].innerHTML; */
    $("#id_detalle").val(elTableCells[1].innerHTML);
    $("#id_concepto_e").val(elTableCells[2].innerHTML);
    $("#extradata").val(elTableCells[4].innerHTML);
    var concepto_e = elTableCells[5].innerHTML;
    document.getElementById("masdatos_eg").value = concepto_e.substring(7, concepto_e.length - 8);
    var nombrearchivo = elTableCells[8].innerHTML;
    $("#nombre_archivo").val(nombrearchivo);
  
    txt_concepto =  $("#masdatos_eg").val();
    posicion=txt_concepto.lastIndexOf("-");
    txt_masdatos = txt_concepto.substr(posicion + 1, 70);
    txt_concepto = txt_concepto.substr(0,posicion);
    
    var respo_e = elTableCells[6].innerHTML; 
    document.getElementById("responsable_eg").value = respo_e.substring(7, respo_e.length - 8);
    var eg = elTableCells[7].innerHTML;  
    document.getElementById("egreso").value = eg.substring(7, eg.length - 8);
  
    document.getElementById("selee").value = idfilae;
    document.getElementById("opt_insert").value = ""; //                
    $("#opt_sele").val("salida"); //permite saber que tabla sera actualizada
    $("#correlativo_img").val($("#id_detalle").val());
    $("#cod_recibos_img").val($("#id_detalle").val());
    console.log('id_detalle:',$("#id_detalle").val()); // Updated from $("#iddetalle").val()
    console.log('id_concepto_e:',$("#id_concepto_e").val());
    console.log('extradata:',$("#extradata").val());
    console.log($("#correlativo_img").val());
    console.log($("#opt_sele").val());
    $("#id_concepto_i").val("");
    console.log('Recupera fila:'+$("#nombre_archivo").val());
    $("#descripcion_recibos_img").val($("#masdatos_eg").val()+"--"+$("#responsable_eg").val());
  } 

/* =======================================================*/
function fnSeleccionaCuentaAsociado(idfila) {
    var idfilac = $('#sele_cu').val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfilac);
    var color = elTableRow.style.backgroundColor;
    elTableRow.style.backgroundColor = (elTableRow.style.backgroundColor === "LightSkyBlue") ? color : 'LightSkyBlue';
    if (idfilac !== idfila) {
        elTableRow1.style.backgroundColor = (elTableRow.style.backgroundColor === color) ? 'LightSkyBlue' : color;
    }
    var elTableCells = elTableRow.getElementsByTagName("td");
    $("#txt_asociado").val(elTableCells[0].innerHTML + '=>' + elTableCells[1].innerHTML + ':' + elTableCells[2].innerHTML);
    $("#nrocuenta_asociado").val(elTableCells[2].innerHTML);
    $("#extradata").val(elTableCells[2].innerHTML);
    $("#masdatos_eg").val(elTableCells[0].innerHTML + '::' + elTableCells[2].innerHTML);
    //alert($("#cta_destino").val());
    $("#sele_cu").val(idfila);
    $('#dialogo_asociados').dialog('close');

    console.log('extradata:',$("#extradata").val());
    console.log($("#nrocuenta_asociado").val());
    console.log($("#masdatos_eg").val());
}

function fnSeleccionaCuentaAgente(idfila) {
    var idfilac = $('#sele_ag').val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfilac);
    var color = elTableRow.style.backgroundColor;
    elTableRow.style.backgroundColor = (elTableRow.style.backgroundColor === "LightSkyBlue") ? color : 'LightSkyBlue';
    if (idfilac !== idfila) {
        elTableRow1.style.backgroundColor = (elTableRow.style.backgroundColor === color) ? 'LightSkyBlue' : color;
    }
    var elTableCells = elTableRow.getElementsByTagName("td");
    $("#txt_agente").val(elTableCells[0].innerHTML + '=>' + elTableCells[1].innerHTML + ':' + elTableCells[2].innerHTML);
    $("#nrocuenta_agente").val(elTableCells[0].innerHTML);
    $("#extradata").val(elTableCells[0].innerHTML);
    /*  $("#masdatos_eg").val(elTableCells[0].innerHTML + '::' + elTableCells[2].innerHTML); */
    $("#masdatos_eg").val(elTableCells[2].innerHTML);
    console.log($("#nrocuenta_agente").val());
    console.log($("#masdatos_eg").val());
    $("#sele_ag").val(idfila);
    $('#dialogo_agentes').dialog('close');
    console.log('extradata:', $("#extradata").val());
}
var id_concepto = '';
async function fnAnulaMovsCierreDiario() {
  
  if ($("#id_concepto_i").val() === "") {
    id_concepto = $("#id_concepto_e").val();
  }
  else {
    id_concepto = $("#id_concepto_i").val();
  }
  try {
    var fecha_servidor =  await FechaServidor();
    var evalua_ttran = fnValidaIdConcepto(id_concepto);
    var fecha_seleccionada = $("#fecha_cierre").val().replace(/\//g, '-');    
    console.log('fecha_servidor 1:', fecha_servidor);
    console.log('fecha_seleccionada 2:',fecha_seleccionada);
    if (fecha_servidor !== fecha_seleccionada) {
      $.alert({title: 'Solo se puede anular en fecha Actual', content: 'Money-Flash', type: 'red', typeAnimated: true});
      return;
    }
    if (evalua_ttran !== "SI" || $("#tusuario").val() !== "ADMIN") {
      $.alert({title: 'Denegado', content: 'Money-Flash', type: 'red'});
      return;
    }
  
    if ($("#id_detalle").val().trim() === "") {
      $.alert({title: 'Selecciona un Movimiento...', content: 'Money-Flash', type: 'red'});
      return;
    }
  var verifica_pass=0;
  /* ======================================================== */
  $.confirm({
      title: 'Esta seguro de Anular el Movimiento: ',
      content: '<div class="form-group">' +
      "<label>" + $("#nusuario").val() + "</label>" +
      '<input id="pass_confirm" type="text" placeholder="codigo anulacion" class="name form-control" autocomplete="off" required />' +
      "</div>",
      type: 'red',
      buttons: {
          aceptar: {text: 'aceptar', btnClass: 'btn-red',
                action: async function(){
                  const verifica_res = await VerificaPass($("#pass_confirm").val().trim());
                  /* console.log('verifica_pass:', verifica_res); */
                  if (verifica_res && verifica_res.codigo > 0) {
                    AnulaMovimiento();
                  } else {
                    const msg = (verifica_res && verifica_res.mensaje) ? verifica_res.mensaje : 'Contraseña Incorrecta';
                    $.alert({ title: msg, content: 'Money-Flash', type: 'red' });
                  }
                  }
          },
          close: function () { $.alert({ title: 'Cancelado...', content: 'Money-Flash', type: 'green' });
          }
      }
  });
  
  } catch (error) { console.error("Error obteniendo la fecha del servidor:", error);}
  
}
  
function AnulaMovimiento() {
  $.confirm({
    title: 'Money Flash',
    content: '' +
      '<form action="" class="formName">' + '<div class="form-group">' +
      '<label>Escriba motivo de la anulacion</label>' +
      '<input type="text" placeholder="Motivo..." class="name form-control" autocomplete="off" required />' +
      '</div>' + '</form>',
    buttons: {
      Aceptar: function () {
        var name = this.$content.find('.name').val();
        $("#motivo_anulacion").val(name);
        /* console.log('motivo_anulacion:', $("#motivo_anulacion").val()); */
        if (!name) {
          /* $.alert('Digite el motivo de la anulacion...'); */
          $.alert({ title: 'Digite el motivo de anulacion...', content: 'Money-Flash', type: 'red' });
          return false;
        } else {
          $.ajax({
            async: true, type: "POST", dataType: "json", cache: false,
            data: { opt: 'ANULA_MOVS', id_detalle: $("#id_detalle").val(), extradata: $("#extradata").val(), fecha: $("#fecha_servidor").val(), concepto: id_concepto, motivo: $("#motivo_anulacion").val() },
            url: "controles/ListaCierreDiario.php",
            beforeSend: function (objeto) { $("#overlay_pass").show(); },
            complete: function (objeto) { $("#overlay_pass").hide(); },
          }).done(function (respuesta) {
            $("#extradata").val('');
            $("#id_detalle").val('');
            if ($("#opt_sele").val() === "ingreso") {
              fnMuestraIngresos();
            } else {
              fnMuestraEgresos();
            }
          });
        }
      },
      cancelar: function () {
        $.alert({ title: 'Cancelado...', content: 'Money-Flash', type: 'green' });
        return false;
      },

    }
  });

}

function FechaServidor() {
  return new Promise((resolve, reject) => { 
  $.ajax({ async: true, type: "POST", dataType: "json", cache: false,
    data: { opt: "srvfecha" },
    url: "controles/ManteAgentes.php",
  }).done(function (respuesta) {
    $("#fecha_servidor").val(respuesta[0].fechaservidor);
    console.log('fecha_servidor_dentro:',$("#fecha_servidor").val());
    resolve(respuesta[0].fechaservidor);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    reject(errorThrown);
  });
});
}

function old_VerificaPass_old(pass_evaluar) {
  var pass_confirm = pass_evaluar;
  var usuario_sis = $("#nusuario").val();
  var rpta;
  return new Promise((resolve, reject) => {
    $.ajax({
      async: true, type: "POST", dataType: "json", cache: false,
      data: { opt: "VERIFPASS", usuario: usuario_sis, pass: pass_confirm },
      url: "controles/ManteAgentes.php",
      beforeSend: function (objeto) { $("#overlay_pass").show(); },
      complete: function (objeto) { $("#overlay_pass").hide(); },
    }).done(function (respuesta) {
      if (respuesta[0].idusuario === 0) {
        $.alert('Contraseña Incorrecta...');
        return false;
      } else {
        resolve(respuesta[0].idusuario);
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {
      reject(errorThrown);
    });
  });
}

function VerificaPass(pass_evaluar) {
  var pass_confirm = pass_evaluar;
  var usuario_sis = $("#nusuario").val();
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


