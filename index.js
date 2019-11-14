const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const gsr = require('google-search-results-nodejs');
const search = new gsr.GoogleSearchResults('425622d118b331cc30c679dd2c904a235837f9fdd23420d4980da24721abc4a7');
client.on('ready',function () {
    console.log('logged in as ' + (client.user.tag));
});

client.on("message", message=>{
    if(message.content === 'hi' || message.content === 'Hi'){
        if (message.author.bot) return;
        message.channel.send('Hey');
    }
    else if (message.content.startsWith('!google')) {
        let req = message.content.slice(8);
        fs.readFile('.//data.json',function (err , data) {
            if(err) throw  err;
            let x = JSON.parse(data);
            x.recent.push(req);
            fs.writeFile('.//data.json', JSON.stringify(x),'utf8',function (err) {
                if(err) throw err;
            });
        });
        if (message.author.bot) return;
        search.json({
            q: req
        }, (result => {
            let res = result.organic_results;
            for (let i = 0; i < 5; i++) {
                message.channel.send(res[i].link);
            }
        }));
    }
    else if(message.content.startsWith('!recent')){
        let que = message.content.slice(9)
        fs.readFile('.//data.json',function (err, data) {
            let chunk = JSON.parse(data);
            let y = chunk.recent;
            for(let i = 0; i < y.length; i++){
                if(y[i].includes(que)){
                    message.channel.send(y[i]);
                    console.log(y[i])
                }
            }
        });
    }
});
const stringPromise = client.login('NjQ0MTIxMDk4MjE2MTQ0ODk4.Xc040g.ikqN7lwLgJ7jGOgbhFBUY7nOr-o');
