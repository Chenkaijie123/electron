/**
 * 小图片格子
 */
class MapUnit {
    constructor() {
        this._src = "";
        this._type = 0;//当前格子所属状态
        this.typeName = ["", "map_unit_cover_red", "map_unit_cover_blue"];
        this.container = document.createElement("div");//格子最顶层容器
        this.cover = document.createElement("div");//遮挡格子
        this.img = new Image();//显示图片
        //设置样式

        this.container.className = "map_unit_container";
        this.cover.className = "map_unit_cover";
        this.container.appendChild(this.cover);
        this.container.appendChild(this.img);
    }

    /**
     * 获取图片的宽高
     */
    async getSize(){
        if(!(this.img.width<<0) || !(this.img.height)){
            return new Promise((resolve,reject)=>{
                let fn = ()=>{
                    this.img.removeEventListener("load",fn);
                    resolve({width:this.img.width,height:this.img.height})
                }
                this.img.addEventListener("load",fn);
            })
        }
        return Promise.resolve({width:this.img.width,height:this.img.height})
    }

    /**
     * 设置标志该地图格子的状态
     * @param {0|1|2}v
     */
    set type(v) {
        this._type = v;
        this.resetSelectStyle();
        let className = this.typeName[v];
        if (className) {
            this.cover.classList.add(className);
        }
    }
    get type() {
        return this.type;
    }

    /**
     * 设置图片src
     * @param {string}url 
     */
    set src(url) {
        this._src = this.img.src = url;
        // let fn = ()=>{
        //     this.img.removeEventListener("load",fn);
        //     this.container.style.width = this.img.width + "px";
        //     this.container.style.height = this.img.height + "px";
        // }
        // this.img.addEventListener("load",fn);
    }

    get src(){
        return this._src;
    }

    /**
     * 添加到父节点
     * @param {HTMLElement} parent 
     */
    appendTo(parent) {
        if (this.container.parentElement == parent) return;
        this.remove()
        parent.appendChild(this.container);
    }

    /**
     * 从DOM节点移除
     */
    remove() {
        if (this.container.parentElement) {
            this.container.parentElement.removeChild(this.container);
        }
    }


    /**
     * @private
     * 移除当前格子的选中样式
     */
    resetSelectStyle() {
        let className = this.typeName;
        for (let n of className) {
            if (this.cover.classList.contains(n)) {
                this.cover.classList.remove(n);
            }
        }
    }

    destory() {
        this.remove();
        this._type = null;
        this.typeName = null;
        this.container = null;
        this.cover = null;
        this.img = null;
    }
}

module.exports.MapUnit = MapUnit;