const log4js = require('log4js');
const stream = require('stream');
const cmd = require('../utils/cmd');
const proto = require('../utils/proto-loader');

const logger = log4js.getLogger('app:server:decoder');

class Decoder extends stream.Transform {
    constructor() {
        super({
            readableObjectMode: true,
            writableObjectMode: true,
        });
    }

    _transform(msg, encoding, callback) {

        // 读公有数据
        const pub = {};
        pub.pkgLen = msg.readInt32LE(0);
        pub.mainCmd = msg.readInt8(4);
        pub.paraCmd = msg.readUInt8(5);
        pub.dataLen = msg.readInt16LE(6);
        pub.data = msg.slice(8, 8 + pub.dataLen);

        // 获得proto类型
        const typeStr = cmd.lookupType(pub.mainCmd, pub.paraCmd);
        if (!typeStr)
            return callback(new Error(`Unknown paraCmd ${pub.paraCmd}`));
        const type = proto.root.lookupType(typeStr);

        // 解析proto数据
        pub.data = type.decode(pub.data);

        logger.debug('Decode %s %j', typeStr, pub);
        return callback(null, pub);
    }
}

module.exports = Decoder;
