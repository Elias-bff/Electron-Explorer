var ram={}
window.onload=function(){
    explorer.api("init")
    var a=document.body.children[2];a.style.width=a.width=document.documentElement.getBoundingClientRect().width-document.body.children[1].getBoundingClientRect().width+'px'
    document.addEventListener("mousedown",(e)=>{
        console.log(e.target)
        switch(e.target){}},false)}
var sys={
    //Add resize functionality
    class:function(d){
        switch(d["type"]){
            case "file":
                return ["explorer.api('open','"+(d["parent"]?d["parent"]+"/":"")+d["id"].replace("\\","/")+"')",""]
            default:
                return ["if(this.parentElement.children.length!=1){this.parentElement.replaceChildren(this)}else{explorer.api('view',this.parentElement.id+'/')}","<svg width='9' height='9' fill='currentColor' viewBox='0 0 16 16'> <path d='M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z'/></svg>",]}},
    menu:function(d,p){document.body.insertAdjacentHTML("afterbegin","<div class='resize' style='top:"+p[0]+"px;left:"+p[1]+"px'></div>")},
    ent:function(e,d){
        cl=this.class(d)
        e.insertAdjacentHTML("beforeEnd","<div id=\""+(d["parent"]?d["parent"]:"")+d["id"].replace("\\","/")+"\" class="+d["type"]+"><p onclick=\"\" ondblclick=\""+cl[0]+"\">"+cl[1]+d["id"].split("/").at(-1)+"</p></div>")}}
explorer.dial("list",(d)=>{
    var f=document.getElementById(d[0]["folder"].replace("\\","/").slice(0,-1))
    for(var i=1;i<d.length;i++)
        sys.ent(f,d[i])})