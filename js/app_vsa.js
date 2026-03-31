$(document).ready(function () {
  $("#imageModal").dialog({
    autoOpen: false,
    modal: true,
    width: 500,
    height: 'auto',
    resizable: false
  });

  $("#openModalBtn").on("click", function () {
    $("#imageModal").dialog("open");
  });

  $('#fileInput').on('change', function (e) {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function (e) {
        $('#uploadPreview').html('<img src="' + e.target.result + '" alt="Preview">');
      }
      reader.readAsDataURL(file);
    }
  });

  $('#uploadBtn').on('click', function () {
    let fileInput = $('#fileInput')[0];
    if (fileInput.files.length === 0) {
      alert('Por favor, selecciona una imagen primero.');
      return;
    }

    let file = fileInput.files[0];
    let newFileName = $('#newFileName').val() || file.name;
    let formData = new FormData();
    formData.append('image', file);
    formData.append('newFileName', newFileName);

    $.ajax({
      url: 'php/upload_vsa.php',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        alert(response);
        $('#fileInput').val('');
        $('#newFileName').val('');
        $('#uploadPreview').empty();
      },
      error: function () {
        alert('Error al cargar la imagen.');
      }
    });
  });

  $('#searchBtn').on('click', function () {
    let searchFileName = $('#searchFileName').val();
    if (!searchFileName) {
      alert('Por favor, ingresa un nombre de archivo para buscar.');
      return;
    }

    $.ajax({
      url: 'php/search.php',
      type: 'GET',
      data: { fileName: searchFileName },
      success: function (response) {
        if (response === 'not found') {
          alert('Imagen no encontrada.');
        } else {
          $('#imagePreview').html('<img src="' + response + '" alt="Imagen encontrada">');
          $('<button id="deleteBtn">Eliminar</button>').insertAfter('#imagePreview');

          $('#deleteBtn').on('click', function () {
            if (confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
              $.ajax({
                url: 'php/delete.php',
                type: 'POST',
                data: { fileName: searchFileName },
                success: function (deleteResponse) {
                  alert(deleteResponse);
                  $('#imagePreview').empty();
                  $('#deleteBtn').remove();
                },
                error: function () {
                  alert('Error al eliminar la imagen.');
                }
              });
            }
          });
        }
      },
      error: function () {
        alert('Error al buscar la imagen.');
      }
    });
  });

});