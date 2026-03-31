<?php session_start(); ?>
<!doctype html>
<html lang="es">

<head>
	<meta charset="utf-8">
	<title>Login Transferencias</title>
	<!--<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/themes/base/minified/jquery-ui.min.css" type="text/css" /> -->
	<link rel="stylesheet" type="text/css" href="css/css_logintrans.css" />
	<link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="css/jquery-confirm.min334.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css">
	<style>
		/* scrool para el autocomplete*/
		.ui-autocomplete {
			max-height: 150px;
			overflow-y: auto;
			/* prevent horizontal scrollbar */
			overflow-x: hidden;
			/* add padding to account for vertical scrollbar */
			padding-right: 10px;
			font-size: 0.8em;
		}
	</style>
	<style type="text/css">
    #overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: none;
      animation: fadeIn 0.5s;
      /* Añade la animación */
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
    .loading-gif {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  </style>

  

</head>

<body>
	<div id="wrapper">
		<!--SLIDE-IN ICONS-->
		<div class="user-icon"></div>
		<div class="pass-icon"></div>
		<div class="sucursal-icon"></div>
		<!--END SLIDE-IN ICONS-->
		<!--LOGIN FORM-->
		<form name="login_form" class="login_form" action="controles/LoginSistema.php" method='post'>
			<div class="header">
				<!--TITLE-->
				<h1>GIROS TRANSFERENCIAS</h1><!--END TITLE-->
				 <button id="btn_codigos" onclick='GeneraCodigoAutorizacion();' type="button" >CODIGOS</button>
			</div>
			<div class="content">
				<input type="text" id="codsucursal" name="codsucursal" readonly="" />
				<input type="text" id="colorsucursal" name="colorsucursal" readonly="" size="5px" />
				<input type="text" id="fecha_i" name="fecha_i" value="<?php echo date("d/m/Y"); ?>" size="10px" />
				<input id="sucursal" style="text-transform:uppercase" name="sucursal" type="text" class="input sucursal" placeholder="Sucursal" />
				<input type="text" id="nusuario" name="nusuario" onkeyup='javascript:this.value=this.value.toUpperCase();' class="input username" placeholder="Usuario" />
				<input id="pass" name="pass" type="password" class="input password" placeholder="Password" />
				<input type="hidden" id="mi_token" name="mi_token">
			</div>
			<!--END CONTENT-->
			<!--FOOTER-->
			<div class="footer">
				<!--LOGIN BUTTON<input type="submit" name="submit" value="Ingresar" class="button" onclick="ValidarLogin();"/><!--END LOGIN BUTTON-->

				<!--LOGIN BUTTON--><input id="ingresar" type="submit" name="submit" value="Ingresar" class="button" /><!--END LOGIN BUTTON-->
				<!--CANCElBUTTON--><input type="reset" name="submit" value="Cancelar" class="register" autofocus="" /><!--END REGISTER BUTTON-->
				<?php
				if (isset($_SESSION['ERRMSG_ARR']) && is_array($_SESSION['ERRMSG_ARR']) && count($_SESSION['ERRMSG_ARR']) > 0) {
					echo '<ul style="padding:0; color:red;">';
					foreach ($_SESSION['ERRMSG_ARR'] as $msg) {
						echo '<li>', $msg, '</li>';
					}
					echo '</ul>';
					unset($_SESSION['ERRMSG_ARR']);
				}
				?>
			</div>
			<!--END FOOTER-->
		</form>
	</div>

      <div id="overlay_pass" style="display:none;">
      <img src="img/user_pass.gif" alt="Cargando..." class="loading-gif">
    </div>

	<script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui-1.10.min.js"></script>
	<script type="text/javascript" src="js/FuncionesLogin.js"></script>
	<script type="text/javascript" src="js/jquery-confirm.min334.js"></script>

</body>

</html>