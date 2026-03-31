<?php

session_start();

class RecibeEntrega {

    private $dbh;
    private $recibidos;
    private $entregados;


    public function __construct() {
$this->dbh = new PDO('mysql:host=localhost;dbname=bdtransferencias', "juancho", "050522");
//$this->dbh = new PDO('mysql:host=BDTransferencias.db.11851382.hostedresource.com;dbname=BDTransferencias', "BDTransferencias", "Ninozzy666@");
    }

    private function set_names() {
        return $this->dbh->query("SET NAMES 'utf8'");
    }

    public function get_recibidoss() {
        self::set_names();

        $dni = 'R';
        $apellido = 'R';
        $opt = 'R'; //R ecibido o E ntregado
        /* $sql = "call sp_recupera_giro ('mfs','mft','2014-02-28','2014-03-01','2121','2121','R')";        
          foreach ($this->dbh->query($sql) as $row) {
          $this->recibidos[] = $row;
          }
          return $this->recibidos;
          $this->dbh = null; */
        $result = $conn->prepare("call sp_recupera_giro (?,?,?,?,?,?,?)");
        $result->bindParam(1, $codsucu);
        $result->bindParam(2, $codsucu);
        $result->bindParam(3, $cfechai);
        $result->bindParam(4, $cfechaf);
        $result->bindParam(5, $dni);
        $result->bindParam(6, $apellido);
        $result->bindParam(7, $opt);
        $result->execute();
    }

    public function get_recibidos() {
        /* $codsucu = $_POST['codsucursal']; */
        $codsucu = $_SESSION['codsucursal'];
        $fechai = $_POST['fecha_i'];
        $fechaf = $_POST['fecha_f'];
        $dni = 'R';
        $apellido = 'R';
        $opt = 'R'; //recibido o entregado
        self::set_names();
        $sql = "call sp_recupera_giro($codsucu,$codsucu,'2014/01/20','2014/01/20',$dni,$apellido,$opt)";
        /* $sql = "call sp_recupera_giro ('mfs','mft','2014-02-28','2014-03-01','2121','2121','R')"; */
        foreach ($this->dbh->query($sql) as $row) {
            $this->recibidos[] = $row;
        }
        return $this->recibidos;
        $this->dbh = null;
    }

    public function obtiene_recibidos($codsucu,$fecha) {
        self::set_names();
        /*$sql = "select * from detalle_venta where             id_factura=?            and            id_producto=?";*/
        $usu='Rrr';
        $op='R';
        $sql= "call sp_recupera_giro(?,'mft',?,?,'xx','xx','R')";
        /*$sql = "call sp_recupera_giro (?,'MFT','2014-02-28','2014-02-28',$usu,$usu,$op)";*/
        $stmt = $this->dbh->prepare($sql);
        if ($stmt->execute(array($codsucu,$fecha,$fecha))) {
            
            while ($row = $stmt->fetch()) {
                $this->recibidos[]=$row;
            }
            return $this->recibidos;
            $this->dbh = null;
        }
    }

public function obtiene_entregados($codsucu,$fecha) {
        self::set_names();        
        $usu='Rrr';
        $op='E';
        $sql= "call sp_recupera_giro(?,'mft',?,?,'xx','xx','E')";
        /*$sql = "call sp_recupera_giro (?,'MFT','2014-02-28','2014-02-28',$usu,$usu,$op)";*/
        $stmt = $this->dbh->prepare($sql);
        if ($stmt->execute(array($codsucu,$fecha,$fecha))) {
            
            while ($row = $stmt->fetch()) {
                $this->entregados[]=$row;
            }
            return $this->entregados;
            $this->dbh = null;
        }
    }
    
    
}
