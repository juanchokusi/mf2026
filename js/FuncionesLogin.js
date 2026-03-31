/*
 ===================== DocumentReady ============================
 */
$(document).ready(function () {
  $(".sucursal").focus(function () {
    $(".sucursal-icon").css("left", "-48px");
  });
  $(".sucursal").blur(function () {
    $(".sucursal-icon").css("left", "0px");
  });
  $(".username").focus(function () {
    $(".user-icon").css("left", "-48px");
  });
  $(".username").blur(function () {
    $(".user-icon").css("left", "0px");
  });

  $(".password").focus(function () {
    $(".pass-icon").css("left", "-48px");
  });
  $(".password").blur(function () {
    $(".pass-icon").css("left", "0px");
  });

  $("#sucursal").autocomplete({
    source: "controles/ManteSucursales.php",
    Length: 2,
    select: function (event, data) {
      $("#codsucursal").val(data.item.id);
      $("#sucursal").val(data.item.value);
    },
  });

  //    $("#nusuario").autocomplete({
  //        source: "controles/ManteUsuarios.php",
  //        Length: 2,
  //        select: function (event, data) {
  //            //$("#codsucursal").val(data.item.id);
  //            $("#nusuario").val(data.item.value);
  //        }
  //    });
  $("#mi_token").val(token1());
  console.log(token());
  $("#txt_token").val(token);
  $("#txt_token1").val(token1);


    $("#btn_codigos").click(function () {
      GeneraCodigoAutorizacion();

    });

  

});

function random() {
  return Math.random().toString(36).substr(2); // Eliminar `0.`
}

function token() {
  return random(); // Para hacer el token más largo
}
function token1() {
  return random(); // Para hacer el token más largo
}

function GeneraCodigoAutorizacion() {

$.confirm({
    title: "Codigo de Autorización",
    content: `
        <form>
            <input type="text" id="user_confirm" class="form-control" readonly onfocus="this.removeAttribute('readonly');" placeholder="Usuario">
            <input type="password" id="pass_confirm" class="form-control" readonly onfocus="this.removeAttribute('readonly');" placeholder="password" required>
        </form>`,
    onContentReady: function () {
        // Opcional: Forzar un pequeño delay para asegurar que el navegador no inyecte nada
        setTimeout(() => {
          this.$content.find('#user_confirm, #pass_confirm').val('');
        }, 50);
      },
    type: 'red',
    buttons: {
        aceptar: {text: 'aceptar', btnClass: 'btn-red',
            action: async function(){
              verifica_pass =  await VerificaPass($("#user_confirm").val().trim(), $("#pass_confirm").val().trim());
              /*console.log('verifica_pass:', verifica_pass);*/
              if (verifica_pass > 0) {
                  GeneraCodigo();
              } else { $.alert({title: 'Contraseña Incorrecta', content: 'Money-Flash', type: 'red'});}
            }
        },
        close: function () { $.alert("Cacelado...");
        }
    }
});

}

function VerificaPass(p_usuario, p_pass) {
  var pass_confirm = p_pass;
  var user_confirm = p_usuario;
  var rpta;
   return new Promise((resolve, reject) => { 
    $.ajax({async: true, type: "POST", dataType: "json", cache: false,
      data: { opt: "VERIFPASS", usuario: user_confirm, pass: pass_confirm },
      url: "controles/ManteAgentes.php",
      beforeSend: function (objeto) { $("#overlay_pass").show(); },
      complete: function (objeto) { $("#overlay_pass").hide(); },
    }).done(function (respuesta) {
      resolve(respuesta[0].idusuario);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        reject(errorThrown);
    });
  }); 
}

function GeneraCodigo() {
   
    $.ajax({async: true, type: "POST", dataType: "json", cache: false,
      data: { opt: "GCA", codigo: "XXX", usuario: "SIS", codsucu: "XXX", opcion: "G" },
      url: "controles/ManteInicio.php",
      beforeSend: function (objeto) { $("#overlay_pass").show(); },
      complete: function (objeto) { $("#overlay_pass").hide(); },
    }).done(function (respuesta) {
      $("#div_codigo_generado").show();
      $("#codigo_generado").val(respuesta[0].codigo);
    });
}


