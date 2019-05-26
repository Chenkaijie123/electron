// 日志
class LogMgr {
    constructor() {
        this.logs = {};
        this.warns = {};
        this.errors = {};
    }

    /**
     * 添加日志
     * @param {number} sysID 
     * @param  {...string} logs 
     */
    addLog(sysID, ...logs) {
        let cache = this.logs;
        if (!cache[sysID]) cache[sysID] = [];
        cache[sysID].push(...logs);
        console.log(...logs);
    }

    /**
     * 添加警告信息
     * @param {number} sysID 
     * @param  {...string} logs 
     */
    addWarn(sysID, ...logs) {
        let cache = this.warns;
        if (!cache[sysID]) cache[sysID] = [];
        cache[sysID].push(...logs);
        console.warn(...logs);
    }

    /**
     * 添加错误信息
     * @param {number} sysID 
     * @param  {...string} logs 
     */
    addError(sysID, ...logs) {
        let cache = this.errors;
        if (!cache[sysID]) cache[sysID] = [];
        cache[sysID].push(...logs);
        console.error(...logs);
    }
}

module.exports.LogMgr = new LogMgr();