/**调整属性 */
class AttrInput {
    constructor() {
        this.callFn = null;
        this.dataKey = "";//key值
        this.dataValue = undefined;//value值
        this.valueType = undefined;//数据类型 0 void 0| 1 number| 2 boolean| 3 string|
        this.container = document.createElement("div");
        this.nameGroup = document.createElement("span");
        this.input = document.createElement("input");
        this.typeGroup = document.createElement("span");
        this.input.type = "text";
        this.input.className = "attr_ipt";
        this.container.className = "attr_ipt_container";
        this.nameGroup.className = "attr_ipt_text";
        this.typeGroup.className = "attr_ipt_type";
        this.container.appendChild(this.nameGroup);
        this.container.appendChild(this.input);
        this.container.appendChild(this.typeGroup);
        let self = this;
        this.input.onblur = () => {
            self.value = self.parse(self.input.value);
            self.callFn && self.callFn(self.parse(self.input.value));
        }
    }

    /**
     * 初始化器
     * @param {string} key 
     * @param {any} value 
     * @param {number} type 
     */
    initCompoment(key, value, type, fn, caller = null) {
        this.valueType = type;
        this.key = key;
        this.value = value;
        this.callFn = fn.bind(caller);
        this.typeGroup.innerText = `(${this.getTypeDes()})`;
    }

    /**
     * 设置key值
     * @param {string} n
     */
    set key(n) {
        this.dataKey = n;
        this.nameGroup.innerText = n + ":";
    }

    /**
     * 设置 value 值
     * @param {any} v
     */
    set value(v) {
        this.dataValue = v;
        this.input.value = v != void 0 ? v + "" : "";
    }


    /**
     * 把用户输入的数据格式化成目标数据类型
     * @param {any} v 
     */
    parse(v) {
        let res;
        if (v == void 0) res = null;
        else {
            switch (this.valueType) {
                case 0: res = null; break;
                case 1: res = v << 0; break;
                case 2:
                    let t = v.toLocaleLowerCase()
                    if (t == "true") res = true;
                    else res = false;
                    break;
                case 3: res = v; break;
                default: res = null; break;
            }
        }
        return res;
    }

    /**
     * @private
     * 自动判断改数据的数据类型
     * @param {any} v 
     */
    getValueType(v) {
        let type;
        if (v == void 0) type = 0;
        else if (typeof v == "number") type = 1;
        else if (typeof v == "boolean") type = 2;
        else if (typeof v == "string") type = 3;
        return type;
    }

    getTypeDes(){
        switch(this.valueType){
            case 0:return "空白";
            case 1:return "数字";
            case 2:return "布尔";
            case 3:return "字符串";
        }
    }



    appendTo(parent) {
        this.remove();
        parent.appendChild(this.container);
    }

    remove() {
        if (this.container.parentElement)
            this.container.parentElement.removeChild(this.container);
    }





    destory() {
        this.input.onblur = null;
        this.dataKey = null;
        this.dataValue = null;
        this.valueType = null;
        this.container = null;
        this.nameGroup = null;
        this.input = null;
        this.typeGroup = null;
    }
}



module.exports.AttrInput = AttrInput;