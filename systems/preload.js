const{contextBridge,ipcRenderer}=require("electron")

contextBridge.exposeInMainWorld(
    "explorer",{
        api:(c,d)=>{ipcRenderer.send(c,d)}})