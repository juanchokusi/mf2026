    $(function() {
      // Función para inicializar el combobox
      function initCombobox(selectId, dropdownBtnId, resultId) {
        var select = $("#" + selectId);
        var input = $("<input>")
          .attr("type", "text")
          .attr("placeholder", "Buscar...")
          .addClass("form-control")
          .css("width", "100%");
        
        // Insertar el input y ocultar el select
        select.after(input).hide();
        
        // Inicializar autocomplete
        input.autocomplete({
          delay: 0,
          minLength: 0,
          source: function(request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response(select.children("option").map(function() {
              var text = $(this).text();
              if (this.value && (!request.term || matcher.test(text)))
                return {
                  label: text,
                  value: text,
                  option: this
                };
            }).get());
          },
          select: function(event, ui) {
            ui.item.option.selected = true;
            // Mostrar el resultado seleccionado
            var optionValue = ui.item.option.value;
            var optionText = $(ui.item.option).text();
            
            if (selectId === "combobox-pais") {
              $("#" + resultId).html("País seleccionado: <strong>" + optionText + "</strong> (Código: " + optionValue + ")").show();
            } else if (selectId === "combobox-fruta") {
              $("#" + resultId).html("Fruta seleccionada: <strong>" + optionText + "</strong>").show();
            }
            
            // Disparar evento change en el select original
            select.trigger("change");
          },
          change: function(event, ui) {
            if (!ui.item) {
              var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
                  valid = false;
              select.children("option").each(function() {
                if ($(this).text().match(matcher)) {
                  this.selected = valid = true;
                  return false;
                }
              });
              if (!valid) {
                // Eliminar texto inválido
                $(this).val("");
                select.val("");
                $("#" + resultId).hide();
                return false;
              }
            }
          }
        }).addClass("ui-widget ui-widget-content");
        
        // Personalizar renderizado de elementos en la lista
        input.data("autocomplete")._renderItem = function(ul, item) {
          return $("<li></li>")
            .data("item.autocomplete", item)
            .append("<a class='ui-corner-all'>" + item.label + "</a>")
            .appendTo(ul);
        };
        
        // Aplicar estilos Bootstrap a la lista desplegable
        input.data("autocomplete")._renderMenu = function(ul, items) {
          var self = this;
          $.each(items, function(index, item) {
            self._renderItem(ul, item);
          });
          $(ul).addClass("dropdown-menu").css("width", input.outerWidth());
        };
        
        // Configurar botón dropdown
        $("#" + dropdownBtnId).click(function() {
          // Si el menú está visible, cerrarlo
          if (input.autocomplete("widget").is(":visible")) {
            input.autocomplete("close");
            return;
          }
          
          // Abrir el menú y enfocar el input
          input.focus().autocomplete("search", "");
        });
        
        // Si hay un valor seleccionado en el select, mostrarlo en el input
        var selectedOption = select.children(":selected");
        if (selectedOption.val()) {
          input.val(selectedOption.text());
          
          if (selectId === "combobox-pais") {
            $("#" + resultId).html("País seleccionado: <strong>" + selectedOption.text() + "</strong> (Código: " + selectedOption.val() + ")").show();
          } else if (selectId === "combobox-fruta") {
            $("#" + resultId).html("Fruta seleccionada: <strong>" + selectedOption.text() + "</strong>").show();
          }
        }
        
        return {
          select: select,
          input: input
        };
      }
      
      // Inicializar ambos comboboxes
      var comboboxPais = initCombobox("combobox-pais", "dropdown-btn-pais", "result-pais");
      var comboboxFruta = initCombobox("combobox-fruta", "dropdown-btn-fruta", "result-fruta");
      var comboboxPais = initCombobox("combobox-pais", "dropdown-btn-pais", "result-pais");
      var comboboxFruta = initCombobox("combobox-fruta", "dropdown-btn-fruta", "result-fruta");
      var comboboxPais = initCombobox("combobox-pais", "dropdown-btn-pais", "result-pais");
      var comboboxFruta = initCombobox("combobox-fruta", "dropdown-btn-fruta", "result-fruta");
    });