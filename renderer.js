// const {MapMgr} = require("./src/module/mapSys/MapMgr")
// const {AttrInput} = require("./src/module/attrsetting/AttrInput")
// let b = document.body;
// let ipt = document.getElementById("selectFile");

// let s = document.getElementsByTagName("span")[0];
// let a = new AttrInput();
// a.initCompoment("name",null,1,()=>{console.log("success")})
// a.appendTo(b)
// ipt.onchange = ()=>{
//     let c = MapMgr.setImg(ipt.files);
//     MapMgr.setContainerSize(3,3)
//     b.appendChild(c);
// }


const { Dispatch, ENTER_FRAME } = require("./src/utils/Dispatch")
const {Ticker} = require("./src/module/clip/Ticker")
// let v = document.getElementsByTagName("webview")[0]
// v.addEventListener("did-stop-loading",()=>{
//     v.openDevTools()
// })
window.onload = ()=>{
    Dispatch.evtDispatch.on(ENTER_FRAME,enterframe)
    let img = document.getElementsByTagName("img")[0];
    let index = 0
    new Ticker()
    function enterframe(e){
        img.src = `E:/project/resource/总美术上传文件/特效/Ft/UI_effect/eff_ui_zjmui_007/0000${index++}.png`
        if(index > 7)index = 0
    }
}

