require('dotenv/config');

const net = require('net');
const log4js = require('log4js');
const proto = require('./utils/proto-loader');
const login = require('./login');
const gate = require('./gate');
const server = require('./server');
const initSongTables = require('./sql/initSongTables');
const initFavoriteTable = require('./sql/initFavoriteTable');
const Sequelize = require('./sql/mysqlConfig');
const models = require('./sql/models/init-models')(Sequelize);
//const generateSongList = require('../tools/generateSongList');
async function initModelTable(){
    models.account.sync();
    models.character.sync();
    await models.favorite.sync();
    models.friend.sync();
    models.gate.sync();
    models.arcade.sync();
    models.prerank.sync();
    models.prerank4k.sync();
    models.prerank6k.sync();
}


log4js.configure({
    appenders: {
        stdout: {
            type: 'stdout'
        },
        stderr: {
            type: 'stderr'
        },
        out: {
            type: 'logLevelFilter',
            level: 'DEBUG',
            maxLevel: 'INFO',
            appender: 'stdout'
        },
        err: {
            type: 'logLevelFilter',
            level: 'WARN',
            maxLevel: 'FATAL',
            appender: 'stderr'
        }
    },
    categories: {
        default: {
            appenders: ['err', 'out'],
            level: 'DEBUG'
        }
    },
});

const logger = log4js.getLogger('app:index');



(async function () {

    await proto.load();
    console.log(123);
    initSongTables();
    await initModelTable();
    initFavoriteTable();
    net.createServer(server(login)).listen(60311, '0.0.0.0');
    net.createServer(server(gate)).listen(20021, '0.0.0.0');

    logger.info('Startup OK, worker %d', process.pid);
})();
