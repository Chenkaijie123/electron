const evt = require("events");
class Dispatch{
    constructor(){
        this.evtDispatch = new evt();
    }
}

module.exports.Dispatch = new Dispatch();
module.exports.ENTER_FRAME = "ENTER_FRAME";