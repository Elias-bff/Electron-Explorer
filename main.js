const{app,BrowserWindow}=require("electron")
var fs,prc=null
function popout(bounds,page){
    var win=new BrowserWindow({
        width:bounds[0],
        height:bounds[1],
        frame:false,
        show:false,
        backgroundColor:"#383838",
        webPreferences:{
            nodeIntegration:false,
            contextIsolation:true,
            enableRemoteModule:false,
            preload:(__dirname+"/preload.js")}})
        win.loadFile(__dirname+"/"+page)}
async function main(){
    popout([580,300],"index.html")
    var wins=BrowserWindow.getAllWindows()
    wins[0].webContents.once("did-finish-load",()=>{
        const {ipcMain}=require("electron")
        //fs=require("fs")
        ipcMain.on("minimize",()=>{BrowserWindow.getFocusedWindow().minimize()})
        ipcMain.on("maximize",()=>{BrowserWindow.getFocusedWindow().maximize()})
        ipcMain.on("close",()=>{BrowserWindow.getFocusedWindow().close()})
        ipcMain.on("popout",(events,args)=>{popout([400,220],args)})
        ipcMain.on("reboot",()=>{
            app.relaunch()
        	app.exit(0)})
        wins[0].show()
        prc=require("child_process")
        prc.exec("fsutil fsinfo drives",(e,s)=>{console.log(s.split(" ").slice(1,-1))})})}
app.on("ready",main)
var sys={
    callback:function(i,j){BrowserWindow.getAllWindows().find(win=>win.getTitle()==i).webContents.executeJavaScript(j)},}
