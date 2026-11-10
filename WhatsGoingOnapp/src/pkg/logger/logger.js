class Logger {
    constructor(){
        if (!Logger.instance){
            Logger.instance = this
        }
        return Logger.instance;
    }
    log(level,message,metaData = {}){
        let messageObj = {
            level: level,
            message: message,
            //timestamp: Date.now().toString(),
             ...metaData,
        }
        console.log(JSON.stringify(messageObj));
    }
    info(message,metaData = {}){
        this.log('info',message,metaData);
    }
    warn(message,metaData = {}){
        this.log('warn',message,metaData);
    }
    error(message,metaData = {}){
        this.log('error',message,metaData);
    }
    debug(message,metaData = {}){
        this.log('debug',message,metaData);
    }
}
export const logger = new Logger();