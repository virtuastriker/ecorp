//*************************************
// VPN Proxy Settings               
// 15/05/2018                   
//*************************************

function FindProxyForURL(url, host) {
// If IP address is Intesa PROD, send to VPN proxy PROD
    if (
        shExpMatch(url, "*sede.corp.sanpaoloimi.com*")
    )
    {
        return "PROXY 10.41.2.10:1199";
    }
    
// If IP address is Intesa, send to VPN proxy TEST
    if (
        shExpMatch(url, "*sanpaoloimi.com*") ||
        shExpMatch(url, "*10\.247\.*") ||
        shExpMatch(url, "*10\.248\.*") ||
        shExpMatch(url, "*intesasanpaolo.com*") ||
        shExpMatch(url, "*fideuram*") ||
        shExpMatch(url, "*swwvm*")||
        shExpMatch(url, "*readlog*")||
        shExpMatch(url, "*192\.168\.143\.194*")||
        shExpMatch(url, "*10\.31\.*")
       )
    {
        return "PROXY 10.41.2.10:1199";
    }
    
// If URL has no dots in host name, send traffic direct.
    if (isPlainHostName(host))
    {
        return "DIRECT";
    }
    
// If on a special IP address, send traffic direct.
    if (
        isInNet(myIpAddress(), "10.20.0.0", "255.255.0.0")
       ) 
    {
        return "DIRECT";
    }
    
// If specific URL needs to bypass proxy, send traffic direct.
    if (    
        shExpMatch(url,"*.replynet.prv*") ||
        shExpMatch(url,"*.erpli.lispa.it*") ||      
        shExpMatch(url,"*.replypreprod.it*") ||
        shExpMatch(url,"*.replynet.lab*") ||
        shExpMatch(url,"*.t6pc.net*") ||
        shExpMatch(url,"*.communicationvalley.it*") ||
        shExpMatch(url,"*prod-rtsm.mobeewave-hive.com*") ||
        shExpMatch(url,"*.whatspos.com*") ||
        shExpMatch(url,"*.qq.com*") ||
        shExpMatch(url,"*.izatcloud.net*") ||
        shExpMatch(url,"*.paxsaas.com*") ||
        shExpMatch(url,"*sds-pp.setefi.it*") ||
        shExpMatch(url,"*.poynt.net*") ||
        shExpMatch(url,"*.amazonaws.com*") ||
        shExpMatch(url,"*ding2rj4jlgsl.cloudfront.net*") ||
        shExpMatch(url,"*ssl.google-analytics.com*") ||
        shExpMatch(url,"*msp01.setefi.it*") ||
        shExpMatch(url,"*213\.26\.117\.2*") ||
        shExpMatch(url,"*217\.220\.17\.2*") ||
        shExpMatch(url,"*217\.220\.17\.17*") ||
        shExpMatch(url,"*217\.221\.85\.240*") ||
        shExpMatch(url,"*216\.58\.194\.206*") ||
        shExpMatch(url,"*216\.58\.194\.174*") ||
        shExpMatch(url,"*216\.58\.195\.78*")
       )
    {
        return "DIRECT";
    }
   
// If specific URL needs to use the proxy for updates. 
    if (    
        shExpMatch(url,"*.windowsupdate.com*")||
        shExpMatch(url,"*.update.microsoft.com*")||
        shExpMatch(url,"*.mp.microsoft.com*")||
        shExpMatch(url,"*swcdn.apple.com*") ||
        shExpMatch(url,"*swdownload.apple.com*") ||
        shExpMatch(url,"*swquery.apple.com*") ||
        shExpMatch(url,"*swdist.apple.com*") ||
        shExpMatch(url,"*appldnld.apple.com*") ||
        shExpMatch(url,"*phobos.apple.com*") ||
        shExpMatch(url,"*deimos3.apple.com*") ||
        shExpMatch(url,"*albert.apple.com*") ||
        shExpMatch(url,"*gs.apple.com*") ||
        shExpMatch(url,"*gg*.apple.com*") ||
        shExpMatch(url,"*mesu.apple.com*") ||
        shExpMatch(url,"*itunes.apple.com*") ||
        shExpMatch(url,"*swscan.apple.com*")
       )
    {
        return "PROXY proxyupdate.reply.it:8080";
    }
    
// If IP address is internal or hostname resolves to internal IP, send direct.
    var resolved_ip = dnsResolve(host);
    if (
        isInNet(resolved_ip, "192.168.0.0",  "255.255.0.0") ||
        isInNet(resolved_ip, "10.0.0.0",  "255.0.0.0") ||
        isInNet(resolved_ip, "172.16.0.0",  "255.240.0.0") ||
        isInNet(resolved_ip, "127.0.0.0",  "255.0.0.0") ||
        isInNet(resolved_ip, "91.218.224.0",  "255.255.254.0") ||
        isInNet(resolved_ip, "194.246.126.0",  "255.255.254.0") ||
        isInNet(resolved_ip, "57.56.139.0",  "255.255.255.0")
       )
    {
        return "DIRECT";
    }
    
// All other traffic uses below proxies, in fail-over order.
    return "PROXY proxy.reply.it:8080; DIRECT";
}