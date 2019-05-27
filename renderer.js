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

let v = document.getElementsByTagName("webview")[0]
v.addEventListener("did-stop-loading",()=>{
    v.openDevTools()
})