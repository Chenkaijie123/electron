const { MapMgr } = require("./MapMgr");
const { AttrInput } = require("../attrsetting/AttrInput")
let ipt, attrP;
let widEle = new AttrInput();
let heigEle = new AttrInput();
let widC = 2;
let heigC = 2;
let g = MapMgr.setImg([]);
window.onload = function () {
    ipt = ipt || document.getElementsByTagName("input")[0];
    ipt.addEventListener("change", selectChange);
    attrP = document.getElementById("attrPanel");
    widEle.appendTo(attrP);
    heigEle.appendTo(attrP);

    document.getElementById("imgPanel").appendChild(g);
    widEle.initCompoment("水平", 2, 1, (d) => {
        widC = d
        MapMgr.setContainerSize(widC, heigC);
    })
    heigEle.initCompoment("水平", 2, 1, (d) => {
        heigC = d
        MapMgr.setContainerSize(widC, heigC);
    })
}

function selectChange() {
    g = MapMgr.setImg(ipt.files);
    MapMgr.setContainerSize(widC, heigC);
    document.getElementById("imgPanel").appendChild(g);

}

