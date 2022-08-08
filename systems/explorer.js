window.onload=function(){explorer.api("init")}
var sys={
    ent:function(e,d){e.insertAdjacentHTML("beforeEnd","<p id="+d["id"]+" onclick=explorer.api('open','"+d["id"].replace("\\","/")+"') class="+d["type"]+">"+d["id"].split("/").at(-1)+"</p>")}}
explorer.dial("list",(d)=>{
    console.log(d)
    for(var i=1;i<d.length;i++)
        sys.ent(document.getElementById(d[0]["folder"]),d[i])})