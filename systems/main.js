const{app,BrowserWindow,shell,ipcMain}=require("electron")
var fs=require("fs")
var prc=require("child_process")

function popout(bounds,page,callback){
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
            preload:(__dirname+"/preload.js")
        }
    })
        
    win.loadFile([...__dirname.split("/").slice(0,-1),...[page]].join("/"))

    if (callback){
        win.once("ready-to-show",()=>{
            callback(win)
        })
    }
        
    //add clipboard formating for real area select
    ipcMain.on("minimize",()=>{
        BrowserWindow.getFocusedWindow().minimize()
    })

    ipcMain.on("maximize",()=>{
        var f=BrowserWindow.getFocusedWindow()
        
        if(f.isFullScreen())
            f.setFullScreen(false)
        else 
            f.setFullScreen(true)
    })
        
    ipcMain.on("close",()=>{
        BrowserWindow.getFocusedWindow().close()
    })

    ipcMain.on("popout",(events,args)=>{
        popout([400,220],args[0],args[1])
    })

    ipcMain.on("reboot",()=>{
        app.relaunch()
    	app.exit(0)
    })

    win.show()
    win.webContents.executeJavaScript("window.init()")
}

async function main(){
    popout([580,300],"index.html",(win)=>{
        ipcMain.on("init",()=>{
            prc.exec("fsutil fsinfo drives",(e,s)=>{
                var init=[{"folder":"pc/"},{"id":"C:/Users/barte/Desktop","type":"shortcut"}]
                var drives=s.split(" ").slice(1,-1)
                
                for(var i=0;i<drives.length;i++){
                    init.push({"id":drives[i],"type":"folder"})
                    
                    win.webContents.send("list",init)
                }
            })
        })

        ipcMain.on("view",(events,args)=>{
            fs.readdir(args,function(e,r){
                if(e||!r.length)
                    win.webContents.executeJavaScript("sys.ent(document.getElementById(\""+args.slice(0,-1)+"\"),'')")
                else{
                    var f=[{"folder":args}]

                    for(var i=0;i<r.length;i++){
                        f.push({"id":r[i],"parent":args,"type":r[i].includes(".")?"file":"folder"})
                    } 
                        
                    win.webContents.send("list",f)
                }
            })
        })

        ipcMain.on("open",(events,args)=>{
            shell.openPath(args)
        })
        
        ipcMain.on("inspect",(events,args)=>{
            prc.exec("ncn.exe -info \""+args+"\"",(e,s)=>{
                var r={}

                s.split("\n").slice(5,-1).forEach(e=>{
                    var i=e.replace(/\s+/g, " ").split(" : ")
                    
                    r[i[0].replace(" ","")]=i[1]
                })

                fs.stat(args,(e,d)=>{
                    win.webContents.send("inspect",[r,d,args])
                })
            })
        })
        
        win.on("resize",()=>{
            win.webContents.executeJavaScript("sys.resize()")
        })
    })
}

app.on("ready",main)