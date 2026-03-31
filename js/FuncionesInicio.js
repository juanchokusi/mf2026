function fnTotalesGiros() {
  var sumai = 0;
  var sumac = 0;
  var sumao = 0;
  var sumat = 0;
  $("#TablaGiros tr.dato").each(function () {
    //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas
    if ($(this).find("td").eq(21).text() !== "S") {
      sumai += parseFloat($(this).find("td").eq(8).text() || 0, 10); //numero de la celda 5*/
      sumac += parseFloat($(this).find("td").eq(9).text() || 0, 10);
      sumao += parseFloat($(this).find("td").eq(10).text() || 0, 10);
      sumat += parseFloat($(this).find("td").eq(11).text() || 0, 10);
    }
    if ($(this).find("td").eq(17).text() === "Pendiente") {
      $(this).css("color", "Blue");
    }
    if ($(this).find("td").eq(21).text() === "S") {
      $(this).css("color", "tomato");
    }
    //if ($(this).find('td').eq(27).text() !== '---') { $(this).css('font-weight', 'bold'); };//boleta
  });

  $("#t_importe").text(sumai.toFixed(2));
  $("#t_cargo").text(sumac.toFixed(2));
  $("#t_otros").text(sumao.toFixed(2));
  $("#t_total").text(sumat.toFixed(2));
  //console.log(sumat);
}

function FnMuestraGiros() {
  var sucursal = $("#lista_sucursales").val();
  var op = $("#lista_sucursales").val();
  if (op !== "T") {
    op = "S";
  } // S = Solo una Susursal
  else {
    op = "T";
  } // T = todas las Sucursales
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {
      opcion: "MOSTRAR",
      codsucu: sucursal,
      empresa: "M",
      fechai: $("#fechai").val(),
      fechaf: $("#fechai").val(),
      opt: op,
    },
    url: "controles/ManteInicio.php",
    beforeSend: function (objeto) {
      $("#carga").css({ display: "block" });
    },
    //complete: function () {      $('#carga').css('display', 'none');    },
    success: CreaTablaGiros,
  });
  return false;
}

function CreaTablaGiros(json) {
  var html;
  var i = 0;
  var boucher;
  for (var x = 0; x < json.length; x++) {
    i = x + 1;
    html +=
      "<tr id='G[" + x + "]' class='dato' onclick='fnSeleFila(this.id);'>";
    html += "<td>" + i + "</td>";
    boucher = json[x].boucher;
    if (boucher === "XXX") {
      html +=
        "<td>" +
        " <button id='btn_anular' title='' type='button' aria-hidden='true' class='btn btn-default btn-xs' ><span class='glyphicon glyphicon-remove'></span></button>" +
        "</td>";
    } else {
      html +=
        "<td>" +
        " <button id=" +
        json[x].cod_girosucu +
        " title='Boucher' type='button' aria-hidden='true' class='btn btn-default btn-xs' ><span class='glyphicon glyphicon-picture blue'></span></button>" +
        "</td>";
    }
    html += "<td>" + json[x].cod_girosucu + "</td>";
    html += "<td>" + json[x].fechahora_registro + "</td>";
    html += "<td>" + json[x].dni_rucb + "</td>";
    html += "<td>" + json[x].beneficiario + "</td>";
    html += "<td>" + json[x].dni_ruc + "</td>";

    html += "<td>" + json[x].remitente + "</td>";
    html += "<td>" + json[x].cod_sucursald + "</td>";
    html += "<td align='right'>" + json[x].importe_giro + "</td>";
    html += "<td align='right'>" + json[x].cargo_giro + "</td>";
    html += "<td align='right'>" + json[x].otros + "</td>";

    html += "<td align='right'>" + json[x].total + "</td>";
    html += "<td >" + json[x].nro_cuenta + "</td>";
    html += "<td >" + json[x].nro_operacion + "</td>";
    html += "<td >" + json[x].usuario_registra + "</td>";
    html += "<td >" + json[x].observagiro + "</td>";

    html += "<td >" + json[x].ciudad_destino + "</td>";
    html += "<td >" + json[x].usuario_entrega + "</td>";
    html += "<td >" + json[x].fechahora_entrega + "</td>";
    html += "<td class='ocultame'>" + json[x].nom_sucursal + "</td>";
    html += "<td >" + json[x].datapago + "</td>";

    html += "<td class='ocultame'>" + json[x].anulado + "</td>";
    html += "<td >" + json[x].data_edita + "</td>";
    html += "<td class='ocultame'>" + json[x].nro_boleta + "</td>";
    html += "</tr>";
  }
  $("#carga").css("display", "none");
  $("#BodyGiros").html(html);
  fnTotalesGiros();
  //  FnCalculaTotales();

  $("#TablaGiros").dataTable({
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
    aaSorting: [[1, "asc"]],
    sScrollY: $(window).height() - 160,
    bPaginate: false,
    bLengthChange: false,
    bFilter: false,
    bSort: true,
    bInfo: false,
    bAutoWidth: true,
    bSortClasses: false, //, "bJQueryUI": true
  });
}

function fnSeleFila(idfila) {
  var idfila1 = $("#sele_f").val();
  var elTableRow = document.getElementById(idfila);
  var elTableRow1 = document.getElementById(idfila1);
  var color = elTableRow.style.backgroundColor;
  elTableRow.style.backgroundColor =
    elTableRow.style.backgroundColor === "LightSkyBlue"
      ? color
      : "LightSkyBlue";
  if (idfila1 !== idfila) {
    elTableRow1.style.backgroundColor =
      elTableRow.style.backgroundColor === color ? "LightSkyBlue" : color;
  }
  var elTableCells = elTableRow.getElementsByTagName("td");

  //  document.getElementById("id_detalle").value = elTableCells[2].innerHTML;
  //  $("#id_concepto_i").val(elTableCells[3].innerHTML);
  //  var concepto_i = elTableCells[4].innerHTML;
  //  document.getElementById("masdatos_ing").value = concepto_i.substring(7, concepto_i.length - 8);
  //  var respo_i = elTableCells[5].innerHTML;
  //  document.getElementById("responsable_ing").value = respo_i.substring(7, respo_i.length - 8);
  //  var ing = elTableCells[6].innerHTML;
  //  document.getElementById("ingreso").value = ing.substring(7, ing.length - 8);
  //
  document.getElementById("sele_f").value = idfila;
  //  document.getElementById("opt_insert").value = ""; // valor que permite agregar un nuevo item
  //  $("#opt_sele").val("ing"); //permite saber que tabla sera actualizada
  //  //alert($("#id_concepto").val());
  console.log(idfila);
}

$(document).ready(function () {
  $(window).resize(function () {
    $("#TablaGiros").dataTable().fnDestroy();
    var objDataTable = $("#TablaGiros").dataTable({
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
      aaSorting: [[1, "asc"]],
      sScrollY: $(window).height() - 160,
      bPaginate: false,
      bLengthChange: false,
      bFilter: false,
      bSort: true,
      bInfo: false,
      bAutoWidth: true,
      bSortClasses: false, //, "bJQueryUI": true
    });
    objDataTable.fnSettings().oScroll.sY = 161;
    objDataTable.fnDraw();
  });

  // fecha en Español
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

  $("#fechai").datepicker({
    dateFormat: "yy/mm/dd",
    showOn: "both",
    buttonImageOnly: true,
    changeYear: true,
    buttonImage: "img/calendar.ico",
    beforeShow: function () {
      $(".ui-datepicker").css("font-size", 12);
    },
    numberOfMonths: 1,
    //onSelect: function (dateText){FnMuestraCierre( $('#fecha_cierre').val(),'T'); FnCargaListaDiarios();}*/
    onSelect: function (dateText) {},
  });

  $("#fechaf").datepicker({
    dateFormat: "yy/mm/dd",
    showOn: "both",
    buttonImageOnly: true,
    changeYear: true,
    buttonImage: "img/calendar.ico",
    beforeShow: function () {
      $(".ui-datepicker").css("font-size", 12);
    },
    numberOfMonths: 1,
    //onSelect: function (dateText){FnMuestraCierre( $('#fecha_cierre').val(),'T'); FnCargaListaDiarios();}*/
    onSelect: function (dateText) {},
  });

  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  $("#btn_buscar").click(function () {
    jConfirm(
      "Se mostraran movimientos con fecha: \n " + $("#fechai").val(),
      "Giros - Transferencias",
      function (r) {
        if (r) {
          $("#TablaGiros").dataTable().fnDestroy();
          FnMuestraGiros();
        }
      }
    );
  });

  $("#buscador").keyup(function () {
    if ($(this).val() !== "") {
      $("#TablaGiros tbody>tr").hide();
      $("#TablaGiros td:contains-ci('" + $(this).val() + "')")
        .parent("tr")
        .show();
    } else {
      $("#TablaGiros tbody>tr").show();
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

  $("#btn_codigo_acreditado").click(function () {
    $("#dialogo_acreditado").dialog("open");
    fnLimpia();
  });

  $("#dialogo_acreditado").dialog({
    autoOpen: false,
    resizable: true,
    modal: true,
    height: 300,
    width: 350,
    show: { effect: "blind", duration: 700 },
    hide: { effect: "puff", duration: 5000 },
    open: function (event, ui) {
      var ntitulo = "Acreditados";
      $("span.ui-dialog-title").css("font-size", 10);
      $("span.ui-dialog-title").text(ntitulo);
      //fnCodigoAcredita();
    },
    close: function (event, ui) {
      var html;
      /*$("#tbody_masdatos").html(html);*/
    },
  });

 $("#dialogo_mensaje_password").dialog({
    autoOpen: true,
    resizable: true,
    modal: true,
    height: 300,
    width: 350,
    show: { effect: "blind", duration: 700 },
    hide: { effect: "puff", duration: 5000 },
    open: function (event, ui) {
      var ntitulo = "Money Flash";
      $("span.ui-dialog-title").css("font-size", 10);
      $("span.ui-dialog-title").text(ntitulo);
      //fnCodigoAcredita();
    },
    close: function (event, ui) {
      var html;
      /*$("#tbody_masdatos").html(html);*/
    },
  });

  $('#btn_asignacodigo').attr('disabled', true);

$("#dialogo_TicketMensaje").dialog({
    autoOpen: false,
    resizable: true,
    modal: true,
    height: 480,
    width: 600,
    show: { effect: "blind", duration: 700 },
    hide: { effect: "puff", duration: 500 },
    open: function (event, ui) {
      var ntitulo = "Money Flash";
      var sucursal = $("#txt_sucursal").val();
      $("span.ui-dialog-title").css("font-size", 10);
      $("span.ui-dialog-title").text(ntitulo);
      $("#btn_guarda_mensaje").text("Guardar " + sucursal);
      //fnCodigoAcredita();
    },
    close: function (event, ui) {
      var html;
      /*$("#tbody_masdatos").html(html);*/
    },
  });

console.log($("#mi_token").val());
console.log('object');
console.log($("#txt_sucursal").val());
});

$("#btn_generacodigo").click(function () {
  var ca_opt = "G";
  if ($("#lista_sucursales1").val() === "LS") {
    jWarning("Debe seleccionar Sucursal", "Money Flash");
  } else {
    if ($("#lista_usuarios").val() === "LU") {
      jWarning("Debe seleccionar Usuario", "Money Flash");
    } else {
      fnCodigoAcreditado(ca_opt);
    }
  }
});
$("#btn_guarda_mensaje").click(function () {
  fnGuardaTicketMensaje('U');
});

$("#btn_guarda_mensaje_todos").click(function () {
  fnGuardaTicketMensaje('T');
});

function fnCodigoAcreditado(ca_opt) {
  var id_usuario = $("#lista_usuarios").val();
  id_usuario = parseInt(id_usuario);
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {
      opcion: "CODIGO",
      idusuario: $("#lista_usuarios").val(),
      cod_sucu: $("#lista_sucursales1").val(),
      codacredita: $("#txt_codigo_acredita").val(),
      minutos: $("#select_minutos").val(),
      usuaacredita: $("#nusuario").val(),
      opt: ca_opt,
    },
    url: "controles/ManteInicio.php",
  }).done(function (respuesta) {
    $("#txt_codigo_acredita").val(respuesta[0].codigo);
    /*console.log(respuesta[0].codigo);*/
    $('#btn_asignacodigo').removeAttr('disabled');
  });
  return false;
}

$("#btn_asignacodigo").click(function () {
  var midato = $("#lista_sucursales1").find("option:selected").text();
  console.log(midato);
  if (
    $("#lista_sucursales1").val() === "LS" || $("#lista_usuarios").val() === "LU") {
      jWarning("Elija una Opcion...", "Money Flash");
  } else {
    $.confirm({
      title: "Asigna Codigo",
      confirmButton: "Continuar",
      cancelButton: "Cancelar",
      confirmButtonClass: "btn-warning",
      cancelButtonClass: "btn-default",
      content:
        "Se Asignara codigo de seguridad a: <br><b>" +
        $("#lista_usuarios").find("option:selected").text() +
        "</b><br> Para ser usado en : <br><b>" +
        $("#lista_sucursales1").find("option:selected").text() +
        "</b>",
      confirm: function () {
        var ca_opt = "I";
        fnAsignaCodigo(ca_opt);
      },
      cancel: function () {
        $.alert('Asignado...')
      },
    });
  }
});

function fnAsignaCodigo(ca_opt) {
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {
      opcion: "CODIGO",
      idusuario: $("#lista_usuarios").val(),
      cod_sucu: $("#lista_sucursales1").val(),
      codacredita: $("#txt_codigo_acredita").val(),
      minutos: $("#select_minutos").val(),
      usuaacredita: $("#nusuario").val(),
      opt: ca_opt,
    },
    url: "controles/ManteInicio.php",
  }).done(function (respuesta) {
    /*$("#txt_codigo_acredita").val(respuesta[0].codigo);*/
    /*console.log(respuesta[0].codigo);*/
    $("#dialogo_acreditado").dialog("close");
  });
  return false;
}
function fnGuardaTicketMensaje(o_p) {

console.log($("#codsucu").val())
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {
      id_empresa: $("#idempresa").val(),
      telefonos: $("#txt_telefonos").val(),
      mensaje1: $("#txt_mensaje1").val(),
      mensaje2: $("#txt_mensaje2").val(),
      mensaje3: $("#txt_mensaje3").val(),
      codsucu: $("#codsucu").val(),
      opcion: "MENSAJE",
      op: o_p
    },
    url: "controles/ManteInicio.php",
  }).done(function (respuesta) {
    $("#dialogo_TicketMensaje").dialog("close");
  });
  return false;
}

function fnVerificaCodigoAcreditado(ca_opt) {
  $.ajax({
    async: true,
    type: "POST",
    dataType: "json",
    cache: false,
    data: {
      opcion: "CODIGO",
      idusuario: $("#lista_usuarios").val(),
      cod_sucu: $("#lista_sucursales1").val(),
      codacredita: $("#txt_codigo_acredita").val(),
      minutos: $("#select_minutos").val(),
      usuaacredita: $("#nusuario").val(),
      opt: ca_opt,
    },
    url: "controles/ManteInicio.php",
  }).done(function (respuesta) {
    /*$("#txt_codigo_acredita").val(respuesta[0].codigo);*/
    /*console.log(respuesta[0].codigo);*/
    $("#dialogo_acreditado").dialog("close");
  });
  return false;
}

function fnLimpia(){
  $('#btn_asignacodigo').attr('disabled', true);  
  $("#lista_usuarios").prop("selectedIndex", 0);
  $("#lista_sucursales1").prop("selectedIndex", 0);
  $("#select_minutos").prop("selectedIndex", 0);
  $("#txt_codigo_acredita").val("");
}
