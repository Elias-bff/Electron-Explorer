window.onload=function(){explorer.api("init")}
var sys={
    ent:function(e,d){e.insertAdjacentHTML("beforeEnd","<p id=\""+(d["parent"]?d["parent"]:"")+d["id"].replace("\\","/")+"\" onclick=\"if(this.children.length){console.log('L')}else{explorer.api('open','"+(d["parent"]?d["parent"]:"")+d["id"].replace("\\","/")+"')}\" class="+d["type"]+">"+d["id"].split("/").at(-1)+"</p>")}}
explorer.dial("list",(d)=>{
    for(var i=1;i<d.length;i++)
        sys.ent(document.getElementById(d[0]["folder"].replace("\\","/")),d[i])})