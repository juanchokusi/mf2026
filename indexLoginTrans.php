<?php session_start(); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login MF</title>
    
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="css/jquery-confirm.min334.css" />

    <style>
        body { background-color: #f4f7f6; height: 100vh; display: flex; align-items: center; }
        .login-container { width: 100%; max-width: 400px; margin: auto; }
        .card { border: none; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    </style>
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

</head>
<body>

<div class="login-container">
    <div class="card">
        <div class="card-body p-5">
            <h1 class="text-center mb-4">MF</h1>
            <div id="div_codigo_generado" class="form-group" style="display:none;"> 
                  <input type="text" id="codigo_generado" class="form-control" readonly style="text-align: center; color: red; font-size: 24px; border: none; outline: none;" value="">
                </div>
            <form name="login_form" class="login_form" action="controles/LoginSistema.php" method='post'>
              <input type="hidden" id="codsucursal" name="codsucursal" readonly="" />
                <div class="form-group">
                    <label>Sucursal</label>
                    <input type="text" id="sucursal" class="form-control input sucursal" style="text-transform:uppercase"  required>
                </div>
                <div class="form-group">
                    <label>Usuario</label>
                    <input type="text" id="nusuario" name="nusuario" class="form-control" style="text-transform:uppercase" required>
                </div>
                <div class="form-group mb-4">
                    <label>Contraseña</label>
                    <input type="password" id="pass" name="pass" class="form-control" placeholder="••••••••" required>
                </div>
                
                <div class="row">
                    <div class="col-6">
                        <button type="button" id="btn_codigos" class="btn btn-outline-secondary btn-block">Codigos</button>
                    </div>
                    <div class="col-6">
                        <button type="submit" id="ingresar" class="btn btn-primary btn-block">Entrar</button>
                    </div>
                </div>
                <input type="hidden" id="mi_token" name="mi_token">
<!--FOOTER-->
			<div class="footer">
	
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
    </div>
</div>

  <div id="overlay_pass" style="display:none;">
  <img src="img/user_pass.gif" alt="Cargando..." class="loading-gif">


  
  <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui-1.10.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
	<script type="text/javascript" src="js/FuncionesLogin.js"></script>
	<script type="text/javascript" src="js/jquery-confirm.min334.js"></script>

</body>
</html>