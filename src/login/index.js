const log4js = require('log4js');
const logger = log4js.getLogger('app:login:handler');
const crypto = require('crypto');
const {mainCmd, paraCmd} = require('../utils/cmd');
const Sequelize = require('../sql/mysqlConfig');
const models = require('../sql/models/init-models')(Sequelize);

const handlers = new Map();


handlers.set(paraCmd.cometLogin.Req_ThirdLogin, async (req, res) => {
    logger.debug('ThirdLogin');

    let gateList = await models.gate.findAndCountAll({where: {enable: 1}});
    let gateIP = '127.0.0.1';
    let gatePort = 20021;
    if (gateList.count !== 0) {
        gateIP = gateList.rows[0].gateIP;
        gatePort = gateList.rows[0].gatePort
    }

    let openId = req.data["openId"];
    let token = crypto.createHash('md5').update(openId + "6031").digest("hex");
    let [user, created] = await models.account.findOrCreate({
        where: {steamId: openId}
    });
    if (user.token !== token) {
        models.account.update({token: token}, {where: {steamId: openId}});
    }

    res.write({
        mainCmd: mainCmd.Login,
        paraCmd: paraCmd.cometLogin.Ret_ThirdLogin,
        data: {
            data: {
                gateIP: gateIP,
                gatePort: gatePort,
                token: token,
                accId: user.accId
            }
        }
    });

});

handlers.set(paraCmd.cometLogin.Req_GameVersion, (req, res) => {
    logger.debug('GameVersion');
    res.write({
        mainCmd: mainCmd.Login,
        paraCmd: paraCmd.cometLogin.Ret_GameVersion,
        data: {
            announcementContent: '',
            version: '0.1.0',
            serverState: 2,
            announcementTitle: ''
        }
    });
});

async function dispatch(req, res) {
    const handler = await handlers.get(req.paraCmd);
    if (!handler)
        throw new Error(`Handler not implemented! paraCmd ${req.paraCmd}`)
    return handler(req, res);
}

exports.dispatch = dispatch;
