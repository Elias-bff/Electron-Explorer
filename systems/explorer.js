window.onload=function(){explorer.api("init")}
var sys={
    //Add resize functionality
    class:function(d){
        switch(d["type"]){
            case "folder":
                return "if(this.parentElement.children.length!=1){this.parentElement.replaceChildren(this)}else{explorer.api('view',this.parentElement.id+'/')}"
            default:
                return "explorer.api('open','"+(d["parent"]?d["parent"]+"/":"")+d["id"].replace("\\","/")+"')"}},
    ent:function(e,d){
        e.insertAdjacentHTML("beforeEnd","<div id=\""+(d["parent"]?d["parent"]:"")+d["id"].replace("\\","/")+"\" class="+d["type"]+"><p onclick=\""+this.class(d)+"\">"+d["id"].split("/").at(-1)+"</p></div>")}}
explorer.dial("list",(d)=>{
    for(var i=1;i<d.length;i++)
        sys.ent(document.getElementById(d[0]["folder"].replace("\\","/").slice(0,-1)),d[i])})