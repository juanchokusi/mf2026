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
