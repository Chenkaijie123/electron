const {MapMgr} = require("./src/module/mapSys/MapMgr")
const {AttrInput} = require("./src/module/attrsetting/AttrInput")
let b = document.body;
let ipt = document.getElementById("selectFile");
let attr = new AttrInput();
let s = document.getElementsByTagName("span")[0];
attr.addToProxy("name","bob",1,()=>{console.log(s.innerHTML = "bob")})
attr.appendTo(b)
ipt.onchange = ()=>{
    let c = MapMgr.setImg(ipt.files);
    MapMgr.setContainerSize(3,3)
    b.appendChild(c);
}
