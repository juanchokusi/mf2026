// --------------------------------------------------------------------
//	Redireccion de https a travez de script
//	Autor: JVProducciones <Facebook: VasMogWiFi>
//	por favor Guarden los creditos... saludos y bendiciones
//	Version: 1.0
// --------------------------------------------------------------------

function FindProxyForURL(url,host) {

if (shExpMatch(url, "https://*.ytimg.com/*"))
  return "PROXY 192.168.10.100:8081";
if (shExpMatch(url, "https://*.googlevideo.com/*"))
  return "PROXY 192.168.10.100:8081";
if (shExpMatch(url, "https://*.youtube.com/*"))
  return "PROXY 192.168.10.100:8081";
if (shExpMatch(url, "https://*.cloudfront.com/*"))
  return "PROXY 192.168.10.100:8081";
if (shExpMatch(url, "https://*.playshoo.com/*"))
  return "PROXY 192.168.10.100:8081";
if (shExpMatch(url, "https://*.socialpointgames.com/*"))
  return "PROXY 192.168.10.100:8081;
if (shExpMatch(url, "https://*.fbcdn.net/*.jpg*"))
  return "PROXY 192.168.10.100:8081";
if (shExpMatch(url, "https://*.fbcdn.net/*.png*"))
  return "PROXY 192.168.10.100:8081";
if (shExpMatch(url, "https://*.fbcdn.net/*.mp4*"))
  return "PROXY 192.168.10.100:8081";
if (shExpMatch(url, "https://*.fbcdn.net/*.mp4*"))
  return "PROXY 192.168.10.100:8081";

if (shExpMatch(url, "*.dota2.com/*"))
  return "PROXY 192.168.10.100:8081";
if (shExpMatch(url, "*.akamai.steamstatic.com/*"))
  return "PROXY 192.168.10.100:8081";  
if (shExpMatch(url, "steamcommunity-a.akamaihd.net/*"))
  return "PROXY 192.168.10.100:8081";
if (shExpMatch(url, "*.valve.net/*"))
  return "PROXY 192.168.10.100:8081";
if (shExpMatch(url, "*.steampowered.com/*"))
  return "PROXY 192.168.10.100:8081";
  
}



