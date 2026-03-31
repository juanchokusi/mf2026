// --------------------------------------------------------------------
//	Redireccion de https a travez de script
//	Autor: JVProducciones <Facebook: VasMogWiFi>
//	por favor Guarden los creditos... saludos y bendiciones
//	Version: 1.0
// --------------------------------------------------------------------

function FindProxyForURL(url,host) {
if (shExpMatch(url, "*.steamstatic.com/*"))
  return "PROXY 192.168.10.100:8081";
}
