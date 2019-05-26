const {FileUtils} = require("../../utils/FileUtils")
const {LogMgr,SystemType} = require("../../RequireBase");
const {MapUnit} = require("./MapUnit");
/**
 * 地图工具管理器
 */
class MapMgr{
    constructor(){
        this.URL_ls = [];//图片地址列表
        this.img_ls = [];//图片节点 [MapUnit]
        this.mapInfo = [];//图片纹理地址集合
        this.container = document.createElement("div");
    }

    /**
     * 设置显示图片,返回显示集合
     * @param {{path:string}[]} cfg 
     */
    setImg(cfg){
        if(this.container.parentElement)
            this.container.parentElement.removeChild(this.container);
        let l = cfg.length;
        //判断是否是图片
        let warns = [];
        let allow = [];
        for(let i of cfg){
            if(FileUtils.isImg(i.path)){
                allow.push(i.path);
            }else{
                warns.push(`${i.path}不是图片文件`);
            }
        }
        this.mapInfo = allow;
        //添加到日志系统
        if(warns.length) LogMgr.addWarn(SystemType.map,...warns);
        if(allow.length) LogMgr.addLog(SystemType.map,...allow)
        let imgs = this.img_ls;//图片显示单元集合
        while(imgs.length > allow.length){
            imgs.pop().destory();
        }
        while(imgs.length < allow.length){
            imgs.push(new MapUnit())
        }
        let idx = 0;
        while(imgs[idx]){
            imgs[idx].src = allow[idx];
            imgs[idx++].appendTo(this.container);
        }
        return this.container;
    }

    /**
     * 通过设置容器行数和列数来设置大小
     * 此方法只能适用大小一致的图片
     * @param {number} cWid 水平个数
     * @param {number} cHeig 垂直个数
     */
    async setContainerSize(cWid,cHeig){
        let len = this.img_ls.length;
        if(cWid * cHeig < len){//预设个数不够
            LogMgr.addWarn(SystemType.map,`需要设置至少${len}个位置,当前${cWid * cHeig}个，已自动适配行数`);
            cHeig = Math.ceil(len / cWid);
            LogMgr.addWarn(SystemType.map,`适配为行:${cWid}个，列：${cHeig}个`);
        }
        let size = await this.img_ls[0].getSize();
        let wid = size.width * cWid;
        let heig = size.height * cHeig;
        // this.container.style.width = wid + "px";
        // this.container.style.height = heig + "px";
        this.setHeight = heig;
        this.setWidth = wid;
    }

    set setWidth(w){
        this.container.style.width = w + "px";
    }

    set setHeight(h){
        this.container.style.height = h + "px";
    }





    destory(){
        this.URL_ls = null;
        this.img_ls = null;
        this.mapInfo = null;
        if(this.container.parentElement)
            this.container.parentElement.removeChild(this.container);
        this.container = null;
    }

}

module.exports.MapMgr = new MapMgr();