const log4js = require('log4js');
const stream = require('stream');
const cmd = require('../utils/cmd');
const proto = require('../utils/proto-loader');

const logger = log4js.getLogger('app:server:encoder');

class Encoder extends stream.Transform {
    constructor() {
        super({
            readableObjectMode: true,
            writableObjectMode: true,
        });
    }

    _transform(msg, encoding, callback) {

        // 获得proto类型
        const typeStr = cmd.lookupType(msg.mainCmd, msg.paraCmd);
        if (!typeStr)
            return callback(new Error(`Unknown paraCmd ${msg.paraCmd}`));
        const type = proto.root.lookupType(typeStr);

        // 封装proto数据
        const data = Buffer.from(type.encode(type.create(msg.data)).finish());

        // 构造封包
        const preloadLen = 4 + 1 + 1 + 2;
        const dataLen = data.length;
        const pkgLen = dataLen + preloadLen;
        const buff = Buffer.alloc(pkgLen);
        buff.writeInt32LE(pkgLen - 4, 0);
        buff.writeInt8(msg.mainCmd, 4);
        buff.writeUInt8(msg.paraCmd, 5);
        buff.writeInt16LE(dataLen, 6);
        data.copy(buff, preloadLen)

        logger.debug('Encode %s %j', typeStr, msg);

        console.log(buff);

        callback(null, buff);
    }
}

module.exports = Encoder;
