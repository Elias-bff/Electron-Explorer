window.onload=function(){explorer.api("init")}
var sys={
    ent:function(e,d){e.insertAdjacentHTML("beforeEnd","<p>"+d["id"]+"</p>")}}
explorer.dial("list",(d)=>{
    for(var i=0;i<d.length;i++)
        sys.ent(pc,{"id":d[i]})})