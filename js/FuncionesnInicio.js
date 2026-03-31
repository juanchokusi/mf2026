$(document).ready(function () {
val_pass = parseInt(val_pass);
if (val_pass >= 1) {
$("#dialogo_mensaje_password").dialog({
    autoOpen: true,
    resizable: true,
    modal: true,
    height: 100,
    width: 300,
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

}
 console.log(val_pass)

});