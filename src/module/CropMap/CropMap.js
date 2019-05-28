window.onload = ()=>{
    let canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = 1000;
    canvas.height = 600
    let ctx = canvas.getContext("2d");
    context = ctx;
    drawImage("E:/electron/myUtil/aaa.png")
}
let context;
let sourceMap = {}
async function drawImage(url,x = 0,y = 0,wid,heig){
    let width,height;
    if(!sourceMap[url]){
        await new Promise((resolve,reject)=>{
            let i = new Image();
            i.src = url;
            let complete = ()=>{
                i.removeEventListener("load",complete);
                i.removeEventListener("error",err);
                sourceMap[url] = i;
                width = wid || i.width;
                height = heig || i.height;
                resolve();
            }
            let err = (e)=>{
                i.removeEventListener("load",complete);
                i.removeEventListener("error",err);
                reject(e);
            }
            i.addEventListener("load",complete);
            i.addEventListener("error",err);
        }).catch((e)=>{console.error(e);return})
    }
    context.drawImage(sourceMap[url],0,0,width,height,0,0,1000,500);
}