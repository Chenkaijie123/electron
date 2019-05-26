class FileUtils {
    constructor() {
        this.imgFlags = ["png", "jpg", "jpeg"];
    }

    /**
     * 获取文件名后缀（转化成小写字母）
     * @param {string} name 
     */
    getExpName(name) {
        let idx = name.lastIndexOf(".");
        return name.substr(idx + 1).toLocaleLowerCase();
    }

    /**
     * 判断是否是图片
     * @param {string} fileName 
     */
    isImg(fileName) {
        let expName = this.getExpName(fileName);
        return this.imgFlags.indexOf(expName) >= 0;
    }
}

module.exports.FileUtils = new FileUtils();