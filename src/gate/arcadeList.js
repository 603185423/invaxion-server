const arcadeList = [[], [], []];
const fs = require('fs');

let data = fs.readFileSync('../tools/MusicInfoList.txt');
const keyList = {4:1,6:2,8:3};
const diffList = {'easy':0,'normal':1,'hard':2};

let songList = JSON.parse(data);
for (let songId in songList) {
    for (let key in songList[songId]){
        if (key === 'songType' && songList[songId][key] === 0) continue;
        if (key.slice(-4)==='diff'){
            if (songList[songId].hasOwnProperty(key.slice(0,-4) + 'note') && songList[songId][key.slice(0,-4) + 'note'] === 0)continue;
            else if (!songList[songId].hasOwnProperty(key.slice(0,-4) + 'note'))continue;
            let keyNum = keyList[key.slice(3,4)];
            let diffNum = diffList[key.slice(5,-5)];
            if (songList[songId][key]>=1 && songList[songId][key]<=9)arcadeList[0].push({songId: songId, difficulty: diffNum, mode: keyNum});
            if (songList[songId][key]>=5 && songList[songId][key]<=13)arcadeList[1].push({songId: songId, difficulty: diffNum, mode: keyNum});
            if ((songList[songId][key]>=9 && songList[songId][key]<=17) || songList[songId][key]===99)arcadeList[2].push({songId: songId, difficulty: diffNum, mode: keyNum});
        }
    }
}
module.exports = arcadeList;
