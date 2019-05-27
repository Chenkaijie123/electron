class Ticker {
    constructor() {
        this.fn = [];
        this.caller = [];
        this.args = [];
        this.tickerID = null;
        this.time = 0;
        this._swap = 1000 / 40;
        this._frameRate = 40;
    }

    set frameRate(v) {
        this._frameRate = v;
        this._swap = 1000 / v;
    }
    start() {
        let oldTime = this.time;
        this.time = Date.now();
        if (this.time - oldTime < this._swap) return;
        let f = this.fn;
        let c = this.caller;
        let args = this.args;
        let fn;
        let arg;
        for (let i = 0; fn = f[i]; i++) {
            arg = args[i] || [];
            fn.call(c[i], ...arg);
        }
        this.tickerID = window.requestAnimationFrame(this.start);
    }

    stop() {
        this.tickerID && window.cancelAnimationFrame(this.tickerID);
        this.tickerID = 0;
    }

    add(fn, caller, ...args) {
        let fnIdx = this.fn.indexOf(fn);
        let callerIdx = this.caller.indexOf(caller);
        let argsIdx = this.args.indexOf(args);
        if (!(fnIdx >= 0 && callerIdx == fnIdx == argsIdx)) return;
        this.fn.push(fn);
        this.caller.push(caller);
        this.args.push(args);
        if (!this.tickerID) this.start();
    }

    remove(fn, caller) {
        let i = this.getId(fn, caller);
        if(i < 0) return;
        let fns = this.fn;
        let callers = this.caller;
        let arg = this.args;
        fns.splice(i,1);
        callers.splice(i,1);
        arg && arg.splice(i,1); 
        if(fns.length <= 0) this.stop();
    }

    getId(fn, caller) {
        let fns = this.fn;
        let callers = this.caller;
        let f;
        let i = 0;
        for(;f = fns[i];i++){
            if(fn == f){
                if(callers[i] == caller){
                    return i;
                }
            }
        }
        return -1;

    }
}