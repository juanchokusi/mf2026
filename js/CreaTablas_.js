
function CreaTablaB( json ){
var html; 
/*html = "<p>Se encontraron [" + json.length + "] registro(s)</p>";
  html += "<table border='1'>";*/

    html +=     "<thead>";
    html +=         "<tr>";
    html +=             "<th>DNI</th>";
    html +=             "<th>Nombres</th>";
    html +=             "<th>NroCuenta</th>";
    html +=             "<th>Direccion</th>";
    html +=         "</tr>";
    html +=     "</thead>";
    for( var contador=0; contador < json.length; contador++ ){
      html += "<tr id='B.[" + contador + "]' data-dismiss='modal' onclick='RecuperaFilaB(this.id);'>";
      html += "<td>" + json[contador].dni_ruc    + "</td>";
      html += "<td>" + json[contador].apelnombre + "</td>";
      html += "<td>" + json[contador].nro_cuenta + "</td>";
      html += "<td>" + json[contador].direccion + "</td>";
      
      /*html += "<td>" + json[contador].e_mail     + "</td>";*/
      html += "</tr>";
    } /*End FOR*/
    html += "</table>";
    $("#resultado_b").html( html );
} 

function CreaTablaR( json ){
var html; 
/*html = "<p>Se encontraron [" + json.length + "] registro(s)</p>";*/
  /*html += "<table border='1'>";*/

    html +=     "<thead>";
    html +=         "<tr>";
    html +=             "<th>DNI</th>";
    html +=             "<th>Nombres</th>";
    html +=             "<th>NroCuenta</th>";
    html +=             "<th>Direccion</th>";
    html +=         "</tr>";
    html +=     "</thead>";
    for( var contador=0; contador < json.length; contador++ ){
      html += "<tr id='R.[" + contador + "]' data-dismiss='modal' onclick='RecuperaFilaR(this.id);'>";
      html += "<td>" + json[contador].dni_ruc    + "</td>";
      html += "<td>" + json[contador].apelnombre + "</td>";
      html += "<td>" + json[contador].nro_cuenta + "</td>";
      html += "<td>" + json[contador].direccion + "</td>";      
      html += "</tr>";
    } /*End FOR*/
    html += "</table>";
    $("#resultado_r").html( html );
} 

function CreaTablaS( return_arr ){
var html; 
/*html = "<p>Se encontraron [" + return_arr.length + "] registro(s)</p>";*/
  /*html += "<table border='1'>";*/

    html +=     "<thead>";
    html +=         "<tr>";
    html +=             "<th>Codigo</th>";
    html +=             "<th>Sucursal</th>";
    
    html +=         "</tr>";
    html +=     "</thead>";
    for( var contador=0; contador < return_arr.length; contador++ ){
      html += "<tr id='S.[" + contador + "]' data-dismiss='modal' onclick='RecuperaFilaS(this.id);'>";
      html += "<td>" + return_arr[contador].cod_sucursal + "</td>";
      html += "<td>" + return_arr[contador].nom_sucursal + "</td>";
      /*html += "<td>" + return_arr[contador].dir_sucursal + "</td>";*/
            
      html += "</tr>";
    } /*End FOR*/
    html += "</table>";
    $("#resultado_s").html( html );
} 

function CreaTablaRecibidos( jsonrecibe ) {
   
    var html;
    for (var contador = 0; contador < jsonrecibe.length ; contador++) {
        var i = contador + 1;
        html += "<tr id='R[" + contador + "]' class='dato' ondblclick='RecuperaFila(this.id);'>";
            html += "<td>" + i + "</td>";
            html += "<td id='correlativo'>" + jsonrecibe[contador].cod_girosucu + "</td>";
            html += "<td>" + jsonrecibe[contador].fechahora_registro + "</td>";
            html += "<td>" + jsonrecibe[contador].dni_rucb + "</td>";
            html += "<td ondblclick='fnRegresa();'>" + jsonrecibe[contador].beneficiario + "</td>";
            html += "<td>" + jsonrecibe[contador].dni_ruc + "</td>";
            html += "<td>" + jsonrecibe[contador].remitente + "</td>";
            html += "<td>" + jsonrecibe[contador].cod_sucursald + "</td>";
            html += "<td align='right'>" + jsonrecibe[contador].importe_giro + "</td>";
            html += "<td align='right'>" + jsonrecibe[contador].cargo_giro + "</td>";
            html += "<td align='right'>" + jsonrecibe[contador].igv_giro + "</td>";
            html += "<td align='right'>" + jsonrecibe[contador].itf_giro + "</td>";
            html += "<td align='right'>" + jsonrecibe[contador].otros + "</td>";
            html += "<td align='right'>" + jsonrecibe[contador].total + "</td>";            
            html += "<td>" + jsonrecibe[contador].nro_cuenta + "</td>";
            html += "<td>" + jsonrecibe[contador].nro_operacion + "</td>";        
            html += "<td>" + jsonrecibe[contador].usuario_registra + "</td>";
            html += "<td>" + jsonrecibe[contador].fechahora_entrega + "</td>";
            html += "<td>" + jsonrecibe[contador].usuario_entrega + "</td>";
            html += "<td>" + jsonrecibe[contador].observagiro + "</td>";
            html += "<td>" + jsonrecibe[contador].cod_tcuenta + "</td>";
            html += "<td>" + jsonrecibe[contador].nom_sucursal + "</td>";
            html += "<td>" + jsonrecibe[contador].anulado + "</td>";       
        html += "</tr>";
    }
    html += "<tr >";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th id='total_i'></th>";
        html += "<th id='total_c'></th>";
        html += "<th id='total_v'></th>";
        html += "<th id='total_f'></th>";
        html += "<th id='total_o'></th>";
        html += "<th id='total_g'></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";        
        html += "<th ></th>";
        html += "<th ></th>";
        html += "<th ></th>";        
    html += "</tr>";
    $("#tablarecibidos").html(html);
    CalculaTotalesR();
}

/* EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */
function CreaTablaEntregados( jsonrecibidos ){
var html; 
var html_1;    
    for(var contador=0; contador < jsonrecibidos.length; contador++) {
        var i=contador+1;   
        html += "<tr id='[" + contador + "]' class='dato' ondblclick='eRecuperaFila(this.id);'>";
        html_1 += "<tr id='[" + contador + "]' >";
        html += "<td>" +  i +  "</td>";
        html_1 += "<td>" +  i +  "</td>";
        html += "<td >" + jsonrecibidos[contador].cod_girosucu + "</td>";        
        html_1 += "<td id='nomsucu'>" + jsonrecibidos[contador].nom_sucursal + "</td>";
        html += "<td>" + jsonrecibidos[contador].fechahora_registro + "</td>";
        html += "<td>" + jsonrecibidos[contador].dni_rucb + "</td>";
        html += "<td ondblclick='fnRegresa();'>" + jsonrecibidos[contador].beneficiario + "</td>";
        html += "<td>" + jsonrecibidos[contador].dni_ruc + "</td>";
        html += "<td ondblclick='fnRegresa();'>" + jsonrecibidos[contador].remitente + "</td>";        
        
        html += "<td align='right'>" + jsonrecibidos[contador].importe_giro + "</td>";
        
        html += "<td>" + jsonrecibidos[contador].nro_operacion + "</td>";
        html += "<td>" + jsonrecibidos[contador].nro_cuenta + "</td>";
        html += "<td>" + jsonrecibidos[contador].usuario_registra + "</td>";
        html += "<td>" + jsonrecibidos[contador].fechahora_entrega + "</td>";
        html += "<td>" + jsonrecibidos[contador].anulado + "</td>";                  
        
        html += "</tr>";
        html_1 += "</tr>";
      } 
                html += "<tr >";                       
                        html += "<th ></th>";                        
                        html += "<th ></th>";
                        html += "<th ></th>";
                        html += "<th ></th>";
                        html += "<th ></th>";
                        html += "<th ></th>";
                        html += "<th ></th>";                        
                        html += "<th id='etotal_i'></th>";                                                                       
                        html += "<th ></th>";
                        html += "<th ></th>";
                        html += "<th ></th>";
                        html += "<th ></th>";
                        html += "<th ></th>";
                        
                html += "</tr>";
                
      /*html += "</tbody>";    */
      $("#tablaentregados").html( html );
      $("#tinvisible").html( html_1 );
      CalculaTotalesE();
} 

function eCreaTablaB( json ){
var html; 
/*html = "<p>Se encontraron [" + json.length + "] registro(s)</p>";
  html += "<table border='1'>";*/

    html +=     "<thead>";
    html +=         "<tr>";
    html +=             "<th>DNI</th>";
    html +=             "<th>Nombres</th>";
    html +=             "<th>Direccion</th>";
    html +=             "<th>Telefono</th>";
    html +=         "</tr>";
    html +=     "</thead>";
    for( var contador=0; contador < json.length; contador++ ){
      html += "<tr id='eB[" + contador + "]' data-dismiss='modal' onclick='eRecuperaFilaB(this.id);'>";
      html += "<td>" + json[contador].dni_ruc    + "</td>";
      html += "<td width='150'>" + json[contador].apelnombre + "</td>";
      html += "<td>" + json[contador].direccion + "</td>";
      html += "<td width='80'>" + json[contador].telefono + "</td>";
      /*html += "<td>" + json[contador].e_mail     + "</td>";*/
      html += "</tr>";
    } /*End FOR*/
    html += "</table>";
    $("#eresultado_b").html( html );
} 

function eCreaTablaR( json ){
var html; 
/*html = "<p>Se encontraron [" + json.length + "] registro(s)</p>";*/
  /*html += "<table border='1'>";*/

    html +=     "<thead>";
    html +=         "<tr>";
    html +=             "<th>DNI</th>";
    html +=             "<th>Nombres</th>";
    html +=             "<th>Direccion</th>";
    html +=             "<th>Telefono</th>";
    html +=         "</tr>";
    html +=     "</thead>";
    for( var contador=0; contador < json.length; contador++ ){
      html += "<tr id='eR.[" + contador + "]' data-dismiss='modal' onclick='eRecuperaFilaR(this.id);'>";
      html += "<td>" + json[contador].dni_ruc    + "</td>";
      html += "<td width='150'>" + json[contador].apelnombre + "</td>";
      html += "<td>" + json[contador].direccion + "</td>";
      html += "<td width='80'>" + json[contador].telefono      + "</td>";
      /*html += "<td>" + json[contador].e_mail     + "</td>";*/
      html += "</tr>";
    } /*End FOR*/
    html += "</table>";
    $("#eresultado_r").html( html );
} 

function eCreaTablaS( return_arr ){
var html; 
/*html = "<p>Se encontraron [" + return_arr.length + "] registro(s)</p>";*/
  /*html += "<table border='1'>";*/

    html +=     "<thead>";
    html +=         "<tr>";
    html +=             "<th>Codigo</th>";
    html +=             "<th>Sucursal</th>";
    
    html +=         "</tr>";
    html +=     "</thead>";
    for( var contador=0; contador < return_arr.length; contador++ ){
      html += "<tr id='eS.[" + contador + "]' data-dismiss='modal' onclick='eRecuperaFilaS(this.id);'>";
      html += "<td>" + return_arr[contador].cod_sucursal + "</td>";
      html += "<td>" + return_arr[contador].nom_sucursal + "</td>";
      /*html += "<td>" + return_arr[contador].dir_sucursal + "</td>";*/
            
      html += "</tr>";
    } /*End FOR*/
    html += "</table>";
    $("#eresultado_s").html( html );
} 


