const {MapMgr} = require("./src/module/mapSys/MapMgr")
let b = document.body;
let ipt = document.getElementById("selectFile");
ipt.onchange = ()=>{
    let c = MapMgr.setImg(ipt.files);
    MapMgr.setContainerSize(3,3)
    b.appendChild(c);
}
