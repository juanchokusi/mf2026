function CalculaTotalesR() {
  var sumai = 0;
  var sumac = 0;
  var sumav = 0;
  var sumat = 0;
  var sumao = 0;
  var sumag = 0;
  $("#TRecibidos tr.dato").each(function () {
    if ($(this).find("td").eq(24).text() !== "S") {
      sumai += parseFloat($(this).find("td").eq(9).text() || 0, 10);
      sumac += parseFloat($(this).find("td").eq(10).text() || 0, 10);
      sumav += parseFloat($(this).find("td").eq(11).text() || 0, 10);
      sumat += parseFloat($(this).find("td").eq(12).text() || 0, 10);
      sumao += parseFloat($(this).find("td").eq(13).text() || 0, 10);
      sumag += parseFloat($(this).find("td").eq(14).text() || 0, 10);
    }
    if ($(this).find("td").eq(18).text() === "Pendiente") {
      $(this).css("color", "Blue");
    }
    if ($(this).find("td").eq(24).text() === "S") {
      $(this).css("color", "tomato");
    }
    if ($(this).find("td").eq(28).text() !== "---") {
      $(this).css("font-weight", "bold");
    }
  });
  $("#total_i").text(sumai.toFixed(2));
  $("#total_c").text(sumac.toFixed(2));
  $("#total_o").text(sumao.toFixed(2));
  $("#total_g").text(sumag.toFixed(2));
}

function calcula_cargo() {
  var entero, cargo, midecimal, centimal;
  var numero = parseFloat(document.getElementById("importe_r").value);
  var porcentaje = parseFloat(
    document.getElementById("listaporcentajes").value
  );

  cargo = parseFloat(numero * (porcentaje / 100)).toFixed(2); //1.23
  entero = parseInt(cargo); //1
  midecimal = cargo - entero; //0.23
  centimal = (midecimal * 100) % 10;
  if (centimal > 1 && centimal < 5) {
    midecimal = midecimal + 0.05;
    cargo = entero + midecimal;
  }
  cargo = parseFloat(cargo).toFixed(1);
  $("#cargo_r").val(cargo);
  var suma =
    parseFloat($("#importe_r").val()) +
    parseFloat($("#cargo_r").val()) +
    parseFloat($("#otros_r").val());
  $("#total_r").val(parseFloat(suma).toFixed(2));
}

function CalculaCargo() {
  var entero, cargo, midecimal, centimal, nentero;
  var numero = parseFloat($("#importe_r").val()); //41
  cargo = parseFloat(numero * 0.03).toFixed(2); //1.23
  entero = parseInt(cargo); //1
  midecimal = cargo - entero; //0.23
  centimal = (midecimal * 100) % 10;
  if (centimal > 1 && centimal < 5) {
    midecimal = midecimal + 0.05;
    cargo = entero + midecimal;
  }
  cargo = parseFloat(cargo).toFixed(1);
  $("#cargo_r").val(cargo);
  var suma =
    parseFloat($("#importe_r").val()) +
    parseFloat($("#cargo_r").val()) +
    parseFloat($("#otros_r").val());
  $("#total_r").val(parseFloat(suma).toFixed(2));
}

function calcula_total() {
  var m1 = 0;
  var m2 = 0;
  var m3 = 0;
  m1 = parseFloat(document.getElementById("importe_r").value);
  m2 = parseFloat(document.getElementById("cargo_r").value);
  m3 = parseFloat(document.getElementById("otros_r").value);

  r = m1 + m2 + m3;
  r = parseFloat(Math.round(r * 100) / 100).toFixed(1);
  document.getElementById("total_r").value = parseFloat(r).toFixed(2);
  //    var igv=0;
  //    igv=parseFloat(document.getElementById("cargo_r").value);
  //    igv=igv-parseFloat(igv/1.18).toFixed(2);
  //    document.getElementById("igv_r").value = parseFloat(igv).toFixed(2);
}

function calcula_vuelto() {
  var efectivo = parseFloat(document.getElementById("efectivo_r").value);
  var total = parseFloat(document.getElementById("total_r").value);
  var vuelto = efectivo - total;
  document.getElementById("vuelto_r").value = parseFloat(
    Math.round(vuelto * 100) / 100
  ).toFixed(2);
}

function ADecimal() {
  nimporte = document.getElementById("importe_r").value;
  nimporte = parseFloat(Math.round(nimporte * 100) / 100).toFixed(1);
  document.getElementById("importe_r").value = parseFloat(nimporte).toFixed(2);

  ncargo = document.getElementById("cargo_r").value;
  ncargo = parseFloat(Math.round(ncargo * 100) / 100).toFixed(1);
  document.getElementById("cargo_r").value = parseFloat(ncargo).toFixed(2);

  notros = document.getElementById("otros_r").value;
  notros = parseFloat(Math.round(notros * 100) / 100).toFixed(1);
  document.getElementById("otros_r").value = parseFloat(notros).toFixed(2);

  var suma =
    parseFloat($("#importe_r").val()) +
    parseFloat($("#cargo_r").val()) +
    parseFloat($("#otros_r").val());
  $("#total_r").val(parseFloat(suma).toFixed(2));
}

function fnRecuperaDatosCliente(idfila) {
  var idfilac = $("#sele_cli").val();
  var elTableRow = document.getElementById(idfila);
  var elTableRow1 = document.getElementById(idfilac);
  var color = elTableRow.style.backgroundColor;
  elTableRow.style.backgroundColor =
    elTableRow.style.backgroundColor === "LightSalmon" ? color : "LightSalmon";
  if (idfilac !== idfila) {
    elTableRow1.style.backgroundColor =
      elTableRow.style.backgroundColor === color ? "LightSalmon" : color;
  }
  var elTableCells = elTableRow.getElementsByTagName("td");
  $("#id_cliente").val(elTableCells[0].innerHTML);
  $("#span_idcliente").html(elTableCells[0].innerHTML);
  $("#dni_cliente").val(elTableCells[1].innerHTML);
  $("#apel_cliente").val(elTableCells[2].innerHTML);
  $("#nom_cliente").val(elTableCells[3].innerHTML);
  $("#fono_cliente").val(elTableCells[4].innerHTML);
  $("#sele_cli").val(idfila);
}

function RecuperaFilaB(idfilaB) {
  var elTableRow = document.getElementById(idfilaB);
  elTableRow.style.backgroundColor =
  elTableRow.style.backgroundColor === "LightSkyBlue"
      ? "cyan"
      : "LightSkyBlue";
  var elTableCells = elTableRow.getElementsByTagName("td");
  if ($("#remite_beneficia").val() === "B") {
    document.getElementById("idclienteb").value = elTableCells[0].innerHTML;
    document.getElementById("dnib").value = elTableCells[1].innerHTML;
    document.getElementById("nombresb").value = elTableCells[2].innerHTML + " " + elTableCells[3].innerHTML;
    $("#cuentas").val(elTableCells[5].innerHTML);
    $("#dialogo_buscaclib").dialog("close");
  }
  if ($("#remite_beneficia").val() === "R") {
    document.getElementById("idclienter").value = elTableCells[0].innerHTML;
    document.getElementById("dnir").value = elTableCells[1].innerHTML;
    document.getElementById("nombresr").value = elTableCells[2].innerHTML + " " + elTableCells[3].innerHTML;
    $("#cuentas").val(elTableCells[5].innerHTML);
    $("#dialogo_buscaclib").dialog("close");
  }
}

function RecuperaFilaR(idfilaR) {
  var elTableRowR = document.getElementById(idfilaR);
  elTableRowR.style.backgroundColor =
    elTableRowR.style.backgroundColor === "LightSkyBlue"
      ? "cyan"
      : "LightSkyBlue";
  var elTableCellsR = elTableRowR.getElementsByTagName("td");

  document.getElementById("idclienter").value = elTableCellsR[0].innerHTML;
  document.getElementById("dnir").value = elTableCellsR[1].innerHTML;
  document.getElementById("nombresr").value = elTableCellsR[2].innerHTML;
  $("#dialogo_buscaclir").dialog("close");
}

function RecuperaFilaS(idfilaS) {
  var elTableRow = document.getElementById(idfilaS);
  elTableRow.style.backgroundColor =
    elTableRow.style.backgroundColor === "green" ? "cyan" : "green";
  if (elTableRow.style.backgroundColor === "green") {
    var elTableCells = elTableRow.getElementsByTagName("td");
    document.getElementById("codsucursald").value = elTableCells[0].innerHTML;
    document.getElementById("destino").value = elTableCells[1].innerHTML;
    $("#ciudaddestino").val(elTableCells[2].innerHTML);
  }
  if ($("#codsucursald").val() !== $("#codsucursal").val()) {
    //verificamos sucursal diferente
    $("#dialogo_buscasucu").dialog("close");
  } else jAlert("Elija una SUCURSAL diferente...", "Giros - Transferencias");
}

function EvaluaBusqueda() {
  valor = $("#dni_b").val().trim();
  opts = $("#opciones_b").val();
  switch (opts) {
    case "D":
      if (valor.length > 3) {
        RecuperaClientesB(valor, opts);
      }
      else {
         $.alert({title: 'Digita mas de 3 (tres) caracteres', content: 'Money-Flash', type: 'red'});
         return false;
      }
      break;
    case "A":
      if (valor.length > 2) {
        RecuperaClientesB(valor, opts);
      }
      else {
         $.alert({title: 'Digita mas de 2 (dos) caracteres', content: 'Money-Flash', type: 'red'});
         return false;
      }
      break;
    case "T":
      if (valor.length > 4 && /^\d+$/.test(valor)) {
        RecuperaClientesB(valor, opts);
      }
      else {
         $.alert({title: 'Digita mas de 4 (cuatro) numeros', content: 'Money-Flash', type: 'red'});
         return false;
      }
      break;
    case "C":
      if (valor.length > 5 && /^\d+$/.test(valor)) {
        RecuperaClientesB(valor, opts);
      }
      else {
         $.alert({title: 'Digita mas de 5 (cinco) numeros', content: 'Money-Flash', type: 'red'});
         return false;
      }
    }
    
  }

function RecuperaClientesB(valor_b, opts_b) {
    $.ajax({
      async: true,
      type: "POST",
      dataType: "json",
      cache: false,
      data: { valor: valor_b, op: opts_b, opt: "BC" },
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      url: "controles/ManteRecibidos.php",
      success: CreaTablaB,
    });
    ResizeDivB();
  return false;
}

function RecuperaClientesR() {
  if ($("#dni_r").val() !== "" && $("#dni_r").val().length > 2) {
    $.ajax({
      async: true,
      type: "POST",
      dataType: "json",
      cache: false,
      data: { valor: $("#dni_r").val(), op: $("#opciones_r").val(), opt: "BC" },
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      url: "controles/ManteRecibidos.php",
      success: CreaTablaR,
    });
    ResizeDivR();
  } else {
    jAlert("Escriba datos a buscar", "Giros - Transferencias");
  }
  return false;
}

function RecuperaSucursal() {
  console.log($("#codsucub").val().trim());
  if ($("#codsucub").val().trim() !== "" && $("#codsucub").val().length > 2) {
    $.ajax({
      async: true, type: "POST", dataType: "json", cache: false,
      data: { opt: "BUSCASUCU", nomsucu: $("#codsucub").val().trim(), idempresa: $("#idempresa").val() },
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      url: "controles/ManteRecibidos.php",
      success: CreaTablaS,
    });
    ResizeDivS();
  } else {
    jAlert("Escriba datos a buscar", "Giros - Transferencias");
  }
  return false;
}

function RecuperaFilaCuentas(idfila) {
  var idfilac = $("#sele_cta").val();
  var elTableRow = document.getElementById(idfila);
  var elTableRow1 = document.getElementById(idfilac);
  elTableRow.style.backgroundColor =
    elTableRow.style.backgroundColor === "LightSkyBlue"
      ? "white"
      : "LightSkyBlue";
  if (idfilac !== idfila) {
    elTableRow1.style.backgroundColor =
      elTableRow.style.backgroundColor === "white" ? "LightSkyBlue" : "white";
  }
  var elTableCells = elTableRow.getElementsByTagName("td");
     $("#txt_idcuenta").val(elTableCells[1].innerHTML);
  document.getElementById("txt_nrocuenta").value = elTableCells[2].innerHTML;
   console.log($("#txt_idcuenta").val());
    console.log($("#txt_nrocuenta").val());
  document.getElementById("txt_bancos").value = elTableCells[3].innerHTML;
  document.getElementById("sele_cta").value = idfila;

   $("#btn_editacuenta").attr("disabled", false);
   $("#nrocuenta_edit").val($("#txt_nrocuenta").val());
}

function RecuperaFila(idfila) {
  if ($("#unclick").val() === "S") {
    ControlesAlCancelar();
    var idfilar = $("#sele_fr").val();
    var elTableRow = document.getElementById(idfila);
    var elTableRow1 = document.getElementById(idfilar);
    var color = elTableRow.style.backgroundColor;
    elTableRow.style.backgroundColor =
      elTableRow.style.backgroundColor === "LightSkyBlue"
        ? color
        : "LightSkyBlue";
    if (idfilar !== idfila) {
      elTableRow1.style.backgroundColor =
        elTableRow.style.backgroundColor === color ? "LightSkyBlue" : color;
    }
    var elTableCells = elTableRow.getElementsByTagName("td");
    document.getElementById("pdffecha").value = elTableCells[3].innerHTML;
    $("#fecha_seleccionada").val(elTableCells[3].innerHTML);
    document.getElementById("md_dnib").value = elTableCells[4].innerHTML;
    document.getElementById("dnib").value = elTableCells[4].innerHTML;
    document.getElementById("nombresb").value = elTableCells[5].innerHTML;
    document.getElementById("md_dnir").value = elTableCells[6].innerHTML;
    document.getElementById("dnir").value = elTableCells[6].innerHTML;
    document.getElementById("nombresr").value = elTableCells[7].innerHTML;
    var importe = elTableCells[9].innerHTML;
    importe = importe.substr(6, importe.length - 13);
    $("#importe_r").val(importe);
    var cargo = elTableCells[10].innerHTML;
    cargo = cargo.substr(6, cargo.length - 13);
    $("#cargo_r").val(cargo);
    var otros = elTableCells[13].innerHTML;
    otros = otros.substr(6, otros.length - 13);
    $("#otros_r").val(otros);
    var total = elTableCells[14].innerHTML;
    total = total.substr(6, total.length - 13);
    $("#total_r").val(total);
    document.getElementById("md_igv").value = elTableCells[11].innerHTML;
    document.getElementById("md_itf").value = elTableCells[12].innerHTML;
    document.getElementById("md_usuaregistra").value = elTableCells[18].innerHTML;
    document.getElementById("md_fechaentrega").value = elTableCells[19].innerHTML;
    document.getElementById("md_usuaentrega").value = elTableCells[20].innerHTML;
    var obs = elTableCells[21].innerHTML;
    obs = obs.substring(6, obs.length - 7);
    $("#observa").val(obs);

    document.getElementById("ciudaddestino").value = elTableCells[23].innerHTML;
    document.getElementById("destino").value = elTableCells[24].innerHTML;
    document.getElementById("pdfnomsucudestino").value = elTableCells[23].innerHTML;
    //var correla = elTableCells[1].innerHTML;
    //document.getElementById("correlativo").value = correla.substring(3, 8);
    document.getElementById("codgirosucursal").value = elTableCells[2].innerHTML;
    //document.getElementById("codgirosucursal").value = elTableCells[2].innerHTML;
    document.getElementById("codsucursald").value = elTableCells[8].innerHTML;
    document.getElementById("pdfcoddestino").value = elTableCells[8].innerHTML;
    $("#usuaentrega").val(elTableCells[20].innerHTML);
    $("#cuentas").val(elTableCells[15].innerHTML);
    $("#anulado").val(elTableCells[25].innerHTML);
    $("#idclienter").val(elTableCells[26].innerHTML);
    $("#idclienteb").val(elTableCells[27].innerHTML);
    $("#datos_edita").val(elTableCells[28].innerHTML);
    $("#nroboleta").val(elTableCells[29].innerHTML);
    $("#en_efectivo").val(elTableCells[30].innerHTML);
    $("#correlativo").val(elTableCells[31].innerHTML);
    $("#sele_fr").val(idfila);
    //alert($("#total_r").val());
    DeshabilitaControles();
    document.getElementById("btn_anular").disabled = false;
    document.getElementById("imprimir_r").disabled = false;
    $("#btn_masdatos").attr("disabled", false);
    //console.log($("#correlativo").val());
    //console.log($("#codgirosucursal").val());
  }
}

function MuestraRecibidos(fecha_busqueda, opt) {
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: { codsucu: $("#codsucursal").val(), fecha: fecha_busqueda, opt: opt },
    url: "controles/ManteRecibidos.php",
    beforeSend: function (objeto) {
      $("#carga").css({ display: "block" });
    },
    success: CreaTablaRecibidos,
    complete: function () {
      $("#carga").css("display", "none");
    },
  });
  return false;
}

function CreaTablaRecibidos(jsonrecibe) {
  var html;
  var voucher;
  for (var contador = 0; contador < jsonrecibe.length; contador++) {
    var i = contador + 1;
    html += "<tr id='R[" + contador + "]' class='dato' onclick='RecuperaFila(this.id);'>";
    /* 0 */ html += "<td>" + i + "</td>";
    voucher = jsonrecibe[contador].voucher;
    if (voucher === "XXX") {
      html += "<td>" + " <button id='btn_anular' title='' type='button' aria-hidden='true' class='btn btn-default btn-xs' ><span class='glyphicon glyphicon-remove'></span></button>" + "</td>";
    } else {
      html += "<td>" + " <button id=" + jsonrecibe[contador].cod_girosucu + " onclick='cambiaImagen(this.id);'  title='Boucher' type='button' aria-hidden='true' class='btn btn-default btn-xs' ><span class='glyphicon glyphicon-picture blue'></span></button>" + "</td>";
    }
    html +=
      "<td id='correlativo'>" + jsonrecibe[contador].cod_girosucu + "</td>";
    html += "<td>" + jsonrecibe[contador].fechahora_registro + "</td>";
    html += "<td >" + jsonrecibe[contador].dni_rucb + "</td>";
    html += "<td>" + jsonrecibe[contador].beneficiario + "</td>";
    /* 5 */ html += "<td >" + jsonrecibe[contador].dni_ruc + "</td>";
    html += "<td>" + jsonrecibe[contador].remitente + "</td>";
    html += "<td>" + jsonrecibe[contador].cod_sucursald + "</td>";
    html += "<td align='right'  data-campo='importe_giro'><span>" + jsonrecibe[contador].importe_giro + "</span></td>";
    html += "<td align='right'  data-campo='cargo_giro'><span>" + jsonrecibe[contador].cargo_giro + "</span></td>";
    /*10 */ html += "<td align='right' class='oculto'>" + jsonrecibe[contador].igv_giro + "</td>";
    html += "<td align='right' class='oculto'>" + jsonrecibe[contador].itf_giro + "</td>";
    html += "<td align='right'  data-campo='otros'><span>" + jsonrecibe[contador].otros + "</span></td>";
    html += "<td align='right' data-campo='total'><span>" + jsonrecibe[contador].total + "</span></td>";
    html += "<td>" + jsonrecibe[contador].nro_cuenta + "</td>";
    /*15 */ html += "<td class='editable' data-campo='nro_operacion'><span>" + jsonrecibe[contador].nro_operacion + "</span></td>";
    html += "<td >" + jsonrecibe[contador].telefono + "</td>";
    html += "<td >" + jsonrecibe[contador].usuario_registra + "</td>";
    html += "<td >" + jsonrecibe[contador].fechahora_entrega + "</td>";
    html += "<td >" + jsonrecibe[contador].usuario_entrega + "</td>";
    html += "<td class='editable' data-campo='observagiro'><span>" + jsonrecibe[contador].observagiro + "</span></td>";
    /*20 */ html += "<td class='oculto'>" + jsonrecibe[contador].ciudad_destino + "</td>";
    html += "<td class='oculto'>" + jsonrecibe[contador].nom_sucursal + "</td>";
    html += "<td>" + jsonrecibe[contador].datapago + "</td>";
    html += "<td class='oculto'>" + jsonrecibe[contador].anulado + "</td>";
    html += "<td class='oculto'>" + jsonrecibe[contador].idcr + "</td>";
    html += "<td class='oculto'>" + jsonrecibe[contador].idcb + "</td>";
    html += "<td class='oculto'>" + jsonrecibe[contador].data_edita + "</td>";
    /*27*/ html += "<td class='oculto'>" + jsonrecibe[contador].nro_boleta + "</td>";
    html += "<td class='oculto'>" + jsonrecibe[contador].en_efectivo + "</td>";
    html += "<td class='oculto'>" + jsonrecibe[contador].correlativo + "</td>";
    html += "</tr>";
  }

  $("#tablarecibidos").html(html);

  $("#tablarecibidos_1").html(html);

  CalculaTotalesR();

  $("#TRecibidos").dataTable({
    fnDrawCallback: function (oSettings) {
      // Need to redo the counters if filtered or sorted
      if (oSettings.bSorted || oSettings.bFiltered) {
        for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
          $("td:eq(0)", oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(
            i + 1
          );
        }
      }
    },
    aoColumnDefs: [{ bSortable: false, aTargets: [0] }],
    sScrollY: $(window).height() - 300,
    bPaginate: false,
    bLengthChange: false,
    bFilter: false,
    bSort: true,
    bInfo: false,
    bAutoWidth: true,
    bSortClasses: false, //, "bJQueryUI": true
  });
}

function MuestraEntregados(fecha_busqueda, opt) {
  /*var fecha_busqueda = $('#fecha_r').val();*/
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: { fecha: fecha_busqueda, opt: opt },
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    url: "controles/BuscaRecibidos.php",
    beforeSend: function (objeto) {
      $("#ecarga").css({ display: "block" });
    },
    success: CreaTablaEntregados,
    timeout: 4000,
    complete: function () {
      $("#ecarga").css("display", "none");
    },
  });
  return false;
}

function Inserta_Recibidos() {
  var otro_ing = 0; /*valor devuelto por el procedimiento, este sirve para saber si se hace un ingreso en transaccion ()*/
  var fechagiro = $("#fecha_r").val();
  var origen = $("#codsucursal").val();
  var remitente = $("#dnir").val();
  var destino = $("#codsucursald").val();
  var beneficiario = $("#dnib").val();
  var importe = parseFloat(document.getElementById("importe_r").value);
  var cargo = parseFloat(document.getElementById("cargo_r").value);
  var igv = parseFloat(document.getElementById("igv_r").value);
  var itf = "0";
  var otro = parseFloat(document.getElementById("otros_r").value);
  var total = parseFloat(document.getElementById("total_r").value);
  var efectivo = parseFloat(document.getElementById("efectivo_r").value);
  var ciudestino = $("#ciudaddestino").val();
  var obsgiro = $("#observa").val();
  var nrocuenta = $("#cuentas").val(); //$("input#otros").val();
  var nusuario = $("#nick").val();

  $.ajax({
    async: true,
    type: "POST",
    cache: false,
    dataType: "json",
    data: {
      opt: "I",
      fechagiro: fechagiro,
      origen: origen,
      remitente: remitente,
      destino: destino,
      beneficiario: beneficiario,
      importe: importe,
      cargo: cargo,
      igv: igv,
      itf: itf,
      otro: otro,
      total: total,
      efectivo: efectivo,
      ciudestino: ciudestino,
      obsgiro: obsgiro,
      nrocuenta: nrocuenta,
      nusuario: nusuario,
    },
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    url: "controles/ManteRecibidos.php",
    beforeSend: function (objeto) {
      $("#carga").css({ display: "block" });
    },
    complete: function () {
      fnImprimeRecibidos("alguardar");
      $("#TRecibidos").dataTable().fnDestroy();
      MuestraRecibidos($("#fechahoy").val(), $("#optbuscar").val());
      ControlesAlGuardar();
      $("#carga").css("display", "none");
      LimpiaCampos();
    },
  }).done(function (respuesta) {
    $("#codgirosucursal").val(respuesta.codgirosucu);
    $("#otros_ing").val(respuesta.otro_ing);
    console.log($("#otros_ing").val());
    if ($("#otros_ing").val() > 0) {
      if ($("#codgirosucursal").val().substring(0, 1) === "M") {
        /* verificamos a que empresa corresponde M=Money */
        fnInserta_Otros_en_Transaccion(otro, "100100100", $("#codgirosucursal").val().substring(3, 10));
      } else {
        fnInserta_Otros_en_Transaccion(
          otro,
          "200200200",
          $("#codgirosucursal").val().substring(3, 10)
        );
      }
    }
  });
  document.getElementById("imprimir_r").disabled = true;
  document.getElementById("btn_guardar").disabled = true;

  return false;
}

function fnImprimeRecibidos(accion) {
  if ($("#codsucursald").val() === "MBC") {
    var observanrocuenta = $("#cuentas").val();
  } else {
    observanrocuenta = $("#observa").val();
  }
  fnFechaHoraActual();
  var vuelto =
    parseFloat($("#en_efectivo").val()) - parseFloat($("#total_r").val());
  vuelto = vuelto.toFixed(2);
  if (vuelto < 0) {
    vuelto = 0.0;
  }
  var confirma_impresion = VerificaImprimir();

  switch (accion) {
    case "manualmente":
      //imprime cualquiera en fecha actual y no debe estar anulado
      //if ($('#fechahoy').val() === $('#fecha_r').val() && $("#anulado").val() === 'N') {
      if (confirma_impresion === "SI") {
        window.open(
          "ImprimeTicketRecepcion.php?codgirosucursal=" + $("#codgirosucursal").val() + "&nick=" + $("#nick").val() + "&codsucu=" + $("#codsucursal").val(),"_blank"
        );
        window.open(
          "ImprimeTicket_Recepcion.php?codgirosucursal=" +
            $("#codgirosucursal").val() + "&nick=" + $("#nick").val() + "&codsucu=" + $("#codsucursal").val(), "_blank"
        );
      } else {
        $.alert({
          title: "Giros - Transferencias",
          content:
            "NO tienes permiso para imprimir, comunicate con el Administrador",
        });
      }
      break;
    case "alguardar":
      var vuelto_ag =
        parseFloat($("#efectivo_r").val()) - parseFloat($("#total_r").val());
      vuelto_ag = vuelto_ag.toFixed(2);
      var efectivor = parseFloat($("#efectivo_r").val());
      efectivor = efectivor.toFixed(2);
      window.open(
        "ImprimeTicketRecepcion.php?codgirosucursal=" +
          $("#codgirosucursal").val() + "&nick=" + $("#nick").val() + "&codsucu=" + $("#codsucursal").val(), "_blank"
      ); 
          window.open(
        "ImprimeTicket_Recepcion.php?codgirosucursal=" +
          $("#codgirosucursal").val() + "&nick=" + $("#nick").val() + "&codsucu=" + $("#codsucursal").val(), "_blank"
      ); 


// changed here (cambiado aquí)
  }
  return false;
}

function fnCreaTablaMasDatos() {
  var html;
  html += "<tr>";
  html += "<td>" + $("#md_dnib").val() + "</td>";
  html += "<td>" + $("#md_dnir").val() + "</td>";
  html += "<td>" + $("#md_igv").val() + "</td>";
  html += "<td>" + $("#md_itf").val() + "</td>";
  html += "<td>" + $("#md_usuaregistra").val() + "</td>";
  html += "<td>" + $("#md_fechaentrega").val() + "</td>";
  html += "<td>" + $("#md_usuaentrega").val() + "</td>";
  html += "<td>" + $("#ciudaddestino").val() + "</td>";
  html += "<td>" + $("#destino").val() + "</td>";
  html += "<td>" + $("#datos_edita").val() + "</td>";
  html += "<td>" + $("#nroboleta").val() + "</td>";
  html += "</tr>";
  $("#tbody_masdatos").html(html);
}

function fnConfirmaAnulaRecibidos() {
  /* anulado: no, Admin: solo de diferentes fechas, operador: solo en fecha actual y que la transfeencia este pendiente */
  if ($("#anulado").val() !== "S") {
    var fechahoy = $("#fechahoy").val();
    var fechasele = $("#pdffecha").val().substr(0, 10);
    if (fechahoy === fechasele && $("#usuaentrega").val() === "---") {
      if ($("#tipousuario").val() !== "ADMIN") {
        jPrompt(
          "Esta seguro de ANULAR ?" + "\n" +$("#nombresb").val() +"\n" +$("#nombresr").val() +"\n" +$("#importe_r").val() +
          "\n" +"Escriba motivo de anulacion:","","Transferencias",
          function (r) {
            if (r) {
              fnAnulaRecibidos(r);
              $("#correlativo").val("");
              $("#TRecibidos").dataTable().fnDestroy();
              MuestraRecibidos($("#fecha_r").val(), "R");
            } else {
              jAlert("Digita motivo de Anulacion", "Giros - Transferencias");
            }
          }
        );
      }
      if ($("#tipousuario").val() === "ADMIN") {
        jPrompt(
          "Esta seguro de ANULAR ?" + "\n" +$("#nombresb").val() + "\n" + $("#nombresr").val() + "\n" + $("#importe_r").val() + "\n" + "Escriba motivo de anulacion:", "",          "Transferencias",
          function (r) {
            if (r) {
              fnAnulaRecibidos(r);
              $("#correlativo").val("");
              $("#TRecibidos").dataTable().fnDestroy();
              MuestraRecibidos($("#fecha_r").val(), "R");
            } else {
              jAlert("Digita motivo de Anulacion", "Giros - Transferencias");
            }
          }
        );
      }
    } else {
      jAlert("NO puede Anular esta operacion, comuniquese con el Administrador.",        "Giros - Transferencias");
    }

    if (fechahoy !== fechasele) {
      if ($("#tipousuario").val() === "ADMIN") {
        jPrompt(
          "Esta seguro de ANULAR ?" + "\n" + $("#nombresb").val() + "\n" + $("#nombresr").val() + "\n" + $("#importe_r").val() + "\n" + "Escriba motivo de anulacion:",
          "",
          "Transferencias",
          function (r) {
            if (r) {
              fnAnulaRecibidos(r);
              $("#correlativo").val("");
            } else {
              jAlert("Digita motivo de Anulacion", "Giros - Transferencias");
            }
          }
        );
      }
    }
  } else {
    jAlert("Ya esta anulado, verifique...", "Giros - Transferencias");
  }
}

function fnAnulaRecibidos(cadena) {
  var corr = document.getElementById("correlativo").value;
  var correla = parseInt(corr);
  var motivos =
    cadena + " (" + $("#nick").val() + "==" + $("#fechahorahoy").val() + ")";
  $.ajax({async: true,type: "POST",dataType: "json",cache: false,
    data: { motivo: motivos, correlativo: correla, opt: "ANULA" },
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    url: "controles/ManteRecibidos.php",
    complete: function () {
      $("#TRecibidos").dataTable().fnDestroy();
      MuestraRecibidos($("#fecha_r").val(), "R");
      fnActualizaCodAcreditado();
    },
  });
  //alert(corr);
  return false;
}

function fnSeleccionaCuenta(idfila) {
  var elTableRow = document.getElementById(idfila);
  var elTableCells = elTableRow.getElementsByTagName("td");
  for (var i = 0; i < elTableCells.length; i++) {
    var inicial = elTableCells[3].innerHTML;
    /* inicial = inicial.substring(0, 3); */
    $("#cuentas").val(inicial + ":" + elTableCells[2].innerHTML);
    $("#dialogo_asigcuenta").dialog("close");
  }
}

function fnListaInsertaCuentas(id_cliente) {
  var txt_nrocuenta;
  txt_nrocuenta = $("#txt_nrocuenta").val();
  txt_nrocuenta = txt_nrocuenta.replace(/\s+/g, "");
  switch ($("#opproceso").val()) {
    case "I":
      if ($("#hid_idbanco").val().length > 0 && $("#txt_nrocuenta").val().length > 9) {
        /*opcion : opcion para el procedimeintos almacenado define a que tabla afecta( Usuario o Cliente), opproce: para listar o Insertar dentro del sp... */
        $.ajax({
          async: true, type: "POST", dataType: "json",  cache: false,
          data: {nrocuenta: txt_nrocuenta, idbanco: $("#hid_idbanco").val(), idcliente: $("#idcliente").val(),
            usuamodifica: $("#nick").val(), opcion: "C", opproce: $("#opproceso").val(),
            idempresa: $("#codsucursal").val().substring(0, 1),
          },
          url: "controles/ManteBancos.php",
          beforeSend: function (objeto) {
            $(".mensaje1").css("display", "block");
            $(".mensaje1").html("<img src='img/cargando.gif'>");
          },
          complete: function (objeto) {
            $(".mensaje1").css("display", "none");
          },
          success: fnCreaTablaClienteCuentas,
        });
      } else {
        jAlert("Datos incompletos, Verifique ...", "Agentes");
      }
      break;
    case "A":
      if (
        $("#txt_bancos").val().trim() !== "" &&
        $("#txt_nrocuenta").val().trim() !== ""
      ) {
        /*opcion : opcion para el procedimeintos almacenado define a que tabla afecta( Usuario o Cliente), opproce: para listar o Insertar dentro del sp... */
        $.ajax({
          async: true, type: "POST", dataType: "json", cache: false,
          data: {
            nrocuenta: $("#txt_nrocuenta").val(),
            idbanco: $("#txt_idbanco").val(),
            idcliente: $("#idcliente").val(),
            usuamodifica: $("#nick").val(),
            opcion: "C",
            opproce: $("#opproceso").val(),
            idempresa: $("#codsucursal").val().substring(0, 1),
          },
          url: "controles/ManteBancos.php",
          beforeSend: function (objeto) {
            $(".mensaje1").css("display", "block");
            $(".mensaje1").html("<img src='img/cargando.gif'>");
          },
          complete: function (objeto) {
            $(".mensaje1").css("display", "none");
          },
          success: fnCreaTablaClienteCuentas,
        });
      } else {
        jAlert("Seleccione una cuenta a Eliminar, Verifique ...", "Agentes");
      }
      break;
    /*Listar*/ 
    case "L":
      $.ajax({
        async: true, type: "POST", dataType: "json", cache: false,
        data: {idcuenta: $("#txt_idbanco").val(), idcliente: id_cliente, nrocuenta: $("#txt_nrocuenta").val(), opt:"ListaCuentaCliente",opcion: "L" },
        url: "controles/ManteRecibidos.php",
        beforeSend: function (objeto) {
          $(".mensaje1").css("display", "block");
          $(".mensaje1").html("<img src='img/cargando.gif'>");
        },
        complete: function (objeto) {
          $(".mensaje1").css("display", "none");
        },
        success: fnCreaTablaCuentasCliente,
      });
      break;
  } /* end CASE */

  return false;
}

function fnMuestraBancos() {
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: { opcion: "TRANS", grupo: "C" },
    url: "controles/ManteBancos.php",
    beforeSend: function (objeto) {
      $("#carga").html("<img src='img/carga.gif'>");
    },
    complete: function (objeto) {
      $("#carga").css("display", "none");
    },
    success: fnCreaTablaBancos,
  });
  return false;
}

function fnSeleccionaBanco(idfila) {
  var elTableRow = document.getElementById(idfila);
  var elTableCells = elTableRow.getElementsByTagName("td");

  //var inicial=elTableCells[2].innerHTML;
  $("#hid_idbanco").val(elTableCells[1].innerHTML);
  $("#txt_bancos").val(
    elTableCells[2].innerHTML + ":" + elTableCells[3].innerHTML
  );
  $("#divbanco").css("display", "none");
  //$("#tabla_cuentas").css("display","block");
}
/* ============ DOCUEMENT================================================ */
$(document).ready(function () {
  $("#unclick").val("S");
  //ResizeDivs();
  
  ControlesAlGuardar();
  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  $(".edita").toggle(1000);
  $("#nombresb").tooltip({ show: { effect: "slideDown", delay: 250 } });
  $("#btn_masdatos").tooltip({ show: { effect: "slideDown", delay: 250 } });
  $("#btn_anular").tooltip({ show: { effect: "slideDown", delay: 250 } });
  $("#btn_editar").tooltip({ show: { effect: "slideDown", delay: 250 } });
  $("#btn_boleta").tooltip({ show: { effect: "slideDown", delay: 250 } });
  $("#btn_boleta_guardar").tooltip({
    show: { effect: "slideDown", delay: 250 },
  });
  $("#btn_boleta_cancelar").tooltip({
    show: { effect: "slideDown", delay: 250 },
  });
  $("#btn_boleta_editar").tooltip({
    show: { effect: "slideDown", delay: 250 },
  });
  $("#btn_boleta_editar").tooltip({
    show: { effect: "slideDown", delay: 250 },
  });

  /////////////////// KEY PRESS //////////////////////////////////////////////
  $("#dnib").keypress(function (e) {
    //13 es el código de la tecla
    if (e.which === 13) {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "controles/ManteRecibidos.php",
        data: { dni: $("#dnib").val(), opt: "BCLIENTE" },
        beforeSend: function () {
          $("#nombresb").html("Procesando, espere por favor...");
        },
      }).done(function (respuesta) {
        $("#idclienteb").val(respuesta.idcliente);
        $("#nombresb").val(respuesta.nombres);
      });
    }
  });

  $("#dnir").keypress(function (e) {
    if (e.which === 13) {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "controles/ManteRecibidos.php",
        data: { opt: "BCLIENTE", dni: $("#dnir").val() },
        beforeSend: function () {
          $("#nombresr").html("Procesando, espere por favor...");
        },
      }).done(function (respuesta) {
        $("#idclienter").val(respuesta.idcliente);
        $("#nombresr").val(respuesta.nombres);
      });
    }
  });

  $("#destino").keypress(function (e) {
    if ($("#destino").val() !== $("#codsucursal").val()) {
      //verificamos sucursal diferente
      if (e.which === 13) {
        $.ajax({
          type: "POST",
          dataType: "json",
          url: "controles/ManteRecibidos.php",
          data: {
            codsucu: $("#destino").val(),
            idempresa: $("#codsucursal").val().substr(0, 1),
            opt: "B",
          },
        }).done(function (respuesta) {
          $("#codsucursald").val(respuesta.codsucursal);
          $("#destino").val(respuesta.nomsucursal);
          $("#ciudaddestino").val(respuesta.dirsucursal);
          $("#pdfdestino").val(respuesta.nomsucursal); /*para la impresion*/
          //$("#destino").attr("readonly",true);
        });
      }
    } else jAlert("Elija una SUCURSAL diferente...", "Giros - Transferencias");
  });

  $("#dni_b").keypress(function (e) {
    if (e.which === 13) {
      if ($("#dni_b").val().trim() !== "") {
        EvaluaBusqueda();
      } else jWarning("Ingrese datos a buscar...", "Giros - Transferencias");
    }
  });

  $("#dni_r").keypress(function (e) {
    if (e.which === 13) {
      if ($("#dni_r").val().trim() !== "") {
        RecuperaClientesR();
      } else jWarning("Ingrese datos a buscar...", "Giros - Transferencias");
    }
  });

  $("#codsucub").keypress(function (e) {
    console.log('codsucu:', $("#codsucub").val().trim());
    if (e.which === 13) {
      if ($("#codsucub").val().trim() !== "") {
        RecuperaSucursal();
      } else jWarning("Ingrese datos a buscar...", "Giros - Transferencias");
    }
  });

  $("#ednib").keypress(function (e) {
    if (e.which === 13) {
      $.ajax({
        type: "POST",
        dataType: "json",
        data: { opt: "BCLIENTE", dni: $("#ednib").val() },
        url: "controles/DatosCliente.php",
        beforeSend: function () {
          $("#enombresb").html("Procesando, espere por favor...");
        },
      }).done(function (respuesta) {
        $("#enombresb").val(respuesta.nombres);
      });
    }
  });

  $("#buscador").keyup(function () {
    // When value of the input is not blank
    if ($(this).val() !== "") {
      // Show only matching TR, hide rest of them
      $("#TRecibidos tbody>tr").hide();
      $("#TRecibidos td:contains-ci('" + $(this).val() + "')")
        .parent("tr")
        .show();
    } else {
      // When there is no input or clean again, show everything back
      $("#TRecibidos tbody>tr").show();
    }
  });
  $.extend($.expr[":"], {
    "contains-ci": function (elem, i, match, array) {
      return (
        (elem.textContent || elem.innerText || $(elem).text() || "")
          .toLowerCase()
          .indexOf((match[3] || "").toLowerCase()) >= 0
      );
    },
  });

  $("#destino").focus(function () {
    $("#destino").val("");
    $("#codsucursald").val("");
  });

  //////////////////////////// click /////////////////////////////
  $("#nombresb").click(function () {
    $("#idcliente").val(
      $("#idclienteb").val()
    ); /*sirve para hacer la busqueda cuentas x cliente*/
    $("#txt_datocliente").val($("#nombresb").val());
  });
  $("#nombresr").click(function () {
    $("#idcliente").val($("#idclienter").val());
    $("#txt_datocliente").val($("#nombresr").val());
  });

   $('#txt_datocliente').on('focus', function() {
        $(this).blur(); 
    });

  $("#btn_guardar").click(function () {
    var nulo = "N";
    var existe = "N";
    if ($("#dnib").val().trim() === "" || $("#nombresb").val().trim() === "") {
      nulo = "S";
      jError(
        "Datos de BENEFICIARIO incompletos..., verifique",
        "Giros - Transferencias"
      );
    } else {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "controles/ManteRecibidos.php",
        data: { dni: $("#dnib").val(), opt: "BCLIENTE" },
        beforeSend: function () {
          $("#nombresb").html("Procesando, espere por favor...");
        },
      }).done(function (respuesta) {
        existe = respuesta.idcliente;
        if (existe === "XXX") {
          jError(
            "DNI del BENEFICIARIO no existe..., verifique",
            "Giros - Transferencias"
          );
          nulo = "S";
        }
      });
    }

    if ($("#dnir").val().trim() === "" || $("#nombresr").val().trim() === "") {
      jError(
        "Datos de REMITENTE incompletos..., verifique",
        "Giros - Transferencias"
      );
      nulo = "S";
    } else {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "controles/ManteRecibidos.php",
        data: { dni: $("#dnir").val(), opt: "BCLIENTE" },
        beforeSend: function () {
          $("#nombresb").html("Procesando, espere por favor...");
        },
      }).done(function (respuesta) {
        existe = respuesta.idcliente;
        if (existe === "XXX") {
          jError(
            "DNI del REMITENTE no existe..., verifique",
            "Giros - Transferencias"
          );
          nulo = "S";
        }
      });
    }

    if ($("#codsucursald").val().trim() === "") {
      jError(
        "SUCURSAL DESTINO invalido, Verifique...",
        "Giros - Transferencias"
      );
      nulo = "S";
    }
    if (parseInt($("#importe_r").val()) === 0) {
      jError("Ingrese un IMPORTE..., verifique", "Giros - Transferencias");
      nulo = "S";
    }
    if (parseFloat($("#cargo_r").val()) === 0) {
      jError("Falta CARGO..., verifique", "Giros - Transferencias");
      nulo = "S";
    }
    if (nulo === "N") {
      jConfirm(
        "¿Esta seguro guardar:\n" +
          $("#nombresb").val() +
          "\n" +
          $("#nombresr").val() +
          "\n" +
          $("#importe_r").val(),
        "Giros - Transferencias",
        function (r) {
          if (r) {
            Inserta_Recibidos();
          }
        }
      );
    }
  });

  $("#busca_cuentas").click(function () {
    if ($("#idcliente").val().trim() === "") {
      jAlert("Seleccione un cliente...", "Agentes");
    } else {
      $("#dialogo_asigcuenta").dialog("open");
      $("#divbanco").css("display", "none");
      fnListaInsertaCuentas($("#idcliente").val());
      $("#btn_asignacuenta").attr("disabled", true);
      $("#btn_eliminacuenta").attr("disabled", true);
      $("#btn_editacuenta").attr("disabled", true);
    }
  });

  $("#btn_asignacuenta").click(function () {
    $("#opproceso").val("I");
    fnListaInsertaCuentas($("#idcliente").val());
    $("#opproceso").val("L");
    $("#btn_asignacuenta").attr("disabled", true);
    $("#btn_nuevacuenta").attr("disabled", false);
    $("#btn_eliminacuenta").attr("disabled", false);
    $("#btn_editacuenta").attr("disabled", false);

    $("#txt_nrocuenta").val("");
    $("#txt_bancos").css("display", "none");
    $("#txt_nrocuenta").css("display", "none");
  
    $("#divcta").css("display", "block");
  });
  $("#btn_nuevacuenta").click(function () {
    $("#txt_bancos").css("display", "block");
    $("#txt_nrocuenta").css("display", "block");
  
    $("#txt_bancos").val("");
    $("#hid_idbanco").val("");
    $("#txt_nrocuenta").val("");
    $("#btn_asignacuenta").attr("disabled", false);
    $("#btn_eliminacuenta").attr("disabled", true);
    $("#btn_editacuenta").attr("disabled", true);
    $("#divcta").css("display", "none");
    $("#divbanco").css("display", "block");
    fnMuestraBancos();
    ResizeDivBan();
  });
  $("#btn_eliminacuenta").click(function () {
    $("#opproceso").val("A"); /* anular */
    jConfirm(
      "¿Esta seguro de Eliminar a :" + $("#txt_nrocuenta").val(),
      "Agentes",
      function (r) {
        if (r) {
          fnListaInsertaCuentas($("#idcliente").val());
          $("#opproceso").val("L");
          $("#txt_idbanco").val("");
          $("#txt_nrocuenta").val("");
          $("#btn_eliminacuenta").attr("disabled", true);
          $("#btn_editacuenta").attr("disabled", true);
          $("#btn_asignacuenta").attr("disabled", true);
          $("#btn_nuevacuenta").attr("disabled", false);
          $("#txt_bancos").css("display", "none");
          $("#txt_nrocuenta").css("display", "none");
         
        } /* end if */
      }
    ); /* end jconfirm */
  });

  $("#btn_masdatos").click(function () {
    $("#dialogo_masdatos").dialog("open");
  });
  var menu_activo = "S";
  $("#menu_toggle").click(function () {
    if (menu_activo === "N") {
      $("#formulario").css("display", "block");
      var mi_height = $("#formulario").height();
      var tabla_height = $(".mygrid-wrapper-div").height();
      $(".mygrid-wrapper-div").height(tabla_height - mi_height);
      menu_activo = "S";
    } else {
      $("#formulario").css("display", "none");
      var mi_height = $("#formulario").height();
      var tabla_height = $(".mygrid-wrapper-div").height();
      $(".mygrid-wrapper-div").height(tabla_height + mi_height);
      menu_activo = "N";
    }
  });

  $("#busca_beneficiario").click(function () {
    $("#dialogo_buscaclib").dialog("open");
    $("#remite_beneficia").val("B");
  });

  $("#busca_remitente").click(function () {
    $("#dialogo_buscaclib").dialog("open");
    $("#remite_beneficia").val("R");
  });

  $("#busca_sucursal").click(function () {
    $("#dialogo_buscasucu").dialog("open");
  });

  $("#btn_nuevo").click(function () {
    ControlesNuevo();
    $("#dnib").focus();
  });

  $("#btn_cancelar").click(function () {
  
    ControlesAlCancelar();
    //        $("#tablarecibidos_1").css("display","none");
    //        $("#cab_trecibidos").css("display","none");
    //        $(".mygrid-wrapper-divclon").css("overflow-x","auto");
    //        $(".mygrid-wrapper-divclon").css("overflow-y","hidden");
    //        $("#divclon").css("width","97%");
  });

  $("#btn_llamaclientesb").click(function () {
    $("#dialogo_cliente").dialog("open");
  });

  $("#btn_llamaclientesr").click(function () {
    window.open(
      "clientes.php",
      "_blank",
      "toolbar=0, location=0, menubar=0,scrollbars=yes, resizable=yes, width=900, height=400"
    );
  });

  var fechahoy = $("#fechahoy").val();
  var fechasele = $("#fecha_seleccionada").val();
  var tipousuario = $("#tipousuario").val();

  $("#btn_editar").click(function () {
    //alert($("#fecha_seleccionada").val().substr(0,10) );
    if (fechahoy === $("#fecha_seleccionada").val().substr(0, 10)) {
      if ($("#correlativo").val() !== "") {
        if ($("#usuaentrega").val() === "---") {
          $(".normal").toggle(1000);
          $(".edita").toggle(1000);
          ControlesAlEditar();
        } else {
          jWarning(
            "No puede EDITAR, ya fue pagado, verifique...",
            "Giros - Transferencias"
          );
        }
      } else {
        jError("Selccione algun Giro para editar...", "Giros - Transferencias");
      }
    } else {
      if (fechahoy !== fechasele && tipousuario === "ADMIN") {
        if ($("#correlativo").val() !== "") {
          if ($("#usuaentrega").val() === "---") {
            $(".normal").toggle(1000);
            $(".edita").toggle(1000);
            ControlesAlEditar();
          } else {
            jWarning(
              "No puede EDITAR, ya fue pagado, verifique...",
              "Giros - Transferencias"
            );
          }
        } else {
          jError(
            "Selccione algun Giro para editar...",
            "Giros - Transferencias"
          );
        }
      } else {
        jError(
          "Solo esta permitido en fecha actual.",
          "Giros - Transferencias"
        );
      }
    }
  });

  $("#btn_guardaedicion").click(function () {
    var nulo = "N";
    if ($("#dnib").val().trim() === "" || $("#nombresb").val().trim() === "") {
      nulo = "S";
      jError(
        "Datos de BENEFICIARIO incompletos..., verifique",
        "Giros - Transferencias"
      );
    } else {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "controles/ManteRecibidos.php",
        data: { dni: $("#dnib").val(), opt: "BCLIENTE" },
        beforeSend: function () {
          $("#nombresb").html("Procesando, espere por favor...");
        },
      }).done(function (respuesta) {
        existe = respuesta.idcliente;
        if (existe === "XXX") {
          jError(
            "DNI del BENEFICIARIO no existe..., verifique",
            "Giros - Transferencias"
          );
          nulo = "S";
        }
      });
    }

    if ($("#dnir").val().trim() === "" || $("#nombresr").val().trim() === "") {
      jError(
        "Datos de REMITENTE incompletos..., verifique",
        "Giros - Transferencias"
      );
      nulo = "S";
    } else {
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "controles/ManteRecibidos.php",
        data: { dni: $("#dnir").val(), opt: "BCLIENTE" },
        beforeSend: function () {
          $("#nombresb").html("Procesando, espere por favor...");
        },
      }).done(function (respuesta) {
        existe = respuesta.idcliente;
        if (existe === "XXX") {
          jError(
            "DNI del REMITENTE no existe..., verifique",
            "Giros - Transferencias"
          );
          nulo = "S";
        }
      });
    }

    if ($("#codsucursald").val().trim() === "") {
      jError(
        "SUCURSAL DESTINO invalido, Verifique...",
        "Giros - Transferencias"
      );
      nulo = "S";
    } else {
      nulo = "N";
    }

    if (nulo === "N") {
      jConfirm(
        "¿Esta seguro guardar los cambios hechos a: " +
          $("#codgirosucursal").val(),
        "Giros - Transferencias",
        function (r) {
          if (r) {
            $(".normal").toggle(1000);
            $(".edita").toggle(1000);
            FnGuardaEdicion();
            ControlesAlGuardar();
          }
        }
      );
    }
  });

  $("#btn_cancelaedicion").click(function () {
    $(".normal").toggle(1000);
    $(".edita").toggle(1000);
    ControlesAlCancelar();
  });

  $("#boleta_cargo").blur(function () {
    var num_letras = covertirNumLetras($("#boleta_cargo").val());
    $("#boleta_numeroletras").val(num_letras);
  });

  $("#boleta_nro").blur(function () {
    var nnumero = parseInt($("#boleta_nro").val());
    if (nnumero > 0) {
      nnumero = fnAddZeros(nnumero);
      $("#boleta_nro").val(nnumero);
    }
  });

  $("#btn_boleta").click(function () {
    if ($("#nroboleta").val() === "---") {
      $("#boleta_fecha").val($("#pdffecha").val().substring(0, 10));
      $("#dialogo_boleta").dialog("open");
      $("#boleta_nombres").val($("#nombresr").val());
      $("#boleta_destino").val($("#ciudaddestino").val());
      $("#boleta_describe").val(
        "Comision por envio de: " + $("#importe_r").val()
      );
      $("#boleta_cargo").val($("#cargo_r").val());
      var num_letras = covertirNumLetras($("#boleta_cargo").val());
      $("#boleta_numeroletras").val(num_letras);
    } else {
      $.alert("Ya se imprimio Boleta", "Giros - Transferencias");
    }
  });
  var jc;
  $("#btn_boleta_guardar").click(function () {
    if (
      $("#boleta_nro").val().trim() === "" ||
      $("#boleta_destino").val().trim() === "" ||
      $("#boleta_describe").val().trim() === "" ||
      $("#boleta_cargo").val().trim() === ""
    ) {
      $.alert("Faltan datos verifique", "Giros - Transferencias");
    } else {
      jc = $.confirm({
        title: "Giros-Transferencias",
        confirmButton: "Continuar",
        cancelButton: "Cancelar",
        confirmButtonClass: "btn-warning",
        cancelButtonClass: "btn-default",
        content: "Esta seguro de guardar Boleta:" + $("#boleta_nro").val(),
        confirm: function () {
          fnGuardarBoleta();
        },
        cancel: function () {
          //              $.alert('Canceled!')
        },
      });
    }
  });

  $("#btn_cliente_nuevo").click(function () {
    fnLimpiaCamposClientes();
    fnHabilitaCamposCliente();
    $("#id_cliente").val("");
    $("#span_idcliente").html("ID");
    $("#div_MasDatosCliente").css("display", "block");
    $("#btn_cliente_editar").attr("disabled", true);
  });

  $("#btn_cliente_editar").click(function () {
    if (
      $("#dni_cliente").val().trim() === "" ||
      $("#nom_cliente").val().trim() === "" ||
      $("#apel_cliente").val().trim() === ""
    ) {
      jWarning("Faltan datos, Verifique...", "Giros - Transferencias");
    } else {
      fnHabilitaCamposCliente();
      $("#btn_cliente_nuevo").attr("disabled", true);
    }
  });

  $("#btn_cliente_guardar").click(function () {
    jConfirm(
      "¿Esta seguro guardar:\n" +
        $("#dni_cliente").val() +
        "\n" +
        $("#nom_cliente").val() +
          "\n" +
          $("#fono_cliente").val() +
          "\n" +
          $("#apel_cliente").val(),
          
      "Giros - Transferencias",
      function (r) {
        if (r) {
          if ($("#id_cliente").val().trim() === "") {
            if (
              $("#dni_cliente").val().trim() === "" ||
              $("#nom_cliente").val().trim() === "" ||
              $("#fono_cliente").val().trim() === "" ||
              $("#apel_cliente").val().trim() === ""
            ) {
              jWarning("Faltan datos, Verifique...", "Giros - Transferencias");
            } else {
              fnInsertaCliente();
              //$("#dialogo_cliente").dialog("close");
              //$("#div_MasDatosCliente").css("display", "none");
            }
          } ///////// editando /////////
          else {
            fnEditaCliente();
            //                    $("#dialogo_cliente").dialog("close");
            //                    $("#div_MasDatosCliente").css("display", "block");
          }
        }
      }
    );
  });

  $("#btn_voucher").click(function () {
    cambiaImagen($("#codgirosucursal").val().trim());
  });

  $("#btn_lista_voucher").click(function () {
    $("#dialogo_voucher").dialog("open");
    
  });

  $("#btn_imprime_voucher").click(function () {
    var mode = "iframe";
    var close = mode === "popup";
    var options = { mode: mode, popClose: close };
    $("div.printableArea").printArea(options);
    fnRegistraImpresionVoucher();
  });

  $(function ($) {
    $.datepicker.regional["es"] = {
      closeText: "Cerrar",
      prevText: "<Ant",
      nextText: "Sig>",
      currentText: "Hoy",
      monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      monthNamesShort: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
      dayNames: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Juv", "Vie", "Sáb"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
      weekHeader: "Sm",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: "",
    };
    $.datepicker.setDefaults($.datepicker.regional["es"]);
  });

  $("#fecha_r").datepicker({
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
      //si9 la fecha es mayor no arga datos
      fnVerificaFecha();
    },
    /*onClose: function (selectedDate){CalculaTotalesR();} */
  });

  $("#boleta_fecha").datepicker({
    dateFormat: "yy/mm/dd",
    showOn: "both",
    buttonImage: "img/calendar.ico",
    buttonImageOnly: true,
    changeYear: true,
    beforeShow: function () {
      $(".ui-datepicker").css("font-size", 10);
    },
    numberOfMonths: 1,
  });

  ///////////////////// autocompleta ///////////////////////////

  $("#txt_bancos").autocomplete({
    source: "controles/ManteBancos.php",
    Length: 2,
    select: function (event, data) {
      $("#hid_idbanco").val(data.item.id);
      $("#txt_bancos").val(data.item.value);
    },
  });

  ///////////////////////////////// Dialogos ////////////////////////////

  $("#dialogo_masdatos").dialog({
    autoOpen: false,
    resizable: true,
    modal: true,
    height: 270,
    width: 600,
    show: { effect: "blind", duration: 1000 },
    hide: { effect: "fade", duration: 1000 },
    open: function (event, ui) {
      var ntitulo =
        "Datos de : " +
        $("#codgirosucursal").val() +
        "// Fecha:" +
        $("#pdffecha").val();
      $("span.ui-dialog-title").css("font-size", 10);
      $("span.ui-dialog-title").text(ntitulo);
      fnCreaTablaMasDatos();
    },
    buttons: {
      Salir: function () {
        $(this).dialog("close");
      },
    },
    close: function (event, ui) {
      var html;
      $("#tbody_masdatos").html(html);
    },
  });

  $("#dialogo_asigcuenta").dialog({
    autoOpen: false,
    resizable: true,
    modal: true,
    height: 450,
    width: 450,
    open: function (event, ui) {
      $("#txt_nrocuenta").css("display", "none");
      $("#txt_bancos").css("display", "none");
      $("#nrocuenta_edit").css("display", "none");
      $("#div_nrocuenta_edit .input-group-btn").hide();
    },
    close: function (event, ui) {
      $("#txt_nrocuenta").val("");
      $("#txt_bancos").val("");
      $("#nrocuenta_edit").val("");
      $("#txt_nrocuenta").css("display", "none");
      $("#nrocuenta_edit").css("display", "none");
      $("#div_nrocuenta_edit .input-group-btn").hide();
      $("#txt_bancos").css("display", "none");
      $("#opproceso").val("L");
    },
  });

  $("#dialogo_buscaclib").dialog({
    autoOpen: false,
    resizable: true,
    modal: true,
    height: 450,
    width: 500,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "fade", duration: 500 },
    open: function (event, ui) {
      var ntitulo = "Busca Beneficiario";
      $("span.ui-dialog-title").css("font-size", 10);
      $("span.ui-dialog-title").text(ntitulo);
      $("#dni_b").val("");
      //fnCreaTablaMasDatos();
    },
    buttons: {
      Salir: function () {
        $(this).dialog("close");
      },
    },
    close: function (event, ui) {
      fnLimpiaTablaClientes();
    },
  });

  $("#dialogo_buscaclir").dialog({
    autoOpen: false,
    resizable: true,
    modal: true,
    height: 450,
    width: 400,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "fade", duration: 500 },
    open: function (event, ui) {
      var ntitulo = "Busca Remitente";
      $("span.ui-dialog-title").css("font-size", 10);
      $("span.ui-dialog-title").text(ntitulo);
      $("#dni_r").val("");
      //fnCreaTablaMasDatos();
    },
    buttons: {
      Salir: function () {
        $(this).dialog("close");
      },
    },
    close: function (event, ui) {
      fnLimpiaTablaClientes();
    },
  });

  $("#dialogo_buscasucu").dialog({
    autoOpen: false,
    resizable: true,
    modal: true,
    height: 450,
    width: 380,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "fade", duration: 500 },
    open: function (event, ui) {
      var ntitulo = "Busca Sucursal";
      $("span.ui-dialog-title").css("font-size", 10);
      $("span.ui-dialog-title").text(ntitulo);
      /* $("#codsucu").val(""); */
    },
    buttons: {
      Salir: function () {
        $(this).dialog("close");
      },
    },
    close: function (event, ui) {
      fnLimpiaSucursales();
    },
  });

  $("#dialogo_boleta").dialog({
    autoOpen: false,
    resizable: true,
    modal: true,
    height: 300,
    width: 350,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "fade", duration: 500 },
    open: function (event, ui) {
      var ntitulo = "Imprime Boleta";
      $("span.ui-dialog-title").css("font-size", 12);
      $("span.ui-dialog-title").text(ntitulo);
      fnRecueperaUltimaBoleta();
    },
    close: function (event, ui) {
      $("#boleta_nombres").val("");
      $("#boleta_destino").val("");
      $("#boleta_describe").val("");
      $("#boleta_cargo").val("");
      $("#boleta_nro").val("");
      $("#boleta_numeroletras").val("");
    },
  });

  $("#dialogo_cliente").dialog({
    autoOpen: false,
    resizable: true,
    modal: true,
    height: 270,
    width: 330,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "fade", duration: 500 },
    open: function (event, ui) {
      var ntitulo = "Editar datos de Cliente";
      $("span.ui-dialog-title").css("font-size", 12);
      $("span.ui-dialog-title").text(ntitulo);
      fnDeshabilitaCamposCliente();
      $("#btn_cliente_editar").attr("disabled", false);
      $("#btn_cliente_nuevo").attr("disabled", false);
      $("#div_MasDatosCliente").css("display", "none");
    },
    close: function (event, ui) {
      fnLimpiaCamposClientes();
    },
  });

  $("#dialogo_voucher").dialog({
    autoOpen: false,
    resizable: true,
    modal: false,
    height: 400,
    width: 500,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "fade", duration: 500 },
    open: function (event, ui) {
      var ntitulo = "Voucher Disponibles";
      $("span.ui-dialog-title").css("font-size", 12);
      $("span.ui-dialog-title").text(ntitulo);
      fnCargaVoucher();
    },
    close: function (event, ui) {},
  });

  $("#dialogo_voucher_img").dialog({
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

  $("#listaporcentajes").blur(function () {
    $("#listaporcentajes").prop("selectedIndex", 0);
  });

  $(window).resize(function () {
    $("#TRecibidos").dataTable().fnDestroy();
    var objDataTable = $("#TRecibidos").dataTable({
      fnDrawCallback: function (oSettings) {
        // Need to redo the counters if filtered or sorted
        if (oSettings.bSorted || oSettings.bFiltered) {
          for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
            $("td:eq(0)", oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(
              i + 1
            );
          }
        }
      },
      aoColumnDefs: [{ bSortable: false, aTargets: [0] }],
      sScrollY: $(window).height() - 300,
      bPaginate: false,
      bLengthChange: false,
      bFilter: false,
      bSort: true,
      bInfo: false,
      bAutoWidth: true,
      bSortClasses: false, //, "bJQueryUI": true
    });
    objDataTable.fnSettings().oScroll.sY = 301;
    objDataTable.fnDraw();
  });

$("#btn_anular").click(function () {
  fnAnulaMovsRecepcion();
  });

 $("#btn_editacuenta").click(function () {
    $("#div_nrocuenta_edit .input-group-btn").show();
    $("#nrocuenta_edit").css("display", "block");
   /*  fnEditaCuenta(); */
  });

$("#btn_update_cuenta").click(function () {
   fnEditaCuenta();
  });

  $("#btn_editacuenta").attr("disabled", true);
  $("#div_nrocuenta_edit .input-group-btn").hide();

$('#fono_cliente').on('input', function () { 
    // Reemplaza cualquier carácter que no sea un número por nada
    this.value = this.value.replace(/[^0-9]/g, '');
});
$('#nrocuenta_edit').on('input', function () { 
    // Reemplaza cualquier carácter que no sea un número por nada
    this.value = this.value.replace(/[^0-9]/g, '');
});
  
$("#btn_yape").click(function () {
  MuestraModalYape();
  });

$("#btn_yape").attr("disabled", true);
  MuestraRecibidos($("#fechahoy").val(), $("#optbuscar").val());
});
/* ============ DOCUEMENT================================================ */
function fnFechaHoraActual() {
  // Convierte a formato MySql
  var currentdate = new Date();
  var datetime =
    currentdate.getFullYear() +
    "-" +
    strpad00(currentdate.getMonth() + 1) +
    "-" +
    strpad00(currentdate.getDate()) +
    " " +
    currentdate.toLocaleTimeString();
  $("#fechahorahoy").val(datetime);
}

function strpad00(s) {
  s = s + "";
  if (s.length === 1) s = "0" + s;
  return s;
}

function fnVerificaFecha() {
  var fecha1 = $("#fecha_r").val();
  var fecha2 = $("#fechahoy").val();
  if (Date.parse(fecha1) > Date.parse(fecha2)) {
    $("#fecha_r").val($("#fechahoy").val());
  } else {
    $("#TRecibidos").dataTable().fnDestroy();
    MuestraRecibidos($("#fecha_r").val(), $("#optbuscar").val());
    $("#cuentas").css("display", "block");
  }
}

function fnAddZeros(num) {
  if (num < 10000 && num > 999) {
    num = "00" + num;
  } else if (num < 1000 && num > 99) {
    num = "000" + num;
  } else if (num < 100 && num > 9) {
    num = "0000" + num;
  } else if (num < 10) {
    num = "00000" + num;
  } else if (num < 100000 && num > 9999) {
    num = "0" + num;
  }
  return num;
}

$(function () {
  //Para escribir solo letras
  $("#dnir").validacampos("1234567890abcdefghijklmnñopqrstuvwxyz");
  $("#dnib").validacampos("1234567890abcdefghijklmnñopqrstuvwxyz");
  $("#codsucub").validacampos("1234567890abcdefghijklmnñopqrstuvwxyz");
  $("#buscador").validacampos("1234567890abcdefghijklmnñopqrstuvwxyz");
  //Para escribir solo numeros
  $("#importe_r").validacampos(".0123456789");
  $("#cargo_r").validacampos(".0123456789");
  /*$('#itf_r').validacampos('0123456789');*/
  $("#otros_r").validacampos(".0123456789");
  $("#efectivo_r").validacampos(".0123456789");
  $("#boleta_nro").validacampos(".0123456789");
  $("#boleta_serie").validacampos("0123456789");
  $("#boleta_cargo").validacampos(".0123456789");
  $("#boleta_cargo").validacampos(".0123456789");
  $("#dni_cliente").validacampos("1234567890abcdefghijklmnñopqrstuvwxyz");
});

function LimpiaCampos() {
  $("#dnir").val("");
  $("#dnib").val("");
  $("#nombresb").val("");
  $("#nombresr").val("");
  $("#destino").val("");
  $("#ciudaddestino").val("");
  $("#observa").val("");
  $("#cuentas").val("");
  $("#importe_r").val("0");
  $("#cargo_r").val("0");
  //$("#igv_r").val("0");
  $("#otros_r").val("0");
  $("#total_r").val("0");
  $("#listaporcentajes").prop("selectedIndex", 0);
  $("#efectivo_r").val("0");
  $("#vuelto_r").val("0");

  $("#codsucursald").val("");
  $("#idclienteb").val("");
  $("#idclienter").val("");
}

function HabilitaControles() {
  $("#dnir").attr("disabled", false);
  $("#dnib").attr("disabled", false);
  $("#destino").attr("disabled", false);
  $("#ciudaddestino").attr("disabled", false);
  $("#observa").attr("disabled", false);
  $("#importe_r").attr("disabled", false);
  $("#cargo_r").attr("disabled", false);
  $("#otros_r").attr("disabled", false);
  $("#total_r").attr("disabled", false);
  $("#listaporcentajes").attr("disabled", false);

  $("#busca_beneficiario").attr("disabled", false);
  $("#busca_remitente").attr("disabled", false);
  $("#busca_sucursal").attr("disabled", false);
  $("#busca_cuentas").attr("disabled", false);
}

function DeshabilitaControles() {
  $("#dnir").attr("disabled", true);
  $("#dnib").attr("disabled", true);
  $("#destino").attr("disabled", true);
  $("#ciudaddestino").attr("disabled", true);
  $("#observa").attr("disabled", true);
  $("#importe_r").attr("disabled", true);
  $("#cargo_r").attr("disabled", true);
  $("#otros_r").attr("disabled", true);
  $("#total_r").attr("disabled", true);
  $("#listaporcentajes").attr("disabled", true);

  $("#busca_beneficiario").attr("disabled", true);
  $("#busca_remitente").attr("disabled", true);
  $("#busca_sucursal").attr("disabled", true);
  $("#busca_cuentas").attr("disabled", true);
}

function ControlesAlGuardar() {
  DeshabilitaControles();

  $("#btn_nuevo").attr("disabled", false);
  $("#btn_guardar").attr("disabled", true);
  $("#btn_anular").attr("disabled", true);
  $("#imprimir_r").attr("disabled", true);
  $("#btn_masdatos").attr("disabled", true);
  $("#btn_yape").attr("disabled", true);

}

function ControlesAlCancelar() {
  LimpiaCampos();
  DeshabilitaControles();

  $("#btn_nuevo").attr("disabled", false);
  $("#btn_guardar").attr("disabled", true);
  $("#btn_anular").attr("disabled", true);
  $("#imprimir_r").attr("disabled", true);
  $("#btn_masdatos").attr("disabled", true);

 
}

function ControlesNuevo() {
  LimpiaCampos();
  HabilitaControles();

  $("#btn_nuevo").attr("disabled", true);
  $("#btn_guardar").attr("disabled", false);
  $("#btn_anular").attr("disabled", true);
  $("#imprimir_r").attr("disabled", true);
  $("#btn_masdatos").attr("disabled", true);
  $("#btn_yape").attr("disabled", false);
}

function ControlesAlEditar() {
  $("#dnir").attr("disabled", false);
  $("#dnib").attr("disabled", false);
  $("#destino").attr("disabled", false);

  $("#busca_beneficiario").attr("disabled", false);
  $("#busca_remitente").attr("disabled", false);
  $("#busca_sucursal").attr("disabled", false);
  $("#busca_cuentas").attr("disabled", false);
}

function ResizeDivs() {
  $(function () {
    var window_height = $(window).height(),
      content_height = window_height - 235;

    $(".mygrid-wrapper-div").height(content_height);
  });

  $(window).resize(function () {
    var window_height = $(window).height(),
      content_height = window_height - 230;
    $(".mygrid-wrapper-div").height(content_height);
  });

  //    $(function () {
  //        var window_width = $("#divrecepcion").width();
  //
  //        $('#divclone').width(window_width);
  //        alert($('#divclone').width());
  //    });
  //
}

function ResizeDivB() {
  var dialog_altura = $("#dialogo_buscaclib").height();
  $(".mygrid-wrapper-divb").height(dialog_altura - 40);
}

function ResizeDivR() {
  var dialog_altura = $("#dialogo_buscaclir").height();
  $(".mygrid-wrapper-divr").height(dialog_altura - 40);
}

function ResizeDivS() {
  var dialog_altura = $("#dialogo_buscasucu").height();
  $(".mygrid-wrapper-divs").height(dialog_altura - 40);
}

function ResizeDivCta() {
  var dialog_altura = $("#dialogo_asigcuenta").height();
  $(".mygrid-wrapper-divcta").height(dialog_altura - 40);
}

function ResizeDivBan() {
  var dialog_altura = $("#dialogo_asigcuenta").height();
  $(".mygrid-wrapper-divban").height(dialog_altura - 120);
}

function FnGuardaEdicion() {
  $.ajax({
    async: true,
    type: "POST",
    cache: false,
    dataType: "json",
    data: {
      opt: "EDITACAB",
      idgiro: $("#correlativo").val(),
      dnib: $("#dnib").val(),
      dnir: $("#dnir").val(),
      codsucursald: $("#codsucursald").val(),
      nrocuenta: $("#cuentas").val(),
      nick: $("#nick").val(),
    },
    url: "controles/ManteRecibidos.php",
  }).done(function (respuesta) {
    var codigo = respuesta[0].cod_girosucu;
    var mensaje = respuesta[0].data_edita;
    $("#TRecibidos").dataTable().fnDestroy();
    MuestraRecibidos($("#fechahoy").val(), $("#optbuscar").val());
    jMessage(
      "Transaccion modificada: " + codigo + " por:" + mensaje,
      "Giros - Transferencias"
    );
  });
}

function fnLimpiaTablaClientes() {
  var html;
  html += "<tr>";
  html += "<td ></td>";
  html += "<td ></td>";
  html += "<td > </td>";
  html += "</tr>";
  $("#resultado_b").html(html);
  $("#resultado_r").html(html);
}

function fnLimpiaCuentas() {
  var html;
  html += "<tr>";
  html += "<td ></td>";
  html += "<td ></td>";
  html += "<td > </td>";
  html += "</tr>";
  $("#tbody_cuentascliente").html(html);
}

function fnLimpiaBancos() {
  var html;
  html += "<tr>";
  html += "<td ></td>";
  html += "<td ></td>";
  html += "<td ></td>";
  html += "<td > </td>";
  html += "</tr>";
  $("#tbody_banco").html(html);
}

function fnLimpiaSucursales() {
  var html;
  html += "<tr>";
  html += "<td ></td>";
  html += "<td ></td>";
  html += "</tr>";
  $("#resultado_s").html(html);
}

function fnGuardarBoleta() {
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {
      opt: "BOLETA",
      serie: $("#boleta_serie").val().trim(),
      nro: $("#boleta_nro").val().trim(),
      codsucu: $("#codsucursal").val().trim(),
      dni: $("#dnir").val().trim(),
      direccion: $("#boleta_destino").val(),
      descripcion: $("#boleta_describe").val(),
      fecha: $("#boleta_fecha").val(),
      importe: $("#boleta_cargo").val(),
      userprint: $("#nick").val(),
      idgiro: $("#correlativo").val(),
      idempresa: $("#codsucursal").val(),
    },
    url: "controles/ManteRecibidos.php",
    beforeSend: function (objeto) {
      $("#carga").css({ display: "block" });
    },
    complete: function () {
      $("#carga").css("display", "none");
    },
  }).done(function (respuesta) {
    var nro = respuesta[0].nro;
    var nombres = respuesta[0].nombres;
    var fecha = respuesta[0].fechahora_crea;
    var user = respuesta[0].usuaimprime;
    if (nro !== "---" && nombres !== "---") {
      $.alert({
        content: "url:text.txt",
        title: "Nro de Boleta ya Existe",
        contentLoaded: function (data, status, xhr) {
          var self = this;
          self.setContent(
            "Numero : " +
              nro +
              "<br>" +
              "pertenece a :" +
              nombres +
              "<br>" +
              "Impreso el :" +
              fecha +
              "<br>" +
              "Por :" +
              user
          );
        },
      });
    } else {
      $("#dialogo_boleta").dialog("close");
      fnImprimeBoleta(
        $("#boleta_serie").val().trim(),
        $("#boleta_nro").val().trim(),
        $("#codsucursal").val().trim(),
        $("#boleta_numeroletras").val().trim()
      );
    }
  });
}

function fnLimpiaCamposClientes() {
  //$("#id_cliente").val("");
  $("#dni_cliente").val("");
  $("#nom_cliente").val("");
  $("#apel_cliente").val("");
  $("#dir_cliente").val("");
  $("#fono_cliente").val("");
  $("#email_cliente").val("");
}

function fnDeshabilitaCamposCliente() {
  $("#dni_cliente").attr("disabled", true);
  $("#nom_cliente").attr("disabled", true);
  $("#apel_cliente").attr("disabled", true);
  $("#dir_cliente").attr("disabled", true);
  $("#fono_cliente").attr("disabled", true);
  $("#email_cliente").attr("disabled", true);
  $("#btn_cliente_guardar").attr("disabled", true);
  $("#btn_cliente_editar").attr("disabled", true);
}

function fnHabilitaCamposCliente() {
  $("#dni_cliente").attr("disabled", false);
  $("#nom_cliente").attr("disabled", false);
  $("#apel_cliente").attr("disabled", false);
  $("#dir_cliente").attr("disabled", false);
  $("#fono_cliente").attr("disabled", false);
  $("#email_cliente").attr("disabled", false);
  $("#btn_cliente_guardar").attr("disabled", false);
  $("#btn_cliente_editar").attr("disabled", false);
}

function fnInsertaCliente() {
  $.ajax({
    async: true,
    type: "POST",
    data: {
      opcion: "INSERTA",
      dniruc: $("#dni_cliente").val().trim(),
      apelrazon: $("#apel_cliente").val().trim(),
      nombre: $("#nom_cliente").val().trim(),
      direccion: $("#dir_cliente").val(),
      fono: $("#fono_cliente").val(),
      email: $("#email_cliente").val(),
      usuamodi: $("#nick").val(),
    },
    url: "controles/ManteClientes.php",
    beforeSend: function (objeto) {
      $("#carga").css({ display: "block" });
    },
    complete: function () {
      $("#carga").css("display", "none");
    },
  }).done(function (json) {
    json = $.parseJSON(json);
    rpta = json[0].flag;
    if (rpta === "0") {
      $("#dialogo_cliente").dialog("close");
      fnMuestraClienteUpdateSave();
      $("#id_cliente").val("");
      $("#span_idcliente").val("");
      $("#div_MasDatosCliente").css("display", "none");
      fnLimpiaCamposClientes();
    }
    if (rpta === "1") {
      jWarning("DNI ya EXISTE, Verifique...", "Giros - Transferencias");
    }
    if (rpta === "2") {
      jWarning("CLIENTE ya EXISTE, Verifique...", "Giros - Transferencias");
    }
  });
}

function fnEditaCliente() {
  $.ajax({
    async: true,
    type: "POST",
    data: {
      opcion: "EDITA",
      idcliente: $("#id_cliente").val(),
      dniruc: $("#dni_cliente").val().trim(),
      nombre: $("#nom_cliente").val().trim(),
      apelrazon: $("#apel_cliente").val().trim(),
      telefono: $("#fono_cliente").val(),
      usuamodi: $("#nick").val(),
    },
    url: "controles/ManteClientes.php",
    beforeSend: function (objeto) {
      $("#carga").css({ display: "block" });
    },
    complete: function () {
      $("#carga").css("display", "none");
    },
  }).done(function (json) {
    json = $.parseJSON(json);
    rpta = json[0].flag;
    if (rpta === "0") {
      $("#dialogo_cliente").dialog("close");
      fnMuestraClienteUpdateSave();
      $("#id_cliente").val("");
      $("#span_idcliente").val("");
      $("#div_MasDatosCliente").css("display", "none");
      fnLimpiaCamposClientes();
    }
    if (rpta === "1") {
      jWarning("DNI ya EXISTE, Verifique...", "Giros - Transferencias");
    }
  });
}

function fnMuestraClienteUpdateSave() {
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: { valor: $("#dni_cliente").val(), op: "D", opt: "BC" },
    url: "controles/ManteRecibidos.php",
    success: CreaTablaB,
  });
  ResizeDivB();
  return false;
}

function fnActualizaCliente() {
  $.ajax({
    async: true,
    type: "POST",
    data: {
      opcion: "ACTUALIZATODO",
      id: $("#id_cliente").val(),
      dniruc: $("#dni_cliente").val(),
      apelrazon: $("#apel_cliente").val(),
      nombre: $("#nom_cliente").val(),
      direccion: $("#dir_cliente").val(),
      fono: $("#fono_cliente").val(),
      email: $("#email_cliente").val(),
      usuamodi: $("#nick").val(),
    },
    url: "controles/ManteClientes.php",
    beforeSend: function (objeto) {
      $("#carga").css({ display: "block" });
    },
    complete: function () {
      $("#carga").css("display", "none");
    },
  }).done(function (json) {
    fnMuestraClienteUpdateSave();
    $("#id_cliente").val("");
    $("#span_idcliente").val("");
  });
}

function fnInserta_Otros_en_Transaccion(otro, nrocuenta, id_giro) {
  $.ajax({
    type: "POST",
    data: {
      opt: "Inserta_Otros_en_Transaccion",
      nrocuenta: nrocuenta,
      monto: otro,
      idgiro: id_giro,
    },
    url: "controles/ManteRecibidos.php",
  }).done(function (msg) {});
}

function fnCargaVoucher() {
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {
      opt: "VOUCHER",
      correlativo: "XXX",
      codgirosucu: $("#codsucursal").val(),
      fechai: $("#fecha_r").val(),
      fechaf: $("#fecha_r").val(),
      usuariocarga: $("#nick").val(),
      descripcion: "XXX",
      usuarioimprime: "XXX",
      op: "L",
    },
    url: "controles/ManteRecibidos.php",
  }).done(function (json) {
    fnMuestraVoucher(json);
  });
}

function fnMuestraVoucher(jsonrecibe) {
  var html;
  for (var i = 0; i < jsonrecibe.length; i++) {
    html +=
      "<tr id='V[" + i + "]' class='dato' onclick='RecuperaFilaV(this.id);'>";
    html += "<td class='oculto'>" + jsonrecibe[i].idvoucher + "</td>";
    html += "<td class='oculto'>" + jsonrecibe[i].correlativo + "</td>";
    html +=
      "<td <a style='cursor:pointer'> " +
      jsonrecibe[i].codgirosucu +
      "</a> </td>";
    html += "<td >" + jsonrecibe[i].observacion + "</td>";
    html += "<td >" + jsonrecibe[i].fechahora_carga + "</td>";
    html += "<td class='oculto'>" + jsonrecibe[i].usuario_carga + "</td>";
    html += "<td >" + jsonrecibe[i].usuario_imprime + "</td>";
    html += "<td >" + jsonrecibe[i].fechahora_imprime + "</td>";
    html += "</tr>";
  }
  $("#tbody_voucher").html(html);
  $("#TVoucher").dataTable({
    sScrollY: 240,
    bPaginate: false,
    bLengthChange: false,
    bFilter: false,
    ordering: false,
    bInfo: false,
    bAutoWidth: true,
    bSortClasses: false,
    destroy: true, //, "bJQueryUI": true
  });
}

function cambiaImagen(codigo) {
  console.log(codigo);
  $("#dialogo_voucher_img").dialog("open");
  var valor = "php/uploads/" + codigo + ".jpg";
  $("#dialogo_voucher_img img").attr("src", valor);
}

function RecuperaFilaV(idfilaV) {
  var idfilac = $("#sele_v").val();
  var elTableRow = document.getElementById(idfilaV);
  var elTableRow1 = document.getElementById(idfilac);
  elTableRow.style.backgroundColor =
    elTableRow.style.backgroundColor === "LightSkyBlue"
      ? "white"
      : "LightSkyBlue";
  if (idfilac !== idfilaV) {
    elTableRow1.style.backgroundColor =
      elTableRow.style.backgroundColor === "white" ? "LightSkyBlue" : "white";
  }
  var elTableCells = elTableRow.getElementsByTagName("td");
  $("#correlativo_v").val(elTableCells[1].innerHTML);
  $("#codigovoucher").val(elTableCells[2].innerHTML);
  cambiaImagen($("#codigovoucher").val().trim());
}

function VerificaImprimir() {
  var usuario = $("#tipousuario").val();
  var fecha_elegida = $("#fecha_r").val();
  var fecha_php = $("#fechahoy").val();
  var rpta;
  if (Date.parse(fecha_elegida) < Date.parse(fecha_php)) {
    if ($("#anulado").val() === "N") {
      if (usuario === "ADMIN") {
        rpta = "SI";
      }
      if (usuario === "OPERADOR") {
        rpta = "NO";
      }
    } else {
      rpta = "NO";
    }
  }
  if (Date.parse(fecha_elegida) === Date.parse(fecha_php)) {
    if ($("#anulado").val() === "N") {
      if (usuario === "ADMIN") {
        rpta = "SI";
      }
      if (usuario === "OPERADOR") {
        rpta = "SI";
      }
    } else {
      rpta = "NO";
    }
  }

  return rpta;
}

function fnRegistraImpresionVoucher() {
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {
      opt: "VOUCHER",
      correlativo: $("#correlativo_v").val(),
      codgirosucu: "XXX",
      fechai: "XXX",
      fechaf: "XXX",
      usuariocarga: "XXX",
      descripcion: "XXX",
      usuarioimprime: $("#nick").val(),
      op: "A",
    },
    url: "controles/ManteRecibidos.php",
  }).done(function (json) {
    jAlert("Impresooooo");
  });
  console.log($("#correlativo_v").val());
}

function fnImprimeBoleta(serie_doc, numero_doc, cod_sucu, numeroletras) {
  window.open(
    "reportes/rptBoleta.php?serie=" +
      serie_doc +
      "&numero=" +
      numero_doc +
      "&codsucu=" +
      cod_sucu +
      "&numero_letras=" +
      numeroletras,
    "_blank"
  );
}

function fnRecueperaUltimaBoleta() {
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {
      opt: "ULTIMABOLETA",
      codsucu: $("#codsucursal").val(),
      nomdoc: "BOLETA",
      idempresa: $("#codsucursal").val(),
    },
    url: "controles/ManteRecibidos.php",
  }).done(function (json) {
    var serie = json[0].serie;
    var ultimo = json[0].ultimo;
    ultimo = fnAddZeros(ultimo);
    $("#boleta_serie").val(serie);
    $("#boleta_nro").val(ultimo);
  });
}

function PromptEvaluaCodigo() {
  jPrompt("Ingrese Codigo de anulacion" + "\n", " ", " Money Flash", function (r) {
    if (r) {
      fnEvaluaCodigoAcreditado(r);
    } else {
      jAlert("Digita Codigo...", " Money Flash");
    }
  });
}

function fnEvaluaCodigoAcreditado(cod_a_evaluar) {
var cod_valido=0;
$("#txt_cod_acreditado").val(cod_a_evaluar)
  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: {opt: "COD_ACREDITA", nusuario: $("#nick").val(), codsucu: $("#codsucursal").val(), codacredita: cod_a_evaluar, opcion: "B"},
    url: "controles/ManteRecibidos.php"
  }).done(function (respuesta) {
    cod_valido = respuesta[0].codigo;
    if (cod_valido === "1"){      
      fnConfirmaAnulaRecibidos(); 
    } else {
        jAlert("Codigo___: " + respuesta[0].mensaje,"Giros - Transferencias");
        /*console.log($("#txt_cod_acreditado").val())*/
      }
  });
}

function fnActualizaCodAcreditado() {
  $.ajax({
    async: true, type: "POST", dataType: "json", cache: false,
    data: {opt: "COD_ACTUALIZA", nusuario: $("#nick").val(), codsucu: $("#codsucursal").val(), codacredita: $("#txt_cod_acreditado").val(), opcion: "U"},
    url: "controles/ManteRecibidos.php"
  }).done(function (json) {
    /*cod_valido = json[0].codigo;
    $("#txt_cod_a_evaluar").val(json[1].mensaje);
    if ( cod_valido === 1 ){
     fnActualizaCodAcreditado()
    }
    */
  });
}

async function fnAnulaMovsRecepcion() {
try {
  var fecha_servidor = await FechaServidor();
  var fecha_seleccionada = $("#fecha_seleccionada").val().substr(0, 10);
  console.log("servidor:",fecha_servidor);
  console.log("fecha_seleccionada:", fecha_seleccionada);
  if (fecha_servidor !== fecha_seleccionada) {
    $.alert({title: 'Solo fecha Actual', content: 'Money-Flash', type: 'red', typeAnimated: true});
    return;
  }

var verifica_codigo=0;
/* ======================================================== */
$.confirm({
    title: $("#nick").val(),
    content: '<div class="form-group">' +
    "<label>" + $("#nick").val() + "</label>" +
    '<input id="motivo_anulacion" type="text" placeholder=" Motivo de anulación" class="name form-control" autocomplete="off" required />' +
    '<input id="codigo_anulacion" type="password" placeholder=" Codigo de anulación" class="name form-control" autocomplete="new-password" required />' +
    "</div>",
    type: 'red',
    buttons: {
        aceptar: {text: 'aceptar', btnClass: 'btn-red',
            action: async function(){
              if ($("#motivo_anulacion").val().trim() !== "" && $("#codigo_anulacion").val().trim() !== "") {
                /* console.log($("#motivo_anulacion").val().trim()); */
              verifica_codigo =  await VerificaCodigo($("#codigo_anulacion").val().trim());
              /* console.log(verifica_codigo); */
              if (verifica_codigo > 0) {
                  fnAnulaRecibidos($("#motivo_anulacion").val());
                  $.alert({title: 'Anulación Exitosa', content: 'Money-Flash', type: 'green'});
              } else { $.alert({title: 'Codigo Invalido', content: 'Money-Flash', type: 'red'});}
            } else { $.alert({title: 'MOTIVO o CODIGO de  Anulación Requerido', content: 'Money-Flash', type: 'red'}); }
            }
        },
        close: function () { $.alert("Cacelado...");
        }
    }
});

} catch (error) { console.error("Error obteniendo la fecha del servidor:", error);}

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

function VerificaCodigo(codigo_evaluar) {
  var codigo_anulacion = codigo_evaluar;
  var usuario_sis = $("#nick").val();
  var cod_sucu = $("#codsucursal").val();
  var rpta;
   return new Promise((resolve, reject) => { 
    $.ajax({async: true, type: "POST", dataType: "json", cache: false,
      data: { opt: "GCA", codigo: codigo_anulacion, usuario: usuario_sis, codsucu: cod_sucu, opcion: "I" },
      url: "controles/ManteInicio.php",
      beforeSend: function (objeto) { $("#overlay_pass").show(); },
      complete: function (objeto) { $("#overlay_pass").hide(); },
    }).done(function (respuesta) {
      resolve(respuesta[0].codigo);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        reject(errorThrown);
    });
  }); 
}

function fnEditaCuenta(){
const idcliente = $("#idcliente").val();
const idcuenta = $("#txt_idcuenta").val();
const nrocuenta = $("#nrocuenta_edit").val().trim();
     $.confirm({
      title: "Editar Cuenta",
      content: 'Esta seguro de editar el nro de cuenta?' + "<br><br>" + "Nro Cuenta: " + nrocuenta,
      type: 'red',
      buttons: {
        aceptar: {
          text: 'aceptar', btnClass: 'btn-red',
          action: async function () {
            
            switch (true) {
              case nrocuenta === "":
                $.alert({ title: 'Escriba nro cuenta editar', content: 'Money-Flash', type: 'red' });
                return false;
              case !/^\d+$/.test(nrocuenta):
                $.alert({ title: 'Solo se permiten números', content: 'Money-Flash', type: 'red' });
                return false;
              case nrocuenta.length < 10:
                $.alert({ title: 'Mínimo 10 dígitos requeridos', content: 'Money-Flash', type: 'red' });
                return false;
              case nrocuenta.length >= 21:
                $.alert({ title: 'Máximo 21 dígitos permitidos', content: 'Money-Flash', type: 'red' });
                return false;
              default:
                 const verifica_res = await UpdateCuenta( idcliente, idcuenta, nrocuenta);
                if (verifica_res.codigo > 0) {
                  fnCreaTablaClienteCuentas;
                    $.alert({title: 'Edición Exitosa', content: 'Money-Flash', type: 'green'});
                    $("#dialogo_asigcuenta").dialog("close");
                } else {
                  const msg = (verifica_res && verifica_res.mensaje) ? verifica_res.mensaje : 'Contraseña Incorrecta';
                  $.alert({ title: msg, content: 'Money-Flash', type: 'red' });
                }
            }
          }
        },
        Cancelar: function () {
          $.alert({ title: 'Cancelado...', content: 'Money-Flash', type: 'red' });
        }
      }
    });

}

function UpdateCuenta( p_idcliente, p_idcuenta, p_nrocuenta) {
   return new Promise((resolve, reject) => { 
    $.ajax({async: true, type: "POST", dataType: "json", cache: false,
      data: { opt: "ListaCuentaCliente", idcliente: p_idcliente, idcuenta: p_idcuenta, nrocuenta: p_nrocuenta, opcion: "U" },
      url: "controles/ManteRecibidos.php",
      beforeSend: function (objeto) { $("#overlay_pass").show(); },
      complete: function (objeto) { $("#overlay_pass").hide(); },
    }).done(function (respuesta) {
      resolve({ codigo: respuesta[0].id_cuenta, mensaje: respuesta[0].nrocuenta || '' });
      fnCreaTablaClienteCuentas;
    }).fail(function (jqXHR, textStatus, errorThrown) {
        reject(errorThrown);
    });
  }); 
}

// Devuelve el HTML del modal Yape utilizado para buscar y registrar usuarios por número o DNI.
function getYapeModalContent() {
  return `
      <form>
        <div class="input-group">
          <input type="text" id="telefono_yape_buscar" oninput="celular_yape.value = this.value" onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="9" class="form-control" placeholder="Nro. de Yape" >
            <span class="input-group-btn">
              <a href="#" id="btn_busca_yape" class="btn btn-default glyphicon glyphicon-search blue"></a>
            </span>
        </div>

        <div id="campos" style="display:none; margin-top:10px;">
            <div class="input-group input-group-sm ">
              <span class="input-group-addon">D.N.I.</span>
              <input type="text" id="dni_yape" placeholder="DNI" maxlength="8" class="form-control" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
               <span class="input-group-btn">
              <a href="#" id="btn_busca_dni" class="btn btn-default glyphicon glyphicon-search blue"></a>
              </span>
            </div>
            <div class="input-group input-group-sm ">
              <span class="input-group-addon">Nombres</span>
              <input type="text" id="nombres_yape" placeholder="Nombres de Beneficiario" maxlength="50" class="form-control" >
            </div>
            <div class="input-group input-group-sm ">
              <span class="input-group-addon">Apellidos</span>
              <input type="text" id="apellidos_yape" placeholder="Apellidos de Beneficiario" maxlength="100" class="form-control" >
            </div>
            <div class="input-group input-group-sm ">
              <span class="input-group-addon">Nro Yape</span>
              <input type="text" id="celular_yape" placeholder="Número de Yape" value="" class="form-control" readonly>
            </div>           
       </div>

      <div id="msg"></div>
      <div id="msg1"></div>
      </form>
        `;
}

// Valida que el número de Yape tenga exactamente 9 dígitos.
function isValidYapePhone(phone) {
  return phone && phone.length === 9;
}

// Valida que el DNI tenga exactamente 8 dígitos.
function isValidYapeDni(dni) {
  return dni && dni.length === 8;
}

// Lanza la petición AJAX para buscar un usuario Yape por número de teléfono.
function searchYapeByPhone(phone) {
  return $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    url: "controles/ManteRecibidos.php",
    data: { opt: "BuscaNroYape", valor: phone, op: "T" },
    beforeSend: function (objeto) { $("#overlay_pass").show(); },
    complete: function (objeto) { $("#overlay_pass").hide(); },
  });
}

// Lanza la petición AJAX para buscar un usuario Yape por DNI.
function searchYapeByDni(dni) {
  return $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    url: "controles/ManteRecibidos.php",
    data: { opt: "BuscaNroYape", valor: dni, op: "D" },
    beforeSend: function (objeto) { $("#overlay_pass").show(); },
    complete: function (objeto) { $("#overlay_pass").hide(); },
  });
}

// Envía los datos de un nuevo cliente Yape al servidor para su creación.
function saveYapeClient(datos) {
  return $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    url: "controles/ManteClientes.php",
    data: datos,
    beforeSend: function (objeto) { $("#overlay_pass").show(); },
    complete: function (objeto) { $("#overlay_pass").hide(); },
  });
}

// Actualiza los campos del modal según la respuesta de búsqueda por teléfono.
function updateYapeFieldsFromPhone(resp, jc) {
  var campos = jc.$content.find("#campos");
  if (resp[0].idcliente > 0) {
    jc.$content
      .find("#msg")
      .html('<span style="color:green;">Encontrado</span>');
    $("#idclienteb").val(resp[0].idcliente);
    $("#dnib").val(resp[0].dni_ruc);
    $("#nombresb").val(resp[0].apel_razon + " " + resp[0].nombres);
    $("#cuentasb").val(resp[0].nrocuenta);
    campos.slideUp();
    $("#nombres_yape, #apellidos_yape").val("");
    jc.buttons.guardar.hide();
    $(".jconfirm").remove();
  } else {
    campos.slideDown();
    jc.$content
      .find("#msg")
      .html('<span style="color:orange;">Nuevo registro</span>');
    $("#nombres_yape, #apellidos_yape").val("");
    jc.buttons.guardar.show();
  }
}

// Actualiza los campos del modal según la respuesta de búsqueda por DNI.
function updateYapeFieldsFromDni(resp, jc) {
  if (resp[0].idcliente === "-") {
    $("#nombres_yape, #apellidos_yape").val("");
    jc.$content
      .find("#msg1")
      .html('<span style="color:red;">DNI NO Encontrado</span>');
    // Restaurar texto del botón a su estado original si existe
    if (jc && jc.$box) {
      var btn = jc.$box.find('.jconfirm-buttons button').filter(function() { return $(this).text().trim() === 'Agregar Nro Yape' || $(this).text().trim() === 'Guardar'; });
      if (btn.length) btn.text('Guardar');
    }
  } else {
    jc.$content
      .find("#msg1")
      .html('<span style="color:green;">DNI Encontrado</span>');
    $("#nombres_yape").val(resp[0].nombres);
    $("#apellidos_yape").val(resp[0].apel_razon);
    $("#cuentasb").val(resp[0].nrocuenta);
    $("#nombres_yape").prop("readonly", true);
    $("#apellidos_yape").prop("readonly", true);
    // Cambiar texto del botón guardar a "Agregar Nro Yape" para indicar acción específica
    if (jc && jc.$box) {
      var btn = jc.$box.find('.jconfirm-buttons button').filter(function() { return $(this).text().trim() === 'Guardar' || $(this).text().trim() === 'Agregar Nro Yape'; });
      if (btn.length) btn.text('Agregar Nro Yape');
    }
  }
}

// Asocia los eventos del modal Yape: búsqueda, validación y capturas de teclado.
function bindYapeModalEvents(jc) {
  function buscar() {
    var telefono = jc.$content.find("#telefono_yape_buscar").val();
    if (!isValidYapePhone(telefono)) {
      $.alert({ title: 'Número de Yape debe tener 9 dígitos', content: 'Money-Flash', type: 'red' });
      return;
    }

    var btn = jc.$content.find("#btn_busca_yape");
    btn.prop("disabled", true);
    jc.$content.find("#msg").html("Buscando...");

    searchYapeByPhone(telefono).done(function (resp) {
      updateYapeFieldsFromPhone(resp, jc);
    }).always(function () {
      btn.prop("disabled", false);
    });
  }

  function buscardni() {
    var dni = jc.$content.find("#dni_yape").val();
    if (!isValidYapeDni(dni)) {
      $.alert({ title: 'DNI debe tener 8 dígitos', content: 'Money-Flash', type: 'red' });
      return;
    }

    var btn_dni = jc.$content.find("#btn_busca_dni");
    btn_dni.prop("disabled", true);
    jc.$content.find("#msg1").html("Buscando DNI...");

    searchYapeByDni(dni).done(function (resp) {
      updateYapeFieldsFromDni(resp, jc);
    }).always(function () {
      btn_dni.prop("disabled", false);
    });
  }

  jc.$content.find("#nombres_yape, #apellidos_yape, #dni_yape").on("input", function () {
    var texto = $(this).val();
    texto = texto.replace(/[^a-zA-Z0-9 ]/g, "");
    texto = texto.replace(/^\s+/, "");
    texto = texto.replace(/\s{2,}/g, " ");
    $(this).val(texto);
  });

  jc.$content.find("#btn_busca_yape").on("click", buscar);
  jc.$content.find("#btn_busca_dni").on("click", buscardni);

  jc.$content.find("#telefono_yape_buscar").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
      buscar();
    }
  });

  jc.$content.find("#dni_yape").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
      buscardni();
    }
  });
}

// Construye la configuración de botones del modal Yape, incluyendo el guardado del nuevo registro.
function getYapeModalButtons() {
  return {
    guardar: {
      text: "Guardar",
      btnClass: "btn-green",
      isHidden: true,
      action: function () {
        var datos = {
          opcion: "INSERTA",
          dniruc: this.$content.find("#dni_yape").val(),
          apelrazon: this.$content.find("#apellidos_yape").val().trim(),
          nombre: this.$content.find("#nombres_yape").val().trim(),
          direccion: "N/A",
          fono: this.$content.find("#celular_yape").val(),
          email: "N/A",
          usuamodi: $("#nick").val(),
        };

        if (datos.dniruc === "" || datos.apelrazon === "" || datos.nombre === "") {
          $.alert({ title: 'DNI, Nombres y Apellidos son obligatorios', content: 'Money-Flash', type: 'red' });
          return false;
        }

        $.confirm({
          title: "seguro de guardar?",
          content: "Se agregara nuevo numero de Yape: " + datos.fono,
          type: "orange",
          typeAnimated: true,
          buttons: {
            Aceptar: {
              text: "Aceptar",
              btnClass: "btn-green",
              action: function () {
                saveYapeClient(datos).done(function (resp) {
                  if (resp[0].flag === "0") {
                    $.alert("Guardado correctamente");
                    $(".jconfirm").remove();
                  } else {
                    $.alert("Error Yape: " + resp.error);
                  }
                  BuscarYape(datos.fono);
                });
              },
            },
            close: function () {},
          },
        });

        return false;
      },
    },
    cerrar: function () {},
  };
}

// Crea y muestra el modal Yape con el contenido y eventos previamente definidos.
function MuestraModalYape() {
  $.confirm({
    title: "Buscar usuario <img src='img/Icono_Yape2.png' width='50' height='30'>",
    content: getYapeModalContent(),
    onContentReady: function () {
      bindYapeModalEvents(this);
    },
    buttons: getYapeModalButtons(),
  });
}

// Realiza la búsqueda de un usuario Yape por teléfono y carga los datos encontrados en el formulario principal.
function BuscarYape(telefono) {
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    url: "controles/ManteRecibidos.php",
    data: { opt: "BuscaNroYape", valor: telefono, op: "T" },
    beforeSend: function (objeto) { $("#overlay_pass").show(); },
    complete: function (objeto) { $("#overlay_pass").hide(); },
    success: function (resp) {
      if (resp[0].idcliente > 0) {
        $("#idclienteb").val(resp[0].idcliente);
        $("#dnib").val(resp[0].dni_ruc);
        $("#nombresb").val(resp[0].apel_razon + " " + resp[0].nombres);
        $("#cuentasb").val(resp[0].nrocuenta);
        $("#nombres_yape, #apellidos_yape").val("");
      }
    },
  });
}
