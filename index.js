const discord = require('discord.js');
const client = new discord.Client({intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES]});
const token = 'OTE1NTkzMjMxMTcyMDEwMDA0.Yad2pQ._RbJHGH__g69_LZHFXJvKDjK-PM';

client.once('ready', ()=> {
    console.log('Bravo bg ca fonctionne');
});

client.on("message", message =>{
    if(message.content === "!ping"){
        message.channel.send("pong");
    }
});

client.login(token);