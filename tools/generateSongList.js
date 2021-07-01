const fs = require('fs');

fs.readFile('./MusicInfoList.txt',function (err, data){
    if(err) console.error(err);
    else{
        let songList='';
        for (let key in JSON.parse(data)){
            songList += key + ", ";
        }
        fs.writeFile('../src/config/songListConfig.js', "module.exports = [" + songList + "];", function (err){if(err)console.log(err);});
    }
});