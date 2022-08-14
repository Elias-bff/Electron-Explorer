var ram={}
window.onload=function(){
    explorer.api("init")
    sys.resize()
    document.addEventListener("contextmenu",(e)=>{
        },false)}
var sys={
    resize:function(){var a=document.body.children[2];a.style.width=a.width=document.documentElement.getBoundingClientRect().width-document.body.children[1].getBoundingClientRect().width-5+'px'},
    menu:function(d,p){
        },
    ent:function(e,d){
        try{
            cl=d['type']=="file"?["explorer.api('open','"+(d["parent"]?d["parent"]+"/":"")+d["id"].replace("\\","/")+"')",""]:["if(this.parentElement.children.length!=1){this.parentElement.replaceChildren(this)}else{explorer.api('view',this.parentElement.id+'/')}","<svg width='9' height='9' fill='currentColor' viewBox='0 0 16 16'> <path d='M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z'/></svg>"]
            e.insertAdjacentHTML("beforeEnd","<div id=\""+(d["parent"]?d["parent"]:"")+d["id"].replace("\\","/")+"\" class="+d["type"]+"><p oncontextmenu=\""+(d["type"]=="file"?"explorer.api('inspect',this.parentElement.id)":"")+"\" onclick=\"\" ondblclick=\""+cl[0]+"\">"+cl[1]+d["id"].split("/").at(-1)+"</p></div>")
            }catch{e.insertAdjacentHTML("beforeEnd","<div class='empty'></div>")}}}
explorer.dial("list",(d)=>{
    var f=document.getElementById(d[0]["folder"].replace("\\","/").slice(0,-1))
    for(var i=1;i<d.length;i++)
        sys.ent(f,d[i])})
explorer.dial("inspect",(d)=>{
    var win=document.documentElement.getBoundingClientRect()
    info.children[0].children[1].innerText="Title:        "+d[2].split("/").at(-1)
    info.children[0].children[2].innerText="Dimensions:   "+d[0]["Width"]+"x"+d[0]["Height"]
    info.children[0].children[3].innerText="Size:         "+(d[1].size/1048576).toFixed(2)+" MB"
    info.children[1].children[1].innerText="# Colors:     "+d[0]["# colors"]
    info.children[1].children[2].innerText="Color Format: "+d[0]["Color model"]
    info.children[1].children[3].innerText="Compression:  "+d[0]["Compression"]
    info.children[1].children[4].innerText="Format:       "+d[0]["Format"]
    info.children[1].children[5].innerText="Depth:        "+d[0]["Depth"]
    info.children[1].children[6].innerText="Orientation:  "+d[0]["Orientation"]
    graphical.children[0].src=d[2]
    if(d[0]["Width"]<win.width)graphical.children[0].style.width=d[0]["Width"]+"px"
    else graphical.children[0].style.width=""
    if(d[0]["Height"]<win.height)graphical.children[0].style.height=d[0]["Height"]+"px"
    else graphical.children[0].style.height=""
    console.log(d)})