
$(document).ready(function () {
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

  $("#btn_asignacodigo").attr("disabled", true);



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
    $("#btn_asignacodigo").removeAttr("disabled");
  });
  return false;
}

$("#btn_asignacodigo").click(function () {
  var midato = $("#lista_sucursales1").find("option:selected").text();
  console.log(midato);
  if (
    $("#lista_sucursales1").val() === "LS" ||
    $("#lista_usuarios").val() === "LU"
  ) {
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
        $.alert("Asignado...");
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

function fnLimpia() {
  $("#btn_asignacodigo").attr("disabled", true);
  $("#lista_usuarios").prop("selectedIndex", 0);
  $("#lista_sucursales1").prop("selectedIndex", 0);
  $("#select_minutos").prop("selectedIndex", 0);
  $("#txt_codigo_acredita").val("");
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


