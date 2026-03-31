function fnTotalesIngSal() {
  var sumai = 0;
  var sumas = 0;
  var saldo = 0;
  $("#TMovsCuenta tr.dato").each(function () {
    //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas
    if ($(this).find("td").eq(14).text() === "S") {
      $(this).css("color", "tomato");
    }
    if ($(this).find("td").eq(14).text() !== "S") {
      sumai += parseFloat($(this).find("td").eq(11).text() || 0, 10); //numero de la celda 8*/
      sumas += parseFloat($(this).find("td").eq(12).text() || 0, 10);
      //saldo = parseFloat($(this).find('td').eq(11).text() || 0, 10);
    }
  });
  $("#total_i").val(sumai.toFixed(2));
  $("#total_s").val(sumas.toFixed(2));
}

function fnVerMasDatos(opcion) {
  switch (opcion) {
    case "mas":
      $(".ocultamovs").css("display", "block");
      $("#opver").val("menos");
      break;
    case "menos":
      $(".ocultamovs").css("display", "none");
      $("#opver").val("mas");
      break;
  }
}

function aDecimal() {
  nimporte = $("#monto").val();
  $("#monto").val(parseFloat(Math.round(nimporte * 100) / 100).toFixed(2));
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
  } /*End FOR*/
  $("#tbody_UsuarioCuenta").html(html);
}

function fnCreaTablaMovsCuenta(jsonmovs) {
  var voucher;
  var html;
  for (var xx = 0; xx < jsonmovs.length; xx++) {
    html +=
      "<tr id='mv[" + xx + "]' class='dato' onclick='fnSeleccionaMov(this.id);'>";
    var i = xx + 1;
    voucher = jsonmovs[xx].voucher;
    if (voucher == "XXX" || voucher == '') {
      html += "<td>" + "<button id='btn_anular' onclick='fnAnulaMovCuenta();' type='button' aria-hidden='true' class='btn btn-default btn-xs' ><span class='glyphicon glyphicon-remove'></span></button>" + "</td>";
    } else {
      html += "<td>" + " <button id=" + jsonmovs[xx].voucher + " onclick='CambiaImagen(this.id);' title='Boucher' type='button' class='btn btn-default btn-xs' ><span class='glyphicon glyphicon-picture blue'></span></button>" + "</td>";
    }

    html += "<td>" + i + "</td>";
    html += "<td style='display: none'>" + jsonmovs[xx].idtransaccion + "</td>";
    html += "<td style='display: none'>" + jsonmovs[xx].idtipotransaccion + "</td>";
    html += "<td>" + jsonmovs[xx].fecha_tran + "</td>";
    html += "<td>" + jsonmovs[xx].fechahora_tran + "</td>";
    html += "<td>" + jsonmovs[xx].descripcion + "</td>";
    html += "<td>" + jsonmovs[xx].observacion + "</td>";
    html += "<td >" + jsonmovs[xx].datospago + "</td>";
    html += "<td >" + jsonmovs[xx].beneficiario + "</td>";
    /*10*/ html += "<td class='ocultamovs'>" + jsonmovs[xx].usua_modifica + "</td>";
    html += "<td align='right' class='editable' data-campo='nromovs'><span>" + jsonmovs[xx].monto_ing + "</span></td>";
    html += "<td align='right' class='editable' data-campo='nromovs'><span>" + jsonmovs[xx].monto_sal + "</span></td>";
    html += "<td align='right'>" + jsonmovs[xx].saldofinal + "</td>";
    html += "<td style='display: none'>" + jsonmovs[xx].anulado + "</td>";
    html += "<td style='display: none'>" + jsonmovs[xx].voucher + "</td>";
    html += "</tr>";
  }

  $("#tbody_MovsCuenta").html(html);
  fnTotalesIngSal();
}

function fnSeleccionaCuenta(idfila) {
  var idfilac = $("#sele_cu").val();
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

  if ($("#nro_cuenta").val() === "" || $("#nro_cuenta").val().length === 0) {
    $("#nro_cuenta").val(elTableCells[2].innerHTML);
    $("#datos_cuenta").val(elTableCells[0].innerHTML + "==" + elTableCells[1].innerHTML + ": " + elTableCells[2].innerHTML);
    console.log('nro_cuenta:', $("#nro_cuenta").val());
    ubicaVoucherSaldoCuenta($("#nro_cuenta").val());
    $("#btn_nuevatran").attr("disabled", false);
  } else {
    $("#nro_cuenta_d").val(elTableCells[2].innerHTML);
    $("#datos_cuenta_d").val(elTableCells[0].innerHTML + "==" + elTableCells[1].innerHTML + ": " + elTableCells[2].innerHTML);
    $("#btn_nuevatran").attr("disabled", true);
  }

  $("#sele_cu").val(idfila);
  $("#btn_anula_cuenta").attr("disabled", false);
  $("#DivUsuarioCuenta").hide("slow");

}

var seleccionado = "N";
var anulado = "S";
var ing_o_salida = 0;
function fnSeleccionaMov(idfila) {
  if (seleccionado === "N") {
    var idfilamv = $("#sele_mv").val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfilamv);
    var color = elTableRow.style.backgroundColor;
    elTableRow.style.backgroundColor =
      elTableRow.style.backgroundColor === "LightSkyBlue"
        ? color
        : "LightSkyBlue";
    if (idfilamv !== idfila) {
      elTableRow1.style.backgroundColor =
        elTableRow.style.backgroundColor === color ? "LightSkyBlue" : color;
    }
    var elTableCells = elTableRow.getElementsByTagName("td");
    $("#idtransaccion").val(elTableCells[2].innerHTML);
    $("#idtipotransaccion").val(elTableCells[3].innerHTML);
    $("#fecha_transaccion").val(elTableCells[4].innerHTML);
    $("#descripcion").val(elTableCells[6].innerHTML);
    anulado = elTableCells[14].innerHTML;
    $("#nombre_archivo_v").val(elTableCells[15].innerHTML);
    var ing = elTableCells[11].innerHTML;
    ing = parseFloat(ing.substring(6, ing.length - 8));
    var sal = elTableCells[12].innerHTML;
    sal = parseFloat(sal.substring(6, sal.length - 8));
    if (ing === 0) {
      $("#campo").val("monto_sal");
    }
    if (sal === 0) {
      $("#campo").val("monto_ing");
    }
    $("#montoanula").val(ing - sal); // solo para la opcion anular
    $("#ingreso").val(ing);
    $("#salida").val(sal);
    $("#sele_mv").val(idfila);
    ing_o_salida = Math.abs(ing - sal);
    //alert($("#idtipotransaccion").val());
    console.log('idtransaccion:', $("#idtipotransaccion").val());
    console.log('nombre_archivo_v:', $("#nombre_archivo_v").val());
  }
}

function fnAjaxEditaAnula(txtmotivo, monto_edita) {
  var AE;
  if (monto_edita === 0) {
    //positivo  o  negativo
    AE = "A";
  } else {
    $("#montoanula").val(monto_edita);
    AE = "E";
  }
  console.log(txtmotivo);
  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: {
      opcion: "ANULA", idtran: $("#idtransaccion").val(),
      nrocuenta: $("#nro_cuenta").val(), fechamov: $("#fecha_transaccion").val(),
      tipo_tran: $("#idtipotransaccion").val(), causales: txtmotivo,
      monto: $("#montoanula").val(), campo: $("#campo").val(),
      usuamodi: $("#usuariosistema").val(), anula_edita: AE
    },
    url: "controles/ManteCuentaUsuario.php",
    beforeSend: function (objeto) { $("#overlay").show(); },
    complete: function (objeto) {
      fnMuestraMovsCuenta($("#nro_cuenta").val(), $("#fechai").val(), $("#fechaf").val());
      $("#overlay").hide();
    },
  });
  seleccionado = "N";
}

var var_idtipotran;
var texto_causal = "--";
async function fnAnulaMovCuenta() {
  try {
    var evalua_ttran = ValidaTTran($("#idtipotransaccion").val());
    var fecha_servidor = await FechaServidor();
    var fecha_seleccionada = $("#fechaf").val().replace(/\//g, '-');
    console.log(fecha_servidor, fecha_seleccionada);
    if (fecha_servidor !== fecha_seleccionada) {
      $.alert({ title: 'Solo fecha Actual', content: 'Money-Flash', type: 'red', typeAnimated: true });
      return;
    }

    if (evalua_ttran !== "SI" || anulado !== "N" || $("#tipo_usuario").val() !== "ADMIN") {
      $.alert({ title: 'Denegado', content: 'Money-Flash', type: 'red' });
      return;
    }

    if ($("#idtransaccion").val().trim() === "") {
      $.alert({ title: 'Selecciona un Movimiento...', content: 'Money-Flash', type: 'red' });
      return;
    }

    $.confirm({
      title: "Seguro de Anular Movimieto...",
      content: `
        <form>
            <input type="text" id="txt_motivo" class="form-control" readonly onfocus="this.removeAttribute('readonly');" placeholder="Motivo de Anulación">
            <input type="password" id="pass_confirm" class="form-control" readonly onfocus="this.removeAttribute('readonly');" placeholder="Codigo de Anulación" required>
        </form>`,
      onContentReady: function () {
        // Opcional: Forzar un pequeño delay para asegurar que el navegador no inyecte nada
        setTimeout(() => {
          this.$content.find('#txt_motivo, #pass_confirm').val('');
        }, 50);
      },
      type: 'red',
      buttons: {
        aceptar: {
          text: 'aceptar', btnClass: 'btn-green',
          action: async function () {
            if ($("#txt_motivo").val().trim() !== "") {
              texto_causal = $("#txt_motivo").val().trim();
              const verifica_res = await VerificaPass($("#pass_confirm").val().trim());
              if (verifica_res && verifica_res.codigo > 0) {
                fnAjaxEditaAnula(texto_causal, 0);
                $.alert({ title: 'Anulación Exitosa', content: 'Money-Flash', type: 'green' });
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

function fnMuestraUsuarioCuenta(valorabuscar, id_empresa, optsql) {
  //if ($("#buscacuentausuario").val().trim() !== '')
  if (valorabuscar !== "") {
    $.ajax({
      async: true, type: "POST", dataType: "json", cache: false,
      data: { opcion: "CxU2", valor: valorabuscar, idempresa: id_empresa, opsql: optsql },
      url: "controles/ManteCuentaUsuario.php",
      beforeSend: function (objeto) {
        $("#carga").html("<img src='img/loader.gif'>");
      },
      complete: function (objeto) {
        $("#carga").css("display", "none");
      },
      success: fnCreaTablaUsuarioCuenta,
    });
  } else {
    jAlert("Ingrese datos a buscar...", "Cuentas");
    //$("#buscacuentausuario").focus();
  }
  return false;
}

function fnMuestraMovsCuenta(cuenta, fechai, fechaf) {
  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: { opcion: "MOVSCUENTA", cuenta: cuenta, fecha_i: fechai, fecha_f: fechaf },
    url: "controles/ManteCuentaUsuario.php",
    beforeSend: function (objeto) { $("#overlay").show() },
    complete: function (objeto) {
      $("#overlay").hide();
      /* fnDesactivaControles(); */
    },
    success: fnCreaTablaMovsCuenta,
  });
  return false;
}

function fnInsertaTransaccion() {
  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: {
      opcion: "IT", nrocuenta: $("#nro_cuenta").val(), nrocuentadest: $("#nro_cuenta_d").val(), monto: $("#monto").val(), nroop: "---",
      ttran: $("#idtipotran").val(), destino: $("#listasucursales").val(), idgiro: "0", observa: $("#observa").val(), respo: $("#usuariosistema").val(),
      usuacrea: $("#usuariosistema").val(), fechamov: $("#fechai").val(), idempresa: $("#idempresa").val(), opsql: $("#ingsal").val()
    },
    url: "controles/ManteCuentaUsuario.php",
    beforeSend: function (objeto) {
      $("#overlay").show();
    },
    complete: function (objeto) {
      fnMuestraMovsCuenta($("#nro_cuenta").val(), $("#fechai").val(), $("#fechaf").val());
      $("#observa").val("");
      fnDesactivaControles();
    },
  });
}

///////////////// DOCUMENT //////////////////////////
$(document).ready(function () {
  $("#btn_anula_cuenta").attr("disabled", true);
  $("#menu-toggle").click(function (e) { e.preventDefault(); $("#wrapper").toggleClass("toggled"); });

  $(function () {
    var window_height = $(window).height(),
      content_height = window_height - 250;
    $(".mygrid-wrapper-div").height(content_height);
  });

  $(window).resize(function () {
    var window_height = $(window).height(),
      content_height = window_height - 250;
    $(".mygrid-wrapper-div").height(content_height);
  });

  $(function () {
    var window_height = $("#formulario").height(),
      content_height = window_height;
    $(".mygrid-wrapper-div1").height(content_height);
  });

  fnDesactivaControles();
  /*  $("#listasucursales").attr("disabled", true); */

  $("#btn_nuevatran").attr("disabled", true);

  $("[data-toggle=offcanvas]").click(function () {
    $(".row-offcanvas").toggleClass("active");
  });

  $("#monto").validacampos(".0123456789");

  fnMuestraUsuarioCuenta("XXX", $("#codsucursal").val().substr(0, 1), "C");

  $("#monto").focusout(function () {
    aDecimal();
  });

  $("#btn_buscacuentausuario").click(function () {
    fnMuestraUsuarioCuenta(
      $("#buscacuentausuario").val(),
      $("#codsucursal").val().substr(0, 1),
      "B"
    );
  });

  $("#btn_nuevatran").click(function () {
    if ($("#datos_cuenta").val().trim() !== "") {
      fnActivaControles();
      $("#listatipotran").prop("selectedIndex", 0);
      $("#listasucursales").prop("selectedIndex", 0);
      $("#observa").val("");
      $("#monto").val("");
      $("#btn_nuevatran").attr("disabled", true);
    } else {
      $.alert({ title: 'Seleccione una cuenta...', content: 'Money-Flash', type: 'red' });
    }
  });

  $("#btn_cancelatran").click(function () {
    /* $(".ocultame").css("display", "none"); */
    $("#observa").val("");
    $("#monto").val("");
    $("#listatipotran").prop("selectedIndex", 0);
    $("#listasucursales").prop("selectedIndex", 0);
    fnDesactivaControles();
    $("#nro_cuenta").val('');
    $("#DivUsuarioCuenta").show();
  });

  $("#btn_guardatran").click(function () {
    /*     console.log('nro_cuenta:', $("#nro_cuenta").val());
        console.log('nro_cuenta_d:', $("#nro_cuenta_d").val()); */
    if ($("#nro_cuenta").val() === $("#nro_cuenta_d").val()) {
      $.alert({ title: 'Las cuentas deben ser diferentes...', content: 'Money-Flash', type: 'red' });
      return;
    }

    if ($("#fechai").val() !== $("#fechaf").val()) {
      $.alert({ title: 'Las fechas deben ser IGUALES...', content: 'Verifique las fechas', type: 'red' });
      return;
    }

    if (var_listasucursales === "1") {
      if ($("#listasucursales").val() === "0") {
        $.alert({ title: 'Seleccione Sucursal, Verifique...', content: 'Money-Flash', type: 'red' });
        return;
      }
    }
    if ($("#monto").val().trim() === "" || $("#nro_cuenta").val().trim() === "" || $("#ingsal").val().trim() === "" || $("#listatipotran").val() === "0") {
      $.alert({ title: 'Faltan datos, Verifique...', content: 'Money-Flash', type: 'red' });
      return;
    }

    var masdatos;
    var tipotran = $("#idtipotran").val();
    console.log(tipotran);
    switch (tipotran) {
      case '160':
        $.confirm({
          title: 'Se Depositara a >> Sucursal: ' + $("#listasucursales option:selected").html(),
          content: '<div class="form-group">' +
            /* "<label>" + $("#nusuario").val() + "</label>" +
            '<input id="pass_confirm" type="text" placeholder=" tu pass" class="name form-control" required />' + */
            "</div>",
          type: 'green',
          buttons: {
            aceptar: {
              text: 'aceptar', btnClass: 'btn-green',
              action: function () {
                masdatos = "Enviado hacia:" + $("#listasucursales").val() + "::" + $("#observa").val() + '>>>' + 'Enviado desde:' + $("#datos_cuenta").val() + '::' + $("#observa").val();
                $("#observa").val(masdatos);
                fnInsertaTransaccion();
                $("#DivUsuarioCuenta").hide("slow");
              }
            },
            close: function () {
              $.alert("Cancelado...");
            }
          }
        });
        break;

      case '204':
        if ($("#nro_cuenta").val() === '' || $("#nro_cuenta_d").val() === '') {
          $.alert({ title: 'Elija algun destino...', content: 'Money-Flash', type: 'red' });
          return;
        }
        $.confirm({
          title: 'Se Transferira a Asociado: ' + $("#datos_cuenta_d").val() + "; La Cantida de : S/." + $("#monto").val(),
          content: '<div class="form-group">' + "</div>",
          type: 'blue',
          buttons: {
            aceptar: {
              text: 'aceptar', btnClass: 'btn-blue',
              action: function () {
                masdatos = "Transferido hacia: " + $("#datos_cuenta_d").val() + '>>>' + 'Transferido desde: ' + $("#datos_cuenta").val();
                $("#observa").val(masdatos);
                fnInsertaTransaccion();
                $("#DivUsuarioCuenta").hide("slow");
              }
            },
            close: function () {
              $.alert("Cancelado...");
            }
          }
        });
        break;
      default:
        $.confirm({
          title: 'Registrando: ' + $("#listatipotran option:selected").html() + "  S/." + $("#monto").val(),
          content: '<div class="form-group">' +
            /* "<label>" + $("#nusuario").val() + "</label>" +
            '<input id="pass_confirm" type="text" placeholder=" tu pass" class="name form-control" required />' + */
            "</div>",
          type: 'green',
          buttons: {
            aceptar: {
              text: 'aceptar', btnClass: 'btn-green',
              action: function () {
                masdatos = "::" + $("#observa").val() + '>>>' + '::' + $("#observa").val();
                $("#observa").val(masdatos);
                fnInsertaTransaccion();
                $("#DivUsuarioCuenta").hide("slow");
              }
            },
            close: function () {
              $.alert("Cancelado...");
            }
          }
        });
        break;
    }
    /*     $("#btn_guardatran").attr("disabled", true);
        $("#btn_muestra_asociados").attr("disabled", true); */
    /*fnDesactivaControles();*/
    $("#btn_nuevatran").attr("disabled", false);
  });

  $("#btn_muestra_asociados").attr("disabled", true);
  $("#btn_muestratabla").attr("disabled", false);

  $("#listasucursales").change(function () {
    console.log($("#listasucursales").val());

  });
  var var_listasucursales = '0'
  $("#listatipotran").change(function () {
    console.log($("#listatipotran").val());
    var ttran = $("#listatipotran").val();
    is = ttran.substring(4, 3);
    ttran = ttran.substring(0, 3);
    $("#idtipotran").val(ttran);
    $("#ingsal").val(is);
    console.log('tipotra:', $("#idtipotran").val());
    if ($("#idtipotran").val() === "160") {
      $("#div_listasucursales").show("slow");
      var_listasucursales = '1'
      $("#listasucursales").attr("disabled", false);
      $("#btn_nuevatran").attr("disabled", true);
    } else {
      var_listasucursales = '0'
      $("#listasucursales").attr("disabled", true);
      /* $("#listasucursales").prop("selectedIndex", 0); */
      $("#btn_muestra_asociados").attr("disabled", false);
      $("#btn_nuevatran").attr("disabled", false);
      $("#div_listasucursales").hide("slow");
    }
    if ($("#idtipotran").val() === "204") {
      $("#btn_muestra_asociados").attr("disabled", false);
      $("#btn_nuevatran").attr("disabled", true);
    }
  });

  $("#btn_muestra_asociados").click(function () {
    if ($("#idtipotran").val() === "204") {
      $("#DivUsuarioCuenta").show("slow");
    }
  });

  /*   $("#btn_muestratabla").click(function () {
      $("#DivUsuarioCuenta").show("slow");
      fnDesactivaControles();
    });
   */
  $("#btn_movscuenta").click(function () {
    if ($("#datos_cuenta").val().trim() !== "") {
      fnMuestraMovsCuenta($("#nro_cuenta").val(), $("#fechai").val(), $("#fechaf").val());
    } else {
      jAlert("Seleccione cuenta", "CUENTAS");
    }
  });

  $("#btn_masmovs").click(function () {
    fnVerMasDatos($("#opver").val());
  });

  $("#menu-form").click(function () {
    $("#formulario").toggle(700);
  });

  $("#fechai").datepicker({
    dateFormat: "yy/mm/dd",
    showOn: "both",
    buttonImage: "img/calendar.ico",
    buttonImageOnly: true,
    changeYear: true,
    beforeShow: function () {
      $(".ui-datepicker").css("font-size", 12);
    },
    numberOfMonths: 1,
    onSelect: function (dateText) {
      //MuestraEntregados($('#efecha_r').val(), $('#optbuscar').val());
      //$("#cuentas").css("display","block");
    },
    /*onClose: function (selectedDate){CalculaTotalesR();} */
  });

  $("#fechaf").datepicker({
    dateFormat: "yy/mm/dd",
    showOn: "both",
    buttonImage: "img/calendar.ico",
    buttonImageOnly: true,
    changeYear: true,
    beforeShow: function () {
      $(".ui-datepicker").css("font-size", 12);
    },
    numberOfMonths: 1,
    onSelect: function (dateText) {
      ubicaVoucherSaldoCuenta($("#nro_cuenta").val());
    },
    /*onClose: function (selectedDate){CalculaTotalesR();} */
  });

  $("#btn_anula_cuenta").click(function () {
    $("#nro_cuenta").val("");
    /* $("#nro_cuenta_d").val("");*/
    $("#datos_cuenta").val("");
    fnDesactivaControles();
    $("#DivUsuarioCuenta").show("slow");
    $("#tbody_MovsCuenta").empty();
  });

  /////////////////////////////  EDICION /////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  var td, campo, valor, id;

  $(document).on("dblclick", "td.editable span", function (e) {
    //        if ($("#fechai").val() === $("#fechaf").val()) {
    var evalua_ttran = ValidaTTran($("#idtipotransaccion").val());
    if (
      anulado === "N" &&
      $("#tipo_usuario").val().trim() === "ADMIN" &&
      evalua_ttran === "SI"
    ) {
      valor = $(this).text();
      if (valor !== "0.00") {
        // si es <> a O habilitamos la opcion guardar...
        e.preventDefault();
        $("td:not(.id)").removeClass("editable");
        td = $(this).closest("td");
        campo = $(this).closest("td").data("campo");
        id = $(this).closest("tr").find(".id").text();
        td.text("").html(
          "<input type='text' onkeyup='javascript:this.value=this.value.toUpperCase();' name='" +
          campo +
          "' value='" +
          valor +
          "'><a class='enlace guardar' href='#'></a> <a class='enlace cancelar' href='#'></a> "
        );
      } else {
        e.preventDefault();
        $("td:not(.id)").removeClass("editable");
        td = $(this).closest("td");
        campo = $(this).closest("td").data("campo");
        id = $(this).closest("tr").find(".id").text();
        td.text("").html(
          "<input type='text' readonly='readonly' name='" +
          campo +
          "' value='" +
          valor +
          "'> <a class='enlace cancelar' href='#'>Cancelar</a> "
        );
      }
      seleccionado = "S";
    } else {
      jError("Deshabilitado...", "Giros - Transferencias");
    }
    //        }
    //        else {
    //            jError('Fecha Inicial y Fecha Final deben ser iguales para EDITAR\n' + $("#fechai").val() + ' <> ' + $("#fechaf").val(), 'Giros - Transferencias');
    //        }
  });

  $(document).on("click", ".guardar", function (e) {
    n_valor = $(this).closest("td").find("input").val();
    if (n_valor.trim() !== "") {
      var n_valor, monto_a_editar;
      var monto_i = parseFloat($("#ingreso").val());
      var monto_s = parseFloat($("#salida").val());
      //$(".mensaje").html("<img src='img/cargando.gif'>");
      e.preventDefault();
      n_valor = parseFloat(n_valor);
      monto_a_editar = n_valor - valor; /* ira al sp_ con su propio signo*/
      //alert(monto_a_editar);
      jConfirm(
        "¿Esta seguro de Editar :" +
        $("#descripcion").val() +
        "\n" +
        "Cambiar S/." +
        valor +
        "  por   S/." +
        n_valor,
        "Giros - Transferencias",
        function (r) {
          if (r) {
            if (n_valor !== 0) {
              fnAjaxEditaAnula(texto_causal, monto_a_editar);
            } else {
              jError("Digita nuevo monto...", "Giros - Transferencias");
            }
          }
        }
      );
    }
  });

  $(document).on("click", ".guardagrupo", function (e) {
    $(".mensaje").html("<img src='img/loader.gif'>");
    e.preventDefault();
    tusuario = $(this).closest("td").find("select").val();
    if (tusuario.trim() !== "") {
      var campo = "grupo";
      fnEdiTransaccion();
    } else {
      $(".mensaje").html("<p class='ko'>Debes seleccionar un valor</p>");
    }
  });

  $(document).on("click", ".cancelar", function (e) {
    e.preventDefault();
    td.html("<span>" + valor + "</span>");
    $("td:not(.id)").addClass("editable");
    seleccionado = "N";
  });

  $("#btn_imprime_movs").click(function () {
    if ($("#nro_cuenta").val() !== "") {
      jConfirm(
        "¿Se imprimira Movimientos de Asociado: " + $("#datos_cuenta").val() + "\n Del: " + $("#fechai").val() + " al: " + $("#fechaf").val(), "Asociados",
        function (r) {
          if (r) {
            window.open(
              "reportes/rptMovsAsociado.php?nombreasociado=" + $("#datos_cuenta").val() + "&nrocuenta=" + $("#nro_cuenta").val() + "&fecha_i=" + $("#fechai").val() +
              "&fecha_f=" + $("#fechaf").val() + "&nusuario=" + $("#usuariosistema").val(), "_blank"
            );
          }
        }
      );
    } else {
      jAlert(
        "Seleccione Asociado antes de imprimir, verifique...", "Transferencias"
      );
    }
  });
  /* ========================================================= */
  /* ================ cargar imagen============================*/
  $('#fileInput_').on('change', function (e) {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function (e) {
        $('#uploadPreview').html('<img src="' + e.target.result + '" alt="Preview">');
      }
      reader.readAsDataURL(file);
    }
  });

  $("#imageModal").dialog({
    autoOpen: false, modal: true, width: 500, height: 400, resizable: false,
    buttons: {
      Salir: function () {
        $("#uploadPreview").empty();
      },
    },
    close: function (event, ui) {
      $("#uploadPreview").empty();
    },
    open: function (event, ui) {

    },
  });

  $("#imageModal_View").dialog({
    autoOpen: false, modal: true, width: 500, height: 400, resizable: false,
    close: function (event, ui) {
      $("#imagePreview").empty();
      $("#deleteBtn").remove();
      $("#printBtn").remove();
    },
    open: function (event, ui) {
      MuestraCambiaImagen($("#nombre_archivo_v").val());
    },
  });
  /* ================================================================== */
  $('#fileInput').on('change', function (e) {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function (e) {
        $('#uploadPreview_vsc').html('<img src="' + e.target.result + '" alt="Preview">');
      }
      reader.readAsDataURL(file);
    }
  });

  $('#uploadBtn').on('click', function () {
    let fileInput = $('#fileInput')[0];
    if (fileInput.files.length === 0) {
      /* alert('Por favor, selecciona una imagen primero.'); */
      $.alert({ title: 'Por favor, selecciona una VSC primero...', content: 'Money-Flash', type: 'red' });
      return;
    }
    let file = fileInput.files[0];
    var valor1 = $("#server_date").val();
    var valor2 = $("#nro_cuenta").val();
    newFileName = valor1 + '_' + valor2;
    var micarpeta = "uploads_recibos"
    console.log(newFileName);
    /* let newFileName = $('#datos_cuenta').val() || file.name; */
    let formData = new FormData();
    formData.append('image', file);
    formData.append('newFileName', newFileName);
    /* formData.append('micarpeta', micarpeta); */
    $.ajax({
      url: 'php/upload_vsc.php',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        /* alert(response); */
        InsertaVoucherSaldoCuenta(newFileName);
        $('#fileInput').val('');
        $('#newFileName').val('');
        $('#uploadPreview_vsc').empty();
        /* $('#nro_cuenta').val(''); */
        $("#imageModal_vsc").dialog("close");
      },
      error: function () {
        alert('Error al cargar la imagen.');
      }
    });
  });

  $("#imageModal_vsc").dialog({
    autoOpen: false, modal: true, width: 500, height: 400, resizable: false,
    buttons: {
      Salir: function () {
        $("#uploadPreview_vsc").empty();
      },
    },
    close: function (event, ui) {
      $("#uploadPreview_vsc").empty();
    },
    open: function (event, ui) {

    },
  });

  $("#imageModal_View_vsc").dialog({
    autoOpen: false, modal: true, width: 500, height: 400, resizable: false,
    close: function (event, ui) {
      $("#imagePreview").empty();
      $("#deleteBtn").remove();
      $("#printBtn").remove();
    },
    open: function (event, ui) {
      console.log('nombre_archivo modal view', $("#nombre_archivo").val());
      MuestraCambiaImagen_vsc($("#nombre_archivo").val());
    },
  });

  $("#btn_vsc").click(function () {
    console.log('nro de cuenta', $("#nro_cuenta").val());
    if ($("#nro_cuenta").val() === "") {
      $.alert({ title: 'Elija una Cuenta...', content: 'Money-Flash', type: 'red' });
    } else {
      if (parseInt($("#id_vsc").val()) === 0) {
        ServerDate();
        $("#imageModal_vsc").dialog("open");
      } else {
        $("#imageModal_View_vsc").dialog("open");
      }
    }
  });

  /*========== end cargar imagen ================ */
});
/******************************** */
function CambiaImagen(codigo) {
  console.log('codigo:', codigo);
  $("#nombre_archivo").val(codigo);
  $("#imageModal_View").dialog("open");
}

function fnEdiTransaccion() {
  $.ajax({
    type: "POST",
    url: "controles/ManteCuentaUsuario.php",
    data: { opcion: "ACTUALIZA", campo: campo, valor: tusuario, id: id },
  }).done(function (msg) {
    $(".mensaje").css("display", "block");
    $(".mensaje").html(msg);
    td.html("<span>" + tusuario + "</span>");
    $("td:not(.id)").addClass("editable");
    setTimeout(function () {
      $(".ok,.ko").fadeOut("fast");
    }, 3000);
  });
}

function fnActivaControles() {
  $("#listatipotran").attr("disabled", false);
  $("#monto").attr("disabled", false);
  $("#observa").attr("disabled", false);

  $("#btn_cancelatran").attr("disabled", false);
  $("#btn_guardatran").attr("disabled", false);
  //$("#btn_anula_cuenta").attr("disabled",false);
}

function fnDesactivaControles() {
  $("#listatipotran").attr("disabled", true);
  /*   $("#monto").attr("disabled", true);
    $("#observa").attr("disabled", true); */
  $("#listasucursales").attr("disabled", true);
  $("#listatipotran").prop("selectedIndex", 0);
  $("#listasucursales").prop("selectedIndex", 0);
  $("#monto").val("");
  $("#observa").val("");
  /* $("#nro_cuenta").val(""); */
  $("#nro_cuenta_d").val("");
  $("#datos_cuenta_d").val("");

  $("#btn_muestra_asociados").attr("disabled", true);
  $("#btn_guardatran").attr("disabled", true);
  $("#btn_nuevatran").attr("disabled", true);
}

function ValidaTTran(ttran, fecha) {
  var rpta;
  switch (ttran) {
    case "98":
      rpta = "NO";
      break;
    case "102":
      rpta = "NO";
      break;
    case "109":
      rpta = "NO";
      break;
    case "145":
      rpta = "NO";
      break;
    case "146":
      rpta = "NO";
      break;
    case "161":
      rpta = "NO";
      break;
    case "162":
      rpta = "NO";
      break;
    case "163":
      rpta = "NO";
      break;
    case "164":
      rpta = "NO";
      break;
    case "165":
      rpta = "NO";
      break;
    case "166":
      rpta = "NO";
      break;
    case "182":
      rpta = "NO";
      break;
    case "201":
      rpta = "NO";
      break;
    case "205":
      rpta = "NO";
      break;
    default:
      rpta = "SI";
  }
  //alert(rpta);
  return rpta;
}

function AnulaCuenta() {
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {
      opcion: "ANULACTA",
      nrocuenta: $("#nro_cuenta").val(),
      tipo: "asociado",
    },
    url: "controles/ManteCuentaUsuario.php",
    beforeSend: function (objeto) {
      $("#carga").css("display", "block");
      $("#carga").html("<img src='img/loader.gif'>");
    },
    complete: function (objeto) {
      fnMuestraUsuarioCuenta("XXX", $("#codsucursal").val().substr(0, 1), "L");
      $("#carga").css("display", "none");
    },
  });
}

function ServerDate() {
  $.ajax({
    url: "php/get_server_date.php",
    method: "GET",
    dataType: "json",
    success: function (response) {
      $("#server_date").val(response.server_date);
      console.log('server_date:' + $("#server_date").val());
      /* var fechaOriginal = $('#server_date').val();
      var fechaSinGuiones = fechaOriginal.replace(/-/g, '');
      $("#server_date").val(fechaSinGuiones); */
      /*console.log('funcion'+$("#server_date").val());*/
    },
  });
}

function InsertaVoucherSaldoCuenta(newFileName) {
  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: {
      opt: 'UbicaVSA', nrocuenta: $("#nro_cuenta").val(), usuario: $('#usuariosistema').val(), nombre_archivo: newFileName,
      observacion: "", fechabusqueda: $('#fechaf').val(), id_vsa: '100', op: 'I'
    },
    url: "controles/ManteAgentes.php",
  }).done(function (respuesta) {
    $.alert({ title: 'Archivo Cargado, Verifique...', content: 'InsertaVoucherSaldoCuenta - Money-Flash', type: 'green' });
    ubicaVoucherSaldoCuenta($("#nro_cuenta").val());
  });
  return false;
}

function ubicaVoucherSaldoCuenta(nro_cuenta) {
  $.ajax({
    async: true, type: "POST", dataType: 'json', cache: false,
    data: { opcion: "UBICAVSC", nrocuenta: nro_cuenta, fecha: $('#fechaf').val() },
    url: "controles/ManteCuentaUsuario.php",
    beforeSend: function (objeto) { $("#overlay").show(); },
    complete: function (objeto) { $("#overlay").hide(); },
  }).done(function (respuesta) {
    $("#id_vsc").val(respuesta[0].codigo);
    $("#nombre_archivo").val(respuesta[0].nombrearchivo);
    console.log('id_vsc:', $("#id_vsc").val());
    console.log('nombre_archivo:', $("#nombre_archivo").val());
    if (parseInt($("#id_vsc").val()) > 0) {
      var newIconClass = 'glyphicon-picture gi-15x';
      var $buttonIcon = $('#btn_vsc').find('i');
      $buttonIcon.attr('class', 'glyphicon ' + newIconClass);
    } else {
      var newIconClass1 = ' glyphicon-paperclip gi-1x';
      var $buttonIcon1 = $('#btn_vsc').find('i');
      $buttonIcon1.attr('class', 'glyphicon ' + newIconClass1);
    }
  });
}

function MuestraCambiaImagen(nombre_archivo) {
  let searchFileName = nombre_archivo;
  let mi_url
  console.log('searchFileName:', searchFileName);
  if (!searchFileName) {
    $.alert({ title: 'Por favor, ingresa un nombre de archivo para buscar...', content: 'Money-Flash', type: 'red' });
    return;
  }
  if ($("#idtipotransaccion").val() === "145") {
    mi_url = "php/search_voucher.php";
  } else {
    mi_url = "php/search_recibos.php";
  }
  $.ajax({
    url: mi_url,
    type: "GET",
    data: { fileName: searchFileName },
    success: function (response) {
      if (response === "not found") {
        $.alert({ title: 'Imagen no encontrada.', content: 'Money-Flash', type: 'red' });
      } else {
        /*console.log(response);*/
        $("#imagePreview").html('<img src="' + response + '" alt="Imagen encontrada">');
        /* $('<button id="deleteBtn">Eliminar</button>').insertAfter("#imagePreview"); */
        $('<button id="printBtn">Imprimir</button>').insertAfter("#imagePreview");

        $("#deleteBtn").on("click", function () {
          if ($("#tipo_usuario").val() === "ADMIN") {
            if (confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
              $.ajax({
                url: "php/delete_vsa.php",
                type: "POST",
                data: { fileName: searchFileName },
                success: function (deleteResponse) {
                  $.alert({ title: deleteResponse, content: 'Money-Flash', type: 'green' });
                  $("#imagePreview").empty();
                  $("#deleteBtn").remove();
                  $("#printBtn").remove();
                  $("#imageModal_View").dialog("close");
                  fnAnulaVoucher_vsa();
                },
                error: function () {
                  $.alert({ title: 'Error al eliminar la imagen.', content: 'Money-Flash', type: 'red' });
                },
              });
            }
          } else {
            $.alert({ title: 'No tienes permiso, comunicate con el Administrador...', content: 'Money-Flash', type: 'red' });

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
      $.alert({ title: 'Error al buscar la imagen.', content: 'Money-Flash', type: 'red' });
    },
  });
}

function MuestraCambiaImagen_vsc(nombre_archivo) {
  /* let searchFileName = $("#searchFileName").val(); */
  let searchFileName = nombre_archivo;
  console.log('muestra_cambia imagen:', searchFileName);
  if (!searchFileName) {
    /* alert("Por favor, ingresa un nombre de archivo para buscar."); */
    $.alert({ title: 'Por favor, ingresa un nombre de archivo para buscar...', content: 'Money-Flash', type: 'red' });
    return;
  }
  $.ajax({
    url: "php/search_vsc.php",
    type: "GET",
    data: { fileName: searchFileName },
    success: function (response) {
      if (response === "not found") {
        $.alert({ title: 'Imagen no encontrada ===', content: 'Money-Flash', type: 'red' });
      } else {
        /*console.log(response);*/
        $("#imagePreview_vsc").html('<img src="' + response + '" alt="Imagen encontrada">');
        $('<button id="deleteBtn">Eliminar</button>').insertAfter("#imagePreview_vsc");
        $('<button id="printBtn">Imprimir</button>').insertAfter("#imagePreview_vsc");

        $("#deleteBtn").on("click", function () {
          if ($("#tipo_usuario").val() === "ADMIN") {
            if (confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
              $.ajax({
                url: "php/delete_vsc.php",
                type: "POST",
                data: { fileName: searchFileName },
                success: function (deleteResponse) {
                  $.alert({ title: deleteResponse, content: 'Money-Flash', type: 'green' });
                  $("#imagePreview").empty();
                  $("#deleteBtn").remove();
                  $("#printBtn").remove();
                  $("#imageModal_View_vsc").dialog("close");
                  fnAnulaVoucher_vsc(nombre_archivo);
                },
                error: function () {
                  $.alert({ title: 'Error al eliminar la imagen.', content: 'Money-Flash', type: 'red' });
                },
              });
            }
          } else {
            $.alert({ title: 'No tienes permiso, comunicate con el Administrador...', content: 'Money-Flash', type: 'red' });
          }
        });

        $("#printBtn_vsc").on("click", function () {
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
      $.alert({ title: 'Error al buscar la imagen.', content: 'Money-Flash', type: 'red' });
    },
  });
}

function fnAnulaVoucher_vsc(nombre_archivo) {
  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: { opcion: 'ELIMINAVSC', nombrearchivo: nombre_archivo },
    url: "controles/ManteCuentaUsuario.php",
    beforeSend: function (objeto) { $("#overlay").show(); },
    complete: function (objeto) { $("#overlay").hide(); },
    success: function () {
      $("#id_vsc").val("0");
      var newIconClass1 = ' glyphicon-paperclip gi-1x';
      var $buttonIcon1 = $('#btn_vsc').find('i');
      $buttonIcon1.attr('class', 'glyphicon ' + newIconClass1);
    }
  });
  return false;
}

function FechaServidor() {
  return new Promise((resolve, reject) => {
    $.ajax({
      async: true, type: "POST", dataType: "json", cache: false,
      data: { opt: "srvfecha" },
      url: "controles/ManteAgentes.php",
      beforeSend: function (objeto) { $("#overlay").show(); },
      complete: function (objeto) { $("#overlay").hide(); },
    }).done(function (respuesta) {
      resolve(respuesta[0].fechaservidor);
    }).fail(function (jqXHR, textStatus, errorThrown) {
      reject(errorThrown);
    });
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
