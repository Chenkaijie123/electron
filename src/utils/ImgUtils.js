const gm = require("gm");
const { FileUtils } = require("./FileUtils");
const { LogMgr, SystemType } = require("../RequireBase")
class ImgUtils {
    constructor() { }

    async size(URL) {
        return new Promise((resolve, reject) => {
            gm(URL).size((e, v) => {
                if (e) {
                    LogMgr.addError(SystemType.IMG, e.message);
                    reject(e);
                } else {
                    resolve([v.width, v.height]);
                }
            })
        })
    }

    /**
     * 裁剪图片
     * @param {string} sourceURL 源文件路径
     * @param {string} targerURL 生成文件路径
     * @param {number} width 生成文件的宽
     * @param {number} height 生成图片的高
     * @param {number} x 剪切的起始点X
     * @param {number} y 剪切的起始点Y
     */
    crop(sourceURL, targerURL, width, height, x, y) {
        if (!FileUtils.isImg(sourceURL)) {
            LogMgr.addError(SystemType.IMG, `文件:${sourceURL}不是有效的图片文件`);
            return;
        }
        gm(sourceURL).crop(width, height, x, y).write(targerURL, (e) => {
            if (e) LogMgr.addError(SystemType.IMG, e.message);
            else LogMgr.addLog(SystemType.IMG, `图片成功剪切至${targerURL}`);
        })
    }

    /**
     * 裁剪图片
     * @param {string} sourceURL 源文件路径
     * @param {string} targerURL 生成文件路径
     * @param {number} width 生成文件的宽
     * @param {number} height 生成图片的高
     * @param {number} x 剪切的起始点X
     * @param {number} y 剪切的起始点Y
     */
    async cropAsync(sourceURL, targerURL, width, height, x, y) {
        if (!FileUtils.isImg(sourceURL)) {
            LogMgr.addError(SystemType.IMG, `文件:${sourceURL}不是有效的图片文件`);
            return;
        }
        return new Promise((resolve, reject) => {
            gm(sourceURL).crop(width, height, x, y).write(targerURL, (e) => {
                if (e) {
                    LogMgr.addError(SystemType.IMG, e.message);
                    reject(e);
                } else {
                    LogMgr.addLog(SystemType.IMG, `图片成功剪切至${targerURL}`);
                    resolve();
                }
            })
        })
    }


    /**
     * 把一张图片裁剪成固定张数
     * @param {string} sourceURL 源文件
     * @param {string} targerURL 生成文件路径(文件夹)
     * @param {STRING} excName 生成文件的名字前缀
     * @param {number} xNum 水平切成张数
     * @param {number} yNum 垂直切成张数
     */
    cropAsNum(sourceURL, targerURL, xNum, yNum, excName = "") {
        let [width, height] = await this.size(sourceURL);
        let typeName = FileUtils.getExpName(sourceURL);
        let tWid = Math.ceil(width / xNum);//目标宽度
        let tHeig = Math.ceil(height / yNum);//目标高度
        let totalCount = tWid * tHeig;//生成张数
        let
        for (let i = 0; i < totalCount; i++) {
            this.crop(sourceURL,
                `${targerURL}/${excName}i.${typeName}`,
                tWid,
                tHeig,
                i % xNum * tWid,
                Math.floor(i / xNum) * tHeig);
        }
    }
}

module.exports.ImgUtils = new ImgUtils();