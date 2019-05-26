/**调整属性 */
class AttrInput{
    constructor(){
        this.data = {};//数据
        this.key = "";
        this.valueType = null;//数据类型
        this.fn = null;
        this.input = document.createElement("input");
        this.name = document.createElement("span");
        this.container = document.createElement("div");
        this.container.appendChild(this.name);
        this.container.appendChild(this.input);

        this.input.onblur = ()=>{
            if(!this.check(this.getValue(this.input.value))) this.input.value = this.data[this.key];
            else {
                this.attrbuteName = this.key;
                this.AttrbuteValue = this.getValue(this.input.value);
                this.emit();
            }
        }
    }

    /**
     * 添加数据到该代理对象
     * @param {string} key 数据key值
     * @param {any} value 数据有效值
     * @param {0|1|2} valueType 数据值类型
     * @param {Function} fn 数据改变执行函数，一般用于跟新界面
     */
    addToProxy(key,value,valueType,fn,callObj = null){
        this.key = key;
        this.valueType = valueType;
        this.data[key] = value;
        if(callObj){
            this.fn = fn.bind(callObj)
        }else{
            this.fn = fn;
        }
    }

    appendTo(parent){
        this.remove();
        parent.appendChild(this.container);
    }

    remove(){
        if(this.container.parentElement)
            this.container.parentElement.removeChild(this.container);
    }

    /**
     * @private
     * 刷新界面显示
     */
    emit(){
        this.fn && this.fn();
    }

    /**
     * 判断数据是否合法
     * @param {any} value 
     */
    check(value){
        if(value == void 0) return true;
        switch(this.valueType){
            case 0:return typeof value == "number";
            case 1:return typeof value == "boolean";
            case 2:return typeof value == "string";
        }
    }

    getValue(v = null){
        let value = v || this.data[this.key];
        if(value == void 0) return null;
        switch(this.valueType){
            case 0:return Number(value);
            case 1:
                if(typeof value == "string"){
                    if(this.dataProxy[this.key].toLocaleLowerCase() == "true") return true;
                    return false;
                }else return Boolean(value)
            case 2:return value + "";
        }
    }

    set attrbuteName(name){
        this.name.innerText = name;
    }

    set AttrbuteValue(value){
        this.data[this.key] = value;
        this.input.value = value
    }

    destory(){
        this.input.onblur = null;
        this.input = null;
        this.name = null;
        this.container = null;
        this.data = null;
        this.key = null;
        this.valueType = null;//数据类型
        this.fn = null;
    }
}

module.exports.AttrInput = AttrInput;